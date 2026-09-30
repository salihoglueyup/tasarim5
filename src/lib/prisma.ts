import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Docker Compose, environment: bloğundaki ${POSTGRES_PASSWORD} gibi referansları kendi
// başlatırken çözer; ama .env dosyası host'ta doğrudan dotenv ile (örn. scripts/*.ts) okunduğunda
// bu referanslar çözülmeden literal metin olarak kalır. Burada zararsız bir şekilde genişletiyoruz —
// DATABASE_URL zaten çözülmüşse (Next.js/Docker runtime'ı) hiçbir şey değişmez.
function expandEnvRefs(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/g, (_, name) => process.env[name] ?? '');
}

// Faz 183: Prisma Client & PG Connection Pool Optimizasyonu (Docker ortamında max: 10)
const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: expandEnvRefs(process.env.DATABASE_URL),
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
