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
import TemizlikVeHijyenClient from './TemizlikVeHijyenClient';

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

  const title = 'Apartman ve Site Ortak Alan Temizlik Şirketi | Alo Yönetim';
  const description = 'TSE 13811 standartlarında endüstriyel zemin makineleri ve kadrolu personellerle blok, kat holü ve otopark temizliği. 48 saat içinde şeffaf teklif alın!';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/temizlik-ve-hijyen',
    lang,
    targetKeyword: 'site temizlik şirketi',
    ogImageType: 'service',
    keywords: [
      'site temizlik şirketi',
      'apartman temizliği',
      'site ortak alan temizliği',
      'merdiven temizliği',
      'otopark zemin yıkama',
      'tse 13811 hijyen',
      'endüstriyel tesis temizliği'
    ],
  });
}

export default async function TemizlikVeHijyenPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.clean_title || 'Temizlik ve Hijyen', url: '/hizmetler/temizlik-ve-hijyen' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.clean_svc_type,
    path: '/hizmetler/temizlik-ve-hijyen',
    description: t.clean_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Temizlik',
  });

  const faqs = [1, 2, 3, 4].map((n) => ({
    question: t[`clean_faq_${n}_q`],
    answer: t[`clean_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.clean_page_name,
    description: t.clean_page_desc,
    path: '/hizmetler/temizlik-ve-hijyen',
    speakableSelectors: ['h1', 'p', '#service-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <TemizlikVeHijyenClient />
<TrOnly>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
        <ServiceAiOverviewSnippetSeo serviceSlug="temizlik-ve-hijyen" serviceName="Site ve Tesis Temizliği & Hijyen Hizmetleri" />
      </div>
</TrOnly>
    </>
  );
}
