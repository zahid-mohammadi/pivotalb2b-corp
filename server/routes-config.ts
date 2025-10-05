
import { type RouteConfig } from "./types";
import { storage } from "./storage";

export const getRouteConfigs = async (): Promise<RouteConfig[]> => {
  // Get only the 6 active services shown in navigation
  const activeServiceSlugs = [
    'account-based-marketing-abm-programs',
    'b2b-lead-generation-qualification',
    'lead-nurturing-buyer-engagement',
    'precision-demand-generation',
    'event-marketing-audience-acquisition',
    'lead-validation-enrichment'
  ];

  return [
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/about', changefreq: 'monthly', priority: 0.8 },
    { path: '/services/:slug', changefreq: 'weekly', priority: 0.9, 
      dynamicPaths: activeServiceSlugs
    },
    { path: '/blog/:slug', changefreq: 'daily', priority: 0.8,
      dynamicPaths: await storage.getBlogPosts().then(posts => posts.map(p => p.slug))
    },
    { path: '/b2b-audience', changefreq: 'monthly', priority: 0.8 },
    { path: '/contact', changefreq: 'monthly', priority: 0.8 },
    { path: '/request-proposal', changefreq: 'monthly', priority: 0.8 },
    { path: '/ebooks/:slug', changefreq: 'weekly', priority: 0.8,
      dynamicPaths: await storage.getEbooks().then(ebooks => ebooks.map(e => e.slug))
    }
  ];
};

// Exclude these routes from sitemap
export const excludedRoutes = [
  '/dashboard',  // Private route
  '/proposal',   // Private route
  '/lead',       // Private route
  '/accounts',   // Private route
  '/contacts',   // Private route
  '/invoices',   // Private route (if exists)
  '/public',     // Public invoice view (token-based, no SEO)
  '/login',      // Auth route
  '/logout',     // Auth route
  '/signup',     // Auth route
  '/reset-password', // Auth route
  '/not-found',  // Error page
  '/admin',      // Admin routes
  '/api',        // API routes
  '/agency-partnerships', // Removed from menu and sitemap
  '/media-kit'   // Removed media kit page
];
