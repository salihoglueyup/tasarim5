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

export default redis;
