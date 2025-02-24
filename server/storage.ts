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
} from "@shared/schema";
import { db } from "./db";
import { eq, count, and, gte, avg, countDistinct, desc, sql, isNull, not as notOp } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import { FAQ } from "@shared/types";
import { format } from 'date-fns';

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
      tableName: 'user_sessions',
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

  // Analytics implementation
  async getTrafficSources(fromDate: Date): Promise<Array<{ source: string | null; count: number }>> {
    try {
      const sources = await db
        .select({
          source: pageViews.source,
          count: count(),
        })
        .from(pageViews)
        .where(
          and(
            gte(pageViews.timestamp, fromDate)
          )
        )
        .groupBy(pageViews.source);

      return sources;
    } catch (error) {
      console.error("Error getting traffic sources:", error);
      throw error;
    }
  }

  async getPageViewMetrics(fromDate: Date): Promise<Array<{ path: string; views: number; avgTime: number }>> {
    try {
      const result = await db
        .select({
          path: pageViews.path,
          views: count(),
          avgTime: avg(pageViews.duration),
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, fromDate))
        .groupBy(pageViews.path)
        .orderBy(desc(count()))
        .limit(5);

      return result.map(r => ({
        path: r.path,
        views: Number(r.views),
        avgTime: Math.round(Number(r.avgTime) || 0)
      }));
    } catch (error) {
      console.error("Error getting page view metrics:", error);
      return [];
    }
  }

  async getUserFlow(): Promise<Array<{ step: string; users: number }>> {
    try {
      const result = await db
        .select({
          path: pageViews.path,
          users: countDistinct(pageViews.sessionId)
        })
        .from(pageViews)
        .groupBy(pageViews.path)
        .orderBy(desc(countDistinct(pageViews.sessionId)))
        .limit(5);

      return result.map(r => ({
        step: r.path,
        users: Number(r.users)
      }));
    } catch (error) {
      console.error("Error getting user flow:", error);
      return [];
    }
  }

  async getOverviewMetrics(fromDate: Date): Promise<{
    totalUsers: number;
    avgSessionDuration: number;
    conversionRate: number;
    bounceRate: number;
    dailyUsers: Array<{ date: string; users: number }>;
  }> {
    try {
      // Get total users (unique sessions)
      const [{ total }] = await db
        .select({
          total: countDistinct(userSessions.sessionId)
        })
        .from(userSessions)
        .where(gte(userSessions.startTime, fromDate));

      // Get average session duration
      const [{ avgDuration }] = await db
        .select({
          avgDuration: avg(
            sql`EXTRACT(EPOCH FROM (${userSessions.endTime} - ${userSessions.startTime}))`
          ).as('avgDuration')
        })
        .from(userSessions)
        .where(and(
          gte(userSessions.startTime, fromDate),
          notOp(isNull(userSessions.endTime))
        ));

      // Get daily users for the chart
      const dailyUsers = await db
        .select({
          date: sql`DATE(${userSessions.startTime})`.as('date'),
          users: countDistinct(userSessions.sessionId).as('users')
        })
        .from(userSessions)
        .where(gte(userSessions.startTime, fromDate))
        .groupBy(sql`DATE(${userSessions.startTime})`)
        .orderBy(sql`DATE(${userSessions.startTime})`);

      // Calculate bounce rate (sessions with only one page view)
      const [{ totalSessions }] = await db
        .select({
          totalSessions: count()
        })
        .from(userSessions)
        .where(gte(userSessions.startTime, fromDate));

      const [{ bounces }] = await db
        .select({
          bounces: count()
        })
        .from(pageViews)
        .groupBy(pageViews.sessionId)
        .having(count().eq(1));

      const bounceRate = totalSessions > 0 ? (Number(bounces) / totalSessions) * 100 : 0;

      // Calculate conversion rate (reaching specific pages)
      const [{ conversions }] = await db
        .select({
          conversions: countDistinct(pageViews.sessionId)
        })
        .from(pageViews)
        .where(and(
          gte(pageViews.timestamp, fromDate),
          eq(pageViews.path, '/signup/complete')
        ));

      const conversionRate = totalSessions > 0 ? (Number(conversions) / totalSessions) * 100 : 0;

      return {
        totalUsers: Number(total) || 0,
        avgSessionDuration: Math.round(Number(avgDuration) || 0),
        conversionRate,
        bounceRate,
        dailyUsers: dailyUsers.map(d => ({
          date: format(new Date(d.date), 'EEE'),
          users: Number(d.users)
        }))
      };
    } catch (error) {
      console.error("Error getting overview metrics:", error);
      return {
        totalUsers: 0,
        avgSessionDuration: 0,
        conversionRate: 0,
        bounceRate: 0,
        dailyUsers: []
      };
    }
  }

  async getActiveUsers(): Promise<number> {
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const [{ count: activeUsers }] = await db
        .select({
          count: countDistinct(userSessions.sessionId),
        })
        .from(userSessions)
        .where(
          and(
            eq(userSessions.isActive, true),
            gte(userSessions.lastPing, fiveMinutesAgo)
          )
        );

      return Number(activeUsers) || 0;
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
          lastPing: new Date(),
          isActive: true
        })
        .where(eq(userSessions.sessionId, sessionId));
    } catch (error) {
      console.error("Error updating session activity:", error);
    }
  }
}

export const storage = new DatabaseStorage();