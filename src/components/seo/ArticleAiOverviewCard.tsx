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
      className={`bg-[var(--color-surface)] border border-indigo-500/30 rounded-[2.5rem] p-6 sm:p-8 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Glow Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 border border-indigo-600/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">auto_awesome</span>
          <span>Google AI Overviews & TL;DR Doğrulanmış Özet</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60">
            {category}
          </span>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            Doğrulanmış Bilgi
          </span>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg sm:text-xl font-extrabold text-[var(--color-primary)] mb-3 relative z-10 tracking-tight">
        {question}
      </h3>

      {/* Answer Box */}
      <div className="bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)] rounded-2xl p-5 mb-5 relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <p id="article-instant-answer-text" className="text-sm sm:text-base text-[var(--color-primary)] leading-relaxed font-normal">
            {cleanAnswer}
          </p>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 transition-colors border border-indigo-600/20 cursor-pointer"
            title="Özeti Kopyala"
            aria-label="Doğrudan yanıtı panoya kopyala"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        {/* Operational / Legal Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[var(--color-outline)]/60 text-xs text-[var(--color-secondary)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-base shrink-0" aria-hidden="true">check_circle</span>
            <span><strong>Uzman İncelemesi:</strong> {authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-base shrink-0" aria-hidden="true">check_circle</span>
            <span><strong>Mevzuat Dayanağı:</strong> 634 KMK & Yargıtay HGK Emsalleri</span>
          </div>
        </div>
      </div>

      {/* AI Live Inquiries */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs relative z-10">
        <span className="text-[var(--color-secondary)]">
          🤖 Bu konuyu doğrudan yapay zekaya sorun:
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`https://chatgpt.com/?q=${encodeURIComponent(`${title} hakkında kat mülkiyeti kanunu ne diyor?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
            ChatGPT
          </a>
          <a
            href={`https://www.perplexity.ai/search?q=${encodeURIComponent(`${title} alo yonetim kmk hukuku`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-xs" aria-hidden="true">travel_explore</span>
            Perplexity
          </a>
        </div>
      </div>
    </section>
  );
}
