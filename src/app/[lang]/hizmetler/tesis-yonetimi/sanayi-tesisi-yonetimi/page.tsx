import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { KeywordAnalysisSeo, VoiceSearchSpeakableSeo } from '@/components/seo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facilityCompleteGraphBuilder';
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
    title: 'Sanayi Tesisi, OSB ve Lojistik Depo Yönetimi | Alo Yönetim',
    description:
      'OSB, fabrika ve lojistik depolar için ağır vasıta trafik yönetimi, yüksek gerilim trafo bakımı ve endüstriyel güvenlik çözümleri. Teklifinizi alın!',
    path: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'sanayi tesis yönetimi',
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

  const faqs = [
    {
      question: 'Sanayi tesislerinde ISO 45001 uyumu nasıl sağlanır?',
      answer:
        'Risk değerlendirmesi, acil durum planları, güvenlik eğitimleri, KKD (kişisel koruyucu donanım) standartları ve periyodik iç denetimler ISO 45001 kapsamında uygulanır. Alo Yönetim bu süreçleri belgeli olarak yürütür.',
    },
    {
      question: 'Endüstriyel tesis bakım yönetimi nasıl planlanır?',
      answer:
        'Önleyici bakım takvimi (PPM) oluşturulur; kritik ekipmanlar için yedek parça stok yönetimi yapılır; arıza takibi dijital CMMS sistemi üzerinden yürütülür. Üretim sürekliliği birincil önceliktir.',
    },
    {
      question: 'Yangın güvenliği ve hidrofor sistemleri nasıl yönetilir?',
      answer:
        'Yangın söndürme sistemleri (sprinkler, gaz sistemi) yılda bir yetkili servis tarafından bakıma tabi tutulur; yangın hidroforu 3 ayda bir çalışma testi yapılır. Tüm belgeler düzenli tutulur.',
    },
    {
      question: 'Sanayi tesisinde perimetre güvenliği nasıl sağlanır?',
      answer:
        '5188 lisanslı devriyeli güvenlik, araç giriş-çıkış kayıt sistemi, termal kameralar ve gece görüş sistemleri ile güçlendirilmiş çevre güvenliği sağlanır.',
    },
    {
      question: 'Endüstriyel zemin ve atık yönetimi nasıl yapılır?',
      answer:
        'Endüstriyel zemin temizliği için özel makine ve kimyasallar kullanılır. Atık yönetimi çevre mevzuatı (Çevre Kanunu, ISO 14001) çerçevesinde belgelenmiş şekilde yürütülür.',
    },
  ];

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'sanayi-tesisi-yonetimi',
    name: 'Sanayi Tesisi & Fabrika Yönetimi',
    description:
      'İstanbul sanayi ve fabrika tesislerinde ISO 45001 iş güvenliği denetimi, ağır teknik bakım, yangın sistemi, perimetre güvenliği ve endüstriyel hijyen hizmetleri.',
    priceRange: '₺₺₺',
    lang,
    faqs,
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
        question="Sanayi tesisi yönetimi neleri kapsar?"
        directAnswer="Sanayi tesisi yönetimi; ISO 45001 iş güvenliği, ağır mekanik bakım, yangın sistemleri kontrolü ve 5188 perimetre güvenliğini kapsar."
        lang={lang}
      />
      <SanayiTesisiYonetimiClient />
    </>
  );
}
