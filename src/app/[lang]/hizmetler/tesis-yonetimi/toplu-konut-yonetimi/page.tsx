import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import KeywordAnalysisSeo from '@/components/seo/district/KeywordAnalysisSeo';
import { VoiceSearchSpeakableSeo } from '@/components/seo/schema/VoiceSearchSpeakableSeo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import TopluKonutYonetimiClient from './TopluKonutYonetimiClient';

export const revalidate = 86400;

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
    title: t.tkn_meta_title,
    description: t.tkn_meta_desc,
    path: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'toplu konut tesis yönetimi',
      'tesis yönetimi toplu konut',
      'mega site tesis yönetimi',
      'TOKİ site yönetimi',
      'büyük site yönetimi',
      'toplu konut aidat yönetimi',
      'KMK uyumlu yönetim',
      'sosyal tesis yönetimi',
      'toplu konut yönetim şirketi',
      'istanbul toplu konut yönetimi',
      'büyük site yönetim firması',
      'konut yönetim şirketi',
    ],
  });
}

export default async function TopluKonutYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'toplu-konut-yonetimi',
    name: t.tkn_graph_name,
    description: t.tkn_graph_desc,
    priceRange: '₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q1391515',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title={t.tkn_graph_name}
        description={t.tkn_kw_desc}
        path="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi"
        targetKeyword="toplu konut yönetimi"
        keywords={['toplu konut yönetimi', 'site yönetimi', 'toki site yönetimi', 'aidat optimizasyonu']}
      />
      <VoiceSearchSpeakableSeo
      />
      <TopluKonutYonetimiClient />
    </>
  );
}
