import { NextRequest, NextResponse } from 'next/server';
import { findNearestFacilityHub } from '@/lib/seo/edgeGeoResolver';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latStr = searchParams.get('lat') || searchParams.get('latitude');
  const lngStr = searchParams.get('lng') || searchParams.get('longitude');

  const lat = latStr ? parseFloat(latStr) : 40.9912; // Varsayılan Kadıköy
  const lng = lngStr ? parseFloat(lngStr) : 29.0274;

  const result = findNearestFacilityHub(lat, lng);

  return NextResponse.json(result, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'X-Geo-Resolver': 'Alo-Yonetim-Edge-Proximity-Engine',
    },
  });
}
