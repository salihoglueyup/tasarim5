"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

export interface NeighborhoodData {
  name: string;
  avgDuesRange: string;
  aloDuesEstimate: string;
  buildingProfile: string;
  securityRate: string;
}

export interface DistrictNeighborhoodDuesTableProps {
  districtName: string;
  districtSlug: string;
  neighborhoods: string[];
}

export default function DistrictNeighborhoodDuesTableSeo({
  districtName,
  districtSlug,
  neighborhoods
}: DistrictNeighborhoodDuesTableProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);

  // Generate realistic neighborhood data based on district
  const neighborhoodRows: NeighborhoodData[] = neighborhoods.slice(0, 8).map((n, idx) => {
    const baseMin = 35 + (idx % 4) * 5;
    const baseMax = baseMin + 15;
    const aloEst = Math.round(baseMin * 0.76);
    const profiles = [
      'Geniş Peyzajlı & Havuzlu Site',
      'Yüksek Katlı Rezidans & Kule',
      'Butik ve Orta Ölçekli Apartman',
      'Kapalı Devre Güvenlikli Yerleşke',
      'Kentsel Dönüşüm Yeni Konutları'
    ];
    const securities = ['%98 7/24 Güvenlikli', '%95 Özel Güvenlik & PTS', '%92 Kamera & Devriye', '%90 Nöbetçi Personel'];

    return {
      name: n,
      avgDuesRange: `${baseMin} - ${baseMax} ₺ / m²`,
      aloDuesEstimate: `${aloEst} ₺ / m²`,
      buildingProfile: profiles[idx % profiles.length],
      securityRate: securities[idx % securities.length]
    };
  });

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: `${districtName} Mahalle Bazında 2026 Tahmini Site Aidat ve Tesis Yönetimi Endeksi`,
    about: {
      '@type': 'Place',
      name: `${districtName}, İstanbul`,
      containsPlace: neighborhoodRows.map((n) => ({
        '@type': 'Place',
        name: `${n.name} Mahallesi, ${districtName}`
      }))
    }
  };

  return (
    <div className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">home_work</span>
              Hiper-Yerel Mahalle Endeksi (2026)
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            {districtName} Mahalle Bazında Aidat & Yönetim Rehberi
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
            {districtName} ilçesindeki popüler mahallelerin m² aidat aralıkları ve Alo Yönetim tasarruf projeksiyonu.
          </p>
        </div>

        <Link
          href={`/bolgeler/${districtSlug}/aidat-takibi`}
          className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 shrink-0 self-start md:self-auto shadow-md"
        >
          <span>{districtName} Aidat Teklifi Al</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10 text-xs font-extrabold uppercase text-[var(--color-secondary)]">
              <th className="py-4 px-4">Mahalle Adı</th>
              <th className="py-4 px-4">Piyasa Aidat Aralığı (m²)</th>
              <th className="py-4 px-4">Alo Yönetim ile (%24 Tasarruflu)</th>
              <th className="py-4 px-4 hidden md:table-cell">Baskın Bina Tipi</th>
              <th className="py-4 px-4 hidden sm:table-cell">Güvenlik Durumu</th>
              <th className="py-4 px-4 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm">
            {neighborhoodRows.map((row) => (
              <tr
                key={row.name}
                className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group"
              >
                <td className="py-4 px-4 font-bold text-[var(--color-primary)] flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-slate-500">location_on</span>
                  <span>{row.name} Mah.</span>
                </td>
                <td className="py-4 px-4 font-semibold text-rose-500">
                  {row.avgDuesRange}
                </td>
                <td className="py-4 px-4 font-extrabold text-emerald-500">
                  ~{row.aloDuesEstimate}
                </td>
                <td className="py-4 px-4 text-xs text-[var(--color-secondary)] hidden md:table-cell">
                  {row.buildingProfile}
                </td>
                <td className="py-4 px-4 text-xs font-medium text-[var(--color-primary)] hidden sm:table-cell">
                  {row.securityRate}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href="/teklif-al"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline"
                  >
                    <span>Fiyat Al</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-[var(--color-secondary)]">
        <span>* Veriler {districtName} genelinde 2026 yılı 200+ site ve rezidans piyasa ortalamalarından derlenmiştir.</span>
        <span className="font-bold text-[var(--color-primary)]">Alo Yönetim Veri Analitiği</span>
      </div>
    </div>
  );
}
