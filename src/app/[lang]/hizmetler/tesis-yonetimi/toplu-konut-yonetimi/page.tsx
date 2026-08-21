import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, serviceSchema, faqPageSchema } from '@/lib/schemas';
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
    title: 'Toplu Konut & TOKİ Site Yönetimi | Alo Yönetim İstanbul',
    description:
      'İstanbul toplu konut ve TOKİ projelerinde aidat optimizasyonu, KMK uyumlu yönetim, sosyal tesis işletmesi ve şeffaf bütçe planlaması. Daire başına %25-33 tasarruf.',
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
  void lang;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Hizmetler', url: '/hizmetler' },
    { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
    { name: 'Toplu Konut & Site Yönetimi', url: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Toplu Konut & Site Yönetimi',
    description:
      'İstanbul büyük ölçekli toplu konut ve sitelerde KMK uyumlu aidat yönetimi, sosyal tesis işletmesi, peyzaj bakımı ve %25-33 işletme tasarrufu.',
    path: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
    priceRange: '₺₺',
  });

  const faqLd = faqPageSchema([
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
  ]);

  const pageLd = webPageSchema({
    name: 'Toplu Konut & TOKİ Site Yönetimi | Alo Yönetim',
    description:
      'İstanbul toplu konut projelerinde aidat optimizasyonu, KMK uyumlu yönetim ve sosyal tesis işletmesi.',
    path: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
    speakableSelectors: ['h1', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, pageLd]} />
      <TopluKonutYonetimiClient />
    </>
  );
}
