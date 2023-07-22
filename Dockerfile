# Use the official Node.js image as the base image
FROM node:14.17-alpine

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

EXPOSE 3000

# Set the environment variable to specify the port your React.js app is listening on (optional)
ENV REACT_APP_BACKEND_URL=http://backend-service.authen.svc.cluster.local:4000

# Set the command to start the React.js application
CMD ["npm", "start"]


