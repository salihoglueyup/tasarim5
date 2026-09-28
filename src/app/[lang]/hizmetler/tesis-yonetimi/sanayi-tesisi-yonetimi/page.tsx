import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/schema/JsonLd';
import KeywordAnalysisSeo from '@/components/seo/district/KeywordAnalysisSeo';
import { VoiceSearchSpeakableSeo } from '@/components/seo/schema/VoiceSearchSpeakableSeo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import SanayiTesisiYonetimiClient from './SanayiTesisiYonetimiClient';

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
    title: 'Sanayi Tesisi Yönetimi — Fabrika, Depo & OSB İşletmesi | Alo Yönetim',
    description:
      'OSB, fabrika ve lojistik depolar için ISO 45001 İSG ve ISO 41001 standartlarında entegre tesis yönetimi, 34.5 kV trafo bakımı ve endüstriyel güvenlik.',
    path: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'sanayi tesis yönetimi',
      'tesis yönetimi sanayi',
      'fabrika tesis yönetimi',
      'endüstriyel tesis yönetimi',
      'ISO 45001 tesis yönetimi',
      'sanayi güvenliği',
      'fabrika bakım yönetimi',
      'lojistik tesis yönetimi',
      'sanayi yönetim şirketi',
      'endüstriyel güvenlik istanbul',
      'fabrika yönetim firması',
    ],
  });
}

export default async function SanayiTesisiYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'sanayi-tesisi-yonetimi',
    name: 'Sanayi Tesisi & Fabrika Yönetimi',
    description:
      'İstanbul sanayi ve fabrika tesislerinde ISO 45001 iş güvenliği denetimi, ağır teknik bakım, yangın sistemi, perimetre güvenliği ve endüstriyel hijyen hizmetleri.',
    priceRange: '₺₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q83405',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title="Sanayi Tesisi & Fabrika Tesis Yönetimi"
        description="İstanbul sanayi tesisleri ve fabrikalar için ağır teknik bakım ve ISO 45001 tesis işletmesi."
        path="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi"
        targetKeyword="sanayi tesis yönetimi"
        keywords={['sanayi tesis yönetimi', 'fabrika yönetimi', 'endüstriyel bakım', 'perimetre güvenliği']}
      />
      <VoiceSearchSpeakableSeo
      />
      <SanayiTesisiYonetimiClient />
    </>
  );
}
