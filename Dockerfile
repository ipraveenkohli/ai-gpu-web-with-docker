# Use a lightweight Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json file first to leverage build cache for dependencies
COPY package.json .

# Install application dependencies
RUN yarn install --production

# Copy the rest of the application source code
COPY . .

# Set the default command to start the application
CMD ["node", "./src/index.js"]
