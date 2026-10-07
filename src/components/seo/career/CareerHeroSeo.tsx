"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';

import Icon from '@/components/ui/branding/Icon';
interface CareerHeroSeoProps {
  lang?: string;
  onOpenApply?: (role?: string) => void;
}

const STAT_ICONS = ['payments', 'verified_user', 'shield', 'swap_horiz'];

export default function CareerHeroSeo(_props: CareerHeroSeoProps) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  return (
    <section className="dark relative overflow-hidden bg-slate-950 text-white pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-slate-800/30 via-slate-900/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href={localePath('/', language)} className="hover:text-white transition-colors">
            {tk('nav_home')}
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-medium">{tk('ist_hero_crumb')}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
            <Icon name="handshake" className="text-sm" />
            <span>{tk('ist_hero_badge')}</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {tk('ist_hero_live')}
          </span>
        </div>

        <div className="max-w-4xl mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            {tk('ist_hero_h1a')}{' '}
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {tk('ist_hero_h1b')}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            {tk('ist_hero_p')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-14">
          <a
            href="#hizmet-branslari"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Icon name="work" className="text-lg" />
            <span>{tk('ist_hero_cta_apply')}</span>
          </a>

          <a
            href="#basvuru-formu"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-200 backdrop-blur-md"
          >
            <Icon name="assignment_ind" className="text-lg" />
            <span>{tk('ist_hero_cta_request')}</span>
          </a>

          <a
            href="#yasal-guvence"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors py-2 px-1"
          >
            <span>{tk('ist_hero_cta_shield')}</span>
            <Icon name="arrow_forward" className="text-base" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STAT_ICONS.map((icon, i) => (
            <div
              key={icon}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 md:p-6 shadow-sm hover:border-white/25 transition-all duration-200 flex flex-col justify-between backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {tk(`ist_stat_${i + 1}_value`)}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center shrink-0">
                  <Icon name={icon} className="text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{tk(`ist_stat_${i + 1}_label`)}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{tk(`ist_stat_${i + 1}_desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
