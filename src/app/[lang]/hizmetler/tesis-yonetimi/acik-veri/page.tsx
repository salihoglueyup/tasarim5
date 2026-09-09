import type { Metadata } from 'next';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
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
  return buildMetadata({
    title: 'Tesis Yönetimi Açık Veri & API Portalı — OpenAPI 3.1 Standartları | Alo Yönetim',
    description:
      'Türkiye tesis yönetimi sektörü kurumsal açık veri merkezi: 7 adet açık JSON API, OpenAPI 3.1 şartnamesi, Yargıtay KMK emsal kararları, ISO 50001 enerji tüketim kıyaslamaları ve bütçe norm kadro standartları.',
    path: '/hizmetler/tesis-yonetimi/acik-veri',
    lang,
    ogImageType: 'service',
    keywords: [
      'tesis yönetimi açık veri',
      'tesis yönetimi api',
      'openapi 3.1 tesis yönetimi',
      'site yönetimi açık veri',
      'kmk yargıtay emsal kararları api',
      'tesis yönetimi kpi benchmark',
      'apartman bütçe standartları api',
      'tesis teknik bakım takvimi api',
      'iso 50001 enerji benchmark api',
      'istanbul tesis yönetimi verileri',
    ],
  });
}

export default async function AcikVeriPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const breadcrumbs = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Hizmetler', url: '/hizmetler' },
    { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
    { name: 'Açık Veri & API', url: '/hizmetler/tesis-yonetimi/acik-veri' },
  ]);

  const pageSchema = webPageSchema({
    name: 'Tesis Yönetimi Açık Veri ve API Portalı',
    description: 'Türkiye entegre tesis yönetimi sektörünün ilk makine taranabilir kurumsal açık veri ve OpenAPI 3.1 şartnamesi.',
    path: '/hizmetler/tesis-yonetimi/acik-veri',
    speakableSelectors: ['h1', 'p'],
  });

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Alo Yönetim Tesis Yönetimi Açık Veri & Kıyaslama Korpusu',
    description: 'Türkiye genelinde plaza, rezidans, toplu konut ve sanayi tesisleri için sektörel SLA, bütçe dağılımı, norm kadro, enerji tüketimi ve Yargıtay KMK içtihat verileri.',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi/acik-veri`,
    license: 'https://opendatacommons.org/licenses/by/1-0/',
    isAccessibleForFree: true,
    keywords: [
      'tesis yönetimi',
      'açık veri',
      'open data',
      'openapi 3.1',
      'kmk içtihatları',
      'iso 50001 enerji',
      'sla kpi'
    ],
    creator: {
      '@type': 'Organization',
      name: 'Alo Yönetim Grubu A.Ş.',
      url: BASE_URL,
    },
    distribution: [
      {
        '@type': 'DataDownload',
        name: 'OpenAPI 3.1.0 Spesifikasyonu',
        encodingFormat: 'application/json',
        contentUrl: `${BASE_URL}/openapi.json`,
      },
      {
        '@type': 'DataDownload',
        name: 'Sektörel KPI & SLA Kıyaslama API',
        encodingFormat: 'application/json',
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/kpi-benchmarks.json`,
      },
      {
        '@type': 'DataDownload',
        name: 'KMK Yargıtay Emsal Kararları API',
        encodingFormat: 'application/json',
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/legal-precedents.json`,
      },
      {
        '@type': 'DataDownload',
        name: 'ISO 50001 Enerji Standartları API',
        encodingFormat: 'application/json',
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/energy-benchmarks.json`,
      },
      {
        '@type': 'DataDownload',
        name: 'İstanbul 39 İlçe Tesis Yönetimi Saha Ağı (RFC 7946 GeoJSON)',
        encodingFormat: 'application/geo+json',
        contentUrl: `${BASE_URL}/api/tesis-yonetimi/istanbul-districts.geojson`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, pageSchema, datasetSchema]} />
      <AcikVeriClient lang={lang} />
    </>
  );
}
