import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';;
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import ReferencesClient from './ReferencesClient';
import redis from '@/lib/redis';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Referanslarımız — Yönettiğimiz Prestijli Projeler',
    description:
      'İstanbul genelinde onlarca apartman, site ve plaza yönetim referansımız. Güvenlik, temizlik ve tesis yönetiminde kanıtlanmış başarı.',
    path: '/referanslar',
    lang,
    keywords: ['site yönetimi referanslar', 'tesis yönetimi projeleri', 'istanbul apartman yönetimi referans'],
  });
}

// Server Component
export default async function ReferanslarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  let projects, partners;
  const cacheKey = `referanslar_page_data_${lang}`;
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      projects = parsed.projects;
      partners = parsed.partners;
    }
  } catch (e) {
    console.warn("Redis okuma hatası:", e);
  }

  if (!projects || !partners) {
    [projects, partners] = await Promise.all([
      prisma.reference.findMany({
        where: { published: true },
        orderBy: { order: 'asc' },
      }),
      prisma.partner.findMany({
        orderBy: { order: 'asc' },
      }),
    ]);
    
    try {
      await redis.setex(cacheKey, 3600, JSON.stringify({ projects, partners }));
    } catch (e) {
      console.warn("Redis yazma hatası:", e);
    }
  }

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Referanslarımız', url: '/referanslar' }
  ]);

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: 'Referanslarımız',
    path: '/referanslar',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <PageHeader 
        title="Referanslarımız" 
        description="İstanbul genelinde başarıyla yönettiğimiz seçkin siteler, plazalar ve rezidanslar." 
      />

      <ReferencesClient 
        initialProjects={projects} 
        partners={partners} 
        lang={lang}
      />
    </>
  );
}
