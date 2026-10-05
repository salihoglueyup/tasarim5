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
import HasereVeDezenfeksiyonClient from './HasereVeDezenfeksiyonClient';

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

  const title = 'Apartman ve Site Haşere İlaçlama Hizmeti | Alo Yönetim';
  const description = 'Site, apartman ve tesisler için Sağlık Bakanlığı ruhsatlı biyosidal ürünlerle kokusuz böcek, fare ve kemirgen ilaçlama hizmeti. Randevu: 0216 550 48 48.';

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/hasere-ve-dezenfeksiyon',
    lang,
    targetKeyword: 'apartman böcek ilaçlama',
    ogImageType: 'service',
    keywords: [
      'haşere ilaçlama',
      'alo böcek',
      'alo ilaçlama',
      'site ilaçlama',
      'apartman böcek ilaçlama',
      'dezenfeksiyon hizmeti',
      'kemirgen fare kontrolü',
      'sağlık bakanlığı ruhsatlı ilaçlama',
      'tesis ilaçlama'
    ],
  });
}

export default async function HasereVeDezenfeksiyonPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_all_services || 'Hizmetler', url: '/hizmetler' },
    { name: t.pest_title || 'Haşere İlaçlama', url: '/hizmetler/hasere-ve-dezenfeksiyon' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: t.hase_svc_type,
    path: '/hizmetler/hasere-ve-dezenfeksiyon',
    description: t.hase_svc_desc,
    priceRange: '₺₺',
    sameAs: 'https://tr.wikipedia.org/wiki/Biyosidal_%C3%BCr%C3%BCnler',
  });

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: t[`hase_faq_${n}_q`],
    answer: t[`hase_faq_${n}_a`],
  }));

  const faqLd = faqPageSchema(faqs);

  const pageLd = webPageSchema({
    name: t.hase_page_name,
    description: t.hase_svc_desc,
    path: '/hizmetler/hasere-ve-dezenfeksiyon',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <HasereVeDezenfeksiyonClient />
    </>
  );
}
