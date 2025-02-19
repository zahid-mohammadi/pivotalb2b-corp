export interface RouteConfig {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  dynamicPaths?: string[];
}

export interface SitemapUrl {
  url: string;
  changefreq: RouteConfig['changefreq'];
  priority: number;
}
