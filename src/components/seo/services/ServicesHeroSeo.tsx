"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';
const TX_MAP: Record<string, string> = {
  "Anasayfa": "shr_1",
  "Hizmetlerimiz": "shr_2",
  "5188 Sayılı Özel Güvenlik Lisansı": "shr_3",
  "634 Sayılı KMK m.34 Güvencesi": "shr_4",
  "Bina, Site ve Tesis Yönetiminde": "shr_5",
  "360° Entegre Çözümler": "shr_6",
  "İstanbul'un 39 ilçesinde şeffaf KMK 37 bütçelemesi, 5188 lisanslı güvenlik kadrosu, 7/24 teknik bakım, asansör yeşil etiket takibi ve hijyenik ortak alan temizliğiyle mülkünüzün değerini koruyor, aidat uyuşmazlıklarına son veriyoruz.": "shr_7",
  "Hizmet arayın: Güvenlik, Asansör, Temizlik, KMK Aidat, Peyzaj...": "shr_8",
  "Aramayı temizle": "shr_9",
  "💡 10 ana hizmet alanı içerisinde anlık filtreleme": "shr_10",
  "Sitenize Uygun Paketi Bulun →": "shr_11",
  "Ücretsiz Yönetim Keşfi Al": "shr_12",
  "Tüm Hizmetleri İncele": "shr_13",
  "39 İlçe": "shr_14",
  "İstanbul Geneli Hizmet": "shr_15",
  "Her iki yakada mobil denetim ve operasyon ağı": "shr_16",
  "Aidat Tahsilat Başarısı": "shr_17",
  "KMK 20 ve dijital ödeme altyapısıyla sıfır gecikme": "shr_18",
  "20 Dakika": "shr_19",
  "Acil Teknik Müdahale SLA": "shr_20",
  "Asansör, hidrofor ve elektrikte 7/24 nöbetçi teknisyen": "shr_21",
  "Şeffaf Sakin Portalı": "shr_22",
  "Kuruşu kuruşuna canlı kasa, fatura ve karar arşivi": "shr_23",
};

interface ServicesHeroSeoProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenQuote?: () => void;
}

export default function ServicesHeroSeo({
  searchQuery,
  onSearchChange,
  onOpenQuote,
}: ServicesHeroSeoProps) {
  const { t, language } = useLanguage();
  const lp = (p: string) => (language === 'tr' ? p : `/${language}${p === '/' ? '' : p}`);
  const tx = (s: string): string => {
    const k = TX_MAP[s];
    return k ? t(k as Parameters<typeof t>[0]) : s;
  };
  return (
    <section className="relative w-full bg-slate-950 text-white border-b border-white/10 overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 px-[var(--spacing-gutter)]">
      {/* Background Solar & Emerald Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-slate-600/15 via-amber-500/10 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 justify-center">
          <Link href={lp('/')} className="hover:text-amber-400 transition-colors">
            {tx('Anasayfa')}
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-semibold">{tx('Hizmetlerimiz')}</span>
        </nav>

        {/* Regulatory & Authority Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-500/10 border border-slate-500/30 text-slate-300">
            <Icon name="verified" className="text-sm text-slate-400" />
            ISO 45001 & ISO 14001 (ILAS)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Icon name="shield" className="text-sm text-amber-400" />
            {tx('5188 Sayılı Özel Güvenlik Lisansı')}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            <Icon name="gavel" className="text-sm text-emerald-400" />
            {tx('634 Sayılı KMK m.34 Güvencesi')}
          </span>
        </div>

        {/* Main H1 Title */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-6">
            {tx('Bina, Site ve Tesis Yönetiminde')}{' '}
            <span className="bg-gradient-to-r from-slate-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              {tx('360° Entegre Çözümler')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            {tx("İstanbul'un 39 ilçesinde şeffaf KMK 37 bütçelemesi, 5188 lisanslı güvenlik kadrosu, 7/24 teknik bakım, asansör yeşil etiket takibi ve hijyenik ortak alan temizliğiyle mülkünüzün değerini koruyor, aidat uyuşmazlıklarına son veriyoruz.")}
          </p>

          {/* Search Bar & Quick Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <Icon name="search" className="absolute left-4 text-slate-400 text-xl pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={tx('Hizmet arayın: Güvenlik, Asansör, Temizlik, KMK Aidat, Peyzaj...')}
                className="w-full pl-12 pr-12 py-4 bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-400 text-sm sm:text-base rounded-2xl shadow-xl transition-all outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                  aria-label={tx('Aramayı temizle')}
                >
                  <Icon name="close" className="text-sm" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2.5 px-2">
              <span>{tx('💡 10 ana hizmet alanı içerisinde anlık filtreleme')}</span>
              <a href="#hizmet-secici" className="text-amber-400 hover:underline">
                {tx('Sitenize Uygun Paketi Bulun →')}
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={lp('/teklif-al')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Icon name="assignment" className="text-xl" />
              {tx('Ücretsiz Yönetim Keşfi Al')}
            </Link>
            <a
              href="#hizmet-katalogu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm sm:text-base transition-all cursor-pointer"
            >
              <Icon name="grid_view" className="text-lg text-slate-300" />
              {tx('Tüm Hizmetleri İncele')}
            </a>
          </div>
        </div>

        {/* 4 Trust Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-slate-800/80">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-400 mb-1">{tx('39 İlçe')}</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">{tx('İstanbul Geneli Hizmet')}</div>
            <p className="text-[11px] text-slate-400 mt-1">{tx('Her iki yakada mobil denetim ve operasyon ağı')}</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">%98.7</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">{tx('Aidat Tahsilat Başarısı')}</div>
            <p className="text-[11px] text-slate-400 mt-1">{tx('KMK 20 ve dijital ödeme altyapısıyla sıfır gecikme')}</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{tx('20 Dakika')}</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">{tx('Acil Teknik Müdahale SLA')}</div>
            <p className="text-[11px] text-slate-400 mt-1">{tx('Asansör, hidrofor ve elektrikte 7/24 nöbetçi teknisyen')}</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-400 mb-1">%100</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">{tx('Şeffaf Sakin Portalı')}</div>
            <p className="text-[11px] text-slate-400 mt-1">{tx('Kuruşu kuruşuna canlı kasa, fatura ve karar arşivi')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
