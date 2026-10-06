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
import GuvenlikYonetimiClient from './GuvenlikYonetimiClient';

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

  const title = '5188 Özel Güvenlik Şirketleri — Site ve Tesis Güvenliği | Alo Yönetim';
  const description = '5188 sayılı Kanun kapsamında Valilik komisyon izinli özel güvenlik şirketi, 7/24 RFID devriye, CCTV izleme, kıdem tazminatı kalkanı ve profesyonel koruma.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/guvenlik-yonetimi',
    lang,
    targetKeyword: 'özel güvenlik şirketi',
    ogImageType: 'service',
    keywords: [
      'özel güvenlik şirketi',
      'özel güvenlik şirketleri',
      '5188 özel güvenlik',
      'site güvenliği',
      'apartman güvenliği',
      'tesis güvenliği',
      'özel güvenlik firmaları',
      'fiziki güvenlik',
      'kamera izleme cctv',
      'plaka tanıma sistemi'
    ],
  });
}

export default async function GuvenlikYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.sec_title || 'Güvenlik Yönetimi', url: '/hizmetler/guvenlik-yonetimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.sec_svc_type,
    path: '/hizmetler/guvenlik-yonetimi',
    description: t.sec_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/%C3%96zel_g%C3%BCvenlik_g%C3%B6revlisi',
  });

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: t[`sec_faq_${n}_q`],
    answer: t[`sec_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.sec_page_name,
    description: t.sec_page_desc,
    path: '/hizmetler/guvenlik-yonetimi',
    speakableSelectors: ['h1', 'p', '#service-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <GuvenlikYonetimiClient />
<TrOnly>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
        <ServiceAiOverviewSnippetSeo serviceSlug="guvenlik-yonetimi" serviceName="5188 Lisanslı Özel Güvenlik Yönetimi" />
      </div>
</TrOnly>
    </>
  );
}
