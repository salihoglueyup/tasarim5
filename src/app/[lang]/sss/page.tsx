import PageHeader from '@/components/layout/PageHeader';
import { JsonLd } from '@/components';
import { generateBreadcrumbs, faqPageSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import FaqClient from './FaqClient';
import { buildMetadata, LOCALES } from '@/lib/seo';

export const revalidate = 60; // 1 dakika cache

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return buildMetadata({
    title: 'Sıkça Sorulan Sorular — Alo Yönetim',
    description: 'Site ve tesis yönetimi, aidat tahsilatı, hukuki süreçler ve teknik bakım hizmetlerimiz hakkında en çok merak edilen sorular.',
    path: '/sss',
    lang,
  });
}

export default async function SSSPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

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
    { name: 'S.S.S', url: '/sss' }
  ]);

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumbLd]} />
      <PageHeader 
        title="Sıkça Sorulan Sorular" 
        description="Aklınıza takılan soruların cevaplarını burada bulabilirsiniz." 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        <FaqClient faqs={faqs} categories={categories} />
      </section>
    </>
  );
}
