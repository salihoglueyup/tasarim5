'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const FEATURES = [
  { icon: 'credit_card', titleKey: 'home_app_feature_1_title', descKey: 'home_app_feature_1_desc' },
  { icon: 'receipt_long', titleKey: 'home_app_feature_2_title', descKey: 'home_app_feature_2_desc' },
  { icon: 'event_seat', titleKey: 'home_app_feature_3_title', descKey: 'home_app_feature_3_desc' },
  { icon: 'engineering', titleKey: 'home_app_feature_4_title', descKey: 'home_app_feature_4_desc' },
  { icon: 'how_to_vote', titleKey: 'home_app_feature_5_title', descKey: 'home_app_feature_5_desc' },
  { icon: 'sensor_door', titleKey: 'home_app_feature_6_title', descKey: 'home_app_feature_6_desc' },
];

Object.freeze(FEATURES);

/**
 * Faz 47: AppComingSoon bileşeninin Framer Motion'dan arındırılarak
 * tamamen donanım hızlandırmalı saf CSS animasyonlarına geçirilmesi.
 */
export default function AppComingSoon() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-[var(--spacing-gutter)] pt-32 pb-20">
        <span className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-8 transition-all duration-300 transform-gpu">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">schedule</span>
          {t('app_soon_badge')}
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 transition-all duration-500 transform-gpu">
          {t('app_soon_title')}
        </h1>

        <p className="text-xl md:text-2xl font-light text-slate-300 mb-3 transition-all duration-500 transform-gpu">
          {t('app_soon_subtitle')}
        </p>

        <p className="text-base text-slate-400 max-w-xl leading-relaxed mb-10 transition-all duration-500 transform-gpu">
          {t('app_soon_desc')}
        </p>

        {/* Platform badges — disabled */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4 transition-all duration-500 transform-gpu">
          {[
            { icon: 'phone_iphone', label: 'App Store' },
            { icon: 'android', label: 'Google Play' },
          ].map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl opacity-50 cursor-not-allowed select-none"
              title={t('app_soon_badge')}
            >
              <span className="material-symbols-outlined text-2xl text-slate-300" aria-hidden="true">{p.icon}</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-amber-300 font-bold">{t('app_soon_badge')}</span>
                <span className="text-sm font-bold">{p.label}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          {t('app_soon_platform_note')}
        </p>
      </section>

      {/* Features */}
      <section className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full pb-20">
        <h2 className="text-center text-lg font-bold text-slate-300 mb-8">{t('app_soon_features_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.icon}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-3 backdrop-blur-sm hover:scale-[1.02] hover:bg-white/10 transition-all duration-300 transform-gpu"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-200" aria-hidden="true">{f.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-white">{t(f.titleKey as any)}</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">{t(f.descKey as any)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full pb-24 text-center">
        <p className="text-slate-400 text-sm mb-4">{t('app_soon_cta')}</p>
        <Link
          href="/iletisim"
          className="inline-flex items-center gap-2 bg-white text-slate-950 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
        >
          {t('app_soon_cta_link')}
          <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
        </Link>
      </section>
    </div>
  );
}
