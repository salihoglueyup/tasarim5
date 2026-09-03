"use client";

import { useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';
import { waLink } from '@/lib/cro';
import { ORG_PHONE } from '@/lib/constants';
import CallbackForm from '@/components/cro/CallbackForm';

/**
 * Faz 56: QuickCallWidget FAB butonunun Framer Motion'dan arındırılması,
 * mobilde GPU katmanında sabitlenerek (transform-gpu, will-change-transform)
 * layout shift'in (CLS) kesin olarak sıfırlanması.
 */
export default function QuickCallWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'callback'>('menu');
  const { openQuoteModal } = useQuote();
  const { t } = useLanguage();

  const close = () => {
    setIsOpen(false);
    setView('menu');
  };

  const handleOpenSpotlight = () => {
    close();
    window.dispatchEvent(new CustomEvent('open-spotlight-search'));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3 font-sans transform-gpu will-change-transform">

      {isOpen && (
        <div
          role="dialog"
          aria-label="Hızlı İşlemler & İletişim Menüsü"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-[2rem] shadow-2xl flex flex-col gap-3 w-80 text-slate-900 dark:text-white backdrop-blur-xl transition-all duration-200 ease-out transform-gpu animate-in fade-in zoom-in-95"
        >
          {view === 'callback' ? (
            <>
              <button
                onClick={() => setView('menu')}
                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors self-start cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_back</span>
                {t('cro_callback_open')}
              </button>
              <CallbackForm variant="inline" meta={{ kaynak: 'hizli-widget' }} />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                  Hızlı İşlemler & İletişim
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              </div>

              {/* 1. Site İçi Akıllı Arama Kısayolu */}
              <button
                onClick={handleOpenSpotlight}
                className="flex items-center justify-between p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all text-left group shadow-sm cursor-pointer"
                title="Site İçi Akıllı Arama (Ctrl+K / ⌘K)"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform" aria-hidden="true">search</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-400 transition-colors">
                      Site İçi Akıllı Arama
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">
                      Hizmet, ilçe veya KMK ara
                    </span>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/60 dark:bg-white/10 rounded-md border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 font-bold">
                  ⌘K
                </kbd>
              </button>

              {/* 2. Genel Müdürlük Telefonu */}
              <a
                href={`tel:${ORG_PHONE}`}
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_GA_ID) {
                    sendGAEvent('event', 'phone_call_click', { category: 'contact', value: 1 });
                  }
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Genel Müdürlük</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">0216 550 48 48</span>
                </div>
              </a>

              {/* 3. WhatsApp Canlı Destek */}
              <a
                href={waLink(t('cro_whatsapp_prefill'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_GA_ID) {
                    sendGAEvent('event', 'whatsapp_click', { category: 'contact', value: 1 });
                  }
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">chat</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp Canlı Destek</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Anında Yanıt</span>
                </div>
              </a>

              {/* 4. Sizi Arayalım Formu */}
              <button
                onClick={() => setView('callback')}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">phone_callback</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{t('cro_callback_open')}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">{t('cro_callback_title')}</span>
                </div>
              </button>

              {/* 5. Hızlı Teklif Al Butonu */}
              <button
                onClick={() => {
                  close();
                  openQuoteModal();
                  if (process.env.NEXT_PUBLIC_GA_ID) {
                    sendGAEvent('event', 'quote_click', { category: 'conversion', value: 1 });
                  }
                }}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-extrabold shadow-lg hover:opacity-95 transition-all mt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">request_quote</span>
                <span>Hızlı Teklif Al</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Ana Yuvarlak Floating Eylem Butonu */}
      <button
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className="w-14 h-14 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/20 relative cursor-pointer transform-gpu"
        aria-label="Hızlı İşlemler & İletişim"
        title="Hızlı İşlemler & İletişim"
      >
        <span
          className={`material-symbols-outlined text-2xl font-bold transition-transform duration-200 transform-gpu ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
        >
          {isOpen ? 'add' : 'support_agent'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white dark:border-slate-950" />
        )}
      </button>

    </div>
  );
}
