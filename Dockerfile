# Stage 1: Build React app
FROM node:22.18.0 AS builder
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default content
RUN rm -rf ./*

# Copy build from builder to /Financial-Instruments path
COPY --from=builder /app/build ./Financial-Instruments

# Expose port 80 in container (we'll map it to 4141 on host)
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
