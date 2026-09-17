"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GROUP_COMPANIES_ECOSYSTEM } from '@/lib/seo/facilityGroupAndLegalEcosystem';

export default function FacilityGroupSecurityTrustSeo() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-primary)] rounded-[3rem] p-8 md:p-14 border border-[var(--color-outline)]/80 shadow-sm relative overflow-hidden my-12">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-emerald-600 dark:text-emerald-400" aria-hidden="true">verified_user</span>
            Entegre Güvenlik & Eğitim Ekosistemimiz
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Grup Şirketlerimiz & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">5188 Güvenlik Ağı</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-2 max-w-2xl">
            Tesislerinizde görev yapan tüm özel güvenlik personeli, grup şirketlerimiz bünyesinde yetiştirilmekte ve 5188 sayılı yasal lisans ile doğrudan görevlendirilmektedir.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-secondary)] bg-[var(--color-surface-variant)] border border-[var(--color-outline)] px-4 py-2 rounded-2xl shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>T.C. İçişleri Bakanlığı Lisanslı Ekosistem</span>
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {GROUP_COMPANIES_ECOSYSTEM.map((company, index) => {
          const isAloGuvenlik = company.id === 'alo-guvenlik';
          return (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[var(--color-surface-variant)] rounded-3xl p-6 md:p-8 border border-[var(--color-outline)]/70 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/70">
                    {company.serviceCategory}
                  </span>
                  <span className="material-symbols-outlined text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors" aria-hidden="true">
                    {isAloGuvenlik ? 'school' : 'shield'}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-2 transition-colors">
                  {company.name}
                </h3>
                <div className="text-xs text-[var(--color-tertiary)] font-medium mb-3">
                  {company.legalName}
                </div>
                <p className="text-xs md:text-sm text-[var(--color-secondary)] leading-relaxed font-light mb-6">
                  {company.description}
                </p>
              </div>

              {/* Action Button & Outbound Link */}
              <div className="pt-4 border-t border-[var(--color-outline)]/60 flex items-center justify-between gap-4">
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">check_circle</span>
                  <span>{company.licenseNumber || '5188 Yasal Faaliyet İzni'}</span>
                </div>

                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs group/btn"
                  title={`${company.name} Resmi Web Sitesi`}
                >
                  <span>Resmi Siteyi İncele</span>
                  <span className="material-symbols-outlined text-[14px] group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true">
                    open_in_new
                  </span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
