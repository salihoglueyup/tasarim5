import { NextResponse } from 'next/server';
import { runFacilitySerpRankSimulation } from '@/lib/seo/facilitySerpRankSimulator';

export const dynamic = 'force-dynamic';

/**
 * Tesis Yönetimi Canlı SERP & Rank Skoru Simülasyon API'si (/api/seo/facility-rank-score)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'tr';
    const report = runFacilitySerpRankSimulation(lang);
    return NextResponse.json(report, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Rank simulation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
