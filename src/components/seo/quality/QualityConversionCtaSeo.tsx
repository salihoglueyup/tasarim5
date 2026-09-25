"use client";

import React from 'react';
import Link from 'next/link';

export default function QualityConversionCtaSeo() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300 mb-4">
              <span className="material-symbols-outlined text-sm text-slate-300">fact_check</span>
              24 Saat İçinde Ücretsiz Saha Raporu
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Sitenizin Kalite, Güvenlik ve Teknik Açıklarını Ücretsiz Denetleyelim
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
              TÜRKAK onaylı kalite denetçilerimiz ve mühendislerimiz sitenizi ziyaret etsin; 
              asansör, yangın otomasyonu, güvenlik kör noktaları ve bütçe açıklarını 
              ücretsiz inceleyip 24 saat içinde fotoğraflı keşif raporu sunalım.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>Bağlayıcılığı Olmayan Ücretsiz Keşif</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>Fotoğraflı Teknik & İSG Raporu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>KMK 37 Bütçe İyileştirme Planı</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto relative z-10">
            <Link
              href="/teklif-al"
              className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-slate-200 hover:bg-white text-slate-950 font-bold text-sm shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 text-center cursor-pointer"
            >
              <span>Ücretsiz Kalite Keşfi İste</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
            <Link
              href="/hesaplayici"
              className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all text-center cursor-pointer"
            >
              Aidat Tasarrufunu Hesapla 📊
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
