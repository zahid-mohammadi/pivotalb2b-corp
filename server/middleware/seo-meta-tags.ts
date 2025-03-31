import { type Request, Response, NextFunction } from 'express';
import { storage } from '../storage';

export async function seoMetaTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const originalUrl = req.originalUrl;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Handle blog posts
    if (originalUrl.startsWith('/blog/')) {
      const slug = originalUrl.split('/blog/')[1];
      if (slug) {
        const post = await storage.getBlogPostBySlug(slug);
        if (!post) {
          next();
          return;
        }

        // Add meta tags to response
        res.locals.meta = {
          title: post.title,
          description: post.metaDescription || post.excerpt || '',
          image: post.coverImage || '',
          canonicalUrl: `${baseUrl}/blog/${post.slug}`,
          type: 'article',
          keywords: post.tags?.join(', ') || ''
        };

        // Inject meta tags into HTML response
        const oldWrite = res.write;
        const oldEnd = res.end;

        res.write = function(chunk: any) {
          if (typeof chunk === 'string') {
            chunk = chunk.replace('</head>',
              `<meta property="og:title" content="${res.locals.meta.title}">
              <meta property="og:description" content="${res.locals.meta.description}">
              <meta property="og:image" content="${res.locals.meta.image}">
              <meta property="og:url" content="${res.locals.meta.canonicalUrl}">
              <meta property="og:type" content="${res.locals.meta.type}">
              <meta name="keywords" content="${res.locals.meta.keywords}">
              <meta name="description" content="${res.locals.meta.description}">
              <title>${res.locals.meta.title}</title>
              </head>`
            );
          }
          return oldWrite.apply(res, arguments as any);
        };

        res.end = function(chunk: any) {
          if (chunk) {
            res.write(chunk);
          }
          return oldEnd.apply(res, arguments as any);
        };
      }
    }

    next();
  } catch (error) {
    console.error('Error in SEO middleware:', error);
    next();
  }
}