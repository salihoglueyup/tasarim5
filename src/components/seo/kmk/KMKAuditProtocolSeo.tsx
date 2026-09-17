"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import {
  KMK_AUDIT_CATEGORIES,
  KMK_AUDIT_CHECKPOINTS,
  KmkAuditCheckpoint,
} from '@/data/kmkAuditProtocolData';

export interface KMKAuditProtocolSeoProps {
  pageUrl?: string;
}

export default function KMKAuditProtocolSeo({
  pageUrl = `${BASE_URL}/hizmetler/site-yonetimi`,
}: KMKAuditProtocolSeoProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(KMK_AUDIT_CHECKPOINTS[0].id);

  const filteredCheckpoints = activeCategory === 'all'
    ? KMK_AUDIT_CHECKPOINTS
    : KMK_AUDIT_CHECKPOINTS.filter((c) => c.category === activeCategory);

  // Schema.org HowTo Linked Data for Step-by-Step Audit Protocol
  const schemaHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${pageUrl}#kmk-audit-protocol`,
    name: '634 Sayılı Kat Mülkiyeti Kanunu Madde 41 Uyumlu Site Denetim Kurulu Protokolü',
    description: 'Kat Malikleri Denetçileri ve bağımsız denetim organları için 4 ana kategoride (Maliye, Hukuk, Teknik/İSG, Personel) 24 maddelik resmi site denetim rehberi ve kontrol listesi.',
    totalTime: 'P3D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'TRY',
      value: '0',
    },
    step: KMK_AUDIT_CHECKPOINTS.map((chk) => ({
      '@type': 'HowToStep',
      position: chk.stepNumber,
      name: chk.checkpointTitle,
      text: `${chk.inspectionDescription} Yasal Dayanak: ${chk.legalBasis}.`,
      url: `${pageUrl}#${chk.id}`,
    })),
  };

  return (
    <section 
      aria-label="KMK Madde 41 Resmi Site Denetim Kurulu Protokolü"
      className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Schema.org HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">fact_check</span>
          <span>KMK Madde 41 Yasal Denetim Standartları</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Kat Malikleri Denetim Kurulu Resmi Protokolü
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed font-normal">
          Sitenizin veya apartmanınızın mali, hukuki, teknik ve personel işleyişini kanuni standartlarda denetleyebilmeniz için 24 maddelik akredite kontrol protokolü.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeCategory === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Tüm Maddeler (24)
        </button>
        {KMK_AUDIT_CATEGORIES.map((cat) => {
          const count = KMK_AUDIT_CHECKPOINTS.filter((c) => c.category === cat.id).length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">{cat.icon}</span>
              <span>{cat.title} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Checkpoint Accordion List */}
      <div className="space-y-3">
        {filteredCheckpoints.map((chk) => {
          const isExpanded = expandedId === chk.id;
          return (
            <div
              key={chk.id}
              id={chk.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-950/80 border-purple-500/50 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : chk.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-xs font-bold shrink-0">
                    {chk.stepNumber}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {chk.checkpointTitle}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                      <span className="text-purple-400 font-semibold">{chk.legalBasis}</span>
                      <span>•</span>
                      <span>Periyot: {chk.auditFrequency}</span>
                    </div>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-purple-400' : ''}`} aria-hidden="true">
                  expand_more
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-300 block mb-1">Denetim Açıklaması ve Yöntemi:</span>
                    <p className="text-slate-300 leading-relaxed font-normal">
                      {chk.inspectionDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5 mb-1 text-xs">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">warning</span>
                        İhmal Halinde Doğacak Yasal Risk:
                      </span>
                      <p className="text-rose-200/90 text-xs leading-relaxed font-normal">
                        {chk.riskIfFailed}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1 text-xs">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
                        Alo Yönetim Çözüm ve Güvencesi:
                      </span>
                      <p className="text-emerald-200/90 text-xs leading-relaxed font-normal">
                        {chk.aloYonetimGuarantee}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Protocol Summary Footer */}
      <div className="mt-8 pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          Denetim protokolü 634 Sayılı KMK m.41, İİK m.68 ve 4857 Sayılı İş Kanunu normlarına %100 uyumludur.
        </div>
        <div className="text-slate-300 font-semibold">
          Alo Yönetim ile yönetilen tüm sitelerde denetçilere özel şifre ve anlık Apsiyon portalı tahsis edilir.
        </div>
      </div>
    </section>
  );
}
