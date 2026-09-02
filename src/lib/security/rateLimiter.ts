import { redis } from '@/lib/redis';

export interface RateLimitOptions {
  limit?: number; // Maksimum istek sayısı (varsayılan: 60)
  windowSeconds?: number; // Zaman penceresi saniye (varsayılan: 60)
  prefix?: string; // Redis anahtar öneki
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix epoch saniye
}

// Redis kapalıysa ya da hata verirse kullanılacak bellek-içi yedek havuz (in-memory fallback)
const inMemoryStore = new Map<string, number[]>();

function inMemoryRateLimit(key: string, limit: number, windowSeconds: number, now: number): RateLimitResult {
  const windowMs = windowSeconds * 1000;
  const windowStart = now - windowMs;

  const timestamps = (inMemoryStore.get(key) || []).filter((t) => t > windowStart);

  if (timestamps.length >= limit) {
    const oldest = timestamps[0] || now;
    const reset = Math.ceil((oldest + windowMs) / 1000);
    return {
      success: false,
      limit,
      remaining: 0,
      reset,
    };
  }

  timestamps.push(now);
  inMemoryStore.set(key, timestamps);

  // Bellek temizliği (1000'den fazla anahtar olursa süresi geçenleri temizle)
  if (inMemoryStore.size > 1000) {
    for (const [k, ts] of inMemoryStore) {
      const valid = ts.filter((t) => t > windowStart);
      if (valid.length === 0) inMemoryStore.delete(k);
      else inMemoryStore.set(k, valid);
    }
  }

  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - timestamps.length),
    reset: Math.ceil((now + windowMs) / 1000),
  };
}

/**
 * Faz 176: Redis Tabanlı Kayan Pencereli (Sliding-Window) Rate Limiter
 * Dakikada 60 istek sınırı (veya özelleştirilebilir).
 */
export async function rateLimitSlidingWindow(
  identifier: string,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const { limit = 60, windowSeconds = 60, prefix = 'rl' } = options;
  const now = Date.now();
  const key = `${prefix}:${identifier}`;

  try {
    // Redis bağlantı durumunu kontrol et
    if (redis && redis.status === 'ready') {
      const windowMs = windowSeconds * 1000;
      const windowStart = now - windowMs;
      const member = `${now}-${Math.random().toString(36).substring(2, 7)}`;

      // Redis pipeline: eski kayıtları temizle, yeniyi ekle, toplamı say, TTL ver
      const results = await redis
        .pipeline()
        .zremrangebyscore(key, 0, windowStart)
        .zadd(key, now, member)
        .zcard(key)
        .expire(key, windowSeconds + 5)
        .exec();

      if (results && results[2] && typeof results[2][1] === 'number') {
        const count = results[2][1] as number;
        const remaining = Math.max(0, limit - count);
        const reset = Math.ceil((now + windowMs) / 1000);

        return {
          success: count <= limit,
          limit,
          remaining,
          reset,
        };
      }
    }
  } catch (err) {
    // Redis hatasında sessizce in-memory fallback'e geç (Graceful degradation)
    console.warn('Redis rate limit uyarısı (in-memory fallback devrede):', err instanceof Error ? err.message : err);
  }

  return inMemoryRateLimit(key, limit, windowSeconds, now);
}

/**
 * Next.js Route Handler / Middleware için yardımcı fonksiyon
 */
export async function applyApiRateLimit(
  ip: string,
  endpoint: string = 'api',
  limit: number = 60,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  const identifier = `${endpoint}:${ip}`;
  return rateLimitSlidingWindow(identifier, { limit, windowSeconds });
}
