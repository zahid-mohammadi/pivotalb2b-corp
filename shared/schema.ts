import { pgTable, text, serial, timestamp, varchar, jsonb, boolean } from "drizzle-orm/pg-core";
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
  bannerImage: text("banner_image"),
  slug: text("slug").notNull().unique(),
  methodology: text("methodology"),
  toolsAndTechnologies: text("tools_and_technologies").array(),
  faqQuestions: jsonb("faq_questions").array(),
});

// Use case and FAQ types
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

export type Service = typeof services.$inferSelect & {
  useCases: UseCase[];
  faqQuestions: FAQ[];
};

export const insertServiceSchema = createInsertSchema(services)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
    methodology: z.string().optional(),
    toolsAndTechnologies: z.array(z.string()).optional(),
    faqQuestions: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
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