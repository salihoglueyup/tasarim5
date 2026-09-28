import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, faqPageSchema, ORG_ID, ORG_CREDENTIALS } from '@/lib/schemas';
import { QUALITY_FAQS } from '@/components/seo/quality/qualityData';
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

  const title = 'Kalite Politikamız — ILAS Akrediteli ISO Belgeleri | Alo Yönetim';
  const description = 'BELCERT/ILAS belgeli ISO 45001, ISO 14001, ISO 10002, ISO 22301, ISO 31000 ve ISO 26000 yönetim sistemleriyle tavizsiz kalite ve yılda 48 habersiz iç denetim politikamız.';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/kalite-politikamiz',
    lang,
    targetKeyword: 'site yönetimi kalite politikası',
    ogImageType: 'default',
    keywords: [
      'alo yönetim kalite politikası',
      'iso 45001 site yönetimi',
      'iso 10002 müşteri memnuniyeti',
      'site yönetimi hizmet kalitesi',
      'ilas akrediteli iso belgeleri',
      'puko kalite dongusu'
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
    hasCredential: ORG_CREDENTIALS
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
