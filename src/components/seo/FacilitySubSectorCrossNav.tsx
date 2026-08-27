"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FACILITY_SUB_SECTORS } from '@/lib/seo/facilitySiloRankPasser';

export default function FacilitySubSectorCrossNav({ currentSlug }: { currentSlug?: string }) {
  const POPULAR_DISTRICTS = [
    { name: 'Kadıköy', slug: 'kadikoy' },
    { name: 'Beşiktaş', slug: 'besiktas' },
    { name: 'Şişli', slug: 'sisli' },
    { name: 'Ataşehir', slug: 'atasehir' },
    { name: 'Üsküdar', slug: 'uskudar' },
    { name: 'Bakırköy', slug: 'bakirkoy' },
  ];

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-12 shadow-sm my-12 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">hub</span>
            Tesis & Mülk Yönetimi Sektörel Çözüm Ağı
          </div>
          <h3 className="text-xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Uzmanlık Alanlarımız & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">Alt Sektör Hub&apos;ları</span>
          </h3>
        </div>

        <Link
          href="/hizmetler/tesis-yonetimi"
          className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Ana Tesis Yönetimi Hub&apos;ı</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* Sub-Sectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {FACILITY_SUB_SECTORS.map((sub) => {
          const isCurrent = currentSlug === sub.slug;
          return (
            <Link
              key={sub.slug}
              href={`/hizmetler/tesis-yonetimi/${sub.slug}`}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                isCurrent
                  ? 'bg-[var(--color-surface-variant)] border-slate-400 dark:border-slate-500 shadow-sm ring-2 ring-slate-400/20'
                  : 'bg-[var(--color-surface)] border-[var(--color-outline)]/80 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">{sub.icon}</span>
                </div>
                <h4 className="text-sm font-bold text-[var(--color-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1.5">
                  {sub.name}
                </h4>
                <p className="text-[11px] text-[var(--color-secondary)] line-clamp-2 leading-relaxed">
                  {sub.shortDesc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[var(--color-outline)]/40 flex items-center justify-between text-[11px] font-semibold text-[var(--color-primary)]">
                <span>{isCurrent ? 'Aktif Sayfa' : 'İncele'}</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* District Quick Hubs */}
      <div className="pt-6 border-t border-[var(--color-outline)]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <span className="font-bold text-[var(--color-primary)] shrink-0">
          📍 Popüler Bölgesel Tesis Merkezleri:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {POPULAR_DISTRICTS.map((d) => (
            <Link
              key={d.slug}
              href={`/bolgeler/${d.slug}/tesis-yonetimi`}
              className="bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors border border-[var(--color-outline)]/70 hover:border-slate-400"
            >
              {d.name} Tesis Yönetimi
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
