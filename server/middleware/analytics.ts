import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export async function analyticsMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Skip tracking for API and static requests
    if (req.path.startsWith('/api/') || req.path.includes('.')) {
      return next();
    }

    // Get or create session ID
    let sessionId = req.session.id;
    if (!sessionId) {
      sessionId = uuidv4();
      req.session.id = sessionId;
    }

    next();
  } catch (error) {
    console.error('Analytics middleware error:', error);
    // Continue even if analytics fails
    next();
  }
}
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../storage';

export async function trackAnalytics(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies.sessionId || uuidv4();
  res.cookie('sessionId', sessionId, { maxAge: 24 * 60 * 60 * 1000 }); // 24 hours

  // Track page view
  await storage.trackPageView({
    page: req.path,
    sessionId,
    timestamp: new Date(),
    source: req.headers.referer || 'direct'
  });

  next();
}
