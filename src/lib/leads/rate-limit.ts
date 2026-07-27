/**
 * Basit bellek-içi IP rate-limit (Track 1).
 * Serverless'te örnek başına ayrı bellek olduğundan kesin değildir; temel
 * kötüye kullanımı önler. Kalıcı/dağıtık limit gerekiyorsa Upstash Redis
 * (env-gated) ile değiştirilebilir. Sabit pencere sayacı.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 dakika
const MAX_HITS = 5; // pencere başına ip başına

export function rateLimit(ip: string, now: number = Date.now()): boolean {
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_HITS) return false;
  bucket.count += 1;
  return true;
}

/** Süresi dolmuş kovaları temizle (bellek sızıntısını önlemek için ara sıra çağrılır). */
export function pruneBuckets(now: number = Date.now()): void {
  for (const [ip, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(ip);
  }
}
