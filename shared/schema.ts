import { pgTable, text, serial, timestamp, varchar, jsonb, bigint, integer, decimal, boolean } from "drizzle-orm/pg-core";
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
  contactId: serial("contact_id"),
  accountId: serial("account_id"),
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
    contactId: z.number().optional(),
    accountId: z.number().optional(),
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

// Accounts (Companies)
export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 200 }).notNull(),
  domain: varchar("domain", { length: 255 }),
  industry: varchar("industry", { length: 100 }),
  companySize: varchar("company_size", { length: 50 }),
  location: varchar("location", { length: 200 }),
  country: varchar("country", { length: 100 }),
  revenueBand: varchar("revenue_band", { length: 50 }),
  naicsCode: varchar("naics_code", { length: 20 }),
  website: text("website"),
  description: text("description"),
  engagementScore: serial("engagement_score").default(0),
  accountTier: varchar("account_tier", { length: 20 }),
  assignedTo: serial("assigned_to"),
  tags: text("tags").array(),
  notes: text("notes"),
  billingAddress: text("billing_address"),
  billingEmail: varchar("billing_email", { length: 255 }),
  taxId: varchar("tax_id", { length: 100 }),
  paymentTerms: varchar("payment_terms", { length: 50 }).default("Net 30"),
  currency: varchar("currency", { length: 3 }).default("USD"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Account = typeof accounts.$inferSelect;
export const insertAccountSchema = createInsertSchema(accounts)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    domain: z.string().optional(),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    location: z.string().optional(),
    country: z.string().optional(),
    revenueBand: z.string().optional(),
    naicsCode: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    engagementScore: z.number().optional(),
    accountTier: z.string().optional(),
    assignedTo: z.number().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().optional(),
    billingAddress: z.string().optional(),
    billingEmail: z.string().email().optional(),
    taxId: z.string().optional(),
    paymentTerms: z.string().optional(),
    currency: z.string().optional(),
  });

export type InsertAccount = z.infer<typeof insertAccountSchema>;

// Contacts (Individuals)
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  jobTitle: varchar("job_title", { length: 100 }),
  department: varchar("department", { length: 100 }),
  jobLevel: varchar("job_level", { length: 50 }),
  accountId: serial("account_id"),
  leadSource: text("lead_source"),
  engagementScore: serial("engagement_score").default(0),
  lastEngagementAt: timestamp("last_engagement_at"),
  assignedTo: serial("assigned_to"),
  status: varchar("status", { length: 50 }).default("active").notNull(),
  tags: text("tags").array(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export const insertContactSchema = createInsertSchema(contacts)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    phone: z.string().optional(),
    jobTitle: z.string().optional(),
    department: z.string().optional(),
    jobLevel: z.string().optional(),
    accountId: z.number().optional(),
    leadSource: z.string().optional(),
    engagementScore: z.number().optional(),
    lastEngagementAt: z.string().datetime().optional(),
    assignedTo: z.number().optional(),
    status: z.string().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().optional(),
  });

export type InsertContact = z.infer<typeof insertContactSchema>;

// Saved Filters/Views
export const savedFilters = pgTable("saved_filters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  entity: varchar("entity", { length: 50 }).notNull(),
  definition: jsonb("definition").notNull(),
  visibility: varchar("visibility", { length: 20 }).default("private").notNull(),
  createdBy: serial("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SavedFilter = typeof savedFilters.$inferSelect;
export const insertSavedFilterSchema = createInsertSchema(savedFilters)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    definition: z.any(),
  });

export type InsertSavedFilter = z.infer<typeof insertSavedFilterSchema>;

// Filter Execution Audit
export const filterAuditLogs = pgTable("filter_audit_logs", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull(),
  entity: varchar("entity", { length: 50 }).notNull(),
  filterDefinition: jsonb("filter_definition").notNull(),
  resultCount: serial("result_count").notNull(),
  executedAt: timestamp("executed_at").defaultNow().notNull(),
});

export type FilterAuditLog = typeof filterAuditLogs.$inferSelect;
export const insertFilterAuditLogSchema = createInsertSchema(filterAuditLogs)
  .omit({ id: true, executedAt: true })
  .extend({
    filterDefinition: z.any(),
  });

export type InsertFilterAuditLog = z.infer<typeof insertFilterAuditLogSchema>;

// ==================== BILLING & ACCOUNTING ====================

