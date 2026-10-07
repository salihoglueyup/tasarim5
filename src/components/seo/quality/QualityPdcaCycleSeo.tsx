"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';

const BADGE_BG = 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20';
const PDCA_STEPS = [
  { step: 'P', name: 'Plan', icon: 'assignment' },
  { step: 'D', name: 'Do', icon: 'engineering' },
  { step: 'C', name: 'Check', icon: 'fact_check' },
  { step: 'A', name: 'Act', icon: 'sync' },
];

export default function QualityPdcaCycleSeo() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const active = PDCA_STEPS[activeStepIndex];
  const n = activeStepIndex + 1;

  return (
    <section id="puko-dongusu" className="py-20 md:py-28 bg-[var(--color-surface)] border-y border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Icon name="all_inclusive" className="text-sm" />
            {tk('qlt_pdca_badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('qlt_pdca_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            {tk('qlt_pdca_desc')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {PDCA_STEPS.map((step, idx) => (
            <button
              key={step.step}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                activeStepIndex === idx
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg scale-102 border-slate-900 dark:border-white'
                  : 'bg-[var(--color-background)] border-[var(--color-outline)]/60 text-[var(--color-secondary)] hover:border-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xl sm:text-2xl font-black ${activeStepIndex === idx ? 'text-slate-400 dark:text-slate-600' : 'text-[var(--color-primary)]'}`}>
                  {step.step}
                </span>
                <Icon name={step.icon} className="text-xl" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold">{tk(`qlt_pdca_${idx + 1}_tname`)}</div>
                <div className="text-[10px] opacity-75">({step.name})</div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-[var(--color-background)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${BADGE_BG}`}>
                {tk('qlt_pdca_stage')} {n} / 4 • {tk(`qlt_pdca_${n}_tname`)} ({active.name})
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Icon name="verified" className="text-sm" />
                {tk(`qlt_pdca_${n}_kpi`)}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] leading-tight">
              {tk(`qlt_pdca_${n}_title`)}
            </h3>

            <p className="text-sm text-[var(--color-secondary)] leading-relaxed font-light">
              {tk(`qlt_pdca_${n}_desc`)}
            </p>

            <div className="pt-4 border-t border-[var(--color-outline)]/40 mt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3">
                {tk('qlt_pdca_actions_label')}
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-primary)]">
                {[1, 2, 3].map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Icon name="task_alt" className="text-base text-slate-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{tk(`qlt_pdca_${n}_a${a}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {tk('qlt_pdca_box_badge')}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{tk('qlt_pdca_box_title')}</h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                {tk('qlt_pdca_box_text')}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                {[1, 2].map((r) => (
                  <div key={r} className="flex items-center justify-between gap-3">
                    <span className="text-slate-400">{tk(`qlt_pdca_row${r}_label`)}</span>
                    <span className="font-bold text-slate-300 text-right">{tk(`qlt_pdca_row${r}_value`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href={localePath('/teklif-al', language)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-400 hover:to-slate-500 text-slate-950 font-extrabold text-sm shadow-md transition-all text-center"
              >
                {tk('qlt_pdca_box_cta')}
                <Icon name="arrow_forward" className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
