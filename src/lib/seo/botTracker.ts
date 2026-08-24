import redis from '@/lib/redis';

export interface BotVisitLog {
  botName: string;
  botType: 'search_engine' | 'ai_crawler' | 'social_media' | 'other';
  path: string;
  timestamp: string;
  ip?: string;
}

export interface BotTelemetrySummary {
  totalBotHits24h: number;
  botHitsByType: Record<string, number>;
  topCrawledPaths: { path: string; hits: number }[];
  recentVisits: BotVisitLog[];
  isRedisActive: boolean;
}

const KNOWN_BOTS: { pattern: RegExp; name: string; type: BotVisitLog['botType'] }[] = [
  // Google
  { pattern: /Googlebot/i, name: 'Googlebot', type: 'search_engine' },
  { pattern: /Google-Extended/i, name: 'Google-Extended (Gemini)', type: 'ai_crawler' },
  { pattern: /Google-InspectionTool/i, name: 'Google Inspection', type: 'search_engine' },
  { pattern: /Mediapartners-Google/i, name: 'Google AdSense Bot', type: 'search_engine' },

  // OpenAI / ChatGPT
  { pattern: /GPTBot/i, name: 'GPTBot (OpenAI)', type: 'ai_crawler' },
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot (ChatGPT Search)', type: 'ai_crawler' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT User', type: 'ai_crawler' },

  // Perplexity
  { pattern: /PerplexityBot/i, name: 'PerplexityBot', type: 'ai_crawler' },
  { pattern: /Perplexity-User/i, name: 'Perplexity User', type: 'ai_crawler' },

  // Anthropic / Claude
  { pattern: /ClaudeBot/i, name: 'ClaudeBot (Anthropic)', type: 'ai_crawler' },
  { pattern: /Claude-Web/i, name: 'Claude Web', type: 'ai_crawler' },
  { pattern: /anthropic-ai/i, name: 'Anthropic AI', type: 'ai_crawler' },

  // Bing / Microsoft
  { pattern: /bingbot/i, name: 'Bingbot', type: 'search_engine' },
  { pattern: /BingPreview/i, name: 'BingPreview', type: 'search_engine' },

  // Yandex
  { pattern: /YandexBot/i, name: 'YandexBot', type: 'search_engine' },
  { pattern: /YandexImages/i, name: 'YandexImages', type: 'search_engine' },

  // Apple
  { pattern: /Applebot-Extended/i, name: 'Applebot-Extended (Apple Intelligence)', type: 'ai_crawler' },
  { pattern: /Applebot/i, name: 'Applebot', type: 'search_engine' },

  // Diğer Arama ve Sosyal Medya Botları
  { pattern: /DuckDuckBot/i, name: 'DuckDuckBot', type: 'search_engine' },
  { pattern: /Baiduspider/i, name: 'Baiduspider', type: 'search_engine' },
  { pattern: /facebookexternalhit/i, name: 'FacebookBot', type: 'social_media' },
  { pattern: /Twitterbot/i, name: 'Twitterbot', type: 'social_media' },
  { pattern: /LinkedInBot/i, name: 'LinkedInBot', type: 'social_media' },
  { pattern: /CCBot/i, name: 'Common Crawl Bot', type: 'ai_crawler' },
];

/**
 * Gelen User-Agent başlığından bot tespiti yapar.
 */
export function detectBot(userAgent: string | null): { name: string; type: BotVisitLog['botType'] } | null {
  if (!userAgent) return null;
  for (const bot of KNOWN_BOTS) {
    if (bot.pattern.test(userAgent)) {
      return { name: bot.name, type: bot.type };
    }
  }
  return null;
}

// Bellek içi yedek sayaç (Redis erişilemezse)
const inMemoryRecentLogs: BotVisitLog[] = [];
const inMemoryCounts: Record<string, number> = {};

/**
 * Bot isteklerini asenkron ve non-blocking olarak Redis'e kaydeder.
 */
