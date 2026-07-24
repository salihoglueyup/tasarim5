"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';

export default function QuickCallWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-white dark:bg-[#122338] border border-gray-200 dark:border-white/10 p-5 rounded-3xl shadow-2xl flex flex-col gap-3 w-64 text-gray-900 dark:text-white"
          >
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-white/10">
              Hızlı İletişim Kısayolları
            </div>

            <a 
              href="tel:08500000000" 
              onClick={() => sendGAEvent('event', 'phone_call_click', { category: 'contact', value: 1 })}
              className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-white/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">7/24 Çağrı Merkezi</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">0850 000 00 00</span>
              </div>
            </a>

            <a 
              href="https://wa.me/905550000000" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => sendGAEvent('event', 'whatsapp_click', { category: 'contact', value: 1 })}
              className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 dark:bg-white/5 hover:bg-emerald-100 dark:hover:bg-white/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">chat</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">WhatsApp Canlı Destek</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Anında Yanıt</span>
              </div>
            </a>

            <Link 
              href="/teklif-al"
              onClick={() => {
                setIsOpen(false);
                sendGAEvent('event', 'quote_click', { category: 'conversion', value: 1 });
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--color-primary)] text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity"
            >
              <span className="material-symbols-outlined text-sm">request_quote</span>
              Hızlı Teklif Al
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
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
