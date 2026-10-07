import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import KurumsalSurdurulebilirlikClient from './KurumsalSurdurulebilirlikClient';

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
    title: t.sust_corp_meta_title,
    description: t.sust_corp_meta_desc,
    path: '/kurumsal/surdurulebilirlik',
    lang,
    targetKeyword: 'yeşil bina tesis yönetimi',
    ogImageType: 'default',
    keywords: t.sust_corp_meta_keywords.split('|'),
  });
}

export default async function KurumsalSurdurulebilirlikPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home, url: '/' },
    { name: t.nav_corporate, url: '/kurumsal' },
    { name: t.sustainability_title, url: '/kurumsal/surdurulebilirlik' }
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.sustainability_title,
    description: t.sustainability_desc,
    path: '/kurumsal/surdurulebilirlik',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <KurumsalSurdurulebilirlikClient />
    </>
  );
}
