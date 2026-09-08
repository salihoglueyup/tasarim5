import { NextResponse } from 'next/server';
import { runFacilityAutonomousAudit } from '@/lib/seo/facilityAutonomousAuditor';

export const dynamic = 'force-dynamic';

/**
 * Tesis Yönetimi 39 İlçe Siloları & Hub Sayfası Canlı Sağlık Denetim API'si (/api/seo/facility-audit)
 */
export async function GET() {
  try {
    const report = runFacilityAutonomousAudit();
    return NextResponse.json(report, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Audit execution failed', details: error instanceof Error ? error.message : String(error) },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  }
}
