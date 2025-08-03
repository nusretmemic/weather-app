# Dockerfile for Node.js application with multi-stage build
FROM node:18-alpine AS builder

# Install build dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy the rest of the source and compile
COPY . .
RUN npm run build

# Stage 2 — runtime
FROM node:18-alpine

WORKDIR /app

# Only install production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled output
COPY --from=builder /app/dist ./dist

# Copy API spec so swagger-ui-express can load it
COPY openapi.yaml ./

# Default environment variables
ENV NODE_ENV=production \
    PORT=5000

# Expose the port the app listens on
EXPOSE 5000

# Start the server
CMD ["node", "dist/app.js"]