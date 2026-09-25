"use client";

import React from 'react';
import { QuoteCtaButton } from '@/components';

interface GesConversionCtaSeoProps {
  onOpenQuote?: () => void;
}

export default function GesConversionCtaSeo({ onOpenQuote }: GesConversionCtaSeoProps) {
  return (
    <section className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 md:p-16 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          {/* Ambient flares */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
                <span className="material-symbols-outlined text-xs">solar_power</span>
                <span>24 Saatte Hazır Teknik Rapor</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Sitenizin Çatısını İnceleyelim:{' '}
                <span className="text-amber-400">Ücretsiz Güneşlenme Fizibilitesi</span> Alın
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-6">
                Sitenizin adresini paylaşın; mühendislerimiz çatı alanını, gölgeleme simülasyonunu ve daire başına 
                sağlanacak yıllık net aidat tasarrufunu içeren detaylı fizibilite dosyasını 
                <strong> hiçbir ücret talep etmeden 24 saat içinde</strong> hazırlasın.
              </p>

              {/* 3 Guarantees */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                  <span>%100 Ücretsiz Mühendislik Keşfi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                  <span>Bağlayıcılık veya Taahhüt Yok</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                  <span>Genel Kurul Karar Metni Desteği</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full lg:w-auto">
              {onOpenQuote ? (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all text-center cursor-pointer transform hover:-translate-y-0.5"
                >
                  Ücretsiz Çatı Fizibilitesi İste ☀️
                </button>
              ) : (
                <QuoteCtaButton className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all text-center cursor-pointer transform hover:-translate-y-0.5">
                  Ücretsiz Çatı Fizibilitesi İste ☀️
                </QuoteCtaButton>
              )}

              <a
                href="https://wa.me/905325504848?text=Merhaba,%20sitemiz%20için%20çatı%20GES%20güneş%20enerjisi%20fizibilitesi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all text-center flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg text-emerald-400">chat</span>
                <span>WhatsApp ile Konum Gönder</span>
              </a>

              <a
                href="tel:02165504848"
                className="text-xs text-center text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>0216 550 48 48 Mühendislik Destek</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
