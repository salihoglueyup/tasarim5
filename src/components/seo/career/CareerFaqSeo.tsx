"use client";

import React, { useState } from 'react';
import { faqPageSchema } from '@/lib/schemas/faq';
import JsonLd from '@/components/seo/schema/JsonLd';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const FAQ_COUNT = 6;

export default function CareerFaqSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: tk(`ist_faq_${i + 1}_q`),
    a: tk(`ist_faq_${i + 1}_a`),
  }));

  const faqSchema = faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <section id="sikca-sorulan-sorular" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <Icon name="quiz" className="text-sm" />
            <span>{tk('ist_faq_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('ist_faq_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('ist_faq_desc')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--color-surface-variant)]/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[var(--color-primary)] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <Icon name="expand_more" className="text-lg" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed border-t border-[var(--color-outline)]/40 pt-4 bg-[var(--color-surface-variant)]/10">
                    {faq.a}
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
