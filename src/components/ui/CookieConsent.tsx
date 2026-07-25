"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const STORAGE_KEY = 'alo_yonetim_cookie_consent';

/**
 * Çerez onay bandı (SEO V4 Faz 220): i18n (tr/en), kararı kalıcı saklama ve
 * temel granülerlik (yalnız zorunlu / tümü) ile KVKK uyumlu.
 * Not: Analitik script'ler (GA/Clarity) zaten yalnız env tanımlıysa yüklenir;
 * "yalnız zorunlu" seçimi bu tercihi localStorage'a yazar (Faz 189 ile uyumlu).
 */
export default function CookieConsent() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const en = language === 'en';

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage engellenmişse sessizce geç */
    }
    setIsVisible(false);
  };

  const policyHref = en ? '/en/cerez-politikasi' : '/cerez-politikasi';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] bg-white dark:bg-[#112338] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-2xl z-50 flex flex-col gap-4"
          role="dialog"
          aria-modal="false"
          aria-label={en ? 'Cookie preferences' : 'Çerez tercihleri'}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl" aria-hidden="true">🍪</span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {en ? 'Cookie Preferences' : 'Çerez Tercihleri'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {en
                  ? 'We use essential cookies to run the site and, with your consent, analytics cookies to improve it. '
                  : 'Siteyi çalıştırmak için zorunlu çerezler; onayınızla da siteyi geliştirmek için analitik çerezler kullanırız. '}
                <Link href={policyHref} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {en ? 'Cookie Policy' : 'Çerez Politikası'}
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={() => decide('essential')}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              {en ? 'Essential only' : 'Yalnız zorunlu'}
            </button>
            <button
              onClick={() => decide('accepted')}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/20"
            >
              {en ? 'Accept all' : 'Tümünü kabul et'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
