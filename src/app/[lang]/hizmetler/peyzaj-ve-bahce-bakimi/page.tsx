import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { 
  generateBreadcrumbs, 
  webPageSchema, 
  serviceSchema, 
  faqPageSchema 
} from '@/lib/schemas';
import ServiceAiOverviewSnippetSeo from '@/components/seo/ai-overviews/ServiceAiOverviewSnippetSeo';
import TrOnly from '@/components/seo/TrOnly';
import PeyzajVeBahceBakimiClient from './PeyzajVeBahceBakimiClient';

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

  const title =
    lang === 'tr'
      ? 'Site ve Tesis Peyzaj & Bahçe Bakımı | Alo Yönetim'
      : t.peyz_page_name || 'Site ve Tesis Peyzaj & Bahçe Bakımı | Alo Yönetim';
  const description =
    lang === 'tr'
      ? 'Siteler için 4 mevsim periyodik çim biçme, ağaç budama, gübreleme ve akıllı otomatik sulama bakımı. Ziraat mühendisi denetimli profesyonel peyzaj hizmeti.'
      : t.peyz_svc_desc || t.peyz_page_desc;

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/peyzaj-ve-bahce-bakimi',
    lang,
    targetKeyword: 'site peyzaj bakımı',
    ogImageType: 'service',
    keywords: [
      'peyzaj bakımı',
      'site peyzaj bakımı',
      'site bahçe bakımı',
      'çim biçme budama',
      'otomatik sulama sistemleri',
      'apartman peyzaj yönetimi',
      'ziraat mühendisi danışmanlığı'
    ],
  });
}

export default async function PeyzajVeBahceBakimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.land_title || 'Peyzaj ve Bahçe Bakımı', url: '/hizmetler/peyzaj-ve-bahce-bakimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.peyz_svc_type,
    path: '/hizmetler/peyzaj-ve-bahce-bakimi',
    description: t.peyz_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Peyzaj_mimarl%C4%B1%C4%9F%C4%B1',
  });

  const faqs = [1, 2, 3, 4].map((n) => ({
    question: t[`peyz_faq_${n}_q`],
    answer: t[`peyz_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.peyz_page_name,
    description: t.peyz_page_desc,
    path: '/hizmetler/peyzaj-ve-bahce-bakimi',
    speakableSelectors: ['h1', '#service-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <PeyzajVeBahceBakimiClient />
      <TrOnly>
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
          <ServiceAiOverviewSnippetSeo
            serviceSlug="peyzaj-ve-bahce-bakimi"
            serviceName="Site ve Tesis Peyzaj & Bahçe Bakımı"
          />
        </div>
      </TrOnly>
    </>
  );
}
