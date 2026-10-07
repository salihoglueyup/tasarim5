"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const PLEDGE_COUNT = 5;

export default function VisionManifestoSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section
      id="seffaflik-manifestosu"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)] relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-slate-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="history_edu" className="text-sm text-brand-500" />
            <span>{tk('viz_man_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('viz_man_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('viz_man_desc')}
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto mb-12">
          {Array.from({ length: PLEDGE_COUNT }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-xs hover:border-[var(--color-outline)] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--color-outline)]/40">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    {String(n).padStart(2, '0')}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
                    {tk(`viz_man_${n}_title`)}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 text-xs font-bold w-fit">
                  {tk(`viz_man_${n}_badge`)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4">
                {tk(`viz_man_${n}_desc`)}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium bg-[var(--color-surface-variant)]/40 p-2.5 rounded-xl border border-[var(--color-outline)]/50">
                <Icon name="verified" className="text-sm text-brand-500 shrink-0" />
                <span><strong>{tk('viz_man_basis_label')}</strong> {tk(`viz_man_${n}_basis`)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0">
            <Icon name="verified_user" className="text-3xl" />
          </div>
          <div>
            <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              {tk('viz_man_protocol')}
            </div>
            <div className="text-base sm:text-lg font-bold text-white">
              {tk('viz_man_protocol_desc')}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{tk('viz_man_note')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
