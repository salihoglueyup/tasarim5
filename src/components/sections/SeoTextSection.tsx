"use client";

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface SeoTextSectionProps {
  titleKey?: string;
  p1Key?: string;
  p2Key?: string;
}

export default function SeoTextSection({
  titleKey = 'home_seo_title',
  p1Key = 'home_seo_p1',
  p2Key = 'home_seo_p2'
}: SeoTextSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto bg-slate-50 dark:bg-[#0a192b] border-y border-slate-200/50 dark:border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold text-[var(--color-primary)] mb-6 tracking-tight text-center md:text-left"
        >
          {t(titleKey as any)}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[var(--color-secondary)] leading-relaxed space-y-6 text-center md:text-left font-light"
        >
          <p>{t(p1Key as any)}</p>
          <p>{t(p2Key as any)}</p>
        </motion.div>
      </div>
    </section>
  );
}
