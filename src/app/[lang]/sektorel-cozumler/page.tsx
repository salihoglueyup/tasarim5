import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import SectoralClient from './SectoralClient';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return buildMetadata({
    title: t.sek_meta_title,
    description: t.sek_meta_desc,
    path: '/sektorel-cozumler',
    lang,
    targetKeyword: 'sektörel tesis yönetimi',
    keywords: t.sek_meta_keywords.split('|'),
  });
}

export default async function SektorelCozumlerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);
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
    { name: t.sek_home, url: '/' },
    { name: t.sector_page_title, url: '/sektorel-cozumler' },
  ]);

  const pageLd = webPageSchema({
    name: t.sek_meta_title,
    description: t.sek_page_ld_desc,
    path: '/sektorel-cozumler',
    speakableSelectors: ['h1', 'p', '#sector-hub-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, pageLd]} />
      <SectoralClient dbSolutions={dbSolutions} lang={lang} />
    </>
  );
}
