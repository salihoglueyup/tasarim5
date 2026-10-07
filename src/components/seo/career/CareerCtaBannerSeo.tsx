"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';
export default function CareerCtaBannerSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section className="py-16 md:py-20 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/80 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Icon name="person" className="text-sm" />
                <span>{tk('ist_cta_c_badge')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-3">
                {tk('ist_cta_c_title')}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                {tk('ist_cta_c_desc')}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[var(--color-outline)]/60">
              <a
                href="#basvuru-formu"
                className="w-full py-3.5 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{tk('ist_cta_c_btn')}</span>
                <Icon name="arrow_forward" className="text-sm" />
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-primary)] text-[var(--color-on-primary)] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                <Icon name="apartment" className="text-sm" />
                <span>{tk('ist_cta_m_badge')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {tk('ist_cta_m_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {tk('ist_cta_m_desc')}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/20">
              <a
                href="#basvuru-formu"
                className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-[var(--color-primary)] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{tk('ist_cta_m_btn')}</span>
                <Icon name="arrow_forward" className="text-sm" />
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
                <Icon name="verified_user" className="text-sm text-white" />
                <span>{tk('ist_cta_m_note')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
