#!/bin/bash

# Deploy to Google Cloud Run
# This script builds a Docker container and deploys to Cloud Run

set -e  # Exit on error

echo "🚀 Starting Google Cloud Run deployment..."

# Configuration
PROJECT_ID=${GOOGLE_CLOUD_PROJECT:-$(gcloud config get-value project)}
SERVICE_NAME=${SERVICE_NAME:-"corporate-website"}
REGION=${REGION:-"us-central1"}
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "Please install it from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Authenticate with Google Cloud
echo "🔐 Configuring Docker authentication..."
gcloud auth configure-docker

# Build the Docker image
echo "🐳 Building Docker image..."
docker build -t ${IMAGE_NAME}:latest .

# Push the image to Google Container Registry
echo "📤 Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}:latest

# Deploy to Cloud Run
echo "☁️  Deploying to Google Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 1 \
  --max-instances 10 \
  --port 8080

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')

echo "✅ Deployment complete!"
echo "🌐 Your application is now live at: ${SERVICE_URL}"
echo ""
echo "Useful commands:"
echo "  View logs:        gcloud logging read \"resource.type=cloud_run_revision AND resource.labels.service_name=${SERVICE_NAME}\" --limit 50"
echo "  View services:    gcloud run services list"
echo "  Describe service: gcloud run services describe ${SERVICE_NAME} --region ${REGION}"
