"use client";

import React, { useState } from 'react';
import JsonLd from '@/components/seo/schema/JsonLd';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const PILLAR_ICONS = ['shield', 'receipt_long', 'health_and_safety', 'school'];

export default function CareerAiOverviewSeo({ className = '' }: { className?: string; lang?: string }) {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [copied, setCopied] = useState(false);

  const question = tk('ist_ai_q');
  const directAnswer = tk('ist_ai_text');

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
            author: { '@type': 'Organization', name: 'Alo Yönetim' },
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: question,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#career-instant-answer-text'],
      },
    },
  ];

  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(question)}`;

  return (
    <section
      id="career-ai-overview"
      aria-label={tk('ist_ai_label')}
      className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      <JsonLd data={schemaData} />

      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-slate-400/5 via-slate-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
          <Icon name="badge" className="text-[15px]" />
          <span>{tk('ist_ai_label')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[var(--color-surface-variant)] text-[var(--color-primary)] border border-[var(--color-outline)]/60">
            {tk('ist_ai_chip1')}
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60">
            {tk('ist_ai_chip2')}
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <Icon name="work_history" className="text-[var(--color-primary)] text-2xl mt-0.5 shrink-0" />
        <span>{question}</span>
      </h2>

      <div
        id="career-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-secondary)] bg-[var(--color-surface-variant)]/50 p-4 sm:p-5 rounded-2xl border border-[var(--color-outline)]/60 mb-6 relative z-10 font-normal"
      >
        <p>{directAnswer}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative z-10">
        {PILLAR_ICONS.map((icon, i) => (
          <div key={icon} className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
            <div className="flex items-center gap-2 text-[var(--color-primary)] mb-1.5">
              <Icon name={icon} className="text-base" />
              <span className="text-xs font-bold">{tk(`ist_ai_p${i + 1}_title`)}</span>
            </div>
            <p className="text-[11px] text-[var(--color-secondary)] leading-relaxed">
              {tk(`ist_ai_p${i + 1}_desc`)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-outline)]/60 relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-secondary)]">
          <Icon name="gavel" className="text-sm text-[var(--color-primary)]" />
          <span>{tk('ist_ai_source')}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-surface)] border border-[var(--color-outline)] hover:bg-[var(--color-surface-variant)] text-[var(--color-primary)] transition-all cursor-pointer"
            aria-label={tk('ist_ai_copy')}
          >
            <Icon name={copied ? 'check' : 'content_copy'} className="text-sm text-[var(--color-primary)]" />
            <span>{copied ? tk('ist_ai_copied') : tk('ist_ai_copy')}</span>
          </button>

          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] transition-all shadow-xs"
          >
            <span>{tk('ist_ai_claude')}</span>
            <Icon name="open_in_new" className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
