"use client";

import React from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/constants';

interface GeoTargetAreaSeoProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * 12 İlçe Coğrafi Kapsama Alanı & Harita Şeması (GeoTargetAreaSeo)
 * 
 * Google Haritalar'a ve yerel arama motoruna İstanbul genelinde hizmet verdiğimiz
 * 12 ilçeyi `GeoCircle` ve `areaServed` çoklu ilçe şemasıyla tanıtır.
 */
export default function GeoTargetAreaSeo({
  title = "İstanbul Geneli 12 İlçede Yerel Tesis Yönetim Ağı",
  subtitle = "Anadolu ve Avrupa Yakası'nın tüm prestijli ilçelerinde 7/24 kesintisiz hizmet veriyoruz.",
  className = ""
}: GeoTargetAreaSeoProps) {

  // Google Haritalar GeoCircle & areaServed Şeması
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Alo Yönetim ve Organizasyon A.Ş.',
    url: BASE_URL,
    areaServed: DISTRICTS.map((d) => ({
      '@type': 'AdministrativeArea',
      name: `${d.name}, İstanbul`,
      url: `${BASE_URL}/bolgeler/${d.slug}`
    })),
    geo: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 40.9922,
        longitude: 29.0287
      },
      geoRadius: '50000' // 50 km yarıçapında tüm İstanbul
    }
  };

  const anadoluDistricts = DISTRICTS.filter((d) => d.side === "Anadolu");
  const avrupaDistricts = DISTRICTS.filter((d) => d.side === "Avrupa");

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm my-8 ${className}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Yerel Kapsama Ağı
            </span>
            <h3 className="text-xl md:text-2xl font-black text-[var(--color-primary)] mt-1">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-[var(--color-secondary)] font-light mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">map</span>
            <span>{DISTRICTS.length} İlçe & İstanbul Geneli</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Anadolu Yakası */}
          <div className="bg-white dark:bg-zinc-800/60 rounded-2xl p-5 border border-slate-100 dark:border-white/5 shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-900 dark:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h4>Anadolu Yakası Hizmet Noktalarımız</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {anadoluDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/bolgeler/${d.slug}`}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-zinc-700/50 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-700 dark:text-slate-200 text-xs rounded-xl border border-slate-200/60 dark:border-white/5 font-medium transition-colors"
                >
                  {d.name} <span className="opacity-60 text-[10px]">({d.managedProjects}+)</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Avrupa Yakası */}
          <div className="bg-white dark:bg-zinc-800/60 rounded-2xl p-5 border border-slate-100 dark:border-white/5 shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-900 dark:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <h4>Avrupa Yakası Hizmet Noktalarımız</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {avrupaDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/bolgeler/${d.slug}`}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-zinc-700/50 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-700 dark:text-slate-200 text-xs rounded-xl border border-slate-200/60 dark:border-white/5 font-medium transition-colors"
                >
                  {d.name} <span className="opacity-60 text-[10px]">({d.managedProjects}+)</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
