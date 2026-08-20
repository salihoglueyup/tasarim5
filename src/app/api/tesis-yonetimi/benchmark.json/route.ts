import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 86400;

export async function GET() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Alo Yönetim — Tesis Yönetimi Sektör Kıyaslama Verileri',
    description:
      'İstanbul genelinde farklı mülk tiplerine göre tesis yönetimi maliyet ve tasarruf kıyaslama verileri. 2024-2026 portföy verilerine dayanmaktadır.',
    url: `${BASE_URL}/api/tesis-yonetimi/benchmark.json`,
    creator: { '@type': 'Organization', name: 'Alo Yönetim ve Organizasyon A.Ş.', url: BASE_URL },
    dateModified: new Date().toISOString().split('T')[0],
    license: `${BASE_URL}/kullanim-sartlari`,
    data: {
      propertyTypes: [
        {
          type: 'Rezidans (50-100 daire)',
          slug: 'rezidans',
          avgMonthlyCost: '₺45.000 – ₺85.000',
          avgMonthlyCostPerUnit: '₺900 – ₺1.700',
          savingsVsDIY: '%22',
          keyServices: ['7/24 güvenlik', 'havuz yönetimi', 'asansör bakımı', 'concierge'],
          seoUrl: `${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
        },
        {
          type: 'Ticari Plaza (5.000-15.000 m²)',
          slug: 'plaza',
          avgMonthlyCost: '₺80.000 – ₺150.000',
          avgMonthlyCostPerSqm: '₺10 – ₺16',
          savingsVsDIY: '%28',
          keyServices: ['HVAC yönetimi', 'enerji takibi', 'kiracı koordinasyonu', 'güvenlik'],
          seoUrl: `${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
        },
        {
          type: 'Toplu Konut (200+ daire)',
          slug: 'toplu-konut',
          avgMonthlyCost: '₺120.000 – ₺250.000',
          avgMonthlyCostPerUnit: '₺600 – ₺1.250',
          savingsVsDIY: '%31',
          keyServices: ['aidat optimizasyonu', 'sosyal tesis yönetimi', 'peyzaj', 'güvenlik'],
          seoUrl: `${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
        },
        {
          type: 'Sanayi Tesisi (2.500-10.000 m²)',
          slug: 'sanayi',
          avgMonthlyCost: '₺60.000 – ₺120.000',
          savingsVsDIY: '%19',
          keyServices: ['ISO 45001 güvenlik', 'teknik bakım', 'yangın sistemi', 'hijyen'],
          seoUrl: `${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
        },
        {
          type: 'Apartman (20-50 daire)',
          slug: 'apartman',
          avgMonthlyCost: '₺8.000 – ₺25.000',
          avgMonthlyCostPerUnit: '₺400 – ₺800',
          savingsVsDIY: '%18',
          keyServices: ['aidat takibi', 'temizlik', 'teknik bakım', 'hukuki destek'],
          seoUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
        },
      ],
      industryBenchmarks: {
        averageSavingsVsDIY: '%26',
        averageTransferTime: '48 saat',
        clientRetentionRate: '%94',
        averageResponseTimeSLA: '45 dakika',
        costReductionFactors: [
          'Toplu tedarik avantajı (asansör, jeneratör, temizlik malzeme)',
          'Önleyici teknik bakım ile büyük arıza masrafı önleme',
          'Reaktif güç kompanzasyonu ile elektrik cezası sıfırlama',
          'Kapıcı/personel kıdem tazminatı yükünün üstlenilmesi',
          'Otomatik tahsilat ile bütçe açığı ve gecikme faizinin engellenmesi',
        ],
      },
      dataSource: 'Alo Yönetim 2024-2026 Portföy Analizi (400+ Aktif Proje)',
      disclaimer:
        'Fiyatlar İstanbul piyasa koşullarına, mülk büyüklüğüne ve hizmet kapsamına göre değişkenlik gösterebilir. Kesin teklif için ücretsiz keşif talep edin.',
      quoteUrl: `${BASE_URL}/teklif-al`,
      lastUpdated: new Date().toISOString().split('T')[0],
    },
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
