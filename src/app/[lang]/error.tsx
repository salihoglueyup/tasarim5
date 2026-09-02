'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { RefreshCw, Home, AlertOctagon, PhoneCall, ChevronDown } from 'lucide-react';
import { ORG_PHONE } from '@/lib/constants';

/**
 * Faz 85: Framer Motion'dan arındırılmış, minimal hata raporlama (digest ID),
 * tek tıkla yeniden deneme ("Tekrar Dene") ve 7/24 destek hattı entegreli `error.tsx`.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Konsola ve analitiğe hata telemetrisi
    if (process.env.NODE_ENV !== 'production') {
      console.error('[App Error Boundary]:', error);
    }
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      reset();
      setIsRetrying(false);
    }, 250);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-[#071322] px-6 py-20 font-sans">
      <div className="max-w-2xl text-center flex flex-col items-center transition-all transform-gpu animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <span className="text-7xl md:text-8xl font-black text-rose-600 dark:text-rose-500 opacity-90 mb-2 tracking-tight">
          500
        </span>
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          {t('err_500_title')}
        </h1>
        
        <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-lg">
          {t('err_500_desc')} Geçici bir sunucu veya ağ sorunu oluştu. Lütfen sayfayı yenilemeyi deneyin.
        </p>

        {/* Hata Kodu / Digest Rozeti */}
        {error.digest && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs font-mono mb-8 border border-slate-300/60 dark:border-slate-700">
            <span>Referans Kodu:</span>
            <span className="font-bold text-slate-900 dark:text-white">{error.digest}</span>
          </div>
        )}

        {/* Butonlar */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
          <button 
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 px-8 rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Yenileniyor...' : t('err_500_retry')}</span>
          </button>
          
          <Link 
            href="/" 
            className="bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/20 font-bold py-3 px-7 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>{t('err_404_back_home')}</span>
          </Link>

          <a
            href={`tel:${ORG_PHONE}`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Destek Hattı</span>
          </a>
        </div>

        {/* Geliştirici Detayları (İsteğe Bağlı Açılır Kapanır) */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="w-full text-left mt-4 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full p-3 bg-slate-100 dark:bg-slate-900 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <span>Hata Ayrıntıları (Geliştirici Modu)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
            {showDetails && (
              <pre className="p-4 text-xs font-mono bg-slate-950 text-rose-300 overflow-x-auto whitespace-pre-wrap">
                {error.stack || error.message}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
