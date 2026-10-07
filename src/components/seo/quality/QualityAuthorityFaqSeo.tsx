"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { QUALITY_FAQ_COUNT } from './qualityData';
import Icon from '@/components/ui/branding/Icon';

export default function QualityAuthorityFaqSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="kalite-sss" className="py-20 md:py-28 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-4">
            <Icon name="help" className="text-sm" />
            {tk('qlt_faq_badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('qlt_faq_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            {tk('qlt_faq_desc')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {Array.from({ length: QUALITY_FAQ_COUNT }, (_, i) => i + 1).map((n, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={n}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="bg-[var(--color-background)] border border-[var(--color-outline)]/70 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--color-surface-variant)]/20 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    itemProp="name"
                    className="text-sm sm:text-base font-bold text-[var(--color-primary)] leading-snug"
                  >
                    {tk(`qlt_faq_${n}_q`)}
                  </span>
                  <Icon name="expand_more" className={`text-slate-600 dark:text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                </button>

                {isOpen && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[var(--color-secondary)] font-light leading-relaxed border-t border-[var(--color-outline)]/40"
                  >
                    <p itemProp="text">{tk(`qlt_faq_${n}_a`)}</p>
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
