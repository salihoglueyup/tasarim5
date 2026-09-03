import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { KeywordAnalysisSeo, VoiceSearchSpeakableSeo } from '@/components/seo';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facilityCompleteGraphBuilder';
import TopluKonutYonetimiClient from './TopluKonutYonetimiClient';

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
    title: 'Toplu Konut ve Mega Site Yönetimi Hizmeti | Alo Yönetim',
    description:
      '500+ konutluk siteler ve toplu yapılarda merkezi işletme projesi, geniş peyzaj ve %30 aidat tasarruflu profesyonel yönetim. 48 saatte teklif alın!',
    path: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
    lang,
    ogImageType: 'service',
    keywords: [
      'toplu konut yönetimi',
      'TOKİ site yönetimi',
      'büyük site yönetimi',
      'toplu konut aidat yönetimi',
      'KMK uyumlu yönetim',
      'sosyal tesis yönetimi',
      'toplu konut yönetim şirketi',
      'istanbul toplu konut yönetimi',
      'büyük site yönetim firması',
      'konut yönetim şirketi',
    ],
  });
}

export default async function TopluKonutYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const faqs = [
    {
      question: 'Toplu konut yönetiminde aidat nasıl optimize edilir?',
      answer:
        'Toplu satın alma, hizmet konsolidasyonu ve enerji tasarrufu projeleri aracılığıyla büyük sitelerde daire başına aidatı %25-33 düşürmek mümkündür. Sosyal tesis işletmesinin gelire katkısı da aidatı azaltır.',
    },
    {
      question: '200 daireli bir sitede ne tür hizmetler verilir?',
      answer:
        '5188 güvenlik, ortak alan temizliği, asansör ve jeneratör bakımı, havuz & peyzaj yönetimi, aidat takibi, KMK hukuki danışmanlığı ve sosyal tesis (spor salonu, oyun parkı) işletmesi entegre olarak sunulur.',
    },
    {
      question: 'KMK\'ya uyum nasıl sağlanır?',
      answer:
        'KMK m.37 işletme projesi yıllık hazırlanır, m.29 kapsamında olağan genel kurul Ocak ayında yapılır, m.20 gereği gider paylaşımı arsa payına göre uygulanır. Tüm yasal süreçler Alo Yönetim tarafından takip edilir.',
    },
    {
      question: 'Sosyal tesisler (spor salonu, yüzme havuzu) nasıl işletilir?',
      answer:
        'Sosyal tesisler için ayrı işletme bütçesi oluşturulur; kullanım rezervasyon sistemi kurulur; temizlik ve teknik bakım günlük yapılır. Gelir, site bütçesine katkı olarak aktarılır.',
    },
    {
      question: 'Büyük sitede aidat geciktirenlere nasıl müdahale edilir?',
      answer:
        'Otomatik SMS hatırlatma, WhatsApp bildirim, avukat ihtarı ve KMK m.20 kapsamında icra takibi süreçleri aşamalı uygulanır. Tahsilat oranı %98\'in üzerinde tutulur.',
    },
  ];

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'toplu-konut-yonetimi',
    name: 'Toplu Konut & TOKİ Site Yönetimi',
    description:
      'İstanbul genelinde büyük ölçekli toplu konut ve sitelerde KMK uyumlu aidat yönetimi, sosyal tesis işletmesi, peyzaj bakımı ve %25-33 işletme tasarrufu sağlayan profesyonel tesis yönetimi.',
    priceRange: '₺₺',
    lang,
    faqs,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q1391515',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <KeywordAnalysisSeo
        title="Toplu Konut & TOKİ Site Yönetimi"
        description="İstanbul büyük ölçekli siteler ve toplu konutlar için profesyonel KMK yönetimi."
        path="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi"
        targetKeyword="toplu konut yönetimi"
        keywords={['toplu konut yönetimi', 'site yönetimi', 'toki site yönetimi', 'aidat optimizasyonu']}
      />
      <VoiceSearchSpeakableSeo
        question="Toplu konut yönetimi nasıl yapılır?"
        directAnswer="Toplu konut yönetimi; 634 sayılı KMK kapsamında kat malikleri genel kurulu, yıllık işletme projesi, 5188 güvenlik ve şeffaf aidat takibi ile yapılır."
        lang={lang}
      />
      <TopluKonutYonetimiClient />
    </>
  );
}
