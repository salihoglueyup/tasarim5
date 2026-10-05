import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import TrOnly from '@/components/seo/TrOnly';
import { 
  generateBreadcrumbs, 
  webPageSchema, 
  serviceSchema, 
  faqPageSchema 
} from '@/lib/schemas';
import ServiceAiOverviewSnippetSeo from '@/components/seo/ai-overviews/ServiceAiOverviewSnippetSeo';
import AidatTakibiClient from './AidatTakibiClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const title = 'Profesyonel Aidat Takibi ve Tahsilat Yönetimi | Alo Yönetim';
  const description = 'Site ve apartmanlar için %99 tahsilat garantili dijital aidat takip sistemi. Kredi kartıyla online ödeme, otomatik banka entegrasyonu ve yasal icra takibi.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/aidat-takibi',
    lang,
    targetKeyword: 'aidat takibi',
    ogImageType: 'service',
    keywords: [
      'aidat takibi',
      'profesyonel aidat tahsili',
      'online aidat ödeme',
      'site aidat takip programı',
      'apartman aidat tahsilatı',
      'kat mülkiyeti aidat takibi',
      'aidat icra takibi',
      'şeffaf site muhasebesi',
      'tesis yönetimi aidat'
    ],
  });
}

export default async function AidatTakibiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.dues_title || 'Aidat Takibi', url: '/hizmetler/aidat-takibi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.dues_svc_type,
    path: '/hizmetler/aidat-takibi',
    description: t.dues_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Aidat',
  });

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: t[`dues_faq_${n}_q`],
    answer: t[`dues_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.dues_page_name,
    description: t.dues_page_desc,
    path: '/hizmetler/aidat-takibi',
    speakableSelectors: ['h1', 'p', '#service-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <AidatTakibiClient />
<TrOnly>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
        <ServiceAiOverviewSnippetSeo serviceSlug="aidat-takibi" serviceName="Profesyonel Aidat Takibi ve Yasal Tahsilat" />
      </div>
</TrOnly>
    </>
  );
}
