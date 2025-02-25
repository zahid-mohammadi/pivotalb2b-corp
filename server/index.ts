import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import sitemapRouter from "./sitemap";
import session from "express-session";
import { pool } from "./db";
import connectPg from "connect-pg-simple";
import { setupAnalyticsWebSocket } from "./services/analytics-ws";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
const PostgresStore = connectPg(session);
app.use(session({
  store: new PostgresStore({
    pool,
    tableName: 'sessions',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Setup WebSocket for real-time analytics
  setupAnalyticsWebSocket(server);

  // Register sitemap routes
  app.use(sitemapRouter);

  // Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error('Server error:', err);
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist/public')));
    serveStatic(app);
  }

  // Catch-all handler
  app.use('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      log(`404 Not Found: ${req.originalUrl}`);
    }

    if (req.accepts('html')) {
      res.sendFile(path.join(process.cwd(), app.get("env") === "development" ? 'index.html' : 'dist/public/index.html'));
    } else {
      res.status(404).json({
        message: 'Not Found',
        status: 404
      });
    }
  });

  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

  try {
    log(`Starting server on port ${port}...`);
    server.listen(port, '0.0.0.0', () => {
      log(`Server running in ${app.get('env')} mode on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();