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
      className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden"
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOfferCatalog) }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">verified_user</span>
          <span>Şeffaf Kurumsal Hizmet ve Maliyet Politikası</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
          Apartman, Site ve Tesis Yönetimi Paket Kataloğu
        </h2>
        <p className="text-[var(--color-secondary)] mt-3 text-sm sm:text-base leading-relaxed font-normal">
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
                  ? 'bg-[var(--color-surface)] border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-primary)]/20 scale-[1.02]'
                  : 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)]/70 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-[var(--color-surface-variant)]'
              }`}
            >
              <div>
                {/* Popular / Scale Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    pkg.isPopular
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60'
                  }`}>
                    {pkg.targetScale}
                  </span>
                  {pkg.isPopular && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[var(--color-surface-variant)] text-[var(--color-primary)] border border-[var(--color-outline)]">
                      Önerilen
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-[var(--color-secondary)] mb-4 font-medium">
                  Ölçek: {pkg.targetUnitCount}
                </p>

                {/* Price Display */}
                <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 mb-4">
                  <div className="text-xs text-[var(--color-secondary)]">Gösterge Maliyet Aralığı</div>
                  <div className="text-lg sm:text-xl font-black text-[var(--color-primary)]">
                    {pkg.indicativePriceRange}
                  </div>
                  <div className="text-[11px] text-[var(--color-tertiary)] mt-0.5">
                    {pkg.unitPriceEstimate}
                  </div>
                </div>

                <p className="text-xs text-[var(--color-secondary)] mb-4 leading-relaxed line-clamp-2">
                  {pkg.highlightText}
                </p>

                {/* Deliverables snippet */}
                <ul className="space-y-2 mb-4">
                  {pkg.deliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[var(--color-secondary)]">
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-sm shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="pt-3 border-t border-[var(--color-outline)]/60 mb-4 text-[11px] text-[var(--color-secondary)] flex items-center justify-between">
                  <span>SLA Müdahale:</span>
                  <span className="font-bold text-[var(--color-primary)]">{pkg.slaResponseTime}</span>
                </div>

                <Link
                  href={pkg.ctaHref}
                  className={`w-full block py-2.5 px-4 text-center rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] shadow-md'
                      : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-variant)] text-[var(--color-primary)] border border-[var(--color-outline)]'
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
      <div className="bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/70 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-outline)]/60">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
              Seçili Paket Kapsamı
            </span>
            <h4 className="text-xl font-extrabold text-[var(--color-primary)] mt-0.5">
              {activePackage.name} — Tam Hizmet Listesi
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--color-secondary)]">
              Yazılım: <strong className="text-[var(--color-primary)]">{activePackage.softwareIncluded}</strong>
            </span>
            <Link
              href={activePackage.ctaHref}
              className="px-4 py-2 rounded-xl bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-xs font-bold transition-colors shadow-xs"
            >
              Ücretsiz Keşif Randevusu Alın →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {activePackage.deliverables.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-lg shrink-0 mt-0.5" aria-hidden="true">task_alt</span>
              <span className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
