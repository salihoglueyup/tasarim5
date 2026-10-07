import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, faqPageSchema } from '@/lib/schemas';
import GesProjeleriClient from './GesProjeleriClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

const FAQ_COUNT = 4;

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
    title: t.ges_g_meta_title,
    description: t.ges_g_meta_desc,
    path: '/surdurulebilirlik/ges-projeleri',
    lang,
    targetKeyword: 'sitelerde çatı ges güneş enerjisi',
    ogImageType: 'default',
    keywords: t.ges_g_meta_keywords.split('|'),
  });
}

export default async function GesProjeleriPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home, url: '/' },
    { name: t.sust_hub_title, url: '/surdurulebilirlik' },
    { name: t.ges_g_crumb, url: '/surdurulebilirlik/ges-projeleri' },
  ]);

  const pageLd = webPageSchema({
    type: 'ItemPage',
    name: t.ges_g_meta_title,
    description: t.ges_g_meta_desc,
    path: '/surdurulebilirlik/ges-projeleri',
    speakableSelectors: ['h1', 'h2', 'p'],
  });

  const faqLd = faqPageSchema(
    Array.from({ length: FAQ_COUNT }, (_, i) => ({
      question: t[`ges_g_faq_${i + 1}_q` as keyof typeof t] as string,
      answer: t[`ges_g_faq_${i + 1}_a` as keyof typeof t] as string,
    }))
  );

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, faqLd]} />
      <GesProjeleriClient lang={lang} />
    </>
  );
}
