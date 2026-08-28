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

  const title = 'Kalite Politikamız — ISO 41001 & ISO 9001 Standartları | Alo Yönetim';
  const description = 'ISO 9001, ISO 41001, ISO 45001 ve 5188 Sayılı Kanun lisanslarıyla sıfır hata ve %100 sakin memnuniyeti ilkelerimiz. Kalite taahhütlerimizi inceleyin!';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/kalite-politikamiz',
    lang,
    targetKeyword: 'site yönetimi kalite politikası',
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
