import { NextRequest, NextResponse } from 'next/server';
import { compareFacilityDistricts } from '@/lib/seo/facilityDistrictComparator';

export const dynamic = 'force-dynamic';

/**
 * 39 İlçe Çapraz Aidat & Tesis Yönetimi Kıyaslama API'si (/api/tesis-yonetimi/compare-districts?d1=kadikoy&d2=besiktas)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const d1 = searchParams.get('d1') || searchParams.get('district1') || 'kadikoy';
    const d2 = searchParams.get('d2') || searchParams.get('district2') || 'besiktas';
    const d3 = searchParams.get('d3') || searchParams.get('district3');

    const slugs = [d1, d2];
    if (d3) slugs.push(d3);

    const result = compareFacilityDistricts(slugs);

    if (!result) {
      return NextResponse.json({ error: 'Comparison failed' }, { status: 400 });
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Comparison execution error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
