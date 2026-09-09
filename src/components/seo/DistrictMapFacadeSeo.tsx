"use client";

import React, { useState, useEffect, useRef } from 'react';

interface DistrictMapFacadeProps {
  districtName: string;
  districtSlug: string;
  side: 'Anadolu' | 'Avrupa';
  geo: { lat: number; lng: number };
  managedProjects: number;
  neighborhoodCount?: number;
}

/**
 * Wave 63: İlçe Tesis Yönetimi Saha & Harita Cephesi (DistrictMapFacadeSeo)
 * 
 * Iframe'in ilk yüklemede ~1.5 MB JS ve onlarca network isteğiyle Core Web Vitals
 * (LCP / TBT) skorlarını düşürmesini önler; haritayı yalnızca kullanıcı alana yaklaştığında
 * veya "Haritayı Etkinleştir" butonuna tıkladığında dinamik olarak monte eder.
 * Ayrıca Google Maps, Apple Maps ve Yandex doğrudan navigasyon/yol tarifi bağlantılarını sunar.
 */
export default function DistrictMapFacadeSeo({
  districtName,
  districtSlug,
  side,
  geo,
  managedProjects,
  neighborhoodCount,
}: DistrictMapFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load harita: kullanıcı alana 300px yaklaştığında
  useEffect(() => {
    if (isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoaded]);

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${geo.lat},${geo.lng}`;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${geo.lng - 0.035}%2C${geo.lat - 0.025}%2C${geo.lng + 0.035}%2C${geo.lat + 0.025}&marker=${geo.lat}%2C${geo.lng}`;

  const slaMinutes = ['kadikoy', 'uskudar', 'besiktas', 'sisli', 'atasehir'].includes(districtSlug)
    ? 30
    : 45;

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-sm overflow-hidden"
    >
      {/* Top Header Information */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">location_on</span>
              {side} Yakası • {districtName}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Nöbetçi Saha Ekibi: {slaMinutes} Dk SLA
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
              GPS: {geo.lat.toFixed(4)}°K, {geo.lng.toFixed(4)}°D
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {districtName} Tesis Yönetimi Saha & Operasyon Haritası
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
            {managedProjects}+ aktif yönetilen proje ve {neighborhoodCount ? `${neighborhoodCount} mahallede` : 'tüm mahallelerde'} 7/24 gezici teknik servis ve süpervizör denetim ağı.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">directions</span>
            <span>Google Harita Rota</span>
          </a>

          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <span>Apple Harita</span>
            <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
          </a>
        </div>
      </div>

      {/* Map Display Container */}
      <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10">
        {isLoaded ? (
          <iframe
            title={`${districtName} interaktif konum ve tesis haritası`}
            src={embedUrl}
            loading="lazy"
            className="w-full h-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 select-none">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 ring-8 ring-amber-500/5 shadow-inner">
              <span className="material-symbols-outlined text-3xl animate-bounce" aria-hidden="true">map</span>
            </div>

            <h4 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-1">
              {districtName} Tesis & Saha Haritası
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
              Haritayı tam ekran etkileşimli olarak görüntülemek için tıklayın.
            </p>

            <button
              type="button"
              onClick={() => setIsLoaded(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">visibility</span>
              <span>Canlı Haritayı Etkinleştir</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Saha Ekibi Konumu: {districtName} İlçe Koordinasyon Merkezi</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Veri Sağlayıcı: Alo Yönetim GIS & OpenStreetMap</span>
          <span>•</span>
          <a href="/api/tesis-yonetimi/istanbul-districts.geojson" target="_blank" className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline">
            GeoJSON İndir →
          </a>
        </div>
      </div>

    </div>
  );
}
