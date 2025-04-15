import { Request, Response, NextFunction } from 'express';

// Store bot blocking statistics
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

// Initialize stats object
export const botBlockStats: BotBlockStats = {
  totalBlocked: 0,
  campaigns: {},
  bots: {},
  recentBlocks: []
};

// Maximum number of recent blocks to store
const MAX_RECENT_BLOCKS = 100;

/**
 * Middleware to block bot traffic specifically from email campaigns
 * This identifies and blocks common email tracking bots while allowing legitimate users
 */
export function emailBotBlocker(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers.referer || '';
  const url = req.originalUrl || req.url;
  
  // Extract campaign information from URL parameters
  const urlParams = new URL(
    req.protocol + '://' + req.get('host') + req.originalUrl
  ).searchParams;
  
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  let campaignIdentifier = 'unknown';
  if (utmCampaign) {
    campaignIdentifier = utmCampaign;
  } else if (utmSource && utmMedium) {
    campaignIdentifier = `${utmSource}-${utmMedium}`;
  } else if (utmSource) {
    campaignIdentifier = utmSource;
  } else if (utmMedium) {
    campaignIdentifier = utmMedium;
  }
  
  // Check if request is from an email campaign using URL parameters (utm_source=email, etc.)
  const isFromEmailCampaign = 
    (utmSource === 'email' || 
    utmMedium === 'email' ||
    utmCampaign?.includes('newsletter') ||
    referer.includes('mail.') || 
    referer.includes('outlook.') ||
    referer.includes('gmail.'));
  
  // Only check for bots if traffic is from email campaigns
  if (isFromEmailCampaign) {
    // Common bot signatures in user agents - removed some common terms that might cause false positives
    const botSignatures = [
      'bot', 'crawl', 'spider', 'lighthouse', 'slurp', 
      'link preview', 'scanner', 
      'mail.ru'
      // Removed: 'ping', 'preview', 'parse', 'fetch', 'check', 'mail preview', 'email preview'
      // as these might be in legitimate user agents
    ];
    
    // Common email tracking and preview services
    const knownBotAgents = [
      'trendmicro', 'google image proxy', 'litmus', 'mailchimp', 'sendgrid',
      'brevo', 'constant contact', 'hubspot', 'mailgun', 'sparkpost',
      'EmailSecurity', 'ProofPoint', 'Barracuda', 'EmailScanner'
    ];
    
    // Check if the user agent contains any bot signatures
    const lowercaseUserAgent = userAgent.toLowerCase();
    
    // Determine bot type for tracking
    let detectedBotType = '';
    
    const isBotSignature = botSignatures.some(signature => {
      if (lowercaseUserAgent.includes(signature.toLowerCase())) {
        detectedBotType = signature;
        return true;
      }
      return false;
    });
    
    const isKnownBot = knownBotAgents.some(agent => {
      if (lowercaseUserAgent.includes(agent.toLowerCase())) {
        detectedBotType = agent;
        return true;
      }
      return false;
    });
    
    const isBot = isBotSignature || isKnownBot;

    // Additional heuristics for email client previews
    const hasNoBrowserSignature = !lowercaseUserAgent.includes('mozilla') && 
                                !lowercaseUserAgent.includes('webkit') &&
                                !lowercaseUserAgent.includes('chrome');
    
    // Missing accept-language header is common with bots
    const hasNoAcceptLanguage = !req.headers['accept-language'];

    // Special exception for known paths that real users access from campaigns
    const isLoginOrProposalPage = 
      req.path === '/login' || 
      req.path === '/dashboard' || 
      req.path === '/request-proposal' ||
      req.path.includes('/api/login') ||
      req.path.includes('/api/proposal');
    
    // Block if it's a bot from email campaign, but allow important pages even with suspicious signatures
    if (isBot || (hasNoBrowserSignature && hasNoAcceptLanguage && !isLoginOrProposalPage)) {
      // For tracking purposes, record these blocked requests
      if (!detectedBotType && (hasNoBrowserSignature && hasNoAcceptLanguage)) {
        detectedBotType = 'generic-email-preview';
      }
      
      // Update statistics
      botBlockStats.totalBlocked++;
      
      // Track by campaign
      if (!botBlockStats.campaigns[campaignIdentifier]) {
        botBlockStats.campaigns[campaignIdentifier] = 0;
      }
      botBlockStats.campaigns[campaignIdentifier]++;
      
      // Track by bot type
      if (!botBlockStats.bots[detectedBotType]) {
        botBlockStats.bots[detectedBotType] = 0;
      }
      botBlockStats.bots[detectedBotType]++;
      
      // Add to recent blocks (limited list)
      botBlockStats.recentBlocks.unshift({
        timestamp: new Date(),
        userAgent,
        referer,
        path: req.path,
        campaign: campaignIdentifier
      });
      
      // Trim recent blocks to maximum size
      if (botBlockStats.recentBlocks.length > MAX_RECENT_BLOCKS) {
        botBlockStats.recentBlocks = botBlockStats.recentBlocks.slice(0, MAX_RECENT_BLOCKS);
      }
      
      // Log for monitoring
      console.log(`Blocked email campaign bot (${detectedBotType}) from campaign: ${campaignIdentifier}`);
      
      // Return 403 Forbidden status
      return res.status(403).json({ message: 'Access denied' });
    }
  }
  
  // Not a bot or not from email campaign, continue normally
  next();
}