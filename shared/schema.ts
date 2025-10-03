import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Authentication
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  metaDescription: text("meta_description"),
  bannerImage: text("banner_image"),
  contentImages: text("content_images").array(),
  publishedAt: timestamp("published_at"),
  tags: text("tags").array(),
  autoTags: text("auto_tags").array(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
    contentImages: z.array(z.string()).optional(),
    publishedAt: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    autoTags: z.array(z.string()).optional(),
  });

// Case Studies
export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  slug: text("slug").notNull().unique(),
  clientName: varchar("client_name", { length: 100 }).notNull(),
  industry: text("industry").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: text("results").notNull(),
  testimonial: text("testimonial"),
  bannerImage: text("banner_image"),
  pdfUrl: text("pdf_url"),
  contentImages: text("content_images").array(),
  publishedAt: timestamp("published_at"),
  tags: text("tags").array(),
  autoTags: text("auto_tags").array(),
});

export type CaseStudy = typeof caseStudies.$inferSelect;
export const insertCaseStudySchema = createInsertSchema(caseStudies)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
    testimonial: z.string().optional(),
    publishedAt: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    autoTags: z.array(z.string()).optional(),
  });

// Ebooks
export const ebooks = pgTable("ebooks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  coverImage: text("cover_image"),
  publishedAt: timestamp("published_at"),
  tags: text("tags").array(),
  autoTags: text("auto_tags").array(),
});

export type Ebook = typeof ebooks.$inferSelect;
export const insertEbookSchema = createInsertSchema(ebooks)
  .omit({ id: true })
  .extend({
    coverImage: z.string().optional(),
    publishedAt: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    autoTags: z.array(z.string()).optional(),
  });

// Leads
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  contentType: text("content_type").notNull(),
  contentId: serial("content_id").notNull(),
  downloadedAt: timestamp("downloaded_at").defaultNow().notNull(),
  message: text("message"),
  source: text("source").default("download"),
});

export type Lead = typeof leads.$inferSelect;
export const insertLeadSchema = createInsertSchema(leads)
  .omit({ id: true, downloadedAt: true })
  .extend({
    phone: z.string().optional(),
    message: z.string().optional(),
    source: z.string().optional(),
  });

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true });

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  benefits: text("benefits").array().notNull(),
  successMetrics: text("success_metrics").array(),
  methodology: text("methodology"),
  toolsAndTechnologies: text("tools_and_technologies").array(),
  bannerImage: text("banner_image"),
  slug: text("slug").notNull().unique(),
  useCases: jsonb("use_cases").array(),
  faqQuestions: jsonb("faq_questions").array(),
  industries: text("industries").array(),
});

export type UseCase = {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type MethodologyStep = {
  title: string;
  description: string;
};

export type Service = typeof services.$inferSelect & {
  useCases: UseCase[];
  faqQuestions: FAQ[];
  successMetrics: string[];
};

export const insertServiceSchema = createInsertSchema(services)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
    methodology: z.string().optional(),
    toolsAndTechnologies: z.array(z.string()).optional(),
    successMetrics: z.array(z.string()).optional(),
    useCases: z.array(z.object({
      title: z.string(),
      description: z.string(),
      challenge: z.string(),
      solution: z.string(),
      outcome: z.string()
    })).optional(),
    faqQuestions: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    industries: z.array(z.string()).optional(),
  });

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 100 }).notNull(),
  company: varchar("company", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  content: text("content").notNull(),
  rating: serial("rating").notNull(),
  avatar: text("avatar"),
});

export type Testimonial = typeof testimonials.$inferSelect;
export const insertTestimonialSchema = createInsertSchema(testimonials)
  .omit({ id: true })
  .extend({
    avatar: z.string().optional(),
  });

// Add missing type exports
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEbook = z.infer<typeof insertEbookSchema>;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertProposalRequest = z.infer<typeof insertProposalRequestSchema>;

