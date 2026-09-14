"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';
import {
  MANAGEMENT_MODEL_COMPARISON_DATA,
  ModelComparisonDimension,
} from '@/data/managementModelComparisonData';

export default function ThreeWayManagementComparisonSeo() {
  const [selectedDimensionId, setSelectedDimensionId] = useState<string | null>(null);

  // Schema.org Table & ItemList for Google Rich Snippets
  const schemaComparisonTable = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: 'Apartman & Site Yönetim Modelleri 3-Yönlü Karşılaştırma Matrisi',
    description:
      'Bina içi amatör yönetici, dışarıdan şahıs yönetici ve Alo Yönetim kurumsal yönetim modelinin hukuki sorumluluk, kıdem tazminatı riski, aidat tahsilatı ve tasarruf oranları bakımından karşılaştırılması.',
    url: `${BASE_URL}/hizmetler/site-yonetimi#yonetim-modelleri-karsilastirma`,
    about: {
      '@type': 'ItemList',
      itemListElement: MANAGEMENT_MODEL_COMPARISON_DATA.map((dim, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: dim.dimensionTitle,
        description: `Bireysel: ${dim.amateurResidentModel.summary} | Dışarıdan: ${dim.individualExternalModel.summary} | Alo Yönetim: ${dim.aloYonetimCorporateModel.summary}`,
      })),
    },
  };

  return (
    <section id="yonetim-modelleri-karsilastirma" className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      {/* Schema.org Table Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaComparisonTable) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/10 dark:bg-emerald-400/10 border border-emerald-600/20 dark:border-emerald-400/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">balance</span>
            Karar Matrisi: Hangi Yönetim Modeli Güvenli?
          </div>
          <h3 className="text-xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Apartman ve Sitelerde <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">3-Yönlü Yönetim Modeli Kıyaslaması</span>
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            Bina içi komşu yöneticiliği, dışarıdan şahıs yöneticiliği ve Alo Yönetim kurumsal yönetim modelini 6 kritik kanuni ve mali boyutta tarafsızca inceleyin.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Risk & Tasarruf Matrisi 2026</span>
        </div>
      </div>

      {/* 3 Model Cards / Column Headers in Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <div className="lg:col-span-3 hidden lg:flex items-center text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] px-4">
          Karşılaştırma Kriteri
        </div>
        <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-[var(--color-outline)] text-center">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
            Model 1
          </span>
          <h4 className="text-sm font-bold text-[var(--color-primary)]">
            Bina İçi Amatör Yönetici
          </h4>
          <span className="text-[11px] text-[var(--color-secondary)]">Gönüllü Kat Maliki</span>
        </div>
        <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-[var(--color-outline)] text-center">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
            Model 2
          </span>
          <h4 className="text-sm font-bold text-[var(--color-primary)]">
            Dışarıdan Şahıs Yönetici
          </h4>
          <span className="text-[11px] text-[var(--color-secondary)]">Bireysel Serbest Yönetici</span>
        </div>
        <div className="lg:col-span-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-600/15 via-teal-600/10 to-blue-600/10 border-2 border-emerald-500 text-center relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
            Önerilen
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
            Model 3
          </span>
          <h4 className="text-sm font-extrabold text-[var(--color-primary)]">
            Alo Yönetim Kurumsal
          </h4>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">ISO 41001 & Apsiyon Güvenceli</span>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="space-y-4">
        {MANAGEMENT_MODEL_COMPARISON_DATA.map((item) => {
          const isSelected = selectedDimensionId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              className={`rounded-2xl border transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-[var(--color-surface-variant)] shadow-sm'
                  : 'border-[var(--color-outline)]/80 bg-[var(--color-surface-variant)]/50 hover:bg-[var(--color-surface-variant)]'
              }`}
            >
              <div
                onClick={() => setSelectedDimensionId(isSelected ? null : item.id)}
                className="p-4 sm:p-5 cursor-pointer flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start lg:items-center"
              >
                {/* Criterion Header */}
                <div className="lg:col-span-3 space-y-1 w-full">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-lg" aria-hidden="true">
                      {item.dimensionIcon}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">
                      {item.dimensionTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[var(--color-secondary)] block">
                    {item.legalBasis}
                  </span>
                </div>

                {/* Model 1: Amateur */}
                <div className="lg:col-span-3 w-full p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 lg:hidden">Bina İçi:</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-600/10 text-rose-700 dark:text-rose-300">
                      {item.amateurResidentModel.statusBadge}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-primary)] font-medium leading-relaxed">
                    {item.amateurResidentModel.summary}
                  </p>
                </div>

                {/* Model 2: External Individual */}
                <div className="lg:col-span-3 w-full p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 lg:hidden">Dışarıdan Şahıs:</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-600/10 text-amber-700 dark:text-amber-300">
                      {item.individualExternalModel.statusBadge}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-primary)] font-medium leading-relaxed">
                    {item.individualExternalModel.summary}
                  </p>
                </div>

                {/* Model 3: Alo Yönetim Kurumsal */}
                <div className="lg:col-span-3 w-full p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300/80 dark:border-emerald-800/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 lg:hidden">Alo Yönetim:</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                      {item.aloYonetimCorporateModel.statusBadge}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--color-primary)] leading-relaxed">
                    {item.aloYonetimCorporateModel.summary}
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown Expansion */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5 pt-2 border-t border-[var(--color-outline)]/60 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs"
                >
                  <div className="p-3 bg-rose-50/40 dark:bg-rose-950/10 rounded-xl">
                    <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">Amatör Model Risk Detayı:</span>
                    <p className="text-[var(--color-secondary)] leading-relaxed">{item.amateurResidentModel.detail}</p>
                  </div>
                  <div className="p-3 bg-amber-50/40 dark:bg-amber-950/10 rounded-xl">
                    <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Şahıs Model Kısıt Detayı:</span>
                    <p className="text-[var(--color-secondary)] leading-relaxed">{item.individualExternalModel.detail}</p>
                  </div>
                  <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Alo Yönetim Kurumsal Çözümü:</span>
                    <p className="text-[var(--color-primary)] font-medium leading-relaxed">{item.aloYonetimCorporateModel.detail}</p>
                    <div className="mt-2 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">check_circle</span>
                      {item.aloYonetimCorporateModel.highlightFeature}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer CTA Strip */}
      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold">
            Sitenizi Amatör Risklerden Kurtarıp Kurumsal Güvenceye Taşımak İster misiniz?
          </h4>
          <p className="text-xs text-slate-300 max-w-xl">
            Ücretsiz yerinde site analizi, KMK m.37 işletme bütçesi taslağı ve 48 saatte resmi devir teslim için teklif alın.
          </p>
        </div>
        <a
          href="/teklif-al"
          className="shrink-0 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md flex items-center gap-2"
        >
          <span>Ücretsiz Keşif & Teklif Al</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
