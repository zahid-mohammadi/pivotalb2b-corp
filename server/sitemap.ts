import { Router } from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
import { getRouteConfigs, excludedRoutes } from "./routes-config";
import type { RouteConfig } from "./types";
import { log } from "./vite";
import { storage } from "./storage";

// Update the SitemapUrl type to include lastmod
interface SitemapUrl {
  url: string;
  changefreq: string;
  priority: number;
  lastmod: string;
}

const router = Router();
let sitemap: Buffer;
let lastUpdate = 0;
const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

function normalizeHostname(hostname: string): string {
  // Ensure hostname starts with www if it's the production domain
  if (hostname.includes('pivotal-b2b.com') && !hostname.startsWith('www.')) {
    return `www.${hostname}`;
  }
  return hostname;
}

async function generateSitemapUrls(hostname: string): Promise<SitemapUrl[]> {
  try {
    // Get all dynamic and static routes
    const routes = await getRouteConfigs();
    const urls: SitemapUrl[] = [];

    // Get dynamic content from database
    const [services, ebooks, blogPosts, caseStudies] = await Promise.all([
      storage.getServices(),
      storage.getEbooks(),
      storage.getBlogPosts(),
      storage.getCaseStudies()
    ]);

    // Process each route configuration
    for (const route of routes) {
      // Skip excluded routes and explicitly skip agency-partnerships
      if (excludedRoutes.includes(route.path) || route.path === '/agency-partnerships') {
        continue;
      }

      if (route.dynamicPaths) {
        // Handle dynamic routes with database content
        const slugs = route.path.includes('services')
          ? services.map(s => s.slug)
          : route.path.includes('ebooks')
          ? ebooks.map(e => e.slug)
          : route.path.includes('blog')
          ? blogPosts.map(p => p.slug)
          : route.path.includes('case-studies')
          ? caseStudies.map(c => c.slug)
          : route.dynamicPaths;

        for (const slug of slugs) {
          const url = route.path.replace(':slug', slug);
          urls.push({
            url,
            changefreq: route.changefreq,
            priority: route.priority,
            lastmod: new Date().toISOString()
          });
        }
      } else {
        // Handle static routes
        urls.push({
          url: route.path,
          changefreq: route.changefreq,
          priority: route.priority,
          lastmod: new Date().toISOString()
        });
      }
    }

    log(`Generated ${urls.length} URLs for sitemap`);
    return urls;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error generating sitemap URLs';
    log('Error generating sitemap URLs:', errorMessage);
    throw new Error(errorMessage);
  }
}

router.get('/sitemap.xml', async (req, res) => {
  try {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    res.header('Cache-Control', 'public, max-age=10800'); // Cache for 3 hours

    const now = Date.now();

    // Serve cached sitemap if available and fresh
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
    const urls = await generateSitemapUrls(hostname);

    for (const { url, changefreq, priority, lastmod } of urls) {
      smStream.write({
        url,
        changefreq,
        priority,
        lastmod
      });
    }

    smStream.end();

    // Cache the sitemap
    sitemap = await streamToPromise(pipeline);
    lastUpdate = now;

    log('New sitemap generated and cached');
    res.send(sitemap);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error generating sitemap';
    console.error('Error generating sitemap:', errorMessage);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;