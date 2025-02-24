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

    try {
      // Record page view
      await storage.db.insert(storage.pageViews).values({
        path: req.path,
        sessionId,
        source: req.headers.referer || 'direct',
        deviceType: req.headers['user-agent'] || 'unknown',
        timestamp: new Date(),
        duration: 0, // Will be updated on page exit or next page view
      });

      // Update or create user session
      await storage.db.insert(storage.userSessions).values({
        sessionId,
        startTime: new Date(),
        source: req.headers.referer || 'direct',
        deviceType: req.headers['user-agent'] || 'unknown',
        isActive: true,
        lastPing: new Date(),
      }).onConflictDoUpdate({
        target: storage.userSessions.sessionId,
        set: {
          isActive: true,
          lastPing: new Date(),
        },
      });

      console.log(`Analytics recorded for session ${sessionId} at path ${req.path}`);
    } catch (dbError) {
      console.error('Database error in analytics middleware:', dbError);
      // Continue even if analytics storage fails
    }

    next();
  } catch (error) {
    console.error('Analytics middleware error:', error);
    next(); // Continue even if analytics fails
  }
}