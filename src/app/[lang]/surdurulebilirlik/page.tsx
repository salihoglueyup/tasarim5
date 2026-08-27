import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
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

  const title = t.sust_hub_meta_title || 'Sürdürülebilirlik & Yeşil Tesis Yönetimi | Alo Yönetim';
  const description = t.sust_hub_meta_desc || 'ISO 14001 çevre yönetimi, Sıfır Atık belgelendirmesi, çatı GES güneş enerjisi ve enerji verimliliği odaklı modern tesis işletmesi.';

  return buildMetadata({
    title,
    description,
    path: '/surdurulebilirlik',
    lang,
    ogImageType: 'default',
    keywords: [
      'sürdürülebilir tesis yönetimi',
      'yeşil bina yönetimi',
      'sıfır atık belgesi site',
      'iso 14001 çevre yönetimi',
      'çatı ges güneş enerjisi',
      'enerji verimliliği bina'
    ],
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
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.sust_hub_title || 'Sürdürülebilirlik', url: '/surdurulebilirlik' },
  ]);

  const pageLd = webPageSchema({
    name: t.sust_hub_title || 'Sürdürülebilirlik ve Yeşil Tesis Yönetimi',
    description: t.sust_hub_desc || 'Alo Yönetim çevreye duyarlı yeşil tesis yönetimi ve ESG politikaları.',
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
