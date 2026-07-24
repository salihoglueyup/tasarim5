"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t, language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'en' ? `/en${path === '/' ? '' : path}` : path;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-[#071322] px-6">
      <div className="max-w-2xl text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl md:text-9xl font-extrabold text-[var(--color-primary)] opacity-90 mb-4"
        >
          404
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6"
        >
          {t('err_404_title')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-600 dark:text-slate-400 mb-10"
        >
          {t('err_404_desc')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href={getLocalizedPath('/')} 
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            {t('err_404_back_home')}
          </Link>
          <Link 
            href={getLocalizedPath('/hizmetler')} 
            className="bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 font-semibold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">grid_view</span>
            {t('err_404_services')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
