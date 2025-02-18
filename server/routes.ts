import type { Express } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import {
  insertBlogPostSchema,
  insertTestimonialSchema,
  insertEbookSchema,
  insertCaseStudySchema
} from "@shared/schema";
import multer from "multer";
import path from "path";
import express from 'express';
import { eq } from "drizzle-orm";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(app: Express) {
  // Set up authentication
  setupAuth(app);

  // Image Upload
  app.post("/api/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

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

  app.patch("/api/blog-posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertBlogPostSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const post = await storage.updateBlogPost(id, result.data);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deleteBlogPost(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });


  // Ebooks
  app.get("/api/ebooks", async (_req, res) => {
    const ebooks = await storage.getEbooks();
    res.json(ebooks);
  });

  app.get("/api/ebooks/:slug", async (req, res) => {
    const ebook = await storage.getEbookBySlug(req.params.slug);
    if (!ebook) return res.status(404).json({ message: "Ebook not found" });
    res.json(ebook);
  });

  app.post("/api/ebooks", async (req, res) => {
    try {
      const result = insertEbookSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const ebook = await storage.createEbook(result.data);
      res.status(201).json(ebook);
    } catch (error: any) {
      console.error("Error creating ebook:", error);
      if (error.code === '23505' && error.constraint === 'ebooks_slug_key') {
        return res.status(400).json({ error: "An ebook with this slug already exists. Please try a different title." });
      }
      res.status(500).json({ error: "Failed to create ebook" });
    }
  });

  app.patch("/api/ebooks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertEbookSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const ebook = await storage.updateEbook(id, result.data);
      res.json(ebook);
    } catch (error) {
      console.error("Error updating ebook:", error);
      res.status(500).json({ error: "Failed to update ebook" });
    }
  });

  app.delete("/api/ebooks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deleteEbook(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting ebook:", error);
      res.status(500).json({ error: "Failed to delete ebook" });
    }
  });

  // Case Studies
  app.get("/api/case-studies", async (_req, res) => {
    const caseStudies = await storage.getCaseStudies();
    res.json(caseStudies);
  });

  app.get("/api/case-studies/:slug", async (req, res) => {
    const caseStudy = await storage.getCaseStudyBySlug(req.params.slug);
    if (!caseStudy) return res.status(404).json({ message: "Case study not found" });
    res.json(caseStudy);
  });

  app.post("/api/case-studies", async (req, res) => {
    const result = insertCaseStudySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    const caseStudy = await storage.createCaseStudy(result.data);
    res.status(201).json(caseStudy);
  });

  app.patch("/api/case-studies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertCaseStudySchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const caseStudy = await storage.updateCaseStudy(id, result.data);
      res.json(caseStudy);
    } catch (error) {
      console.error("Error updating case study:", error);
      res.status(500).json({ error: "Failed to update case study" });
    }
  });

  app.delete("/api/case-studies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deleteCaseStudy(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting case study:", error);
      res.status(500).json({ error: "Failed to delete case study" });
    }
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

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));

  const httpServer = createServer(app);
  return httpServer;
}