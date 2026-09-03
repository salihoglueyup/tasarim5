"use client";

import React from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';
import { BASE_URL } from '@/lib/constants';

interface NeighborhoodDirectorySeoProps {
  districtName: string; // Örn: "Kadıköy"
  districtSlug: string; // Örn: "kadikoy"
  neighborhoods: string[]; // Örn: ["Moda", "Fenerbahçe", "Caddebostan", "Suadiye", "Bostancı"]
  activeServiceSlug?: string; // Örn: "guvenlik-yonetimi"
  activeServiceName?: string; // Örn: "Özel Güvenlik Yönetimi"
  className?: string;
}

/**
 * Hiper-Yerel Mahalleler Dizin & Micro-Silo Bağlantı Motoru (NeighborhoodDirectorySeo)
 * 
 * İlçenin altındaki popüler mahalleleri listeleyerek uzun kuyruklu (Long-Tail)
 * "Kadıköy Moda apartman yönetimi", "Caddebostan site temizliği" aramalarında
 * doğrudan 1. sıraya yükselmeyi sağlar.
 */
export default function NeighborhoodDirectorySeo({
  districtName,
  districtSlug,
  neighborhoods,
  activeServiceSlug = "",
  activeServiceName = "Site ve Tesis Yönetimi",
  className = ""
}: NeighborhoodDirectorySeoProps) {

  const targetPath = activeServiceSlug
    ? `/bolgeler/${districtSlug}/${activeServiceSlug}`
    : `/bolgeler/${districtSlug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${districtName} Mahalleleri ${activeServiceName} Hizmet Ağı`,
    description: `${districtName} ilçesindeki tüm semt ve mahallelerde profesyonel mülk idaresi.`,
    url: `${BASE_URL}${targetPath}`,
    itemListElement: neighborhoods.map((n, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${districtName} ${n} Mahallesi ${activeServiceName}`,
      item: {
        '@type': 'AdministrativeArea',
        name: `${n} Mahallesi, ${districtName}, İstanbul`,
        containedInPlace: {
          '@type': 'City',
          name: `${districtName}, İstanbul`
        }
      }
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/80 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm my-8 ${className}`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-lg" aria-hidden="true">location_on</span>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-[var(--color-primary)]">
              {districtName} Bölgesi Mahalle ve Semt Hizmet Ağı
            </h3>
            <span className="text-xs text-[var(--color-secondary)] font-light">
              Aşağıdaki tüm mahallelerde aktif operasyon ekibimiz ve nöbetçi teknik servisimiz mevcuttur.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {neighborhoods.map((n) => (
            <Link
              key={n}
              href={targetPath}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-zinc-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-700 dark:text-slate-200 text-xs rounded-xl border border-slate-200/60 dark:border-white/5 font-medium transition-all shadow-xs group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:bg-white transition-colors" />
              <span>{n} Mahallesi</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
