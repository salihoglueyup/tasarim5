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
import HavuzBakimiVeHijyenClient from './HavuzBakimiVeHijyenClient';

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

  const title = 'Site ve Rezidans Havuz Bakım Hizmeti | Alo Yönetim';
  const description = 'Site ve rezidanslar için günlük klor-pH ölçümü, filtre ters yıkama ve sertifikalı operatörlü havuz bakımı. Sağlık Bakanlığı standartlarında periyodik analiz.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/havuz-bakimi-ve-hijyen',
    lang,
    targetKeyword: 'site havuz bakımı',
    ogImageType: 'service',
    keywords: [
      'havuz bakımı',
      'site havuz bakımı',
      'yüzme havuzu bakımı',
      'havuz kimyasalları klor ph',
      'site havuz işletmesi',
      'havuz suyu analizi',
      'sağlık bakanlığı havuz hijyeni'
    ],
  });
}

export default async function HavuzBakimiVeHijyenPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.pool_title || 'Havuz Bakımı', url: '/hizmetler/havuz-bakimi-ve-hijyen' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.pool_svc_type,
    path: '/hizmetler/havuz-bakimi-ve-hijyen',
    description: t.pool_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Y%C3%BCzme_havuzu',
  });

  const faqs = [1, 2, 3, 4].map((n) => ({
    question: t[`pool_faq_${n}_q`],
    answer: t[`pool_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.pool_page_name,
    description: t.pool_page_desc,
    path: '/hizmetler/havuz-bakimi-ve-hijyen',
    speakableSelectors: ['h1', 'p', '#service-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <HavuzBakimiVeHijyenClient />
<TrOnly>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
        <ServiceAiOverviewSnippetSeo serviceSlug="havuz-bakimi-ve-hijyen" serviceName="Havuz Bakımı, Kimyasal Şartlandırma ve Hijyen" />
      </div>
</TrOnly>
    </>
  );
}
