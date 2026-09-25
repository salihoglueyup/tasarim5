"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';
import {
  ISO_COMPLIANCE_STANDARDS,
  B2B_SLA_TIERS,
  B2B_RFP_SPECIFICATION_TEMPLATE,
} from '@/data/facilityCorporateB2BData';

type ActiveTab = 'iso-matrix' | 'sla-tiers' | 'rfp-template';

export default function FacilityCorporateB2BHubSeo() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('sla-tiers');
  const [copied, setCopied] = useState(false);

  const handleCopyRfp = () => {
    navigator.clipboard.writeText(B2B_RFP_SPECIFICATION_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Schema.org Table & DigitalDocument
  const schemaB2BHub = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: 'B2B Entegre Tesis Yönetimi ISO Standartları ve Kurumsal SLA Seviyeleri',
    description: 'Plazalar, fabrikalar ve ticari binalar için ISO 41001 kalite standartları, Silver/Gold/Platinum SLA paketleri ve B2B teknik şartname şablonu.',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi#b2b-kurumsal-hub`,
  };

  return (
    <section id="b2b-kurumsal-hub" className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      {/* Schema.org Table Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaB2BHub) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">corporate_fare</span>
            B2B Kurumsal Gayrimenkul & Tesis Çözümleri
          </div>
          <h3 className="text-xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            ISO 41001 Standartları, <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400">Kurumsal SLA Kademeleri & RFP Hub</span>
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            Plazalar, sanayi tesisleri, lojistik merkezler ve ticari yapılar için sözleşmeye bağlı SLA garantileri ve teknik şartname altyapısı.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80">
          <button
            onClick={() => setActiveTab('sla-tiers')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'sla-tiers'
                ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            SLA Seviyeleri
          </button>
          <button
            onClick={() => setActiveTab('iso-matrix')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'iso-matrix'
                ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            ISO Standartları
          </button>
          <button
            onClick={() => setActiveTab('rfp-template')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'rfp-template'
                ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            B2B Şartname
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'sla-tiers' && (
          <motion.div
            key="sla-tiers"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {B2B_SLA_TIERS.map((tier) => (
              <div
                key={tier.tierId}
                className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between ${
                  tier.tierId === 'platinum'
                    ? 'bg-[var(--color-surface)] border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-md'
                    : 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[var(--color-primary)]">
                      {tier.tierName}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-outline)] shadow-2xs">
                      {tier.responseTimeMinutes} Dk SLA
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--color-primary)] mb-3">
                    {tier.targetPropertyType}
                  </h4>

                  <ul className="space-y-2.5 text-xs text-[var(--color-secondary)] pt-3 border-t border-[var(--color-outline)]/60">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-sm shrink-0 mt-0.5" aria-hidden="true">timer</span>
                      <span><strong>Acil Müdahale:</strong> Azami {tier.responseTimeMinutes} dakika içinde yerinde müdahale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-sm shrink-0 mt-0.5" aria-hidden="true">sensors</span>
                      <span><strong>BMS Telemetri:</strong> {tier.bmsMonitoring}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-sm shrink-0 mt-0.5" aria-hidden="true">badge</span>
                      <span><strong>Yerinde Kadro:</strong> {tier.onSiteStaffing}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-sm shrink-0 mt-0.5" aria-hidden="true">savings</span>
                      <span><strong>Tasarruf Taahhüdü:</strong> {tier.energySavingsGuarantee}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--color-outline)]/60 text-[11px] text-[var(--color-tertiary)] font-medium">
                  ⚖️ {tier.penaltyClause}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'iso-matrix' && (
          <motion.div
            key="iso-matrix"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {ISO_COMPLIANCE_STANDARDS.map((iso) => (
              <div
                key={iso.standardCode}
                className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[var(--color-primary)]">
                      {iso.standardCode}
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--color-secondary)]">
                      {iso.accreditationBody}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--color-primary)] mb-2">
                    {iso.name}
                  </h4>
                  <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-3">
                    {iso.scope}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)] text-xs text-[var(--color-primary)] font-medium shadow-2xs">
                  ✓ {iso.benefitToClient}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'rfp-template' && (
          <motion.div
            key="rfp-template"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-6 rounded-3xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)] space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                  B2B Entegre Tesis Yönetimi İhale & Hizmet Alım Şartnamesi Taslağı
                </h4>
                <p className="text-xs text-[var(--color-secondary)] mt-0.5">
                  Şirketinizin ihale süreçlerinde kullanmak üzere avukat onaylı teknik şartname metnini kopyalayın.
                </p>
              </div>
              <button
                onClick={handleCopyRfp}
                className="shrink-0 px-4 py-2 rounded-xl bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Kopyalandı!' : 'Şartnameyi Kopyala'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-xs font-mono text-[var(--color-primary)] whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto scrollbar-thin">
              {B2B_RFP_SPECIFICATION_TEMPLATE}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
