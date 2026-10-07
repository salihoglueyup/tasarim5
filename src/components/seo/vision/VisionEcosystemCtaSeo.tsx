"use client";

import React from 'react';
import Link from 'next/link';
import QuoteCtaButton from '@/components/ui/widgets/QuoteCtaButton';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';
interface VisionEcosystemCtaSeoProps {
  onOpenQuote?: () => void;
}

const CORPORATE_LINKS = [
  { url: '/kurumsal/kalite-belgelerimiz', icon: 'workspace_premium', color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' },
  { url: '/kurumsal/kalite-politikamiz', icon: 'verified', color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' },
  { url: '/kurumsal/surdurulebilirlik', icon: 'eco', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
  { url: '/guvenlik-akademisi', icon: 'local_police', color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' },
  { url: '/istihdam-koprusu', icon: 'diversity_3', color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' },
];

export default function VisionEcosystemCtaSeo({ onOpenQuote }: VisionEcosystemCtaSeoProps) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const waUrl = `https://wa.me/905325504848?text=${encodeURIComponent(tk('viz_eco_wa_msg'))}`;
  const quoteClass =
    'px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all text-center cursor-pointer transform hover:-translate-y-0.5';

  return (
    <section className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="hub" className="text-sm text-brand-500" />
            <span>{tk('viz_eco_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight mb-3">
            {tk('viz_eco_title')}
          </h2>
          <p className="text-sm text-[var(--color-secondary)]">{tk('viz_eco_desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {CORPORATE_LINKS.map((link, idx) => (
            <Link
              key={link.url}
              href={localePath(link.url, language)}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 hover:border-[var(--color-outline)] hover:shadow-md transition-all"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${link.color}`}>
                <Icon name={link.icon} className="text-2xl" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-1">
                  <span>{tk(`viz_eco_l${idx + 1}_title`)}</span>
                  <Icon name="arrow_forward" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--color-secondary)] mt-1 font-normal">
                  {tk(`viz_eco_l${idx + 1}_desc`)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-10 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
                <Icon name="rocket_launch" className="text-xs" />
                <span>{tk('viz_eco_banner_badge')}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                {tk('viz_eco_banner_h2')}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {tk('viz_eco_banner_p')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full lg:w-auto">
              {onOpenQuote ? (
                <button type="button" onClick={onOpenQuote} className={quoteClass}>
                  {tk('viz_eco_banner_cta')}
                </button>
              ) : (
                <QuoteCtaButton className={quoteClass}>{tk('viz_eco_banner_cta')}</QuoteCtaButton>
              )}

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <Icon name="chat" className="text-lg text-emerald-400" />
                <span>{tk('viz_eco_wa')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
