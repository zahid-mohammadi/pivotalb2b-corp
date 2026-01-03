# Quick Setup Guide - Google Cloud Platform

## 🚀 Deploy in 5 Minutes

### Step 1: Install Google Cloud CLI

**Windows:**
Download and run: https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe

**Mac:**
```bash
brew install --cask google-cloud-sdk
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### Step 2: Authenticate

```bash
gcloud auth login
gcloud auth application-default login
```

### Step 3: Create Project

```bash
# Create new project
gcloud projects create YOUR-PROJECT-ID --name="Corporate Website"

# Set as active project
gcloud config set project YOUR-PROJECT-ID

# Enable billing (required - visit console)
# https://console.cloud.google.com/billing
```

### Step 4: Enable Required APIs

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Step 5: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
# Required: DATABASE_URL, SESSION_SECRET, SMTP credentials
```

### Step 6: Deploy

#### Option A: App Engine (Simpler)

```bash
# Initialize App Engine (first time only)
gcloud app create --region=us-central

# Build and deploy
npm install
npm run build
gcloud app deploy

# Open your app
gcloud app browse
```

#### Option B: Cloud Run (More Flexible)

```bash
# Deploy directly from source
gcloud run deploy corporate-website \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# Or use the deployment script
.\scripts\deploy-cloudrun.ps1      # Windows
./scripts/deploy-cloudrun.sh       # Linux/Mac
```

---

## 🔐 Set Environment Variables

### For App Engine

Add to `app.yaml` (or use Secret Manager):
```yaml
env_variables:
  DATABASE_URL: "your-database-url"
  SESSION_SECRET: "your-secret"
  SMTP_USER: "your-smtp-user"
  SMTP_PASSWORD: "your-smtp-password"
```

### For Cloud Run

```bash
gcloud run services update corporate-website \
  --set-env-vars="DATABASE_URL=your-value,SESSION_SECRET=your-value" \
  --region us-central1
```

---

## 📊 View Logs

**App Engine:**
```bash
gcloud app logs tail -s default
```

**Cloud Run:**
```bash
gcloud run services logs read corporate-website --region us-central1
```

---

## 🌐 Custom Domain (Optional)

```bash
# Verify domain ownership first
gcloud domains verify YOUR-DOMAIN.com

# Map domain (App Engine)
gcloud app domain-mappings create YOUR-DOMAIN.com

# Map domain (Cloud Run)
gcloud run domain-mappings create \
  --service=corporate-website \
  --domain=YOUR-DOMAIN.com \
  --region=us-central1
```

Then update your DNS records as instructed.

---

## ⚡ Quick Commands Reference

```bash
# Deploy
gcloud app deploy                           # App Engine
gcloud run deploy corporate-website --source .  # Cloud Run

# View logs
gcloud app logs tail -s default             # App Engine
gcloud logging read --limit 50              # All services

# Open in browser
gcloud app browse                           # App Engine
gcloud run services describe corporate-website --region us-central1

# List deployments
gcloud app versions list                    # App Engine
gcloud run services list                    # Cloud Run

# Set environment variable
gcloud run services update corporate-website \
  --set-env-vars="KEY=value" --region us-central1
```

---

## 🆘 Troubleshooting

**Error: Project not found**
```bash
gcloud config set project YOUR-PROJECT-ID
```

**Error: API not enabled**
```bash
gcloud services enable appengine.googleapis.com
```

**Error: Billing not enabled**
Visit: https://console.cloud.google.com/billing

**Error: Build failed**
```bash
npm cache clean --force
npm install
npm run build
```

---

## 📖 More Information

For detailed instructions, see:
- [GCP_DEPLOYMENT_GUIDE.md](./GCP_DEPLOYMENT_GUIDE.md) - Complete guide
- [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - Migration details
- [README.md](./README.md) - Project documentation

---

**Ready to deploy? Start with Step 1 above! 🚀**
