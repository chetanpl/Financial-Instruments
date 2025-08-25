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

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy build from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose container port 80 (map to 4141 on host)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
