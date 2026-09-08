import { NextResponse } from 'next/server';
import { getBotTelemetrySummary } from '@/lib/seo/botTracker';

export const dynamic = 'force-dynamic';

export async function GET() {
  const standardHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'private, no-cache, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  };

  try {
    const summary = await getBotTelemetrySummary();
    return NextResponse.json({
      status: 'success',
      data: summary,
      timestamp: new Date().toISOString(),
    }, { status: 200, headers: standardHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err?.message || 'Failed to fetch bot telemetry' },
      { status: 500, headers: standardHeaders }
    );
  }
}
