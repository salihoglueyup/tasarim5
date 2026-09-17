"use client";

import React, { useState } from 'react';

export interface TermAiOverviewCardProps {
  term: string;
  definition: string;
  className?: string;
}

export default function TermAiOverviewCard({
  term,
  definition,
  className = '',
}: TermAiOverviewCardProps) {
  const [copied, setCopied] = useState(false);

  // İlk 1-2 cümleyi hap tanım olarak çıkar
  const firstSentence = definition.split('.')[0] + '.';
  const directAnswer = `${term}; 634 Sayılı Kat Mülkiyeti Kanunu ve entegre tesis yönetimi standartlarında ${firstSentence.toLowerCase().startsWith(term.toLowerCase()) ? firstSentence.slice(term.length).trim().replace(/^[,;:\-–\s]+/, '') : firstSentence}`;

  const question = `${term} Nedir ve Ne Anlama Gelir?`;

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
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
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: directAnswer,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${term} Nedir? | Google AI Overview Sözlük Tanımı`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#term-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="term-ai-overview"
      aria-label={`${term} Google AI Overviews Sözlük Tanımı`}
      className={`bg-[var(--color-surface)] border border-amber-500/30 rounded-[2.5rem] p-6 sm:p-8 shadow-sm relative overflow-hidden my-4 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/10 dark:bg-amber-400/10 border border-amber-600/20 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">auto_awesome</span>
          <span>Google AI Overviews & DefinedTerm Sözlük Otoritesi</span>
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
          634 KMK Standart Tanım
        </span>
      </div>

      {/* Question */}
      <h2 className="text-lg sm:text-xl font-extrabold text-[var(--color-primary)] mb-3 relative z-10 tracking-tight">
        {question}
      </h2>

      {/* Answer Box */}
      <div className="bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)] rounded-2xl p-5 mb-5 relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <p id="term-instant-answer-text" className="text-sm sm:text-base text-[var(--color-primary)] leading-relaxed font-normal">
            <strong>{term}</strong>: {directAnswer}
          </p>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-lg bg-amber-600/10 hover:bg-amber-600/20 text-amber-700 dark:text-amber-300 transition-colors border border-amber-600/20 cursor-pointer"
            title="Tanımı Kopyala"
            aria-label="Doğrudan yanıtı panoya kopyala"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        {/* 2-Column Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[var(--color-outline)]/60 text-xs text-[var(--color-secondary)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-base shrink-0" aria-hidden="true">check_circle</span>
            <span><strong>Uygulama Alanı:</strong> Apartman, Site, Rezidans ve Tesisler</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-base shrink-0" aria-hidden="true">check_circle</span>
            <span><strong>Doğrulayan:</strong> Alo Yönetim Kat Mülkiyeti Hukuk Masası</span>
          </div>
        </div>
      </div>

      {/* Live AI Bridges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs relative z-10">
        <span className="text-[var(--color-secondary)]">
          🤖 Bu terimi yapay zekada canlı aratın:
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`https://chatgpt.com/?q=${encodeURIComponent(`${term} kat mülkiyeti kanununda ne anlama gelir?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
            ChatGPT
          </a>
          <a
            href={`https://www.perplexity.ai/search?q=${encodeURIComponent(`${term} nedir alo yonetim sozluk`)}`}
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
