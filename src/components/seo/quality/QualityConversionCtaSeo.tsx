"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';
export default function QualityConversionCtaSeo() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section className="py-20 md:py-28 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300 mb-4">
              <Icon name="fact_check" className="text-sm text-slate-300" />
              {tk('qlt_cta_badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              {tk('qlt_cta_h2')}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
              {tk('qlt_cta_p')}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              {[1, 2, 3].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-emerald-400 text-sm" />
                  <span>{tk(`qlt_cta_b${b}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto relative z-10">
            <Link
              href={localePath('/teklif-al', language)}
              className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-slate-200 hover:bg-white text-slate-950 font-bold text-sm shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 text-center cursor-pointer"
            >
              <span>{tk('qlt_cta_c1')}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
            <Link
              href={localePath('/hesaplayici', language)}
              className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all text-center cursor-pointer"
            >
              {tk('qlt_cta_c2')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
