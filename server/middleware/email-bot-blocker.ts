import { Request, Response, NextFunction } from 'express';

// Store bot blocking statistics for analytics only
interface BotBlockStats {
  totalBlocked: number;
  campaigns: Record<string, number>;
  bots: Record<string, number>;
  recentBlocks: Array<{
    timestamp: Date;
    userAgent: string;
    referer: string;
    path: string;
    campaign?: string;
  }>;
}

// Initialize stats object (for analytics only - no blocking)
export const botBlockStats: BotBlockStats = {
  totalBlocked: 0,
  campaigns: {},
  bots: {},
  recentBlocks: []
};

/**
 * Email bot blocker completely disabled for massive campaigns
 * All traffic is now allowed through without any blocking
 */
export function emailBotBlocker(req: Request, res: Response, next: NextFunction) {
  // Completely disabled - allow all traffic through without any blocking
  // No rate limiting, no bot detection, no restrictions for massive email campaigns
  next();
}