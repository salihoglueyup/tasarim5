"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

interface MetricItem {
  label: string; // Örn: "Aktif Çalışan"
  value: string | number; // Örn: "500+" veya 500
  unitText?: string; // Örn: "Personel"
  icon?: string;
}

interface LiveMetricBadgeSeoProps {
  metrics?: MetricItem[];
  title?: string;
  className?: string;
}

const DEFAULT_METRICS: MetricItem[] = [
  { label: "Uzman Personel", value: "500+", unitText: "Kişi", icon: "badge" },
  { label: "Yönetilen Tesis", value: "200+", unitText: "Proje", icon: "apartment" },
  { label: "Hizmet Bölgesi", value: "12", unitText: "İlçe", icon: "location_city" },
  { label: "Memnuniyet Oranı", value: "%98.4", unitText: "Oran", icon: "thumb_up" }
];

/**
 * Canlı Metrik & Sayısal Güven Rozetleri (LiveMetricBadgeSeo)
 * 
 * Şirketin operasyonel hacmini ve güvenilirlik verilerini `QuantitativeValue`
 * şemasıyla Google ve yapay zeka arama motorlarına tanıtır.
 */
export default function LiveMetricBadgeSeo({
  metrics = DEFAULT_METRICS,
  title = "Alo Yönetim Canlı Operasyonel Büyüklük",
  className = ""
}: LiveMetricBadgeSeoProps) {

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    url: `${BASE_URL}/hakkimizda`,
    itemListElement: metrics.map((m, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: m.label,
      item: {
        '@type': 'QuantitativeValue',
        name: m.label,
        value: m.value,
        ...(m.unitText ? { unitText: m.unitText } : {})
      }
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 my-6 ${className}`}
      >
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-slate-50/80 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow group"
          >
            {m.icon && (
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">{m.icon}</span>
              </div>
            )}
            <div className="text-2xl md:text-3xl font-black text-[var(--color-primary)] tracking-tight">
              {m.value}
            </div>
            <div className="text-xs md:text-sm text-[var(--color-secondary)] font-medium mt-1">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
