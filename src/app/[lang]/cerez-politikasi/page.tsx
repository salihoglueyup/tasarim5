import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import CerezPolitikasiClient from './CerezPolitikasiClient';

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

  const title = t.cerez_title ? `${t.cerez_title} | Alo Yönetim` : 'Çerez Politikası | Alo Yönetim';
  const description = t.cerez_desc || 'Alo Yönetim web sitesi çerez (cookie) kullanım politikası ve veri toplama tercihleri rehberi.';

  return buildMetadata({
    title,
    description,
    path: '/cerez-politikasi',
    lang,
    ogImageType: 'default',
  });
}

export default async function CerezPolitikasiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.cerez_title || 'Çerez Politikası', url: '/cerez-politikasi' }
  ]);

  const pageLd = webPageSchema({
    name: t.cerez_title || 'Çerez Politikası',
    description: t.cerez_desc || 'Alo Yönetim web sitesi çerez politikası.',
    path: '/cerez-politikasi',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <CerezPolitikasiClient />
    </>
  );
}
