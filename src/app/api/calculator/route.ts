import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { defaultCalcConfig } from '@/lib/hesaplayici';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const configRecord = await prisma.calculatorConfig.findFirst();
    
    const config = configRecord ? {
      baseCostPerUnit: configRecord.baseCostPerUnit,
      securityAddon: configRecord.securityAddon,
      poolAddon: configRecord.poolAddon,
      greenAddon: configRecord.greenAddon,
      elevatorAddon: configRecord.elevatorAddon,
      savingsRate: configRecord.savingsRate,
    } : defaultCalcConfig;

    const standardHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    };

    return NextResponse.json(config, { headers: standardHeaders });
  } catch (error) {
    return NextResponse.json(defaultCalcConfig, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  }
}
