import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import GizlilikPolitikasiClient from './GizlilikPolitikasiClient';

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

  const title = t.gizlilik_title ? `${t.gizlilik_title} | Alo Yönetim` : 'Gizlilik Politikası | Alo Yönetim';
  const description = t.gizlilik_desc || 'Alo Yönetim web sitesi ve mobil uygulamaları kullanıcı gizlilik politikası ve veri güvenliği ilkeleri.';

  return buildMetadata({
    title,
    description,
    path: '/gizlilik-politikasi',
    lang,
    ogImageType: 'default',
  });
}

export default async function GizlilikPolitikasiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.gizlilik_title || 'Gizlilik Politikası', url: '/gizlilik-politikasi' }
  ]);

  const pageLd = webPageSchema({
    name: t.gizlilik_title || 'Gizlilik Politikası',
    description: t.gizlilik_desc || 'Alo Yönetim kullanıcı gizlilik sözleşmesi.',
    path: '/gizlilik-politikasi',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <GizlilikPolitikasiClient />
    </>
  );
}
