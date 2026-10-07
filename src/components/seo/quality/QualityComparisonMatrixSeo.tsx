"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';

// Kritik standart işaretli satırlar (1-tabanlı satır numaraları)
const CRITICAL_ROWS = [1, 2, 4, 6];
const ROW_COUNT = 6;

export default function QualityComparisonMatrixSeo() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section className="py-20 md:py-28 bg-[var(--color-background)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-4">
            <Icon name="compare" className="text-sm" />
            {tk('qlt_cmp_badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('qlt_cmp_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            {tk('qlt_cmp_desc')}
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[var(--color-outline)]/70 shadow-sm bg-[var(--color-surface)]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/60">
                <th className="py-4 px-5 font-bold text-[var(--color-primary)] w-1/3">{tk('qlt_cmp_col_crit')}</th>
                <th className="py-4 px-5 font-bold text-slate-600 dark:text-slate-400 w-1/3">{tk('qlt_cmp_col_trad')}</th>
                <th className="py-4 px-5 font-bold text-emerald-600 dark:text-emerald-400 w-1/3 bg-emerald-500/5">{tk('qlt_cmp_col_alo')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-outline)]/40">
              {Array.from({ length: ROW_COUNT }, (_, i) => i + 1).map((n) => (
                <tr key={n} className="hover:bg-[var(--color-surface-variant)]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-[var(--color-primary)]">
                    <div className="flex items-center gap-2">
                      {CRITICAL_ROWS.includes(n) && (
                        <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" title={tk('qlt_cmp_crit_title')} />
                      )}
                      <span>{tk(`qlt_cmp_${n}_crit`)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[var(--color-secondary)]">
                    <div className="flex items-start gap-2">
                      <Icon name="close" className="text-slate-500 text-base shrink-0 mt-0.5" />
                      <span>{tk(`qlt_cmp_${n}_trad`)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[var(--color-primary)] font-medium bg-emerald-500/5">
                    <div className="flex items-start gap-2">
                      <Icon name="check_circle" className="text-emerald-500 text-base shrink-0 mt-0.5" />
                      <span>{tk(`qlt_cmp_${n}_alo`)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>{tk('qlt_cmp_note')}</span>
          </div>
          <Link
            href={localePath('/teklif-al', language)}
            className="text-slate-600 dark:text-slate-400 font-bold hover:underline flex items-center gap-1"
          >
            {tk('qlt_cmp_cta')}
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
