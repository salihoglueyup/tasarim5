"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const PILLAR_ICONS = ['savings', 'gavel', 'receipt_long', 'diversity_3'];

export default function CareerLegalGuaranteeDeepDiveSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section id="yasal-guvence" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <Icon name="shield_with_heart" className="text-sm" />
            <span>{tk('ist_legal_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('ist_legal_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('ist_legal_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 md:p-8 rounded-3xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-secondary)] font-bold text-sm mb-3">
                <Icon name="warning" className="text-lg" />
                <span>{tk('ist_legal_trad_head')}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3">{tk('ist_legal_trad_title')}</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-secondary)]">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <span className="text-[var(--color-secondary)] font-bold mt-0.5">–</span>
                    <span>{tk(`ist_legal_trad_${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 text-xs font-semibold text-[var(--color-secondary)]">
              {tk('ist_legal_trad_foot')}
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-primary)]/30 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm mb-3">
                <Icon name="verified_user" className="text-lg" />
                <span>{tk('ist_legal_alo_head')}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3">{tk('ist_legal_alo_title')}</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-secondary)]">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{tk(`ist_legal_alo_${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 text-xs font-semibold text-[var(--color-primary)] flex items-center justify-between gap-2">
              <span>{tk('ist_legal_alo_foot')}</span>
              <Icon name="check_circle" className="text-base shrink-0" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PILLAR_ICONS.map((icon, idx) => (
            <div
              key={icon}
              className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/30 border border-[var(--color-outline)]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0 mb-3">
                  <Icon name={icon} className="text-xl" />
                </div>
                <h4 className="text-sm font-bold text-[var(--color-primary)] mb-2">{tk(`ist_legal_p${idx + 1}_title`)}</h4>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-4">{tk(`ist_legal_p${idx + 1}_desc`)}</p>
              </div>
              <div className="text-[11px] font-bold text-[var(--color-primary)] pt-3 border-t border-[var(--color-outline)]/40">
                {tk(`ist_legal_p${idx + 1}_benefit`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
