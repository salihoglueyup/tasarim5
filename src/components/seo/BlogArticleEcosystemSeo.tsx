"use client";

import React from 'react';
import Link from 'next/link';
import { resolveBlogArticleCluster } from '@/lib/seo/facilityBlogClusterEngine';

interface BlogArticleEcosystemSeoProps {
  title: string;
  content: string;
  tags?: string[];
  categoryName?: string;
  lang?: string;
}

export default function BlogArticleEcosystemSeo({
  title,
  content,
  tags = [],
  categoryName,
  lang = 'tr',
}: BlogArticleEcosystemSeoProps) {
  const cluster = resolveBlogArticleCluster(title, content, tags, categoryName, lang);
  const { recommendedSubSector, relevantLegislation, relevantPrecedents, groupCompanySynergy } = cluster;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 dark:from-white/[0.03] dark:to-white/[0.01] border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 mt-10 mb-8 shadow-sm">
      {/* Top Badge */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified</span>
          Kurumsal Çözüm & Doğrulanmış Mevzuat Ekosistemi
        </div>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
          E-E-A-T Akredite Bilgi Ağı
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Sub-Sector CTA (6 Cols) */}
        <div className="md:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl" aria-hidden="true">
                {recommendedSubSector.icon}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Tesis & Mülk Çözümü
              </span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
              {recommendedSubSector.name}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-4">
              {recommendedSubSector.shortDesc}
            </p>
          </div>

          <Link
            href={recommendedSubSector.url}
            className="inline-flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all group"
            title={recommendedSubSector.anchorText}
          >
            <span>{recommendedSubSector.ctaText}</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Right Column: Legislation & Group Company (6 Cols) */}
        <div className="md:col-span-6 flex flex-col gap-4">
          {/* Legislation References */}
          {relevantLegislation.length > 0 && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
              <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">gavel</span>
                <span>Yasal Mevzuat Dayanakları</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {relevantLegislation.map((leg) => (
                  <a
                    key={leg.id}
                    href={leg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between group py-1 border-b border-slate-100 dark:border-white/5 last:border-0"
                    title={`${leg.name} — ${leg.sourceAuthority}`}
                  >
                    <span className="line-clamp-1">{leg.name}</span>
                    <span className="material-symbols-outlined text-[12px] opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      open_in_new
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Faz 138: Yargıtay İçtihat ve KMK 634 Emsal Kararları */}
          {relevantPrecedents && relevantPrecedents.length > 0 && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
              <div className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">balance</span>
                <span>Yargıtay Emsal Karar Referansı</span>
              </div>
              <div className="flex flex-col gap-2">
                {relevantPrecedents.map((prec) => (
                  <div key={prec.id} className="text-xs text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-white/5 last:border-0 pb-1.5 last:pb-0">
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{prec.subject}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{prec.court} · {prec.docketNumber} / {prec.decisionNumber}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group Company Trust Badge */}
          {groupCompanySynergy ? (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">shield</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {groupCompanySynergy.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {groupCompanySynergy.serviceCategory}
                  </div>
                </div>
              </div>
              <a
                href={groupCompanySynergy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 flex items-center gap-1"
                title={`${groupCompanySynergy.name} Resmi Sitesi`}
              >
                <span>İncele</span>
                <span className="material-symbols-outlined text-[12px]" aria-hidden="true">open_in_new</span>
              </a>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">workspace_premium</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    ISO 41001 & TSE HYB
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Uluslararası Tesis Yönetim Standardı
                  </div>
                </div>
              </div>
              <Link
                href="/kurumsal/kalite-belgelerimiz"
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
              >
                Belgelerimiz →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Faz 188: Blog Makalelerinden Doğrudan /teklif-al ve /hesaplayici CTA Köprüsü */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined text-amber-500 text-base" aria-hidden="true">calculate</span>
          <span>Binanız veya tesisiniz için özel maliyet projeksiyonu çıkarın:</span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/hesaplayici"
            className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
          >
            Bütçe & Aidat Hesapla
          </Link>
          <Link
            href="/teklif-al"
            className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
          >
            Hızlı Teklif Al →
          </Link>
        </div>
      </div>
    </div>
  );
}