// Session store table for connect-pg-simple (separate from analytics)
export const sessions = pgTable("sessions", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});

// Analytics Tables - Simplified version
export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  source: text("source"),
  deviceType: text("device_type"),
  sessionId: text("session_id").notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  startTime: timestamp("start_time").defaultNow().notNull(),
  lastActive: timestamp("last_active").defaultNow().notNull(),
  source: text("source"),
  deviceType: text("device_type"),
});

// Types for analytics
export type PageView = typeof pageViews.$inferSelect;
export type UserSession = typeof userSessions.$inferSelect;

export const insertPageViewSchema = createInsertSchema(pageViews).omit({ 
  id: true,
  timestamp: true 
});

export const insertUserSessionSchema = createInsertSchema(userSessions).omit({ 
  id: true,
  startTime: true,
  lastActive: true 
});

// Proposal Requests
export const proposalRequests = pgTable("proposal_requests", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  companyName: varchar("company_name", { length: 100 }).notNull(),
  jobTitle: varchar("job_title", { length: 100 }),
  interestedServices: text("interested_services").array().notNull(),
  primaryGoals: text("primary_goals").array().notNull(),
  otherGoal: text("other_goal"),
  timeline: varchar("timeline", { length: 50 }).notNull(),
  targetGeography: text("target_geography").array().notNull(),
  otherGeography: text("other_geography"),
  jobFunction: text("job_function").array().notNull(),
  otherJobFunction: text("other_job_function"),
  jobLevel: text("job_level").array().notNull(),
  otherJobLevel: text("other_job_level"),
  companyIndustries: text("company_industries").notNull(),
  companySize: text("company_size").array().notNull(),
  technographics: text("technographics"),
  hasTargetAccounts: text("has_target_accounts"),
  targetAccountsList: text("target_accounts_list"),
  targetAccountsFileUrl: text("target_accounts_file_url"),
  additionalNeeds: text("additional_needs"),
  currentChallenges: text("current_challenges"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: varchar("status", { length: 50 }).default("new").notNull(),
});

export type ProposalRequest = typeof proposalRequests.$inferSelect;
export const insertProposalRequestSchema = createInsertSchema(proposalRequests)
  .omit({ id: true, createdAt: true, status: true })
  .extend({
    phoneNumber: z.string().optional(),
    jobTitle: z.string().optional(),
    otherGoal: z.string().optional(),
    otherGeography: z.string().optional(),
    otherJobFunction: z.string().optional(),
    otherJobLevel: z.string().optional(),
    technographics: z.string().optional(),
    hasTargetAccounts: z.string().optional(),
    targetAccountsList: z.string().optional(),
    targetAccountsFileUrl: z.string().optional(),
    additionalNeeds: z.string().optional(),
    currentChallenges: z.string().optional(),
  });

// Pipeline Stages
export const pipelineStages = pgTable("pipeline_stages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  order: serial("order").notNull(),
  color: varchar("color", { length: 50 }),
});

export type PipelineStage = typeof pipelineStages.$inferSelect;
export const insertPipelineStageSchema = createInsertSchema(pipelineStages)
  .omit({ id: true })
  .extend({
    color: z.string().optional(),
  });

export type InsertPipelineStage = z.infer<typeof insertPipelineStageSchema>;

// Pipeline Deals/Opportunities
export const pipelineDeals = pgTable("pipeline_deals", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  jobTitle: varchar("job_title", { length: 100 }),
  stageId: serial("stage_id").notNull(),
  dealValue: serial("deal_value"),
  probability: serial("probability"),
  source: text("source").notNull(),
  sourceId: serial("source_id"),
  assignedTo: serial("assigned_to"),
  engagementScore: serial("engagement_score").default(0),
  lastEngagementAt: timestamp("last_engagement_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  closedAt: timestamp("closed_at"),
  notes: text("notes"),
});

