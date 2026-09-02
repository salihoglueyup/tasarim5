'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSuggestionBannerProps {
  currentLang: string;
}

const MESSAGES: Record<string, { prompt: string; action: string; langName: string }> = {
  en: {
    prompt: 'Would you like to browse this website in English?',
    action: 'Switch to English',
    langName: 'English',
  },
  ru: {
    prompt: 'Хотите просматривать этот сайт на русском языке?',
    action: 'Переключить на русский',
    langName: 'Русский',
  },
  ar: {
    prompt: 'هل تفضل تصفح هذا الموقع باللغة العربية؟',
    action: 'التبديل إلى العربية',
    langName: 'العربية',
  },
};

/**
 * Faz 160: Tarayıcı Diline (Accept-Language / navigator.language) Göre
 * Akıllı Dil Öneri Banner'ı.
 */
export default function LanguageSuggestionBanner({ currentLang }: LanguageSuggestionBannerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [suggestedLang, setSuggestedLang] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Kullanıcı bu oturumda banner'ı kapattıysa gösterme
    if (sessionStorage.getItem('lang_banner_dismissed') === '1') {
      return;
    }

    const browserLang = (navigator.language || '').toLowerCase();
    let matched: string | null = null;

    if (browserLang.startsWith('en') && currentLang !== 'en') {
      matched = 'en';
    } else if (browserLang.startsWith('ru') && currentLang !== 'ru') {
      matched = 'ru';
    } else if (browserLang.startsWith('ar') && currentLang !== 'ar') {
      matched = 'ar';
    }

    if (matched && MESSAGES[matched]) {
      setSuggestedLang(matched);
      setDismissed(false);
    }
  }, [currentLang]);

  if (dismissed || !suggestedLang) return null;

  const msg = MESSAGES[suggestedLang];

  const handleSwitch = () => {
    document.cookie = `NEXT_LOCALE=${suggestedLang}; path=/; max-age=31536000; SameSite=Lax`;
    sessionStorage.setItem('lang_banner_dismissed', '1');
    setDismissed(true);

    let cleanPath = pathname || '/';
    const langPrefixes = ['/en', '/tr', '/ru', '/ar'];
    for (const prefix of langPrefixes) {
      if (cleanPath.startsWith(prefix + '/') || cleanPath === prefix) {
        cleanPath = cleanPath.replace(new RegExp(`^${prefix}`), '') || '/';
        break;
      }
    }

    const targetUrl = suggestedLang === 'tr' ? cleanPath : `/${suggestedLang}${cleanPath === '/' ? '' : cleanPath}`;
    router.push(targetUrl);
    router.refresh();
  };

  const handleDismiss = () => {
    sessionStorage.setItem('lang_banner_dismissed', '1');
    setDismissed(true);
  };

  return (
    <aside
      aria-label="Dil Önerisi"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-slate-900/95 text-white backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-400 text-xl">language</span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300">{msg.langName}</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Kapat"
        >
          <span className="material-symbols-outlined text-base leading-none">close</span>
        </button>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed">{msg.prompt}</p>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          onClick={handleDismiss}
          className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          Devam Et
        </button>
        <button
          onClick={handleSwitch}
          className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-xl transition-all shadow-md shadow-blue-600/30"
        >
          {msg.action}
        </button>
      </div>
    </aside>
  );
}
