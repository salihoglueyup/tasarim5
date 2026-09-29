"use client";

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import WalletSvgIcon from '@/components/ui/branding/WalletSvgIcon';

import Icon from '@/components/ui/branding/Icon';
export default function BentoServices() {
  const { t, language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'tr' ? path : `/${language}${path === '/' ? '' : path}`;
  };

  return (
    <section id="hizmetler" className="py-24 sm:py-32 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface-variant)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-outline)]/60">
          <Icon name="domain" className="text-[16px]" />
          <span>{t('bs_badge')}</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)] mb-6">
          {t('home_bento_title')}
        </h2>
        <p className="text-xl text-[var(--color-secondary)] max-w-2xl mx-auto font-light">
          {t('home_bento_desc')}
        </p>
      </div>

      {/* Faz 26: Sıfır-Jank GPU CSS Grid Yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Card 1: Güvenlik (Large) */}
        <div className="md:col-span-2 md:row-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-slate-500/10 transition-colors pointer-events-none" style={{ transform: "translateZ(0)" }} />
          <div>
            <div className="flex items-center justify-between mb-6">
              <Icon name="shield_person" className="text-5xl text-[var(--color-primary)]" />
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                {t('bs_licensed')}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{t('home_bento_card1_title')}</h3>
            <p className="text-[var(--color-secondary)] text-lg leading-relaxed max-w-md">
              {t('home_bento_card1_desc')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[t('bs_tag_camera'), t('bs_tag_physical'), t('bs_tag_patrol'), t('bs_tag_anpr')].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[var(--color-surface-variant)] text-[var(--color-secondary)] rounded-full text-xs font-semibold border border-[var(--color-outline)]/60">
                  {tag}
                </span>
              ))}
            </div>
            
            <ul className="mt-8 space-y-3">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="check" className="text-[16px] text-[var(--color-primary)]" />
                  </div>
                  <span className="text-[var(--color-secondary)] font-medium text-base">
                    {t(`home_bento_card1_chk${num}` as Parameters<typeof t>[0])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
            <Link 
              href={getLocalizedPath('/hizmetler/guvenlik-yonetimi')}
              className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-2 group/link"
            >
              <span>{t('bs_security_link')}</span>
              <Icon name="arrow_forward" className="text-base group-hover/link:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={getLocalizedPath('/hesaplayici')}
              className="text-xs font-bold text-[var(--color-primary)] bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
            >
              Maliyet Hesapla →
            </Link>
          </div>
        </div>

        {/* Card 2: Temizlik */}
        <div className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Icon name="cleaning_services" className="text-4xl text-[var(--color-primary)]" />
              <span className="text-[11px] font-bold text-[var(--color-secondary)] bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/40 px-2.5 py-0.5 rounded-full">
                ISO 14001
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card2_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card2_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[t('bs_tag_common'), t('bs_tag_parking'), t('bs_tag_waste'), t('bs_tag_stairs')].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[var(--color-surface-variant)] text-[var(--color-secondary)] rounded-full text-xs font-semibold border border-[var(--color-outline)]/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 flex items-center justify-between">
            <Link
              href={getLocalizedPath('/hesaplayici')}
              className="text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
            >
              Temizlik Maliyeti →
            </Link>
            <Link
              href={getLocalizedPath('/hizmetler/temizlik-ve-hijyen')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
              aria-label={`${t('home_bento_card2_title')} — ${t('bs_details')}`}
              title={`${t('home_bento_card2_title')} — ${t('bs_details')}`}
            >
              <span>{t('bs_details')}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Card 3: Aidat & Finans */}
        <div className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-8 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <WalletSvgIcon className="w-10 h-10 text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card3_title')}</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              {t('home_bento_card3_desc')}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[t('bs_tag_dues'), t('bs_tag_balance'), t('bs_tag_enforce'), t('bs_tag_mobile_pay')].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-[var(--color-surface-variant)] text-[var(--color-secondary)] rounded-full text-[11px] font-semibold border border-[var(--color-outline)]/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 flex justify-end">
            <Link
              href={getLocalizedPath('/hizmetler/aidat-takibi')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
              aria-label={`${t('home_bento_card3_title')} — ${t('bs_details')}`}
              title={`${t('home_bento_card3_title')} — ${t('bs_details')}`}
            >
              <span>{t('bs_details')}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Card 4: Hukuk */}
        <div className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-8 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <Icon name="gavel" className="text-4xl text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card4_title')}</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              {t('home_bento_card4_desc')}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[t('bs_tag_kmk'), t('bs_tag_enforce'), t('bs_tag_assembly'), t('bs_tag_lawsuit')].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-[var(--color-surface-variant)] text-[var(--color-secondary)] rounded-full text-[11px] font-semibold border border-[var(--color-outline)]/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 flex justify-end">
            <Link
              href={getLocalizedPath('/hizmetler/hukuk-ve-icra-danismanligi')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
              aria-label={`${t('home_bento_card4_title')} — ${t('bs_details')}`}
              title={`${t('home_bento_card4_title')} — ${t('bs_details')}`}
            >
              <span>{t('bs_details')}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Card 5: Teknik Servis */}
        <div className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Icon name="engineering" className="text-4xl text-[var(--color-primary)]" />
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-full">
                {t('bs_on_duty')}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card5_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card5_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[t('bs_tag_lift'), t('bs_tag_gen'), t('bs_tag_hydro'), t('bs_tag_pool')].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[var(--color-surface-variant)] text-[var(--color-secondary)] rounded-full text-xs font-semibold border border-[var(--color-outline)]/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 flex items-center justify-between">
            <Link
              href={getLocalizedPath('/hesaplayici')}
              className="text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
            >
              {t('bs_tech_discover')}
            </Link>
            <Link 
              href={getLocalizedPath('/hizmetler/teknik-bakim')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>{t('bs_tech_service')}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Card 6: Site & Tesis Yönetimi (Amiral Gemisi Hub Linki) */}
        <div className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Icon name="apartment" className="text-4xl text-[var(--color-primary)]" />
              <span className="text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Amiral Gemisi
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mb-3">{t('bs_hub_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed text-sm sm:text-base">
              {t('bs_hub_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[t('bs_tag_site'), t('bs_tag_mass'), t('bs_tag_res'), 'KMK 634', t('bs_tag_save'), t('bs_tag_sla')].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[var(--color-surface-variant)] text-[var(--color-secondary)] rounded-full text-xs font-semibold border border-[var(--color-outline)]/60">
                  {tag}
                </span>
              ))}
            </div>

            {/* Alt Sektörel Hızlı Linkler */}
            <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 flex flex-wrap gap-3 text-xs">
              <Link 
                href={getLocalizedPath('/hizmetler/tesis-yonetimi/toplu-konut-yonetimi')}
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] underline decoration-slate-300 dark:decoration-slate-600 flex items-center gap-1 font-medium"
              >
                <span>{t('bs_link_mass')}</span>
                <Icon name="arrow_forward" className="text-xs" />
              </Link>
              <span className="text-[var(--color-tertiary)]">·</span>
              <Link 
                href={getLocalizedPath('/hizmetler/tesis-yonetimi/rezidans-site-yonetimi')}
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] underline decoration-slate-300 dark:decoration-slate-600 flex items-center gap-1 font-medium"
              >
                <span>{t('bs_link_res')}</span>
                <Icon name="arrow_forward" className="text-xs" />
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--color-outline)]/40 flex flex-wrap items-center justify-between gap-3">
            <Link 
              href={getLocalizedPath('/hizmetler/tesis-yonetimi')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>{t('bs_link_guide')}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </Link>

            <Link
              href={getLocalizedPath('/teklif-al')}
              className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-surface-variant)] hover:bg-slate-200/60 dark:hover:bg-[#262938] border border-[var(--color-outline)]/60 px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              {t('bs_quote')}
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
