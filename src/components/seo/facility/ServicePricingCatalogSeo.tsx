"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { SERVICE_PRICING_PACKAGES, ServicePricingPackage } from '@/data/servicePricingPackagesData';

export interface ServicePricingCatalogSeoProps {
  pageUrl?: string;
  categoryFilter?: 'all' | 'residential' | 'commercial';
}

export default function ServicePricingCatalogSeo({
  pageUrl = `${BASE_URL}/hizmetler/site-yonetimi`,
  categoryFilter = 'all',
}: ServicePricingCatalogSeoProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('orta-olcekli-konut-sitesi');

  const filteredPackages = SERVICE_PRICING_PACKAGES.filter((pkg) => {
    if (categoryFilter === 'residential') return pkg.id !== 'plaza-ticari-tesis-yonetimi';
    if (categoryFilter === 'commercial') return pkg.id === 'plaza-ticari-tesis-yonetimi' || pkg.id === 'buyuk-toplu-yapi-rezidans';
    return true;
  });

  const activePackage = SERVICE_PRICING_PACKAGES.find((p) => p.id === selectedPackageId) || SERVICE_PRICING_PACKAGES[1];

  // Schema.org OfferCatalog & PriceSpecification for Google SGE & AI Rich Snippets
  const schemaOfferCatalog = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${pageUrl}#pricing-catalog`,
    name: 'Alo Yönetim Kurumsal Profesyonel Site ve Tesis Yönetimi Hizmet Paketleri',
    description: 'İstanbul genelinde 634 Sayılı KMK ve ISO 41001 standartlarında apartman, site, rezidans ve ticari plazalar için şeffaf yönetim hizmet paketleri ve gösterge fiyatlandırma aralıkları.',
    itemListElement: filteredPackages.map((pkg, idx) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: pkg.name,
        description: pkg.highlightText,
        serviceType: 'Property Management',
        provider: {
          '@type': 'ProfessionalService',
          name: 'Alo Yönetim',
          url: BASE_URL,
        },
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: pkg.priceCurrency,
        minPrice: pkg.minMonthlyFee,
        maxPrice: pkg.maxMonthlyFee,
        unitText: pkg.billingFrequency,
      },
      availability: 'https://schema.org/InStock',
      position: idx + 1,
    })),
  };

  return (
    <section 
      aria-label="Şeffaf Hizmet ve Fiyatlandırma Kataloğu"
      className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOfferCatalog) }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">verified_user</span>
          <span>Şeffaf Kurumsal Hizmet ve Maliyet Politikası</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Apartman, Site ve Tesis Yönetimi Paket Kataloğu
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed font-normal">
          Mülkünüzün büyüklüğüne göre ölçeklenen kurumsal hizmet kapsamı; hiçbir gizli maliyet olmadan, Apsiyon yazılım lisansı ve 7/24 acil müdahale güvencesiyle.
        </p>
      </div>

      {/* 4 Cards Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {filteredPackages.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackageId(pkg.id)}
              className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50 scale-[1.02]'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div>
                {/* Popular / Scale Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    pkg.isPopular
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {pkg.targetScale}
                  </span>
                  {pkg.isPopular && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Önerilen
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4 font-medium">
                  Ölçek: {pkg.targetUnitCount}
                </p>

                {/* Price Display */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
                  <div className="text-xs text-slate-400">Gösterge Maliyet Aralığı</div>
                  <div className="text-lg sm:text-xl font-black text-white text-emerald-400">
                    {pkg.indicativePriceRange}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {pkg.unitPriceEstimate}
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed line-clamp-2">
                  {pkg.highlightText}
                </p>

                {/* Deliverables snippet */}
                <ul className="space-y-2 mb-4">
                  {pkg.deliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="material-symbols-outlined text-emerald-400 text-sm shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="pt-3 border-t border-slate-800/80 mb-4 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>SLA Müdahale:</span>
                  <span className="font-bold text-slate-200">{pkg.slaResponseTime}</span>
                </div>

                <Link
                  href={pkg.ctaHref}
                  className={`w-full block py-2.5 px-4 text-center rounded-xl text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {pkg.ctaText}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Package Full Deliverables Detail Drawer */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Seçili Paket Kapsamı
            </span>
            <h4 className="text-xl font-extrabold text-white mt-0.5">
              {activePackage.name} — Tam Hizmet Listesi
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Yazılım: <strong className="text-white">{activePackage.softwareIncluded}</strong>
            </span>
            <Link
              href={activePackage.ctaHref}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              Ücretsiz Keşif Randevusu Alın →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {activePackage.deliverables.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="material-symbols-outlined text-blue-400 text-lg shrink-0 mt-0.5" aria-hidden="true">task_alt</span>
              <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
