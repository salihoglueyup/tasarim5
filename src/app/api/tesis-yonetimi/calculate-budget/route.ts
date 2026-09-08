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
  const responseData = {
    ...result,
    priceSpecification: {
      '@context': 'https://schema.org',
      '@type': 'PriceSpecification',
      price: result.savingsWithAloYonetim.optimizedBudget,
      priceCurrency: 'TRY',
      unitText: 'AY',
      validFrom: '2026-01-01',
    },
  };

  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Calculator-Type': 'Alo-Yonetim-Facility-Budget-Simulation-Engine',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
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
    const responseData = {
      ...result,
      priceSpecification: {
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        price: result.savingsWithAloYonetim.optimizedBudget,
        priceCurrency: 'TRY',
        unitText: 'AY',
        validFrom: '2026-01-01',
      },
    };
    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch {
    const defaultResult = calculateFacilityBudget(30, 'site', 'kadikoy');
    return NextResponse.json(
      {
        ...defaultResult,
        priceSpecification: {
          '@context': 'https://schema.org',
          '@type': 'PriceSpecification',
          price: defaultResult.savingsWithAloYonetim.optimizedBudget,
          priceCurrency: 'TRY',
          unitText: 'AY',
          validFrom: '2026-01-01',
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
        },
      }
    );
  }
}