export async function trackBotVisit(userAgent: string | null, path: string, ip?: string): Promise<void> {
  const detected = detectBot(userAgent);
  if (!detected) return;

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const visitLog: BotVisitLog = {
    botName: detected.name,
    botType: detected.type,
    path,
    timestamp: now.toISOString(),
    ip: ip ? `${ip.substring(0, 7)}***` : undefined,
  };

  // Bellek içi kayıt
  inMemoryRecentLogs.unshift(visitLog);
  if (inMemoryRecentLogs.length > 50) inMemoryRecentLogs.pop();
  inMemoryCounts[detected.name] = (inMemoryCounts[detected.name] || 0) + 1;

  if (!redis) return;

  try {
    const pipeline = redis.pipeline();
    // 1. Günlük bot sayacı
    pipeline.incr(`telemetry:bot:daily:${dateStr}:${detected.name}`);
    pipeline.expire(`telemetry:bot:daily:${dateStr}:${detected.name}`, 86400 * 7); // 7 gün sakla

    // 2. Toplam bot sayacı
    pipeline.incr(`telemetry:bot:total:${detected.name}`);

    // 3. Ziyaret edilen sayfa sayacı
    pipeline.zincrby(`telemetry:bot:paths:${dateStr}`, 1, path);
    pipeline.expire(`telemetry:bot:paths:${dateStr}`, 86400 * 7);

    // 4. Son 100 bot ziyareti kuyruğu
    pipeline.lpush('telemetry:bot:recent', JSON.stringify(visitLog));
    pipeline.ltrim('telemetry:bot:recent', 0, 99);
    pipeline.expire('telemetry:bot:recent', 86400 * 3);

    await pipeline.exec();
  } catch (err) {
    // Redis hatası loglamayı engellememeli
    console.warn('Bot telemetry Redis error (non-fatal):', err);
  }
}

/**
 * Bot telemetri özet raporunu getirir.
 */
export async function getBotTelemetrySummary(): Promise<BotTelemetrySummary> {
  const isRedisActive = !!redis;
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  if (!redis) {
    return {
      totalBotHits24h: Object.values(inMemoryCounts).reduce((a, b) => a + b, 0),
      botHitsByType: inMemoryCounts,
      topCrawledPaths: [],
      recentVisits: inMemoryRecentLogs,
      isRedisActive: false,
    };
  }

  try {
    const [recentRaw, topPathsRaw] = await Promise.all([
      redis.lrange('telemetry:bot:recent', 0, 49),
      redis.zrevrange(`telemetry:bot:paths:${dateStr}`, 0, 9, 'WITHSCORES'),
    ]);

    const recentVisits: BotVisitLog[] = recentRaw.map((r) => {
      try {
        return JSON.parse(r);
      } catch {
        return null;
      }
    }).filter(Boolean);

    const topCrawledPaths: { path: string; hits: number }[] = [];
    if (topPathsRaw && topPathsRaw.length > 0) {
      for (let i = 0; i < topPathsRaw.length; i += 2) {
        topCrawledPaths.push({
          path: topPathsRaw[i],
          hits: parseInt(topPathsRaw[i + 1] || '0', 10),
        });
      }
    }

    // Bot sayılarını hesapla
    const botHitsByType: Record<string, number> = {};
    for (const bot of KNOWN_BOTS) {
      const countStr = await redis.get(`telemetry:bot:daily:${dateStr}:${bot.name}`);
      const count = countStr ? parseInt(countStr, 10) : 0;
      if (count > 0) {
        botHitsByType[bot.name] = count;
      }
    }

    const totalBotHits24h = Object.values(botHitsByType).reduce((a, b) => a + b, 0);

    return {
      totalBotHits24h: totalBotHits24h || inMemoryRecentLogs.length,
      botHitsByType: Object.keys(botHitsByType).length > 0 ? botHitsByType : inMemoryCounts,
      topCrawledPaths,
      recentVisits: recentVisits.length > 0 ? recentVisits : inMemoryRecentLogs,
      isRedisActive: true,
    };
  } catch (err) {
    console.warn('Error fetching bot telemetry summary:', err);
    return {
      totalBotHits24h: inMemoryRecentLogs.length,
      botHitsByType: inMemoryCounts,
      topCrawledPaths: [],
      recentVisits: inMemoryRecentLogs,
      isRedisActive: false,
    };
  }
}
