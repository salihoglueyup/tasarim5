import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import VizyonMisyonClient from './VizyonMisyonClient';

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

  const title = t.vision_meta_title || 'Vizyon & Misyon — Geleceğin Akıllı Tesis Yönetimi | Alo Yönetim';
  const description = t.vision_meta_desc || 'Teknoloji, şeffaflık ve insan odaklı entegre tesis yönetimi vizyonumuzla yaşam alanlarında güven ve konfor standartlarını yükseltiyoruz.';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/vizyon-misyon',
    lang,
    ogImageType: 'default',
    keywords: [
      'alo yönetim vizyon',
      'alo yönetim misyon',
      'site yönetimi vizyonu',
      'akıllı tesis yönetimi',
      'şeffaf site işletmesi'
    ],
  });
}

export default async function VizyonMisyonPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_corporate || 'Kurumsal', url: '/kurumsal' },
    { name: t.vision_title || 'Vizyon & Misyon', url: '/kurumsal/vizyon-misyon' }
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.vision_title || 'Vizyon & Misyon',
    description: t.vision_desc || 'Alo Yönetim vizyon, misyon ve kurumsal değerleri.',
    path: '/kurumsal/vizyon-misyon',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <VizyonMisyonClient />
    </>
  );
}
