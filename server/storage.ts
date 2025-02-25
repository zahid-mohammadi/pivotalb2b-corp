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
  leads,
  pageViews,
  userSessions,
  type PageView,
  type UserSession
} from "@shared/schema";
import { db } from "./db";
import { eq, count, and, gte, avg, countDistinct, desc, sql, isNull, not as notOp } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import { FAQ } from "@shared/types";
import { format } from 'date-fns';
import { subHours } from "date-fns";

const PostgresStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  // Expose database and table definitions
  public readonly db = db;
  public readonly pageViews = pageViews;
  public readonly userSessions = userSessions;

  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresStore({
      pool,
      tableName: 'sessions',
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
    try {
      const [newPost] = await db.insert(blogPosts).values([{
        ...post,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      }]).returning();
      return newPost;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    try {
      const [updatedPost] = await db
        .update(blogPosts)
        .set({
          ...post,
          publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
        })
        .where(eq(blogPosts.id, id))
        .returning();
      return updatedPost;
    } catch (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }
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
    try {
      const [newEbook] = await db.insert(ebooks).values([{
        ...ebook,
        publishedAt: ebook.publishedAt ? new Date(ebook.publishedAt) : null,
      }]).returning();
      return newEbook;
    } catch (error) {
      console.error("Error creating ebook:", error);
      throw error;
    }
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
    try {
      const [updatedEbook] = await db
        .update(ebooks)
        .set({
          ...ebook,
          publishedAt: ebook.publishedAt ? new Date(ebook.publishedAt) : undefined,
        })
        .where(eq(ebooks.id, id))
        .returning();
      return updatedEbook;
    } catch (error) {
      console.error("Error updating ebook:", error);
      throw error;
    }
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
    try {
      const [newCaseStudy] = await db.insert(caseStudies).values([{
        ...caseStudy,
        publishedAt: caseStudy.publishedAt ? new Date(caseStudy.publishedAt) : null,
      }]).returning();
      return newCaseStudy;
    } catch (error) {
      console.error("Error creating case study:", error);
      throw error;
    }
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
    try {
      const [updatedCaseStudy] = await db
        .update(caseStudies)
        .set({
          ...caseStudy,
          publishedAt: caseStudy.publishedAt ? new Date(caseStudy.publishedAt) : undefined,
        })
        .where(eq(caseStudies.id, id))
        .returning();
      return updatedCaseStudy;
    } catch (error) {
      console.error("Error updating case study:", error);
      throw error;
    }
  }

  async deleteCaseStudy(id: number): Promise<void> {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
  }

  // Services
  async getServices(): Promise<Service[]> {
    try {
      const servicesData = await db.select().from(services);
      return servicesData.map(service => ({
        ...service,
        useCases: [], 
        faqQuestions: service.faqQuestions as FAQ[] || [] 
      }));
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    try {
      const [service] = await db.select().from(services).where(eq(services.slug, slug));
      if (!service) return undefined;

      // Parse the JSON arrays properly
      const parsedUseCases = service.useCases ? service.useCases.map(useCase => {
        if (typeof useCase === 'string') {
          try {
            return JSON.parse(useCase);
          } catch {
            return useCase;
          }
        }
        return useCase;
      }) : [];

      const parsedFaqQuestions = service.faqQuestions ? service.faqQuestions.map(faq => {
        if (typeof faq === 'string') {
          try {
            return JSON.parse(faq);
          } catch {
            return faq;
          }
        }
        return faq;
      }) : [];

      return {
        ...service,
        useCases: parsedUseCases,
        faqQuestions: parsedFaqQuestions,
        successMetrics: service.successMetrics || []
      };
    } catch (error) {
      console.error("Error getting service by slug:", error);
      throw error;
    }
  }

  async createService(service: InsertService): Promise<Service> {
    try {
      const [newService] = await db.insert(services).values(service).returning();
      return {
        ...newService,
        useCases: [], 
        faqQuestions: newService.faqQuestions as FAQ[] || []
      };
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
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

  // Basic Analytics Methods
  async getBasicMetrics(): Promise<{
    totalPageViews: number;
    uniqueVisitors: number;
    topPages: Array<{ path: string; views: number }>;
  }> {
    try {
      // Get total page views
      const [{ total: totalPageViews }] = await db
        .select({
          total: count()
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, subHours(new Date(), 24)));

      // Get unique visitors
      const [{ total: uniqueVisitors }] = await db
        .select({
          total: countDistinct(pageViews.sessionId)
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, subHours(new Date(), 24)));

      // Get top pages
      const topPages = await db
        .select({
          path: pageViews.path,
          views: count()
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, subHours(new Date(), 24)))
        .groupBy(pageViews.path)
        .orderBy(desc(count()))
        .limit(5);

      return {
        totalPageViews: Number(totalPageViews) || 0,
        uniqueVisitors: Number(uniqueVisitors) || 0,
        topPages: topPages.map(p => ({
          path: p.path,
          views: Number(p.views)
        }))
      };
    } catch (error) {
      console.error("Error getting basic metrics:", error);
      return {
        totalPageViews: 0,
        uniqueVisitors: 0,
        topPages: []
      };
    }
  }

  async getActiveUsers(): Promise<number> {
    try {
      // Consider users active if they've had activity in the last 15 minutes
      const activeTimeWindow = new Date(Date.now() - 15 * 60 * 1000);

      const [{ active }] = await db
        .select({
          active: countDistinct(userSessions.sessionId)
        })
        .from(userSessions)
        .where(gte(userSessions.lastActive, activeTimeWindow));

      return Number(active) || 0;
    } catch (error) {
      console.error("Error getting active users:", error);
      return 0;
    }
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    try {
      await db
        .update(userSessions)
        .set({
          lastActive: new Date()
        })
        .where(eq(userSessions.sessionId, sessionId));
    } catch (error) {
      console.error("Error updating session activity:", error);
    }
  }

  async updateUserActivity(sessionId: string): Promise<void> {
    try {
      await db
        .insert(userSessions)
        .values({
          sessionId,
          source: 'direct',
          deviceType: 'unknown'
        })
        .onConflictDoUpdate({
          target: userSessions.sessionId,
          set: {
            lastActive: new Date()
          }
        });
    } catch (error) {
      console.error("Error updating user activity:", error);
    }
  }

  async recordPageView(data: {
    path: string;
    sessionId: string;
    source?: string;
    deviceType?: string;
  }): Promise<void> {
    try {
      await db.insert(pageViews).values({
        ...data,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error recording page view:", error);
    }
  }

  // User Management Methods
  async getUsers(): Promise<User[]> {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await db.delete(users).where(eq(users.id, id));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // Analytics Methods
  async getOverviewMetrics(startDate: Date): Promise<{
    totalPageViews: number;
    uniqueVisitors: number;
    averageTimeOnSite: number;
    bounceRate: number;
  }> {
    try {
      // Get total page views
      const [{ total: totalPageViews }] = await db
        .select({
          total: count()
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, startDate));

      // Get unique visitors
      const [{ total: uniqueVisitors }] = await db
        .select({
          total: countDistinct(pageViews.sessionId)
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, startDate));

      // Get average time on site (in minutes)
      const [{ avg: avgTimeOnSite }] = await db
        .select({
          avg: avg(
            sql`EXTRACT(EPOCH FROM (MAX(${pageViews.timestamp}) - MIN(${pageViews.timestamp}))) / 60`
          )
        })
        .from(pageViews)
        .groupBy(pageViews.sessionId)
        .where(gte(pageViews.timestamp, startDate));

      // Calculate bounce rate (sessions with only one page view)
      const [{ total: bounceCount }] = await db
        .select({
          total: count()
        })
        .from(
          db.select({
            sessionId: pageViews.sessionId,
            viewCount: count()
          })
          .from(pageViews)
          .where(gte(pageViews.timestamp, startDate))
          .groupBy(pageViews.sessionId)
          .as('session_counts')
        )
        .where(eq(sql`view_count`, 1));

      const bounceRate = (Number(bounceCount) / Number(uniqueVisitors)) * 100;

      return {
        totalPageViews: Number(totalPageViews) || 0,
        uniqueVisitors: Number(uniqueVisitors) || 0,
        averageTimeOnSite: Number(avgTimeOnSite) || 0,
        bounceRate: Number(bounceRate) || 0
      };
    } catch (error) {
      console.error("Error getting overview metrics:", error);
      throw error;
    }
  }

  async getTrafficSources(startDate: Date): Promise<Array<{ source: string; count: number }>> {
    try {
      const sources = await db
        .select({
          source: pageViews.source,
          count: count()
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, startDate))
        .groupBy(pageViews.source)
        .orderBy(desc(count()));

      return sources.map(({ source, count }) => ({
        source: source || 'direct',
        count: Number(count)
      }));
    } catch (error) {
      console.error("Error getting traffic sources:", error);
      throw error;
    }
  }

  async getPageViewMetrics(startDate: Date): Promise<Array<{
    date: string;
    views: number;
    uniqueVisitors: number;
  }>> {
    try {
      const metrics = await db
        .select({
          date: sql`DATE(${pageViews.timestamp})`,
          views: count(),
          uniqueVisitors: countDistinct(pageViews.sessionId)
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, startDate))
        .groupBy(sql`DATE(${pageViews.timestamp})`)
        .orderBy(sql`DATE(${pageViews.timestamp})`);

      return metrics.map(({ date, views, uniqueVisitors }) => ({
        date: format(date, 'yyyy-MM-dd'),
        views: Number(views),
        uniqueVisitors: Number(uniqueVisitors)
      }));
    } catch (error) {
      console.error("Error getting page view metrics:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();