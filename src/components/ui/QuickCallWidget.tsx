"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuote } from '@/context/QuoteContext';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';
import { waLink } from '@/lib/cro';
import { ORG_PHONE } from '@/lib/constants';
import CallbackForm from '@/components/cro/CallbackForm';

export default function QuickCallWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'callback'>('menu');
  const { openQuoteModal } = useQuote();
  const { t } = useLanguage();

  const close = () => {
    setIsOpen(false);
    setView('menu');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 p-5 rounded-3xl shadow-2xl flex flex-col gap-3 w-72 text-gray-900 dark:text-white"
          >
            {view === 'callback' ? (
              <>
                <button
                  onClick={() => setView('menu')}
                  className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors self-start"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  {t('cro_callback_open')}
                </button>
                <CallbackForm variant="inline" meta={{ kaynak: 'hizli-widget' }} />
              </>
            ) : (
              <>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-white/10">
                  Hızlı İletişim Kısayolları
                </div>

                <a
                  href={`tel:${ORG_PHONE}`}
                  onClick={() => {
                    if (process.env.NEXT_PUBLIC_GA_ID) {
                      sendGAEvent('event', 'phone_call_click', { category: 'contact', value: 1 });
                    }
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">call</span>
                  </div>
                  <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Genel Müdürlük</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">0216 550 48 48</span>
                </div>
                </a>

                <a
                  href={waLink(t('cro_whatsapp_prefill'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (process.env.NEXT_PUBLIC_GA_ID) {
                      sendGAEvent('event', 'whatsapp_click', { category: 'contact', value: 1 });
                    }
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">chat</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">WhatsApp Canlı Destek</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Anında Yanıt</span>
                  </div>
                </a>

                <button
                  onClick={() => setView('callback')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">phone_callback</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">{t('cro_callback_open')}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{t('cro_callback_title')}</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    close();
                    openQuoteModal();
                    if (process.env.NEXT_PUBLIC_GA_ID) {
                      sendGAEvent('event', 'quote_click', { category: 'conversion', value: 1 });
                    }
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold shadow-md hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-sm">request_quote</span>
                  Hızlı Teklif Al
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className="w-14 h-14 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Hızlı Destek"
      >
        <motion.span
          className="material-symbols-outlined text-2xl"
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          {isOpen ? 'add' : 'support_agent'}
        </motion.span>
      </button>

    </div>
  );
}
