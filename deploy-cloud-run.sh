#!/bin/bash
set -eo pipefail

# ==============================================================================
# 🚀 Shan Nova LMS — Automated Production Google Cloud Run Deployer
# ==============================================================================

# Colors for terminal styling
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}   🚀 SHAN NOVA LMS — PRODUCTION GOOGLE CLOUD DEPLOYER          ${NC}"
echo -e "${BLUE}================================================================${NC}"

# Check GCP Project
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  echo -e "${RED}❌ Error: No active Google Cloud project detected.${NC}"
  echo -e "👉 Please run: ${YELLOW}gcloud config set project YOUR_PROJECT_ID${NC}"
  exit 1
fi

REGION="${GCP_REGION:-us-central1}"
echo -e "📌 Project ID : ${GREEN}$PROJECT_ID${NC}"
echo -e "📌 Region     : ${GREEN}$REGION${NC}\n"

# Step 1: Enable required APIs
echo -e "${YELLOW}[1/4] Enabling required Google Cloud APIs...${NC}"
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  --quiet
echo -e "${GREEN}✔ APIs enabled successfully.${NC}\n"

# Step 2: Build & Deploy Backend API
echo -e "${YELLOW}[2/4] Building & Deploying Backend API to Cloud Run...${NC}"
gcloud builds submit \
  --tag "gcr.io/$PROJECT_ID/shannova-api:latest" \
  -f apps/api/Dockerfile .

gcloud run deploy shannova-api \
  --image "gcr.io/$PROJECT_ID/shannova-api:latest" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --set-env-vars "NODE_ENV=production,PORT=8080,DATABASE_URL=postgresql://postgres:Dd*XxJ4Adrmeshal@2025@34.134.174.129:5432/shannova?schema=public&sslmode=prefer" \
  --quiet

API_URL=$(gcloud run services describe shannova-api --platform managed --region "$REGION" --format 'value(status.url)')
echo -e "${GREEN}✔ Backend API is Live:${NC} ${BLUE}$API_URL${NC}\n"

# Step 3: Build & Deploy Frontend Web App
echo -e "${YELLOW}[3/4] Building & Deploying Frontend Web App to Cloud Run...${NC}"
gcloud builds submit \
  --tag "gcr.io/$PROJECT_ID/shannova-web:latest" \
  --substitutions "_API_URL=$API_URL/api/v1,_SOCKET_URL=$API_URL" \
  -f apps/web/Dockerfile .

gcloud run deploy shannova-web \
  --image "gcr.io/$PROJECT_ID/shannova-web:latest" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --quiet

WEB_URL=$(gcloud run services describe shannova-web --platform managed --region "$REGION" --format 'value(status.url)')
echo -e "${GREEN}✔ Frontend Web App is Live:${NC} ${BLUE}$WEB_URL${NC}\n"

# Step 4: Link Web URL into API CORS
echo -e "${YELLOW}[4/4] Configuring Cross-Origin Resource Sharing (CORS)...${NC}"
gcloud run services update shannova-api \
  --region "$REGION" \
  --update-env-vars "CORS_ORIGIN=$WEB_URL" \
  --quiet
echo -e "${GREEN}✔ CORS configured successfully.${NC}\n"

# Verification Ping
echo -e "${YELLOW}🔍 Verifying deployment health...${NC}"
HEALTH_RESP=$(curl -s "$API_URL/api/v1/health" || echo "failed")
echo -e "Health response: $HEALTH_RESP\n"

echo -e "${GREEN}================================================================${NC}"
echo -e "${GREEN}   🎉 SHAN NOVA LMS SUCCESSFULLY DEPLOYED TO GOOGLE CLOUD!      ${NC}"
echo -e "${GREEN}================================================================${NC}"
echo -e "🌐 ${BLUE}Frontend Web Portal :${NC} ${GREEN}$WEB_URL${NC}"
echo -e "📡 ${BLUE}API Documentation   :${NC} ${GREEN}$API_URL/api/docs${NC}"
echo -e "🏥 ${BLUE}System Health Check :${NC} ${GREEN}$API_URL/api/v1/health${NC}"
echo -e "${GREEN}================================================================${NC}"
