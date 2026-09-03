import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
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

  const title = 'Sürdürülebilirlik ve Yeşil Tesis Yönetimi | Alo Yönetim';
  const description = 'Sitelerde sıfır atık, gri su geri kazanımı, GES çatı güneş enerjisi ve ISO 14001 çevre yönetim standartlarımız. Yeşil bina çözümlerimizi inceleyin!';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/surdurulebilirlik',
    lang,
    targetKeyword: 'yeşil bina tesis yönetimi',
    ogImageType: 'default',
    keywords: [
      'kurumsal sürdürülebilirlik',
      'yeşil bina tesis yönetimi',
      'çevre politikası site yönetimi',
      'yeşil bina prensipleri',
      'alo yönetim esg',
      'iso 14001 çevre yönetimi'
    ],
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
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_corporate || 'Kurumsal', url: '/kurumsal' },
    { name: t.sustainability_title || 'Sürdürülebilirlik', url: '/kurumsal/surdurulebilirlik' }
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.sustainability_title || 'Kurumsal Sürdürülebilirlik',
    description: t.sustainability_desc || 'Alo Yönetim kurumsal sürdürülebilirlik ve çevre ilkeleri.',
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
