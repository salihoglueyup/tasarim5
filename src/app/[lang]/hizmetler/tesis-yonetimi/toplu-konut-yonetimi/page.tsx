import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
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
  return buildMetadata({
    title: 'Toplu Konut Tesis Yönetimi — Mega Siteler & %30 Tasarruf | Alo Yönetim',
    description:
      '500+ konutluk siteler ve toplu yapılarda ISO 41001 standartlarında entegre tesis yönetimi, merkezi işletme projesi ve %30 aidat tasarrufu. 48 saatte teklif alın!',
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

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'toplu-konut-yonetimi',
    name: 'Toplu Konut & TOKİ Site Yönetimi',
    description:
      'İstanbul genelinde büyük ölçekli toplu konut ve sitelerde KMK uyumlu aidat yönetimi, sosyal tesis işletmesi, peyzaj bakımı ve %25-33 işletme tasarrufu sağlayan profesyonel tesis yönetimi.',
    priceRange: '₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q1391515',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title="Toplu Konut & TOKİ Site Yönetimi"
        description="İstanbul büyük ölçekli siteler ve toplu konutlar için profesyonel KMK yönetimi."
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
