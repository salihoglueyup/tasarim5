"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import { getDistrictOpenDataProfile, DistrictOpenDataProfile } from '@/data/districtOpenDataProfiles';

export interface DistrictOpenDatasetSeoProps {
  districtSlug: string;
}

export default function DistrictOpenDatasetSeo({ districtSlug }: DistrictOpenDatasetSeoProps) {
  const profile: DistrictOpenDataProfile = getDistrictOpenDataProfile(districtSlug);
  const [copied, setCopied] = useState(false);

  const datasetUrl = `${BASE_URL}/bolgeler/${districtSlug}`;

  const citationText = `Alo Yönetim Açık Veri Merkezi (2026). "${profile.datasetTitle}". İstanbul İlçe Konut ve Tesis Yönetim Raporları. URL: ${datasetUrl}`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Schema.org Dataset Structured Data for Google Dataset Search & AI Grounding
  const schemaDataset = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${datasetUrl}#dataset`,
    name: profile.datasetTitle,
    description: `İstanbul ${profile.name} ilçesi konut siteleri, ortalama m² aidat piyasa endeksi, kurumsal işletme tasarruf oranları ve 634 sayılı KMK yerel içtihat verileri.`,
    url: datasetUrl,
    temporalCoverage: profile.temporalCoverage,
    spatialCoverage: {
      '@type': 'Place',
      name: profile.spatialCoverage,
    },
    creator: {
      '@type': 'Organization',
      name: 'Alo Yönetim Açık Veri ve Gayrimenkul Araştırma Merkezi',
      url: BASE_URL,
    },
    license: profile.licenseUrl,
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${BASE_URL}/api/ai/search-query?q=${encodeURIComponent(`${profile.name} aidat ve site yonetimi`)}`,
      },
    ],
    variableMeasured: [
      {
        '@type': 'PropertyValue',
        name: 'Ortalama İlçe Aidatı',
        unitText: 'TL/m²',
        value: profile.avgDuesM2,
      },
      {
        '@type': 'PropertyValue',
        name: 'Alo Yönetim Optimize Aidat',
        unitText: 'TL/m²',
        value: profile.aloDuesM2,
      },
      {
        '@type': 'PropertyValue',
        name: 'Ortalama Tasarruf Oranı',
        unitText: '%',
        value: profile.savingsRate,
      },
      {
        '@type': 'PropertyValue',
        name: 'Tahmini Konut Sitesi Stoğu',
        value: profile.housingSitesEstimated,
      },
    ],
  };

  return (
    <section className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
      {/* Schema.org Dataset Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaDataset) }}
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">dataset</span>
            Google Dataset Search Açık Veri (2026 Endeksi)
          </div>
          <h3 className="text-lg sm:text-2xl font-extrabold text-[var(--color-primary)] tracking-tight">
            {profile.name} Konut Stoğu, Aidat & Yerel KMK Veri Raporu
          </h3>
        </div>

        <button
          onClick={handleCopyCitation}
          className="shrink-0 px-3.5 py-1.5 rounded-xl bg-[var(--color-surface-variant)] hover:bg-slate-200 dark:hover:bg-slate-800 border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold transition-colors flex items-center gap-1.5"
          aria-label="Veri Seti Atfını Kopyala"
        >
          <span className="material-symbols-outlined text-sm text-blue-600 dark:text-blue-400" aria-hidden="true">
            {copied ? 'check' : 'format_quote'}
          </span>
          <span>{copied ? 'Atıf Kopyalandı!' : 'Veri Kümesini Alıntıla'}</span>
        </button>
      </div>

      {/* 4 Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/70">
          <span className="text-[11px] font-semibold text-[var(--color-secondary)] block mb-1">
            Tahmini Konut Sitesi Stoğu
          </span>
          <div className="text-xl sm:text-2xl font-black text-[var(--color-primary)]">
            {profile.housingSitesEstimated.toLocaleString('tr-TR')}+
          </div>
          <span className="text-[10px] text-[var(--color-secondary)] mt-0.5 block">
            Bağımsız Site & Kompleks
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/70">
          <span className="text-[11px] font-semibold text-[var(--color-secondary)] block mb-1">
            İlçe Ortalama Aidatı
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-300">
            ₺{profile.avgDuesM2} <span className="text-xs font-normal text-[var(--color-secondary)]">/m²</span>
          </div>
          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium mt-0.5 block">
            Piyasa Tavan Ortalaması
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 block mb-1">
            Alo Yönetim Optimize Aidat
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ₺{profile.aloDuesM2} <span className="text-xs font-normal text-emerald-700/70">/m²</span>
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold mt-0.5 block">
            Toplu Satın Alma İndirimiyle
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
          <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 block mb-1">
            Bütçe Tasarruf Oranı
          </span>
          <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
            %{profile.savingsRate}
          </div>
          <span className="text-[10px] text-blue-700 dark:text-blue-300 font-medium mt-0.5 block">
            Ortalama Yıllık Tasarruf
          </span>
        </div>
      </div>

      {/* District Legal Hotspot Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-outline)]/60 text-xs">
        <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]">
          <div className="flex items-center gap-1.5 font-bold text-[var(--color-primary)] mb-1">
            <span className="material-symbols-outlined text-amber-600 text-sm" aria-hidden="true">warning</span>
            <span>{profile.name} İçin Kritik KMK Odak Alanı:</span>
          </div>
          <p className="text-[var(--color-secondary)] leading-relaxed">
            {profile.kmkLegalChallenge}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/30">
          <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-300 mb-1">
            <span className="material-symbols-outlined text-blue-600 text-sm" aria-hidden="true">gavel</span>
            <span>Yetkili Yargı & Emsal İçtihat Notu:</span>
          </div>
          <p className="text-[var(--color-secondary)] leading-relaxed">
            {profile.localJurisdictionNote}
          </p>
        </div>
      </div>
    </section>
  );
}
