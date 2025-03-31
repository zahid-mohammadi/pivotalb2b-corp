import { type Request, Response, NextFunction } from 'express';
import { storage } from '../storage';

export async function seoMetaTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path;

  // Skip for API routes and static files
  if (path.startsWith('/api/') || path.includes('.')) {
    return next();
  }

  // Set default meta tags
  let title = 'Pivotal B2B - B2B Marketing Solutions';
  let description = 'High-Quality B2B Leads That Build Winning Sales Pipelines';
  let image = '/uploads/logo.png';

  try {
    // Handle dynamic routes
    if (path.startsWith('/blog/')) {
      const slug = path.split('/blog/')[1];
      const post = await storage.getBlogPostBySlug(slug);
      if (post) {
        title = post.title;
        description = post.excerpt || post.content.substring(0, 160);
        image = post.coverImage || image;
      }
    }
    // Add similar logic for other dynamic routes (services, case studies etc)

    // Inject meta tags
    res.locals.metaTags = {
      title,
      description,
      image,
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      type: 'website'
    };

  } catch (error) {
    console.error('Error in SEO middleware:', error);
  }

  next();
}