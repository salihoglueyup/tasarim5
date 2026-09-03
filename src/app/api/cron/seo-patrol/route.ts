import { NextResponse } from 'next/server';
import { runComprehensiveSeoPatrol, runFacilitySeoPatrol } from '@/lib/seo/facilitySeoPatrol';

export const dynamic = 'force-dynamic';

/**
 * Faz 236: Günlük Kırık Link, Sitemap Doğruluğu ve İndeks Durumu Denetim Cron Uç Noktası
 * GET /api/cron/seo-patrol
 */
export async function GET() {
  const comprehensiveReport = runComprehensiveSeoPatrol();
  const report = runFacilitySeoPatrol();

  return NextResponse.json(
    {
      status: 'success',
      reportTitle: 'Alo Yönetim Tesis Yönetimi SEO Health Patrol Report (Faz 236)',
      report,
      comprehensiveReport,
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

export async function POST() {
  return GET();
}
