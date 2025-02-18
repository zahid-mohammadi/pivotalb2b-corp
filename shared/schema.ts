import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  benefits: text("benefits").array().notNull(),
  bannerImage: text("banner_image"),
  slug: text("slug").notNull().unique(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  company: varchar("company", { length: 100 }).notNull(),
  content: text("content").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metaDescription: text("meta_description").notNull(),
  metaKeywords: text("meta_keywords").notNull(),
  bannerImage: text("banner_image"),
  contentImages: text("content_images").array(),
  tags: text("tags").array(),
  autoTags: text("auto_tags").array(),
  slug: text("slug").notNull().unique(),
  publishedAt: timestamp("published_at"),
});

export const ebooks = pgTable("ebooks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  bannerImage: text("banner_image"),
  contentImages: text("content_images").array(),
  tags: text("tags").array(),
  autoTags: text("auto_tags").array(),
  downloadUrl: text("download_url"),
  pdfUrl: text("pdf_url"),
  publishedAt: timestamp("published_at"),
  slug: text("slug").notNull().unique(),
  colorTheme: jsonb("color_theme"),
});

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  clientName: text("client_name").notNull(),
  industry: text("industry").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: text("results").notNull(),
  bannerImage: text("banner_image"),
  contentImages: text("content_images").array(),
  tags: text("tags").array(),
  autoTags: text("auto_tags").array(),
  pdfUrl: text("pdf_url"),
  publishedAt: timestamp("published_at"),
  slug: text("slug").notNull().unique(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  contentType: text("content_type").notNull(),
  contentId: serial("content_id").notNull(),
  downloadedAt: timestamp("downloaded_at").defaultNow(),
});

export type ColorTheme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const loginSchema = insertUserSchema.pick({ username: true, password: true });

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
    contentImages: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    autoTags: z.array(z.string()).optional(),
  });

export const insertEbookSchema = createInsertSchema(ebooks)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
    contentImages: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    autoTags: z.array(z.string()).optional(),
    pdfUrl: z.string().optional(),
    colorTheme: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
      background: z.string(),
      text: z.string(),
    }).optional(),
    slug: z.string(),
  });

export const insertCaseStudySchema = createInsertSchema(caseStudies)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
    contentImages: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    autoTags: z.array(z.string()).optional(),
    pdfUrl: z.string().optional(),
    slug: z.string(),
  });

export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, downloadedAt: true });

export const insertServiceSchema = createInsertSchema(services)
  .omit({ id: true })
  .extend({
    bannerImage: z.string().optional(),
  });

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type Ebook = typeof ebooks.$inferSelect;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Lead = typeof leads.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertEbook = z.infer<typeof insertEbookSchema>;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;