
import { type Request, Response, NextFunction } from 'express';
import { storage } from '../storage';

export async function seoMetaTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const originalUrl = req.originalUrl;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Default meta tags
    let metaTags = {
      title: 'Pivotal B2B - B2B Marketing Solutions',
      description: 'High-Quality B2B Leads That Build Winning Sales Pipelines',
      image: `${baseUrl}/uploads/logo.png`,
      url: `${baseUrl}${originalUrl}`,
      type: 'website'
    };

    // Handle blog posts
    if (originalUrl.startsWith('/blog/')) {
      const slug = originalUrl.split('/blog/')[1];
      if (slug) {
        const post = await storage.getBlogPostBySlug(slug);
        if (post) {
          metaTags = {
            title: post.title,
            description: post.metaDescription || post.excerpt || post.content.substring(0, 160),
            image: post.bannerImage ? `${baseUrl}${post.bannerImage}` : metaTags.image,
            url: `${baseUrl}/blog/${post.slug}`,
            type: 'article'
          };
        }
      }
    }

    // Add meta tags to response locals
    res.locals.metaTags = metaTags;

    // Inject meta tags into HTML response
    const oldSend = res.send;
    res.send = function(html) {
      if (typeof html === 'string') {
        const metaTagsHtml = `
          <meta property="og:title" content="${metaTags.title}">
          <meta property="og:description" content="${metaTags.description}">
          <meta property="og:image" content="${metaTags.image}">
          <meta property="og:url" content="${metaTags.url}">
          <meta property="og:type" content="${metaTags.type}">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${metaTags.title}">
          <meta name="twitter:description" content="${metaTags.description}">
          <meta name="twitter:image" content="${metaTags.image}">
        `;
        html = html.replace('</head>', metaTagsHtml + '</head>');
      }
      return oldSend.call(this, html);
    };

    next();
  } catch (error) {
    console.error('Error in SEO middleware:', error);
    next();
  }
}
