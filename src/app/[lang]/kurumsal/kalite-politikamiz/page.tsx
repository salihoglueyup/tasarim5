import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, ORG_ID } from '@/lib/schemas';
import KalitePolitikamizClient from './KalitePolitikamizClient';

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

  const title = t.quality_meta_title || 'Kalite Politikamız — Uluslararası Tesis Yönetim Standartları | Alo Yönetim';
  const description = t.quality_meta_desc || 'ISO 9001 Kalite, ISO 41001 Tesis Yönetimi, ISO 45001 İSG ve 5188 Güvenlik akreditasyonlarıyla sıfır hata ve maksimum memnuniyet politikamız.';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/kalite-politikamiz',
    lang,
    ogImageType: 'default',
    keywords: [
      'alo yönetim kalite politikası',
      'iso 9001 tesis yönetimi',
      'iso 41001 kalite standartları',
      'site yönetimi hizmet kalitesi',
      'türkak akreditasyonlu site yönetimi'
    ],
  });
}

export default async function KalitePolitikamizPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_corporate || 'Kurumsal', url: '/kurumsal' },
    { name: t.quality_title || 'Kalite Politikamız', url: '/kurumsal/kalite-politikamiz' }
  ]);

  const credentialLd = {
    '@type': 'Organization',
    '@id': ORG_ID,
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
        credentialCategory: 'TÜRKAK Akreditasyonlu Kalite Standardı',
        description: 'Tesis işletmesinde müşteri odaklılık ve sürekli iyileştirme güvencesi.'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 41001:2018 Tesis Yönetim Standardı',
        credentialCategory: 'Uluslararası Tesis İşletim Standardı',
        description: 'Toplu yaşam alanlarında maliyet optimizasyonu ve operasyonel verimlilik.'
      }
    ]
  };

  const pageLd = webPageSchema({
    name: t.quality_title || 'Kalite Politikamız',
    description: t.quality_desc || 'Alo Yönetim kurumsal kalite ve hizmet yeterlilik politikası.',
    path: '/kurumsal/kalite-politikamiz',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, credentialLd]} />
      <KalitePolitikamizClient />
    </>
  );
}
