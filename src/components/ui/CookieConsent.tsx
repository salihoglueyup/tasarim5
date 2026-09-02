"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const STORAGE_KEY = 'alo_yonetim_cookie_consent';

const COOKIE_STRINGS: Record<string, {
  title: string;
  desc: string;
  policy: string;
  essential: string;
  accept: string;
  ariaLabel: string;
}> = {
  tr: {
    title: 'Çerez Tercihleri',
    desc: 'Siteyi çalıştırmak için zorunlu çerezler; onayınızla da siteyi geliştirmek için analitik çerezler kullanırız.',
    policy: 'Çerez Politikası',
    essential: 'Yalnız zorunlu',
    accept: 'Tümünü kabul et',
    ariaLabel: 'Çerez tercihleri',
  },
  en: {
    title: 'Cookie Preferences',
    desc: 'We use essential cookies to run the site and, with your consent, analytics cookies to improve it.',
    policy: 'Cookie Policy',
    essential: 'Essential only',
    accept: 'Accept all',
    ariaLabel: 'Cookie preferences',
  },
  ru: {
    title: 'Настройки файлов cookie',
    desc: 'Мы используем обязательные файлы cookie для работы сайта и аналитические файлы cookie для улучшения сервиса.',
    policy: 'Политика использования cookie',
    essential: 'Только обязательные',
    accept: 'Принять все',
    ariaLabel: 'Настройки файлов cookie',
  },
  ar: {
    title: 'تفضيلات ملفات تعريف الارتباط',
    desc: 'نستخدم ملفات تعريف الارتباط الأساسية لتشغيل الموقع وملفات تعريف الارتباط التحليلية لتحسين تجربتك بموافقتك.',
    policy: 'سياسة ملفات تعريف الارتباط',
    essential: 'الأساسية فقط',
    accept: 'قبول الكل',
    ariaLabel: 'تفضيلات ملفات تعريف الارتباط',
  },
};

/**
 * Faz 170: Çerez izin modalını 4 dilde (TR, EN, RU, AR) yerelleştirme.
 */
export default function CookieConsent() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const langKey = (language in COOKIE_STRINGS ? language : 'tr') as keyof typeof COOKIE_STRINGS;
  const content = COOKIE_STRINGS[langKey];

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (consent) return;
    } catch {
      return;
    }

    const showConsent = () => {
      setIsVisible(true);
    };

    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | undefined;
    let timerId: number | undefined;

    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(showConsent, { timeout: 6000 });
    } else {
      timerId = window.setTimeout(showConsent, 5000);
    }

    return () => {
      if (idleId !== undefined && typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  const decide = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage engellenmişse sessizce geç */
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const policyHref = language === 'tr' ? '/cerez-politikasi' : `/${language}/cerez-politikasi`;

  return (
    <div
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[420px] bg-white dark:bg-[#112338] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-2xl z-50 flex flex-col gap-4 transition-all duration-300 ease-out transform-gpu animate-in fade-in slide-in-from-bottom-5"
      role="dialog"
      aria-modal="false"
      aria-label={content.ariaLabel}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0" aria-hidden="true">🍪</span>
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            {content.title}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            {content.desc}{' '}
            <Link href={policyHref} className="text-slate-900 dark:text-white font-bold underline hover:opacity-80">
              {content.policy}
            </Link>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={() => decide('essential')}
          className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          {content.essential}
        </button>
        <button
          onClick={() => decide('accepted')}
          className="flex-1 py-2 rounded-xl text-xs font-bold text-white dark:text-slate-950 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md shadow-slate-900/20 dark:shadow-white/10 cursor-pointer"
        >
          {content.accept}
        </button>
      </div>
    </div>
  );
}
