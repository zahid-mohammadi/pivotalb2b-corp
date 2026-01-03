# Google Cloud Platform Deployment Guide

## 🚀 Overview

This document provides complete instructions for deploying the Corporate Website application to Google Cloud Platform (GCP). The application can be deployed using either:

1. **Google App Engine** (Recommended for beginners) - Fully managed platform
2. **Google Cloud Run** (Recommended for flexibility) - Containerized deployment

---

## 📋 Prerequisites

### Required Tools

1. **Google Cloud CLI (gcloud)**
   - Download: https://cloud.google.com/sdk/docs/install
   - Verify installation: `gcloud --version`

2. **Node.js 20+**
   - Download: https://nodejs.org/
   - Verify: `node --version`

3. **Docker** (Only for Cloud Run deployment)
   - Download: https://docs.docker.com/get-docker/
   - Verify: `docker --version`

### Google Cloud Setup

1. **Create a GCP Project**
   ```bash
   gcloud projects create YOUR-PROJECT-ID
   gcloud config set project YOUR-PROJECT-ID
   ```

2. **Enable Required APIs**
   ```bash
   gcloud services enable appengine.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable secretmanager.googleapis.com
   ```

3. **Enable Billing**
   - Visit: https://console.cloud.google.com/billing
   - Link your project to a billing account

4. **Authenticate**
   ```bash
   gcloud auth login
   gcloud auth application-default login
   ```

---

## 🔐 Environment Variables Setup

### Option 1: Using Google Secret Manager (Recommended for Production)

1. **Create Secrets**
   ```bash
   # Database credentials
   echo -n "postgresql://user:pass@host:5432/db" | gcloud secrets create DATABASE_URL --data-file=-
   
   # Session secret
   echo -n "your-secure-random-string" | gcloud secrets create SESSION_SECRET --data-file=-
   
   # SMTP credentials
   echo -n "your-smtp-user" | gcloud secrets create SMTP_USER --data-file=-
   echo -n "your-smtp-password" | gcloud secrets create SMTP_PASSWORD --data-file=-
   ```

2. **Grant Access to Secrets**
   ```bash
   # For App Engine
   gcloud secrets add-iam-policy-binding DATABASE_URL \
     --member="serviceAccount:YOUR-PROJECT-ID@appspot.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   
   # For Cloud Run
   gcloud secrets add-iam-policy-binding DATABASE_URL \
     --member="serviceAccount:YOUR-PROJECT-NUMBER-compute@developer.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

### Option 2: Using app.yaml (For App Engine Only)

Edit `app.yaml` and add your environment variables:

```yaml
env_variables:
  NODE_ENV: "production"
  DATABASE_URL: "your-database-url"
  SESSION_SECRET: "your-session-secret"
  SMTP_USER: "your-smtp-user"
  SMTP_PASSWORD: "your-smtp-password"
  CUSTOM_DOMAIN: "your-domain.com"
```

⚠️ **Warning:** Never commit sensitive values to version control!

---

## 🏗️ Deployment Options

### Option A: Deploy to Google App Engine

**Advantages:**
- ✅ Fully managed, no infrastructure management
- ✅ Automatic scaling
- ✅ Built-in load balancing
- ✅ Easy SSL/TLS certificate management

**Steps:**

1. **Initialize App Engine (first time only)**
   ```bash
   gcloud app create --region=us-central
   ```

2. **Build the Application**
   ```bash
   npm install
   npm run build
   ```

3. **Deploy**
   
   **On Windows (PowerShell):**
   ```powershell
   .\scripts\deploy-gcp.ps1
   ```
   
   **On Linux/Mac:**
   ```bash
   chmod +x scripts/deploy-gcp.sh
   ./scripts/deploy-gcp.sh
   ```
   
   **Or manually:**
   ```bash
   gcloud app deploy
   ```

4. **View Your Application**
   ```bash
   gcloud app browse
   ```

5. **View Logs**
   ```bash
   gcloud app logs tail -s default
   ```

### Option B: Deploy to Google Cloud Run

**Advantages:**
- ✅ Container-based deployment
- ✅ Pay only for actual usage
- ✅ More flexible scaling options
- ✅ Support for custom runtimes

**Steps:**

1. **Build and Deploy**
   
   **On Windows (PowerShell):**
   ```powershell
   .\scripts\deploy-cloudrun.ps1
   ```
   
   **On Linux/Mac:**
   ```bash
   chmod +x scripts/deploy-cloudrun.sh
   ./scripts/deploy-cloudrun.sh
   ```

2. **Configure Environment Variables**
   ```bash
   gcloud run services update corporate-website \
     --set-env-vars="DATABASE_URL=your-value,SESSION_SECRET=your-value" \
     --region=us-central1
   ```

3. **Set Secrets (Using Secret Manager)**
   ```bash
   gcloud run services update corporate-website \
     --update-secrets=DATABASE_URL=DATABASE_URL:latest \
     --region=us-central1
   ```

4. **View Logs**
   ```bash
   gcloud logging read "resource.type=cloud_run_revision" --limit 50
   ```

---

## 🗄️ Database Setup

This application uses PostgreSQL. You have two options:

### Option 1: Continue Using Neon Database (Current Setup)

Your `.env.txt` already has Neon database credentials. No changes needed.

### Option 2: Google Cloud SQL

1. **Create a PostgreSQL Instance**
   ```bash
   gcloud sql instances create corporate-db \
     --database-version=POSTGRES_15 \
     --tier=db-f1-micro \
     --region=us-central1
   ```

2. **Create Database**
   ```bash
   gcloud sql databases create corporatedb --instance=corporate-db
   ```

3. **Set Password**
   ```bash
   gcloud sql users set-password postgres \
     --instance=corporate-db \
     --password=YOUR-SECURE-PASSWORD
   ```

4. **Get Connection String**
   ```bash
   gcloud sql instances describe corporate-db
   ```

5. **Update Environment Variables** with the new connection string

---

## 🌐 Custom Domain Setup

### For App Engine:

1. **Verify Domain Ownership**
   ```bash
   gcloud domains verify YOUR-DOMAIN.com
   ```

2. **Map Custom Domain**
   ```bash
   gcloud app domain-mappings create YOUR-DOMAIN.com
   ```

3. **Update DNS Records** as instructed by GCP Console

### For Cloud Run:

1. **Map Domain**
   ```bash
   gcloud run domain-mappings create \
     --service=corporate-website \
     --domain=YOUR-DOMAIN.com \
     --region=us-central1
   ```

2. **Update DNS Records** with provided values

---

## 📊 Monitoring and Management

### View Logs

**App Engine:**
```bash
gcloud app logs tail -s default
gcloud app logs read --limit=100
```

**Cloud Run:**
```bash
gcloud logging read "resource.type=cloud_run_revision" --limit=50
```

### View Application Metrics

Visit Google Cloud Console:
- App Engine: https://console.cloud.google.com/appengine
- Cloud Run: https://console.cloud.google.com/run

### Set Up Alerts

1. **Go to Monitoring**
   ```
   https://console.cloud.google.com/monitoring
   ```

2. **Create Alert Policies** for:
   - High error rates
   - High response times
   - Resource usage

### Scale Your Application

**App Engine (edit app.yaml):**
```yaml
automatic_scaling:
  min_instances: 1
  max_instances: 20
  target_cpu_utilization: 0.60
