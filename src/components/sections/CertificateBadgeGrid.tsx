"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function CertificateBadgeGrid() {
  const { t } = useLanguage();

  const certs = [
    {
      code: "ISO 9001:2015",
      title: t('home_cert_1_title'),
      desc: t('home_cert_1_desc'),
      icon: "verified"
    },
    {
      code: "ISO 27001",
      title: t('home_cert_2_title'),
      desc: t('home_cert_2_desc'),
      icon: "security"
    },
    {
      code: "KVKK",
      title: t('home_cert_3_title'),
      desc: t('home_cert_3_desc'),
      icon: "gavel"
    },
    {
      code: "ISO 45001",
      title: t('home_cert_4_title'),
      desc: t('home_cert_4_desc'),
      icon: "health_and_safety"
    },
    {
      code: "ISO 14001",
      title: t('home_cert_5_title'),
      desc: t('home_cert_5_desc'),
      icon: "eco"
    },
    {
      code: "5188",
      title: t('home_cert_6_title'),
      desc: t('home_cert_6_desc'),
      icon: "shield"
    }
  ];

  return (
    <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
          {t('home_cert_badge')}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          {t('home_cert_title')}
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          {t('home_cert_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map((c, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-sm hover:border-[var(--color-primary)] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{c.icon}</span>
              </div>
              <span className="bg-blue-500/10 text-blue-600 font-bold text-xs px-3 py-1 rounded-full">
                {c.code}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-primary)]">{c.title}</h3>
            <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
