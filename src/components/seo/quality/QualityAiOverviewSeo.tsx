"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const FACTS = [
  { icon: 'verified', n: 1 },
  { icon: 'visibility', n: 2 },
  { icon: 'timer', n: 3 },
  { icon: 'lock', n: 4 },
];

export default function QualityAiOverviewSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [copied, setCopied] = useState(false);

  const directAnswerText = tk('qlt_ai_text');

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 md:p-10 shadow-xl text-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 blur-3xl rounded-full pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                <Icon name="verified" className="text-lg" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {tk('qlt_ai_label')}
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 ml-2">
                  • {tk('qlt_ai_badge')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={tk('qlt_ai_copy')}
            >
              <Icon name={copied ? 'check' : 'content_copy'} className="text-sm" />
              <span>{copied ? tk('qlt_ai_copied') : tk('qlt_ai_copy')}</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4 leading-snug relative z-10">
            {tk('qlt_ai_q')}
          </h2>

          <div
            id="quality-instant-answer-text"
            className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 relative z-10"
          >
            <p>{directAnswerText}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
            {FACTS.map((f) => (
              <div key={f.n} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200">
                <Icon name={f.icon} className="text-base text-slate-300" />
                <span>
                  <strong>{tk(`qlt_ai_f${f.n}_label`)}</strong> {tk(`qlt_ai_f${f.n}_text`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