// Tax Codes
export const taxCodes = pgTable("tax_codes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  rate: decimal("rate", { precision: 5, scale: 2 }).notNull(),
  jurisdiction: varchar("jurisdiction", { length: 100 }),
  isInclusive: boolean("is_inclusive").default(false).notNull(),
  isCompounding: boolean("is_compounding").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TaxCode = typeof taxCodes.$inferSelect;
export const insertTaxCodeSchema = createInsertSchema(taxCodes)
  .omit({ id: true, createdAt: true })
  .extend({
    jurisdiction: z.string().optional(),
    isInclusive: z.boolean().optional(),
    isCompounding: z.boolean().optional(),
    isActive: z.boolean().optional(),
  });
export type InsertTaxCode = z.infer<typeof insertTaxCodeSchema>;

// Products/Services Catalog (SKUs)
export const skus = pgTable("skus", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  unitPrice: bigint("unit_price", { mode: "number" }).notNull(),
  cost: bigint("cost", { mode: "number" }),
  taxCodeId: integer("tax_code_id").references(() => taxCodes.id),
  glCategory: varchar("gl_category", { length: 100 }),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Sku = typeof skus.$inferSelect;
export const insertSkuSchema = createInsertSchema(skus)
  .omit({ id: true, createdAt: true })
  .extend({
    description: z.string().optional(),
    cost: z.number().optional(),
    taxCodeId: z.number().optional(),
    glCategory: z.string().optional(),
    currency: z.string().optional(),
    isActive: z.boolean().optional(),
  });
export type InsertSku = z.infer<typeof insertSkuSchema>;

// Invoices
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  number: varchar("number", { length: 50 }).notNull().unique(),
  type: varchar("type", { length: 20 }).default("invoice").notNull(),
  accountId: integer("account_id").notNull().references(() => accounts.id),
  contactId: integer("contact_id").notNull().references(() => contacts.id),
  dealId: integer("deal_id").references(() => pipelineDeals.id),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  fxRate: decimal("fx_rate", { precision: 10, scale: 6 }).default("1.000000").notNull(),
  terms: varchar("terms", { length: 50 }),
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  subtotal: bigint("subtotal", { mode: "number" }).notNull(),
  taxTotal: bigint("tax_total", { mode: "number" }).notNull(),
  shipping: bigint("shipping", { mode: "number" }).default(0).notNull(),
  adjustments: bigint("adjustments", { mode: "number" }).default(0).notNull(),
  total: bigint("total", { mode: "number" }).notNull(),
  amountPaid: bigint("amount_paid", { mode: "number" }).default(0).notNull(),
  amountDue: bigint("amount_due", { mode: "number" }).notNull(),
  taxMode: varchar("tax_mode", { length: 20 }).default("exclusive").notNull(),
  pdfUrl: text("pdf_url"),
  notes: text("notes"),
  viewedAt: timestamp("viewed_at"),
  lastViewedAt: timestamp("last_viewed_at"),
  viewCount: integer("view_count").default(0).notNull(),
  lastReminderAt: timestamp("last_reminder_at"),
  reminderCount: integer("reminder_count").default(0).notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  voidedAt: timestamp("voided_at"),
  voidedBy: integer("voided_by").references(() => users.id),
  voidReason: text("void_reason"),
});

export type Invoice = typeof invoices.$inferSelect;
export const insertInvoiceSchema = createInsertSchema(invoices)
  .omit({ id: true, createdAt: true, updatedAt: true, createdBy: true })
  .extend({
    issueDate: z.string(),
    dueDate: z.string(),
    dealId: z.number().optional(),
    terms: z.string().optional(),
    shipping: z.number().optional(),
    adjustments: z.number().optional(),
    pdfUrl: z.string().optional(),
    notes: z.string().optional(),
    viewedAt: z.string().datetime().optional(),
    lastViewedAt: z.string().datetime().optional(),
    viewCount: z.number().optional(),
    lastReminderAt: z.string().datetime().optional(),
    reminderCount: z.number().optional(),
    voidedAt: z.string().datetime().optional(),
    voidedBy: z.number().optional(),
    voidReason: z.string().optional(),
  });
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

