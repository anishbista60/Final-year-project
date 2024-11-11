# Build stage
FROM node:19-alpine AS builder

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .

# Production stage
FROM node:19-alpine

WORKDIR /home/node/app
COPY --from=builder /home/node/app .

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "run", "dev"]

