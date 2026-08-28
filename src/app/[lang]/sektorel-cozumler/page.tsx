import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import SectoralClient from './SectoralClient';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

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
  let dbSolutions: any[] = [];
  const cacheKeySolutions = 'sectoral_solutions_list_v2';

  try {
    const cached = await redis.get(cacheKeySolutions);
    if (cached) dbSolutions = JSON.parse(cached);
  } catch {
    // Redis fallback
  }

  if (dbSolutions.length === 0) {
    dbSolutions = await prisma.sectoralSolution.findMany({
      where: { published: true },
      orderBy: { order: 'asc' }
    }).catch(() => []);

    if (dbSolutions.length > 0) {
      redis.setex(cacheKeySolutions, 3600, JSON.stringify(dbSolutions)).catch(() => {});
    }
  }

  return (
    <SectoralClient dbSolutions={dbSolutions} />
  );
}
