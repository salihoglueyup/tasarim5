"use client";

import React from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';
import { BASE_URL } from '@/lib/constants';

export interface PricingTier {
  name: string; // Örn: "Temel Site Yönetimi"
  description: string;
  price?: string; // Örn: "Teklif Usulü" veya "Özel Fiyatlandırma"
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

interface DynamicPriceOfferSeoProps {
  serviceName: string;
  catalogTitle?: string;
  catalogDescription?: string;
  tiers?: PricingTier[];
  className?: string;
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    name: "Standart Apartman Yönetimi",
    description: "10-30 daireli apartmanlar için yasal defter, aidat takibi ve rutin temizlik.",
    price: "Özel Teklif",
    features: [
      "KMK 634 Uygun İşletme Projesi",
      "Dijital Sakin Uygulaması & Aidat Takibi",
      "Haftalık Düzenli Temizlik",
      "Yıllık Olağan Genel Kurul Yönetimi"
    ],
    ctaText: "Teklif Al",
    ctaUrl: "/teklif-al"
  },
  {
    name: "Profesyonel Site & Rezidans Yönetimi",
    description: "30-150 bağımsız bölümlü siteler için 7/24 teknik bakım, güvenlik ve tesis idaresi.",
    price: "Özel Teklif",
    isPopular: true,
    features: [
      "5188 Belgeli 7/24 Özel Güvenlik",
      "Nöbetçi Teknik Bakım & Asansör Takibi",
      "Online Tahsilat & Hukuki İcra Takibi",
      "Peyzaj ve Havuz Hijyen Bakımı",
      "Aylık Şeffaf Gelir-Gider Raporlaması"
    ],
    ctaText: "Ücretsiz Keşif İste",
    ctaUrl: "/teklif-al"
  },
  {
    name: "Entegre Tesis & Karma Yaşam Yönetimi",
    description: "150+ konut, plaza ve karma projeler için tam zamanlı yerinde operasyon ekibi.",
    price: "Kurumsal Teklif",
    features: [
      "Tam Zamanlı Tesis & Proje Müdürü",
      "7/24 Çağrı ve Operasyon Merkezi",
      "ISO 9001/14001/45001/27001 Akredite Kalite",
      "İş Sağlığı ve Güvenliği (İSG) Yönetimi",
      "Enerji & GES Sürdürülebilirlik Danışmanlığı"
    ],
    ctaText: "Kurumsal Görüşme",
    ctaUrl: "/iletisim"
  }
];

/**
 * Hizmet Paketleri & Fiyatlandırma Şeması (DynamicPriceOfferSeo)
 * 
 * Google arama sonuçlarında hizmetin fiyat aralığını (₺₺) ve paket kataloğunu
 * `OfferCatalog` ve `PriceSpecification` şemasıyla zenginleştirir.
 */
export default function DynamicPriceOfferSeo({
  serviceName,
  catalogTitle = "Hizmet Paketleri ve Çözüm Seçenekleri",
  catalogDescription = "Her ölçekteki apartman, site ve tesis için esnek, şeffaf ve bütçe dostu yönetim paketleri.",
  tiers = DEFAULT_TIERS,
  className = ""
}: DynamicPriceOfferSeoProps) {

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: catalogTitle,
      description: catalogDescription,
      itemListElement: tiers.map((tier, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${serviceName} — ${tier.name}`,
          description: tier.description
        },
        priceCurrency: 'TRY',
        price: '0.00',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'TRY',
          description: tier.price || 'Teklif Usulü'
        },
        url: `${BASE_URL}${tier.ctaUrl || '/teklif-al'}`
      }))
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`my-12 ${className}`}>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Esnek & Şeffaf Paketler
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-primary)] mt-1">
            {catalogTitle}
          </h2>
          <p className="text-sm text-[var(--color-secondary)] mt-2 font-light">
            {catalogDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? 'bg-slate-900 text-white dark:bg-zinc-800 shadow-xl border-2 border-brand-500 scale-[1.02]'
                  : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  En Çok Tercih Edilen
                </div>
              )}

              <div>
                <h3 className={`text-xl font-bold ${tier.isPopular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {tier.name}
                </h3>
                <p className={`text-xs mt-2 font-light leading-relaxed ${tier.isPopular ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tier.description}
                </p>

                <div className="my-6 pb-6 border-b border-slate-200/20 dark:border-white/10">
                  <span className={`text-2xl font-black ${tier.isPopular ? 'text-brand-400' : 'text-brand-600 dark:text-brand-400'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-xs block mt-1 font-light ${tier.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                    Projenizin ölçeğine göre ücretsiz keşif
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className={`material-symbols-outlined text-sm shrink-0 ${tier.isPopular ? 'text-brand-400' : 'text-brand-500'}`}>
                        check_circle
                      </span>
                      <span className={tier.isPopular ? 'text-slate-200 font-light' : 'text-slate-700 dark:text-slate-300 font-light'}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href={tier.ctaUrl || '/teklif-al'}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
                    tier.isPopular
                      ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white'
                  }`}
                >
                  {tier.ctaText || 'Teklif Al'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
