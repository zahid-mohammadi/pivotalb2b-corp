import type { Express } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import {
  insertBlogPostSchema,
  insertTestimonialSchema,
  insertEbookSchema,
  insertCaseStudySchema,
  insertLeadSchema,
  insertProposalRequestSchema,
  pageViews,
  userSessions,
  insertUserSchema,
  insertServiceSchema,
  insertPipelineStageSchema,
  insertPipelineDealSchema,
  insertLeadActivitySchema,
  insertEmailCampaignSchema,
  insertCampaignSendSchema,
  insertAutomationRuleSchema,
  insertM365ConnectionSchema
} from "@shared/schema";
import multer from "multer";
import path from "path";
import express from 'express';
import { eq, count } from "drizzle-orm";
import { recommendationService } from "./services/recommendation";
import { sendContactFormNotification, sendEbookDownloadConfirmation, sendLeadNotificationToAdmin, sendProposalRequestNotification } from "./services/email";
import { microsoftGraphService } from "./services/microsoft-graph";
import type { User } from "@shared/schema";
import { botBlockStats } from "./middleware/email-bot-blocker";

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
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'application/pdf',
      'text/csv', 'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF, CSV, and Excel files are allowed.'));
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
  
  app.patch("/api/services/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      // We're using the insertServiceSchema partial to validate the input
      const result = insertServiceSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const service = await storage.updateService(id, result.data);
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ error: "Failed to update service" });
    }
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

      // Send emails for lead capture
      if (result.data.email && result.data.fullName && result.data.company) {
        try {
          // Get content details for email
          let contentTitle = 'Unknown Content';
          let ebookUrl = '';
          
          if (result.data.contentType === 'ebook') {
            const ebook = await storage.getEbookById(result.data.contentId);
            if (ebook) {
              contentTitle = ebook.title;
              const domain = 'https://pivotal-b2b.com';
              
              ebookUrl = ebook.slug === 'abm-guide' 
                ? `${domain}/abm-guide`
                : `${domain}/ebooks/${ebook.slug}`;

              // Send confirmation to user
              await sendEbookDownloadConfirmation({
                fullName: result.data.fullName,
                email: result.data.email,
                company: result.data.company,
                ebookTitle: ebook.title,
                ebookUrl: ebookUrl
              });
              console.log('Download confirmation email sent to:', result.data.email);
            }
          } else if (result.data.contentType === 'case-study') {
            const caseStudy = await storage.getCaseStudyById(result.data.contentId);
            if (caseStudy) {
              contentTitle = caseStudy.title;
            }
          }

          // Send admin notification for all lead captures
          await sendLeadNotificationToAdmin({
            fullName: result.data.fullName,
            email: result.data.email,
            company: result.data.company,
            phone: result.data.phone,
            contentType: result.data.contentType,
            contentTitle: contentTitle,
            source: result.data.source || 'website'
          });
          console.log('Admin notification sent for lead capture');
        } catch (emailError) {
          console.error('Error sending emails:', emailError);
          // Don't fail the lead creation if email fails
        }
      }

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

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid lead ID" });
      }

      const lead = await storage.getLeadById(id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid lead ID" });
      }

      await storage.deleteLead(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ error: "Failed to delete lead" });
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
  
  // Target accounts file upload route
  app.post("/api/upload-target-accounts", upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file type
    const allowedTypes = [
      'text/csv', 
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/pdf'
    ];
    
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Only CSV, Excel, and PDF files are allowed" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl });
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
      const user = req.user as User;
      const recommendations = await recommendationService.getPersonalizedRecommendations(
        user.email,
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

  // Analytics Routes
  app.get("/api/analytics/overview", async (_req, res) => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const metrics = await storage.getOverviewMetrics(thirtyDaysAgo);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching overview metrics:", error);
      res.status(500).json({ error: "Failed to fetch overview metrics" });
    }
  });

  app.get("/api/analytics/traffic-sources", async (_req, res) => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const sources = await storage.getTrafficSources(thirtyDaysAgo);

      // Calculate total views
      const total = sources.reduce((acc, curr) => acc + Number(curr.count), 0);

      // If no data, return sample data structure with 0 values
      if (total === 0) {
        return res.json([
          { name: "Direct", value: 0 },
          { name: "Organic Search", value: 0 },
          { name: "Social Media", value: 0 },
          { name: "Email", value: 0 }
        ]);
      }

      // Transform the data
      const trafficData = sources.map(({ source, count }) => ({
        name: source || "Direct",
        value: Math.round((Number(count) / total) * 100)
      }));

      res.json(trafficData);
    } catch (error) {
      console.error("Error fetching traffic sources:", error);
      res.status(500).json({ error: "Failed to fetch traffic sources" });
    }
  });

  app.get("/api/analytics/user-flow", async (_req, res) => {
    try {
      const userFlow = await storage.getUserFlow();
      res.json(userFlow);
    } catch (error) {
      console.error("Error fetching user flow:", error);
      res.status(500).json({ error: "Failed to fetch user flow" });
    }
  });

  app.get("/api/analytics/page-views", async (_req, res) => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const pageViews = await storage.getPageViewMetrics(thirtyDaysAgo);
      res.json(pageViews);
    } catch (error) {
      console.error("Error fetching page views:", error);
      res.status(500).json({ error: "Failed to fetch page views" });
    }
  });

  app.post("/api/analytics/ping", async (req, res) => {
    try {
      const { sessionId } = req.body;
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
      }
      await storage.updateSessionActivity(sessionId);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating session activity:", error);
      res.status(500).json({ error: "Failed to update session activity" });
    }
  });

  app.get("/api/analytics/active-users", async (_req, res) => {
    try {
      const activeUsers = await storage.getActiveUsers();
      res.json({ activeUsers });
    } catch (error) {
      console.error("Error fetching active users:", error);
      res.status(500).json({ error: "Failed to fetch active users" });
    }
  });

  // User Management API Routes
  app.get("/api/users", async (_req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const user = await storage.createUser(result.data);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertUserSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const user = await storage.updateUser(id, result.data);
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteUser(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // Proposal Requests
  app.get("/api/proposal-requests", async (req, res) => {
    try {
      const proposalRequests = await storage.getProposalRequests();
      res.json(proposalRequests);
    } catch (error) {
      console.error("Error fetching proposal requests:", error);
      res.status(500).json({ error: "Failed to fetch proposal requests" });
    }
  });

  app.get("/api/proposal-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      
      const proposalRequest = await storage.getProposalRequestById(id);
      if (!proposalRequest) {
        return res.status(404).json({ error: "Proposal request not found" });
      }
      
      res.json(proposalRequest);
    } catch (error) {
      console.error("Error fetching proposal request:", error);
      res.status(500).json({ error: "Failed to fetch proposal request" });
    }
  });

  app.post("/api/proposal-requests", async (req, res) => {
    try {
      const result = insertProposalRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }

      const proposalRequest = await storage.createProposalRequest(result.data);
      
      // Send email notification to admin
      try {
        await sendProposalRequestNotification({
          fullName: result.data.fullName,
          email: result.data.email,
          company: result.data.companyName,
          phone: result.data.phoneNumber,
          selectedServices: result.data.interestedServices,
          targetAccounts: result.data.targetAccountsFileUrl,
          message: result.data.additionalNeeds
        });
        console.log('Proposal request notification sent to admin');
      } catch (emailError) {
        console.error('Error sending proposal request notification:', emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json(proposalRequest);
    } catch (error) {
      console.error("Error creating proposal request:", error);
      res.status(500).json({ error: "Failed to create proposal request" });
    }
  });

  app.patch("/api/proposal-requests/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: "Status is required and must be a string" });
      }

      const proposalRequest = await storage.updateProposalRequestStatus(id, status);
      res.json(proposalRequest);
    } catch (error) {
      console.error("Error updating proposal request status:", error);
      res.status(500).json({ error: "Failed to update proposal request status" });
    }
  });

  app.delete("/api/proposal-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      await storage.deleteProposalRequest(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting proposal request:", error);
      res.status(500).json({ error: "Failed to delete proposal request" });
    }
  });

  // Email Campaign Bot Protection Stats
  app.get("/api/security/email-bot-stats", (req, res) => {
    try {
      // Verify admin access
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: "Access denied. Admin privileges required." });
      }
      
      // Get stats from the campaigns that were specified in the request query
      const campaignName = req.query.campaign as string;
      
      if (campaignName && campaignName !== 'all') {
        // Return stats for a specific campaign
        if (!botBlockStats.campaigns[campaignName]) {
          return res.json({
            campaign: campaignName,
            totalBlocked: 0,
            bots: {},
            recentBlocks: []
          });
        }
        
        const campaignRecentBlocks = botBlockStats.recentBlocks.filter(
          block => block.campaign === campaignName
        );
        
        // Create a filtered version of bots for this campaign (we don't track this directly)
        const botTypes: Record<string, number> = {};
        campaignRecentBlocks.forEach(block => {
          const userAgent = block.userAgent.toLowerCase();
          let botType = 'unknown';
          
          // Try to identify bot type from user agent
          if (userAgent.includes('google')) botType = 'google';
          else if (userAgent.includes('bot')) botType = 'bot';
          else if (userAgent.includes('preview')) botType = 'preview';
          else if (userAgent.includes('scanner')) botType = 'scanner';
          
          if (!botTypes[botType]) botTypes[botType] = 0;
          botTypes[botType]++;
        });
        
        return res.json({
          campaign: campaignName,
          totalBlocked: botBlockStats.campaigns[campaignName],
          bots: botTypes,
          recentBlocks: campaignRecentBlocks
        });
      }
      
      // Return overall stats
      return res.json({
        totalBlocked: botBlockStats.totalBlocked,
        campaigns: botBlockStats.campaigns,
        bots: botBlockStats.bots,
        recentBlocks: botBlockStats.recentBlocks.slice(0, 50) // Limit to 50 most recent
      });
    } catch (error) {
      console.error("Error fetching email bot stats:", error);
      res.status(500).json({ error: "Failed to fetch email bot statistics" });
    }
  });
  
  // Test route for bot detection (only available in development)
  if (process.env.NODE_ENV !== 'production') {
    app.get("/api/test/bot-detection", (req, res) => {
      // Returns information about bot detection for the current request
      const userAgent = req.headers['user-agent'] || '';
      const referer = req.headers['referer'] || '';
      
      // Simulate bot detection logic
      const isBot = 
        userAgent.toLowerCase().includes('bot') ||
        userAgent.toLowerCase().includes('crawler') ||
        userAgent.toLowerCase().includes('preview') ||
        userAgent.toLowerCase().includes('headless');
      
      // Information about the request
      const info = {
        ip: req.ip,
        userAgent,
        referer,
        isBot,
        params: req.query,
        botBlockStats: {
          totalBlocked: botBlockStats.totalBlocked,
          campaignCount: Object.keys(botBlockStats.campaigns).length,
          recentBlocksCount: botBlockStats.recentBlocks.length
        }
      };
      
      res.json(info);
    });
  }

  // Pipeline Stages Routes
  app.get("/api/pipeline/stages", async (_req, res) => {
    try {
      const stages = await storage.getPipelineStages();
      res.json(stages);
    } catch (error) {
      console.error("Error fetching pipeline stages:", error);
      res.status(500).json({ error: "Failed to fetch pipeline stages" });
    }
  });

  app.post("/api/pipeline/stages", async (req, res) => {
    const result = insertPipelineStageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const stage = await storage.createPipelineStage(result.data);
      res.status(201).json(stage);
    } catch (error) {
      console.error("Error creating pipeline stage:", error);
      res.status(500).json({ error: "Failed to create pipeline stage" });
    }
  });

  app.patch("/api/pipeline/stages/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertPipelineStageSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const stage = await storage.updatePipelineStage(id, result.data);
      res.json(stage);
    } catch (error) {
      console.error("Error updating pipeline stage:", error);
      res.status(500).json({ error: "Failed to update pipeline stage" });
    }
  });

  app.delete("/api/pipeline/stages/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deletePipelineStage(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting pipeline stage:", error);
      res.status(500).json({ error: "Failed to delete pipeline stage" });
    }
  });

  // Pipeline Deals Routes
  app.get("/api/pipeline/deals", async (_req, res) => {
    try {
      const deals = await storage.getPipelineDeals();
      res.json(deals);
    } catch (error) {
      console.error("Error fetching pipeline deals:", error);
      res.status(500).json({ error: "Failed to fetch pipeline deals" });
    }
  });

  app.get("/api/pipeline/deals/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const deal = await storage.getPipelineDealById(id);
      if (!deal) return res.status(404).json({ message: "Deal not found" });
      res.json(deal);
    } catch (error) {
      console.error("Error fetching pipeline deal:", error);
      res.status(500).json({ error: "Failed to fetch pipeline deal" });
    }
  });

  app.post("/api/pipeline/deals", async (req, res) => {
    const result = insertPipelineDealSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const deal = await storage.createPipelineDeal(result.data);
      res.status(201).json(deal);
    } catch (error) {
      console.error("Error creating pipeline deal:", error);
      res.status(500).json({ error: "Failed to create pipeline deal" });
    }
  });

  app.patch("/api/pipeline/deals/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertPipelineDealSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const deal = await storage.updatePipelineDeal(id, result.data);
      res.json(deal);
    } catch (error) {
      console.error("Error updating pipeline deal:", error);
      res.status(500).json({ error: "Failed to update pipeline deal" });
    }
  });

  app.delete("/api/pipeline/deals/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deletePipelineDeal(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting pipeline deal:", error);
      res.status(500).json({ error: "Failed to delete pipeline deal" });
    }
  });

  // Lead Activities Routes
  app.get("/api/pipeline/deals/:dealId/activities", async (req, res) => {
    const dealId = parseInt(req.params.dealId);
    if (isNaN(dealId)) {
      return res.status(400).json({ error: "Invalid deal ID" });
    }

    try {
      const activities = await storage.getLeadActivitiesByDeal(dealId);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching lead activities:", error);
      res.status(500).json({ error: "Failed to fetch lead activities" });
    }
  });

  app.post("/api/pipeline/deals/:dealId/activities", async (req, res) => {
    const dealId = parseInt(req.params.dealId);
    if (isNaN(dealId)) {
      return res.status(400).json({ error: "Invalid deal ID" });
    }

    const result = insertLeadActivitySchema.safeParse({ ...req.body, dealId });
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const activity = await storage.createLeadActivity(result.data);
      res.status(201).json(activity);
    } catch (error) {
      console.error("Error creating lead activity:", error);
      res.status(500).json({ error: "Failed to create lead activity" });
    }
  });

  // Send tracked 1-to-1 email via M365
  app.post("/api/pipeline/deals/:dealId/send-email", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const dealId = parseInt(req.params.dealId);
    if (isNaN(dealId)) {
      return res.status(400).json({ error: "Invalid deal ID" });
    }

    const { subject, htmlContent } = req.body;
    if (!subject || !htmlContent) {
      return res.status(400).json({ error: "Subject and content are required" });
    }

    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const success = await microsoftGraphService.sendTrackedEmail(user.id, {
        dealId,
        subject,
        htmlContent,
        baseUrl,
      });

      if (success) {
        res.json({ message: "Email sent successfully with tracking" });
      } else {
        res.status(500).json({ error: "Failed to send email" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to send email" });
    }
  });

  // Email Campaigns Routes
  app.get("/api/pipeline/campaigns", async (_req, res) => {
    try {
      const campaigns = await storage.getEmailCampaigns();
      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching email campaigns:", error);
      res.status(500).json({ error: "Failed to fetch email campaigns" });
    }
  });

  app.get("/api/pipeline/campaigns/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const campaign = await storage.getEmailCampaignById(id);
      if (!campaign) return res.status(404).json({ message: "Campaign not found" });
      res.json(campaign);
    } catch (error) {
      console.error("Error fetching email campaign:", error);
      res.status(500).json({ error: "Failed to fetch email campaign" });
    }
  });

  app.post("/api/pipeline/campaigns", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = insertEmailCampaignSchema.safeParse({ ...req.body, createdBy: user.id });
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const campaign = await storage.createEmailCampaign(result.data);
      res.status(201).json(campaign);
    } catch (error) {
      console.error("Error creating email campaign:", error);
      res.status(500).json({ error: "Failed to create email campaign" });
    }
  });

  app.patch("/api/pipeline/campaigns/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertEmailCampaignSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const campaign = await storage.updateEmailCampaign(id, result.data);
      res.json(campaign);
    } catch (error) {
      console.error("Error updating email campaign:", error);
      res.status(500).json({ error: "Failed to update email campaign" });
    }
  });

  app.delete("/api/pipeline/campaigns/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deleteEmailCampaign(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting email campaign:", error);
      res.status(500).json({ error: "Failed to delete email campaign" });
    }
  });

  app.post("/api/pipeline/campaigns/:id/execute", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const { campaignExecutor } = await import("./services/campaign-executor");
      
      await campaignExecutor.executeCampaign({
        campaignId: id,
        userId: user.id,
        baseUrl,
      });
      
      res.json({ message: "Campaign executed successfully" });
    } catch (error) {
      console.error("Error executing campaign:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to execute campaign" });
    }
  });

  // Campaign Sends/Tracking Routes
  app.get("/api/pipeline/campaigns/:campaignId/sends", async (req, res) => {
    const campaignId = parseInt(req.params.campaignId);
    if (isNaN(campaignId)) {
      return res.status(400).json({ error: "Invalid campaign ID" });
    }

    try {
      const sends = await storage.getCampaignSendsByCampaign(campaignId);
      res.json(sends);
    } catch (error) {
      console.error("Error fetching campaign sends:", error);
      res.status(500).json({ error: "Failed to fetch campaign sends" });
    }
  });

  app.post("/api/pipeline/campaigns/:campaignId/sends", async (req, res) => {
    const campaignId = parseInt(req.params.campaignId);
    if (isNaN(campaignId)) {
      return res.status(400).json({ error: "Invalid campaign ID" });
    }

    const result = insertCampaignSendSchema.safeParse({ ...req.body, campaignId });
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const send = await storage.createCampaignSend(result.data);
      res.status(201).json(send);
    } catch (error) {
      console.error("Error creating campaign send:", error);
      res.status(500).json({ error: "Failed to create campaign send" });
    }
  });

  app.patch("/api/pipeline/campaigns/sends/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertCampaignSendSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const send = await storage.updateCampaignSend(id, result.data);
      res.json(send);
    } catch (error) {
      console.error("Error updating campaign send:", error);
      res.status(500).json({ error: "Failed to update campaign send" });
    }
  });

  // Email Tracking Pixel Endpoint
  app.get("/api/track/open/:sendId", async (req, res) => {
    const sendId = parseInt(req.params.sendId);
    
    if (!isNaN(sendId)) {
      try {
        // Update the campaign send to mark as opened
        const send = await storage.updateCampaignSend(sendId, {
          openedAt: new Date().toISOString(),
        });

        // Log activity for the deal
        if (send && send.dealId) {
          await storage.createLeadActivity({
            dealId: send.dealId,
            activityType: 'email_opened',
            description: 'Email opened',
            metadata: { campaignSendId: sendId },
          });
        }
      } catch (error) {
        console.error("Error tracking email open:", error);
      }
    }

    // Return a 1x1 transparent GIF pixel
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );
    
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': pixel.length,
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Pragma': 'no-cache',
    });
    res.end(pixel);
  });

  // Email Click Tracking Endpoint
  app.get("/api/track/click/:sendId", async (req, res) => {
    const sendId = parseInt(req.params.sendId);
    const targetUrl = req.query.url as string;
    
    if (!isNaN(sendId) && targetUrl) {
      try {
        // Update the campaign send to mark as clicked
        const send = await storage.updateCampaignSend(sendId, {
          clickedAt: new Date().toISOString(),
        });

        // Log activity for the deal
        if (send && send.dealId) {
          const decodedUrl = decodeURIComponent(targetUrl);
          await storage.createLeadActivity({
            dealId: send.dealId,
            activityType: 'link_clicked',
            description: `Clicked link: ${decodedUrl}`,
            metadata: { 
              campaignSendId: sendId,
              url: decodedUrl 
            },
          });
        }
      } catch (error) {
        console.error("Error tracking email click:", error);
      }
    }

    // Redirect to the original URL
    if (targetUrl) {
      res.redirect(decodeURIComponent(targetUrl));
    } else {
      res.status(400).send('Invalid tracking URL');
    }
  });

  // Automation Rules Routes
  app.get("/api/pipeline/automation-rules", async (_req, res) => {
    try {
      const rules = await storage.getAutomationRules();
      res.json(rules);
    } catch (error) {
      console.error("Error fetching automation rules:", error);
      res.status(500).json({ error: "Failed to fetch automation rules" });
    }
  });

  app.post("/api/pipeline/automation-rules", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = insertAutomationRuleSchema.safeParse({ ...req.body, createdBy: user.id });
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const rule = await storage.createAutomationRule(result.data);
      res.status(201).json(rule);
    } catch (error) {
      console.error("Error creating automation rule:", error);
      res.status(500).json({ error: "Failed to create automation rule" });
    }
  });

  app.patch("/api/pipeline/automation-rules/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const result = insertAutomationRuleSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const rule = await storage.updateAutomationRule(id, result.data);
      res.json(rule);
    } catch (error) {
      console.error("Error updating automation rule:", error);
      res.status(500).json({ error: "Failed to update automation rule" });
    }
  });

  app.delete("/api/pipeline/automation-rules/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deleteAutomationRule(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting automation rule:", error);
      res.status(500).json({ error: "Failed to delete automation rule" });
    }
  });

  // M365 Connection Routes
  app.get("/api/pipeline/m365-connection", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const connection = await storage.getM365ConnectionByUser(user.id);
      res.json(connection || null);
    } catch (error) {
      console.error("Error fetching M365 connection:", error);
      res.status(500).json({ error: "Failed to fetch M365 connection" });
    }
  });

  app.post("/api/pipeline/m365-connection", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = insertM365ConnectionSchema.safeParse({ ...req.body, userId: user.id });
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    try {
      const connection = await storage.createM365Connection(result.data);
      res.status(201).json(connection);
    } catch (error) {
      console.error("Error creating M365 connection:", error);
      res.status(500).json({ error: "Failed to create M365 connection" });
    }
  });

  app.delete("/api/pipeline/m365-connection/:id", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      await storage.deleteM365Connection(id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting M365 connection:", error);
      res.status(500).json({ error: "Failed to delete M365 connection" });
    }
  });

  // Microsoft 365 OAuth Routes
  app.get("/api/auth/m365/authorize", (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const clientId = process.env.M365_CLIENT_ID;
    const redirectUri = `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:3000'}/api/auth/m365/callback`;
    const scope = "openid profile email offline_access Mail.ReadWrite Mail.Send";
    const state = Buffer.from(JSON.stringify({ userId: user.id })).toString('base64');

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}&` +
      `response_mode=query`;

    res.json({ authUrl });
  });

  app.get("/api/auth/m365/callback", async (req, res) => {
    const { code, state } = req.query;

    if (!code || !state) {
      return res.status(400).send("Missing authorization code or state");
    }

    try {
      const stateData = JSON.parse(Buffer.from(state as string, 'base64').toString());
      const userId = stateData.userId;

      const clientId = process.env.M365_CLIENT_ID;
      const clientSecret = process.env.M365_CLIENT_SECRET;
      const redirectUri = `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:3000'}/api/auth/m365/callback`;

      const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId!,
          client_secret: clientSecret!,
          code: code as string,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        console.error("OAuth error:", tokenData);
        return res.status(400).send(`OAuth error: ${tokenData.error_description}`);
      }

      const profileResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      });

      const profile = await profileResponse.json();

      await storage.createM365Connection({
        userId,
        email: profile.mail || profile.userPrincipalName,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
      });

      res.send(`
        <html>
          <body>
            <script>
              window.opener.postMessage({ type: 'M365_AUTH_SUCCESS' }, '*');
              window.close();
            </script>
            <p>Authentication successful! You can close this window.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Error in M365 callback:", error);
      res.status(500).send("Authentication failed");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}