export type PipelineDeal = typeof pipelineDeals.$inferSelect;
export const insertPipelineDealSchema = createInsertSchema(pipelineDeals)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    phone: z.string().optional(),
    jobTitle: z.string().optional(),
    dealValue: z.number().optional(),
    probability: z.number().optional(),
    sourceId: z.number().optional(),
    assignedTo: z.number().optional(),
    engagementScore: z.number().optional(),
    lastEngagementAt: z.string().datetime().optional(),
    closedAt: z.string().datetime().optional(),
    notes: z.string().optional(),
  });

export type InsertPipelineDeal = z.infer<typeof insertPipelineDealSchema>;

// Lead Activities / Engagement History
export const leadActivities = pgTable("lead_activities", {
  id: serial("id").primaryKey(),
  dealId: serial("deal_id").notNull(),
  activityType: text("activity_type").notNull(),
  subject: text("subject"),
  description: text("description"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: serial("created_by"),
});

export type LeadActivity = typeof leadActivities.$inferSelect;
export const insertLeadActivitySchema = createInsertSchema(leadActivities)
  .omit({ id: true, createdAt: true })
  .extend({
    subject: z.string().optional(),
    description: z.string().optional(),
    metadata: z.any().optional(),
    createdBy: z.number().optional(),
  });

export type InsertLeadActivity = z.infer<typeof insertLeadActivitySchema>;

// Email Campaigns
export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 300 }).notNull(),
  subjectB: varchar("subject_b", { length: 300 }),
  content: text("content").notNull(),
  contentB: text("content_b"),
  segmentFilters: jsonb("segment_filters"),
  status: varchar("status", { length: 50 }).default("draft").notNull(),
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: serial("created_by").notNull(),
});

export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns)
  .omit({ id: true, createdAt: true })
  .extend({
    subjectB: z.string().optional(),
    contentB: z.string().optional(),
    segmentFilters: z.any().optional(),
    scheduledAt: z.string().datetime().optional(),
    sentAt: z.string().datetime().optional(),
  });

export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;

// Campaign Sends / Email Tracking
export const campaignSends = pgTable("campaign_sends", {
  id: serial("id").primaryKey(),
  campaignId: serial("campaign_id").notNull(),
  dealId: serial("deal_id").notNull(),
  variantType: varchar("variant_type", { length: 10 }),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  bouncedAt: timestamp("bounced_at"),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

export type CampaignSend = typeof campaignSends.$inferSelect;
export const insertCampaignSendSchema = createInsertSchema(campaignSends)
  .omit({ id: true, sentAt: true })
  .extend({
    variantType: z.string().optional(),
    openedAt: z.string().datetime().optional(),
    clickedAt: z.string().datetime().optional(),
    bouncedAt: z.string().datetime().optional(),
    unsubscribedAt: z.string().datetime().optional(),
  });

export type InsertCampaignSend = z.infer<typeof insertCampaignSendSchema>;

// Automation Rules
export const automationRules = pgTable("automation_rules", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  trigger: varchar("trigger", { length: 100 }).notNull(),
  conditions: jsonb("conditions"),
  actions: jsonb("actions").notNull(),
  isActive: serial("is_active").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: serial("created_by").notNull(),
});

export type AutomationRule = typeof automationRules.$inferSelect;
export const insertAutomationRuleSchema = createInsertSchema(automationRules)
  .omit({ id: true, createdAt: true })
  .extend({
    conditions: z.any().optional(),
    actions: z.any(),
  });

export type InsertAutomationRule = z.infer<typeof insertAutomationRuleSchema>;

// Microsoft 365 Email Connections
export const m365Connections = pgTable("m365_connections", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type M365Connection = typeof m365Connections.$inferSelect;
export const insertM365ConnectionSchema = createInsertSchema(m365Connections)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    expiresAt: z.string().datetime(),
  });

export type InsertM365Connection = z.infer<typeof insertM365ConnectionSchema>;