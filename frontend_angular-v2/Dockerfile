# Stage 1: Build the Angular application
FROM node:18 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm config set legacy-peer-deps true
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application with production configuration
RUN npm run build -- --configuration=production

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/dist/edutech /usr/share/nginx/html

# Make sure the environment file is copied
COPY --from=build /app/src/assets/env.js /usr/share/nginx/html/assets/

# Add Nginx configuration for handling Angular routes
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Add bash for script support
RUN apk add --no-cache bash

# Add permissions for nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
