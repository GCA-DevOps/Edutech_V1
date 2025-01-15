# Stage 1: Build the Angular application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm config set legacy-peer-deps true
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/dist/edutech /usr/share/nginx/html

# Copy nginx configuration if you have any custom config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server (only one CMD instruction)
CMD ["nginx", "-g", "daemon off;"]
