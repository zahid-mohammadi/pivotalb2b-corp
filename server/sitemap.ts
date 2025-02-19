import { Router } from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
import { getRouteConfigs, excludedRoutes } from "./routes-config";
import type { RouteConfig, SitemapUrl } from "./types";

const router = Router();
let sitemap: Buffer;
let lastUpdate = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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

  return urls;
}

router.get('/sitemap.xml', async (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  const now = Date.now();

  // If we have a cached sitemap and it's less than 24 hours old, serve it
  if (sitemap && (now - lastUpdate < CACHE_DURATION)) {
    res.send(sitemap);
    return;
  }

  try {
    const smStream = new SitemapStream({ hostname: `https://${req.get('host')}` });
    const pipeline = smStream.pipe(createGzip());

    // Generate and add URLs to the sitemap
    const urls = generateSitemapUrls(req.get('host') || '');

    for (const { url, changefreq, priority } of urls) {
      smStream.write({
        url,
        changefreq,
        priority,
      });
    }

    smStream.end();

    // Cache the sitemap
    sitemap = await streamToPromise(pipeline);
    lastUpdate = now;

    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
});

export default router;