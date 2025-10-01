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
- Added dynamic sitemap generation at /sitemap.xml with pivotal-b2b.com domain
- Sitemap automatically includes all pages except compliance (privacy, terms, cookies)
- Sitemap updates dynamically as new content (blog posts, services, ebooks) is added
- Fixed React SlotClone errors in eBook detail page by using onClick navigation
- Date: 2025-10-01

## Lead Management Features
- Lead collection from content downloads
- Lead data includes: fullName, email, company, contentType, contentId, downloadedAt, message, source
- Currently displayed in table format on dashboard
- Need to add individual lead detail view with mobile optimization