'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { defaultCalcConfig } from '@/lib/hesaplayici';

export async function updateCalculatorConfig(formData: FormData) {
  const config = {
    baseCostPerUnit: Number(formData.get('baseCostPerUnit')) || defaultCalcConfig.baseCostPerUnit,
    securityAddon: Number(formData.get('securityAddon')) || defaultCalcConfig.securityAddon,
    poolAddon: Number(formData.get('poolAddon')) || defaultCalcConfig.poolAddon,
    greenAddon: Number(formData.get('greenAddon')) || defaultCalcConfig.greenAddon,
    elevatorAddon: Number(formData.get('elevatorAddon')) || defaultCalcConfig.elevatorAddon,
    savingsRate: Number(formData.get('savingsRate')) || defaultCalcConfig.savingsRate,
  };

  const existing = await prisma.calculatorConfig.findFirst();

  if (existing) {
    await prisma.calculatorConfig.update({
      where: { id: existing.id },
      data: config,
    });
  } else {
    await prisma.calculatorConfig.create({
      data: config,
    });
  }

  // Revalidate the frontend calculator route so users see new values immediately
  revalidatePath('/[lang]/hesaplayici', 'page');
  revalidatePath('/tr/hesaplayici', 'page');
  revalidatePath('/en/hesaplayici', 'page');
}
