import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
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

  const title = t.emp_meta_title || 'İstihdam Köprüsü — Tesis & Özel Güvenlik Kariyer Fırsatları | Alo Yönetim';
  const description = t.emp_meta_desc || 'İstanbul genelinde 5188 kimlikli özel güvenlik, temizlik personeli ve teknik bakım uzmanı açık iş pozisyonları ve kariyer başvurusu.';

  return buildMetadata({
    title,
    description,
    path: '/istihdam-koprusu',
    lang,
    ogImageType: 'default',
    keywords: [
      'özel güvenlik iş ilanları istanbul',
      'site yönetimi iş başvurusu',
      'tesis temizlik personeli arayanlar',
      'teknik bakım iş ilanları',
      'alo yönetim kariyer'
    ],
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
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.emp_page_title || 'İstihdam Köprüsü', url: '/istihdam-koprusu' }
  ]);

  const pageLd = webPageSchema({
    name: t.emp_page_title || 'İstihdam Köprüsü',
    description: t.emp_page_desc || 'Tesis yönetimi ve özel güvenlik sektöründe kariyer ve açık iş ilanları.',
    path: '/istihdam-koprusu',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <IstihdamKoprusuClient />
    </>
  );
}
