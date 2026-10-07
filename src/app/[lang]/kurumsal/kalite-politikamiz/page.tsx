import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, faqPageSchema, ORG_ID, ORG_CREDENTIALS } from '@/lib/schemas';
import { QUALITY_FAQ_COUNT } from '@/components/seo/quality/qualityData';
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

  return buildMetadata({
    title: t.qlt_meta_title,
    description: t.qlt_meta_desc,
    path: '/kurumsal/kalite-politikamiz',
    lang,
    targetKeyword: 'site yönetimi kalite politikası',
    ogImageType: 'default',
    keywords: t.qlt_meta_keywords.split('|'),
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
    { name: t.nav_home, url: '/' },
    { name: t.nav_corporate, url: '/kurumsal' },
    { name: t.quality_title, url: '/kurumsal/kalite-politikamiz' }
  ]);

  const credentialLd = {
    '@type': 'Organization',
    '@id': ORG_ID,
    hasCredential: ORG_CREDENTIALS
  };

  const faqLd = faqPageSchema(
    Array.from({ length: QUALITY_FAQ_COUNT }, (_, i) => ({
      question: t[`qlt_faq_${i + 1}_q` as keyof typeof t] as string,
      answer: t[`qlt_faq_${i + 1}_a` as keyof typeof t] as string,
    }))
  );

  const pageLd = webPageSchema({
    name: t.quality_title,
    description: t.quality_desc,
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
