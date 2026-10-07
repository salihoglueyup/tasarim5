import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import TesisYonetimiRehberClient from './TesisYonetimiRehberClient';

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
    title: t.rhb_meta_title,
    description: t.rhb_meta_desc,
    path: '/hizmetler/tesis-yonetimi/rehber',
    lang,
    ogImageType: 'service',
    keywords: [
      'tesis yönetim şirketi nasıl seçilir',
      'tesis yönetimi rehberi',
      'site yönetim şirketi seçme kriterleri',
      'tesis yönetimi teknik şartname örneği',
      'profesyonel tesis yönetimi nedir',
      'tesis yönetim sözleşmesi',
      'tesis yönetimi fiyat karşılaştırma',
      'tesis yönetim şirketi değerlendirme',
      'en iyi tesis yönetim firması',
      'tesis yönetimi 2026',
      'istanbul tesis yönetim şirketi seçimi',
    ],
  });
}

export default async function TesisYonetimiRehberPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'rehber',
    name: t.rhb_graph_name,
    description: t.rhb_graph_desc,
    priceRange: '₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q1391515',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <TesisYonetimiRehberClient />
    </>
  );
}
