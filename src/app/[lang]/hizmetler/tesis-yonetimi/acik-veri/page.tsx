import type { Metadata } from 'next';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import AcikVeriClient from './AcikVeriClient';

export const revalidate = 86400; // 24 saat ISR

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
    title: t.acv_meta_title,
    description: t.acv_meta_desc,
    path: '/hizmetler/tesis-yonetimi/acik-veri',
    lang,
    ogImageType: 'service',
    keywords: t.acv_meta_keywords.split('|'),
  });
}

export default async function AcikVeriPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbs = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Hizmetler', url: '/hizmetler' },
    { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
    { name: t.acv_breadcrumb, url: '/hizmetler/tesis-yonetimi/acik-veri' },
  ]);

  const pageSchema = webPageSchema({
    name: t.acv_graph_name,
    description: t.acv_graph_desc,
    path: '/hizmetler/tesis-yonetimi/acik-veri',
    speakableSelectors: ['h1', 'p'],
  });

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: t.acv_dataset_name,
    description: t.acv_dataset_desc,
    url: `${BASE_URL}/hizmetler/tesis-yonetimi/acik-veri`,
    isAccessibleForFree: true,
    keywords: t.acv_meta_keywords.split('|'),
    creator: {
      '@type': 'Organization',
      name: 'Alo Yönetim Grubu A.Ş.',
      url: BASE_URL,
    },
    distribution: [
      { '@type': 'DataDownload', name: 'OpenAPI', encodingFormat: 'application/json', contentUrl: `${BASE_URL}/openapi.json` },
      { '@type': 'DataDownload', name: 'dues-index', encodingFormat: 'application/json', contentUrl: `${BASE_URL}/api/tesis-yonetimi/dues-index.json` },
      { '@type': 'DataDownload', name: 'benchmark', encodingFormat: 'application/json', contentUrl: `${BASE_URL}/api/tesis-yonetimi/benchmark.json` },
      { '@type': 'DataDownload', name: 'kmk-law-index', encodingFormat: 'application/json', contentUrl: `${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json` },
      { '@type': 'DataDownload', name: 'legal-precedents', encodingFormat: 'application/json', contentUrl: `${BASE_URL}/api/tesis-yonetimi/legal-precedents.json` },
      { '@type': 'DataDownload', name: 'dictionary', encodingFormat: 'application/json', contentUrl: `${BASE_URL}/api/tesis-yonetimi/dictionary.json` },
      { '@type': 'DataDownload', name: 'faq', encodingFormat: 'application/json', contentUrl: `${BASE_URL}/api/tesis-yonetimi/faq.json` },
      { '@type': 'DataDownload', name: 'istanbul-districts', encodingFormat: 'application/geo+json', contentUrl: `${BASE_URL}/api/tesis-yonetimi/istanbul-districts.geojson` },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, pageSchema, datasetSchema]} />
      <AcikVeriClient lang={lang} />
    </>
  );
}
