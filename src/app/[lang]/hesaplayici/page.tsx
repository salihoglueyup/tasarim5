import { prisma } from '@/lib/prisma';
import CalculatorClient from './CalculatorClient';
import { defaultCalcConfig } from '@/lib/hesaplayici';

export const dynamic = 'force-dynamic';

export default async function HesaplayiciServer() {
  // Fetch the first CalculatorConfig, or use default if none exists
  const configRecord = await prisma.calculatorConfig.findFirst();

  const config = configRecord ? {
    baseCostPerUnit: configRecord.baseCostPerUnit,
    securityAddon: configRecord.securityAddon,
    poolAddon: configRecord.poolAddon,
    greenAddon: configRecord.greenAddon,
    elevatorAddon: configRecord.elevatorAddon,
    savingsRate: configRecord.savingsRate,
  } : defaultCalcConfig;

  return (
    <CalculatorClient initialConfig={config} />
  );
}
