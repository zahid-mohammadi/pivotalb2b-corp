import { 
  type BlogPost, 
  type Service, 
  type Testimonial, 
  type User,
  type Ebook,
  type CaseStudy,
  type Lead,
  type ProposalRequest,
  type InsertBlogPost, 
  type InsertService, 
  type InsertTestimonial,
  type InsertUser,
  type InsertEbook,
  type InsertCaseStudy,
  type InsertLead,
  type InsertProposalRequest,
  type PipelineStage,
  type PipelineDeal,
  type LeadActivity,
  type EmailCampaign,
  type CampaignSend,
  type AutomationRule,
  type M365Connection,
  type Account,
  type Contact,
  type InsertPipelineStage,
  type InsertPipelineDeal,
  type InsertLeadActivity,
  type InsertEmailCampaign,
  type InsertCampaignSend,
  type InsertAutomationRule,
  type InsertM365Connection,
  type InsertAccount,
  type InsertContact,
  type SavedFilter,
  type InsertSavedFilter,
  type FilterAuditLog,
  type InsertFilterAuditLog,
  type FAQ,
  type TaxCode,
  type InsertTaxCode,
  type Sku,
  type InsertSku,
  type Invoice,
  type InsertInvoice,
  type InvoiceLine,
  type InsertInvoiceLine,
  type Payment,
  type InsertPayment,
  type CreditNote,
  type InsertCreditNote,
  type CreditNoteApplication,
  type InsertCreditNoteApplication,
  type Expense,
  type InsertExpense,
  type InvoiceView,
  type InsertInvoiceView,
  type InvoiceReminder,
  type InsertInvoiceReminder,
  type BillingSetting,
  type InsertBillingSetting,
  type BillingAuditLog,
  type InsertBillingAuditLog,
  blogPosts, 
  services, 
  testimonials,
  users,
  ebooks,
  caseStudies,
  leads,
  proposalRequests,
  pageViews,
  userSessions,
  pipelineStages,
  pipelineDeals,
  leadActivities,
  emailCampaigns,
  campaignSends,
  automationRules,
  m365Connections,
  accounts,
  contacts,
  savedFilters,
  filterAuditLogs,
  taxCodes,
  skus,
  invoices,
  invoiceLines,
  payments,
  creditNotes,
  creditNoteApplications,
  expenses,
  invoiceViews,
  invoiceReminders,
  billingSettings,
  billingAuditLogs,
  type PageView,
  type UserSession
} from "@shared/schema";
import { db } from "./db";
import { eq, count, and, gte, avg, countDistinct, desc, sql, isNull, not as notOp } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import { format } from 'date-fns';
import { subHours } from "date-fns";

const PostgresStore = connectPg(session);

