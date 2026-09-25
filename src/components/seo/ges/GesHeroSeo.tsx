"use client";

import React from 'react';
import Link from 'next/link';
import { QuoteCtaButton } from '@/components';

interface GesHeroSeoProps {
  lang?: string;
  onOpenQuote?: () => void;
}

export default function GesHeroSeo({ lang = 'tr', onOpenQuote }: GesHeroSeoProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-800/80">
      {/* Background Solar & Eco glow effects */}
      <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Anasayfa
          </Link>
          <span>/</span>
          <Link href="/kurumsal/surdurulebilirlik" className="hover:text-white transition-colors">
            Sürdürülebilirlik
          </Link>
          <span>/</span>
          <span className="text-slate-200">Çatı GES Projeleri</span>
        </nav>

        {/* Authority Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-xs">
            <span className="material-symbols-outlined text-sm text-amber-400" aria-hidden="true">
              solar_power
            </span>
            <span>EPDK LİSANSSIZ ÜRETİM (MADDE 5/1-ç) UYUMLU</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium">
            <span className="material-symbols-outlined text-xs text-blue-400" aria-hidden="true">
              gavel
            </span>
            <span>634 Sayılı KMK m.42 Yasal Karar Güvencesi</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <span className="material-symbols-outlined text-xs text-emerald-400" aria-hidden="true">
              verified
            </span>
            <span>TEDAŞ & Dağıtım Şirketi Bağlantı Onaylı</span>
          </div>
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15] mb-6">
          Sitelerde Çatı GES ile{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400">
            Ortak Alan Elektrik Faturasını
          </span>{' '}
          Sıfırlayın
        </h1>

        {/* Value Proposition Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-8">
          Rezidans, toplu konut ve sitelerde asansör, hidrofor, ortak aydınlatma ve kapalı otopark giderlerinde{' '}
          <strong className="text-amber-300 font-semibold">%70-85 net tasarruf</strong> sağlayan güneş enerjisi santrali (GES).
          634 Sayılı KMK karar şablonları, çift yönlü mahsuplaşma ve TEDAŞ onaylı anahtar teslim mühendislikle aidatları kalıcı olarak düşürün.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          {onOpenQuote ? (
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-lg">solar_power</span>
              <span>Ücretsiz Çatı Fizibilitesi Al</span>
            </button>
          ) : (
            <QuoteCtaButton className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-lg">solar_power</span>
              <span>Ücretsiz Çatı Fizibilitesi Al</span>
            </QuoteCtaButton>
          )}

          <button
            type="button"
            onClick={() => scrollToSection('ges-hesaplayici')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg text-amber-400">calculate</span>
            <span>Amortisman & Tasarruf Hesapla</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('ges-izin-sureci')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white font-medium transition-colors cursor-pointer py-2 px-1"
          >
            <span>6 Aşamalı İzin Rehberi</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* 4 Verified Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-400">%70 - %85</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <span className="material-symbols-outlined text-xl">savings</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Ortak Elektrik Tasarrufu</div>
            <p className="text-xs text-slate-400 mt-1">Asansör, hidrofor, aydınlatma ve otopark fanlarında net düşüş</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-400">3.2 Yıl</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <span className="material-symbols-outlined text-xl">trending_up</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Amortisman Süresi</div>
            <p className="text-xs text-slate-400 mt-1">Yatırım maliyetini 3 yılda karşılar, 22+ yıl bedava elektrik üretir</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-400">25+ Yıl</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Tier-1 Panel Garantisi</div>
            <p className="text-xs text-slate-400 mt-1">Avrupa standartlarında monokristal solar hücre ve invertör güvencesi</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-teal-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-teal-400">14.800 T</span>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <span className="material-symbols-outlined text-xl">forest</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Engellenen CO₂ Salımı</div>
            <p className="text-xs text-slate-400 mt-1">Yıllık 120.000 yetişkin ağacın sağladığı temiz havaya eşdeğer katkı</p>
          </div>
        </div>
      </div>
    </section>
  );
}
