import { NextResponse } from 'next/server';
import { generateBotAnalyticsReport } from '@/lib/seo/facilityBotAuditLog';

export const dynamic = 'force-dynamic';

/**
 * Bot Tarama Telemetrisi & 304 Önbellek Verimlilik Raporu API'si (/api/seo/bot-analytics)
 */
export async function GET() {
  try {
    const report = generateBotAnalyticsReport();
    return NextResponse.json(report, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Bot analytics error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
