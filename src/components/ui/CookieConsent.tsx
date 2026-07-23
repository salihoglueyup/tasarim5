"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sadece client-side'da kontrol et
    const consent = localStorage.getItem('alo_yonetim_cookie_consent');
    if (!consent) {
      // Hemen göstermek yerine performansı etkilememesi için gecikmeli göster (Lazy render)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('alo_yonetim_cookie_consent', 'accepted');
    setIsVisible(false);
  };

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
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🍪</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Çerez Tercihleri</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Size daha iyi bir deneyim sunabilmek için web sitemizde çerezler kullanılmaktadır. 
                Detaylı bilgi için <Link href="/kvkk-ve-aydinlatma-metni" className="text-blue-600 dark:text-blue-400 hover:underline">Çerez Politikamızı</Link> inceleyebilirsiniz.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={() => setIsVisible(false)}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              Reddet
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/20"
            >
              Kabul Et
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
