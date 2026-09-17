"use client";

import React from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { getDistrictNeighborhoodCluster } from '@/data/districtNeighborhoodsData';

export interface DistrictMicroNeighborhoodsSeoProps {
  districtSlug: string;
  districtName: string;
}

export default function DistrictMicroNeighborhoodsSeo({
  districtSlug,
  districtName,
}: DistrictMicroNeighborhoodsSeoProps) {
  const cluster = getDistrictNeighborhoodCluster(districtSlug);

  // Schema.org BreadcrumbList & subServiceArea for Micro-Local SEO
  const schemaBreadcrumbsAndArea = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/bolgeler/${districtSlug}#micro-areas`,
    name: `Alo Yönetim ${districtName} Bölge Müdürlüğü & Semt Ağı`,
    url: `${BASE_URL}/bolgeler/${districtSlug}`,
    areaServed: cluster.prominentNeighborhoods.map((n) => ({
      '@type': 'AdministrativeArea',
      name: `${n.name}, ${districtName}`,
      description: n.notableTraits,
    })),
  };

  const schemaBreadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hizmet Bölgelerimiz (İstanbul)',
        item: `${BASE_URL}/bolgeler`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${districtName} Profesyonel Site Yönetimi`,
        item: `${BASE_URL}/bolgeler/${districtSlug}`,
      },
    ],
  };

  return (
    <section 
      aria-label={`${districtName} Mahalle ve Mikro-Semt Hizmet Ağı`}
      className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden my-8"
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbsAndArea) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbList) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">near_me</span>
            <span>{districtName} Mikro-Semt & Mahalle Kapsama Ağı</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            {districtName} Genelinde Hizmet Verdiğimiz Başlıca Semt ve Mahalleler
          </h2>
          <p className="text-slate-400 mt-2 text-xs sm:text-sm font-normal">
            Bölgeye yayılmış gezici teknik filomuz ve anlaşmalı acil müdahale ekiplerimizle tüm mahallelerde 45 dakika servis süresi.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <span className="material-symbols-outlined text-emerald-400 text-base" aria-hidden="true">timer</span>
          <span>Acil Müdahale: <strong className="text-emerald-400">{cluster.serviceReachGuaranteeMinutes} Dk SLA</strong></span>
        </div>
      </div>

      {/* Neighborhoods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {cluster.prominentNeighborhoods.map((n) => (
          <div
            key={n.slug}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition-colors flex flex-col justify-between gap-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-blue-400 text-sm" aria-hidden="true">location_on</span>
                  <span>{n.name}</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {n.typologyLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                {n.notableTraits}
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Odak Hizmet:</span>
              <span className="text-blue-400 font-semibold truncate max-w-[150px]">{n.focusKeyword}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA & Inter-district Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-base" aria-hidden="true">pin_drop</span>
          <span>{districtName} genelinde <strong>{cluster.totalTrackedAreasCount} aktif semt ve mahallede</strong> kesintisiz KMK 634 yönetimi.</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/teklif-al"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
          >
            Mahalleniz İçin Teklif Alın →
          </Link>
        </div>
      </div>
    </section>
  );
}
