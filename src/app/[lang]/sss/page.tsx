import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';;
import { generateBreadcrumbs, faqPageSchema, webPageSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import FaqClient from './FaqClient';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  return buildMetadata({
    title: dict.sss_title + ' — Alo Yönetim',
    description: dict.sss_desc,
    path: '/sss',
    lang,
  });
}

export default async function SSSPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  // DB'den soruları çek
  const faqs = await prisma.faq.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  });

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
    { name: 'Anasayfa', url: '/' },
    { name: dict.sss_title, url: '/sss' }
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
