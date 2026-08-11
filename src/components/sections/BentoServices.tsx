"use client";

import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function BentoServices() {
  const { t } = useLanguage();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  // GPU Katman Terfisi (Zero-Jank Scrolling)
  const cardGpuStyle = { willChange: "transform, opacity", transform: "translateZ(0)" };

  return (
    <section id="hizmetler" className="py-32 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center mb-20">
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
            
            {/* Boşluğu dolduran şık özellik listesi */}
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
          <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300 self-end">
            <span className="material-symbols-outlined text-3xl text-[var(--color-secondary)]">arrow_forward</span>
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
          </div>
          <div className="w-20 h-20 bg-[var(--color-background)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined text-3xl text-[var(--color-primary)]">engineering</span>
          </div>
        </motion.div>

        {/* Card 6: Sosyal Tesisler */}
        <motion.div 
          variants={itemVariants}
          style={cardGpuStyle}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-surface-variant)] opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative z-10">
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">pool</span>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{t('home_bento_card6_title')}</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {t('home_bento_card6_desc')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Havuz Kimyasalları', 'Spor Salonu', 'Peyzaj', 'Rezervasyon'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>

    </section>
  );
}
