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
  BLOG: 60 * 60 * 24, // 24 saat (Faz 15: Blog içerikleri ve kategori önbelleği)
  WEEKLY: 60 * 60 * 24 * 7, // 7 gün (sitemap, şema ve statik yapılar)
} as const;

// Faz 184: Redis Bağlantı Hatalarında Korumalı Fallback (Graceful Degradation)
export function isRedisAvailable(): boolean {
  try {
    return Boolean(redis && redis.status === 'ready');
  } catch {
    return false;
  }
}

export async function safeRedisGet<T>(key: string): Promise<T | null> {
  if (!isRedisAvailable()) return null;
  try {
    const raw = await redis.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Redis GET hatası (${key}):`, err instanceof Error ? err.message : err);
    return null;
  }
}

export async function safeRedisSet(
  key: string,
  value: unknown,
  ttlSeconds: number = CACHE_TTL.HOURLY
): Promise<boolean> {
  if (!isRedisAvailable()) return false;
  try {
    const serialized = JSON.stringify(value);
    await redis.set(key, serialized, 'EX', ttlSeconds);
    return true;
  } catch (err) {
    console.warn(`Redis SET hatası (${key}):`, err instanceof Error ? err.message : err);
    return false;
  }
}

export async function safeRedisDel(keys: string | string[]): Promise<boolean> {
  if (!isRedisAvailable()) return false;
  try {
    const keyList = Array.isArray(keys) ? keys : [keys];
    if (keyList.length > 0) {
      await redis.del(...keyList);
    }
    return true;
  } catch (err) {
    console.warn(`Redis DEL hatası:`, err instanceof Error ? err.message : err);
    return false;
  }
}

/**
 * Önbellek varsa Redis'ten getirir; yoksa veya Redis kapalıysa
 * doğrudan fallback fonksiyonunu çalıştırıp veriyi döner.
 */
export async function safeRedisRemember<T>(
  key: string,
  ttlSeconds: number,
  fallback: () => Promise<T>
): Promise<T> {
  const cached = await safeRedisGet<T>(key);
  if (cached !== null && cached !== undefined) {
    return cached;
  }

  const fresh = await fallback();
  // Arka planda sessizce önbelleğe yazmayı dene
  safeRedisSet(key, fresh, ttlSeconds).catch(() => {});
  return fresh;
}

export default redis;
