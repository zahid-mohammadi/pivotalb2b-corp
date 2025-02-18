import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metaDescription: text("meta_description").notNull(),
  metaKeywords: text("meta_keywords").notNull(),
  slug: text("slug").notNull().unique(),
  publishedAt: timestamp("published_at"),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  benefits: text("benefits").array().notNull(),
  slug: text("slug").notNull().unique(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  company: varchar("company", { length: 100 }).notNull(),
  content: text("content").notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });

export type BlogPost = typeof blogPosts.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