export class DatabaseStorage {
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

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    try {
      const [updatedService] = await db
        .update(services)
        .set(service)
        .where(eq(services.id, id))
        .returning();
      
      // Parse the JSON arrays properly
      const parsedUseCases = updatedService.useCases ? updatedService.useCases.map(useCase => {
        if (typeof useCase === 'string') {
          try {
            return JSON.parse(useCase);
          } catch {
            return useCase;
          }
        }
        return useCase;
      }) : [];

      const parsedFaqQuestions = updatedService.faqQuestions ? updatedService.faqQuestions.map(faq => {
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
        ...updatedService,
        useCases: parsedUseCases,
        faqQuestions: parsedFaqQuestions,
        successMetrics: updatedService.successMetrics || []
      };
    } catch (error) {
      console.error("Error updating service:", error);
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

  async getLeadById(id: number): Promise<Lead | null> {
    try {
      const [lead] = await db.select().from(leads).where(eq(leads.id, id));
      return lead || null;
    } catch (error) {
      console.error("Error getting lead by ID:", error);
      throw error;
    }
  }

  async deleteLead(id: number): Promise<boolean> {
    try {
      const result = await db.delete(leads).where(eq(leads.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting lead:", error);
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
      const sessionDurations = db
        .select({
          sessionId: pageViews.sessionId,
          duration: sql<number>`EXTRACT(EPOCH FROM (MAX(${pageViews.timestamp}) - MIN(${pageViews.timestamp}))) / 60`.as('duration')
        })
        .from(pageViews)
        .where(gte(pageViews.timestamp, startDate))
        .groupBy(pageViews.sessionId)
        .as('session_durations');

      const [{ avg: avgTimeOnSite }] = await db
        .select({
          avg: avg(sessionDurations.duration)
        })
        .from(sessionDurations);

      // Calculate bounce rate (sessions with only one page view)
      const sessionCounts = db.select({
        sessionId: pageViews.sessionId,
        viewCount: count().as('view_count')
      })
      .from(pageViews)
      .where(gte(pageViews.timestamp, startDate))
      .groupBy(pageViews.sessionId)
      .as('session_counts');

      const [{ total: bounceCount }] = await db
        .select({
          total: count()
        })
        .from(sessionCounts)
        .where(eq(sessionCounts.viewCount, 1));

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

  async getUserFlow(): Promise<any[]> {
    // Placeholder implementation - can be expanded later if needed
    return [];
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

  // Proposal Requests
  async getProposalRequests(): Promise<ProposalRequest[]> {
    try {
      return await db.select().from(proposalRequests).orderBy(desc(proposalRequests.createdAt));
    } catch (error) {
      console.error("Error getting proposal requests:", error);
      throw error;
    }
  }

  async getProposalRequestById(id: number): Promise<ProposalRequest | undefined> {
    try {
      const [proposalRequest] = await db.select().from(proposalRequests).where(eq(proposalRequests.id, id));
      return proposalRequest;
    } catch (error) {
      console.error("Error getting proposal request by ID:", error);
      throw error;
    }
  }

  async createProposalRequest(proposalData: InsertProposalRequest): Promise<ProposalRequest> {
    try {
      const [newProposal] = await db.insert(proposalRequests).values(proposalData).returning();
      return newProposal;
    } catch (error) {
      console.error("Error creating proposal request:", error);
      throw error;
    }
  }

  async updateProposalRequestStatus(id: number, status: string): Promise<ProposalRequest> {
    try {
      const [updatedProposal] = await db
        .update(proposalRequests)
        .set({ status })
        .where(eq(proposalRequests.id, id))
        .returning();
      return updatedProposal;
    } catch (error) {
      console.error("Error updating proposal request status:", error);
      throw error;
    }
  }

  async deleteProposalRequest(id: number): Promise<void> {
    try {
      await db.delete(proposalRequests).where(eq(proposalRequests.id, id));
    } catch (error) {
      console.error("Error deleting proposal request:", error);
      throw error;
    }
  }

  // Pipeline Stages
  async getPipelineStages(): Promise<PipelineStage[]> {
    try {
      return await db.select().from(pipelineStages).orderBy(pipelineStages.order);
    } catch (error) {
      console.error("Error getting pipeline stages:", error);
      throw error;
    }
  }

  async getPipelineStageById(id: number): Promise<PipelineStage | undefined> {
    try {
      const [stage] = await db.select().from(pipelineStages).where(eq(pipelineStages.id, id));
      return stage;
    } catch (error) {
      console.error("Error getting pipeline stage by ID:", error);
      throw error;
    }
  }

  async createPipelineStage(stage: InsertPipelineStage): Promise<PipelineStage> {
    try {
      const [newStage] = await db.insert(pipelineStages).values(stage).returning();
      return newStage;
    } catch (error) {
      console.error("Error creating pipeline stage:", error);
      throw error;
    }
  }

  async updatePipelineStage(id: number, stage: Partial<InsertPipelineStage>): Promise<PipelineStage> {
    try {
      const [updatedStage] = await db.update(pipelineStages).set(stage).where(eq(pipelineStages.id, id)).returning();
      return updatedStage;
    } catch (error) {
      console.error("Error updating pipeline stage:", error);
      throw error;
    }
  }

  async deletePipelineStage(id: number): Promise<void> {
    try {
      await db.delete(pipelineStages).where(eq(pipelineStages.id, id));
    } catch (error) {
      console.error("Error deleting pipeline stage:", error);
      throw error;
    }
  }

  // Pipeline Deals
  async getPipelineDeals(): Promise<PipelineDeal[]> {
    try {
      return await db.select().from(pipelineDeals).orderBy(desc(pipelineDeals.createdAt));
    } catch (error) {
      console.error("Error getting pipeline deals:", error);
      throw error;
    }
  }

  async getPipelineDealById(id: number): Promise<PipelineDeal | undefined> {
    try {
      const [deal] = await db.select().from(pipelineDeals).where(eq(pipelineDeals.id, id));
      return deal;
    } catch (error) {
      console.error("Error getting pipeline deal by ID:", error);
      throw error;
    }
  }

  async getPipelineDealsByStage(stageId: number): Promise<PipelineDeal[]> {
    try {
      return await db.select().from(pipelineDeals).where(eq(pipelineDeals.stageId, stageId));
    } catch (error) {
      console.error("Error getting pipeline deals by stage:", error);
      throw error;
    }
  }

  async createPipelineDeal(deal: InsertPipelineDeal): Promise<PipelineDeal> {
    try {
      const [newDeal] = await db.insert(pipelineDeals).values([deal]).returning();
      return newDeal;
    } catch (error) {
      console.error("Error creating pipeline deal:", error);
      throw error;
    }
  }

  async updatePipelineDeal(id: number, deal: Partial<InsertPipelineDeal>): Promise<PipelineDeal> {
    try {
      const updateData: any = {
        ...deal,
        updatedAt: new Date(),
      };
      if (deal.closedAt) {
        updateData.closedAt = new Date(deal.closedAt);
      }
      const [updatedDeal] = await db.update(pipelineDeals).set(updateData).where(eq(pipelineDeals.id, id)).returning();
      return updatedDeal;
    } catch (error) {
      console.error("Error updating pipeline deal:", error);
      throw error;
    }
  }

  async deletePipelineDeal(id: number): Promise<void> {
    try {
      await db.delete(pipelineDeals).where(eq(pipelineDeals.id, id));
    } catch (error) {
      console.error("Error deleting pipeline deal:", error);
      throw error;
    }
  }

  // Lead Activities
  async getLeadActivitiesByDeal(dealId: number): Promise<LeadActivity[]> {
    try {
      return await db.select().from(leadActivities).where(eq(leadActivities.dealId, dealId)).orderBy(desc(leadActivities.createdAt));
    } catch (error) {
      console.error("Error getting lead activities:", error);
      throw error;
    }
  }

  async createLeadActivity(activity: InsertLeadActivity): Promise<LeadActivity> {
    try {
      const [newActivity] = await db.insert(leadActivities).values(activity).returning();
      return newActivity;
    } catch (error) {
      console.error("Error creating lead activity:", error);
      throw error;
    }
  }

  async deleteLeadActivity(id: number): Promise<void> {
    try {
      await db.delete(leadActivities).where(eq(leadActivities.id, id));
    } catch (error) {
      console.error("Error deleting lead activity:", error);
      throw error;
    }
  }

  // Email Campaigns
  async getEmailCampaigns(): Promise<EmailCampaign[]> {
    try {
      return await db.select().from(emailCampaigns).orderBy(desc(emailCampaigns.createdAt));
    } catch (error) {
      console.error("Error getting email campaigns:", error);
      throw error;
    }
  }

  async getEmailCampaignById(id: number): Promise<EmailCampaign | undefined> {
    try {
      const [campaign] = await db.select().from(emailCampaigns).where(eq(emailCampaigns.id, id));
      return campaign;
    } catch (error) {
      console.error("Error getting email campaign by ID:", error);
      throw error;
    }
  }

  async createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign> {
    try {
      const [newCampaign] = await db.insert(emailCampaigns).values([campaign]).returning();
      return newCampaign;
    } catch (error) {
      console.error("Error creating email campaign:", error);
      throw error;
    }
  }

  async updateEmailCampaign(id: number, campaign: Partial<InsertEmailCampaign>): Promise<EmailCampaign> {
    try {
      const updateData: any = {
        ...campaign,
        scheduledAt: campaign.scheduledAt ? new Date(campaign.scheduledAt) : undefined,
        sentAt: campaign.sentAt ? new Date(campaign.sentAt) : undefined,
      };
      const [updatedCampaign] = await db.update(emailCampaigns).set(updateData).where(eq(emailCampaigns.id, id)).returning();
      return updatedCampaign;
    } catch (error) {
      console.error("Error updating email campaign:", error);
      throw error;
    }
  }

  async deleteEmailCampaign(id: number): Promise<void> {
    try {
      await db.delete(emailCampaigns).where(eq(emailCampaigns.id, id));
    } catch (error) {
      console.error("Error deleting email campaign:", error);
      throw error;
    }
  }

  // Campaign Sends
  async getCampaignSendsByCampaign(campaignId: number): Promise<CampaignSend[]> {
    try {
      return await db.select().from(campaignSends).where(eq(campaignSends.campaignId, campaignId));
    } catch (error) {
      console.error("Error getting campaign sends:", error);
      throw error;
    }
  }

  async createCampaignSend(send: InsertCampaignSend): Promise<CampaignSend> {
    try {
      const [newSend] = await db.insert(campaignSends).values([send]).returning();
      return newSend;
    } catch (error) {
      console.error("Error creating campaign send:", error);
      throw error;
    }
  }

  async updateCampaignSend(id: number, send: Partial<InsertCampaignSend>): Promise<CampaignSend> {
    try {
      const updateData: any = {
        ...send,
        openedAt: send.openedAt ? new Date(send.openedAt) : undefined,
        clickedAt: send.clickedAt ? new Date(send.clickedAt) : undefined,
        bouncedAt: send.bouncedAt ? new Date(send.bouncedAt) : undefined,
        unsubscribedAt: send.unsubscribedAt ? new Date(send.unsubscribedAt) : undefined,
      };
      const [updatedSend] = await db.update(campaignSends).set(updateData).where(eq(campaignSends.id, id)).returning();
      return updatedSend;
    } catch (error) {
      console.error("Error updating campaign send:", error);
      throw error;
    }
  }

  // Automation Rules
  async getAutomationRules(): Promise<AutomationRule[]> {
    try {
      return await db.select().from(automationRules).orderBy(desc(automationRules.createdAt));
    } catch (error) {
      console.error("Error getting automation rules:", error);
      throw error;
    }
  }

  async getAutomationRuleById(id: number): Promise<AutomationRule | undefined> {
    try {
      const [rule] = await db.select().from(automationRules).where(eq(automationRules.id, id));
      return rule;
    } catch (error) {
      console.error("Error getting automation rule by ID:", error);
      throw error;
    }
  }

  async createAutomationRule(rule: InsertAutomationRule): Promise<AutomationRule> {
    try {
      const [newRule] = await db.insert(automationRules).values([rule]).returning();
      return newRule;
    } catch (error) {
      console.error("Error creating automation rule:", error);
      throw error;
    }
  }

  async updateAutomationRule(id: number, rule: Partial<InsertAutomationRule>): Promise<AutomationRule> {
    try {
      const [updatedRule] = await db.update(automationRules).set(rule).where(eq(automationRules.id, id)).returning();
      return updatedRule;
    } catch (error) {
      console.error("Error updating automation rule:", error);
      throw error;
    }
  }

  async deleteAutomationRule(id: number): Promise<void> {
    try {
      await db.delete(automationRules).where(eq(automationRules.id, id));
    } catch (error) {
      console.error("Error deleting automation rule:", error);
      throw error;
    }
  }

  // M365 Connections
  async getM365ConnectionByUser(userId: number): Promise<M365Connection | undefined> {
    try {
      const [connection] = await db.select().from(m365Connections).where(eq(m365Connections.userId, userId));
      return connection;
    } catch (error) {
      console.error("Error getting M365 connection:", error);
      throw error;
    }
  }

  async createM365Connection(connection: InsertM365Connection): Promise<M365Connection> {
    try {
      const connectionData = {
        ...connection,
        expiresAt: new Date(connection.expiresAt),
      };
      const [newConnection] = await db.insert(m365Connections).values(connectionData).returning();
      return newConnection;
    } catch (error) {
      console.error("Error creating M365 connection:", error);
      throw error;
    }
  }

  async updateM365Connection(id: number, connection: Partial<InsertM365Connection>): Promise<M365Connection> {
    try {
      const updateData = {
        ...connection,
        expiresAt: connection.expiresAt ? new Date(connection.expiresAt) : undefined,
        updatedAt: new Date(),
      };
      const [updatedConnection] = await db.update(m365Connections).set(updateData).where(eq(m365Connections.id, id)).returning();
      return updatedConnection;
    } catch (error) {
      console.error("Error updating M365 connection:", error);
      throw error;
    }
  }

  async deleteM365Connection(id: number): Promise<void> {
    try {
      await db.delete(m365Connections).where(eq(m365Connections.id, id));
    } catch (error) {
      console.error("Error deleting M365 connection:", error);
      throw error;
    }
  }

  // Accounts
  async getAccounts(): Promise<Account[]> {
    try {
      return await db.select().from(accounts).orderBy(desc(accounts.createdAt));
    } catch (error) {
      console.error("Error getting accounts:", error);
      throw error;
    }
  }

  async getAccountById(id: number): Promise<Account | undefined> {
    try {
      const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
      return account;
    } catch (error) {
      console.error("Error getting account by ID:", error);
      throw error;
    }
  }

  async getAccountByDomain(domain: string): Promise<Account | undefined> {
    try {
      const [account] = await db.select().from(accounts).where(eq(accounts.domain, domain));
      return account;
    } catch (error) {
      console.error("Error getting account by domain:", error);
      throw error;
    }
  }

  async createAccount(account: InsertAccount): Promise<Account> {
    try {
      const [newAccount] = await db.insert(accounts).values(account).returning();
      return newAccount;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async updateAccount(id: number, account: Partial<InsertAccount>): Promise<Account> {
    try {
      const updateData = {
        ...account,
        updatedAt: new Date(),
      };
      const [updatedAccount] = await db.update(accounts).set(updateData).where(eq(accounts.id, id)).returning();
      return updatedAccount;
    } catch (error) {
      console.error("Error updating account:", error);
      throw error;
    }
  }

  async deleteAccount(id: number): Promise<void> {
    try {
      await db.delete(accounts).where(eq(accounts.id, id));
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    try {
      return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
    } catch (error) {
      console.error("Error getting contacts:", error);
      throw error;
    }
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    try {
      const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
      return contact;
    } catch (error) {
      console.error("Error getting contact by ID:", error);
      throw error;
    }
  }

  async getContactsByAccount(accountId: number): Promise<Contact[]> {
    try {
      return await db.select().from(contacts).where(eq(contacts.accountId, accountId)).orderBy(desc(contacts.createdAt));
    } catch (error) {
      console.error("Error getting contacts by account:", error);
      throw error;
    }
  }

  async getContactByEmail(email: string): Promise<Contact | undefined> {
    try {
      const [contact] = await db.select().from(contacts).where(eq(contacts.email, email));
      return contact;
    } catch (error) {
      console.error("Error getting contact by email:", error);
      throw error;
    }
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    try {
      const [newContact] = await db.insert(contacts).values(contact).returning();
      return newContact;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }

  async updateContact(id: number, contact: Partial<InsertContact>): Promise<Contact> {
    try {
      const updateData = {
        ...contact,
        lastEngagementAt: contact.lastEngagementAt ? new Date(contact.lastEngagementAt) : undefined,
        updatedAt: new Date(),
      };
      const [updatedContact] = await db.update(contacts).set(updateData).where(eq(contacts.id, id)).returning();
      return updatedContact;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }

  async deleteContact(id: number): Promise<void> {
    try {
      await db.delete(contacts).where(eq(contacts.id, id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }

  // Saved Filters
  async getSavedFilters(entity?: string, userId?: number): Promise<SavedFilter[]> {
    try {
      let query = db.select().from(savedFilters);
      
      const conditions = [];
      if (entity) conditions.push(eq(savedFilters.entity, entity));
      if (userId) {
        conditions.push(
          sql`(${savedFilters.createdBy} = ${userId} OR ${savedFilters.visibility} != 'private')`
        );
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
      
      return await query.orderBy(desc(savedFilters.createdAt));
    } catch (error) {
      console.error("Error getting saved filters:", error);
      throw error;
    }
  }

  async getSavedFilterById(id: number): Promise<SavedFilter | undefined> {
    try {
      const [filter] = await db.select().from(savedFilters).where(eq(savedFilters.id, id));
      return filter;
    } catch (error) {
      console.error("Error getting saved filter by ID:", error);
      throw error;
    }
  }

  async createSavedFilter(filter: InsertSavedFilter): Promise<SavedFilter> {
    try {
      const [newFilter] = await db.insert(savedFilters).values(filter).returning();
      return newFilter;
    } catch (error) {
      console.error("Error creating saved filter:", error);
      throw error;
    }
  }

  async updateSavedFilter(id: number, filter: Partial<InsertSavedFilter>): Promise<SavedFilter> {
    try {
      const updateData = {
        ...filter,
        updatedAt: new Date(),
      };
      const [updatedFilter] = await db.update(savedFilters).set(updateData).where(eq(savedFilters.id, id)).returning();
      return updatedFilter;
    } catch (error) {
      console.error("Error updating saved filter:", error);
      throw error;
    }
  }

  async deleteSavedFilter(id: number): Promise<void> {
    try {
      await db.delete(savedFilters).where(eq(savedFilters.id, id));
    } catch (error) {
      console.error("Error deleting saved filter:", error);
      throw error;
    }
  }

  // Filter Audit Logs
  async createFilterAuditLog(log: InsertFilterAuditLog): Promise<FilterAuditLog> {
    try {
      const [newLog] = await db.insert(filterAuditLogs).values(log).returning();
      return newLog;
    } catch (error) {
      console.error("Error creating filter audit log:", error);
      throw error;
    }
  }

  async getFilterAuditLogs(userId?: number, limit = 100): Promise<FilterAuditLog[]> {
    try {
      let query = db.select().from(filterAuditLogs);
      
      if (userId) {
        query = query.where(eq(filterAuditLogs.userId, userId));
      }
      
      return await query.orderBy(desc(filterAuditLogs.executedAt)).limit(limit);
    } catch (error) {
      console.error("Error getting filter audit logs:", error);
      throw error;
    }
  }

  // Tax Codes
  async getTaxCodes(): Promise<TaxCode[]> {
    try {
      return await db.select().from(taxCodes).orderBy(taxCodes.name);
    } catch (error) {
      console.error("Error getting tax codes:", error);
      throw error;
    }
  }

  async getTaxCodeById(id: number): Promise<TaxCode | undefined> {
    try {
      const [taxCode] = await db.select().from(taxCodes).where(eq(taxCodes.id, id));
      return taxCode;
    } catch (error) {
      console.error("Error getting tax code by ID:", error);
      throw error;
    }
  }

  async createTaxCode(taxCode: InsertTaxCode): Promise<TaxCode> {
    try {
      const [newTaxCode] = await db.insert(taxCodes).values(taxCode).returning();
      return newTaxCode;
    } catch (error) {
      console.error("Error creating tax code:", error);
      throw error;
    }
  }

  async updateTaxCode(id: number, taxCode: Partial<InsertTaxCode>): Promise<TaxCode> {
    try {
      const [updatedTaxCode] = await db.update(taxCodes).set(taxCode).where(eq(taxCodes.id, id)).returning();
      return updatedTaxCode;
    } catch (error) {
      console.error("Error updating tax code:", error);
      throw error;
    }
  }

  async deleteTaxCode(id: number): Promise<void> {
    try {
      await db.delete(taxCodes).where(eq(taxCodes.id, id));
    } catch (error) {
      console.error("Error deleting tax code:", error);
      throw error;
    }
  }

  // SKUs (Products/Services)
  async getSKUs(): Promise<Sku[]> {
    try {
      return await db.select().from(skus).orderBy(desc(skus.createdAt));
    } catch (error) {
      console.error("Error getting SKUs:", error);
      throw error;
    }
  }

  async getSKUById(id: number): Promise<Sku | undefined> {
    try {
      const [sku] = await db.select().from(skus).where(eq(skus.id, id));
      return sku;
    } catch (error) {
      console.error("Error getting SKU by ID:", error);
      throw error;
    }
  }

  async getSKUBySKUCode(skuCode: string): Promise<Sku | undefined> {
    try {
      const [sku] = await db.select().from(skus).where(eq(skus.code, skuCode));
      return sku;
    } catch (error) {
      console.error("Error getting SKU by code:", error);
      throw error;
    }
  }

  async createSKU(sku: InsertSku): Promise<Sku> {
    try {
      const [newSKU] = await db.insert(skus).values(sku).returning();
      return newSKU;
    } catch (error) {
      console.error("Error creating SKU:", error);
      throw error;
    }
  }

  async updateSKU(id: number, sku: Partial<InsertSku>): Promise<Sku> {
    try {
      const [updatedSKU] = await db.update(skus).set(sku).where(eq(skus.id, id)).returning();
      return updatedSKU;
    } catch (error) {
      console.error("Error updating SKU:", error);
      throw error;
    }
  }

  async deleteSKU(id: number): Promise<void> {
    try {
      await db.delete(skus).where(eq(skus.id, id));
    } catch (error) {
      console.error("Error deleting SKU:", error);
      throw error;
    }
  }

  // Invoices
  async getInvoices(): Promise<Invoice[]> {
    try {
      return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
    } catch (error) {
      console.error("Error getting invoices:", error);
      throw error;
    }
  }

  async getInvoiceById(id: number): Promise<Invoice | undefined> {
    try {
      const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
      return invoice;
    } catch (error) {
      console.error("Error getting invoice by ID:", error);
      throw error;
    }
  }

  async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    try {
      const [invoice] = await db.select().from(invoices).where(eq(invoices.number, invoiceNumber));
      return invoice;
    } catch (error) {
      console.error("Error getting invoice by number:", error);
      throw error;
    }
  }

  async getInvoicesByAccount(accountId: number): Promise<Invoice[]> {
    try {
      return await db.select().from(invoices).where(eq(invoices.accountId, accountId)).orderBy(desc(invoices.createdAt));
    } catch (error) {
      console.error("Error getting invoices by account:", error);
      throw error;
    }
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    try {
      const invoiceData = {
        ...invoice,
        issueDate: new Date(invoice.issueDate),
        dueDate: new Date(invoice.dueDate),
        voidedAt: invoice.voidedAt ? new Date(invoice.voidedAt) : undefined,
      };
      const [newInvoice] = await db.insert(invoices).values(invoiceData).returning();
      return newInvoice;
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  }

  async updateInvoice(id: number, invoice: Partial<InsertInvoice>): Promise<Invoice> {
    try {
      const updateData = {
        ...invoice,
        issueDate: invoice.issueDate ? new Date(invoice.issueDate) : undefined,
        dueDate: invoice.dueDate ? new Date(invoice.dueDate) : undefined,
        voidedAt: invoice.voidedAt ? new Date(invoice.voidedAt) : undefined,
      };
      const [updatedInvoice] = await db.update(invoices).set(updateData).where(eq(invoices.id, id)).returning();
      return updatedInvoice;
    } catch (error) {
      console.error("Error updating invoice:", error);
      throw error;
    }
  }

  async deleteInvoice(id: number): Promise<void> {
    try {
      await db.delete(invoices).where(eq(invoices.id, id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
      throw error;
    }
  }

  // Invoice Lines
  async getInvoiceLinesByInvoice(invoiceId: number): Promise<InvoiceLine[]> {
    try {
      return await db.select().from(invoiceLines).where(eq(invoiceLines.invoiceId, invoiceId));
    } catch (error) {
      console.error("Error getting invoice lines:", error);
      throw error;
    }
  }

  async createInvoiceLine(line: InsertInvoiceLine): Promise<InvoiceLine> {
    try {
      const [newLine] = await db.insert(invoiceLines).values(line).returning();
      return newLine;
    } catch (error) {
      console.error("Error creating invoice line:", error);
      throw error;
    }
  }

  async updateInvoiceLine(id: number, line: Partial<InsertInvoiceLine>): Promise<InvoiceLine> {
    try {
      const [updatedLine] = await db.update(invoiceLines).set(line).where(eq(invoiceLines.id, id)).returning();
      return updatedLine;
    } catch (error) {
      console.error("Error updating invoice line:", error);
      throw error;
    }
  }

  async deleteInvoiceLine(id: number): Promise<void> {
    try {
      await db.delete(invoiceLines).where(eq(invoiceLines.id, id));
    } catch (error) {
      console.error("Error deleting invoice line:", error);
      throw error;
    }
  }

  async deleteInvoiceLinesByInvoice(invoiceId: number): Promise<void> {
    try {
      await db.delete(invoiceLines).where(eq(invoiceLines.invoiceId, invoiceId));
    } catch (error) {
      console.error("Error deleting invoice lines by invoice:", error);
      throw error;
    }
  }

  // Payments
  async getPayments(): Promise<Payment[]> {
    try {
      return await db.select().from(payments).orderBy(desc(payments.receivedAt));
    } catch (error) {
      console.error("Error getting payments:", error);
      throw error;
    }
  }

  async getPaymentById(id: number): Promise<Payment | undefined> {
    try {
      const [payment] = await db.select().from(payments).where(eq(payments.id, id));
      return payment;
    } catch (error) {
      console.error("Error getting payment by ID:", error);
      throw error;
    }
  }

  async getPaymentsByInvoice(invoiceId: number): Promise<Payment[]> {
    try {
      return await db.select().from(payments).where(eq(payments.invoiceId, invoiceId)).orderBy(desc(payments.receivedAt));
    } catch (error) {
      console.error("Error getting payments by invoice:", error);
      throw error;
    }
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    try {
      const paymentData = {
        ...payment,
        receivedAt: new Date(payment.receivedAt),
      };
      const [newPayment] = await db.insert(payments).values(paymentData).returning();
      return newPayment;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  }

  async updatePayment(id: number, payment: Partial<InsertPayment>): Promise<Payment> {
    try {
      const updateData = {
        ...payment,
        receivedAt: payment.receivedAt ? new Date(payment.receivedAt) : undefined,
      };
      const [updatedPayment] = await db.update(payments).set(updateData).where(eq(payments.id, id)).returning();
      return updatedPayment;
    } catch (error) {
      console.error("Error updating payment:", error);
      throw error;
    }
  }

  async deletePayment(id: number): Promise<void> {
    try {
      await db.delete(payments).where(eq(payments.id, id));
    } catch (error) {
      console.error("Error deleting payment:", error);
      throw error;
    }
  }

  // Credit Notes
  async getCreditNotes(): Promise<CreditNote[]> {
    try {
      return await db.select().from(creditNotes).orderBy(desc(creditNotes.createdAt));
    } catch (error) {
      console.error("Error getting credit notes:", error);
      throw error;
    }
  }

  async getCreditNoteById(id: number): Promise<CreditNote | undefined> {
    try {
      const [creditNote] = await db.select().from(creditNotes).where(eq(creditNotes.id, id));
      return creditNote;
    } catch (error) {
      console.error("Error getting credit note by ID:", error);
      throw error;
    }
  }

  async getCreditNotesByAccount(accountId: number): Promise<CreditNote[]> {
    try {
      return await db.select().from(creditNotes).where(eq(creditNotes.accountId, accountId)).orderBy(desc(creditNotes.createdAt));
    } catch (error) {
      console.error("Error getting credit notes by account:", error);
      throw error;
    }
  }

  async createCreditNote(creditNote: InsertCreditNote): Promise<CreditNote> {
    try {
      const creditNoteData = {
        ...creditNote,
        issueDate: new Date(creditNote.issueDate),
      };
      const [newCreditNote] = await db.insert(creditNotes).values(creditNoteData).returning();
      return newCreditNote;
    } catch (error) {
      console.error("Error creating credit note:", error);
      throw error;
    }
  }

  async updateCreditNote(id: number, creditNote: Partial<InsertCreditNote>): Promise<CreditNote> {
    try {
      const updateData = {
        ...creditNote,
        issueDate: creditNote.issueDate ? new Date(creditNote.issueDate) : undefined,
      };
      const [updatedCreditNote] = await db.update(creditNotes).set(updateData).where(eq(creditNotes.id, id)).returning();
      return updatedCreditNote;
    } catch (error) {
      console.error("Error updating credit note:", error);
      throw error;
    }
  }

  async deleteCreditNote(id: number): Promise<void> {
    try {
      await db.delete(creditNotes).where(eq(creditNotes.id, id));
    } catch (error) {
      console.error("Error deleting credit note:", error);
      throw error;
    }
  }

  // Credit Note Applications
  async getCreditNoteApplicationsByCreditNote(creditNoteId: number): Promise<CreditNoteApplication[]> {
    try {
      return await db.select().from(creditNoteApplications).where(eq(creditNoteApplications.creditNoteId, creditNoteId));
    } catch (error) {
      console.error("Error getting credit note applications:", error);
      throw error;
    }
  }

  async getCreditNoteApplicationsByInvoice(invoiceId: number): Promise<CreditNoteApplication[]> {
    try {
      return await db.select().from(creditNoteApplications).where(eq(creditNoteApplications.invoiceId, invoiceId));
    } catch (error) {
      console.error("Error getting credit note applications by invoice:", error);
      throw error;
    }
  }

  async createCreditNoteApplication(application: InsertCreditNoteApplication): Promise<CreditNoteApplication> {
    try {
      const [newApplication] = await db.insert(creditNoteApplications).values(application).returning();
      return newApplication;
    } catch (error) {
      console.error("Error creating credit note application:", error);
      throw error;
    }
  }

  async deleteCreditNoteApplication(id: number): Promise<void> {
    try {
      await db.delete(creditNoteApplications).where(eq(creditNoteApplications.id, id));
    } catch (error) {
      console.error("Error deleting credit note application:", error);
      throw error;
    }
  }

  // Expenses
  async getExpenses(): Promise<Expense[]> {
    try {
      return await db.select().from(expenses).orderBy(desc(expenses.date));
    } catch (error) {
      console.error("Error getting expenses:", error);
      throw error;
    }
  }

  async getExpenseById(id: number): Promise<Expense | undefined> {
    try {
      const [expense] = await db.select().from(expenses).where(eq(expenses.id, id));
      return expense;
    } catch (error) {
      console.error("Error getting expense by ID:", error);
      throw error;
    }
  }

  async getExpensesByVendor(vendorAccountId: number): Promise<Expense[]> {
    try {
      return await db.select().from(expenses).where(eq(expenses.vendorAccountId, vendorAccountId)).orderBy(desc(expenses.date));
    } catch (error) {
      console.error("Error getting expenses by vendor:", error);
      throw error;
    }
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    try {
      const expenseData = {
        ...expense,
        date: new Date(expense.date),
        paidAt: expense.paidAt ? new Date(expense.paidAt) : undefined,
        approvedAt: expense.approvedAt ? new Date(expense.approvedAt) : undefined,
      };
      const [newExpense] = await db.insert(expenses).values(expenseData).returning();
      return newExpense;
    } catch (error) {
      console.error("Error creating expense:", error);
      throw error;
    }
  }

  async updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense> {
    try {
      const updateData = {
        ...expense,
        date: expense.date ? new Date(expense.date) : undefined,
        paidAt: expense.paidAt ? new Date(expense.paidAt) : undefined,
        approvedAt: expense.approvedAt ? new Date(expense.approvedAt) : undefined,
      };
      const [updatedExpense] = await db.update(expenses).set(updateData).where(eq(expenses.id, id)).returning();
      return updatedExpense;
    } catch (error) {
      console.error("Error updating expense:", error);
      throw error;
    }
  }

  async deleteExpense(id: number): Promise<void> {
    try {
      await db.delete(expenses).where(eq(expenses.id, id));
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  }

  // Invoice Views
  async createInvoiceView(view: InsertInvoiceView): Promise<InvoiceView> {
    try {
      const [newView] = await db.insert(invoiceViews).values(view).returning();
      return newView;
    } catch (error) {
      console.error("Error creating invoice view:", error);
      throw error;
    }
  }

  async getInvoiceViewsByInvoice(invoiceId: number): Promise<InvoiceView[]> {
    try {
      return await db.select().from(invoiceViews).where(eq(invoiceViews.invoiceId, invoiceId)).orderBy(desc(invoiceViews.viewedAt));
    } catch (error) {
      console.error("Error getting invoice views:", error);
      throw error;
    }
  }

  // Invoice Reminders
  async getInvoiceRemindersByInvoice(invoiceId: number): Promise<InvoiceReminder[]> {
    try {
      return await db.select().from(invoiceReminders).where(eq(invoiceReminders.invoiceId, invoiceId)).orderBy(desc(invoiceReminders.sentAt));
    } catch (error) {
      console.error("Error getting invoice reminders:", error);
      throw error;
    }
  }

  async createInvoiceReminder(reminder: InsertInvoiceReminder): Promise<InvoiceReminder> {
    try {
      const reminderData = {
        ...reminder,
        openedAt: reminder.openedAt ? new Date(reminder.openedAt) : undefined,
        clickedAt: reminder.clickedAt ? new Date(reminder.clickedAt) : undefined,
      };
      const [newReminder] = await db.insert(invoiceReminders).values(reminderData).returning();
      return newReminder;
    } catch (error) {
      console.error("Error creating invoice reminder:", error);
      throw error;
    }
  }

  async updateInvoiceReminder(id: number, reminder: Partial<InsertInvoiceReminder>): Promise<InvoiceReminder> {
    try {
      const updateData = {
        ...reminder,
        openedAt: reminder.openedAt ? new Date(reminder.openedAt) : undefined,
        clickedAt: reminder.clickedAt ? new Date(reminder.clickedAt) : undefined,
      };
      const [updatedReminder] = await db.update(invoiceReminders).set(updateData).where(eq(invoiceReminders.id, id)).returning();
      return updatedReminder;
    } catch (error) {
      console.error("Error updating invoice reminder:", error);
      throw error;
    }
  }

  // Billing Settings
  async getBillingSettings(): Promise<BillingSetting[]> {
    try {
      return await db.select().from(billingSettings);
    } catch (error) {
      console.error("Error getting billing settings:", error);
      throw error;
    }
  }

  async getBillingSettingByKey(key: string): Promise<BillingSetting | undefined> {
    try {
      const [setting] = await db.select().from(billingSettings).where(eq(billingSettings.key, key));
      return setting;
    } catch (error) {
      console.error("Error getting billing setting by key:", error);
      throw error;
    }
  }

  async upsertBillingSetting(setting: InsertBillingSetting): Promise<BillingSetting> {
    try {
      const [upsertedSetting] = await db
        .insert(billingSettings)
        .values(setting)
        .onConflictDoUpdate({
          target: billingSettings.key,
          set: { value: setting.value },
        })
        .returning();
      return upsertedSetting;
    } catch (error) {
      console.error("Error upserting billing setting:", error);
      throw error;
    }
  }

  async deleteBillingSetting(key: string): Promise<void> {
    try {
      await db.delete(billingSettings).where(eq(billingSettings.key, key));
    } catch (error) {
      console.error("Error deleting billing setting:", error);
      throw error;
    }
  }

  // Billing Audit Logs
  async createBillingAuditLog(log: InsertBillingAuditLog): Promise<BillingAuditLog> {
    try {
      const [newLog] = await db.insert(billingAuditLogs).values(log).returning();
      return newLog;
    } catch (error) {
      console.error("Error creating billing audit log:", error);
      throw error;
    }
  }

  async getBillingAuditLogs(entityType?: string, entityId?: number, limit = 100): Promise<BillingAuditLog[]> {
    try {
      let query = db.select().from(billingAuditLogs);
      
      const conditions = [];
      if (entityType) conditions.push(eq(billingAuditLogs.entityType, entityType));
      if (entityId) conditions.push(eq(billingAuditLogs.entityId, entityId));
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
      
      return await query.orderBy(desc(billingAuditLogs.performedAt)).limit(limit);
    } catch (error) {
      console.error("Error getting billing audit logs:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();