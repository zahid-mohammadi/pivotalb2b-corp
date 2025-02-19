import { type RouteConfig } from "./types";

export const getRouteConfigs = (): RouteConfig[] => [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/services/:slug', changefreq: 'weekly', priority: 0.9, 
    dynamicPaths: [
      'intent-based-lead-generation',
      'content-distribution',
      'event-and-webinar-promotion',
      'lead-qualification',
      'account-based-marketing'
    ]
  },
  { path: '/blog', changefreq: 'daily', priority: 0.8 },
  { path: '/case-studies', changefreq: 'weekly', priority: 0.7 },
  { path: '/ebooks', changefreq: 'weekly', priority: 0.7 },
  { path: '/agency-partnerships', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.6 },
];

// Exclude these routes from sitemap
export const excludedRoutes = [
  '/dashboard',  // Private route
  '/login',     // Auth route
  '/not-found'  // Error page
];
