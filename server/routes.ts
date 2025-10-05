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
  insertM365ConnectionSchema,
  insertTaxCodeSchema,
  insertSkuSchema,
  insertInvoiceSchema,
  insertInvoiceLineSchema,
  insertPaymentSchema,
  insertCreditNoteSchema,
  insertCreditNoteApplicationSchema,
  insertExpenseSchema,
  insertInvoiceViewSchema,
  insertInvoiceReminderSchema,
  insertBillingSettingSchema,
  insertBillingAuditLogSchema
} from "@shared/schema";
import multer from "multer";
import path from "path";
import express from 'express';
import { eq, count } from "drizzle-orm";
import { recommendationService } from "./services/recommendation";
import { sendContactFormNotification, sendEbookDownloadConfirmation, sendLeadNotificationToAdmin, sendProposalRequestNotification, sendInvoiceEmail } from "./services/email";
import { microsoftGraphService } from "./services/microsoft-graph";
import type { User } from "@shared/schema";
import { botBlockStats } from "./middleware/email-bot-blocker";
import { requireRole, checkPermission, isAdmin, isSalesOrMarketing } from "./middleware/rbac";

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

  app.post("/api/users", isAdmin, async (req, res) => {
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

  app.patch("/api/users/:id", isAdmin, async (req, res) => {
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

  app.delete("/api/users/:id", isAdmin, async (req, res) => {
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
      
      // Auto-add to pipeline as a deal
      try {
        const stages = await storage.getPipelineStages();
        const firstStage = stages.find(s => s.order === 0) || stages[0];
        
        if (firstStage) {
          const dealData = {
            fullName: result.data.fullName,
            email: result.data.email,
            company: result.data.companyName,
            phone: result.data.phoneNumber,
            stageId: firstStage.id,
            source: 'proposal_request',
            sourceId: proposalRequest.id,
            notes: `Interested Services: ${result.data.interestedServices.join(', ')}\n\nAdditional Needs: ${result.data.additionalNeeds || 'None'}`
          };
          
          const deal = await storage.createPipelineDeal(dealData);
          
          // Initialize engagement score
          const { updateEngagementScore } = await import("./services/engagement-scoring");
          await updateEngagementScore(deal.id);
          
          console.log(`Auto-added proposal request ${proposalRequest.id} to pipeline as deal ${deal.id}`);
        }
      } catch (pipelineError) {
        console.error('Error adding proposal to pipeline:', pipelineError);
        // Don't fail the request if pipeline creation fails
      }
      
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
      
      // Initialize engagement score
      const { updateEngagementScore } = await import("./services/engagement-scoring");
      await updateEngagementScore(deal.id);
      
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
      
      // Update engagement score after changes
      const { updateEngagementScore } = await import("./services/engagement-scoring");
      await updateEngagementScore(id);
      
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

  // Engagement Scoring Routes
  app.get("/api/pipeline/deals/:dealId/engagement-score", async (req, res) => {
    const dealId = parseInt(req.params.dealId);
    if (isNaN(dealId)) {
      return res.status(400).json({ error: "Invalid deal ID" });
    }

    try {
      const { calculateEngagementScore, getEngagementLevel } = await import("./services/engagement-scoring");
      const score = await calculateEngagementScore(dealId);
      const scoreInfo = getEngagementLevel(score);
      res.json(scoreInfo);
    } catch (error) {
      console.error("Error getting engagement score:", error);
      res.status(500).json({ error: "Failed to get engagement score" });
    }
  });

  app.get("/api/pipeline/deals/:dealId/score-history", async (req, res) => {
    const dealId = parseInt(req.params.dealId);
    if (isNaN(dealId)) {
      return res.status(400).json({ error: "Invalid deal ID" });
    }

    const days = parseInt(req.query.days as string) || 30;

    try {
      const { getScoreHistory } = await import("./services/engagement-scoring");
      const history = await getScoreHistory(dealId, days);
      res.json(history);
    } catch (error) {
      console.error("Error getting score history:", error);
      res.status(500).json({ error: "Failed to get score history" });
    }
  });

  app.post("/api/pipeline/deals/:dealId/engagement-activity", async (req, res) => {
    const dealId = parseInt(req.params.dealId);
    if (isNaN(dealId)) {
      return res.status(400).json({ error: "Invalid deal ID" });
    }

    const { activityType, metadata } = req.body;
    if (!activityType) {
      return res.status(400).json({ error: "Activity type is required" });
    }

    try {
      const { addEngagementActivity } = await import("./services/engagement-scoring");
      await addEngagementActivity(dealId, activityType, metadata);
      res.json({ message: "Engagement activity added and score updated" });
    } catch (error) {
      console.error("Error adding engagement activity:", error);
      res.status(500).json({ error: "Failed to add engagement activity" });
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

  app.post("/api/pipeline/automation-rules", requireRole("admin", "marketing"), async (req, res) => {
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

  app.patch("/api/pipeline/automation-rules/:id", requireRole("admin", "marketing"), async (req, res) => {
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

  app.delete("/api/pipeline/automation-rules/:id", requireRole("admin", "marketing"), async (req, res) => {
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
    const domain = process.env.REPLIT_DEV_DOMAIN || 'localhost:3000';
    const redirectUri = domain.includes('localhost') ? `http://${domain}/api/auth/m365/callback` : `https://${domain}/api/auth/m365/callback`;
    const scope = "openid profile email offline_access User.Read Mail.ReadWrite Mail.Send";
    const state = Buffer.from(JSON.stringify({ userId: user.id })).toString('base64');

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}&` +
      `response_mode=query`;

    console.log("M365 OAuth authorize URL generated. Redirect URI:", redirectUri);
    res.json({ authUrl });
  });

  app.get("/api/auth/m365/callback", async (req, res) => {
    const { code, state, error, error_description } = req.query;

    // Log all query parameters for debugging
    console.log("M365 OAuth callback received:", { code: !!code, state: !!state, error, error_description, allParams: req.query });

    // Handle Azure error responses
    if (error) {
      console.error("M365 OAuth error:", error, error_description);
      return res.status(400).send(`Authentication failed: ${error_description || error}`);
    }

    if (!code || !state) {
      console.error("Missing code or state in callback. Query params:", req.query);
      return res.status(400).send("Missing authorization code or state");
    }

    try {
      const stateData = JSON.parse(Buffer.from(state as string, 'base64').toString());
      const userId = stateData.userId;

      const clientId = process.env.M365_CLIENT_ID;
      const clientSecret = process.env.M365_CLIENT_SECRET;
      const domain = process.env.REPLIT_DEV_DOMAIN || 'localhost:3000';
      const redirectUri = domain.includes('localhost') ? `http://${domain}/api/auth/m365/callback` : `https://${domain}/api/auth/m365/callback`;

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

      // Decode the ID token to get user email (avoid calling /me endpoint)
      let email: string | undefined;
      
      if (tokenData.id_token) {
        try {
          // ID token is a JWT with 3 parts: header.payload.signature
          const idTokenPayload = JSON.parse(Buffer.from(tokenData.id_token.split('.')[1], 'base64').toString());
          console.log("ID token claims:", { 
            email: idTokenPayload.email, 
            preferred_username: idTokenPayload.preferred_username,
            upn: idTokenPayload.upn 
          });
          
          // Try multiple email fields from ID token
          email = idTokenPayload.email || idTokenPayload.preferred_username || idTokenPayload.upn;
        } catch (err) {
          console.error("Error decoding ID token:", err);
        }
      }

      // Fallback to Graph API /me endpoint if no email in ID token
      if (!email) {
        console.log("No email in ID token, calling /me endpoint...");
        const profileResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
          },
        });

        const profile = await profileResponse.json();
        console.log("M365 profile received:", { mail: profile.mail, userPrincipalName: profile.userPrincipalName, id: profile.id });

        // Get email from profile - try multiple fields
        email = profile.mail || profile.userPrincipalName || profile.emailAddresses?.[0]?.address;
      }
      
      if (!email) {
        console.error("No email found in M365 tokens or profile");
        return res.status(400).send("Unable to retrieve email address from Microsoft account. Please ensure your Microsoft account has an email address configured.");
      }

      console.log("Successfully extracted email:", email);

      await storage.createM365Connection({
        userId,
        email,
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

  // Microsoft 365 Email Routes
  app.get("/api/m365/inbox", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const messages = await microsoftGraphService.getInboxMessages(user.id, limit);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching inbox:", error);
      res.status(500).json({ error: "Failed to fetch inbox messages" });
    }
  });

  app.get("/api/m365/sentitems", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const messages = await microsoftGraphService.getSentMessages(user.id, limit);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching sent items:", error);
      res.status(500).json({ error: "Failed to fetch sent messages" });
    }
  });

  app.get("/api/m365/messages/:messageId", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const { messageId } = req.params;
      const message = await microsoftGraphService.getMessage(user.id, messageId);
      
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json(message);
    } catch (error) {
      console.error("Error fetching message:", error);
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });

  app.post("/api/m365/send-email", async (req, res) => {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { to, subject, htmlContent } = req.body;
    if (!to || !subject || !htmlContent) {
      return res.status(400).json({ error: "To, subject, and content are required" });
    }

    try {
      const connection = await storage.getM365ConnectionByUser(user.id);
      if (!connection) {
        return res.status(400).json({ error: "Microsoft 365 not connected" });
      }

      const success = await microsoftGraphService.sendEmail(user.id, {
        from: connection.email,
        to: Array.isArray(to) ? to : [to],
        subject,
        htmlContent,
      });

      if (success) {
        res.json({ message: "Email sent successfully" });
      } else {
        res.status(500).json({ error: "Failed to send email" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to send email" });
    }
  });

  // Accounts API
  app.get("/api/accounts", async (_req, res) => {
    try {
      const accounts = await storage.getAccounts();
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  });

  app.get("/api/accounts/:id", async (req, res) => {
    try {
      const account = await storage.getAccountById(parseInt(req.params.id));
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.json(account);
    } catch (error) {
      console.error("Error fetching account:", error);
      res.status(500).json({ error: "Failed to fetch account" });
    }
  });

  app.post("/api/accounts", async (req, res) => {
    try {
      const newAccount = await storage.createAccount(req.body);
      res.status(201).json(newAccount);
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.put("/api/accounts/:id", async (req, res) => {
    try {
      const updatedAccount = await storage.updateAccount(parseInt(req.params.id), req.body);
      res.json(updatedAccount);
    } catch (error) {
      console.error("Error updating account:", error);
      res.status(500).json({ error: "Failed to update account" });
    }
  });

  app.delete("/api/accounts/:id", async (req, res) => {
    try {
      await storage.deleteAccount(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ error: "Failed to delete account" });
    }
  });

  // Get contacts for an account
  app.get("/api/accounts/:id/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContactsByAccount(parseInt(req.params.id));
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching account contacts:", error);
      res.status(500).json({ error: "Failed to fetch account contacts" });
    }
  });

  // Get deals for an account
  app.get("/api/accounts/:id/deals", async (req, res) => {
    try {
      const accountId = parseInt(req.params.id);
      const allDeals = await storage.getPipelineDeals();
      const accountDeals = allDeals.filter(deal => deal.accountId === accountId);
      res.json(accountDeals);
    } catch (error) {
      console.error("Error fetching account deals:", error);
      res.status(500).json({ error: "Failed to fetch account deals" });
    }
  });

  // Contacts API
  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContactById(parseInt(req.params.id));
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ error: "Failed to fetch contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = req.body;
      
      // Auto-link to account if email domain matches
      if (contactData.email && !contactData.accountId) {
        const domain = contactData.email.split('@')[1];
        if (domain) {
          const existingAccount = await storage.getAccountByDomain(domain);
          if (existingAccount) {
            contactData.accountId = existingAccount.id;
          }
        }
      }

      const newContact = await storage.createContact(contactData);
      res.status(201).json(newContact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Failed to create contact" });
    }
  });

  app.put("/api/contacts/:id", async (req, res) => {
    try {
      const updatedContact = await storage.updateContact(parseInt(req.params.id), req.body);
      res.json(updatedContact);
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).json({ error: "Failed to update contact" });
    }
  });

  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      await storage.deleteContact(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  // Get deals for a contact
  app.get("/api/contacts/:id/deals", async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      const allDeals = await storage.getPipelineDeals();
      const contactDeals = allDeals.filter(deal => deal.contactId === contactId);
      res.json(contactDeals);
    } catch (error) {
      console.error("Error fetching contact deals:", error);
      res.status(500).json({ error: "Failed to fetch contact deals" });
    }
  });

  // Suggest account for contact based on email domain
  app.post("/api/contacts/suggest-account", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const domain = email.split('@')[1];
      if (!domain) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const account = await storage.getAccountByDomain(domain);
      res.json({ account: account || null });
    } catch (error) {
      console.error("Error suggesting account:", error);
      res.status(500).json({ error: "Failed to suggest account" });
    }
  });

  // Filter Builder API
  const { executeFilter, getFilterCount } = await import("./services/filter-builder");

  // Filter preview (execute filter and return results)
  app.post("/api/filter/preview", async (req, res) => {
    try {
      const { entity, definition, limit = 50, offset = 0 } = req.body;

      if (!entity || !definition) {
        return res.status(400).json({ error: "Entity and definition are required" });
      }

      const results = await executeFilter(entity, definition, limit, offset);
      const totalCount = await getFilterCount(entity, definition);

      // Log audit
      if (req.user) {
        await storage.createFilterAuditLog({
          userId: (req.user as any).id,
          entity,
          filterDefinition: definition,
          resultCount: totalCount,
        });
      }

      res.json({
        results,
        totalCount,
        limit,
        offset,
      });
    } catch (error) {
      console.error("Error executing filter:", error);
      res.status(500).json({ error: "Failed to execute filter" });
    }
  });

  // Get filter count only (for live preview)
  app.post("/api/filter/count", async (req, res) => {
    try {
      const { entity, definition } = req.body;

      if (!entity || !definition) {
        return res.status(400).json({ error: "Entity and definition are required" });
      }

      const count = await getFilterCount(entity, definition);
      res.json({ count });
    } catch (error) {
      console.error("Error getting filter count:", error);
      res.status(500).json({ error: "Failed to get filter count" });
    }
  });

  // Saved filters/views
  app.get("/api/filter/views", async (req, res) => {
    try {
      const { entity } = req.query;
      const userId = req.user ? (req.user as any).id : undefined;

      const filters = await storage.getSavedFilters(
        entity as string | undefined,
        userId
      );

      res.json(filters);
    } catch (error) {
      console.error("Error fetching saved filters:", error);
      res.status(500).json({ error: "Failed to fetch saved filters" });
    }
  });

  app.get("/api/filter/views/:id", async (req, res) => {
    try {
      const filter = await storage.getSavedFilterById(parseInt(req.params.id));
      if (!filter) {
        return res.status(404).json({ error: "Filter not found" });
      }
      res.json(filter);
    } catch (error) {
      console.error("Error fetching saved filter:", error);
      res.status(500).json({ error: "Failed to fetch saved filter" });
    }
  });

  app.post("/api/filter/views", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const filterData = {
        ...req.body,
        createdBy: (req.user as any).id,
      };

      const newFilter = await storage.createSavedFilter(filterData);
      res.status(201).json(newFilter);
    } catch (error) {
      console.error("Error creating saved filter:", error);
      res.status(500).json({ error: "Failed to create saved filter" });
    }
  });

  app.put("/api/filter/views/:id", async (req, res) => {
    try {
      const updatedFilter = await storage.updateSavedFilter(
        parseInt(req.params.id),
        req.body
      );
      res.json(updatedFilter);
    } catch (error) {
      console.error("Error updating saved filter:", error);
      res.status(500).json({ error: "Failed to update saved filter" });
    }
  });

  app.delete("/api/filter/views/:id", async (req, res) => {
    try {
      await storage.deleteSavedFilter(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting saved filter:", error);
      res.status(500).json({ error: "Failed to delete saved filter" });
    }
  });

  // Filter audit logs
  app.get("/api/filter/audit", async (req, res) => {
    try {
      const userId = req.user ? (req.user as any).id : undefined;
      const logs = await storage.getFilterAuditLogs(userId);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching filter audit logs:", error);
      res.status(500).json({ error: "Failed to fetch filter audit logs" });
    }
  });

  // ============= BILLING & ACCOUNTING ROUTES =============

  // Tax Codes
  app.get("/api/tax-codes", async (_req, res) => {
    try {
      const taxCodes = await storage.getTaxCodes();
      res.json(taxCodes);
    } catch (error) {
      console.error("Error fetching tax codes:", error);
      res.status(500).json({ error: "Failed to fetch tax codes" });
    }
  });

  app.get("/api/tax-codes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid tax code ID" });
      }
      const taxCode = await storage.getTaxCodeById(id);
      if (!taxCode) {
        return res.status(404).json({ error: "Tax code not found" });
      }
      res.json(taxCode);
    } catch (error) {
      console.error("Error fetching tax code:", error);
      res.status(500).json({ error: "Failed to fetch tax code" });
    }
  });

  app.post("/api/tax-codes", async (req, res) => {
    try {
      const result = insertTaxCodeSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const taxCode = await storage.createTaxCode(result.data);
      res.status(201).json(taxCode);
    } catch (error) {
      console.error("Error creating tax code:", error);
      res.status(500).json({ error: "Failed to create tax code" });
    }
  });

  app.patch("/api/tax-codes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid tax code ID" });
      }
      const result = insertTaxCodeSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const taxCode = await storage.updateTaxCode(id, result.data);
      res.json(taxCode);
    } catch (error) {
      console.error("Error updating tax code:", error);
      res.status(500).json({ error: "Failed to update tax code" });
    }
  });

  app.delete("/api/tax-codes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid tax code ID" });
      }
      await storage.deleteTaxCode(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting tax code:", error);
      res.status(500).json({ error: "Failed to delete tax code" });
    }
  });

  // SKUs (Products/Services)
  app.get("/api/skus", async (_req, res) => {
    try {
      const skus = await storage.getSKUs();
      res.json(skus);
    } catch (error) {
      console.error("Error fetching SKUs:", error);
      res.status(500).json({ error: "Failed to fetch SKUs" });
    }
  });

  app.get("/api/skus/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid SKU ID" });
      }
      const sku = await storage.getSKUById(id);
      if (!sku) {
        return res.status(404).json({ error: "SKU not found" });
      }
      res.json(sku);
    } catch (error) {
      console.error("Error fetching SKU:", error);
      res.status(500).json({ error: "Failed to fetch SKU" });
    }
  });

  app.post("/api/skus", async (req, res) => {
    try {
      const result = insertSkuSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const sku = await storage.createSKU(result.data);
      res.status(201).json(sku);
    } catch (error) {
      console.error("Error creating SKU:", error);
      res.status(500).json({ error: "Failed to create SKU" });
    }
  });

  app.patch("/api/skus/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid SKU ID" });
      }
      const result = insertSkuSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const sku = await storage.updateSKU(id, result.data);
      res.json(sku);
    } catch (error) {
      console.error("Error updating SKU:", error);
      res.status(500).json({ error: "Failed to update SKU" });
    }
  });

  app.delete("/api/skus/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid SKU ID" });
      }
      await storage.deleteSKU(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting SKU:", error);
      res.status(500).json({ error: "Failed to delete SKU" });
    }
  });

  // Invoices & Estimates
  app.get("/api/invoices", async (req, res) => {
    try {
      const accountId = req.query.accountId ? parseInt(req.query.accountId as string) : undefined;
      
      let invoices;
      if (accountId) {
        invoices = await storage.getInvoicesByAccount(accountId);
      } else {
        invoices = await storage.getInvoices();
      }
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.get("/api/invoices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const invoice = await storage.getInvoiceById(id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      
      const lines = await storage.getInvoiceLinesByInvoice(id);
      const payments = await storage.getPaymentsByInvoice(id);
      
      res.json({
        ...invoice,
        lines,
        payments
      });
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ error: "Failed to fetch invoice" });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const { lines, ...invoiceData } = req.body;
      const result = insertInvoiceSchema.safeParse(invoiceData);
      if (!result.success) {
        console.error("Invoice validation failed:", JSON.stringify(result.error.errors, null, 2));
        console.error("Invoice data received:", JSON.stringify(invoiceData, null, 2));
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const userId = (req.user as any)?.id || 1;
      const invoice = await storage.createInvoice({
        ...result.data,
        createdBy: userId,
      });
      
      if (lines && Array.isArray(lines)) {
        for (const line of lines) {
          await storage.createInvoiceLine({
            ...line,
            invoiceId: invoice.id,
          });
        }
      }
      
      await storage.createBillingAuditLog({
        entityType: 'invoice',
        entityId: invoice.id,
        action: 'created',
        performedBy: userId,
        changes: { status: 'created' },
      });
      
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ error: "Failed to create invoice" });
    }
  });

  app.patch("/api/invoices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const result = insertInvoiceSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const oldInvoice = await storage.getInvoiceById(id);
      const invoice = await storage.updateInvoice(id, result.data);
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'invoice',
        entityId: id,
        action: 'updated',
        performedBy: userId,
        changes: { old: oldInvoice, new: invoice },
      });
      
      res.json(invoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({ error: "Failed to update invoice" });
    }
  });

  app.delete("/api/invoices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      await storage.deleteInvoiceLinesByInvoice(id);
      await storage.deleteInvoice(id);
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'invoice',
        entityId: id,
        action: 'deleted',
        performedBy: userId,
      });
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ error: "Failed to delete invoice" });
    }
  });

  app.post("/api/invoices/:id/convert", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const invoice = await storage.getInvoiceById(id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      
      if (invoice.type !== 'estimate') {
        return res.status(400).json({ error: "Only estimates can be converted to invoices" });
      }
      
      const userId = (req.user as any)?.id || 1;
      const updatedInvoice = await storage.updateInvoice(id, {
        type: 'invoice',
        status: 'draft',
      });
      
      await storage.createBillingAuditLog({
        entityType: 'invoice',
        entityId: id,
        action: 'converted',
        performedBy: userId,
        changes: { from: 'estimate', to: 'invoice' },
      });
      
      res.json(updatedInvoice);
    } catch (error) {
      console.error("Error converting estimate:", error);
      res.status(500).json({ error: "Failed to convert estimate" });
    }
  });

  app.post("/api/invoices/:id/send", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const invoice = await storage.getInvoiceById(id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      
      const account = await storage.getAccountById(invoice.accountId);
      if (!account || !account.billingEmail) {
        return res.status(400).json({ error: "Customer billing email not found" });
      }
      
      const billingSettings = await storage.getBillingSettings();
      const settings = billingSettings[0];
      const companyName = settings?.companyName || 'Pivotal B2B';
      
      const trackingToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const { customMessage } = req.body;
      
      const userId = (req.user as any)?.id || 1;
      const updatedInvoice = await storage.updateInvoice(id, {
        status: 'sent',
        sentAt: new Date(),
        viewTrackingToken: trackingToken,
      });
      
      const invoiceUrl = `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/public/invoices/${trackingToken}`;
      
      const { trackingToken: emailToken } = await sendInvoiceEmail({
        customerEmail: account.billingEmail,
        customerName: account.companyName,
        invoiceNumber: invoice.number,
        invoiceAmount: `$${(invoice.total / 100).toFixed(2)}`,
        dueDate: new Date(invoice.dueDate).toLocaleDateString(),
        companyName,
        invoiceUrl,
        customMessage,
      });
      
      // Update invoice with email tracking token
      await storage.updateInvoice(id, {
        emailTrackingToken: emailToken,
      });
      
      await storage.createInvoiceReminder({
        invoiceId: id,
        reminderType: 'sent',
        sentBy: userId,
      });
      
      await storage.createBillingAuditLog({
        entityType: 'invoice',
        entityId: id,
        action: 'sent',
        performedBy: userId,
      });
      
      res.json(updatedInvoice);
    } catch (error) {
      console.error("Error sending invoice:", error);
      res.status(500).json({ error: "Failed to send invoice" });
    }
  });

  // Email tracking pixel endpoint
  app.get("/api/invoices/email-tracking/:token", async (req, res) => {
    try {
      const { token } = req.params;
      
      // Find invoice by email tracking token
      const invoices = await storage.getAllInvoices();
      const invoice = invoices.find((inv: any) => inv.emailTrackingToken === token);
      
      if (invoice) {
        const now = new Date().toISOString();
        const updates: any = {
          emailOpenCount: (invoice.emailOpenCount || 0) + 1,
          lastEmailOpenAt: now,
        };
        
        // Set emailOpenedAt only if first open
        if (!invoice.emailOpenedAt) {
          updates.emailOpenedAt = now;
        }
        
        await storage.updateInvoice(invoice.id, updates);
        console.log(`Email opened for invoice ${invoice.number}, count: ${updates.emailOpenCount}`);
      }
      
      // Return a 1x1 transparent pixel
      const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': pixel.length,
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Expires': '0',
      });
      res.end(pixel);
    } catch (error) {
      console.error("Error tracking email open:", error);
      // Still return pixel even if tracking fails
      const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
      res.writeHead(200, { 'Content-Type': 'image/gif' });
      res.end(pixel);
    }
  });

  // Send invoice reminder
  app.post("/api/invoices/:id/reminder", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const { customMessage } = req.body;
      
      const invoice = await storage.getInvoiceById(id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      
      const account = await storage.getAccountById(invoice.accountId);
      if (!account || !account.billingEmail) {
        return res.status(400).json({ error: "Customer billing email not found" });
      }
      
      const billingSettings = await storage.getBillingSettings();
      const settings = billingSettings[0];
      const companyName = settings?.companyName || 'Pivotal B2B';
      
      // Use existing view tracking token for invoice URL
      const invoiceUrl = `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/public/invoices/${invoice.viewTrackingToken}`;
      
      // Send reminder email using existing email tracking token
      await sendInvoiceEmail({
        customerEmail: account.billingEmail,
        customerName: account.companyName,
        invoiceNumber: invoice.number,
        invoiceAmount: `$${(invoice.total / 100).toFixed(2)}`,
        dueDate: new Date(invoice.dueDate).toLocaleDateString(),
        companyName,
        invoiceUrl,
        customMessage,
        trackingToken: invoice.emailTrackingToken || undefined,
        isReminder: true,
      });
      
      const userId = (req.user as any)?.id || 1;
      
      // Update reminder metadata
      const reminderHistory = invoice.reminderHistory || [];
      reminderHistory.push({
        sentAt: new Date().toISOString(),
        sentBy: userId,
        message: customMessage || null,
      });
      
      await storage.updateInvoice(id, {
        lastReminderAt: new Date(),
        reminderCount: (invoice.reminderCount || 0) + 1,
        reminderHistory,
      });
      
      await storage.createInvoiceReminder({
        invoiceId: id,
        reminderType: 'payment_reminder',
        sentBy: userId,
        customMessage: customMessage || null,
      });
      
      await storage.createBillingAuditLog({
        entityType: 'invoice',
        entityId: id,
        action: 'reminder_sent',
        performedBy: userId,
        changes: { reminderCount: (invoice.reminderCount || 0) + 1 },
      });
      
      res.json({ success: true, message: "Reminder sent successfully" });
    } catch (error) {
      console.error("Error sending reminder:", error);
      res.status(500).json({ error: "Failed to send reminder" });
    }
  });

  app.get("/api/invoices/:id/pdf", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const invoice = await storage.getInvoiceById(id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      
      const account = await storage.getAccountById(invoice.accountId);
      const lines = await storage.getInvoiceLinesByInvoice(id);
      const billingSettings = await storage.getBillingSettings();
      const settings = billingSettings[0];
      
      const PdfPrinter = require('pdfmake');
      const fs = require('fs');
      const path = require('path');
      
      const fonts = {
        Roboto: {
          normal: Buffer.from(require('pdfmake/build/vfs_fonts').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
          bold: Buffer.from(require('pdfmake/build/vfs_fonts').pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
          italics: Buffer.from(require('pdfmake/build/vfs_fonts').pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
          bolditalics: Buffer.from(require('pdfmake/build/vfs_fonts').pdfMake.vfs['Roboto-MediumItalic.ttf'], 'base64')
        }
      };
      
      const printer = new PdfPrinter(fonts);
      
      const companyName = settings?.companyName || 'Pivotal B2B';
      const companyAddress = settings?.address || '';
      const logoUrl = settings?.logoUrl;
      const bankDetails = settings?.bankDetails || '';
      
      const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
          {
            columns: [
              {
                width: '*',
                stack: [
                  ...(logoUrl ? [{ image: logoUrl, width: 120, margin: [0, 0, 0, 10] }] : []),
                  { text: companyName, style: 'companyName' },
                  { text: companyAddress, style: 'address', margin: [0, 5, 0, 0] }
                ]
              },
              {
                width: 'auto',
                text: 'INVOICE',
                style: 'invoiceTitle',
                alignment: 'right'
              }
            ],
            margin: [0, 0, 0, 30]
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: '#667eea' }],
            margin: [0, 0, 0, 20]
          },
          {
            columns: [
              {
                width: '50%',
                stack: [
                  { text: 'BILL TO:', style: 'sectionHeader' },
                  { text: account?.companyName || 'N/A', bold: true, margin: [0, 5, 0, 3] },
                  { text: account?.billingAddress || '', margin: [0, 0, 0, 2] },
                  { text: `${account?.billingCity || ''}, ${account?.billingState || ''} ${account?.billingZip || ''}`, margin: [0, 0, 0, 0] }
                ]
              },
              {
                width: '50%',
                stack: [
                  { text: `Invoice #: ${invoice.number}`, margin: [0, 0, 0, 5] },
                  { text: `Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, margin: [0, 0, 0, 5] },
                  { text: `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, margin: [0, 0, 0, 5] },
                  ...(invoice.poNumber ? [{ text: `PO Number: ${invoice.poNumber}`, margin: [0, 0, 0, 5] }] : [])
                ],
                alignment: 'right'
              }
            ],
            margin: [0, 0, 0, 30]
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 60, 80, 80],
              body: [
                [
                  { text: 'Description', style: 'tableHeader' },
                  { text: 'Quantity', style: 'tableHeader', alignment: 'center' },
                  { text: 'Unit Price', style: 'tableHeader', alignment: 'right' },
                  { text: 'Amount', style: 'tableHeader', alignment: 'right' }
                ],
                ...lines.map(line => [
                  line.description,
                  { text: line.quantity.toString(), alignment: 'center' },
                  { text: `$${(line.unitPrice / 100).toFixed(2)}`, alignment: 'right' },
                  { text: `$${(line.lineTotal / 100).toFixed(2)}`, alignment: 'right' }
                ])
              ]
            },
            layout: {
              fillColor: (rowIndex: number) => (rowIndex === 0 ? '#667eea' : null),
              hLineWidth: () => 1,
              vLineWidth: () => 0,
              hLineColor: () => '#e5e7eb',
              paddingLeft: () => 10,
              paddingRight: () => 10,
              paddingTop: () => 8,
              paddingBottom: () => 8
            }
          },
          {
            columns: [
              { width: '*', text: '' },
              {
                width: 200,
                stack: [
                  {
                    columns: [
                      { text: 'Subtotal:', bold: true },
                      { text: `$${(invoice.subtotal / 100).toFixed(2)}`, alignment: 'right' }
                    ],
                    margin: [0, 10, 0, 5]
                  },
                  {
                    columns: [
                      { text: 'Tax:', bold: true },
                      { text: `$${(invoice.taxTotal / 100).toFixed(2)}`, alignment: 'right' }
                    ],
                    margin: [0, 0, 0, 5]
                  },
                  {
                    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 2, lineColor: '#667eea' }],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    columns: [
                      { text: 'Total:', bold: true, fontSize: 14, color: '#667eea' },
                      { text: `$${(invoice.total / 100).toFixed(2)}`, alignment: 'right', fontSize: 14, color: '#667eea', bold: true }
                    ],
                    margin: [0, 0, 0, 10]
                  },
                  {
                    columns: [
                      { text: 'Amount Paid:', bold: true },
                      { text: `$${(invoice.amountPaid / 100).toFixed(2)}`, alignment: 'right' }
                    ],
                    margin: [0, 0, 0, 5]
                  },
                  {
                    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 2, lineColor: '#667eea' }],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    columns: [
                      { text: 'Amount Due:', bold: true, fontSize: 14, color: '#667eea' },
                      { text: `$${(invoice.amountDue / 100).toFixed(2)}`, alignment: 'right', fontSize: 14, color: '#667eea', bold: true }
                    ]
                  }
                ]
              }
            ]
          },
          ...(settings?.invoiceFooter ? [{
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#e5e7eb' }],
            margin: [0, 30, 0, 10]
          },
          {
            text: settings.invoiceFooter,
            style: 'footer',
            margin: [0, 0, 0, 10]
          }] : []),
          ...(bankDetails ? [{
            table: {
              widths: ['*'],
              body: [[{
                text: [
                  { text: 'Bank Details:\n', bold: true },
                  { text: bankDetails }
                ],
                fillColor: '#f9fafb',
                margin: 10
              }]]
            },
            layout: 'noBorders',
            margin: [0, 10, 0, 0]
          }] : [])
        ],
        styles: {
          companyName: {
            fontSize: 20,
            bold: true,
            color: '#667eea'
          },
          address: {
            fontSize: 10,
            color: '#6b7280'
          },
          invoiceTitle: {
            fontSize: 28,
            bold: true,
            color: '#1f2937'
          },
          sectionHeader: {
            fontSize: 11,
            color: '#6b7280',
            bold: true
          },
          tableHeader: {
            bold: true,
            color: 'white'
          },
          footer: {
            fontSize: 9,
            color: '#6b7280'
          }
        }
      };
      
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.number}.pdf`);
      
      pdfDoc.pipe(res);
      pdfDoc.end();
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  app.get("/public/invoices/:token", async (req, res) => {
    try {
      const token = req.params.token;
      const invoice = await storage.getInvoiceByToken(token);
      
      if (!invoice) {
        return res.status(404).send("<h1>Invoice not found</h1>");
      }
      
      await storage.updateInvoice(invoice.id, {
        viewCount: (invoice.viewCount || 0) + 1,
        lastViewedAt: new Date().toISOString(),
      });
      
      await storage.createInvoiceView({
        invoiceId: invoice.id,
        ipAddress: req.ip || req.socket.remoteAddress,
      });
      
      const account = await storage.getAccountById(invoice.accountId);
      const lines = await storage.getInvoiceLinesByInvoice(invoice.id);
      const billingSettings = await storage.getBillingSettings();
      const settings = billingSettings[0];
      
      const companyName = settings?.companyName || 'Pivotal B2B';
      const companyAddress = settings?.address || '';
      
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${invoice.number}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6; color: #333; }
    .container { max-width: 800px; margin: 0 auto; background-color: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px; }
    .company { font-weight: bold; font-size: 24px; color: #667eea; }
    .invoice-title { font-size: 32px; font-weight: bold; text-align: right; color: #333; }
    .info-section { margin-bottom: 30px; }
    .info-section h3 { font-size: 14px; color: #666; margin-bottom: 5px; }
    .info-section p { margin: 3px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 30px; }
    th { background-color: #667eea; color: white; padding: 12px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    .total-section { margin-top: 30px; text-align: right; }
    .total-row { display: flex; justify-content: flex-end; padding: 8px 0; }
    .total-label { width: 150px; font-weight: bold; }
    .total-value { width: 150px; text-align: right; }
    .grand-total { font-size: 20px; color: #667eea; border-top: 2px solid #667eea; padding-top: 10px; margin-top: 10px; }
    .actions { margin-top: 30px; text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; margin: 0 10px; background-color: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .btn:hover { background-color: #5568d3; }
    @media print {
      body { background-color: white; }
      .container { box-shadow: none; }
      .actions { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="company">${companyName}</div>
        <p>${companyAddress}</p>
      </div>
      <div class="invoice-title">INVOICE</div>
    </div>
    
    <div style="display: flex; justify-content: space-between;">
      <div class="info-section">
        <h3>BILL TO:</h3>
        <p><strong>${account?.companyName || 'N/A'}</strong></p>
        <p>${account?.billingAddress || ''}</p>
        <p>${account?.billingCity || ''}, ${account?.billingState || ''} ${account?.billingZip || ''}</p>
      </div>
      
      <div class="info-section">
        <p><strong>Invoice #:</strong> ${invoice.number}</p>
        <p><strong>Date:</strong> ${new Date(invoice.issueDate).toLocaleDateString()}</p>
        <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
        ${invoice.poNumber ? `<p><strong>PO Number:</strong> ${invoice.poNumber}</p>` : ''}
      </div>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: center;">Quantity</th>
          <th style="text-align: right;">Unit Price</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${lines.map(line => `
          <tr>
            <td>${line.description}</td>
            <td style="text-align: center;">${line.quantity}</td>
            <td style="text-align: right;">$${(line.unitPrice / 100).toFixed(2)}</td>
            <td style="text-align: right;">$${(line.lineTotal / 100).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div class="total-section">
      <div class="total-row">
        <div class="total-label">Subtotal:</div>
        <div class="total-value">$${(invoice.subtotal / 100).toFixed(2)}</div>
      </div>
      <div class="total-row">
        <div class="total-label">Tax:</div>
        <div class="total-value">$${(invoice.taxTotal / 100).toFixed(2)}</div>
      </div>
      <div class="total-row grand-total">
        <div class="total-label">Total:</div>
        <div class="total-value">$${(invoice.total / 100).toFixed(2)}</div>
      </div>
      <div class="total-row">
        <div class="total-label">Amount Paid:</div>
        <div class="total-value">$${(invoice.amountPaid / 100).toFixed(2)}</div>
      </div>
      <div class="total-row grand-total">
        <div class="total-label">Amount Due:</div>
        <div class="total-value">$${(invoice.amountDue / 100).toFixed(2)}</div>
      </div>
    </div>
    
    <div class="actions">
      <a href="javascript:window.print()" class="btn">Print Invoice</a>
      <a href="/api/invoices/${invoice.id}/pdf" class="btn" target="_blank">Download PDF</a>
    </div>
    
    ${settings?.invoiceFooter ? `<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">${settings.invoiceFooter}</div>` : ''}
    ${settings?.bankDetails ? `<div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 4px;"><strong>Bank Details:</strong><br>${settings.bankDetails.replace(/\n/g, '<br>')}</div>` : ''}
  </div>
</body>
</html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      console.error("Error viewing invoice:", error);
      res.status(500).send("<h1>Error loading invoice</h1>");
    }
  });

  app.post("/api/invoices/:id/view", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const result = insertInvoiceViewSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const view = await storage.createInvoiceView({
        ...result.data,
        invoiceId: id,
      });
      
      await storage.updateInvoice(id, {
        viewCount: (await storage.getInvoiceViewsByInvoice(id)).length,
      });
      
      res.status(201).json(view);
    } catch (error) {
      console.error("Error tracking invoice view:", error);
      res.status(500).json({ error: "Failed to track invoice view" });
    }
  });

  app.get("/api/invoices/:id/views", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid invoice ID" });
      }
      
      const views = await storage.getInvoiceViewsByInvoice(id);
      res.json(views);
    } catch (error) {
      console.error("Error fetching invoice views:", error);
      res.status(500).json({ error: "Failed to fetch invoice views" });
    }
  });

  // Payments
  app.get("/api/payments", async (req, res) => {
    try {
      const invoiceId = req.query.invoiceId ? parseInt(req.query.invoiceId as string) : undefined;
      
      let payments;
      if (invoiceId) {
        payments = await storage.getPaymentsByInvoice(invoiceId);
      } else {
        payments = await storage.getPayments();
      }
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.get("/api/payments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid payment ID" });
      }
      const payment = await storage.getPaymentById(id);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      console.error("Error fetching payment:", error);
      res.status(500).json({ error: "Failed to fetch payment" });
    }
  });

  app.post("/api/payments", async (req, res) => {
    try {
      const result = insertPaymentSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const userId = (req.user as any)?.id || 1;
      const payment = await storage.createPayment(result.data);
      
      const invoice = await storage.getInvoiceById(payment.invoiceId);
      if (invoice) {
        const totalPaid = (await storage.getPaymentsByInvoice(invoice.id))
          .reduce((sum, p) => sum + parseFloat(p.amount), 0);
        
        const newStatus = totalPaid >= parseFloat(invoice.totalAmount) ? 'paid' : 'partial';
        await storage.updateInvoice(invoice.id, { status: newStatus });
      }
      
      await storage.createBillingAuditLog({
        entityType: 'payment',
        entityId: payment.id,
        action: 'created',
        performedBy: userId,
        changes: { amount: payment.amount, invoiceId: payment.invoiceId },
      });
      
      res.status(201).json(payment);
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(500).json({ error: "Failed to create payment" });
    }
  });

  app.patch("/api/payments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid payment ID" });
      }
      
      const existingPayment = await storage.getPaymentById(id);
      if (!existingPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      
      const result = insertPaymentSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const oldInvoiceId = existingPayment.invoiceId;
      const payment = await storage.updatePayment(id, result.data);
      const newInvoiceId = payment.invoiceId;
      
      if (oldInvoiceId !== newInvoiceId) {
        const oldInvoice = await storage.getInvoiceById(oldInvoiceId);
        if (oldInvoice) {
          const oldTotalPaid = (await storage.getPaymentsByInvoice(oldInvoiceId))
            .reduce((sum, p) => sum + parseFloat(p.amount), 0);
          const oldStatus = oldTotalPaid >= parseFloat(oldInvoice.totalAmount) ? 'paid' : 
                           oldTotalPaid > 0 ? 'partial' : 'sent';
          await storage.updateInvoice(oldInvoiceId, { status: oldStatus });
        }
      }
      
      const newInvoice = await storage.getInvoiceById(newInvoiceId);
      if (newInvoice) {
        const newTotalPaid = (await storage.getPaymentsByInvoice(newInvoiceId))
          .reduce((sum, p) => sum + parseFloat(p.amount), 0);
        const newStatus = newTotalPaid >= parseFloat(newInvoice.totalAmount) ? 'paid' : 
                         newTotalPaid > 0 ? 'partial' : 'sent';
        await storage.updateInvoice(newInvoiceId, { status: newStatus });
      }
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'payment',
        entityId: id,
        action: 'updated',
        performedBy: userId,
        changes: oldInvoiceId !== newInvoiceId ? { oldInvoiceId, newInvoiceId } : undefined,
      });
      
      res.json(payment);
    } catch (error) {
      console.error("Error updating payment:", error);
      res.status(500).json({ error: "Failed to update payment" });
    }
  });

  app.delete("/api/payments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid payment ID" });
      }
      
      const payment = await storage.getPaymentById(id);
      await storage.deletePayment(id);
      
      if (payment) {
        const invoice = await storage.getInvoiceById(payment.invoiceId);
        if (invoice) {
          const totalPaid = (await storage.getPaymentsByInvoice(invoice.id))
            .reduce((sum, p) => sum + parseFloat(p.amount), 0);
          
          const newStatus = totalPaid >= parseFloat(invoice.totalAmount) ? 'paid' : 
                           totalPaid > 0 ? 'partial' : 'sent';
          await storage.updateInvoice(invoice.id, { status: newStatus });
        }
      }
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'payment',
        entityId: id,
        action: 'deleted',
        performedBy: userId,
      });
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting payment:", error);
      res.status(500).json({ error: "Failed to delete payment" });
    }
  });

  // Credit Notes (Refunds)
  app.get("/api/credit-notes", async (req, res) => {
    try {
      const accountId = req.query.accountId ? parseInt(req.query.accountId as string) : undefined;
      
      let creditNotes;
      if (accountId) {
        creditNotes = await storage.getCreditNotesByAccount(accountId);
      } else {
        creditNotes = await storage.getCreditNotes();
      }
      res.json(creditNotes);
    } catch (error) {
      console.error("Error fetching credit notes:", error);
      res.status(500).json({ error: "Failed to fetch credit notes" });
    }
  });

  app.get("/api/credit-notes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid credit note ID" });
      }
      
      const creditNote = await storage.getCreditNoteById(id);
      if (!creditNote) {
        return res.status(404).json({ error: "Credit note not found" });
      }
      
      const applications = await storage.getCreditNoteApplicationsByCreditNote(id);
      res.json({
        ...creditNote,
        applications
      });
    } catch (error) {
      console.error("Error fetching credit note:", error);
      res.status(500).json({ error: "Failed to fetch credit note" });
    }
  });

  app.post("/api/credit-notes", async (req, res) => {
    try {
      const result = insertCreditNoteSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const userId = (req.user as any)?.id || 1;
      const creditNote = await storage.createCreditNote({
        ...result.data,
        createdBy: userId,
      });
      
      await storage.createBillingAuditLog({
        entityType: 'credit_note',
        entityId: creditNote.id,
        action: 'created',
        performedBy: userId,
        changes: { amount: creditNote.amount, accountId: creditNote.accountId },
      });
      
      res.status(201).json(creditNote);
    } catch (error) {
      console.error("Error creating credit note:", error);
      res.status(500).json({ error: "Failed to create credit note" });
    }
  });

  app.patch("/api/credit-notes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid credit note ID" });
      }
      
      const result = insertCreditNoteSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const creditNote = await storage.updateCreditNote(id, result.data);
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'credit_note',
        entityId: id,
        action: 'updated',
        performedBy: userId,
      });
      
      res.json(creditNote);
    } catch (error) {
      console.error("Error updating credit note:", error);
      res.status(500).json({ error: "Failed to update credit note" });
    }
  });

  app.delete("/api/credit-notes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid credit note ID" });
      }
      
      await storage.deleteCreditNoteApplication(id);
      await storage.deleteCreditNote(id);
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'credit_note',
        entityId: id,
        action: 'deleted',
        performedBy: userId,
      });
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting credit note:", error);
      res.status(500).json({ error: "Failed to delete credit note" });
    }
  });

  app.post("/api/credit-notes/:id/apply", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid credit note ID" });
      }
      
      const result = insertCreditNoteApplicationSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const creditNote = await storage.getCreditNoteById(id);
      if (!creditNote) {
        return res.status(404).json({ error: "Credit note not found" });
      }
      
      const application = await storage.createCreditNoteApplication({
        ...result.data,
        creditNoteId: id,
      });
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'credit_note',
        entityId: id,
        action: 'applied',
        performedBy: userId,
        changes: { invoiceId: application.invoiceId, amount: application.appliedAmount },
      });
      
      res.status(201).json(application);
    } catch (error) {
      console.error("Error applying credit note:", error);
      res.status(500).json({ error: "Failed to apply credit note" });
    }
  });

  // Expenses & Bills
  app.get("/api/expenses", async (_req, res) => {
    try {
      const expenses = await storage.getExpenses();
      res.json(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ error: "Failed to fetch expenses" });
    }
  });

  app.get("/api/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid expense ID" });
      }
      const expense = await storage.getExpenseById(id);
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.json(expense);
    } catch (error) {
      console.error("Error fetching expense:", error);
      res.status(500).json({ error: "Failed to fetch expense" });
    }
  });

  app.post("/api/expenses", async (req, res) => {
    try {
      const result = insertExpenseSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const userId = (req.user as any)?.id || 1;
      const expense = await storage.createExpense({
        ...result.data,
        submittedBy: userId,
      });
      
      await storage.createBillingAuditLog({
        entityType: 'expense',
        entityId: expense.id,
        action: 'created',
        performedBy: userId,
        changes: { amount: expense.amount, category: expense.category },
      });
      
      res.status(201).json(expense);
    } catch (error) {
      console.error("Error creating expense:", error);
      res.status(500).json({ error: "Failed to create expense" });
    }
  });

  app.patch("/api/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid expense ID" });
      }
      
      const result = insertExpenseSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      
      const expense = await storage.updateExpense(id, result.data);
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'expense',
        entityId: id,
        action: 'updated',
        performedBy: userId,
      });
      
      res.json(expense);
    } catch (error) {
      console.error("Error updating expense:", error);
      res.status(500).json({ error: "Failed to update expense" });
    }
  });

  app.delete("/api/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid expense ID" });
      }
      
      await storage.deleteExpense(id);
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'expense',
        entityId: id,
        action: 'deleted',
        performedBy: userId,
      });
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting expense:", error);
      res.status(500).json({ error: "Failed to delete expense" });
    }
  });

  app.post("/api/expenses/:id/approve", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid expense ID" });
      }
      
      const expense = await storage.getExpenseById(id);
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      
      const userId = (req.user as any)?.id || 1;
      const updatedExpense = await storage.updateExpense(id, {
        status: 'approved',
        approvedBy: userId,
        approvedAt: new Date().toISOString(),
      });
      
      await storage.createBillingAuditLog({
        entityType: 'expense',
        entityId: id,
        action: 'approved',
        performedBy: userId,
      });
      
      res.json(updatedExpense);
    } catch (error) {
      console.error("Error approving expense:", error);
      res.status(500).json({ error: "Failed to approve expense" });
    }
  });

  app.post("/api/expenses/:id/reject", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid expense ID" });
      }
      
      const expense = await storage.getExpenseById(id);
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      
      const userId = (req.user as any)?.id || 1;
      const updatedExpense = await storage.updateExpense(id, {
        status: 'rejected',
        approvedBy: userId,
        approvedAt: new Date().toISOString(),
      });
      
      await storage.createBillingAuditLog({
        entityType: 'expense',
        entityId: id,
        action: 'rejected',
        performedBy: userId,
        changes: { reason: req.body.reason },
      });
      
      res.json(updatedExpense);
    } catch (error) {
      console.error("Error rejecting expense:", error);
      res.status(500).json({ error: "Failed to reject expense" });
    }
  });

  app.post("/api/expenses/:id/pay", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid expense ID" });
      }
      
      const expense = await storage.getExpenseById(id);
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      
      if (expense.status !== 'approved') {
        return res.status(400).json({ error: "Only approved expenses can be paid" });
      }
      
      const updatedExpense = await storage.updateExpense(id, {
        paidAt: new Date().toISOString(),
      });
      
      const userId = (req.user as any)?.id || 1;
      await storage.createBillingAuditLog({
        entityType: 'expense',
        entityId: id,
        action: 'paid',
        performedBy: userId,
        changes: { paidAt: updatedExpense.paidAt },
      });
      
      res.json(updatedExpense);
    } catch (error) {
      console.error("Error marking expense as paid:", error);
      res.status(500).json({ error: "Failed to mark expense as paid" });
    }
  });

  // Financial Reports
  app.get("/api/reports/ar-aging", async (_req, res) => {
    try {
      const invoices = await storage.getInvoices();
      const now = new Date();
      
      const aging = {
        current: { count: 0, amount: 0 },
        days30: { count: 0, amount: 0 },
        days60: { count: 0, amount: 0 },
        days90Plus: { count: 0, amount: 0 },
        total: { count: 0, amount: 0 }
      };
      
      invoices
        .filter(inv => inv.type === 'invoice' && inv.status !== 'paid' && inv.status !== 'void')
        .forEach(invoice => {
          const dueDate = new Date(invoice.dueDate);
          const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
          const amount = parseFloat(invoice.totalAmount);
          
          if (daysOverdue <= 0) {
            aging.current.count++;
            aging.current.amount += amount;
          } else if (daysOverdue <= 30) {
            aging.days30.count++;
            aging.days30.amount += amount;
          } else if (daysOverdue <= 60) {
            aging.days60.count++;
            aging.days60.amount += amount;
          } else {
            aging.days90Plus.count++;
            aging.days90Plus.amount += amount;
          }
          
          aging.total.count++;
          aging.total.amount += amount;
        });
      
      res.json(aging);
    } catch (error) {
      console.error("Error generating AR aging report:", error);
      res.status(500).json({ error: "Failed to generate AR aging report" });
    }
  });

  app.get("/api/reports/ap-aging", async (_req, res) => {
    try {
      const expenses = await storage.getExpenses();
      const now = new Date();
      
      const aging = {
        current: { count: 0, amount: 0 },
        days30: { count: 0, amount: 0 },
        days60: { count: 0, amount: 0 },
        days90Plus: { count: 0, amount: 0 },
        total: { count: 0, amount: 0 }
      };
      
      expenses
        .filter(exp => exp.status === 'approved' && !exp.paidAt)
        .forEach(expense => {
          const expenseDate = new Date(expense.date);
          const daysOld = Math.floor((now.getTime() - expenseDate.getTime()) / (1000 * 60 * 60 * 24));
          const amount = parseFloat(expense.amount);
          
          if (daysOld <= 30) {
            aging.current.count++;
            aging.current.amount += amount;
          } else if (daysOld <= 60) {
            aging.days30.count++;
            aging.days30.amount += amount;
          } else if (daysOld <= 90) {
            aging.days60.count++;
            aging.days60.amount += amount;
          } else {
            aging.days90Plus.count++;
            aging.days90Plus.amount += amount;
          }
          
          aging.total.count++;
          aging.total.amount += amount;
        });
      
      res.json(aging);
    } catch (error) {
      console.error("Error generating AP aging report:", error);
      res.status(500).json({ error: "Failed to generate AP aging report" });
    }
  });

  app.get("/api/reports/profit-loss", async (req, res) => {
    try {
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate and endDate are required" });
      }
      
      const invoices = await storage.getInvoices();
      const expenses = await storage.getExpenses();
      
      const revenue = invoices
        .filter(inv => inv.type === 'invoice' && 
                inv.status === 'paid' && 
                inv.issueDate >= startDate && 
                inv.issueDate <= endDate)
        .reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0);
      
      const costs = expenses
        .filter(exp => exp.paidAt && 
                exp.date >= startDate && 
                exp.date <= endDate)
        .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      
      const profitLoss = {
        startDate,
        endDate,
        revenue,
        expenses: costs,
        netIncome: revenue - costs,
        margin: revenue > 0 ? ((revenue - costs) / revenue * 100).toFixed(2) : 0
      };
      
      res.json(profitLoss);
    } catch (error) {
      console.error("Error generating P&L report:", error);
      res.status(500).json({ error: "Failed to generate P&L report" });
    }
  });

  app.get("/api/reports/cashflow", async (req, res) => {
    try {
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate and endDate are required" });
      }
      
      const payments = await storage.getPayments();
      const expenses = await storage.getExpenses();
      
      const cashIn = payments
        .filter(p => p.paymentDate && 
                p.paymentDate >= startDate && 
                p.paymentDate <= endDate)
        .reduce((sum, p) => sum + parseFloat(p.amount), 0);
      
      const cashOut = expenses
        .filter(exp => exp.paidAt && 
                exp.date >= startDate && 
                exp.date <= endDate)
        .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      
      const cashflow = {
        startDate,
        endDate,
        cashIn,
        cashOut,
        netCashFlow: cashIn - cashOut
      };
      
      res.json(cashflow);
    } catch (error) {
      console.error("Error generating cashflow report:", error);
      res.status(500).json({ error: "Failed to generate cashflow report" });
    }
  });

  app.get("/api/reports/sales", async (req, res) => {
    try {
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate and endDate are required" });
      }
      
      const invoices = await storage.getInvoices();
      const payments = await storage.getPayments();
      
      const filteredInvoices = invoices.filter(inv => 
        inv.type === 'invoice' && 
        inv.issueDate >= startDate && 
        inv.issueDate <= endDate
      );
      
      const totalInvoiced = filteredInvoices.reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0);
      const totalPaid = filteredInvoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0);
      
      const accountRevenue: { [key: number]: number } = {};
      filteredInvoices.forEach(inv => {
        if (!accountRevenue[inv.accountId]) {
          accountRevenue[inv.accountId] = 0;
        }
        accountRevenue[inv.accountId] += parseFloat(inv.totalAmount);
      });
      
      const topAccounts = Object.entries(accountRevenue)
        .map(([accountId, revenue]) => ({ accountId: parseInt(accountId), revenue }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);
      
      const salesReport = {
        startDate,
        endDate,
        totalInvoiced,
        totalPaid,
        outstanding: totalInvoiced - totalPaid,
        invoiceCount: filteredInvoices.length,
        averageInvoice: filteredInvoices.length > 0 ? totalInvoiced / filteredInvoices.length : 0,
        topAccounts
      };
      
      res.json(salesReport);
    } catch (error) {
      console.error("Error generating sales report:", error);
      res.status(500).json({ error: "Failed to generate sales report" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}