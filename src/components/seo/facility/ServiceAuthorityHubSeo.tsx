"use client";

import React from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/branding/Icon';
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
    <section className={`py-16 md:py-20 border-t border-[var(--color-outline)]/60 bg-gradient-to-b from-transparent via-[var(--color-surface-variant)]/40 to-transparent ${className}`}>
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] space-y-12">
        
        {/* Üst Başlık */}
        <div className="flex flex-col gap-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-extrabold w-fit mx-auto border border-[var(--color-outline)]/80 dark:border-white/10">
            <Icon name="verified" className="text-[15px]" />
            <span>E-E-A-T MEVZUAT & KURUMSAL OTORİTE AĞI</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
            {serviceName} İçin Resmi Standartlar ve Bilgi Kütüphanesi
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal">
            Hizmet süreçlerimizin dayandığı resmi yasal mevzuatlar, teknik standartlar ve ilgili sözlük terimleri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sol Kolon: Resmi Dış Otorite Mevzuat Linkleri (7 Kolon) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-outline)]/50 dark:border-white/10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Icon name="policy" className="text-base text-slate-500" />
                <span>Resmi Yasal Mevzuatlar & Kamu Kaynakları</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Dış Otorite (Official Sources)</span>
            </div>

            <div className="flex flex-col gap-3.5">
              {lawReferences.map((law, idx) => (
                <a
                  key={idx}
                  href={law.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group bg-[var(--color-surface)] dark:bg-[var(--color-surface)] border border-[var(--color-outline)]/70 dark:border-white/10 hover:border-slate-500/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5"
                  title={`${law.title} — ${law.sourceName}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 rounded-lg border border-[var(--color-outline)]/60 dark:border-white/10">
                        {law.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {law.sourceName}
                      </span>
                    </div>

                    <span className="text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors flex items-center gap-1 text-[11px] font-semibold shrink-0">
                      <span>Resmi Metin</span>
                      <Icon name="open_in_new" className="text-[13px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                    {law.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
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
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-outline)]/50 dark:border-white/10">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Icon name="menu_book" className="text-base text-slate-500" />
                  <span>İlgili Sözlük Terimleri</span>
                </span>
                <Link href="/sozluk" className="text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:underline">
                  Tüm Sözlük →
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                {glossaryTerms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/sozluk/${term.slug}`}
                    className="group bg-[var(--color-surface)] dark:bg-[var(--color-surface)] border border-[var(--color-outline)]/70 dark:border-white/10 hover:border-slate-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors flex items-center gap-1.5">
                        <Icon name="arrow_right_alt" className="text-[15px] text-slate-500" />
                        <span>{term.term}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        Tanımı Gör
                      </span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-400 font-normal line-clamp-2 leading-relaxed pl-5">
                      {term.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Akıllı Araçlar & Sertifikalar Hızlı Kutu */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface)] border border-[var(--color-outline)]/70 dark:border-white/10 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Icon name="widgets" className="text-base text-slate-500" />
                <span>İlgili Akıllı Araçlar & Belgeler</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <Link
                  href="/hesaplayici"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-500/10 hover:text-slate-700 dark:hover:text-slate-400 border border-[var(--color-outline)]/70 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-2 transition-colors"
                >
                  <Icon name="calculate" className="text-base text-slate-500" />
                  <span>Aidat Hesaplayıcı</span>
                </Link>

                <Link
                  href="/kurumsal/kalite-belgelerimiz"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-500/10 hover:text-slate-700 dark:hover:text-slate-400 border border-[var(--color-outline)]/70 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-2 transition-colors"
                >
                  <Icon name="workspace_premium" className="text-base text-emerald-600 dark:text-emerald-400" />
                  <span>ISO & TSE Belgeleri</span>
                </Link>

                <Link
                  href="/kurumsal/surdurulebilirlik"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-500/10 hover:text-slate-700 dark:hover:text-slate-400 border border-[var(--color-outline)]/70 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-2 transition-colors"
                >
                  <Icon name="eco" className="text-base text-emerald-600 dark:text-emerald-400" />
                  <span>Yeşil Tesis & GES</span>
                </Link>

                <Link
                  href="/teklif-al"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Icon name="request_quote" className="text-base" />
                  <span>Ücretsiz Teklif Al</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Alt Satır: Öncelikli İlçe Hizmet Siloları (Hızlı Kapsama Rozetleri) */}
        <div className="pt-8 border-t border-[var(--color-outline)]/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Icon name="location_on" className="text-base text-slate-500 dark:text-slate-400" />
              <span>{serviceName} Hizmeti Sunduğumuz Öncelikli İstanbul Bölgeleri</span>
            </span>
            <Link href="/bolgeler" className="text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:underline">
              Tüm 39 İlçe →
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {targetDistricts.map((d) => (
              <Link
                key={d.slug}
                href={`/bolgeler/${d.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-[var(--color-surface)] dark:bg-[var(--color-surface)] border border-[var(--color-outline)]/70 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Icon name="near_me" className="text-[13px] text-slate-500 dark:text-slate-400" />
                <span>{d.name} {serviceName}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
