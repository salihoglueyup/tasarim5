"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DISTRICTS, type District } from '@/data/districts';

interface IstanbulInteractiveDistrictMapProps {
  initialDistrictSlug?: string;
  className?: string;
}

/**
 * Wave 63: İnteraktif İstanbul 39 İlçe Tesis Yönetimi Saha Operasyon Haritası
 * 
 * İstanbul'un 39 ilçesinin (14 Anadolu + 25 Avrupa) tamamını harita/radar arayüzünde
 * birleştiren, gerçek GPS koordinatları, acil müdahale SLA süreleri ve aktif proje
 * sayılarıyla doğrudan ilçe tesis yönetimi merkezlerine bağlayan interaktif otorite bileşeni.
 */
export default function IstanbulInteractiveDistrictMapSeo({
  initialDistrictSlug = 'kadikoy',
  className = '',
}: IstanbulInteractiveDistrictMapProps) {
  const [selectedSide, setSelectedSide] = useState<'all' | 'Anadolu' | 'Avrupa'>('all');
  const [selectedSlug, setSelectedSlug] = useState<string>(initialDistrictSlug);

  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((d) => selectedSide === 'all' || d.side === selectedSide);
  }, [selectedSide]);

  const activeDistrict: District = useMemo(() => {
    return DISTRICTS.find((d) => d.slug === selectedSlug) || DISTRICTS[0];
  }, [selectedSlug]);

  const slaMinutes = ['kadikoy', 'uskudar', 'besiktas', 'sisli', 'atasehir'].includes(activeDistrict.slug)
    ? 30
    : ['bakirkoy', 'maltepe', 'umraniye', 'kartal', 'sariyer'].includes(activeDistrict.slug)
    ? 35
    : 45;

  const totalManagedInFiltered = useMemo(() => {
    return filteredDistricts.reduce((sum, d) => sum + (d.managedProjects || 0), 0);
  }, [filteredDistricts]);

  return (
    <section className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-sm my-12 overflow-hidden ${className}`}>
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-100 dark:border-white/5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">map</span>
              İstanbul 39 İlçe Saha & Harita Ağı
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              7/24 Nöbetçi Mobil Ekipler
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
              {totalManagedInFiltered}+ Aktif Proje
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            İstanbul Tesis Yönetimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Saha Operasyon Haritası</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light mt-2 max-w-2xl leading-relaxed">
            İstanbul genelindeki 39 ilçeyi harita üzerinden seçin; yerel saha amirliği koordinatlarını, 45 dakikalık acil müdahale SLA taahhüdümüzü ve sitenize en yakın tesis yönetimi birimini inceleyin.
          </p>
        </div>

        {/* Side Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedSide('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSide === 'all'
                ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tüm İstanbul (39)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSide('Anadolu')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSide === 'Anadolu'
                ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Anadolu (14)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSide('Avrupa')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSide === 'Avrupa'
                ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Avrupa (25)
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map Grid (Left) + District Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* District Tiles / Radar Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
            <span>İncelemek istediğiniz ilçeye tıklayın:</span>
            <span className="font-mono">{filteredDistricts.length} İlçe Listeleniyor</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {filteredDistricts.map((district) => {
              const isSelected = district.slug === activeDistrict.slug;
              const isAnadolu = district.side === 'Anadolu';

              return (
                <button
                  key={district.slug}
                  type="button"
                  onClick={() => setSelectedSlug(district.slug)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20 shadow-sm'
                      : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-black truncate ${
                      isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {district.name}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isAnadolu ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>{district.managedProjects}+ Proje</span>
                    <span className="font-mono">{district.side === 'Anadolu' ? 'Anad.' : 'Avr.'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom GIS Data Pill */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-500" aria-hidden="true">verified</span>
              <span>İstanbul geneli {DISTRICTS.length} ilçede 1.200+ aktif bağımsız bölüm</span>
            </span>
            <a
              href="/api/tesis-yonetimi/istanbul-districts.geojson"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>GeoJSON API</span>
              <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Selected District Inspector Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950">
                {activeDistrict.side} Yakası
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                GPS: {activeDistrict.geo.lat.toFixed(4)}°N, {activeDistrict.geo.lng.toFixed(4)}°E
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeDistrict.name} Tesis Yönetimi
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {activeDistrict.intro}
            </p>
          </div>

          {/* Metrics Trio */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">SLA Süresi</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{slaMinutes} Dk</span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Aktif Proje</span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">{activeDistrict.managedProjects}+</span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Nüfus</span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">~{Math.round(activeDistrict.population / 1000)}k</span>
            </div>
          </div>

          {/* Prominent Neighborhoods / Needs */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Öne Çıkan Mahalle & Hizmet Dinamikleri:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeDistrict.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/bolgeler/${activeDistrict.slug}/tesis-yonetimi`}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-md"
            >
              <span>{activeDistrict.name} Tesis Yönetimi Sayfası</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeDistrict.geo.lat},${activeDistrict.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 px-4 py-3 rounded-xl text-xs font-semibold transition-colors"
              title="Google Haritalar'da Saha Merkezine Rota Aç"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">directions</span>
              <span>Harita Rota</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
