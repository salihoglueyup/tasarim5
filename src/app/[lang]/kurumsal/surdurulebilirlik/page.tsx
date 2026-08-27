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

  const title = t.sustainability_meta_title || 'Kurumsal Sürdürülebilirlik & Çevre Politikamız | Alo Yönetim';
  const description = t.sustainability_meta_desc || 'Sıfır atık, su geri kazanımı, yenilenebilir enerji entegrasyonu ve çevreye duyarlı kurumsal yönetim prensiplerimiz.';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/surdurulebilirlik',
    lang,
    ogImageType: 'default',
    keywords: [
      'kurumsal sürdürülebilirlik',
      'çevre politikası site yönetimi',
      'yeşil bina prensipleri',
      'alo yönetim esg'
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
