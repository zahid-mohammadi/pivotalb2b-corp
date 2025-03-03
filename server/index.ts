import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import sitemapRouter from "./sitemap";
import session from "express-session";
import { pool } from "./db";
import connectPg from "connect-pg-simple";
import { setupAnalyticsWebSocket } from "./services/analytics-ws";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
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

// Analytics middleware (placeholder - requires actual implementation)
const trackAnalytics = (req: Request, res: Response, next: NextFunction) => {
  // Implement analytics tracking logic here
  // ... (e.g., record page views, user sessions, etc.) ...
  next();
};
app.use(trackAnalytics);

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

  // Try to start with default port, but dynamically find an available port if needed
  let port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const maxPort = port + 10; // Try up to 10 ports if needed

  const startServer = () => {
    try {
      log(`Starting server on port ${port}...`);
      
      // Handle server errors
      server.on('error', (error: any) => {
        if (error.code === 'EADDRINUSE') {
          // Port in use, try another one
          port++;
          
          if (port <= maxPort) {
            log(`Port ${port-1} is already in use. Attempting port ${port}...`);
            // Try the next port immediately
            server.listen(port, '0.0.0.0');
          } else {
            console.error(`Unable to find an available port after trying ports ${port-10} through ${port-1}`);
            // Write the port in use to a file for diagnostics
            fs.writeFileSync('port-conflict.log', `Port conflict detected. Unable to bind to ports ${port-10} through ${port-1} at ${new Date().toISOString()}`);
            
            // Try to identify what's using the ports
            try {
              const { execSync } = require('child_process');
              const result = execSync(`ss -tuln | grep ${port-10}`).toString();
              fs.appendFileSync('port-conflict.log', `\nPort usage: ${result}`);
            } catch (e) {
              // Ignore errors from the diagnostic command
            }
          }
        } else {
          console.error('Server error:', error);
          // For other errors, try to restart
          setTimeout(startServer, 3000);
        }
      });
      
      server.listen(port, '0.0.0.0', () => {
        // Write the successfully bound port to the environment for other processes to know
        process.env.ACTUAL_PORT = port.toString();
        log(`Server running in ${app.get('env')} mode on http://0.0.0.0:${port}`);
        
        // If we're using a different port than expected, log extra information
        if (port !== (process.env.PORT ? parseInt(process.env.PORT) : 3000)) {
          log(`Note: Server is running on port ${port} instead of the default port`);
          
          // Update the deployment URL if needed
          if (app.get('env') === "production") {
            log(`Please update any settings that expect the default port to use port ${port} instead`);
          }
        }
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      // Attempt recovery with a delay
      setTimeout(startServer, 3000);
    }
  };
  
  // Start the server with error handling
  startServer();
  
  // Handle uncaught exceptions to prevent crashing
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Log the error but don't exit
  });
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Log the error but don't exit
  });
})();