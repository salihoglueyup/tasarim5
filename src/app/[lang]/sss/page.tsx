import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, faqPageSchema, webPageSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import FaqClient from './FaqClient';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { redis } from '@/lib/redis';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return buildMetadata({
    title: 'Sıkça Sorulan Sorular & KMK 634 Rehberi | Alo Yönetim',
    description: 'Site yönetimi, aidat icra takibi, 5188 özel güvenlik ve KMK 634 hakkında en çok merak edilen 40+ soru ve uzman yanıtları. Hukuki rehberi inceleyin!',
    path: '/sss',
    lang,
    targetKeyword: 'site yönetimi sıkça sorulan sorular',
    keywords: [
      'site yönetimi sss',
      'apartman yönetimi soruları',
      'kmk 634 soruları',
      'aidat ödenmezse ne olur',
      'yönetici nasıl seçilir',
    ],
  });
}

export default async function SSSPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  let faqs: any[] = [];
  const cacheKeyFaqs = `sss_faqs_list_v2_${lang}`;

  try {
    const cached = await redis.get(cacheKeyFaqs);
    if (cached) faqs = JSON.parse(cached);
  } catch {
    // Redis offline fallback
  }

  if (faqs.length === 0) {
    faqs = await prisma.faq.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    }).catch(() => []);

    if (faqs.length > 0) {
      redis.setex(cacheKeyFaqs, 3600, JSON.stringify(faqs)).catch(() => {});
    }
  }

  // Benzersiz kategorileri bul ve sayılarını hesapla
  const uniqueCategories = Array.from(new Set(faqs.map(f => f.category)));
  
  const categories = [
    { name: 'Tümü', count: faqs.length },
    ...uniqueCategories.map(cat => ({
      name: cat,
      count: faqs.filter(f => f.category === cat).length
    }))
  ];

  const jsonLd = faqPageSchema(
    faqs.map((f) => ({ question: f.question, answer: f.answer.replace(/<[^>]+>/g, '') }))
  );

  const breadcrumbLd = generateBreadcrumbs([
    { name: dict.nav_home || 'Anasayfa', url: lang === 'tr' ? '/' : `/${lang}` },
    { name: dict.sss_title || 'Sıkça Sorulan Sorular', url: lang === 'tr' ? '/sss' : `/${lang}/sss` }
  ]);

  const pageLd = webPageSchema({
    name: dict.sss_title + ' — Alo Yönetim',
    path: '/sss',
    speakableSelectors: ['h1', '.faq-question', '.faq-answer'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, jsonLd, pageLd]} />
      <PageHeader 
        title={dict.sss_title} 
        description={dict.sss_desc} 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        <FaqClient faqs={faqs} categories={categories} lang={lang} />
      </section>
    </>
  );
}
