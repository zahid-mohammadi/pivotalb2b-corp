import rateLimit from 'express-rate-limit';

// Rate limiter specifically for authentication endpoints
// This prevents brute force attacks while not affecting general site traffic
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many login attempts',
      message: 'Please try again after 15 minutes',
      retryAfter: 15 * 60 // seconds
    });
  }
});

// Less strict rate limiter for password reset
export const resetPasswordRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  message: 'Too many password reset attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});
