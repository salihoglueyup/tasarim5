import { NextRequest, NextResponse } from 'next/server';
import { generateFacilityRfpDocument } from '@/data/rfpGeneratorData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rfp = generateFacilityRfpDocument({
    facilityName: searchParams.get('facilityName') || 'Örnek Site',
    units: parseInt(searchParams.get('units') || '60', 10),
    blocks: parseInt(searchParams.get('blocks') || '2', 10),
    districtSlug: searchParams.get('district') || 'kadikoy',
    servicesNeeded: searchParams.get('services')?.split(',') || ['guvenlik', 'temizlik', 'teknik', 'muhasebe'],
  });

  return NextResponse.json(rfp, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-RFP-Generator': 'Alo-Yonetim-Facility-RFP-Engine-v1',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rfp = generateFacilityRfpDocument({
      facilityName: body.facilityName || 'Örnek Site',
      units: typeof body.units === 'number' ? body.units : parseInt(body.units || '60', 10),
      blocks: typeof body.blocks === 'number' ? body.blocks : parseInt(body.blocks || '2', 10),
      districtSlug: body.district || 'kadikoy',
      servicesNeeded: body.services || ['guvenlik', 'temizlik', 'teknik', 'muhasebe'],
    });
    return NextResponse.json(rfp, { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' } });
  } catch {
    const defaultRfp = generateFacilityRfpDocument({ facilityName: 'Örnek Site', units: 60, blocks: 2, districtSlug: 'kadikoy', servicesNeeded: ['guvenlik', 'temizlik', 'teknik', 'muhasebe'] });
    return NextResponse.json(defaultRfp, { status: 200 });
  }
}
