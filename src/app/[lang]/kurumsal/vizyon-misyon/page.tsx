import type { Metadata } from 'next';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
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

  return buildMetadata({
    title: t.viz_meta_title,
    description: t.viz_meta_desc,
    path: '/kurumsal/vizyon-misyon',
    lang,
    targetKeyword: 'alo yönetim vizyon ve misyon',
    ogImageType: 'default',
    keywords: t.viz_meta_keywords.split('|'),
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
    { name: t.nav_home, url: '/' },
    { name: t.nav_corporate, url: '/kurumsal' },
    { name: t.vision_title, url: '/kurumsal/vizyon-misyon' },
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t.viz_meta_title,
    description: t.viz_meta_desc,
    path: '/kurumsal/vizyon-misyon',
    speakableSelectors: ['h1', 'h2', 'p'],
  });

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: 'Alo Yönetim Mülk & Entegre Tesis Yönetimi',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    foundingDate: '2009',
    description: t.viz_org_desc,
    knowsAbout: [
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      '5188 Sayılı Özel Güvenlik Hizmetleri Kanunu',
      'Açık Kasa Şeffaf Bütçe ve Aidat Yönetimi',
      'Entegre Tesis ve Rezidans İşletmeciliği',
    ],
    // guvenlikkursu.com: Alo Yönetim'in EGM onaylı eğitim kurumu
    sameAs: ['https://www.guvenlikkursu.com/'],
  };

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, organizationLd]} />
      <VizyonMisyonClient lang={lang} />
    </>
  );
}
