import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';;
import { generateBreadcrumbs, faqPageSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import FaqClient from './FaqClient';
import { buildMetadata, LOCALES } from '@/lib/seo';
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

  // Benzersiz kategorileri bul
  const categories = Array.from(new Set(faqs.map(f => f.category)));
  categories.unshift('Tümü'); // Tümü kategorisini ekle

  const jsonLd = faqPageSchema(
    faqs.map((f) => ({ question: f.question, answer: f.answer.replace(/<[^>]+>/g, '') }))
  );

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: dict.sss_title, url: '/sss' }
  ]);

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumbLd]} />
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
