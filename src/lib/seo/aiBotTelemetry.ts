export interface AiCrawlerHit {
  id: string;
  botName: string;
  botFamily: 'OpenAI' | 'Anthropic' | 'Perplexity' | 'Google' | 'Apple' | 'DeepSeek' | 'OtherAI';
  pathname: string;
  userAgent: string;
  ip: string;
  statusCode: number;
  timestamp: string;
}

export interface AiCrawlerStats {
  totalAiHits: number;
  uniqueBotsCount: number;
  aiVisibilityScore: number; // 0 - 100
  topCrawledPaths: Array<{ path: string; hits: number }>;
  familyBreakdown: Record<string, number>;
  recentHitsSample: AiCrawlerHit[];
}

const AI_BOT_SIGNATURES: Array<{ pattern: RegExp; name: string; family: AiCrawlerHit['botFamily'] }> = [
  { pattern: /gptbot/i, name: 'GPTBot', family: 'OpenAI' },
  { pattern: /chatgpt-user/i, name: 'ChatGPT-User', family: 'OpenAI' },
  { pattern: /oai-searchbot/i, name: 'OAI-SearchBot', family: 'OpenAI' },
  { pattern: /perplexitybot/i, name: 'PerplexityBot', family: 'Perplexity' },
  { pattern: /claudebot|claude-web/i, name: 'ClaudeBot', family: 'Anthropic' },
  { pattern: /anthropic-ai/i, name: 'Anthropic-AI', family: 'Anthropic' },
  { pattern: /google-extended/i, name: 'Google-Extended', family: 'Google' },
  { pattern: /applebot-extended/i, name: 'Applebot-Extended', family: 'Apple' },
  { pattern: /deepseek/i, name: 'DeepSeekBot', family: 'DeepSeek' },
  { pattern: /bytespider/i, name: 'ByteSpider', family: 'OtherAI' },
  { pattern: /cohere-ai/i, name: 'Cohere-AI', family: 'OtherAI' },
  { pattern: /ccbot/i, name: 'CCBot (CommonCrawl)', family: 'OtherAI' },
  { pattern: /meta-externalagent/i, name: 'Meta-ExternalAgent', family: 'OtherAI' },
];

// Bellek içi dairesel tampon (Ring Buffer)
const MAX_LOGS = 500;
const aiHitBuffer: AiCrawlerHit[] = [];

/**
 * Gelen User-Agent'ı inceleyerek AI arama botu olup olmadığını tespit eder ve kaydeder.
 */
export function detectAndLogAiCrawler(
  userAgent: string = '',
  pathname: string = '/',
  ip: string = 'unknown',
  statusCode: number = 200
): { isAiBot: boolean; botName?: string; botFamily?: AiCrawlerHit['botFamily'] } {
  if (!userAgent) return { isAiBot: false };

  for (const sig of AI_BOT_SIGNATURES) {
    if (sig.pattern.test(userAgent)) {
      const hit: AiCrawlerHit = {
        id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        botName: sig.name,
        botFamily: sig.family,
        pathname,
        userAgent,
        ip,
        statusCode,
        timestamp: new Date().toISOString(),
      };

      aiHitBuffer.unshift(hit);
      if (aiHitBuffer.length > MAX_LOGS) {
        aiHitBuffer.pop();
      }

      return { isAiBot: true, botName: sig.name, botFamily: sig.family };
    }
  }

  return { isAiBot: false };
}

/**
 * Toplu AI tarama istatistiklerini ve Görünürlük Skorunu hesaplar.
 */
export function getAiCrawlerAnalytics(): AiCrawlerStats {
  const totalAiHits = aiHitBuffer.length;
  const familyBreakdown: Record<string, number> = {};
  const pathCounts: Record<string, number> = {};
  const uniqueBots = new Set<string>();

  for (const hit of aiHitBuffer) {
    familyBreakdown[hit.botFamily] = (familyBreakdown[hit.botFamily] || 0) + 1;
    pathCounts[hit.pathname] = (pathCounts[hit.pathname] || 0) + 1;
    uniqueBots.add(hit.botName);
  }

  const topCrawledPaths = Object.entries(pathCounts)
    .map(([path, hits]) => ({ path, hits }))
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 10);

  // AI Görünürlük Skoru: Çeşitlilik ve RAG/İlçe sayfalarına olan ilgiye göre hesaplanır
  const familyCount = Object.keys(familyBreakdown).length;
  const baseScore = Math.min(60, totalAiHits * 2);
  const diversityBonus = familyCount * 8;
  const aiVisibilityScore = Math.min(100, Math.max(10, baseScore + diversityBonus));

  return {
    totalAiHits,
    uniqueBotsCount: uniqueBots.size,
    aiVisibilityScore,
    topCrawledPaths,
    familyBreakdown,
    recentHitsSample: aiHitBuffer.slice(0, 20),
  };
}

/**
 * Testler için tamponu temizler.
 */
export function clearAiCrawlerLogsForTesting(): void {
  aiHitBuffer.length = 0;
  aiTokenBuckets.clear();
}

/**
 * Faz 43: AI botlarının aşırı istek atarak sunucuyu yormasını engelleyen akıllı token-bucket hız sınırlandırması.
 * Dakikada IP/bot başına izin verilen maksimum istek kapasitesi: 120, dolum hızı: saniyede 2 token.
 */
interface TokenBucket {
  tokens: number;
  lastRefill: number;
}
const aiTokenBuckets = new Map<string, TokenBucket>();
const BUCKET_CAPACITY = 120;
const REFILL_RATE_PER_SEC = 2;

export function checkAiCrawlerRateLimit(ip: string, botName: string): { allowed: boolean; remainingTokens: number } {
  const key = `${ip}_${botName}`;
  const now = Date.now();
  let bucket = aiTokenBuckets.get(key);

  if (!bucket) {
    bucket = { tokens: BUCKET_CAPACITY, lastRefill: now };
    aiTokenBuckets.set(key, bucket);
  } else {
    const elapsedSeconds = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(BUCKET_CAPACITY, bucket.tokens + elapsedSeconds * REFILL_RATE_PER_SEC);
    bucket.lastRefill = now;
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return { allowed: true, remainingTokens: Math.floor(bucket.tokens) };
  }

  return { allowed: false, remainingTokens: 0 };
}
