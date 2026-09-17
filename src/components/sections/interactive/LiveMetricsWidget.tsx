"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LiveMetricsWidget() {
  const { t } = useLanguage();
  const [pulse, setPulse] = useState(false);

  // Faz 29: Sayfa görünür değilken arka plan interval/animasyonunu durduran Page Visibility API entegrasyonu
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (!intervalId) {
          intervalId = setInterval(() => {
            setPulse((prev) => !prev);
          }, 4000);
        }
      } else {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    };

    // İlk açılışta başlat
    handleVisibility();

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const metrics = [
    { value: "45.000+", label: t('home_metric_1_label'), icon: "domain", sub: t('home_metric_1_sub') },
    { value: "%22.4", label: t('home_metric_2_label'), icon: "trending_down", sub: t('home_metric_2_sub') },
    { value: "%99.4", label: t('home_metric_3_label'), icon: "sentiment_very_satisfied", sub: t('home_metric_3_sub') },
    { value: "₺12M+", label: t('home_metric_4_label'), icon: "savings", sub: t('home_metric_4_sub') },
    { value: "48 Saat", label: t('home_metric_5_label'), icon: "bolt", sub: t('home_metric_5_sub') },
    { value: "7/24", label: t('home_metric_6_label'), icon: "support_agent", sub: t('home_metric_6_sub') }
  ];

  return (
    <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-14 rounded-[2.5rem] shadow-sm relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-[var(--color-outline)]/50 pb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest bg-slate-100 dark:bg-white/10 px-4 py-1.5 rounded-full w-fit mb-3 border border-slate-200 dark:border-white/10">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 ${pulse ? 'opacity-75' : 'opacity-40'}`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              {t('home_metrics_badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-primary)]">{t('home_metrics_title')}</h2>
          </div>
          <span className="text-sm text-[var(--color-secondary)] font-light">{t('home_metrics_desc')}</span>
        </div>

        {/* Faz 29: GPU Donanım Hızlandırmalı CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {metrics.map((m, i) => (
            <div 
              key={i}
              className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 p-6 md:p-8 rounded-[2rem] flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 transform-gpu shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-white/10 text-[var(--color-primary)] flex items-center justify-center border border-[var(--color-outline)]/40">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">{m.icon}</span>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] tracking-tight mb-2">{m.value}</div>
                <div className="text-base font-semibold text-[var(--color-primary)]">{m.label}</div>
                <div className="text-xs text-[var(--color-secondary)] font-light mt-1">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
