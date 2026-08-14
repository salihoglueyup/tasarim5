import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import SectoralClient from './SectoralClient';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Sektörel Çözümler — Rezidans, AVM ve Sanayi Yönetimi',
    description:
      'Rezidans, AVM, sanayi tesisi ve karma projelere özel tesis yönetim çözümleri. Sektörünüze özgü süreçler ve kanıtlanmış KPI\'ler.',
    path: '/sektorel-cozumler',
    lang,
    keywords: ['rezidans yönetimi', 'avm tesis yönetimi', 'sanayi tesis yönetimi', 'sektörel tesis çözümleri'],
  });
}

export default async function SektorelCozumlerPage() {
  const dbSolutions = await prisma.sectoralSolution.findMany({
    where: { published: true },
    orderBy: { order: 'asc' }
  });

  return (
    <SectoralClient dbSolutions={dbSolutions} />
  );
}
