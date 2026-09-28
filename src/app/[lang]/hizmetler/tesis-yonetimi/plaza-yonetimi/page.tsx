import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
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
  return buildMetadata({
    title: 'Plaza Tesis Yönetimi — A+ İş Merkezi & Ofis İşletmesi | Alo Yönetim',
    description:
      'İstanbul genelinde A+ plazalar, iş kuleleri ve ticari merkezler için 5188 lisanslı güvenlik, HVAC/BMS otomasyonu, kesintisiz jeneratör ve %30 enerji tasarruflu plaza yönetimi.',
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

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'plaza-yonetimi',
    name: 'Plaza & Ofis Binası Tesis Yönetimi',
    description:
      'İstanbul plaza ve iş merkezleri için HVAC iklimlendirme, enerji optimizasyonu, kiracı koordinasyonu ve ISO 41001 standartlarında entegre tesis yönetimi.',
    priceRange: '₺₺₺',
    lang,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q102163',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title="Plaza & Ofis Binası Tesis Yönetimi"
        description="İstanbul plaza ve iş merkezleri için kurumsal HVAC ve tesis işletmesi."
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
