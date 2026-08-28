import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { KeywordAnalysisSeo, VoiceSearchSpeakableSeo } from '@/components/seo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facilityCompleteGraphBuilder';
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
  return buildMetadata({
    title: 'Rezidans & Lüks Site Yönetimi — Konsiyerj & 5188 Güvenlik | Alo Yönetim',
    description:
      'İstanbul geneli lüks rezidans ve siteler için 7/24 konsiyerj, 5188 lisanslı güvenlik, havuz hijyeni ve %30 tasarruflu şeffaf aidat yönetimi. Teklif alın!',
    path: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'rezidans tesis yönetimi',
      'lüks site yönetimi',
      'rezidans yönetim şirketi',
      'lüks konut yönetimi',
      'rezidans aidat yönetimi',
      'istanbul rezidans yönetimi',
      'concierge hizmeti istanbul',
      'lüks site güvenliği',
      'premium tesis yönetimi',
      'rezidans site yönetim firması',
    ],
  });
}

export default async function RezidansYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const faqs = [
    {
      question: 'Rezidans tesis yönetimi normal site yönetiminden nasıl farklıdır?',
      answer:
        'Rezidanslarda concierge hizmetleri, valet park, lobi yönetimi, VIP güvenlik protokolleri ve sakin memnuniyet anketleri standart olarak uygulanır. Hizmet kalitesi, mülk değerini doğrudan etkiler.',
    },
    {
      question: 'Lüks rezidanslarda güvenlik nasıl sağlanır?',
      answer:
        '5188 lisanslı güvenlik personeli, 24 saat lobi görevlisi, CCTV izleme, araç plaka tanıma (PTS) ve ziyaretçi kayıt sistemleri entegre olarak çalışır.',
    },
    {
      question: 'Havuz ve spa alanları nasıl yönetilir?',
      answer:
        'Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği kapsamında günlük klor/pH ölçümü, haftalık temizlik, aylık su analizi ve yıllık filtre bakımı gerçekleştirilir.',
    },
    {
      question: 'Rezidans aidat yönetimi nasıl işler?',
      answer:
        'KMK m.37 işletme projesi hazırlanır; SMS ve kredi kartı ile online tahsilat sağlanır. Geciken ödemeler için yasal ihtar ve icra süreci otomatik olarak başlatılır.',
    },
    {
      question: 'Rezidans yönetiminde mülk değerini nasıl korursunuz?',
      answer:
        'Önleyici teknik bakım, yüksek standartlı temizlik, peyzaj ve dış cephe bakımı ile düzenli denetim raporları, rezidansın piyasa değerini ve sakin memnuniyetini üst seviyede tutar.',
    },
  ];

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'rezidans-site-yonetimi',
    name: 'Rezidans & Lüks Site Yönetimi',
    description:
      'İstanbul genelinde lüks rezidans ve konut kuleleri için 7/24 concierge, 5188 VIP güvenlik, havuz & spa bakımı ve ISO 41001 standartlarında entegre tesis yönetimi.',
    priceRange: '₺₺₺',
    lang,
    faqs,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q108846399',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title="Rezidans & Lüks Site Yönetimi"
        description="İstanbul rezidans ve lüks siteler için VIP tesis yönetimi."
        path="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi"
        targetKeyword="rezidans tesis yönetimi"
        keywords={['rezidans yönetimi', 'lüks site yönetimi', 'concierge', 'vip güvenlik']}
      />
      <VoiceSearchSpeakableSeo
        question="Rezidans tesis yönetimi neleri kapsar?"
        directAnswer="Rezidans tesis yönetimi; concierge, VIP güvenlik, lobi karşılama, havuz spa bakımı ve KMK uyumlu şeffaf aidat tahsilatını kapsar."
        lang={lang}
      />
      <RezidansYonetimiClient />
    </>
  );
}
