# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container (for back-end main.ts container)
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY ../package*.json ../

# Install only required packages
RUN npm ci --only=prod

# Bundle your Nest.js application source code
COPY . .

# Expose the port your application will run on
EXPOSE 3303

# Define the command to start your application
CMD [ "npm", "run", "start" ]