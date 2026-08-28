import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { KeywordAnalysisSeo, VoiceSearchSpeakableSeo } from '@/components/seo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facilityCompleteGraphBuilder';
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
    title: 'Plaza & İş Merkezi Tesis Yönetimi — A+ Bina Yönetim Şirketi | Alo Yönetim',
    description:
      'İstanbul geneli A+ plazalar ve iş merkezleri için HVAC otomasyonu, turnike güvenliği ve enerji tasarrufu odaklı entegre tesis yönetimi. 48 saatte teklif alın!',
    path: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'plaza tesis yönetimi',
      'ofis binası yönetimi',
      'ticari bina yönetimi',
      'iş merkezi yönetimi',
      'plaza yönetim şirketi',
      'HVAC yönetimi istanbul',
      'ofis yönetim firması',
      'kurumsal tesis yönetimi',
      'ticari tesis yönetimi istanbul',
      'AVM yönetimi',
    ],
  });
}

export default async function PlazaYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const faqs = [
    {
      question: 'Plaza tesis yönetiminde en kritik hizmetler nelerdir?',
      answer:
        'HVAC sistemlerinin merkezi bakımı, enerji optimizasyonu, kiracı geçiş ve çıkış protokolleri, asansör/yürüyen merdiven bakımı ve 7/24 teknik destek plazalarda kritik öneme sahiptir.',
    },
    {
      question: 'Ticari binada enerji tasarrufu nasıl sağlanır?',
      answer:
        'Kompanzasyon sistemi ile reaktif güç cezası sıfırlanır; HVAC programlaması ile boş saatlerde enerji tüketimi azaltılır; LED dönüşümü ve akıllı aydınlatma sistemleri uygulanır. Ortalama %15-25 enerji tasarrufu elde edilir.',
    },
    {
      question: 'Kiracı yönetimi nasıl koordine edilir?',
      answer:
        'Her kiracı için bağımsız bölüm teslim-iade protokolü, ortak alan kullanım kuralları ve güvenlik kimlik kartı sistemi uygulanır. Kiracı şikayetleri dijital portal üzerinden takip edilir.',
    },
    {
      question: 'Plaza güvenliği nasıl sağlanır?',
      answer:
        '5188 lisanslı güvenlik personeli, araç plaka tanıma sistemi (PTS), turnike girişleri, CCTV izleme ve 7/24 güvenlik kontrol merkezi ile kapsamlı güvenlik sağlanır.',
    },
    {
      question: 'Acil teknik arızalarda müdahale süresi ne kadar?',
      answer:
        'SLA kapsamında kritik teknik arızalarda (asansör, HVAC, jeneratör) maksimum 45 dakika müdahale süresi taahhüt edilir. 7/24 acil teknik ekibimiz sahada hazır bulunur.',
    },
  ];

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'plaza-yonetimi',
    name: 'Plaza & Ofis Binası Tesis Yönetimi',
    description:
      'İstanbul plaza ve iş merkezleri için HVAC iklimlendirme, enerji optimizasyonu, kiracı koordinasyonu ve ISO 41001 standartlarında entegre tesis yönetimi.',
    priceRange: '₺₺₺',
    lang,
    faqs,
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
        question="Plaza tesis yönetimi neleri kapsar?"
        directAnswer="Plaza tesis yönetimi; HVAC iklimlendirme, turnike güvenlik kontrolü, enerji tasarrufu ve kiracı yönetimini kapsar."
        lang={lang}
      />
      <PlazaYonetimiClient />
    </>
  );
}
