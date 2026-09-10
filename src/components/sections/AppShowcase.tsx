"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function AppShowcase() {
  const { t } = useLanguage();

  const appFeatures = [
    {
      icon: "credit_card",
      title: t('home_app_feature_1_title'),
      desc: t('home_app_feature_1_desc')
    },
    {
      icon: "receipt_long",
      title: t('home_app_feature_2_title'),
      desc: t('home_app_feature_2_desc')
    },
    {
      icon: "event_seat",
      title: t('home_app_feature_3_title'),
      desc: t('home_app_feature_3_desc')
    },
    {
      icon: "engineering",
      title: t('home_app_feature_4_title'),
      desc: t('home_app_feature_4_desc')
    },
    {
      icon: "how_to_vote",
      title: t('home_app_feature_5_title'),
      desc: t('home_app_feature_5_desc')
    },
    {
      icon: "sensor_door",
      title: t('home_app_feature_6_title'),
      desc: t('home_app_feature_6_desc')
    }
  ];

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-14 shadow-sm relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 flex flex-col gap-8">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest bg-slate-100 dark:bg-white/10 px-4 py-1.5 rounded-full w-fit border border-slate-200 dark:border-white/10">
            {t('home_app_badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-[var(--color-primary)]">
            {t('home_app_title')}
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] font-light leading-relaxed">
            {t('home_app_desc')}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-[var(--color-surface-variant)] px-6 py-3 rounded-2xl flex items-center gap-3 border border-[var(--color-outline)]/60 text-[var(--color-primary)]">
              <span className="material-symbols-outlined text-2xl text-[var(--color-primary)]" aria-hidden="true">phone_iphone</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[var(--color-secondary)]">{t('home_app_download')}</span>
                <span className="text-sm font-bold">App Store</span>
              </div>
            </div>

            <div className="bg-[var(--color-surface-variant)] px-6 py-3 rounded-2xl flex items-center gap-3 border border-[var(--color-outline)]/60 text-[var(--color-primary)]">
              <span className="material-symbols-outlined text-2xl text-[var(--color-primary)]" aria-hidden="true">android</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[var(--color-secondary)]">{t('home_app_download')}</span>
                <span className="text-sm font-bold">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {appFeatures.map((f, i) => (
            <div 
              key={i}
              className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 p-6 rounded-2xl flex flex-col gap-3 hover:scale-[1.02] transition-all duration-300 shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-white/10 text-[var(--color-primary)] flex items-center justify-center border border-[var(--color-outline)]/40">
                <span className="material-symbols-outlined" aria-hidden="true">{f.icon}</span>
              </div>
              <h3 className="font-bold text-base text-[var(--color-primary)]">{f.title}</h3>
              <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
