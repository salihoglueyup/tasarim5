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
    <section id="hizmetler" className="py-32 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200 dark:border-white/10">
          <span className="material-symbols-outlined text-[16px]">domain</span>
          Entegre Tesis ve Mülk Çözümleri
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
          className="md:col-span-2 md:row-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-slate-500/10 transition-colors pointer-events-none" style={{ transform: "translateZ(0)" }}></div>
          <div>
            <span className="material-symbols-outlined text-5xl text-[var(--color-primary)] mb-6">shield_person</span>
            <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{t('home_bento_card1_title')}</h3>
            <p className="text-[var(--color-secondary)] text-lg leading-relaxed max-w-md">
              {t('home_bento_card1_desc')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Kamera Sistemleri', 'Fiziki Güvenlik', 'Devriye', 'Plaka Tanıma'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            
            <ul className="mt-10 space-y-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-[var(--color-primary)]">check</span>
                  </div>
                  <span className="text-[var(--color-secondary)] font-medium text-lg">
                    {t(`home_bento_card1_chk${num}` as Parameters<typeof t>[0])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
            <Link 
              href={getLocalizedPath('/hizmetler/guvenlik-yonetimi')}
              className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-2 group/link"
            >
              Özel Güvenlik Hizmetini Keşfet
              <span className="material-symbols-outlined text-base group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 2: Temizlik */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">cleaning_services</span>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card2_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card2_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Ortak Alan', 'Otopark', 'Çöp Toplama', 'Hijyen'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex justify-end">
            <Link 
              href={getLocalizedPath('/hizmetler/temizlik-ve-hijyen')}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
            >
              Detaylı İncele <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 3: Aidat & Finans */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">account_balance_wallet</span>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card3_title')}</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              {t('home_bento_card3_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Aidat Takibi', 'Şeffaf Bilanço', 'İcra Takibi', 'Gider Yönetimi'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
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
              Detaylı İncele <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 4: Hukuk */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">gavel</span>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card4_title')}</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              {t('home_bento_card4_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Hukuki Danışmanlık', 'Dava Takibi', 'İhtarname', 'KVKK'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
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
              Detaylı İncele <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Card 5: Teknik Bakım */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex items-center gap-8 justify-between"
        >
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card5_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card5_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Asansör Bakımı', 'Jeneratör', 'Havuz Dairesi', 'Tesisat'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Link 
                href={getLocalizedPath('/hizmetler/teknik-bakim')}
                className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1.5"
              >
                Teknik Bakım Hizmetlerini İncele <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="w-20 h-20 bg-[var(--color-background)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined text-3xl text-[var(--color-primary)]">engineering</span>
          </div>
        </motion.div>

        {/* Card 6: Tesis & Mülk Yönetimi (Amiral Gemisi Hub Linki) */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-[2.5rem] p-10 border border-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 border border-blue-400/20">
              <span className="material-symbols-outlined text-sm">star</span>
              Amiral Gemisi Hizmet
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Entegre Tesis ve Mülk Yönetimi</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              634 Sayılı KMK ve ISO 41001 standartlarında güvenlik, temizlik, teknik servis ve aidat takibini tek çatı altında yönetiyor, %30 maliyet tasarrufu sağlıyoruz.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['ISO 41001', 'KMK 634', '%30 Tasarruf', '45 Dk SLA', '39 İlçe'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/10 text-slate-200 rounded-full text-xs font-semibold border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
            <Link 
              href={getLocalizedPath('/hizmetler/tesis-yonetimi')}
              className="text-sm font-extrabold text-blue-400 hover:text-blue-300 flex items-center gap-2 group/btn"
            >
              Tesis Yönetimi Detaylı Rehber & Teklif
              <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1.5 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

      </motion.div>

    </section>
  );
}
