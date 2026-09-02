"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Home, ArrowRight, Shield, Sparkles, Calculator, Building } from 'lucide-react';

const POPULAR_SERVICES = [
  { name: 'Tesis & Site Yönetimi', path: '/hizmetler/tesis-yonetimi', icon: Building, desc: '340+ seçkin sitede entegre profesyonel yönetim' },
  { name: 'Özel Güvenlik Hizmetleri', path: '/hizmetler/guvenlik-yonetimi', icon: Shield, desc: '5188 sayılı kanuna tam uyumlu 7/24 koruma' },
  { name: 'Temizlik & Hijyen Yönetimi', path: '/hizmetler/temizlik-ve-hijyen', icon: Sparkles, desc: 'Endüstriyel ekipman ve denetimli hijyen planı' },
  { name: 'Akıllı Aidat Hesaplayıcı', path: '/hesaplayici', icon: Calculator, desc: 'Daire ve ortak alanlara göre anlık tahmini bütçe' },
];

/**
 * Faz 84: not-found.tsx 404 sayfasına doğrudan Spotlight Search (Ctrl+K)
 * tetikleyicisi, popüler amiral gemisi hizmetler ve sıfır-jank saf CSS ekleme.
 */
export default function NotFound() {
  const { t, language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'en' ? `/en${path === '/' ? '' : path}` : path;
  };

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('open-spotlight-search'));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-[#071322] px-6 py-20 font-sans">
      <div className="max-w-3xl text-center flex flex-col items-center transition-all transform-gpu animate-in fade-in zoom-in-95 duration-200">
        <span className="text-8xl md:text-9xl font-extrabold text-slate-900 dark:text-white opacity-90 mb-2 tracking-tight">
          404
        </span>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          {t('err_404_title')}
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
          {t('err_404_desc')} Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Hemen arama yapabilir veya popüler hizmetlerimize göz atabilirsiniz.
        </p>

        {/* Akıllı Arama Çubuğu (Spotlight Tetikleyici) */}
        <button
          type="button"
          onClick={handleOpenSearch}
          className="w-full max-w-lg mb-10 flex items-center justify-between p-3.5 px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-500 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3 text-slate-400">
            <Search className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Site içinde hizmet, ilçe veya terim arayın...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-500">
            ⌘K
          </kbd>
        </button>

        {/* Popüler Hizmetler Grid */}
        <div className="w-full text-left mb-10">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 text-center">
            Popüler Sayfalar & Hizmetler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POPULAR_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.path}
                  href={getLocalizedPath(s.path)}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {s.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {s.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Ana Butonlar */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            href={getLocalizedPath('/')} 
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 px-8 rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>{t('err_404_back_home')}</span>
          </Link>
          <Link 
            href={getLocalizedPath('/site-haritasi')} 
            className="bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/20 font-bold py-3 px-8 rounded-xl transition-all"
          >
            Site Haritası
          </Link>
        </div>
      </div>
    </div>
  );
}
