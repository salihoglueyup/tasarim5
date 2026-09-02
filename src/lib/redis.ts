import { Redis } from 'ioredis';

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  return 'redis://localhost:6379';
};

const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ||
  new Redis(getRedisUrl(), {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        return null; // Stop retrying after 3 times to prevent app hang if Redis is down
      }
      return Math.min(times * 200, 1000);
    }
  });

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

// Build aşamasında Redis ayakta olmadığında uygulamanın çökmesini engelle
redis.on('error', (err) => {
  console.warn('Redis bağlantı uyarısı (Önbellek atlanıyor):', err.message);
});

// Faz 60: Standartlaştırılmış Önbellek Süreleri (TTL Politikası)
export const CACHE_TTL = {
  SHORT_TERM: 60 * 5, // 5 dakika (dinamik/hızlı değişen veriler)
  HOURLY: 60 * 60, // 1 saat (sık sorgulanan API verileri)
  DAILY: 60 * 60 * 24, // 24 saat (ilçe, hizmet, hesaplayıcı verileri)
  WEEKLY: 60 * 60 * 24 * 7, // 7 gün (sitemap, şema ve statik yapılar)
} as const;

export default redis;
