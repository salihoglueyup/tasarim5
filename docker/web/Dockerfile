# Base image
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++ openssl
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm ci --no-audit --no-fund

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (Needs a dummy DATABASE_URL just to generate)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx prisma generate

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1
ENV JWT_SECRET="dummy_secret_for_build"
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install OpenSSL for Prisma to work properly in Alpine
RUN apk add --no-cache openssl

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set correct permissions for nextjs user
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy necessary files
COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy prisma directory (schema and migrations)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts
# Standalone output trace @prisma/adapter-pg ve bağımlılıklarını dahil etmiyor —
# pg driver adapter olmadan Prisma DB sorguları sessizce [] döner.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/adapter-pg ./node_modules/@prisma/adapter-pg

# Prisma CLI ve config bağımlılıklarını global olarak kurup yollarını belirliyoruz (migrate/push için)
RUN npm install -g prisma@7.9.1 dotenv
ENV NODE_PATH="/usr/local/lib/node_modules"

# Non-root user kullanımı (Güvenlik)
USER nextjs

EXPOSE 3001

ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

# Başlangıçta veritabanı tablolarını senkronize edip (push) ardından sunucuyu başlatıyoruz
CMD npx prisma db push && node server.js
