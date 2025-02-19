import { Router } from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
import { getRouteConfigs, excludedRoutes } from "./routes-config";
import type { RouteConfig, SitemapUrl } from "./types";
import { log } from "./vite";

const router = Router();
let sitemap: Buffer;
let lastUpdate = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function normalizeHostname(hostname: string): string {
  // Ensure hostname starts with www if it's the production domain
  if (hostname.includes('pivotal-b2b.com') && !hostname.startsWith('www.')) {
    return `www.${hostname}`;
  }
  return hostname;
}

function generateSitemapUrls(hostname: string): SitemapUrl[] {
  const routes = getRouteConfigs();
  const urls: SitemapUrl[] = [];

  routes.forEach((route: RouteConfig) => {
    if (excludedRoutes.includes(route.path)) {
      return;
    }

    if (route.dynamicPaths) {
      // Handle dynamic routes
      route.dynamicPaths.forEach(dynamicPath => {
        const url = route.path.replace(':slug', dynamicPath);
        urls.push({
          url,
          changefreq: route.changefreq,
          priority: route.priority
        });
      });
    } else {
      // Handle static routes
      urls.push({
        url: route.path,
        changefreq: route.changefreq,
        priority: route.priority
      });
    }
  });

  log(`Generated ${urls.length} URLs for sitemap`);
  return urls;
}

router.get('/sitemap.xml', async (req, res) => {
  try {
    // Set proper headers for XML content
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    res.header('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    const now = Date.now();

    // If we have a cached sitemap and it's less than 24 hours old, serve it
    if (sitemap && (now - lastUpdate < CACHE_DURATION)) {
      log('Serving cached sitemap');
      res.send(sitemap);
      return;
    }

    // Get the hostname and ensure it includes www for production
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const host = normalizeHostname(req.get('host') || req.hostname);
    const hostname = `${protocol}://${host}`;

    log(`Generating sitemap for hostname: ${hostname}`);

    // Create a new sitemap stream
    const smStream = new SitemapStream({ hostname });
    const pipeline = smStream.pipe(createGzip());

    // Generate and add URLs to the sitemap
    const urls = generateSitemapUrls(hostname);

    for (const { url, changefreq, priority } of urls) {
      smStream.write({
        url,
        changefreq,
        priority,
        lastmod: new Date().toISOString()
      });
    }

    smStream.end();

    // Cache the sitemap
    sitemap = await streamToPromise(pipeline);
    lastUpdate = now;

    log('New sitemap generated and cached');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;