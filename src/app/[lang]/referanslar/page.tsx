import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import ReferencesClient from './ReferencesClient';
import redis from '@/lib/redis';
import { buildMetadata } from '@/lib/seo';
import { getReferencesList, PARTNERS_DATA } from '@/data/references';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = {
    tr: 'Referanslarımız — Yönettiğimiz 120+ Prestijli Site ve Plaza | Alo Yönetim',
    en: 'Our References — 120+ Prestigious Managed Properties in Istanbul',
    ru: 'Наши объекты — 120+ жилых и коммерческих проектов | Alo Yönetim',
    ar: 'مشاريعنا — إدارة أكثر من 120 مجمعاً وبرجاً في إسطنبول | ألو للإدارة',
  };
  const descs: Record<string, string> = {
    tr: 'İstanbul genelinde 120+ site, plaza ve rezidans referansımız. ISO 41001 entegre tesis yönetimi, 5188 güvenlik ve %30 aidat tasarrufu. Projelerimizi inceleyin!',
    en: 'Our property management portfolio covering 120+ residential complexes, towers, and commercial plazas in Istanbul. 30% cost savings & ISO 41001 standards.',
    ru: 'Портфолио управления недвижимостью: более 120 жилых комплексов, башен и бизнес-центров в Стамбуле. Экономия бюджета 30% и стандарты ISO 41001.',
    ar: 'محفظة إدارة المرافق والممتلكات لأكثر من 120 مجمعاً سكنياً وتجارياً وبرجاً في إسطنبول مع توفير 30% ومعايير ISO 41001.',
  };

  return buildMetadata({
    title: titles[lang] || titles.tr,
    description: descs[lang] || descs.tr,
    path: '/referanslar',
    lang,
    targetKeyword: 'site yönetimi referansları',
    keywords: [
      'site yönetimi referanslar',
      'tesis yönetimi projeleri',
      'istanbul apartman yönetimi referans',
      'rezidans yönetimi referansları',
      'plaza yönetimi referansları',
    ],
  });
}

// Server Component
export default async function ReferanslarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  let projects: any[] | null = null;
  let partners: any[] | null = null;
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

  if (!projects || projects.length === 0 || !partners || partners.length === 0) {
    try {
      const [dbProjects, dbPartners] = await Promise.all([
        prisma.reference.findMany({
          where: { published: true },
          orderBy: { order: 'asc' },
        }),
        prisma.partner.findMany({
          orderBy: { order: 'asc' },
        }),
      ]);

      if (dbProjects && dbProjects.length > 0) {
        projects = dbProjects.map(p => ({
          id: p.id,
          title: lang === 'en' && p.title_en ? p.title_en : lang === 'ru' && p.title_ru ? p.title_ru : lang === 'ar' && p.title_ar ? p.title_ar : p.title,
          slug: p.slug,
          category: p.category,
          units: p.units,
          location: lang === 'en' && p.location_en ? p.location_en : lang === 'ru' && p.location_ru ? p.location_ru : lang === 'ar' && p.location_ar ? p.location_ar : p.location,
          image: p.image,
          clientLogo: null,
        }));
      }

      if (dbPartners && dbPartners.length > 0) {
        partners = dbPartners;
      }
    } catch (e) {
      console.warn("Veritabanı referans okuma hatası, statik veri setine geçiliyor:", e);
    }

    // Fallback to rich references data
    if (!projects || projects.length === 0) {
      projects = getReferencesList(lang);
    }
    if (!partners || partners.length === 0) {
      partners = PARTNERS_DATA;
    }

    try {
      await redis.setex(cacheKey, 3600, JSON.stringify({ projects, partners }));
    } catch (e) {
      console.warn("Redis yazma hatası:", e);
    }
  }

  const titles: Record<string, { title: string; desc: string }> = {
    tr: {
      title: 'Referanslarımız',
      desc: "İstanbul'un 39 ilçesinde başarıyla yönettiğimiz seçkin siteler, rezidanslar ve ticari plazalar.",
    },
    en: {
      title: 'Our References',
      desc: 'Selected prestigious residences, residential communities, and commercial plazas managed across Istanbul.',
    },
    ru: {
      title: 'Наши объекты и проекты',
      desc: 'Престижные жилые комплексы, элитные резиденции и бизнес-центры под нашим управлением в Стамбуле.',
    },
    ar: {
      title: 'مشاريعنا ومراجعنا',
      desc: 'مجمعات سكنية راقية وأبراج ومراكز تجارية نديرها بنجاح في 39 منطقة بإسطنبول.',
    },
  };

  const headerContent = titles[lang] || titles.tr;

  const breadcrumbLd = generateBreadcrumbs([
    { name: lang === 'en' ? 'Home' : lang === 'ru' ? 'Главная' : lang === 'ar' ? 'الرئيسية' : 'Anasayfa', url: lang === 'tr' ? '/' : `/${lang}` },
    { name: headerContent.title, url: lang === 'tr' ? '/referanslar' : `/${lang}/referanslar` }
  ]);

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: headerContent.title,
    path: lang === 'tr' ? '/referanslar' : `/${lang}/referanslar`,
    description: headerContent.desc,
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <PageHeader 
        title={headerContent.title} 
        description={headerContent.desc} 
      />

      <ReferencesClient 
        initialProjects={projects || []} 
        partners={partners || []} 
        lang={lang}
      />
    </>
  );
}
