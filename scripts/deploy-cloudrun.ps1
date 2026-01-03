# Deploy to Google Cloud Run
# This script builds a Docker container and deploys to Cloud Run

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Google Cloud Run deployment..." -ForegroundColor Cyan

# Configuration
$PROJECT_ID = if ($env:GOOGLE_CLOUD_PROJECT) { $env:GOOGLE_CLOUD_PROJECT } else { gcloud config get-value project }
$SERVICE_NAME = if ($env:SERVICE_NAME) { $env:SERVICE_NAME } else { "corporate-website" }
$REGION = if ($env:REGION) { $env:REGION } else { "us-central1" }
$IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME"

# Check if gcloud CLI is installed
$gcloudPath = Get-Command gcloud -ErrorAction SilentlyContinue
if (-not $gcloudPath) {
    Write-Host "❌ Error: gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Check if Docker is installed
$dockerPath = Get-Command docker -ErrorAction SilentlyContinue
if (-not $dockerPath) {
    Write-Host "❌ Error: Docker is not installed" -ForegroundColor Red
    Write-Host "Please install it from: https://docs.docker.com/get-docker/"
    exit 1
}

# Authenticate with Google Cloud
Write-Host "🔐 Configuring Docker authentication..." -ForegroundColor Yellow
gcloud auth configure-docker

# Build the Docker image
Write-Host "🐳 Building Docker image..." -ForegroundColor Yellow
docker build -t "${IMAGE_NAME}:latest" .

# Push the image to Google Container Registry
Write-Host "📤 Pushing image to Google Container Registry..." -ForegroundColor Yellow
docker push "${IMAGE_NAME}:latest"

# Deploy to Cloud Run
Write-Host "☁️  Deploying to Google Cloud Run..." -ForegroundColor Yellow
gcloud run deploy $SERVICE_NAME `
  --image "${IMAGE_NAME}:latest" `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --memory 1Gi `
  --cpu 1 `
  --min-instances 1 `
  --max-instances 10 `
  --port 8080

# Get the service URL
$SERVICE_URL = gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)'

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your application is now live at: $SERVICE_URL" -ForegroundColor Green
Write-Host ""
Write-Host "Useful commands:"
Write-Host "  View logs:        gcloud logging read `"resource.type=cloud_run_revision AND resource.labels.service_name=$SERVICE_NAME`" --limit 50"
Write-Host "  View services:    gcloud run services list"
Write-Host "  Describe service: gcloud run services describe $SERVICE_NAME --region $REGION"
