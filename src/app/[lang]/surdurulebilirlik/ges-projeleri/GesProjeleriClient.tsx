"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
import Icon from '@/components/ui/branding/Icon';

interface GesProjeleriClientProps {
  lang?: string;
}

const CONSIDERATION_ICONS = ['roofing', 'bolt', 'gavel', 'description', 'build'];
const STEP_COUNT = 6;
const FAQ_COUNT = 4;

export default function GesProjeleriClient(_props: GesProjeleriClientProps) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <section className="relative bg-slate-950 text-white pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/10 px-[var(--spacing-gutter)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href={localePath('/', language)} className="hover:text-white transition-colors">{tk('nav_home')}</Link>
            <span className="text-slate-600">/</span>
            <Link href={localePath('/surdurulebilirlik', language)} className="hover:text-white transition-colors">{tk('sust_hub_title')}</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">{tk('ges_g_crumb')}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 max-w-4xl leading-tight">
            {tk('ges_g_h1')}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
            {tk('ges_g_lead')}
          </p>
        </div>
      </section>

      <section className="py-10 px-[var(--spacing-gutter)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-sm text-[var(--color-primary)]">
            <Icon name="info" className="text-xl text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-1">{tk('ges_g_notice_title')}</div>
              <p className="text-[var(--color-secondary)] leading-relaxed">{tk('ges_g_notice')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-[var(--spacing-gutter)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight mb-8">
            {tk('ges_g_cons_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONSIDERATION_ICONS.map((icon, i) => (
              <div key={icon} className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-surface-variant)] text-[var(--color-primary)] flex items-center justify-center mb-4">
                  <Icon name={icon} className="text-2xl" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)] mb-2">{tk(`ges_g_cons_${i + 1}_title`)}</h3>
                <p className="text-sm text-[var(--color-secondary)] leading-relaxed">{tk(`ges_g_cons_${i + 1}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-[var(--spacing-gutter)] bg-[var(--color-surface-variant)]/20 border-y border-[var(--color-outline)]/60">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight mb-2">
            {tk('ges_g_steps_title')}
          </h2>
          <p className="text-sm text-[var(--color-secondary)] mb-8">{tk('ges_g_steps_desc')}</p>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map((n) => (
              <li key={n} className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70">
                <span className="w-9 h-9 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] font-black text-sm flex items-center justify-center shrink-0">
                  {n}
                </span>
                <span className="text-sm font-semibold text-[var(--color-primary)]">{tk(`ges_g_step_${n}`)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 md:py-16 px-[var(--spacing-gutter)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <div className="p-6 md:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--color-surface-variant)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
              <Icon name="ev_station" className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-primary)] mb-2">{tk('ges_g_ev_title')}</h2>
              <p className="text-sm text-[var(--color-secondary)] leading-relaxed">{tk('ges_g_ev_text')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-[var(--spacing-gutter)] bg-[var(--color-surface-variant)]/20 border-y border-[var(--color-outline)]/60">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight mb-8">
            {tk('ges_g_faq_title')}
          </h2>
          <div className="space-y-4">
            {Array.from({ length: FAQ_COUNT }, (_, i) => i + 1).map((n) => (
              <div key={n} className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70">
                <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)] mb-2">{tk(`ges_g_faq_${n}_q`)}</h3>
                <p className="text-sm text-[var(--color-secondary)] leading-relaxed">{tk(`ges_g_faq_${n}_a`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-[var(--spacing-gutter)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mb-3">{tk('ges_g_cta_title')}</h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] mb-6">{tk('ges_g_cta_text')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={localePath('/teklif-al', language)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {tk('ges_g_cta_btn')}
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
            <Link
              href={localePath('/surdurulebilirlik', language)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] font-semibold text-sm"
            >
              {tk('ges_g_back')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
