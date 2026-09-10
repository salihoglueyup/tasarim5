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
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('open-spotlight-search'));
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3 font-sans transform-gpu will-change-transform">

      {isOpen && (
        <div
          role="dialog"
          aria-label={t('fab_quick_actions')}
          className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-5 rounded-[2.5rem] shadow-2xl flex flex-col gap-3 w-80 text-[var(--color-primary)] backdrop-blur-xl transition-all duration-200 ease-out transform-gpu animate-in fade-in zoom-in-95"
        >
          {view === 'callback' ? (
            <>
              <button
                onClick={() => setView('menu')}
                className="flex items-center gap-1 text-xs font-bold text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors self-start cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_back</span>
                {t('cro_callback_open')}
              </button>
              <CallbackForm variant="inline" meta={{ kaynak: 'hizli-widget' }} />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-outline)]/40">
                <span className="text-[11px] font-extrabold text-[var(--color-tertiary)] uppercase tracking-wider">
                  {t('fab_quick_actions')}
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {/* 1. Site İçi Akıllı Arama Kısayolu */}
              <button
                onClick={handleOpenSpotlight}
                className="flex items-center justify-between p-3 rounded-2xl bg-[var(--color-surface-variant)] hover:border-slate-400/60 dark:hover:border-white/20 text-[var(--color-primary)] border border-[var(--color-outline)]/60 transition-all text-left group shadow-xs cursor-pointer"
                title={`${t('fab_spotlight_title')} (Ctrl+K / ⌘K)`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900/10 dark:bg-white/10 text-[var(--color-primary)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform" aria-hidden="true">search</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[var(--color-primary)] transition-colors">
                      {t('fab_spotlight_title')}
                    </span>
                    <span className="text-[10px] text-[var(--color-secondary)] font-light">
                      {t('fab_spotlight_desc')}
                    </span>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/80 dark:bg-white/10 rounded-md border border-[var(--color-outline)]/60 text-[var(--color-secondary)] font-bold">
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
                className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-surface-variant)] hover:bg-[var(--color-outline)]/30 border border-[var(--color-outline)]/40 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-950 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[var(--color-primary)]">{t('fab_headquarters')}</span>
                  <span className="text-[10px] text-[var(--color-secondary)] font-medium">0216 550 48 48</span>
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
                className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-surface-variant)] hover:bg-[var(--color-outline)]/30 border border-[var(--color-outline)]/40 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">chat</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[var(--color-primary)]">{t('contact_direct_wa')}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{t('fab_instant_reply')}</span>
                </div>
              </a>

              {/* 4. Sizi Arayalım Formu */}
              <button
                onClick={() => setView('callback')}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-surface-variant)] hover:bg-[var(--color-outline)]/30 border border-[var(--color-outline)]/40 transition-colors text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">phone_callback</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[var(--color-primary)]">{t('cro_callback_open')}</span>
                  <span className="text-[10px] text-[var(--color-secondary)] font-light">{t('cro_callback_title')}</span>
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
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-extrabold shadow-lg hover:opacity-95 transition-all mt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">request_quote</span>
                <span>{t('fab_quick_quote')}</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Ana Yuvarlak Floating Eylem Butonu */}
      <button
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className="w-14 h-14 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/20 relative cursor-pointer transform-gpu"
        aria-label={t('fab_quick_actions')}
        title={t('fab_quick_actions')}
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
