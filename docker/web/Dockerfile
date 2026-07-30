# Base image
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (Needs to be done here so the client matches the schema)
ENV DATABASE_URL="file:/app/data/production.db"
RUN mkdir -p /app/data
RUN npx prisma generate
RUN npx prisma db push --accept-data-loss

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set correct permissions for nextjs user and don't run as root
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy necessary files
COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy prisma directory (schema and migrations)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Also copy sqlite bindings (better-sqlite3) from builder
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# USER nextjs (SQLite volume izinleri (CANTOPEN) sorunu yaşamamak için root olarak çalıştırıyoruz)

EXPOSE 3001

ENV PORT 3001
ENV HOSTNAME "0.0.0.0"
# Veritabanı URL'sini container içindeki volume'a yönlendiriyoruz
ENV DATABASE_URL="file:/app/data/production.db"

# Başlangıçta veritabanı tablolarını senkronize edip (push) ardından sunucuyu başlatıyoruz
CMD node node_modules/prisma/build/index.js db push --accept-data-loss && node server.js
