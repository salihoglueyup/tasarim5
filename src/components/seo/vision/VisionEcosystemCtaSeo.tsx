"use client";

import React from 'react';
import Link from 'next/link';
import { QuoteCtaButton } from '@/components';

interface VisionEcosystemCtaSeoProps {
  onOpenQuote?: () => void;
}

const CORPORATE_LINKS = [
  {
    title: 'Kalite Belgelerimiz',
    desc: 'ISO 9001, 27001, 45001 akreditasyon sertifikaları',
    url: '/kurumsal/kalite-belgelerimiz',
    icon: 'workspace_premium',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Kalite Politikamız',
    desc: 'Sıfır hata ve bağımsız teftiş manifestomuz',
    url: '/kurumsal/kalite-politikamiz',
    icon: 'verified',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Sürdürülebilirlik',
    desc: 'Sıfır atık, yeşil tesis ve ESG ilkelerimiz',
    url: '/kurumsal/surdurulebilirlik',
    icon: 'eco',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: '5188 Güvenlik Akademisi',
    desc: 'Resmi eğitim kurumumuz guvenlikkursu.com',
    url: '/guvenlik-akademisi',
    icon: 'local_police',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    title: 'İstihdam Köprüsü',
    desc: '1.200 kişilik kadromuz ve açık pozisyonlar',
    url: '/istihdam-koprusu',
    icon: 'diversity_3',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
  {
    title: 'KMK Mevzuat Sözlüğü',
    desc: 'Kat Mülkiyeti Kanunu terimleri ve Yargıtay kararları',
    url: '/sozluk',
    icon: 'menu_book',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
];

export default function VisionEcosystemCtaSeo({ onOpenQuote }: VisionEcosystemCtaSeoProps) {
  return (
    <section className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Sister Corporate Pages Hub */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-brand-500" aria-hidden="true">
              hub
            </span>
            <span>Kurumsal Ekosistem & Bağlantılar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight mb-3">
            Kurumsal Standartlarımızı Daha Yakından İnceleyin
          </h2>
          <p className="text-sm text-[var(--color-secondary)]">
            Tesis yönetiminde kalite, çevre, güvenlik ve istihdam politikalarımızı detaylarıyla keşfedin:
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {CORPORATE_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 hover:border-brand-500/50 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${link.color} group-hover:scale-105 transition-transform`}
              >
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-1">
                  <span>{link.title}</span>
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </h3>
                <p className="text-xs text-[var(--color-secondary)] mt-1 font-normal">
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Big Conversion Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-10 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
                <span className="material-symbols-outlined text-xs">rocket_launch</span>
                <span>2026 Standartlarında Tesis Yönetimi</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                Sitenizin Yönetim Vizyonunu Geleceğe Taşımaya Hazır mısınız?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                Alo Yönetim&apos;in 45.000 dairelik tecrübesi ve %100 açık kasa şeffaflığıyla sitenize özel 
                ücretsiz mali ve teknik fizibilite raporu hazırlayalım. Bütçenizdeki tasarruf potansiyelini 
                24 saat içinde şeffafça sunalım.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full lg:w-auto">
              {onOpenQuote ? (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all text-center cursor-pointer transform hover:-translate-y-0.5"
                >
                  Ücretsiz Yönetim Teklifi Al
                </button>
              ) : (
                <QuoteCtaButton className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all text-center cursor-pointer transform hover:-translate-y-0.5">
                  Ücretsiz Yönetim Teklifi Al
                </QuoteCtaButton>
              )}

              <a
                href="https://wa.me/905325504848?text=Merhaba,%20sitemiz%20için%202026%20yönetim%20vizyonu%20kapsamında%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all text-center flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg text-emerald-400">chat</span>
                <span>WhatsApp ile Danışın</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
