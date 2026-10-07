import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import SurdurulebilirlikClient from './SurdurulebilirlikClient';

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
    title: t.sust_hub_meta_title,
    description: t.sust_hub_meta_desc,
    path: '/surdurulebilirlik',
    lang,
    ogImageType: 'default',
    keywords: t.sust_hub_meta_keywords.split('|'),
  });
}

export default async function SurdurulebilirlikPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home, url: '/' },
    { name: t.sust_hub_title, url: '/surdurulebilirlik' },
  ]);

  const pageLd = webPageSchema({
    name: t.sust_hub_title,
    description: t.sust_hub_desc,
    path: '/surdurulebilirlik',
    speakableSelectors: ['h1', '#speakable-content'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <SurdurulebilirlikClient />
    </>
  );
}
