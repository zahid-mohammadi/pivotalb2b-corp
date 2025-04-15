
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Increased from 100 to 300 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later'
});

// Less strict limiter for auth routes to accommodate email campaign users
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // Increased from 5 to 30 attempts per hour to accommodate campaign traffic
  message: 'Too many login attempts, please try again later'
});
