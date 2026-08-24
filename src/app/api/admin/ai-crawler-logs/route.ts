import { NextResponse } from 'next/server';
import { getAiCrawlerAnalytics } from '@/lib/seo/aiBotTelemetry';

export const dynamic = 'force-dynamic';

export async function GET() {
  const analytics = getAiCrawlerAnalytics();

  return NextResponse.json(
    {
      status: 'success',
      report: 'Alo Yönetim AI Search & LLM Crawl Intelligence Report',
      timestamp: new Date().toISOString(),
      analytics,
      recommendations: [
        'OpenAI GPTBot ve PerplexityBot için /api/ai/facility-agent-context.json rotasını taze tutun.',
        '39 ilçe tesis yönetimi verileri llms.txt ve llms-full.txt üzerinden düzenli güncellenmektedir.',
      ],
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-cache, no-store',
      },
    }
  );
}
