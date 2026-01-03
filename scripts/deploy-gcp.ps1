# Deploy to Google Cloud Platform - App Engine
# This script builds and deploys the application to Google App Engine

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Google Cloud Platform deployment..." -ForegroundColor Cyan

# Check if gcloud CLI is installed
$gcloudPath = Get-Command gcloud -ErrorAction SilentlyContinue
if (-not $gcloudPath) {
    Write-Host "❌ Error: gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Check if user is authenticated
try {
    $account = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>&1
    if (-not $account) {
        throw "Not authenticated"
    }
} catch {
    Write-Host "❌ Error: Not authenticated with Google Cloud" -ForegroundColor Red
    Write-Host "Run: gcloud auth login"
    exit 1
}

# Build the application
Write-Host "📦 Building application..." -ForegroundColor Yellow
npm run build

# Deploy to App Engine
Write-Host "☁️  Deploying to Google App Engine..." -ForegroundColor Yellow
gcloud app deploy --quiet

# Get the deployed URL
$appUrl = gcloud app browse --no-launch-browser 2>&1 | Select-String -Pattern 'https://[^\s]*' | ForEach-Object { $_.Matches.Value }

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your application is now live at: $appUrl" -ForegroundColor Green
Write-Host ""
Write-Host "Useful commands:"
Write-Host "  View logs:        gcloud app logs tail -s default"
Write-Host "  Open in browser:  gcloud app browse"
Write-Host "  View versions:    gcloud app versions list"
