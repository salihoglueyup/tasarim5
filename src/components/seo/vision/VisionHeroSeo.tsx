"use client";

import React from 'react';
import Link from 'next/link';
import QuoteCtaButton from '@/components/ui/widgets/QuoteCtaButton';

import Icon from '@/components/ui/branding/Icon';
interface VisionHeroSeoProps {
  lang?: string;
  onOpenQuote?: () => void;
}

export default function VisionHeroSeo({
  lang = 'tr',
  onOpenQuote,
}: VisionHeroSeoProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            Anasayfa
          </Link>
          <span>/</span>
          <Link
            href="/hakkimizda"
            className="hover:text-white transition-colors"
          >
            Kurumsal
          </Link>
          <span>/</span>
          <span className="text-slate-200">Vizyon & Misyon</span>
        </nav>

        {/* Authority Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-xs">
            <Icon name="verified" className="text-sm text-brand-400" />
            <span>ISO 45001 • ISO 14001 • ISO 10002 — ILAS AKREDİTELİ</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-300 text-xs font-medium">
            <Icon name="gavel" className="text-xs text-slate-400" />
            <span>634 Sayılı KMK Hukuk Güvencesi</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <Icon name="shield" className="text-xs text-emerald-400" />
            <span>5188 Lisanslı Özel Güvenlik Altyapısı</span>
          </div>
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15] mb-6">
          Geleceğin Akıllı ve Şeffaf{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-brand-300 to-slate-300">
            Tesis Yönetimi Standartlarını
          </span>{' '}
          İnşa Ediyoruz
        </h1>

        {/* Value Proposition Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-8">
          Türkiye genelinde 45.000&apos;den fazla bağımsız bölümde geleneksel kapalı yönetim anlayışını ortadan kaldıran;
          <strong> %100 açık kasa şeffaflığı</strong>, bağımsız mali denetim, <strong>dokunulmaz kıdem tazminatı bloke fonu</strong> ve
          yapay zeka destekli bina otomasyonu ile sakin memnuniyetini ve gayrimenkul değerini zirveye taşıyan 2026 yönetim vizyonumuz.
        </p>

        {/* CTA Group */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          {onOpenQuote ? (
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Icon name="request_quote" className="text-lg" />
              <span>Ücretsiz Tesis Fizibilite Teklifi Al</span>
            </button>
          ) : (
            <QuoteCtaButton className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5">
              <Icon name="request_quote" className="text-lg" />
              <span>Ücretsiz Tesis Fizibilite Teklifi Al</span>
            </QuoteCtaButton>
          )}

          <button
            type="button"
            onClick={() => scrollToSection('seffaflik-manifestosu')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all cursor-pointer"
          >
            <Icon name="verified_user" className="text-lg text-slate-400" />
            <span>Kat Malikleri Manifestosu</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('yonetim-karsilastirma')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white font-medium transition-colors cursor-pointer py-2 px-1"
          >
            <span>Geleneksel vs. Alo Yönetim 2026</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>

        {/* 4 Verified Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white">45.000+</span>
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center border border-slate-500/20">
                <Icon name="apartment" className="text-xl" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Bağımsız Bölüm</div>
            <p className="text-xs text-slate-400 mt-1">Rezidans, toplu konut sitesi ve ticari plaza portföyü</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white">1.200+</span>
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20">
                <Icon name="badge" className="text-xl" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Eğitimli Saha Personeli</div>
            <p className="text-xs text-slate-400 mt-1">5188 lisanslı güvenlik, teknik bakım ve hijyen uzmanı</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white">%99,4</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Icon name="savings" className="text-xl" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Tahsilat Başarısı</div>
            <p className="text-xs text-slate-400 mt-1">634 KMK icra hukuku desteğiyle bütçe açığına son</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white">%28</span>
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center border border-slate-500/20">
                <Icon name="energy_savings_leaf" className="text-xl" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">İşletme & Enerji Tasarrufu</div>
            <p className="text-xs text-slate-400 mt-1">Yapay zeka otomasyonu ve toplu satın alma gücüyle</p>
          </div>
        </div>
      </div>
    </section>
  );
}
