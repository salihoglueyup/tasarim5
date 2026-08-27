"use client";

import React from 'react';
import Link from 'next/link';

export interface ExternalLawReference {
  title: string;
  sourceName: string;
  url: string;
  badge: string;
  description: string;
}

export interface RelatedGlossaryTerm {
  slug: string;
  term: string;
  summary: string;
}

export interface RelatedDistrict {
  slug: string;
  name: string;
}

export interface ServiceAuthorityHubSeoProps {
  serviceName: string;
  serviceCategory: string;
  lawReferences: ExternalLawReference[];
  glossaryTerms: RelatedGlossaryTerm[];
  targetDistricts?: RelatedDistrict[];
  className?: string;
}

const DEFAULT_DISTRICTS: RelatedDistrict[] = [
  { slug: 'kadikoy', name: 'Kadıköy' },
  { slug: 'atasehir', name: 'Ataşehir' },
  { slug: 'besiktas', name: 'Beşiktaş' },
  { slug: 'sisli', name: 'Şişli' },
  { slug: 'uskudar', name: 'Üsküdar' },
  { slug: 'maltepe', name: 'Maltepe' },
  { slug: 'basaksehir', name: 'Başakşehir' },
  { slug: 'bakirkoy', name: 'Bakırköy' },
];

/**
 * Hizmet Sayfaları için Otorite, Yasal Mevzuat ve İç-Dış Bağlantı Hub'ı (ServiceAuthorityHubSeo)
 * 
 * Google E-E-A-T ve arama motoru silolarını güçlendirmek için:
 * 1. Resmi Gazete & Bakanlık dış otorite linkleri (target="_blank" rel="noopener noreferrer")
 * 2. İlgili Sözlük terimleri iç linkleri (/sozluk/[terim])
 * 3. Öncelikli hizmet ilçeleri iç linkleri (/bolgeler/[ilce])
 * 4. Akıllı araçlar ve kurumsal kalite belgeleri çapraz bağlantıları
 */
export default function ServiceAuthorityHubSeo({
  serviceName,
  serviceCategory,
  lawReferences,
  glossaryTerms,
  targetDistricts = DEFAULT_DISTRICTS,
  className = "",
}: ServiceAuthorityHubSeoProps) {
  return (
    <section className={`py-16 md:py-20 border-t border-[var(--color-outline)]/60 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent dark:via-slate-900/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] space-y-12">
        
        {/* Üst Başlık */}
        <div className="flex flex-col gap-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold w-fit mx-auto border border-blue-500/20">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>E-E-A-T MEVZUAT & KURUMSAL OTORİTE AĞI</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)]">
            {serviceName} İçin Resmi Standartlar ve Bilgi Kütüphanesi
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light">
            Hizmet süreçlerimizin dayandığı resmi yasal mevzuatlar, teknik standartlar ve ilgili sözlük terimleri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sol Kolon: Resmi Dış Otorite Mevzuat Linkleri (7 Kolon) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-outline)]/50">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-amber-500">policy</span>
                <span>Resmi Yasal Mevzuatlar & Kamu Kaynakları</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Dış Otorite (Official Sources)</span>
            </div>

            <div className="flex flex-col gap-3.5">
              {lawReferences.map((law, idx) => (
                <a
                  key={idx}
                  href={law.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-amber-500/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5"
                  title={`${law.title} — ${law.sourceName}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                        {law.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {law.sourceName}
                      </span>
                    </div>

                    <span className="text-slate-400 group-hover:text-amber-500 transition-colors flex items-center gap-1 text-[11px] font-semibold shrink-0">
                      <span>Resmi Metin</span>
                      <span className="material-symbols-outlined text-[13px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        open_in_new
                      </span>
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-[var(--color-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {law.title}
                  </h3>

                  <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                    {law.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Sağ Kolon: İlgili Sözlük Terimleri & Akıllı Araçlar (5 Kolon) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* İlgili Sözlük Terimleri */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-outline)]/50">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-blue-500">menu_book</span>
                  <span>İlgili Sözlük Terimleri</span>
                </span>
                <Link href="/sozluk" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Tüm Sözlük →
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                {glossaryTerms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/sozluk/${term.slug}`}
                    className="group bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-blue-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[var(--color-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-blue-500">arrow_right_alt</span>
                        <span>{term.term}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Tanımı Gör
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[var(--color-secondary)] font-light line-clamp-2 leading-relaxed pl-5">
                      {term.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Akıllı Araçlar & Sertifikalar Hızlı Kutu */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-500">widgets</span>
                <span>İlgili Akıllı Araçlar & Belgeler</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <Link
                  href="/hesaplayici"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-blue-600 dark:text-blue-400">calculate</span>
                  <span>Aidat Hesaplayıcı</span>
                </Link>

                <Link
                  href="/kurumsal/kalite-belgelerimiz"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400">workspace_premium</span>
                  <span>ISO & TSE Belgeleri</span>
                </Link>

                <Link
                  href="/kurumsal/surdurulebilirlik"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-900/30 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-amber-600 dark:text-amber-400">eco</span>
                  <span>Yeşil Tesis & GES</span>
                </Link>

                <Link
                  href="/teklif-al"
                  className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">request_quote</span>
                  <span>Ücretsiz Teklif Al</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Alt Satır: Öncelikli İlçe Hizmet Siloları (Hızlı Kapsama Rozetleri) */}
        <div className="pt-8 border-t border-[var(--color-outline)]/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-purple-500">location_on</span>
              <span>{serviceName} Hizmeti Sunduğumuz Öncelikli İstanbul Bölgeleri</span>
            </span>
            <Link href="/bolgeler" className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline">
              Tüm 39 İlçe →
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {targetDistricts.map((d) => (
              <Link
                key={d.slug}
                href={`/bolgeler/${d.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[13px] text-purple-500">near_me</span>
                <span>{d.name} {serviceName}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
