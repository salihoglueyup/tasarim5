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

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(defaultCalcConfig);
  }
}
