"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';
interface QualityHeroSeoProps {
  onOpenQuote?: () => void;
}

const METRIC_COUNT = 4;

export default function QualityHeroSeo({ onOpenQuote }: QualityHeroSeoProps) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section className="relative w-full bg-slate-950 text-white border-b border-white/10 overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 px-[var(--spacing-gutter)]">
      {/* Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-950 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
          alt={tk('qlt_meta_title')}
          fill
          className="object-cover object-center opacity-25"
          priority
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
        <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
        <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto relative z-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 justify-center">
          <Link href={localePath('/', language)} className="hover:text-white transition-colors">
            {tk('nav_home')}
          </Link>
          <span className="text-slate-600">/</span>
          <Link href={localePath('/hakkimizda', language)} className="hover:text-white transition-colors">
            {tk('nav_corporate')}
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-semibold">{tk('quality_title')}</span>
        </nav>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
          {[
            { icon: 'verified', key: 'qlt_hero_b1' },
            { icon: 'workspace_premium', key: 'qlt_hero_b2' },
            { icon: 'gavel', key: 'qlt_hero_b3' },
          ].map((b) => (
            <span key={b.key} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-200 bg-slate-500/10 border border-slate-500/20 backdrop-blur-md uppercase tracking-wider">
              <Icon name={b.icon} className="text-sm text-slate-300" />
              {tk(b.key)}
            </span>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            {tk('qlt_hero_h1a')} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">
              {tk('qlt_hero_h1b')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            {tk('qlt_hero_p')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={localePath('/teklif-al', language)}
              onClick={onOpenQuote}
              className="w-full sm:w-auto bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{tk('qlt_hero_cta_quote')}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
            <a
              href="#kalite-sutunlari"
              className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icon name="verified_user" className="text-lg text-slate-300" />
              <span>{tk('qlt_hero_cta_pillars')}</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-slate-800/80">
          {Array.from({ length: METRIC_COUNT }, (_, i) => i + 1).map((n) => (
            <div key={n} className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{tk(`qlt_card_${n}_value`)}</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">{tk(`qlt_card_${n}_title`)}</div>
              <p className="text-[11px] text-slate-400 mt-1">{tk(`qlt_card_${n}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
