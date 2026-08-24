import { NextResponse } from 'next/server';
import { getBotTelemetrySummary } from '@/lib/seo/botTracker';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const summary = await getBotTelemetrySummary();
    return NextResponse.json({
      status: 'success',
      data: summary,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err?.message || 'Failed to fetch bot telemetry' },
      { status: 500 }
    );
  }
}