```

**Cloud Run:**
```bash
gcloud run services update corporate-website \
  --min-instances=2 \
  --max-instances=20 \
  --region=us-central1
```

---

## 🔄 Continuous Deployment

### Using Cloud Build

1. **Create cloudbuild.yaml** (already included)

2. **Connect GitHub Repository**
   ```bash
   gcloud builds submit --config=cloudbuild.yaml
   ```

3. **Set Up Triggers**
   ```bash
   gcloud builds triggers create github \
     --repo-name=YOUR-REPO \
     --repo-owner=YOUR-USERNAME \
     --branch-pattern="^main$" \
     --build-config=cloudbuild.yaml
   ```

---

## 🛠️ Troubleshooting

### Common Issues

**Issue: Build fails during npm install**
```bash
# Solution: Clear npm cache and retry
npm cache clean --force
npm install
```

**Issue: Database connection timeout**
```bash
# Solution: Check Cloud SQL proxy or Neon connection
# Verify DATABASE_URL is correct in environment variables
```

**Issue: Application not starting**
```bash
# Check logs for errors
gcloud app logs tail -s default --level=error

# Verify all environment variables are set
gcloud app versions describe YOUR-VERSION
```

**Issue: Memory errors**
```bash
# Increase instance class in app.yaml
instance_class: F4  # or F4_1G for more memory
```

### Getting Help

- Google Cloud Documentation: https://cloud.google.com/docs
- Stack Overflow: Tag questions with `google-app-engine` or `google-cloud-run`
- GCP Community: https://www.googlecloudcommunity.com/

---

## 💰 Cost Optimization

### App Engine Pricing

- First 28 instance hours per day are free
- F1 instance: ~$0.05/hour
- F2 instance: ~$0.10/hour
- Outbound traffic: $0.12/GB

### Cloud Run Pricing

- First 2 million requests per month are free
- 180,000 vCPU-seconds free per month
- 360,000 GiB-seconds memory free per month
- Pay only for actual usage

### Tips to Reduce Costs

1. Set appropriate min/max instances
2. Use Cloud CDN for static assets
3. Enable compression for responses
4. Monitor and optimize cold starts
5. Use appropriate instance sizes

---

## 🔒 Security Best Practices

1. **Use Secret Manager** for all sensitive data
2. **Enable HTTPS** (automatic with GCP)
3. **Set up IAM roles** with least privilege
4. **Enable VPC** for database connections
5. **Regular security updates** (`npm audit`)
6. **Enable Cloud Armor** for DDoS protection
7. **Set up Cloud Identity-Aware Proxy** for admin routes

---

## 📝 Quick Reference Commands

```bash
# Deploy to App Engine
gcloud app deploy

# Deploy to Cloud Run  
gcloud run deploy corporate-website --source .

# View logs (App Engine)
gcloud app logs tail -s default

# View logs (Cloud Run)
gcloud logging read "resource.type=cloud_run_revision" --limit=50

# List versions
gcloud app versions list

# Stop a version
gcloud app versions stop VERSION_ID

# Update environment variables (Cloud Run)
gcloud run services update corporate-website \
  --set-env-vars="KEY=value" --region=us-central1

# View service details
gcloud app describe
gcloud run services describe corporate-website --region=us-central1
```

---

## 🎯 Next Steps

1. ✅ Complete initial deployment
2. ✅ Set up custom domain
3. ✅ Configure monitoring and alerts
4. ✅ Set up automated backups for database
5. ✅ Configure CI/CD pipeline
6. ✅ Perform load testing
7. ✅ Document runbooks for common operations

---

## 📞 Support

For issues specific to this application, contact your development team.
For GCP-related issues, visit [Google Cloud Support](https://cloud.google.com/support).

---

**Last Updated:** January 3, 2026
