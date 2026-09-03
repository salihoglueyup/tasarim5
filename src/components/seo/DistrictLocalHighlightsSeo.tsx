'use client';

import React from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';
import { Clock, ShieldCheck, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { DISTRICTS } from '@/data/districts';

interface DistrictHighlightProps {
  districtName: string;
  side: 'Anadolu' | 'Avrupa';
  population: number;
  managedProjects: number;
  neighborhoods: string[];
  localNeeds: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
  className?: string;
  lang?: string;
}

/**
 * İlçe Yerel Otorite, SLA & Bilgi Özeti Bileşeni (DistrictLocalHighlightsSeo)
 */
export default function DistrictLocalHighlightsSeo({
  districtName,
  side,
  population,
  managedProjects,
  neighborhoods,
  localNeeds,
  geo,
  className = '',
  lang = 'tr',
}: DistrictHighlightProps) {
  // İlçeye göre acil müdahale SLA tahmini
  const slaMinutes = side === 'Anadolu' ? (districtName === 'Kadıköy' || districtName === 'Üsküdar' ? 15 : 20) : (districtName === 'Beşiktaş' || districtName === 'Şişli' ? 15 : 25);

  // Komşu / Aynı Yakadaki Diğer İlçeler
  const adjacentDistricts = DISTRICTS.filter(
    (d) => d.name.toLowerCase() !== districtName.toLowerCase() && d.side === side
  ).slice(0, 5);

  const currentSlug = districtName
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${districtName}, İstanbul`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: districtName,
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    description: `${districtName} ilçesinde ${managedProjects}+ aktif site, plaza ve tesis projesinde profesyonel mülk yönetimi, 5188 güvenlik ve teknik bakım hizmetleri. Ortalama acil müdahale süresi: ${slaMinutes} dakika.`,
    url: `${BASE_URL}/bolgeler/${currentSlug}`,
  };

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm ${className}`}
      >
        {/* Üst Başlık & İstatistikler */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{side} Yakası Bölgesel Tesis ve Yönetim Ağı</span>
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {districtName} Bölgesi Yönetim Gücümüz
            </h3>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400">
                {managedProjects}+
              </div>
              <div className="text-xs text-slate-500">Yönetilen Proje</div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                ~{Math.round(population / 1000)}K
              </div>
              <div className="text-xs text-slate-500">İlçe Nüfusu</div>
            </div>
          </div>
        </div>

        {/* 2'li Izgara: Mahalleler ve Yerel İhtiyaçlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Mahalleler */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-3">
              <span className="material-symbols-outlined text-blue-500 text-lg" aria-hidden="true">location_city</span>
              <span>Hizmet Verilen Önemli Mahalleler</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((n) => (
                <span
                  key={n}
                  className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-xl border border-slate-200/80 dark:border-slate-700 font-medium"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Yerel İhtiyaçlar */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-3">
              <span className="material-symbols-outlined text-emerald-500 text-lg" aria-hidden="true">task_alt</span>
              <span>{districtName}&apos;e Özel Tesis Öncelikleri</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {localNeeds.map((need, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Bölgesel SLA & Nöbetçi Ekip Müdahale Kartı */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{districtName} 7/24 Acil Müdahale Garantisi</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold">
                  SLA {slaMinutes} DK
                </span>
              </div>
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5">
                Asansör mahsur kalma, ana tesisat patlaması veya jeneratör arızalarında mobil nöbetçi ekibimiz ortalama {slaMinutes} dakikada olay yerindedir.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 41001 & 5188 Güvencesi</span>
            </div>
          </div>
        </div>

        {/* 4. Komşu İlçeler Hızlı Bağlantı Mesh'i */}
        {adjacentDistricts.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>{side} Yakasındaki Diğer Hizmet Bölgelerimiz:</span>
              </span>
              <Link
                href={`/${lang}/bolgeler`}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Tüm 39 İlçe</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {adjacentDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${lang}/bolgeler/${d.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{d.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
