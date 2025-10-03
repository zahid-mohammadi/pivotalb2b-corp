# B2B Marketing Platform

## Overview
A cutting-edge B2B marketing platform delivering targeted, data-driven Account-Based Marketing (ABM) solutions with advanced content creation and optimization capabilities.

## Stack
- React frontend with advanced segmentation
- TypeScript for robust type safety  
- Tailwind CSS for responsive design
- Framer Motion for interactive animations
- Brevo website tracking integration
- Advanced content rendering and blog management system
- Rich text editing with SEO and internal linking features
- Automated blog post generation and SEO optimization
- PostgreSQL database with Drizzle ORM

## Project Architecture
- Frontend: React with Wouter routing, TanStack Query for data fetching
- Backend: Express server with TypeScript
- Database: PostgreSQL with Drizzle ORM
- Storage: Database-based storage for leads, blog posts, ebooks, case studies, users, services, proposal requests
- Authentication: Passport.js with session-based auth

## User Preferences
- Mobile-first responsive design
- Focus on lead management and dashboard functionality
- Optimize for mobile views

## Recent Changes
- **NEW: Contacts & Accounts CRM Module** (October 3, 2025)
  - Added comprehensive Accounts (Companies) management system
  - Added Contacts (Individuals) management with account linking
  - Auto-linking contacts to accounts based on email domain
  - Pipeline deals now link to both Contact and Account entities
  - Engagement scoring at both contact and account levels
  - Dedicated list views with search, filtering, and stats
  - Sidebar navigation updated with Accounts and Contacts sections

- Configured automated email notification system using Brevo SMTP for eBook downloads
- Users receive beautiful HTML confirmation emails with direct links to eBook content
- eBooks Library now correctly links ABM eBook to custom landing page
- Redesigned ABM eBook table of contents with professional card-based layout
- Added hover animations, progress bars, and summary statistics to eBook page

## Email Notification System
- Brevo (formerly SendinBlue) integration for transactional emails
- Automated download confirmation emails sent to users who fill eBook forms
- Professional HTML email templates with responsive design
- Emails include personalized greeting, company name, and direct eBook access link
- Environment variable: BREVO_API_KEY (already configured)

## Lead Management Features
- Lead collection from content downloads
- Lead data includes: fullName, email, company, contentType, contentId, downloadedAt, message, source
- Automated email confirmations sent for eBook downloads
- Currently displayed in table format on dashboard
- Need to add individual lead detail view with mobile optimization