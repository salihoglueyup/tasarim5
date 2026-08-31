'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 14 gün boyunca kapatılmış mı kontrol et
    const dismissedUntil = localStorage.getItem('alo_pwa_dismissed_until');
    if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Kullanıcı deneyimini bölmemek için 4 saniye gecikmeyle göster
      setTimeout(() => {
        setIsVisible(true);
      }, 4000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // 14 gün boyunca tekrar gösterme
    const expiry = Date.now() + 14 * 24 * 60 * 60 * 1000;
    localStorage.setItem('alo_pwa_dismissed_until', String(expiry));
  };

  if (!isVisible || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[85] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-blue-200 dark:border-blue-900/50 p-4 sm:p-5 rounded-2xl shadow-2xl"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Alo Yönetim Uygulaması
              </h4>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <Sparkles className="w-2.5 h-2.5" />
                Hızlı Erişim
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Ana ekranınıza ekleyin; aidat takibi, arıza bildirimi ve 7/24 nöbetçi santrale anında ulaşın.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Uygulamayı Yükle
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Daha Sonra
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Kapat"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PwaInstallPrompt;
