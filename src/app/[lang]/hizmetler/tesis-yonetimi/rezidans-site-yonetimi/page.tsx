import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import KeywordAnalysisSeo from '@/components/seo/district/KeywordAnalysisSeo';
import { VoiceSearchSpeakableSeo } from '@/components/seo/schema/VoiceSearchSpeakableSeo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import RezidansYonetimiClient from './RezidansYonetimiClient';

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
    title: t.rez_meta_title,
    description: t.rez_meta_desc,
    path: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    lang,
    targetKeyword: 'rezidans yönetimi',
    ogImageType: 'service',
    keywords: [
      'rezidans yönetimi',
      'rezidans yönetim şirketi',
      'rezidans tesis yönetimi',
      'lüks site yönetimi',
      'lüks konut yönetimi',
      'rezidans yönetim firmaları',
      'istanbul rezidans yönetimi',
      'concierge hizmeti istanbul',
      'lüks site güvenliği',
      'premium rezidans işletmesi',
    ],
  });
}

export default async function RezidansYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'rezidans-site-yonetimi',
    name: t.rez_graph_name,
    description: t.rez_graph_desc,
    priceRange: '₺₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q108846399',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title={t.rez_graph_name}
        description={t.rez_kw_desc}
        path="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi"
        targetKeyword="rezidans tesis yönetimi"
        keywords={['rezidans yönetimi', 'lüks site yönetimi', 'concierge', 'vip güvenlik']}
      />
      <VoiceSearchSpeakableSeo
      />
      <RezidansYonetimiClient />
    </>
  );
}
