import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, professionalServiceSchema, webPageSchema, ORG_NAME, ORG_PHONE } from '@/lib/schemas';
import IletisimClient from './IletisimClient';

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

  const title = t.contact_meta_title || 'İletişim & Genel Merkez Adres Bilgileri | Alo Yönetim';
  const description = t.contact_meta_desc || 'İstanbul Kadıköy genel merkezimizden 7/24 kesintisiz müşteri desteği, teklif talepleri ve acil tesis operasyon hattı.';

  return buildMetadata({
    title,
    description,
    path: '/iletisim',
    lang,
    ogImageType: 'default',
    keywords: [
      'alo yönetim iletişim',
      'site yönetimi telefon numarası',
      'tesis yönetimi genel merkez',
      'kadıköy site yönetimi',
      'alo yönetim adres'
    ],
  });
}

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.contact_title || 'İletişim', url: '/iletisim' }
  ]);

  const contactPageLd = webPageSchema({
    type: 'ContactPage',
    name: t.contact_title || 'İletişim',
    description: t.contact_desc || 'Alo Yönetim iletişim kanalları, genel merkez adresi ve canlı çağrı merkezi.',
    path: '/iletisim',
    speakableSelectors: ['h1', 'p'],
  });

  const serviceLd = professionalServiceSchema({
    description: t.contact_desc || 'Profesyonel Tesis ve Site Yönetimi Müşteri Hizmetleri.',
  });

  return (
    <>
      <JsonLd data={[contactPageLd, breadcrumbLd, serviceLd]} />
      <IletisimClient />
    </>
  );
}
