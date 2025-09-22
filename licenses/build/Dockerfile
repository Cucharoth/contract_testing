###############################
# Builder stage
###############################
FROM node:22-alpine AS builder
WORKDIR /app

# 1. Install all dependencies (including dev)
COPY package*.json ./
RUN npm ci

# 2. Copy only what we need first (prisma + ts sources) to leverage caching
COPY prisma ./prisma
RUN npx prisma generate

# 3. Copy the rest of the source code
COPY . .

# 4. Build the NestJS application
RUN npm run build

# 5. Prune dev dependencies while keeping the generated Prisma client
RUN npm prune --omit=dev

###############################
# Production stage
###############################
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy the pruned node_modules with the already generated Prisma client
COPY --from=builder /app/node_modules ./node_modules

# Copy build output and (optionally) schema for observability / migrations
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose default Nest port (optional; docker-compose maps it anyway)
EXPOSE 3000

CMD ["node", "dist/src/main.js"]
