import { NextResponse } from 'next/server';
import { runFacilitySerpRankSimulation } from '@/lib/seo/facilitySerpRankSimulator';

export const dynamic = 'force-dynamic';

/**
 * Tesis Yönetimi Canlı SERP & Rank Skoru Simülasyon API'si (/api/seo/facility-rank-score)
 */
export async function GET() {
  try {
    const report = runFacilitySerpRankSimulation();
    return NextResponse.json(report, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Rank simulation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
