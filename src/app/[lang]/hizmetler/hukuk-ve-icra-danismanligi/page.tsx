import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { 
  generateBreadcrumbs, 
  webPageSchema, 
  serviceSchema, 
  faqPageSchema,
  legalServiceSchema,
} from '@/lib/schemas';
import HukukVeIcraDanismanligiClient from './HukukVeIcraDanismanligiClient';

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

  const title = 'KMK 634 Hukuk & Aidat İcra Danışmanlığı — İlamsız Takip & %5 Faiz | Alo Yönetim';
  const description = 'KMK 634 kapsamında ödenmeyen aidatlar için noter ihtarnamesi, Örnek No: 7 ilamsız icra takibi, aylık %5 gecikme tazminatı ve kesinleşmiş işletme projesi danışmanlığı.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
    lang,
    targetKeyword: 'kat mülkiyeti hukuku',
    ogImageType: 'service',
    keywords: [
      'kat mülkiyeti hukuku',
      'aidat icra takibi',
      'kmk 634 danışmanlığı',
      'site yönetimi avukat',
      'apartman yönetimi dava',
      'site genel kurul yönetimi',
      'yönetim planı hazırlama'
    ],
  });
}

export default async function HukukVeIcraDanismanligiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.legal_title || 'Hukuk ve İcra Danışmanlığı', url: '/hizmetler/hukuk-ve-icra-danismanligi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.legal_svc_type,
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
    description: t.legal_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Hukuk',
  });

  const legalLd = legalServiceSchema({
    name: t.legal_ld_name,
    description: t.legal_ld_desc,
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
  });

  const faqs = [1, 2, 3, 4].map((n) => ({
    question: t[`legal_faq_${n}_q`],
    answer: t[`legal_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.legal_page_name,
    description: t.legal_page_desc,
    path: '/hizmetler/hukuk-ve-icra-danismanligi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, legalLd, faqLd, pageLd]} />
      <HukukVeIcraDanismanligiClient />
    </>
  );
}
