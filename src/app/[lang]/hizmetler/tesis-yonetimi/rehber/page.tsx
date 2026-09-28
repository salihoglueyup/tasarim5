import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
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
  return buildMetadata({
    title: 'Tesis Yönetim Şirketi Nasıl Seçilir? 2026 Seçim & Şartname Rehberi | Alo Yönetim',
    description:
      'Site ve tesis yönetim şirketi seçerken dikkat edilmesi gerekenler: B2B teknik şartname hazırlığı (RFP), 5188 lisansı, KMK m.34 devir protokolü, bütçe denetimi ve 10 maddelik firma skorkartı.',
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

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'rehber',
    name: 'Tesis Yönetimi Seçim ve Geçiş Rehberi',
    description:
      'Profesyonel tesis yönetim şirketi seçerken dikkat edilmesi gereken ISO sertifikaları, 5188 lisansı, sözleşme maddeleri ve değerlendirme kriterleri rehberi.',
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
