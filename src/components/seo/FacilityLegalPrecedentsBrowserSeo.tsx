"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';

export default function FacilityLegalPrecedentsBrowserSeo() {
  const [activeTab, setActiveTab] = useState<string>(YARGITAY_LEGAL_PRECEDENTS[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrecedents = YARGITAY_LEGAL_PRECEDENTS.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kmkArticle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.court.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeItem =
    YARGITAY_LEGAL_PRECEDENTS.find((p) => p.id === activeTab) || YARGITAY_LEGAL_PRECEDENTS[0];

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-14 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">gavel</span>
            634 KMK & Yargıtay Emsal Karar Kütüphanesi
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Tesis Yönetimi Hukuk ve <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">Yargıtay İçtihatları</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-2 max-w-2xl">
            Aidat borcu, asansör ortak giderleri, yönetici seçimi ve mimari tadilat ihtilaflarında bağlayıcı yüksek mahkeme kararları.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Karar veya madde ara... (Örn: Asansör, 20/2)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-[var(--color-surface-variant)] border border-[var(--color-outline)] rounded-xl px-4 py-2 pl-9 text-xs text-[var(--color-primary)] placeholder-slate-400 focus:outline-none focus:border-slate-500"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-slate-400" aria-hidden="true">
            search
          </span>
        </div>
      </div>

      {/* Main Grid: Left Tabs & Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Decision Tabs (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredPrecedents.map((p) => {
            const isSelected = p.id === activeItem?.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-surface-variant)] border-slate-400 dark:border-slate-500 shadow-sm ring-2 ring-slate-400/20'
                    : 'bg-[var(--color-surface)] border-[var(--color-outline)]/80 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    {p.kmkArticle}
                  </span>
                  <span className="text-[10px] text-[var(--color-tertiary)] font-medium">{p.decisionDate}</span>
                </div>
                <h4 className="text-xs font-bold text-[var(--color-primary)] leading-snug line-clamp-2">
                  {p.subject}
                </h4>
                <div className="text-[10px] text-[var(--color-secondary)] flex items-center gap-1">
                  <span className="font-semibold">{p.court}</span> · {p.docketNumber}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Ruling Card (7 Cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-[var(--color-surface)] rounded-3xl p-6 md:p-8 border border-[var(--color-outline)]/80 space-y-6 shadow-sm"
              >
                {/* Top Badge & Court Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-outline)]/40">
                  <div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      {activeItem.court}
                    </div>
                    <div className="text-sm font-extrabold text-[var(--color-primary)] mt-0.5">
                      {activeItem.docketNumber} / {activeItem.decisionNumber}
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60">
                    Karar Tarihi: {activeItem.decisionDate}
                  </span>
                </div>

                {/* Subject & Summary */}
                <div>
                  <h3 className="text-base font-bold text-[var(--color-primary)] mb-2">
                    {activeItem.subject}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--color-secondary)] leading-relaxed">
                    {activeItem.rulingSummary}
                  </p>
                </div>

                {/* Yargıtay Ruling Quote Box */}
                <div className="bg-[var(--color-surface-variant)] p-4 rounded-2xl border-l-4 border-slate-700 dark:border-slate-300 text-xs italic text-[var(--color-secondary)] leading-relaxed">
                  {activeItem.bindingPrecedentText}
                </div>

                {/* Alo Yönetim Operational Guarantee */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0 mt-0.5" aria-hidden="true">
                    verified_user
                  </span>
                  <div>
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      Alo Yönetim Operasyonel Güvencesi:
                    </div>
                    <p className="text-xs text-[var(--color-secondary)] leading-snug mt-1">
                      {activeItem.aloYonetimOperationalSolution}
                    </p>
                  </div>
                </div>

                {/* Official Legislation & Outbound Verification Links */}
                <div className="pt-3 border-t border-[var(--color-outline)]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">verified</span>
                    <span>Resmi Mevzuat Dayanağı: <strong>{activeItem.kmkArticle}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--color-primary)] font-bold hover:underline"
                      title="T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi — 634 Sayılı KMK"
                    >
                      <span>Mevzuat.gov.tr</span>
                      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">open_in_new</span>
                    </a>
                    <span className="text-[var(--color-outline)]">•</span>
                    <a
                      href="https://karararama.yargitay.gov.tr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--color-primary)] font-bold hover:underline"
                      title="T.C. Yargıtay Başkanlığı Karar Arama Portalı"
                    >
                      <span>Yargıtay İlamı Sorgula</span>
                      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">open_in_new</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
