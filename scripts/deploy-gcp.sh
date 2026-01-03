#!/bin/bash

# Deploy to Google Cloud Platform - App Engine
# This script builds and deploys the application to Google App Engine

set -e  # Exit on error

echo "🚀 Starting Google Cloud Platform deployment..."

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo "❌ Error: Not authenticated with Google Cloud"
    echo "Run: gcloud auth login"
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to App Engine
echo "☁️  Deploying to Google App Engine..."
gcloud app deploy --quiet

# Get the deployed URL
APP_URL=$(gcloud app browse --no-launch-browser 2>&1 | grep -o 'https://[^ ]*')

echo "✅ Deployment complete!"
echo "🌐 Your application is now live at: $APP_URL"
echo ""
echo "Useful commands:"
echo "  View logs:        gcloud app logs tail -s default"
echo "  Open in browser:  gcloud app browse"
echo "  View versions:    gcloud app versions list"
