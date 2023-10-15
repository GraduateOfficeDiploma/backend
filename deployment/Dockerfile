# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle your Nest.js application source code
COPY . .

# Expose the port your application will run on
EXPOSE 3303

# Define the command to start your application
CMD [ "npm", "run", "start" ]