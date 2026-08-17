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
      className={`relative my-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-blue-950/20 border border-blue-100/80 dark:border-blue-900/30 shadow-lg shadow-blue-500/5 ${className}`}
    >
      <JsonLd data={schema} />

      {/* AI / SGE Rozeti */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Hızlı Özet & Temel Standartlar
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-white/10">
          <span className="material-symbols-outlined text-xs text-emerald-500">verified</span>
          Doğrulanmış Bilgi
        </span>
      </div>

      {/* Ana Başlık */}
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>

      {/* Özet Metin (AI Speakable Selector) */}
      <p className="ai-summary-text text-base md:text-lg font-light text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
        {summary}
      </p>

      {/* Maddeler (Key Takeaways) */}
      {keyTakeaways.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-slate-200/60 dark:border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Önemli Çıkarımlar
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
            {keyTakeaways.map((takeaway, i) => (
              <li
                key={i}
                className="ai-takeaway-item flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/40 dark:border-white/5"
              >
                <span className="material-symbols-outlined text-emerald-500 text-base shrink-0 mt-0.5">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10">
          {quickFacts.map((fact, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {fact.label}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
