"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';

const PILLARS = [
  { icon: 'account_balance_wallet', iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', linkUrl: '/kurumsal/kalite-politikamiz' },
  { icon: 'memory', iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20', linkUrl: '/hizmetler/tesis-yonetimi' },
  { icon: 'local_police', iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20', linkUrl: '/guvenlik-akademisi' },
  { icon: 'gavel', iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20', linkUrl: '/sozluk' },
  { icon: 'eco', iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20', linkUrl: '/kurumsal/surdurulebilirlik' },
];

export default function VisionOperationalPillarsSeo() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section
      id="operasyonel-sutunlar"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="foundation" className="text-sm text-brand-500" />
            <span>{tk('viz_pil_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('viz_pil_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('viz_pil_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => {
            const n = idx + 1;
            return (
              <div
                key={n}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[var(--color-outline)] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs group-hover:scale-105 transition-transform ${pillar.iconBg}`}
                    >
                      <Icon name={pillar.icon} className="text-2xl" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 tracking-tighter">
                      {String(n).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    {tk(`viz_pil_${n}_sub`)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mb-3 leading-snug">
                    {tk(`viz_pil_${n}_title`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6 font-normal">
                    {tk(`viz_pil_${n}_desc`)}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-[var(--color-outline)]/40 pt-4">
                    {[1, 2, 3].map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-[var(--color-primary)] font-medium"
                      >
                        <Icon name="check" className="text-sm text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{tk(`viz_pil_${n}_h${h}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={localePath(pillar.linkUrl, language)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors pt-2 border-t border-[var(--color-outline)]/40"
                >
                  <span>{tk(`viz_pil_${n}_link`)}</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
