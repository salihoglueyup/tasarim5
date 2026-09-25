import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, faqPageSchema, ORG_ID } from '@/lib/schemas';
import { QUALITY_FAQS } from '@/components/seo/quality';
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
  const description = 'TÜRKAK onaylı ISO 41001, ISO 9001, ISO 27001, ISO 45001 ve TSE HYB 12850 akreditasyonlarıyla tavizsiz kalite ve yılda 48 habersiz iç denetim politikamız.';

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
      'türkak akreditasyonlu site yönetimi',
      'puko kalite dongusu',
      'tse hyb 12850 tesis isletmesi'
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
        name: 'ISO 41001:2018 Entegre Tesis Yönetim Standardı',
        credentialCategory: 'TÜRKAK & IAF Akreditasyonlu Tesis Standardı',
        description: 'Toplu yaşam alanlarında maliyet optimizasyonu ve operasyonel verimlilik.'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
        credentialCategory: 'TÜRKAK Akreditasyonlu Kalite Standardı',
        description: 'Tesis işletmesinde müşteri odaklılık ve sürekli iyileştirme güvencesi.'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 27001:2022 Bilgi Güvenliği Yönetimi',
        credentialCategory: 'KVKK & Bilgi Güvenliği Standardı',
        description: 'Kat malikleri verilerinin 256-bit şifrelenmesi ve veri mahremiyeti.'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği',
        credentialCategory: 'İSG ve Sıfır Kaza Standardı',
        description: 'Saha çalışanlarının İSG eğitimleri ve koruyucu donanım takibi.'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'TSE HYB 12850 Hizmet Yeterlilik Belgesi',
        credentialCategory: 'T.C. Türk Standardları Enstitüsü Onaylı',
        description: 'Entegre bina ve tesis yönetimi hizmet yeterlilik uygunluğu.'
      }
    ]
  };

  const faqLd = faqPageSchema(QUALITY_FAQS);

  const pageLd = webPageSchema({
    name: t.quality_title || 'Kalite Politikamız',
    description: t.quality_desc || 'Alo Yönetim kurumsal kalite ve hizmet yeterlilik politikası.',
    path: '/kurumsal/kalite-politikamiz',
    speakableSelectors: ['h1', '#quality-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, credentialLd, faqLd]} />
      <KalitePolitikamizClient lang={lang} />
    </>
  );
}
