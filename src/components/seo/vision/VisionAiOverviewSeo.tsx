"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';

const CARD_ICONS = [
  { icon: 'account_balance', tone: 'text-emerald-600 dark:text-emerald-400' },
  { icon: 'lock', tone: 'text-slate-600 dark:text-slate-400' },
  { icon: 'precision_manufacturing', tone: 'text-slate-600 dark:text-slate-400' },
  { icon: 'shield_with_heart', tone: 'text-slate-600 dark:text-slate-400' },
];

export default function VisionAiOverviewSeo() {
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [copied, setCopied] = useState(false);

  const overviewText = tk('viz_ai_text');

  const handleCopy = () => {
    navigator.clipboard.writeText(overviewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(`Alo Yönetim ${tk('viz_ai_q')}`)}`;

  return (
    <section
      aria-label={tk('viz_ai_label')}
      className="rounded-3xl border border-slate-500/20 bg-gradient-to-br from-slate-50/70 via-white to-slate-50/40 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-800/80 p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-500/5 backdrop-blur-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-slate-500/10 via-brand-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-500/20">
          <Icon name="psychology" className="text-sm" />
          <span>{tk('viz_ai_label')}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {tk('viz_ai_chip1')}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400">
            {tk('viz_ai_chip2')}
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 flex items-start gap-3 relative z-10">
        <Icon name="auto_awesome" className="text-brand-600 dark:text-brand-400 text-2xl sm:text-3xl shrink-0 mt-0.5" />
        <span>{tk('viz_ai_q')}</span>
      </h2>

      <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6 relative z-10">
        <p>{overviewText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 relative z-10">
        {CARD_ICONS.map((card, i) => (
          <div key={card.icon} className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-1.5">
              <Icon name={card.icon} className={`text-base ${card.tone}`} />
              <span>{tk(`viz_ai_c${i + 1}_title`)}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{tk(`viz_ai_c${i + 1}_desc`)}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Icon name="menu_book" className="text-base text-slate-500" />
          <span>{tk('viz_ai_source')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Icon name={copied ? 'check' : 'content_copy'} className="text-sm" />
            <span>{copied ? tk('viz_ai_copied') : tk('viz_ai_copy')}</span>
          </button>
          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition-opacity"
          >
            <span>{tk('viz_ai_claude')}</span>
            <Icon name="open_in_new" className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
