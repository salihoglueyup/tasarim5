import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import IstihdamKoprusuClient from './IstihdamKoprusuClient';

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
    title: t.ist_meta_title,
    description: t.ist_meta_desc,
    path: '/istihdam-koprusu',
    lang,
    ogImageType: 'default',
    keywords: t.ist_meta_keywords.split('|'),
  });
}

export default async function IstihdamKoprusuPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home, url: '/' },
    { name: t.ist_hero_crumb, url: '/istihdam-koprusu' }
  ]);

  const pageLd = webPageSchema({
    name: t.ist_hero_crumb,
    description: t.ist_page_ld_desc,
    path: '/istihdam-koprusu',
    speakableSelectors: ['h1', 'p', '#career-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <IstihdamKoprusuClient lang={lang} />
    </>
  );
}
