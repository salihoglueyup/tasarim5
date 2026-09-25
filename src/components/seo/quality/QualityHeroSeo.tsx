"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface QualityHeroSeoProps {
  onOpenQuote?: () => void;
}

export default function QualityHeroSeo({ onOpenQuote }: QualityHeroSeoProps) {
  return (
    <section className="relative w-full bg-slate-950 text-white border-b border-white/10 overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 px-[var(--spacing-gutter)]">
      {/* Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-950 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
          alt="Alo Yönetim Kalite Standartları ve ISO Akreditasyonu"
          fill
          className="object-cover object-center opacity-25"
          priority
        />
      </div>

      {/* Abstract Minimal Animation (Rotating Ring & Radar Sweep Line) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
        <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
        <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
        <div
          className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left animate-spin"
          style={{ animationDuration: '3s' }}
        />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto relative z-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 justify-center">
          <Link href="/" className="hover:text-white transition-colors">
            Anasayfa
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/kurumsal" className="hover:text-white transition-colors">
            Kurumsal
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-semibold">Kalite Politikamız</span>
        </nav>

        {/* Accreditation Badges (Titanium & Slate Palette) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-200 bg-slate-500/10 border border-slate-500/20 backdrop-blur-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm text-slate-300">verified</span>
            TÜRKAK & IAF Akreditasyonlu
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-200 bg-slate-500/10 border border-slate-500/20 backdrop-blur-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm text-slate-300">workspace_premium</span>
            ISO 41001 & ISO 9001 Standartları
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-200 bg-slate-500/10 border border-slate-500/20 backdrop-blur-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm text-slate-300">gavel</span>
            TSE HYB 12850 & 5188 Sayılı Kanun
          </span>
        </div>

        {/* Main Title & Subtitle (Ultra-Premium Titanium & Slate) */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Uluslararası ISO Standartlarında <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">
              Tavizsiz Kalite ve Şeffaf Denetim
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Kat mülkiyeti, 5188 lisanslı özel güvenlik, iş sağlığı (İSG) ve bilgi güvenliğinde (KVKK) 
            sıfır toleranslı yönetim anlayışımızla binalarınıza değer katıyor; yılda 48 habersiz 
            çapraz iç denetimle mükemmelliği garanti altına alıyoruz.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ücretsiz Kalite & Güvenlik Keşfi İste</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
            <a
              href="#kalite-sutunlari"
              className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-slate-300">verified_user</span>
              <span>6 Kalite Standardını İncele</span>
            </a>
          </div>
        </div>

        {/* 4 Trust Metrics Strip (Crisp Titanium & Slate) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-slate-800/80">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">6 Standart</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">Uluslararası Akreditasyon</div>
            <p className="text-[11px] text-slate-400 mt-1">ISO 41001, 9001, 27001, 45001, 14001 & TSE</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">48 Denetim</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">Yıllık Habersiz İç Kontrol</div>
            <p className="text-[11px] text-slate-400 mt-1">Her ay bağımsız kalite departmanı saha teftişi</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">%99.4</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">SLA Karşılama Oranı</div>
            <p className="text-[11px] text-slate-400 mt-1">Teknik arıza ve şikayetlerde 20 dk müdahale</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">256-Bit SSL</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">KVKK & Veri Güvenliği</div>
            <p className="text-[11px] text-slate-400 mt-1">Sakin finansal verilerinde sıfır sızıntı garantisi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
