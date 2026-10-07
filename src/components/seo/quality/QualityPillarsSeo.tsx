"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
import { QUALITY_STANDARDS, type QualityStandardItem } from './qualityData';
import Icon from '@/components/ui/branding/Icon';
export { QUALITY_STANDARDS, type QualityStandardItem };

export default function QualityPillarsSeo() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section id="kalite-sutunlari" className="py-20 md:py-28 bg-[var(--color-background)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
              <Icon name="workspace_premium" className="text-sm" />
              {tk('qlt_pil_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              {tk('qlt_pil_title')}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] max-w-lg font-light leading-relaxed">
            {tk('qlt_pil_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {QUALITY_STANDARDS.map((std) => (
            <div
              key={std.id}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-slate-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon name={std.icon} className="text-2xl" />
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full border ${std.badgeBg}`}>
                    {std.n === 6 ? tk('qlt_hero_b3') : std.badge}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-black tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                    {std.n === 6 ? tk('qlt_std_6_code') : std.code}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors mt-0.5 leading-snug">
                    {tk(`qlt_std_${std.n}_title`)}
                  </h3>
                </div>

                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed mb-5">
                  {tk(`qlt_std_${std.n}_scope`)}
                </p>

                <div className="pt-4 border-t border-[var(--color-outline)]/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3">
                    {tk('qlt_pil_scope_label')}
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--color-primary)] font-medium">
                    {Array.from({ length: std.deliverableCount }, (_, i) => i + 1).map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <Icon name="check_circle" className="text-sm text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-snug">{tk(`qlt_std_${std.n}_d${d}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[var(--color-outline)]/40 flex items-center justify-between text-[11px] text-[var(--color-secondary)]">
                <span className="flex items-center gap-1 font-medium">
                  <Icon name="schedule" className="text-xs text-slate-500" />
                  {tk(`qlt_std_${std.n}_audit`)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-5 rounded-2xl bg-slate-500/5 border border-slate-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-[var(--color-secondary)]">
            <Icon name="verified_user" className="text-slate-600 dark:text-slate-400 text-2xl shrink-0" />
            <span>{tk('qlt_pil_note')}</span>
          </div>
          <Link
            href={localePath('/kurumsal/kalite-belgelerimiz', language)}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-surface)] font-bold hover:opacity-90 transition-opacity"
          >
            {tk('qlt_pil_link')}
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
