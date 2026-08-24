import { NextRequest, NextResponse } from 'next/server';
import { calculateFacilityBudget, type FacilityType } from '@/data/facilityBudgetData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const units = parseInt(searchParams.get('units') || '30', 10);
  const facilityType = (searchParams.get('facilityType') || searchParams.get('type') || 'site') as FacilityType;
  const district = searchParams.get('district') || 'kadikoy';
  const floorAreaM2 = searchParams.get('floorAreaM2') ? parseInt(searchParams.get('floorAreaM2')!, 10) : undefined;

  const result = calculateFacilityBudget(units, facilityType, district, floorAreaM2);

  return NextResponse.json(result, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Calculator-Type': 'Alo-Yonetim-Facility-Budget-Simulation-Engine',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = calculateFacilityBudget(
      typeof body.units === 'number' ? body.units : parseInt(body.units || '30', 10),
      (body.facilityType || body.type || 'site') as FacilityType,
      body.district || 'kadikoy',
      body.floorAreaM2 ? parseInt(body.floorAreaM2, 10) : undefined,
    );
    return NextResponse.json(result, {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json(calculateFacilityBudget(30, 'site', 'kadikoy'), { status: 200 });
  }
}
