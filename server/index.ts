import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import sitemapRouter from "./sitemap";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

  try {
    log(`Starting server on port ${port}...`);
    server.listen(port, '0.0.0.0', () => {
      log(`Server running in ${app.get('env')} mode on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();