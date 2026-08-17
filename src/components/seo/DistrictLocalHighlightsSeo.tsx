"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

interface DistrictHighlightProps {
  districtName: string;
  side: "Anadolu" | "Avrupa";
  population: number;
  managedProjects: number;
  neighborhoods: string[];
  localNeeds: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
  className?: string;
}

/**
 * İlçe Yerel Otorite & Bilgi Özeti Bileşeni (DistrictLocalHighlightsSeo)
 * 
 * 12 ilçe sayfamızda o ilçenin demografik ve tesis yönetimi dinamiklerini
 * Google'ın "Local Authority" sinyallerine uygun `Place` ve `GeoCoordinates`
 * şemasıyla birleştirir.
 */
export default function DistrictLocalHighlightsSeo({
  districtName,
  side,
  population,
  managedProjects,
  neighborhoods,
  localNeeds,
  geo,
  className = ""
}: DistrictHighlightProps) {

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${districtName}, İstanbul`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: districtName,
      addressRegion: 'İstanbul',
      addressCountry: 'TR'
    },
    description: `${districtName} ilçesinde ${managedProjects}+ aktif site, plaza ve tesis projesinde profesyonel mülk yönetimi, güvenlik ve temizlik hizmetleri.`,
    url: `${BASE_URL}/bolgeler/${districtName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  };

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
    };
  }

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm ${className}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {side} Yakası Yerel Hizmet Ağı
            </span>
            <h3 className="text-2xl font-black text-[var(--color-primary)] mt-1">
              {districtName} Bölgesi Rakamlarla Biz
            </h3>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-brand-600 dark:text-brand-400">
                {managedProjects}+
              </div>
              <div className="text-xs text-slate-500">Yönetilen Proje</div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                ~{Math.round(population / 1000)}K
              </div>
              <div className="text-xs text-slate-500">İlçe Nüfusu</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mahalleler */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-3">
              <span className="material-symbols-outlined text-brand-500 text-lg">location_city</span>
              <span>Hizmet Verilen Önemli Mahalleler</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((n) => (
                <span
                  key={n}
                  className="px-3 py-1 bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs rounded-full border border-slate-200/80 dark:border-white/5 font-medium"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Yerel İhtiyaçlar */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-3">
              <span className="material-symbols-outlined text-emerald-500 text-lg">task_alt</span>
              <span>{districtName}'e Özel Tesis Öncelikleri</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-light">
              {localNeeds.map((need, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
