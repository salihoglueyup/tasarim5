"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const MILESTONES = [
  { badgeColor: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20', achievements: 2, isCurrent: false },
  { badgeColor: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20', achievements: 3, isCurrent: false },
  { badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20', achievements: 3, isCurrent: true },
  { badgeColor: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20', achievements: 3, isCurrent: false },
];

export default function VisionRoadmapSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section
      id="vizyon-yol-haritasi"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="timeline" className="text-sm text-brand-500" />
            <span>{tk('viz_road_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('viz_road_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('viz_road_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {MILESTONES.map((milestone, idx) => {
            const n = idx + 1;
            return (
              <div
                key={n}
                className={`bg-[var(--color-surface)] border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all relative ${
                  milestone.isCurrent
                    ? 'border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-[var(--color-outline)]/80 hover:border-[var(--color-outline)]'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xl sm:text-2xl font-black text-[var(--color-primary)] tracking-tight">
                      {tk(`viz_road_${n}_period`)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${milestone.badgeColor}`}>
                      {tk(`viz_road_${n}_badge`)}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-3 leading-snug">
                    {tk(`viz_road_${n}_title`)}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6 font-normal">
                    {tk(`viz_road_${n}_desc`)}
                  </p>

                  <ul className="space-y-2 border-t border-[var(--color-outline)]/40 pt-4">
                    {Array.from({ length: milestone.achievements }, (_, a) => a + 1).map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2 text-xs text-[var(--color-primary)] font-medium"
                      >
                        <Icon name="arrow_right" className="text-sm text-brand-500 shrink-0 mt-0.5" />
                        <span>{tk(`viz_road_${n}_a${a}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {milestone.isCurrent && (
                  <div className="mt-6 pt-3 border-t border-emerald-500/30 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{tk('viz_road_current')}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
