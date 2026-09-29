"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';
export default function AppShowcase() {
  const { t, language } = useLanguage();
  const appPath = language === 'tr' ? '/app' : `/${language}/app`;

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">

      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-14 shadow-sm relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-7 flex flex-col gap-8">
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
            <a
              href="https://apps.apple.com/app/apsiyon/id1115852575"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-surface-variant)] px-6 py-3 rounded-2xl flex items-center gap-3 border border-[var(--color-outline)]/60 text-[var(--color-primary)] hover:border-blue-500 hover:scale-[1.02] transition-all shadow-2xs group"
              aria-label={t('as_ios')}
            >
              <Icon name="phone_iphone" className="text-2xl text-[var(--color-primary)] group-hover:text-blue-500 transition-colors" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[var(--color-secondary)]">{t('home_app_download')}</span>
                <span className="text-sm font-bold">App Store</span>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.apsiyon.mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-surface-variant)] px-6 py-3 rounded-2xl flex items-center gap-3 border border-[var(--color-outline)]/60 text-[var(--color-primary)] hover:border-emerald-500 hover:scale-[1.02] transition-all shadow-2xs group"
              aria-label={t('as_android')}
            >
              <Icon name="android" className="text-2xl text-[var(--color-primary)] group-hover:text-emerald-500 transition-colors" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[var(--color-secondary)]">{t('home_app_download')}</span>
                <span className="text-sm font-bold">Google Play</span>
              </div>
            </a>

            <a
              href="https://online.apsiyon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-surface-variant)] px-6 py-3 rounded-2xl flex items-center gap-3 border border-[var(--color-outline)]/60 text-[var(--color-primary)] hover:border-purple-500 hover:scale-[1.02] transition-all shadow-2xs group"
              aria-label={t('as_web_aria')}
            >
              <Icon name="laptop_mac" className="text-2xl text-[var(--color-primary)] group-hover:text-purple-500 transition-colors" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[var(--color-secondary)]">{t('as_web_from')}</span>
                <span className="text-sm font-bold">{t('as_resident_login')}</span>
              </div>
            </a>
          </div>

          <Link
            href={appPath}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:underline w-fit"
          >
            <span>{t('as_see_all_features')}</span>
            <Icon name="arrow_forward" className="text-base" />
          </Link>
        </div>

        {/* Uygulama önizleme görseli: tüm özellik listesi zaten /app sayfasında (ApsiyonMobileHub) var */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full aspect-[4/5] max-w-xs rounded-[2rem] bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <Icon name="smartphone" className="text-6xl text-[var(--color-primary)]" />
            <p className="text-sm text-[var(--color-secondary)] font-light">{t('home_app_badge')}</p>
          </div>
        </div>

      </div>

    </section>
  );
}
