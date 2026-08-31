"use client";

import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function BentoServices() {
  const { t, language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    if (!path) return '/';
    return language === 'en' ? `/en${path === '/' ? '' : path}` : path;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  };

  // GPU Katman Terfisi (Zero-Jank Scrolling)
  const cardGpuStyle = { willChange: "transform, opacity", transform: "translateZ(0)" };

  return (
    <section id="hizmetler" className="py-24 sm:py-32 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200 dark:border-white/10">
          <span className="material-symbols-outlined text-[16px]">domain</span>
          <span>ISO 41001 Akredite Entegre Tesis ve Mülk Çözümleri</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)] mb-6">
          {t('home_bento_title')}
        </h2>
        <p className="text-xl text-[var(--color-secondary)] max-w-2xl mx-auto font-light">
          {t('home_bento_desc')}
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        
        {/* Card 1: Güvenlik (Large) */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 md:row-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-slate-500/10 transition-colors pointer-events-none" style={{ transform: "translateZ(0)" }} />
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="material-symbols-outlined text-5xl text-[var(--color-primary)]">shield_person</span>
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
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            
            <ul className="mt-8 space-y-3">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[16px] text-[var(--color-primary)]">check</span>
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
              <span className="material-symbols-outlined text-base group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </Link>

            <Link
              href={getLocalizedPath('/hesaplayici')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              Maliyet Hesapla →
            </Link>
          </div>
        </motion.div>

        {/* Card 2: Temizlik */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-4xl text-[var(--color-primary)]">cleaning_services</span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 rounded-full">
                ISO 9001
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card2_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card2_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Ortak Alan', 'Kapalı Otopark', 'Çöp Toplama', 'Merdiven & Blok'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
            <Link
              href={getLocalizedPath('/hesaplayici')}
              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Temizlik Maliyeti →
            </Link>
            <Link 
              href={getLocalizedPath('/hizmetler/temizlik-ve-hijyen')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
            >
              <span>Detaylı İncele</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 3: Aidat & Finans */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-8 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">account_balance_wallet</span>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card3_title')}</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              {t('home_bento_card3_desc')}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Aidat Takibi', 'Şeffaf Bilanço', 'İcra Takibi', 'Mobil Tahsilat'].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex justify-end">
            <Link 
              href={getLocalizedPath('/hizmetler/aidat-takibi')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
            >
              <span>Detaylı İncele</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 4: Hukuk */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-8 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">gavel</span>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card4_title')}</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              {t('home_bento_card4_desc')}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['KMK 634', 'İcra & İhtar', 'Dava Takibi', 'Genel Kurul'].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex justify-end">
            <Link 
              href={getLocalizedPath('/hizmetler/hukuk-ve-icra-danismanligi')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
            >
              <span>Detaylı İncele</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 5: Teknik Bakım */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-8 sm:p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-4xl text-[var(--color-primary)]">engineering</span>
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
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
            <Link
              href={getLocalizedPath('/hesaplayici')}
              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Teknik Bakım Keşfi →
            </Link>
            <Link 
              href={getLocalizedPath('/hizmetler/teknik-bakim')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Teknik Servisi İncele</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 6: Site & Tesis Yönetimi (Amiral Gemisi Hub Linki) */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 border border-blue-400/20">
              <span className="material-symbols-outlined text-sm">apartment</span>
              <span>Amiral Gemisi — Site & Tesis İşletmesi</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Profesyonel Site ve Tesis Yönetimi</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              İstanbul&apos;un 39 ilçesinde 340+ konut sitesi ve rezidansta 634 Sayılı KMK ve ISO 41001 standartlarında 5188 lisanslı güvenlik, temizlik, önleyici teknik servis ve %99.2 aidat tahsilat garantisi sunuyoruz.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Site Yönetimi', 'Toplu Konut', 'Rezidans', 'KMK 634', '%30 Tasarruf', '15 Dk SLA'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/10 text-slate-200 rounded-full text-xs font-semibold border border-white/10">
                  {tag}
                </span>
              ))}
            </div>

            {/* Alt Sektörel Hızlı Linkler */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3 text-xs">
              <Link 
                href={getLocalizedPath('/hizmetler/tesis-yonetimi/toplu-konut-yonetimi')}
                className="text-blue-300 hover:text-white underline decoration-blue-500/50 flex items-center gap-1"
              >
                <span>Toplu Konut & Site Çözümleri</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
              <span className="text-slate-600">·</span>
              <Link 
                href={getLocalizedPath('/hizmetler/tesis-yonetimi/rezidans-site-yonetimi')}
                className="text-blue-300 hover:text-white underline decoration-blue-500/50 flex items-center gap-1"
              >
                <span>Rezidans & Lüks Site</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <Link 
              href={getLocalizedPath('/hizmetler/tesis-yonetimi')}
              className="text-sm font-extrabold text-blue-400 hover:text-blue-300 flex items-center gap-2 group/btn"
            >
              <span>Site & Tesis Yönetimi Rehberi</span>
              <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1.5 transition-transform">arrow_forward</span>
            </Link>

            <Link
              href={getLocalizedPath('/teklif-al')}
              className="text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              Siteniz İçin Teklif Alın →
            </Link>
          </div>
        </motion.div>

      </motion.div>

    </section>
  );
}
