import { Router } from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";

const router = Router();
let sitemap: Buffer;

// List of all routes in the application
const routes = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/intent-based-lead-generation', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/content-distribution', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/event-and-webinar-promotion', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/lead-qualification', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/account-based-marketing', changefreq: 'weekly', priority: 0.9 },
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/case-studies', changefreq: 'weekly', priority: 0.7 },
  { url: '/ebooks', changefreq: 'weekly', priority: 0.7 },
  { url: '/agency-partnerships', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
];

router.get('/sitemap.xml', async (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  // If we have a cached sitemap and it's less than 24 hours old, serve it
  if (sitemap) {
    res.send(sitemap);
    return;
  }

  try {
    const smStream = new SitemapStream({ hostname: `https://${req.get('host')}` });
    const pipeline = smStream.pipe(createGzip());

    // Add all routes to the sitemap
    routes.forEach((route) => {
      smStream.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
      });
    });

    smStream.end();

    // Cache the sitemap
    sitemap = await streamToPromise(pipeline);
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
});

export default router;