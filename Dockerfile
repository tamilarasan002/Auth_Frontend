# Use the UBI image as the base image
FROM registry.access.redhat.com/ubi8/nodejs-14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install axios

# Copy all files from the current directory to the working directory in the container
COPY . .

# Build the React.js project
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set the command to start the React.js application
CMD ["npm", "start"]
