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

// Redirect map for old URLs
const redirects = new Map([
  ['/blog/old-post-1', '/blog/new-post-1'],
  ['/services/old-service', '/services/intent-based-lead-generation'],
  ['/resources', '/ebooks'],
  // Add more redirects as needed
]);

// Redirect middleware
app.use((req, res, next) => {
  const path = req.path.toLowerCase();
  if (redirects.has(path)) {
    log(`Redirecting ${path} to ${redirects.get(path)}`);
    return res.redirect(301, redirects.get(path)!);
  }
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

  // Catch-all handler for client-side routing and 404s
  app.use('*', (req, res, next) => {
    // Log 404s for monitoring
    if (!req.path.startsWith('/api')) {
      log(`404 Not Found: ${req.originalUrl}`);
    }

    if (req.accepts('html')) {
      // For HTML requests, serve the SPA's index.html
      res.sendFile(path.join(process.cwd(), app.get("env") === "development" ? 'index.html' : 'dist/public/index.html'));
    } else {
      // For API requests, return 404 JSON
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
      log(`Server running in ${app.get('env')} mode on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();