// Invoice Lines
export const invoiceLines = pgTable("invoice_lines", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull().references(() => invoices.id),
  skuId: integer("sku_id").references(() => skus.id),
  description: text("description").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: bigint("unit_price", { mode: "number" }).notNull(),
  discountPercent: decimal("discount_percent", { precision: 5, scale: 2 }).default("0").notNull(),
  taxCodeId: integer("tax_code_id").references(() => taxCodes.id),
  lineSubtotal: bigint("line_subtotal", { mode: "number" }).notNull(),
  lineTax: bigint("line_tax", { mode: "number" }).notNull(),
  lineTotal: bigint("line_total", { mode: "number" }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export type InvoiceLine = typeof invoiceLines.$inferSelect;
export const insertInvoiceLineSchema = createInsertSchema(invoiceLines)
  .omit({ id: true })
  .extend({
    skuId: z.number().optional(),
    discountPercent: z.string().optional(),
    taxCodeId: z.number().optional(),
    sortOrder: z.number().optional(),
  });
export type InsertInvoiceLine = z.infer<typeof insertInvoiceLineSchema>;

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull().references(() => invoices.id),
  method: varchar("method", { length: 50 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  fxRate: decimal("fx_rate", { precision: 10, scale: 6 }).default("1.000000").notNull(),
  amount: bigint("amount", { mode: "number" }).notNull(),
  fee: bigint("fee", { mode: "number" }).default(0).notNull(),
  netAmount: bigint("net_amount", { mode: "number" }).notNull(),
  receivedAt: timestamp("received_at").notNull(),
  reference: varchar("reference", { length: 100 }),
  gatewayTxnId: varchar("gateway_txn_id", { length: 200 }),
  refundedAmount: bigint("refunded_amount", { mode: "number" }).default(0).notNull(),
  notes: text("notes"),
  receiptUrl: text("receipt_url"),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export const insertPaymentSchema = createInsertSchema(payments)
  .omit({ id: true, createdAt: true })
  .extend({
    fee: z.number().optional(),
    reference: z.string().optional(),
    gatewayTxnId: z.string().optional(),
    refundedAmount: z.number().optional(),
    notes: z.string().optional(),
    receiptUrl: z.string().optional(),
  });
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

// Credit Notes
export const creditNotes = pgTable("credit_notes", {
  id: serial("id").primaryKey(),
  number: varchar("number", { length: 50 }).notNull().unique(),
  accountId: integer("account_id").notNull().references(() => accounts.id),
  contactId: integer("contact_id").notNull().references(() => contacts.id),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  total: bigint("total", { mode: "number" }).notNull(),
  balance: bigint("balance", { mode: "number" }).notNull(),
  reason: text("reason"),
  issueDate: timestamp("issue_date").notNull(),
  pdfUrl: text("pdf_url"),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CreditNote = typeof creditNotes.$inferSelect;
export const insertCreditNoteSchema = createInsertSchema(creditNotes)
  .omit({ id: true, createdAt: true })
  .extend({
    reason: z.string().optional(),
    pdfUrl: z.string().optional(),
  });
export type InsertCreditNote = z.infer<typeof insertCreditNoteSchema>;

// Credit Note Applications
export const creditNoteApplications = pgTable("credit_note_applications", {
  id: serial("id").primaryKey(),
  creditNoteId: integer("credit_note_id").notNull().references(() => creditNotes.id),
  invoiceId: integer("invoice_id").notNull().references(() => invoices.id),
  amount: bigint("amount", { mode: "number" }).notNull(),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
});

export type CreditNoteApplication = typeof creditNoteApplications.$inferSelect;
export const insertCreditNoteApplicationSchema = createInsertSchema(creditNoteApplications)
  .omit({ id: true, appliedAt: true });
export type InsertCreditNoteApplication = z.infer<typeof insertCreditNoteApplicationSchema>;

// Expenses
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  vendorAccountId: integer("vendor_account_id").notNull().references(() => accounts.id),
  category: varchar("category", { length: 100 }).notNull(),
  amount: bigint("amount", { mode: "number" }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  taxCodeId: integer("tax_code_id").references(() => taxCodes.id),
  date: timestamp("date").notNull(),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  dealId: integer("deal_id").references(() => pipelineDeals.id),
  attachmentUrl: text("attachment_url"),
  notes: text("notes"),
  paidAt: timestamp("paid_at"),
  paidBy: integer("paid_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  approvedBy: integer("approved_by").references(() => users.id),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Expense = typeof expenses.$inferSelect;
export const insertExpenseSchema = createInsertSchema(expenses)
  .omit({ id: true, createdAt: true })
  .extend({
    taxCodeId: z.number().optional(),
    dealId: z.number().optional(),
    attachmentUrl: z.string().optional(),
    notes: z.string().optional(),
    paidAt: z.string().datetime().optional(),
    paidBy: z.number().optional(),
    approvedAt: z.string().datetime().optional(),
    approvedBy: z.number().optional(),
  });
export type InsertExpense = z.infer<typeof insertExpenseSchema>;

// Invoice View Tracking
export const invoiceViews = pgTable("invoice_views", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull().references(() => invoices.id),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  deviceType: varchar("device_type", { length: 50 }),
});

export type InvoiceView = typeof invoiceViews.$inferSelect;
export const insertInvoiceViewSchema = createInsertSchema(invoiceViews)
  .omit({ id: true, viewedAt: true })
  .extend({
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    deviceType: z.string().optional(),
  });
export type InsertInvoiceView = z.infer<typeof insertInvoiceViewSchema>;

// Invoice Reminders
export const invoiceReminders = pgTable("invoice_reminders", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull().references(() => invoices.id),
  reminderType: varchar("reminder_type", { length: 50 }).notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  sentBy: integer("sent_by").notNull().references(() => users.id),
  emailOpened: boolean("email_opened").default(false).notNull(),
  emailClicked: boolean("email_clicked").default(false).notNull(),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
});

export type InvoiceReminder = typeof invoiceReminders.$inferSelect;
export const insertInvoiceReminderSchema = createInsertSchema(invoiceReminders)
  .omit({ id: true, sentAt: true })
  .extend({
    emailOpened: z.boolean().optional(),
    emailClicked: z.boolean().optional(),
    openedAt: z.string().datetime().optional(),
    clickedAt: z.string().datetime().optional(),
  });
export type InsertInvoiceReminder = z.infer<typeof insertInvoiceReminderSchema>;

// Billing Settings
export const billingSettings = pgTable("billing_settings", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 200 }),
  legalName: varchar("legal_name", { length: 200 }),
  logoUrl: text("logo_url"),
  primaryColor: varchar("primary_color", { length: 7 }),
  address: text("address"),
  taxRegistration: varchar("tax_registration", { length: 100 }),
  bankDetails: text("bank_details"),
  invoiceFooter: text("invoice_footer"),
  invoicePrefix: varchar("invoice_prefix", { length: 20 }).default("INV").notNull(),
  estimatePrefix: varchar("estimate_prefix", { length: 20 }).default("EST").notNull(),
  creditNotePrefix: varchar("credit_note_prefix", { length: 20 }).default("CN").notNull(),
  nextInvoiceNumber: integer("next_invoice_number").default(1).notNull(),
  nextEstimateNumber: integer("next_estimate_number").default(1).notNull(),
  nextCreditNoteNumber: integer("next_credit_note_number").default(1).notNull(),
  defaultCurrency: varchar("default_currency", { length: 3 }).default("USD").notNull(),
  defaultTerms: varchar("default_terms", { length: 50 }).default("Net 30").notNull(),
  lateFeeEnabled: boolean("late_fee_enabled").default(false).notNull(),
  lateFeeType: varchar("late_fee_type", { length: 20 }),
  lateFeeAmount: bigint("late_fee_amount", { mode: "number" }),
  lateFeePercent: decimal("late_fee_percent", { precision: 5, scale: 2 }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BillingSetting = typeof billingSettings.$inferSelect;
export const insertBillingSettingSchema = createInsertSchema(billingSettings)
  .omit({ id: true, updatedAt: true })
  .extend({
    companyName: z.string().optional(),
    legalName: z.string().optional(),
    logoUrl: z.string().optional(),
    primaryColor: z.string().optional(),
    address: z.string().optional(),
    taxRegistration: z.string().optional(),
    bankDetails: z.string().optional(),
    invoiceFooter: z.string().optional(),
    invoicePrefix: z.string().optional(),
    estimatePrefix: z.string().optional(),
    creditNotePrefix: z.string().optional(),
    nextInvoiceNumber: z.number().optional(),
    nextEstimateNumber: z.number().optional(),
    nextCreditNoteNumber: z.number().optional(),
    defaultCurrency: z.string().optional(),
    defaultTerms: z.string().optional(),
    lateFeeEnabled: z.boolean().optional(),
    lateFeeType: z.string().optional(),
    lateFeeAmount: z.number().optional(),
    lateFeePercent: z.string().optional(),
  });
export type InsertBillingSetting = z.infer<typeof insertBillingSettingSchema>;

// Billing Audit Log
export const billingAuditLogs = pgTable("billing_audit_logs", {
  id: serial("id").primaryKey(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: integer("entity_id").notNull(),
  action: varchar("action", { length: 50 }).notNull(),
  changes: jsonb("changes"),
  performedBy: integer("performed_by").notNull().references(() => users.id),
  performedAt: timestamp("performed_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export type BillingAuditLog = typeof billingAuditLogs.$inferSelect;
export const insertBillingAuditLogSchema = createInsertSchema(billingAuditLogs)
  .omit({ id: true, performedAt: true })
  .extend({
    changes: z.any().optional(),
    ipAddress: z.string().optional(),
  });
export type InsertBillingAuditLog = z.infer<typeof insertBillingAuditLogSchema>;