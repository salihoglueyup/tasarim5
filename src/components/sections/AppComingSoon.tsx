'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FEATURES = [
  { icon: 'credit_card', titleKey: 'home_app_feature_1_title', descKey: 'home_app_feature_1_desc' },
  { icon: 'receipt_long', titleKey: 'home_app_feature_2_title', descKey: 'home_app_feature_2_desc' },
  { icon: 'event_seat', titleKey: 'home_app_feature_3_title', descKey: 'home_app_feature_3_desc' },
  { icon: 'engineering', titleKey: 'home_app_feature_4_title', descKey: 'home_app_feature_4_desc' },
  { icon: 'how_to_vote', titleKey: 'home_app_feature_5_title', descKey: 'home_app_feature_5_desc' },
  { icon: 'sensor_door', titleKey: 'home_app_feature_6_title', descKey: 'home_app_feature_6_desc' },
];

export default function AppComingSoon() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-[var(--spacing-gutter)] pt-32 pb-20">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-8"
        >
          <span className="material-symbols-outlined text-sm">schedule</span>
          {t('app_soon_badge')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
        >
          {t('app_soon_title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl font-light text-slate-300 mb-3"
        >
          {t('app_soon_subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base text-slate-400 max-w-xl leading-relaxed mb-10"
        >
          {t('app_soon_desc')}
        </motion.p>

        {/* Platform badges — disabled */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-4"
        >
          {[
            { icon: 'phone_iphone', label: 'App Store' },
            { icon: 'android', label: 'Google Play' },
          ].map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl opacity-50 cursor-not-allowed select-none"
              title={t('app_soon_badge')}
            >
              <span className="material-symbols-outlined text-2xl text-slate-300">{p.icon}</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-amber-300 font-bold">{t('app_soon_badge')}</span>
                <span className="text-sm font-bold">{p.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-slate-500"
        >
          {t('app_soon_platform_note')}
        </motion.p>
      </section>

      {/* Features */}
      <section className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto w-full pb-20">
        <h2 className="text-center text-lg font-bold text-slate-300 mb-8">{t('app_soon_features_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.icon}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-3 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-200">{f.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-white">{t(f.titleKey as any)}</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">{t(f.descKey as any)}</p>
            </motion.div>
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
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </section>
    </div>
  );
}
