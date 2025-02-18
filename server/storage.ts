import { 
  type BlogPost, 
  type Service, 
  type Testimonial, 
  type User,
  type Ebook,
  type CaseStudy,
  type Lead,
  type InsertBlogPost, 
  type InsertService, 
  type InsertTestimonial,
  type InsertUser,
  type InsertEbook,
  type InsertCaseStudy,
  type InsertLead,
  blogPosts, 
  services, 
  testimonials,
  users,
  ebooks,
  caseStudies,
  leads
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresStore = connectPg(session);

export interface IStorage {
  // User Management
  getUserById(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Ebooks
  getEbooks(): Promise<Ebook[]>;
  getEbookById(id: number): Promise<Ebook | undefined>;
  createEbook(ebook: InsertEbook): Promise<Ebook>;
  getEbookBySlug(slug: string): Promise<Ebook | undefined>;
  updateEbook(id: number, ebook: Partial<InsertEbook>): Promise<Ebook>;
  deleteEbook(id: number): Promise<void>;

  // Case Studies
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudyById(id: number): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
  updateCaseStudy(id: number, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy>;
  deleteCaseStudy(id: number): Promise<void>;

  // Services
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Leads
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresStore({
      pool,
      tableName: 'session',
      createTableIfMissing: true,
    });
  }

  // User Management
  async getUserById(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error("Error getting user by username:", error);
      throw error;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const [newUser] = await db.insert(users).values(user).returning();
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
      return post;
    } catch (error) {
      console.error("Error getting blog post by slug:", error);
      throw error;
    }
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set(post)
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Ebooks
  async getEbooks(): Promise<Ebook[]> {
    return await db.select().from(ebooks);
  }

  async getEbookById(id: number): Promise<Ebook | undefined> {
    const [ebook] = await db.select().from(ebooks).where(eq(ebooks.id, id));
    return ebook;
  }

  async createEbook(ebook: InsertEbook): Promise<Ebook> {
    const [newEbook] = await db.insert(ebooks).values(ebook).returning();
    return newEbook;
  }

  async getEbookBySlug(slug: string): Promise<Ebook | undefined> {
    try {
      const [ebook] = await db.select().from(ebooks).where(eq(ebooks.slug, slug));
      return ebook;
    } catch (error) {
      console.error("Error getting ebook by slug:", error);
      throw error;
    }
  }

  async updateEbook(id: number, ebook: Partial<InsertEbook>): Promise<Ebook> {
    const [updatedEbook] = await db
      .update(ebooks)
      .set(ebook)
      .where(eq(ebooks.id, id))
      .returning();
    return updatedEbook;
  }

  async deleteEbook(id: number): Promise<void> {
    await db.delete(ebooks).where(eq(ebooks.id, id));
  }

  // Case Studies
  async getCaseStudies(): Promise<CaseStudy[]> {
    return await db.select().from(caseStudies);
  }

  async getCaseStudyById(id: number): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.id, id));
    return caseStudy;
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [newCaseStudy] = await db.insert(caseStudies).values(caseStudy).returning();
    return newCaseStudy;
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    try {
      const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
      return caseStudy;
    } catch (error) {
      console.error("Error getting case study by slug:", error);
      throw error;
    }
  }

  async updateCaseStudy(id: number, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy> {
    const [updatedCaseStudy] = await db
      .update(caseStudies)
      .set(caseStudy)
      .where(eq(caseStudies.id, id))
      .returning();
    return updatedCaseStudy;
  }

  async deleteCaseStudy(id: number): Promise<void> {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    try {
      return await db.select().from(leads).orderBy(leads.downloadedAt);
    } catch (error) {
      console.error("Error getting leads:", error);
      throw error;
    }
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    try {
      const [newLead] = await db.insert(leads).values(lead).returning();
      return newLead;
    } catch (error) {
      console.error("Error creating lead:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();