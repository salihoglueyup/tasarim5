"use client";

import React, { useState } from 'react';
import { QUALITY_FAQS, type QualityFaqItem } from './qualityData';
export { QUALITY_FAQS, type QualityFaqItem };

export default function QualityAuthorityFaqSeo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="kalite-sss" className="py-20 md:py-28 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-sm">help</span>
            Kalite Güvencesi ve Denetim Rehberi
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Kalite Politikamız Hakkında Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            Kat malikleri, yönetim kurulları ve denetçilerin kalite akreditasyonlarımız, 
            habersiz denetimler ve SLA taahhütlerimiz hakkında en çok merak ettiği konular.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {QUALITY_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
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
                    {faq.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-cyan-600 dark:text-cyan-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[var(--color-secondary)] font-light leading-relaxed border-t border-[var(--color-outline)]/40"
                  >
                    <p itemProp="text">{faq.answer}</p>
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
