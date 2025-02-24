import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';
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

    // Record analytics asynchronously to not block the request
    Promise.all([
      storage.recordPageView({
        path: req.path,
        sessionId,
        source: req.headers.referer || 'direct',
        deviceType: req.headers['user-agent'] || 'unknown'
      }),
      storage.updateUserActivity(sessionId)
    ]).catch(error => {
      // Log error but don't fail the request
      console.error('Analytics error:', error);
    });

    next();
  } catch (error) {
    console.error('Analytics middleware error:', error);
    // Continue even if analytics fails
    next();
  }
}