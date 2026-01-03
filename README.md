# Corporate Website - B2B Marketing Platform

A cutting-edge B2B marketing platform delivering targeted, data-driven Account-Based Marketing (ABM) solutions with advanced content creation and optimization capabilities.

## 🚀 Quick Start

### Local Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd Corporate-Website
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Open http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

## 📦 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Express.js, Node.js 20
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** Passport.js with session-based auth
- **Email:** Brevo SMTP integration
- **Deployment:** Google Cloud Platform (App Engine / Cloud Run)

## 🏗️ Project Structure

```
Corporate-Website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── index.html
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Express middleware
│   └── index.ts          # Server entry point
├── shared/               # Shared types and utilities
├── scripts/              # Deployment and utility scripts
├── uploads/              # User uploaded files
└── dist/                 # Production build output
```

## 🌐 Deployment to Google Cloud Platform

### Prerequisites

- Google Cloud account with billing enabled
- gcloud CLI installed
- Docker installed (for Cloud Run)

### Deploy to App Engine

```bash
# First time setup
gcloud app create --region=us-central

# Deploy
npm run build
gcloud app deploy

# Or use the deployment script
./scripts/deploy-gcp.sh       # Linux/Mac
.\scripts\deploy-gcp.ps1      # Windows
```

### Deploy to Cloud Run

```bash
# Deploy using script
./scripts/deploy-cloudrun.sh       # Linux/Mac
.\scripts\deploy-cloudrun.ps1      # Windows
```

**For detailed deployment instructions, see [GCP_DEPLOYMENT_GUIDE.md](./GCP_DEPLOYMENT_GUIDE.md)**

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run db:push` | Push database schema changes |
| `npm run gcp:deploy` | Deploy to Google App Engine |
| `npm run gcp:logs` | View application logs |
| `npm run gcp:browse` | Open deployed app in browser |

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```env
# Session
SESSION_SECRET=your-secure-secret

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/db
PGDATABASE=database-name
PGHOST=database-host
PGPORT=5432
PGUSER=database-user
PGPASSWORD=database-password

# Email (SMTP)
SMTP_PORT=587
SMTP_USER=smtp-username
SMTP_PASSWORD=smtp-password

# Application
CUSTOM_DOMAIN=your-domain.com
NODE_ENV=production
PORT=8080
```

## 🗄️ Database

This application uses PostgreSQL. Two options are supported:

1. **Neon Database** (Current setup)
   - Serverless PostgreSQL
   - No additional configuration needed

2. **Google Cloud SQL**
   - Fully managed PostgreSQL on GCP
   - Better integration with other GCP services

### Database Migrations

```bash
# Push schema changes
npm run db:push
```

## 🎨 Features

### Core Functionality
- ✅ Account-Based Marketing (ABM) campaigns
- ✅ Lead generation and management
- ✅ Content creation and blog management
- ✅ Rich text editor with SEO optimization
- ✅ Invoice generation and billing
- ✅ Analytics dashboard with real-time updates
- ✅ Email campaign tracking
- ✅ User authentication and authorization

### Technical Features
- ✅ Server-side rendering
- ✅ WebSocket support for real-time updates
- ✅ Session-based authentication
- ✅ File upload and management
- ✅ PDF generation
- ✅ SEO optimization with meta tags
- ✅ Responsive mobile-first design
- ✅ Security headers and HTTPS enforcement

## 🔒 Security

- Session-based authentication with secure cookies
- HTTPS enforcement in production
- Security headers (CSP, HSTS, etc.)
- SQL injection protection via Drizzle ORM
- XSS protection
- CSRF protection
- Rate limiting (configurable)

## 📊 Monitoring

### View Logs

**App Engine:**
```bash
gcloud app logs tail -s default
```

**Cloud Run:**
```bash
gcloud logging read "resource.type=cloud_run_revision" --limit=50
```

### Performance Monitoring

Access Google Cloud Console:
- App Engine: https://console.cloud.google.com/appengine
- Cloud Run: https://console.cloud.google.com/run

## 🐳 Docker Support

Build and run locally with Docker:

```bash
# Build image
docker build -t corporate-website .

# Run container
docker run -p 8080:8080 \
  -e DATABASE_URL=your-db-url \
  -e SESSION_SECRET=your-secret \
  corporate-website
```

## 🧪 Testing

```bash
# Type checking
npm run check

# Build verification
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation:** See [GCP_DEPLOYMENT_GUIDE.md](./GCP_DEPLOYMENT_GUIDE.md)
- **Issues:** Create an issue in the repository
- **GCP Support:** https://cloud.google.com/support

## 🔄 Migration from Replit

This project has been migrated from Replit to Google Cloud Platform. Key changes:

- ✅ Removed Replit-specific configuration files
- ✅ Removed Replit vite plugins
- ✅ Added Google Cloud deployment configurations
- ✅ Added Docker support for Cloud Run
- ✅ Created deployment scripts for both platforms
- ✅ Added comprehensive deployment documentation

All Replit dependencies and configurations have been removed for a clean GCP deployment.

---

**Last Updated:** January 3, 2026
