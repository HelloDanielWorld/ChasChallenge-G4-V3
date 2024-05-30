# Stage 1: Build the frontend application
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining frontend source code to the container
COPY . .

# Build the frontend application
RUN npm run build

# Stage 2: Serve the built frontend files using a lightweight HTTP server
FROM node:20-alpine AS final

# Set the working directory in the container
WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy the built frontend files from the previous stage to the container
COPY --from=build /app/dist /app/dist

# Expose port 80 to the outside world
EXPOSE 80

# Command to start the HTTP server when the container starts
CMD ["http-server", "/app/dist", "-p", "80"]

