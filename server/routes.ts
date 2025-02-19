import type { Express } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import {
  insertBlogPostSchema,
  insertTestimonialSchema,
  insertEbookSchema,
  insertCaseStudySchema,
  insertLeadSchema
} from "@shared/schema";
import multer from "multer";
import path from "path";
import express from 'express';
import { eq } from "drizzle-orm";
import { recommendationService } from "./services/recommendation";
import { sendContactFormNotification } from "./services/email";
import type { User } from "@shared/schema";

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
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF and PDF are allowed.'));
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

    try {
      const post = await storage.createBlogPost({
        ...result.data,
        autoTags: [], // Empty array since we removed AI tagging
        tags: result.data.tags || []
      });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
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

      const ebook = await storage.createEbook({
        ...result.data,
        autoTags: [], // Empty array since we removed AI tagging
        tags: result.data.tags || []
      });
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

    try {
      const caseStudy = await storage.createCaseStudy({
        ...result.data,
        autoTags: [], // Empty array since we removed AI tagging
        tags: result.data.tags || []
      });
      res.status(201).json(caseStudy);
    } catch (error) {
      console.error("Error creating case study:", error);
      res.status(500).json({ error: "Failed to create case study" });
    }
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

  // Lead creation and tracking
  app.post("/api/leads", async (req, res) => {
    try {
      const result = insertLeadSchema.safeParse(req.body);
      if (!result.success) {
        console.error("Lead validation error:", result.error.errors);
        return res.status(400).json({ error: "Invalid lead data", details: result.error.errors });
      }

      // Check if required fields are present
      if (!result.data.contentId || !result.data.contentType) {
        console.error("Missing required fields:", { body: req.body });
        return res.status(400).json({ error: "Missing required fields" });
      }

      const lead = await storage.createLead(result.data);
      console.log("Lead created successfully:", lead);
      res.status(201).json(lead);
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // PDF Upload route
  app.post("/api/upload-pdf", upload.single('pdf'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    const pdfUrl = `/uploads/${req.file.filename}`;
    res.json({ url: pdfUrl });
  });

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));

  // Recommendations
  app.get("/api/recommendations/:type/:id", async (req, res) => {
    try {
      const { type, id } = req.params;
      const recommendations = await recommendationService.getRecommendations(
        type,
        parseInt(id),
        3
      );
      res.json(recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  app.get("/api/recommendations/personalized", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const recommendations = await recommendationService.getPersonalizedRecommendations(
        req.user.email,
        3
      );
      res.json(recommendations);
    } catch (error) {
      console.error("Error getting personalized recommendations:", error);
      res.status(500).json({ error: "Failed to get personalized recommendations" });
    }
  });

  // Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Create a lead entry
      const lead = await storage.createLead({
        fullName: req.body.name,
        email: req.body.email,
        company: "N/A", // Not collected in contact form
        contentType: "contact",
        contentId: 0, // No content associated
        message: req.body.message,
        source: "contact"
      });

      // Send email notification
      try {
        await sendContactFormNotification({
          name: req.body.name,
          email: req.body.email,
          subject: req.body.subject,
          message: req.body.message
        });
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Don't fail the request if email fails, but log it
        return res.status(201).json({
          ...lead,
          warning: "Lead saved but email notification failed"
        });
      }

      res.status(201).json(lead);
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}