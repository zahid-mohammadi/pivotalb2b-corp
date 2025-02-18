import { type BlogPost, type Service, type Testimonial, type InsertBlogPost, type InsertService, type InsertTestimonial } from "@shared/schema";

export interface IStorage {
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Services
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<number, BlogPost>;
  private services: Map<number, Service>;
  private testimonials: Map<number, Testimonial>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.blogPosts = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    this.currentIds = { blogPosts: 1, services: 1, testimonials: 1 };
    
    // Add initial services
    this.initializeServices();
  }

  private initializeServices() {
    const initialServices: InsertService[] = [
      {
        title: "Pinpoint Opt-in Leads",
        description: "Identify and engage highly receptive prospects with our advanced targeting system.",
        features: ["Advanced Targeting", "Triple Verification", "Opt-In Engagement"],
        benefits: ["Qualified Leads", "Improved Conversion Rates", "Cost-Effective"],
        slug: "pinpoint-opt-in-leads"
      },
      {
        title: "Strategic Content Syndication",
        description: "Amplify your content and generate high-quality leads through targeted distribution.",
        features: ["Content Distribution", "Precision Targeting", "Lead Generation"],
        benefits: ["Massive Audience Reach", "Boost Brand Awareness", "Increased Conversions"],
        slug: "strategic-content-syndication"
      },
      {
        title: "Smart Audience Events",
        description: "Transform your events into lead-generation powerhouses with targeted campaigns.",
        features: ["Audience Targeting", "Multi-Channel Campaigns", "Lead Capture"],
        benefits: ["Boost Registrations", "Qualified Leads", "Increased ROI"],
        slug: "smart-audience-events"
      },
      {
        title: "Advanced Lead Qualification",
        description: "Focus on high-potential leads and close deals faster with our qualification system.",
        features: ["Comprehensive Criteria", "Lead Scoring", "Actionable Insights"],
        benefits: ["Improved Sales Efficiency", "Increased Conversion Rates"],
        slug: "advanced-lead-qualification"
      }
    ];

    initialServices.forEach(service => this.createService(service));
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentIds.blogPosts++;
    const newPost: BlogPost = { ...post, id };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(service => service.slug === slug);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentIds.services++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentIds.testimonials++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
}

export const storage = new MemStorage();
