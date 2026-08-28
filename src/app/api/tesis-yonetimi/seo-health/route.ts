import { NextResponse } from 'next/server';
import { auditFacilityPageSeoHealth } from '@/lib/seo/facilityAutonomousSeoAuditor';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'tr';

  const report = auditFacilityPageSeoHealth(lang);

  return NextResponse.json(report, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Seo-Health-Score': `${report.overallScore}/100`,
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
