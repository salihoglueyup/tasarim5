import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { KNOWN_AI_BOTS, getAiBotTelemetryStats } from '@/lib/seo/aiBotDetector';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

/**
 * Resmi Alo Yönetim Otonom AI Bot Tarama Telemetrisi API'si
 * (/api/seo/bot-telemetry.json)
 * Wave 68: Google-Extended, GPTBot, PerplexityBot, ClaudeBot gibi tarayıcılar için canlı durum kütüğü.
 */
export async function GET() {
  try {
    const stats = getAiBotTelemetryStats();

    const telemetryPayload = {
      $schema: 'https://schema.org/docs/jsonldcontext.json',
      botTelemetryVersion: '1.0.0',
      status: 'active',
      generatedAt: '2026-09-17T11:45:00.000Z',
      host: 'aloyonetim.com.tr',
      canonicalUrl: `${BASE_URL}/api/seo/bot-telemetry.json`,
      crawlBudgetStatus: 'optimal',
      recommendedCrawlDelaySeconds: 0,
      cacheControl: 'Edge Pre-rendered & ISR Instant Stream',
      overview: {
        totalSupportedAiBots: stats.totalRecognizedBots,
        activeSearchGroundingBots: stats.searchGroundingBots,
        modelTrainingBots: stats.trainingBots,
        crawlPolicy: stats.crawlPolicy,
      },
      verifiedBotsRegistry: KNOWN_AI_BOTS.map((bot) => ({
        id: bot.id,
        name: bot.name,
        organization: bot.organization,
        category: bot.category,
        description: bot.description,
        robotsTxtPermission: bot.allowedRobots ? 'ALLOWED' : 'DISALLOWED',
        priorityWeight: bot.priorityWeight,
      })),
      highPriorityFeeds: stats.targetMachineReadablePaths.map((path) => ({
        path,
        url: `${BASE_URL}${path}`,
        format: path.endsWith('.json') ? 'application/json' : 'text/plain',
        updateFrequency: 'Real-time or Hourly ISR',
      })),
      edgeSecurityGuards: {
        wafStatus: 'active',
        rateLimiterForBots: 'Dynamic 120 req/min (Burst Tolerant for Search Grounding)',
        maliciousScraperShield: 'active',
        http2AndHttp3Support: true,
      },
    };

    return NextResponse.json(telemetryPayload, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to generate bot telemetry graph',
        status: 'error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
