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

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy React build to /usr/share/nginx/html/Financial-Instruments
COPY --from=builder /app/build /usr/share/nginx/html/Financial-Instruments

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose container port 80 (map to host 4141 in docker run)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
