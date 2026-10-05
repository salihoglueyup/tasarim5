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
import TeknikBakimClient from './TeknikBakimClient';

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

  const title = 'Bina ve Site Teknik Bakım Şirketleri — Asansör & Jeneratör SLA | Alo Yönetim';
  const description = 'MMO ve TSE A Tipi asansör yeşil etiket muayenesi, jeneratör senkronizasyon, kompanzasyon sıfır reaktif ceza ve 45 dk SLA acil teknik servis güvencesi.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/teknik-bakim',
    lang,
    targetKeyword: 'bina teknik bakım',
    ogImageType: 'service',
    keywords: [
      'teknik bakım',
      'bina teknik bakım',
      'asansör bakımı',
      'asansör arıza servisi',
      'jeneratör periyodik bakım',
      'bina hidrofor bakımı',
      'kompanzasyon panosu reaktif ceza',
      'yangın tesisatı bakımı',
      'site teknik işletme',
      'tesis teknik servis'
    ],
  });
}

export default async function TeknikBakimPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.tech_title || 'Teknik Bakım', url: '/hizmetler/teknik-bakim' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.tech_svc_type,
    path: '/hizmetler/teknik-bakim',
    description: t.tech_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Bak%C4%B1m_(teknik)',
  });

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: t[`tech_faq_${n}_q`],
    answer: t[`tech_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.tech_page_name,
    description: t.tech_page_desc,
    path: '/hizmetler/teknik-bakim',
    speakableSelectors: ['h1', 'p', '#service-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <TeknikBakimClient />
<TrOnly>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
        <ServiceAiOverviewSnippetSeo serviceSlug="teknik-bakim" serviceName="Teknik Bakım, Onarım ve Asansör İşletimi" />
      </div>
</TrOnly>
    </>
  );
}
