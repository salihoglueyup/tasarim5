import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import CalculatorClient from './CalculatorClient';
import { defaultCalcConfig } from '@/lib/hesaplayici';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Aidat Hesaplayıcı — Site Yönetim Maliyetini Hesapla',
    description:
      'Siteniz için tahmini aidat ve tesis yönetim maliyetini hızlıca hesaplayın. Daire sayısı, ek hizmetler ve tasarruf potansiyelini anında görün.',
    path: '/hesaplayici',
    lang,
    keywords: ['aidat hesaplama', 'site yönetim maliyeti', 'tesis yönetim ücreti hesaplayıcı', 'aidat ne kadar'],
  });
}

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
