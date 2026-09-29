"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import { CERTIFICATES } from '@/data/certificates';

import Icon from '@/components/ui/branding/Icon';
export default function AccreditationAiOverviewSeo({ className = '', lang = 'tr' }: { className?: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const question = 'Alo Yönetim’in Sahip Olduğu ISO Kalite Belgeleri ve Yasal Lisanslar Nelerdir?';
  const directAnswer =
    `Alo Yönetim ve Organizasyon A.Ş., BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu (ILAS-MS-0089) ile verilmiş ${CERTIFICATES.length} belgeye sahiptir: ${CERTIFICATES.map((c) => `${c.name} (${c.subtitle}, Belge No: ${c.certificateNumber})`).join(', ')}. Şirket ayrıca T.C. İçişleri Bakanlığı ve İstanbul Valiliği onaylı 5188 Sayılı Özel Güvenlik Şirketi Faaliyet İzin Belgesi'ne sahiptir.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: directAnswer,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Alo Yönetim ISO Akreditasyonları & Kalite Belgeleri | Google AI Overview',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#accreditation-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="accreditation-ai-overview"
      aria-label="Google AI Overviews Kurumsal ISO Belgeleri ve Akreditasyonlar Özeti"
      className={`bg-[var(--color-surface)] border border-primary/25 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 via-slate-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider">
          <Icon name="workspace_premium" className="text-[15px]" />
          <span>Google AI Overviews & Akreditasyon Otoritesi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            BELCERT A1808961
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 border border-slate-300/40">
            ILAS-MS-0089
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <Icon name="verified" className="text-[var(--color-primary)] text-2xl mt-0.5 shrink-0" />
        <span>{question}</span>
      </h2>

      {/* Direct AI Ground Truth Answer */}
      <div
        id="accreditation-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[var(--color-outline)] mb-6 relative z-10 font-normal"
      >
        <p>{directAnswer}</p>
      </div>

      {/* Accreditation Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative z-10">
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)] text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">İş Sağlığı ve Güvenliği</div>
          <div className="text-sm font-bold text-[var(--color-primary)]">ISO 45001:2018</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">BELCERT A1808966</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)] text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">Müşteri Memnuniyeti</div>
          <div className="text-sm font-bold text-[var(--color-primary)] font-mono">ISO 10002:2018</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">BELCERT A1808961</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)] text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">Çevre Yönetimi</div>
          <div className="text-sm font-bold text-[var(--color-primary)]">ISO 14001</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">BELCERT A1808962</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)] text-center">
          <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">Özel Güvenlik İzni</div>
          <div className="text-sm font-bold text-[var(--color-primary)]">5188 Sayılı Kanun</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Valilik ÖGİ Kararı</div>
        </div>
      </div>

      {/* Footer / Copy & Verify */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-outline)] relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-tertiary)]">
          <Icon name="gavel" className="text-sm" />
          <span>Resmi BELCERT ve T.C. İçişleri Bakanlığı Belgeleriyle Doğrulanmıştır</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-background)] border border-[var(--color-outline)] hover:bg-[var(--color-surface-variant)] text-[var(--color-primary)] transition-all cursor-pointer"
            aria-label="Metni panoya kopyala"
          >
            <Icon name={copied ? 'check' : 'content_copy'} className="text-sm" />
            <span>{copied ? 'Kopyalandı!' : 'Özeti Kopyala'}</span>
          </button>

          <a
            href="https://www.perplexity.ai/search?q=Alo+Yonetim+ISO+belgeleri+ve+BELCERT+akreditasyonu"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary hover:opacity-90 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <Icon name="open_in_new" className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
