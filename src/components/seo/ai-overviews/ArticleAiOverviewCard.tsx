"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface ArticleAiOverviewCardProps {
  title: string;
  tldr: string;
  authorName?: string;
  category?: string;
  slug: string;
  className?: string;
}

export default function ArticleAiOverviewCard({
  title,
  tldr,
  authorName = 'Alo Yönetim Hukuk ve Operasyon Masası',
  category = 'Tesis & Kat Mülkiyeti Hukuku',
  slug,
  className = '',
}: ArticleAiOverviewCardProps) {
  const [copied, setCopied] = useState(false);

  const cleanAnswer = tldr.trim();
  const question = `${title} — Google AI Hızlı Özeti ve Yasal Dayanağı`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: cleanAnswer,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${title} | Google AI Overview Özeti`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#article-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="article-ai-overview"
      aria-label={`${title} Makale Hızlı Yapay Zeka Özeti`}
      className={`bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden my-6 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Brand Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/5 via-slate-400/5 to-transparent dark:from-amber-400/5 dark:via-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider shadow-2xs">
          <span className="material-symbols-outlined text-[15px] text-amber-500 dark:text-amber-400" aria-hidden="true">auto_awesome</span>
          <span>Google AI Overviews & TL;DR Doğrulanmış Özet</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10">
            {category}
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-emerald-600 dark:text-emerald-400" aria-hidden="true">verified</span>
            Doğrulanmış Bilgi
          </span>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-3 relative z-10 tracking-tight">
        {question}
      </h3>

      {/* Answer Box */}
      <div className="bg-slate-50/80 dark:bg-[#111218] border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 mb-5 relative z-10 space-y-3 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <p id="article-instant-answer-text" className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
            {cleanAnswer}
          </p>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-white/10 shadow-xs cursor-pointer flex items-center justify-center"
            title="Özeti Kopyala"
            aria-label="Doğrudan yanıtı panoya kopyala"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        {/* Operational / Legal Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base shrink-0" aria-hidden="true">check_circle</span>
            <span><strong>Uzman İncelemesi:</strong> {authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base shrink-0" aria-hidden="true">check_circle</span>
            <span><strong>Mevzuat Dayanağı:</strong> 634 KMK & Yargıtay HGK Emsalleri</span>
          </div>
        </div>
      </div>

      {/* AI Live Inquiries */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs relative z-10 pt-1">
        <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base text-slate-400" aria-hidden="true">smart_toy</span>
          <span>Bu konuyu doğrudan yapay zekaya sorun:</span>
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`https://chatgpt.com/?q=${encodeURIComponent(`${title} hakkında kat mülkiyeti kanunu ne diyor?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
            ChatGPT
          </a>
          <a
            href={`https://www.perplexity.ai/search?q=${encodeURIComponent(`${title} alo yonetim kmk hukuku`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-xs" aria-hidden="true">travel_explore</span>
            Perplexity
          </a>
        </div>
      </div>
    </section>
  );
}
