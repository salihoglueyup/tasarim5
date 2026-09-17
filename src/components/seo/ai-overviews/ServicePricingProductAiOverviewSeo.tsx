"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface PricingPackageItem {
  id: string;
  title: string;
  targetAudience: string;
  lowPrice: number;
  highPrice: number;
  priceCurrency: string;
  billingDuration: string;
  features: string[];
  badge: string;
  isPopular?: boolean;
}

export const SERVICE_PRICING_PACKAGES: PricingPackageItem[] = [
  {
    id: 'butik-site',
    title: 'Temel Site Yönetimi (Butik Siteler & Apartmanlar)',
    targetAudience: '10 - 40 Daire / Bağımsız Bölüm',
    lowPrice: 350,
    highPrice: 550,
    priceCurrency: 'TRY',
    billingDuration: 'Aylık / Daire Başı',
    features: [
      'KMK 37 İşletme Projesi Hazırlama & Yıllık Divan Yönetimi',
      'Apsiyon Bulut ERP ile 256-Bit SSL Online Aidat Tahsilatı',
      'Canlı Şeffaf Kasa & Banka Mizanı Kat Malikleri İncelemesi',
      'KMK 20 Kapsamında İhtarname ve Hukuki İcra Takip Desteği',
    ],
    badge: 'Butik Siteler İçin İdeal',
  },
  {
    id: 'entegre-tesis',
    title: 'Entegre Tesis & Güvenlik Yönetim Paketi',
    targetAudience: '40 - 200 Daire / Orta & Büyük Siteler',
    lowPrice: 650,
    highPrice: 1100,
    priceCurrency: 'TRY',
    billingDuration: 'Aylık / Daire Başı',
    features: [
      '5188 Sayılı Kanun Valilik İzinli Özel Güvenlik & RFID Devriye',
      '7/24 Mobil Teknik Bakım & 15-20 Dk Acil SLA Müdahalesi',
      'Periyodik Kat & Ortak Alan Temizliği (TSE HYB Onaylı)',
      'EPDK %0 Reaktif Elektrik Ceza Güvencesi (Otomatik Kompanzasyon)',
      'Mevsimsel Peyzaj ve Otomatik Bahçe Sulama Takibi',
    ],
    badge: 'En Çok Tercih Edilen',
    isPopular: true,
  },
  {
    id: 'rezidans-plaza',
    title: 'Lüks Rezidans & Kurumsal Plaza Yönetimi',
    targetAudience: '200+ Bağımsız Bölüm / Kuleler & Ticari Plazalar',
    lowPrice: 1200,
    highPrice: 2500,
    priceCurrency: 'TRY',
    billingDuration: 'Aylık / Daire Başı veya m² Teklif',
    features: [
      '7/24 Konsiyerj, Vale & Lobi Karşılama Hizmetleri',
      'BMS Merkezi Bina Otomasyonu & HVAC İklimlendirme Denetimi',
      'A Tipi Muayene Onaylı Kesintisiz Asansör Teknik Nöbeti',
      'ISO 41001 & ISO 10002 Uluslararası Tesis İşletmeciliği',
      'Ortalama %30 - %35 Kanıtlanmış İşletme Bütçesi Tasarrufu',
    ],
    badge: 'Kurumsal & Rezidans',
  },
];

export default function ServicePricingProductAiOverviewSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [activePackageId, setActivePackageId] = useState<string>(SERVICE_PRICING_PACKAGES[1].id);
  const [copied, setCopied] = useState(false);

  const selectedPackage =
    SERVICE_PRICING_PACKAGES.find((p) => p.id === activePackageId) || SERVICE_PRICING_PACKAGES[1];

  const question = 'Profesyonel Site ve Tesis Yönetimi Aylık Hizmet Fiyatları Ne Kadardır?';
  const directAnswer =
    'Alo Yönetim kurumsal hizmet fiyatları daire sayısı, ortak alan büyüklüğü ve talep edilen güvenlik/teknik personel sayısına göre 3 şeffaf paketle sunulur: 1) Butik siteler için aylık daire başı 350 TL - 550 TL (KMK 37 işletme projesi ve Apsiyon aidat tahsilatı dahil), 2) Orta ve büyük siteler için daire başı 650 TL - 1.100 TL (5188 lisanslı güvenlik devriye, 7/24 teknik bakım ve temizlik dahil), 3) Lüks rezidans ve plazalar için daire başı 1.200 TL - 2.500 TL (7/24 konsiyerj, vale, BMS otomasyonu ve ISO 41001 entegre yönetim). Tüm paketlerde 48 saat içinde ücretsiz yerinde keşif raporu sunulur.';

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Alo Yönetim Profesyonel Tesis Yönetimi Fiyatlandırma ve Hizmet Paketleri Kataloğu',
      description: 'Google Arama ve Google Merchant zengin sonuçları için şeffaf hizmet paketleri ve fiyat aralıkları.',
      itemListElement: SERVICE_PRICING_PACKAGES.map((pkg, i) => ({
        '@type': 'Product',
        position: i + 1,
        name: pkg.title,
        description: `${pkg.targetAudience} için ${pkg.features.join(', ')}.`,
        brand: {
          '@type': 'Brand',
          name: 'Alo Yönetim',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: pkg.priceCurrency,
          lowPrice: pkg.lowPrice,
          highPrice: pkg.highPrice,
          offerCount: pkg.features.length,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/teklif-al`,
          seller: {
            '@type': 'Organization',
            name: 'Alo Yönetim ve Organizasyon A.Ş.',
          },
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: directAnswer,
          },
        },
      ],
    },
  ];

  return (
    <section
      className={`relative w-full rounded-2xl border border-amber-500/20 bg-gradient-to-br from-slate-900/90 via-amber-950/30 to-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl text-slate-100 ${className}`}
      aria-label="Şeffaf Tesis Yönetimi Fiyatlandırma ve Paket Kataloğu"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 font-bold text-xl">
            <span className="material-symbols-outlined text-2xl">payments</span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
                Google Merchant & Product Rich Snippets
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                Şeffaf Bütçe Garantisi
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-white tracking-tight">
              Şeffaf Hizmet Paketleri & Fiyat Dağılım Kataloğu
            </h3>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Fiyat özetini kopyala"
          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-500/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? 'done' : 'content_copy'}
          </span>
          {copied ? 'Kopyalandı' : 'Fiyat AI Özetini Kopyala'}
        </button>
      </div>

      {/* Instant Answer Box */}
      <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-950/20 p-4">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-amber-400 text-lg shrink-0 mt-0.5">
            verified
          </span>
          <p
            id="pricing-product-instant-answer-text"
            className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
          >
            {directAnswer}
          </p>
        </div>
      </div>

      {/* 3 Pricing Packages Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {SERVICE_PRICING_PACKAGES.map((pkg) => {
          const isSelected = activePackageId === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setActivePackageId(pkg.id)}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-400 bg-amber-950/40 shadow-lg shadow-amber-950/50 ring-1 ring-amber-400/60'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      pkg.isPopular
                        ? 'bg-amber-500 text-slate-950 font-extrabold'
                        : 'bg-slate-800 text-amber-300 border border-slate-700'
                    }`}
                  >
                    {pkg.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {pkg.targetAudience}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                  {pkg.title}
                </h4>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                    {pkg.lowPrice} - {pkg.highPrice} ₺
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    / {pkg.billingDuration}
                  </span>
                </div>

                <ul className="mt-3 flex flex-col gap-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-amber-400 text-sm shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>48 Saatte Keşif</span>
                <span className="text-amber-300 font-medium">Gizli Maliyet Yok</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center text-[11px] text-slate-400">
        * Belirtilen tutarlar ortalama piyasa tahmini aralıklarıdır. Kesin bütçe ve daire başı aidat tutarı 48 saat içinde yapılacak <strong className="text-slate-200">ücretsiz yerinde keşif</strong> sonrasında KMK 37 işletme projesiyle resmiyet kazanır.
      </div>
    </section>
  );
}
