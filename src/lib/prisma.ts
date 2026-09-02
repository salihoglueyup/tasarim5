import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Faz 183: Prisma Client & PG Connection Pool Optimizasyonu (Docker ortamında max: 10)
const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Maksimum 10 eşzamanlı veritabanı bağlantısı
    idleTimeoutMillis: 30000, // 30 sn boşta kalan bağlantıyı kapat
    connectionTimeoutMillis: 5000, // 5 sn içinde bağlantı kurulamazsa hata ver
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pool = pool;
}

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
