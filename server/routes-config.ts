import { type RouteConfig } from "./types";
import { storage } from "./storage";

export const getRouteConfigs = async (): Promise<RouteConfig[]> => {
  // Get all services to build dynamic paths
  const services = await storage.getServices();
  const servicesSlugs = services.map(service => service.slug);

  return [
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/about', changefreq: 'monthly', priority: 0.8 },
    { path: '/services/:slug', changefreq: 'weekly', priority: 0.9, 
      dynamicPaths: servicesSlugs
    },
    { path: '/blog', changefreq: 'daily', priority: 0.8 },
    { path: '/case-studies', changefreq: 'weekly', priority: 0.7 },
    { path: '/ebooks', changefreq: 'weekly', priority: 0.7 },
    { path: '/agency-partnerships', changefreq: 'monthly', priority: 0.8 },
    { path: '/contact', changefreq: 'monthly', priority: 0.6 },
  ];
};

// Exclude these routes from sitemap
export const excludedRoutes = [
  '/dashboard',  // Private route
  '/login',     // Auth route
  '/not-found'  // Error page
];