import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to block bot traffic specifically from email campaigns
 * This identifies and blocks common email tracking bots while allowing legitimate users
 */
export function emailBotBlocker(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers.referer || '';
  const url = req.originalUrl || req.url;
  
  // Check if request is from an email campaign using URL parameters (utm_source=email, etc.)
  const isFromEmailCampaign = 
    url.includes('utm_source=email') || 
    url.includes('utm_medium=email') ||
    url.includes('utm_campaign=newsletter') ||
    referer.includes('mail.') || 
    referer.includes('outlook.') ||
    referer.includes('gmail.');
  
  // Only check for bots if traffic is from email campaigns
  if (isFromEmailCampaign) {
    // Common bot signatures in user agents
    const botSignatures = [
      'bot', 'crawl', 'spider', 'lighthouse', 'slurp', 'ping', 'preview',
      'link preview', 'scanner', 'parse', 'fetch', 'check', 
      'mail.ru', 'mail preview', 'email preview'
    ];
    
    // Common email tracking and preview services
    const knownBotAgents = [
      'trendmicro', 'google image proxy', 'litmus', 'mailchimp', 'sendgrid',
      'brevo', 'constant contact', 'hubspot', 'mailgun', 'sparkpost',
      'EmailSecurity', 'ProofPoint', 'Barracuda', 'EmailScanner'
    ];
    
    // Check if the user agent contains any bot signatures
    const lowercaseUserAgent = userAgent.toLowerCase();
    const isBot = botSignatures.some(signature => 
      lowercaseUserAgent.includes(signature.toLowerCase())
    ) || knownBotAgents.some(agent => 
      lowercaseUserAgent.includes(agent.toLowerCase())
    );

    // Additional heuristics for email client previews
    const hasNoBrowserSignature = !lowercaseUserAgent.includes('mozilla') && 
                                !lowercaseUserAgent.includes('webkit') &&
                                !lowercaseUserAgent.includes('chrome');
    
    // Missing accept-language header is common with bots
    const hasNoAcceptLanguage = !req.headers['accept-language'];
    
    // Block if it's a bot from email campaign
    if (isBot || (hasNoBrowserSignature && hasNoAcceptLanguage)) {
      // For tracking purposes, you might want to log these blocked requests
      console.log('Blocked email campaign bot:', {
        userAgent,
        referer,
        path: req.path
      });
      
      // Return 403 Forbidden status or alternatively a special page
      return res.status(403).json({ message: 'Access denied' });
    }
  }
  
  // Not a bot or not from email campaign, continue normally
  next();
}