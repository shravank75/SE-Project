# Use an official Node.js runtime as the base image
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

# Start the production server (not dev)
CMD ["npm", "start"]
