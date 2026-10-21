import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import KeywordAnalysisSeo from '@/components/seo/district/KeywordAnalysisSeo';
import { VoiceSearchSpeakableSeo } from '@/components/seo/schema/VoiceSearchSpeakableSeo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import ReferenceBand from '@/components/sections/references/ReferenceBand';
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
  const t = await getDictionary(lang);
  return buildMetadata({
    title: t.san_meta_title,
    description: t.san_meta_desc,
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
  const t = await getDictionary(lang);

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'sanayi-tesisi-yonetimi',
    name: t.san_graph_name,
    description: t.san_graph_desc,
    priceRange: '₺₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q83405',
    speakableSelectors: ['h1', '#industrial-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title={t.san_graph_name}
        description={t.san_kw_desc}
        path="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi"
        targetKeyword="sanayi tesis yönetimi"
        keywords={['sanayi tesis yönetimi', 'fabrika yönetimi', 'endüstriyel bakım', 'perimetre güvenliği']}
      />
      <VoiceSearchSpeakableSeo
        pageUrl="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi"
        cssSelectors={['h1', '#industrial-instant-answer-text']}
      />
      <SanayiTesisiYonetimiClient />
      <div className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-gutter)] pb-16">
        <ReferenceBand
          limit={8}
          sectors={['ticari', 'is_merkezi']}
          slugs={[
            'iskent-sanayi-sitesi',
            'hursan-geri-donusum',
            'koza-gida',
            'miles-makine',
            'yavuz-metal',
            'gecem-dinlence',
            'sozcu-gazetesi',
            'kriter-a',
          ]}
        />
      </div>
    </>
  );
}
