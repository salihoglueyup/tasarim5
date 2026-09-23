"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import {
  UTILITY_SUBSCRIPTION_PROVIDERS,
  UtilityProviderProfile,
} from '@/data/districtUtilitySubscriptionData';

export default function DistrictUtilityTransferGuideSeo() {
  const [activeProviderId, setActiveProviderId] = useState<'bedas' | 'ayedas' | 'iski' | 'igdas'>('bedas');

  const activeProvider =
    UTILITY_SUBSCRIPTION_PROVIDERS.find((p) => p.providerId === activeProviderId) ||
    UTILITY_SUBSCRIPTION_PROVIDERS[0];

  // Schema.org GovernmentService & HowTo
  const schemaUtility = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    '@id': `${BASE_URL}/hizmetler/teknik-bakim#altyapi-abonelik-devir-rehberi`,
    name: '39 İlçe İSKİ, BEDAŞ/AYEDAŞ & İGDAŞ Ortak Sayaç Devri ve Şantiyeden Meskene Geçiş Rehberi',
    description:
      'Apartman ve sitelerde ortak alan elektrik, su ve doğalgaz sayaçlarının yönetim adına devri, iskan sonrası mesken tarifesine geçiş evrakları ve reaktif ceza önleme kılavuzu.',
    url: `${BASE_URL}/hizmetler/teknik-bakim#altyapi-abonelik-devir-rehberi`,
    serviceType: activeProvider.serviceType,
    provider: {
      '@type': 'Organization',
      name: activeProvider.providerName,
    },
  };

  return (
    <section
      id="altyapi-abonelik-devir-rehberi"
      aria-label="39 İlçe İSKİ, BEDAŞ, AYEDAŞ ve İGDAŞ Altyapı Abonelik Devir Rehberi"
      className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden"
    >
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaUtility) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">bolt</span>
            <span>Kurumsal Altyapı & Abonelik Rehberi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            İSKİ, BEDAŞ / AYEDAŞ & İGDAŞ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400">Ortak Sayaç Devri ve Mesken Tarifesi Kılavuzu</span>
          </h2>
          <p className="text-[var(--color-secondary)] mt-2 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            Şantiye elektriğinden meskene geçiş, trafo kompanzasyon devri, hidrofor su aboneliği ve kazan dairesi doğalgaz sözleşmelerinde eksiksiz evrak listesi ve yasal adımlar.
          </p>
        </div>

        <span className="text-xs text-[var(--color-secondary)] font-medium">48 Saatte Hızlı Bürokratik Devir</span>
      </div>

      {/* Provider Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/70 mb-8">
        {UTILITY_SUBSCRIPTION_PROVIDERS.map((p) => (
          <button
            key={p.providerId}
            onClick={() => setActiveProviderId(p.providerId)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${
              activeProviderId === p.providerId
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              {p.providerId === 'bedas' || p.providerId === 'ayedas'
                ? 'electric_bolt'
                : p.providerId === 'iski'
                ? 'water_drop'
                : 'local_fire_department'}
            </span>
            <span>{p.providerName.split(' ')[0]}</span>
            <span className="text-[10px] opacity-80">({p.jurisdictionSide})</span>
          </button>
        ))}
      </div>

      {/* Active Provider Detailed Panel */}
      <div className="space-y-6">
        {/* Title and Scope Banner */}
        <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                {activeProvider.utilityType}
              </span>
              <span className="text-xs text-[var(--color-secondary)]">
                Yetki Alanı: <strong className="text-[var(--color-primary)]">{activeProvider.jurisdictionSide}</strong>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mt-1">
              {activeProvider.serviceType}
            </h3>
          </div>

          <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-xs text-[var(--color-secondary)] md:max-w-xs">
            <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold uppercase block mb-0.5">Güvence Bedeli Politikası:</span>
            <span>{activeProvider.depositFeePolicy}</span>
          </div>
        </div>

        {/* 2-Column: Required Documents & Step-by-Step Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Required Documents Checklist */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/70 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-base" aria-hidden="true">folder</span>
                <span>Zorunlu Başvuru Evrakları</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--color-secondary)]">
                {activeProvider.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-sm text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" aria-hidden="true">
                      check_circle
                    </span>
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs">
              <strong className="block text-[11px] text-rose-600 dark:text-rose-400 font-bold uppercase mb-0.5">
                ⚠️ Yapılmazsa Karşılaşılacak Risk:
              </strong>
              <span>{activeProvider.criticalRisksIfNotDone}</span>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/70 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-base" aria-hidden="true">alt_route</span>
                <span>Devir ve Tescil Süreci (4 Adım)</span>
              </div>
              <div className="space-y-3">
                {activeProvider.steps.map((step) => (
                  <div key={step.stepNumber} className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-[var(--color-primary)]">
                        Adım {step.stepNumber}: {step.stepTitle}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {step.responsibleParty}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{step.actionRequired}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                verified
              </span>
              <span>{activeProvider.aloYonetimGuarantee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-8 p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-400 text-xl" aria-hidden="true">support_agent</span>
          <span>
            Yeni kurulan veya müteahhitten teslim alınan sitelerde tüm sayaç devirleri ve şantiyeden meskene geçiş işlemleri ücretsiz yürütülür.
          </span>
        </div>
        <a
          href="/iletisim"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition shrink-0 shadow-xs cursor-pointer"
        >
          <span>Abonelik Devir Desteği</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
