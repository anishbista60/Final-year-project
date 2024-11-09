# Use the official Node.js image
FROM node:19-slim

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Run Prisma migrations
RUN npx prisma migrate dev --skip-seed

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]

