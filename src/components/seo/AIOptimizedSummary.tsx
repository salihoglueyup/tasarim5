"use client";

import React from 'react';
import { motion } from 'framer-motion';
import JsonLd from './JsonLd';

interface QuickFact {
  label: string;
  value: string;
}

interface AIOptimizedSummaryProps {
  title?: string;
  summary: string;
  keyTakeaways?: string[];
  quickFacts?: QuickFact[];
  citationUrl?: string;
  className?: string;
}

/**
 * Google SGE (Search Generative Experience), Perplexity & ChatGPT İçin Optimize Edilmiş Özet Kartı
 * 
 * Hem modern, ferah bir "Hızlı Bilgi / Yönetici Özeti" UI sunar,
 * hem de yapay zeka arama motorlarının Alo Yönetim'i kaynak olarak göstermesi için
 * 'SpeakableSpecification' ve anlamsal veri enjekte eder.
 */
export default function AIOptimizedSummary({
  title = "Öne Çıkan Bilgiler & Hızlı Özet",
  summary,
  keyTakeaways = [],
  quickFacts = [],
  citationUrl,
  className = "",
}: AIOptimizedSummaryProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: summary,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ai-summary-text', '.ai-takeaway-item'],
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative my-8 p-6 md:p-8 rounded-[2.5rem] bg-[var(--color-surface)] border border-[var(--color-outline)]/60 shadow-sm ${className}`}
    >
      <JsonLd data={schema} />

      {/* AI / SGE Rozeti */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
            <span className="material-symbols-outlined text-lg" aria-hidden="true">auto_awesome</span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Hızlı Özet & Temel Standartlar
          </span>
        </div>
        <span className="text-[11px] font-medium text-[var(--color-secondary)] flex items-center gap-1 bg-[var(--color-surface-variant)] px-2.5 py-1 rounded-full border border-[var(--color-outline)]/60">
          <span className="material-symbols-outlined text-xs text-emerald-500" aria-hidden="true">verified</span>
          Doğrulanmış Bilgi
        </span>
      </div>

      {/* Ana Başlık */}
      <h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-3">
        {title}
      </h3>

      {/* Özet Metin (AI Speakable Selector) */}
      <p className="ai-summary-text text-base md:text-lg font-light text-[var(--color-secondary)] leading-relaxed mb-6">
        {summary}
      </p>

      {/* Maddeler (Key Takeaways) */}
      {keyTakeaways.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-[var(--color-outline)]/40">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-tertiary)]">
            Önemli Çıkarımlar
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
            {keyTakeaways.map((takeaway, i) => (
              <li
                key={i}
                className="ai-takeaway-item flex items-start gap-2.5 text-sm text-[var(--color-primary)] bg-[var(--color-surface-variant)] p-3 rounded-xl border border-[var(--color-outline)]/60"
              >
                <span className="material-symbols-outlined text-emerald-500 text-base shrink-0 mt-0.5" aria-hidden="true">
                  check_circle
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hızlı Bilgiler (Quick Facts Grid) */}
      {quickFacts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-[var(--color-outline)]/40">
          {quickFacts.map((fact, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[11px] text-[var(--color-tertiary)] font-medium">
                {fact.label}
              </span>
              <span className="text-sm font-bold text-[var(--color-primary)]">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
