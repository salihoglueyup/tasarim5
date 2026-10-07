"use client";

import React from 'react';
import Link from 'next/link';
import QuoteCtaButton from '@/components/ui/widgets/QuoteCtaButton';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';
interface VisionHeroSeoProps {
  lang?: string;
  onOpenQuote?: () => void;
}

const CARD_STYLES = [
  { icon: 'apartment', tone: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
  { icon: 'badge', tone: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
  { icon: 'account_balance', tone: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { icon: 'fact_check', tone: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
];

export default function VisionHeroSeo({
  onOpenQuote,
}: VisionHeroSeoProps) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const quoteLabel = (
    <>
      <Icon name="request_quote" className="text-lg" />
      <span>{tk('viz_cta_quote')}</span>
    </>
  );
  const quoteClass =
    'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5';

  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-slate-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium"
        >
          <Link href={localePath('/', language)} className="hover:text-white transition-colors">
            {tk('nav_home')}
          </Link>
          <span>/</span>
          <Link href={localePath('/hakkimizda', language)} className="hover:text-white transition-colors">
            {tk('nav_corporate')}
          </Link>
          <span>/</span>
          <span className="text-slate-200">{tk('viz_crumb_page')}</span>
        </nav>

        {/* Authority Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-xs">
            <Icon name="verified" className="text-sm text-brand-400" />
            <span>{tk('viz_hero_b1')}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-300 text-xs font-medium">
            <Icon name="gavel" className="text-xs text-slate-400" />
            <span>{tk('viz_hero_b2')}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <Icon name="shield" className="text-xs text-emerald-400" />
            <span>{tk('viz_hero_b3')}</span>
          </div>
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15] mb-6">
          {tk('viz_hero_h1a')}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-brand-300 to-slate-300">
            {tk('viz_hero_h1b')}
          </span>{' '}
          {tk('viz_hero_h1c')}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-8">
          {tk('viz_hero_p')}
        </p>

        {/* CTA Group */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          {onOpenQuote ? (
            <button type="button" onClick={onOpenQuote} className={quoteClass}>
              {quoteLabel}
            </button>
          ) : (
            <QuoteCtaButton className={quoteClass}>{quoteLabel}</QuoteCtaButton>
          )}

          <button
            type="button"
            onClick={() => scrollToSection('seffaflik-manifestosu')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all cursor-pointer"
          >
            <Icon name="verified_user" className="text-lg text-slate-400" />
            <span>{tk('viz_cta_manifesto')}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('yonetim-karsilastirma')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white font-medium transition-colors cursor-pointer py-2 px-1"
          >
            <span>{tk('viz_cta_compare')}</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>

        {/* 4 Fact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CARD_STYLES.map((card, i) => (
            <div key={card.icon} className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-white">{tk(`viz_card_${i + 1}_value`)}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${card.tone}`}>
                  <Icon name={card.icon} className="text-xl" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">{tk(`viz_card_${i + 1}_title`)}</div>
              <p className="text-xs text-slate-400 mt-1">{tk(`viz_card_${i + 1}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
