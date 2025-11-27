#!/bin/bash

# Deployment script for Next.js app on Digital Ocean
# Usage: ./deploy.sh

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment...${NC}"

# Configuration
APP_NAME="konradgnat"
APP_DIR="/var/www/konradgnat/nextjs"
NODE_ENV="production"

# Navigate to app directory
echo -e "${YELLOW}Navigating to app directory...${NC}"
cd "$APP_DIR"

# Pull latest changes from git
echo -e "${YELLOW}Pulling latest changes from git...${NC}"
git pull origin master

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
yarn install --frozen-lockfile

# Run Prisma migrations (if needed)
echo -e "${YELLOW}Running Prisma migrations...${NC}"
yarn prisma:generate
yarn prisma:push

# Build the application
echo -e "${YELLOW}Building Next.js application...${NC}"
yarn build

# Stop existing PM2 process if running
echo -e "${YELLOW}Stopping existing PM2 process...${NC}"
pm2 stop $APP_NAME || true

# Delete existing PM2 process
pm2 delete $APP_NAME || true

# Start application with PM2
echo -e "${YELLOW}Starting application with PM2...${NC}"
PORT=3044 pm2 start yarn --name "$APP_NAME" -- start

# Save PM2 configuration
echo -e "${YELLOW}Saving PM2 configuration...${NC}"
pm2 save

# Show PM2 status
echo -e "${YELLOW}PM2 Status:${NC}"
pm2 list

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Application is running on PM2${NC}"
echo -e "${YELLOW}Useful commands:${NC}"
echo -e "  pm2 logs $APP_NAME       - View logs"
echo -e "  pm2 restart $APP_NAME    - Restart app"
echo -e "  pm2 stop $APP_NAME       - Stop app"
echo -e "  pm2 monit                - Monitor app"
