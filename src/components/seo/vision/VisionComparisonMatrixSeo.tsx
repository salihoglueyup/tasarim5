"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const ROW_COUNT = 6;
const TABS = [
  { id: 'all', key: 'viz_cmp_tab_all', rows: [0, 1, 2, 3, 4, 5] },
  { id: 'financial', key: 'viz_cmp_tab_fin', rows: [0, 1, 4, 5] },
  { id: 'operational', key: 'viz_cmp_tab_ops', rows: [2, 3] },
] as const;

export default function VisionComparisonMatrixSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('all');

  const visibleRows = (TABS.find((tab) => tab.id === activeTab)?.rows ?? []).filter((r) => r < ROW_COUNT);

  return (
    <section
      id="yonetim-karsilastirma"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="compare_arrows" className="text-sm text-brand-500" />
            <span>{tk('viz_cmp_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('viz_cmp_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('viz_cmp_desc')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                    : 'bg-[var(--color-surface-variant)]/60 text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {tk(tab.key)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {visibleRows.map((row) => {
            const n = row + 1;
            return (
              <div
                key={n}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xs hover:border-[var(--color-outline)] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-[var(--color-outline)]/40">
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    <span>{tk(`viz_cmp_${n}_crit`)}</span>
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold">
                    {tk(`viz_cmp_${n}_benefit`)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-500/5 border border-slate-500/20 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-2">
                        <Icon name="cancel" className="text-base" />
                        <span>{tk('viz_cmp_col_trad')}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                        {tk(`viz_cmp_${n}_trad`)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                        <Icon name="verified" className="text-base" />
                        <span>{tk('viz_cmp_col_alo')}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--color-primary)] font-medium leading-relaxed">
                        {tk(`viz_cmp_${n}_alo`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
