import { type RouteConfig } from "./types";
import { storage } from "./storage";

export const getRouteConfigs = async (): Promise<RouteConfig[]> => {
  // Get all services to build dynamic paths
  const services = await storage.getServices();
  const servicesSlugs = services.map(service => service.slug);

  return [
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/services/:slug', changefreq: 'weekly', priority: 0.9, 
      dynamicPaths: servicesSlugs
    },
    { path: '/resources', changefreq: 'weekly', priority: 0.8 },
    { path: '/ebooks/:slug', changefreq: 'weekly', priority: 0.8,
      dynamicPaths: await storage.getEbooks().then(ebooks => ebooks.map(e => e.slug))
    },
    { path: '/blog/:slug', changefreq: 'daily', priority: 0.8,
      dynamicPaths: await storage.getBlogPosts().then(posts => posts.map(p => p.slug))
    },
    { path: '/case-studies/:slug', changefreq: 'weekly', priority: 0.8,
      dynamicPaths: await storage.getCaseStudies().then(cases => cases.map(c => c.slug))
    },
    { path: '/about', changefreq: 'monthly', priority: 0.7 },
    { path: '/contact', changefreq: 'monthly', priority: 0.7 },
    { path: '/privacy-policy', changefreq: 'monthly', priority: 0.6 },
    { path: '/terms-conditions', changefreq: 'monthly', priority: 0.6 },
    { path: '/cookie-policy', changefreq: 'monthly', priority: 0.6 }
  ];
};

// Exclude these routes from sitemap
export const excludedRoutes = [
  '/dashboard',  // Private route
  '/login',     // Auth route
  '/not-found', // Error page
  '/logout',    // Auth route
  '/reset-password', // Auth route
  '/signup',    // Auth route
  '/admin',     // Admin routes
  '/api',       // API routes
  '/agency-partnerships' // Removed from menu and sitemap
];