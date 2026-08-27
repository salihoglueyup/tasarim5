import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import KvkkClient from './KvkkClient';

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

  const title = t.kvkk_page_title ? `${t.kvkk_page_title} | Alo Yönetim` : 'KVKK ve Aydınlatma Metni | Alo Yönetim';
  const description = t.kvkk_page_desc || '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca veri işleme, saklama ve imha aydınlatma metni.';

  return buildMetadata({
    title,
    description,
    path: '/kvkk-ve-aydinlatma-metni',
    lang,
    ogImageType: 'default',
  });
}

export default async function KvkkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.kvkk_page_title || 'KVKK ve Aydınlatma Metni', url: '/kvkk-ve-aydinlatma-metni' }
  ]);

  const pageLd = webPageSchema({
    name: t.kvkk_page_title || 'KVKK ve Aydınlatma Metni',
    description: t.kvkk_page_desc || '6698 sayılı KVKK aydınlatma metni ve kişisel verilerin korunması politikası.',
    path: '/kvkk-ve-aydinlatma-metni',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <KvkkClient />
    </>
  );
}
