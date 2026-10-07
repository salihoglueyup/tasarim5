import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import KeywordAnalysisSeo from '@/components/seo/district/KeywordAnalysisSeo';
import { VoiceSearchSpeakableSeo } from '@/components/seo/schema/VoiceSearchSpeakableSeo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import PlazaYonetimiClient from './PlazaYonetimiClient';

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
    title: t.plz_meta_title,
    description: t.plz_meta_desc,
    path: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    lang,
    targetKeyword: 'plaza yönetimi',
    ogImageType: 'service',
    keywords: [
      'plaza yönetimi',
      'plaza yönetim şirketleri',
      'iş merkezi yönetimi',
      'plaza tesis yönetimi',
      'ofis binası yönetimi',
      'ticari bina yönetimi',
      'plaza yönetim firması',
      'kurumsal tesis yönetimi',
      'istanbul plaza yönetimi',
      'HVAC bina otomasyonu',
    ],
  });
}

export default async function PlazaYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'plaza-yonetimi',
    name: t.plz_graph_name,
    description: t.plz_graph_desc,
    priceRange: '₺₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q102163',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title={t.plz_graph_name}
        description={t.plz_kw_desc}
        path="/hizmetler/tesis-yonetimi/plaza-yonetimi"
        targetKeyword="plaza tesis yönetimi"
        keywords={['plaza yönetimi', 'iş merkezi yönetimi', 'hvac bakımı', 'enerji optimizasyonu']}
      />
      <VoiceSearchSpeakableSeo
      />
      <PlazaYonetimiClient />
    </>
  );
}
