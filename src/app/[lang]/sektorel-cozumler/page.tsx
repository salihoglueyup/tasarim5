import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import SectoralClient from './SectoralClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { SectorHubAiOverviewSeo } from '@/components/seo';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Sektörel Tesis ve Bina Yönetimi Çözümleri | Alo Yönetim',
    description:
      'Rezidans, AVM, karma yaşam ve sanayi tesislerine özel ISO 41001 entegre yönetim çözümleri. Sektörünüze özel süreçler ve kanıtlanmış KPI başarıları.',
    path: '/sektorel-cozumler',
    lang,
    targetKeyword: 'sektörel tesis yönetimi',
    keywords: ['rezidans yönetimi', 'avm tesis yönetimi', 'sanayi tesis yönetimi', 'sektörel tesis çözümleri', 'osb tesis yönetimi'],
  });
}

export default async function SektorelCozumlerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
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

  const breadcrumbLd = generateBreadcrumbs([
    { name: lang === 'en' ? 'Home' : 'Anasayfa', url: '/' },
    { name: lang === 'en' ? 'Sectoral Solutions' : 'Sektörel Çözümler', url: '/sektorel-cozumler' },
  ]);

  const pageLd = webPageSchema({
    name: 'Sektörel Tesis ve Bina Yönetimi Çözümleri | Alo Yönetim',
    description: 'Rezidans, plaza, AVM ve OSB tesislerine özel ISO 41001 entegre yönetim çözümleri.',
    path: '/sektorel-cozumler',
    speakableSelectors: ['h1', 'p', '#sector-hub-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, pageLd]} />
      <SectorHubAiOverviewSeo lang={lang} />
      <SectoralClient dbSolutions={dbSolutions} />
    </>
  );
}
