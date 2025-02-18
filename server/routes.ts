import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertTestimonialSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Blog Posts
  app.get("/api/blog-posts", async (_req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.post("/api/blog-posts", async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    const post = await storage.createBlogPost(result.data);
    res.status(201).json(post);
  });

  // Services
  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get("/api/services/:slug", async (req, res) => {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  });

  // Testimonials
  app.get("/api/testimonials", async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  app.post("/api/testimonials", async (req, res) => {
    const result = insertTestimonialSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    const testimonial = await storage.createTestimonial(result.data);
    res.status(201).json(testimonial);
  });

  const httpServer = createServer(app);
  return httpServer;
}
