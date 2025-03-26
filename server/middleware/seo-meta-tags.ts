import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';
import path from 'path';
import fs from 'fs';

/**
 * Interface for metadata required for social sharing previews
 */
interface MetaData {
  title: string;
  description: string;
  imageUrl: string;
  canonicalUrl: string;
  type?: string;
}

/**
 * Generates HTML with proper meta tags for social sharing
 */
function generateMetaTags(meta: MetaData): string {
  return `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />
    <meta property="og:title" content="${meta.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${meta.description.replace(/"/g, '&quot;')}" />
    <meta property="og:type" content="${meta.type || 'article'}" />
    <meta property="og:url" content="${meta.canonicalUrl}" />
    <meta property="og:image" content="${meta.imageUrl}" />
    <meta property="og:site_name" content="Pivotal B2B" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${meta.description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${meta.imageUrl}" />`;
}

/**
 * Cleans meta tags from HTML to avoid duplicates
 */
function cleanExistingMetaTags(html: string): string {
  html = html.replace(/<meta property="og:title".*?>/g, '');
  html = html.replace(/<meta property="og:description".*?>/g, '');
  html = html.replace(/<meta property="og:type".*?>/g, '');
  html = html.replace(/<meta property="og:url".*?>/g, '');
  html = html.replace(/<meta property="og:image".*?>/g, '');
  html = html.replace(/<meta name="twitter:card".*?>/g, '');
  html = html.replace(/<meta name="twitter:title".*?>/g, '');
  html = html.replace(/<meta name="twitter:description".*?>/g, '');
  html = html.replace(/<meta name="twitter:image".*?>/g, '');
  html = html.replace(/<title>.*?<\/title>/g, '');
  html = html.replace(/<meta name="description".*?>/g, '');
  return html;
}

/**
 * Injects meta tags into HTML
 */
function injectMetaTags(html: string, metaTags: string): string {
  return html.replace('</head>', `${metaTags}\n  </head>`);
}

/**
 * Processes an HTML page with social meta tags
 */
async function processSocialMetaTags(req: Request, res: Response, meta: MetaData): Promise<void> {
  const templatePath = path.resolve(process.cwd(), 'client/index.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  
  // Clean existing meta tags and inject new ones
  html = cleanExistingMetaTags(html);
  const metaTags = generateMetaTags(meta);
  html = injectMetaTags(html, metaTags);
  
  // Send the modified HTML
  res.send(html);
}

/**
 * Extracts a clean slug from a URL path
 */
function extractSlug(path: string, prefix: string): string | null {
  if (path.startsWith(prefix) && path !== prefix && path !== prefix.slice(0, -1)) {
    return path.replace(prefix, '').split('?')[0];
  }
  return null;
}

/**
 * Get base URL for the request
 */
function getBaseUrl(req: Request): string {
  return `${req.protocol}://${req.get('host')}`;
}

/**
 * Middleware to inject dynamic SEO meta tags for specific routes
 * This helps social media platforms and search engines correctly display content
 * when JavaScript is not executed (like when LinkedIn scrapes the page)
 */
export async function seoMetaTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Only handle GET requests for HTML
  if (req.method !== 'GET' || !req.accepts('html')) {
    return next();
  }
  
  const originalUrl = req.originalUrl;
  const baseUrl = getBaseUrl(req);
  const defaultImageUrl = `${baseUrl}/logo.png`;
  
  try {
    // Handle blog post URLs
    const blogSlug = extractSlug(originalUrl, '/blog/');
    if (blogSlug) {
      const blogPost = await storage.getBlogPostBySlug(blogSlug);
      
      if (blogPost) {
        const title = blogPost.title || 'Pivotal B2B Blog';
        const description = blogPost.metaDescription 
          || (blogPost.content ? blogPost.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 
          'Read our latest insights on B2B marketing and lead generation strategies.');
        
        const imageUrl = blogPost.bannerImage
          ? `${baseUrl}${blogPost.bannerImage}`
          : defaultImageUrl;
        
        await processSocialMetaTags(req, res, {
          title,
          description,
          imageUrl,
          canonicalUrl: `${baseUrl}${originalUrl}`,
          type: 'article'
        });
        return;
      }
    }
    
    // Handle case study URLs
    const caseStudySlug = extractSlug(originalUrl, '/case-studies/');
    if (caseStudySlug) {
      const caseStudy = await storage.getCaseStudyBySlug(caseStudySlug);
      
      if (caseStudy) {
        const title = caseStudy.title || 'Pivotal B2B Case Study';
        const description = caseStudy.challenge
          ? caseStudy.challenge.substring(0, 160) + '...'
          : 'Discover how our B2B marketing solutions helped this client achieve significant results.';
        
        const imageUrl = caseStudy.bannerImage
          ? `${baseUrl}${caseStudy.bannerImage}`
          : defaultImageUrl;
        
        await processSocialMetaTags(req, res, {
          title,
          description,
          imageUrl,
          canonicalUrl: `${baseUrl}${originalUrl}`,
          type: 'article'
        });
        return;
      }
    }
    
    // Handle ebook URLs
    const ebookSlug = extractSlug(originalUrl, '/ebooks/');
    if (ebookSlug) {
      const ebook = await storage.getEbookBySlug(ebookSlug);
      
      if (ebook) {
        const title = ebook.title || 'Pivotal B2B Ebook';
        const description = ebook.description
          ? ebook.description.substring(0, 160) + '...'
          : 'Download our comprehensive ebook for insights into B2B marketing strategies.';
        
        const imageUrl = ebook.coverImage
          ? `${baseUrl}${ebook.coverImage}`
          : defaultImageUrl;
        
        await processSocialMetaTags(req, res, {
          title,
          description,
          imageUrl,
          canonicalUrl: `${baseUrl}${originalUrl}`,
          type: 'article'
        });
        return;
      }
    }
    
    // If not a handled route, continue to next middleware
    next();
  } catch (error) {
    console.error('Error in SEO middleware:', error);
    next();
  }
}