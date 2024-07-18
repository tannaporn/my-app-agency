# Stage 1: Build
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of thdockere application files
COPY . .

# Generate Prisma client and build the application
RUN npm run build

# Stage 2: Run
FROM node:20-alpine as run

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the build files from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Copy .env file to the container
COPY .env .env

# Copy .env file to the container
COPY .env.local .env.local

# Set environment variable
ENV NODE_ENV production

# Expose the port (optional)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
