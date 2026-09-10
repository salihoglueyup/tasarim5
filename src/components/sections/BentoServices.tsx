"use client";

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import WalletSvgIcon from '@/components/ui/WalletSvgIcon';

export default function BentoServices() {
  const { t, language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'en' ? `/en${path === '/' ? '' : path}` : path;
  };

  return (
    <section id="hizmetler" className="py-24 sm:py-32 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface-variant)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-outline)]/60">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">domain</span>
          <span>ISO 41001 Akredite Entegre Tesis ve Mülk Çözümleri</span>
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
              <span className="material-symbols-outlined text-5xl text-[var(--color-primary)]" aria-hidden="true">shield_person</span>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                5188 Lisanslı
              </span>
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{t('home_bento_card1_title')}</h3>
            <p className="text-[var(--color-secondary)] text-lg leading-relaxed max-w-md">
              {t('home_bento_card1_desc')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Kamera Sistemleri', 'Fiziki Güvenlik', 'Nöbetçi Devriye', 'Plaka Tanıma (PTS)'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[var(--color-surface-variant)] text-[var(--color-secondary)] rounded-full text-xs font-semibold border border-[var(--color-outline)]/60">
                  {tag}
                </span>
              ))}
            </div>
            
            <ul className="mt-8 space-y-3">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[16px] text-[var(--color-primary)]" aria-hidden="true">check</span>
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
              <span>Özel Güvenlik Hizmetini Keşfet</span>
              <span className="material-symbols-outlined text-base group-hover/link:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
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
              <span className="material-symbols-outlined text-4xl text-[var(--color-primary)]" aria-hidden="true">cleaning_services</span>
              <span className="text-[11px] font-bold text-[var(--color-secondary)] bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/40 px-2.5 py-0.5 rounded-full">
                ISO 9001
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card2_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card2_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Ortak Alan', 'Kapalı Otopark', 'Çöp Toplama', 'Merdiven & Blok'].map(tag => (
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
            >
              <span>Detaylı İncele</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
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
              {['Aidat Takibi', 'Şeffaf Bilanço', 'İcra Takibi', 'Mobil Tahsilat'].map(tag => (
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
            >
              <span>Detaylı İncele</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Card 4: Hukuk */}
        <div className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-8 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4" aria-hidden="true">gavel</span>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card4_title')}</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              {t('home_bento_card4_desc')}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['634 KMK', 'İcra Takibi', 'Genel Kurul', 'Dava Takibi'].map(tag => (
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
            >
              <span>Detaylı İncele</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Card 5: Teknik Servis */}
        <div className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-4xl text-[var(--color-primary)]" aria-hidden="true">engineering</span>
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-full">
                7/24 Nöbetçi
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card5_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card5_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Asansör Yeşil Etiket', 'Jeneratör', 'Hidrofor & Yangın', 'Havuz & Kazan'].map(tag => (
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
              Teknik Bakım Keşfi →
            </Link>
            <Link 
              href={getLocalizedPath('/hizmetler/teknik-bakim')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Teknik Servisi İncele</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Card 6: Site & Tesis Yönetimi (Amiral Gemisi Hub Linki) */}
        <div className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-4xl text-[var(--color-primary)]" aria-hidden="true">apartment</span>
              <span className="text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Amiral Gemisi
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mb-3">Profesyonel Site ve Tesis Yönetimi</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed text-sm sm:text-base">
              İstanbul&apos;un 39 ilçesinde 340+ konut sitesi ve rezidansta 634 Sayılı KMK ve ISO 41001 standartlarında 5188 lisanslı güvenlik, temizlik, önleyici teknik servis ve %99.2 aidat tahsilat garantisi sunuyoruz.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Site Yönetimi', 'Toplu Konut', 'Rezidans', 'KMK 634', '%30 Tasarruf', '15 Dk SLA'].map(tag => (
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
                <span>Toplu Konut & Site Çözümleri</span>
                <span className="material-symbols-outlined text-xs" aria-hidden="true">arrow_forward</span>
              </Link>
              <span className="text-[var(--color-tertiary)]">·</span>
              <Link 
                href={getLocalizedPath('/hizmetler/tesis-yonetimi/rezidans-site-yonetimi')}
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] underline decoration-slate-300 dark:decoration-slate-600 flex items-center gap-1 font-medium"
              >
                <span>Rezidans & Lüks Site</span>
                <span className="material-symbols-outlined text-xs" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--color-outline)]/40 flex flex-wrap items-center justify-between gap-3">
            <Link 
              href={getLocalizedPath('/hizmetler/tesis-yonetimi')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Site & Tesis Yönetimi Rehberi</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>

            <Link
              href={getLocalizedPath('/teklif-al')}
              className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-surface-variant)] hover:bg-slate-200/60 dark:hover:bg-[#262938] border border-[var(--color-outline)]/60 px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              Siteniz İçin Teklif Alın →
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
