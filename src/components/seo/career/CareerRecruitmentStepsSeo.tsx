"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const STEP_ICONS = ['edit_document', 'policy', 'record_voice_over', 'school', 'how_to_reg'];

export default function CareerRecruitmentStepsSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section id="ise-alim-sureci" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="checklist" className="text-sm" />
            <span>{tk('ist_step_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('ist_step_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('ist_step_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {STEP_ICONS.map((icon, idx) => (
            <div
              key={icon}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between relative group hover:border-[var(--color-primary)]/40 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[var(--color-outline)] group-hover:text-[var(--color-primary)] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Icon name={icon} className="text-xl" />
                  </div>
                </div>

                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 mb-2">
                  {tk(`ist_step_${idx + 1}_badge`)}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)] mb-2 leading-snug">
                  {tk(`ist_step_${idx + 1}_title`)}
                </h3>

                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  {tk(`ist_step_${idx + 1}_desc`)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-outline)]/40 text-[11px] font-semibold text-[var(--color-primary)] flex items-center justify-between">
                <span>{tk('ist_step_label')} {idx + 1} / 5</span>
                <Icon name="done" className="text-xs" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
