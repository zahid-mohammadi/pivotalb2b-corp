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
- **NEW: Professional Invoice PDF Generation** (October 5, 2025)
  - Upgraded to pdfmake for server-side PDF generation
  - A4-sized invoices with company logo and branding
  - Company information header: Pivotal B2B LLC, 16192 Coastal Highway, Lewes, Delaware 19958, USA
  - Bill To section displays: Company Name, Contact Name, and Full Billing Address (street, city, state, ZIP)
  - Professional two-column footer layout with payment instruction and bank details
  - Payment information section with bordered display for bank account details
  - Beautiful invoice footer with company branding and custom messages
  - Proper PDF download with filename invoice-{number}.pdf
  - Professional layout with color-coded sections and tables
  - Includes all invoice details: line items, taxes, totals, payment info

- **NEW: Billing & Accounting Module** (October 5, 2025)
  - Complete invoicing system with line items, SKUs, and tax management
  - Invoice actions: Send via email, Download PDF, Print, Public view tracking
  - Products/Services catalog with SKU management
  - Tax code management for compliant billing
  - Email delivery via Brevo SMTP with tracking tokens
  - PDF generation for invoices with professional formatting
  - Public invoice view tracking (who viewed, when)
  - Invoice emails use account.billingEmail field

- **NEW: Security & SEO Protection** (October 5, 2025)
  - Comprehensive security headers (HSTS, CSP, X-Frame-Options, etc.)
  - Authentication rate limiting (5 attempts per 15 minutes)
  - robots.txt for search engine control
  - Meta robots tags on all dashboard pages (noindex, nofollow)
  - Sitemap excludes all private routes: /dashboard, /accounts, /contacts, /proposal, /lead, /login, /admin, /api, /invoices
  - Public invoice routes secured with time-limited tokens
  - All dashboard routes protected from search engine indexing

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
- Dashboard displays leads in table and card format
- Individual lead detail view with mobile optimization

## Security Features
- **HTTP Security Headers**: HSTS (1 year), CSP, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Rate Limiting**: Authentication endpoints limited to prevent brute force attacks
- **Search Engine Protection**: 
  - robots.txt blocks crawling of all dashboard/admin routes
  - Meta robots tags (noindex, nofollow) on all dashboard pages
  - Sitemap excludes all private routes
- **Session Security**: HTTP-only cookies, SameSite protection, 24-hour expiry
- **Public Invoice Security**: Token-based access with view tracking

## Billing & Accounting System
- **Billing Settings**: Comprehensive settings interface for managing company information, bank account details, and invoice customization
  - Company Info: Company name, legal name, business address, tax registration
  - Banking: Bank account details displayed on invoices for payment
  - Invoice Settings: Invoice prefix, default currency, payment terms, invoice footer text
  - Tab-based interface for easy navigation between settings sections
- **Customer Management**: Complete customer/account management with detailed billing information
  - Company name and contact name fields
  - Billing address with separate fields for street, city, state/province, ZIP/postal code
  - Tax ID, payment terms, currency preferences
  - Contact information (email, website, country)
- **Invoices**: Create, edit, send, download, print, and track invoices
- **Line Items**: Product/service line items with quantities, rates, and tax codes
- **SKU Management**: Reusable products/services catalog
- **Tax Management**: Flexible tax codes for compliance
- **Email Delivery**: 
  - Send invoices via Microsoft 365 SMTP (smtp.office365.com, port 587)
  - Customizable email messages before sending
  - Email open tracking with tracking pixels
  - View email open counts and timestamps
  - Payment reminder system for sent invoices
- **PDF Generation**: 
  - Professional A4-sized invoice PDFs using pdfmake
  - Includes company logo, address, and banking information
  - Downloadable PDF format with proper branding
  - Consistent formatting across all invoices
- **View Tracking**: Monitor who views public invoices and when
- **Reminder System**:
  - Send payment reminders for overdue invoices
  - Customizable reminder messages
  - Track reminder count and history
  - Reminder emails reuse email tracking for opens