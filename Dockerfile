# Use the official Node.js image as the base image
FROM node:14.17.6-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the web server to serve the built React app
FROM nginx:1.21.1-alpine

# Remove the default Nginx configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy the built React app from the previous stage
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 for the React app
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
