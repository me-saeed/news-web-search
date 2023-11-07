# Use an official Node.js runtime as the base image
FROM node:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install project dependencies
RUN npm install --silent

# Copy the rest of your application code to the working directory
COPY . .

# Build your React app
RUN npm run build

# Expose a port (usually 80) to the outside world
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "start"]
