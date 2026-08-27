import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import KullanimSartlariClient from './KullanimSartlariClient';

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

  const title = t.kullanim_title ? `${t.kullanim_title} | Alo Yönetim` : 'Kullanım Şartları | Alo Yönetim';
  const description = t.kullanim_desc || 'Alo Yönetim web platformu ve dijital hizmetleri kullanım koşulları ve yasal sorumluluklar.';

  return buildMetadata({
    title,
    description,
    path: '/kullanim-sartlari',
    lang,
    ogImageType: 'default',
  });
}

export default async function KullanimSartlariPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.kullanim_title || 'Kullanım Şartları', url: '/kullanim-sartlari' }
  ]);

  const pageLd = webPageSchema({
    name: t.kullanim_title || 'Kullanım Şartları',
    description: t.kullanim_desc || 'Alo Yönetim web sitesi kullanım koşulları.',
    path: '/kullanim-sartlari',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <KullanimSartlariClient />
    </>
  );
}
