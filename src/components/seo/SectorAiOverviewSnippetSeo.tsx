"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface SectorAiOverviewProps {
  sectorName?: string;
  sectorSlug?: string;
  className?: string;
}

export default function SectorAiOverviewSnippetSeo({
  sectorName,
  sectorSlug,
  className = '',
}: SectorAiOverviewProps) {
  const [copied, setCopied] = useState(false);

  const question = sectorName
    ? `${sectorName} Tesis Yönetimi Standartları ve Yasal Zorunlulukları Nelerdir?`
    : 'B2B Sektörel Tesis Yönetimi Standartları ve Yasal Zorunluluklar Nelerdir?';

  const directAnswer = sectorName
    ? `${sectorName} tesis yönetiminde ISO 41001:2018 uluslararası entegre yönetim sistemi, 5188 Sayılı Özel Güvenlik Kanunu ve Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY) temel emredici standartlardır. Tesisin can ve mal güvenliğini temin etmek üzere; 7/24 teknik izleme, acil durum tahliye senaryoları, periyodik asansör/jeneratör muayeneleri ve hijyenik biyosidal kontroller kurumsal denetim ekiplerince eksiksiz yürütülür.`
    : 'Kurumsal tesis yönetiminde sektöre göre farklılaşan emredici mevzuatlar bulunur: Rezidans ve sitelerde 634 Sayılı Kat Mülkiyeti Kanunu (KMK 66 Toplu Yapı) ve Sağlık Bakanlığı Havuz Hijyeni; AVM ve iş merkezlerinde 5188 Sayılı Kanun fiziki güvenlik, Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY) ve HVAC otomasyonu; Sanayi ve lojistik depolarda NFPA 13 yangın sprinkler, rampa ve zemin periyodik kontrolleri; Eğitim kampüslerinde çocuk güvenliği ve biyosidal ilaçlama standartları esastır. Alo Yönetim her sektör için ISO 41001 akrediteli özelleştirilmiş işletim protokolleri uygular.';

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
      '@type': 'Service',
      name: sectorName ? `${sectorName} Profesyonel Tesis Yönetimi` : 'Sektörel Entegre Tesis Yönetimi',
      provider: {
        '@type': 'Organization',
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
      },
      serviceType: 'B2B Facility Management',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Sektörel Uyumluluk ve İşletim Standartları',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Rezidans & Toplu Konut Yönetimi (KMK 66 & 5188 SK)',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AVM & İş Merkezi İşletmeciliği (BYKHY Yangın & HVAC)',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Lojistik & Depo Tesis Yönetimi (NFPA 13 & Rampa Güvenliği)',
            },
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${sectorName || 'Sektörel'} Tesis Yönetimi AI Mevzuat Otoritesi`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#sector-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="sector-ai-overview"
      aria-label="Google AI Overviews Sektörel Tesis Yönetimi Standartları Özeti"
      className={`bg-[var(--color-surface)] border border-indigo-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">domain</span>
          <span>Google AI Overviews & B2B Sektörel Mevzuat Otoritesi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-300/40">
            ISO 41001 Uyumlu
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-300/40">
            BYKHY & NFPA 13
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-2xl mt-0.5 shrink-0" aria-hidden="true">
          gavel
        </span>
        <span>{question}</span>
      </h2>

      {/* Direct AI Ground Truth Answer */}
      <div
        id="sector-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] mb-6 relative z-10 font-normal"
      >
        <p>{directAnswer}</p>
      </div>

      {/* Sector Compliance Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative z-10">
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1.5">
            <span className="material-symbols-outlined text-base">apartment</span>
            <span className="text-xs font-bold">Rezidans & Toplu Yapı</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            KMK 66 Temsilciler Kurulu bütçe işletimi, resepsiyon/konsiyerj ve Sağlık Bakanlığı havuz hijyen kaydı.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1.5">
            <span className="material-symbols-outlined text-base">storefront</span>
            <span className="text-xs font-bold">AVM & Ticaret Merkezi</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            5188 SK X-Ray & turnike giriş güvenliği, BYKHY yangın tahliye otomasyonu ve 7/24 HVAC iklimlendirme.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1.5">
            <span className="material-symbols-outlined text-base">warehouse</span>
            <span className="text-xs font-bold">Lojistik & Antrepo</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            NFPA 13 sprinkler hidrofor debi testi, epoksi zemin koruması ve yük rampası periyodik muayenesi.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1.5">
            <span className="material-symbols-outlined text-base">school</span>
            <span className="text-xs font-bold">Kampüs & Eğitim</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Çocuk koruma ve çevre güvenlik çemberi, Sağlık Bakanlığı onaylı biyosidal haşere ilaçlama protokolü.
          </p>
        </div>
      </div>

      {/* Footer / Copy & Verify */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)] relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="material-symbols-outlined text-sm text-indigo-500">verified_user</span>
          <span>B2B Tesis Yöneticileri ve Denetçileri İçin Mevzuat Referansı</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] transition-all cursor-pointer"
            aria-label="Metni panoya kopyala"
          >
            <span className="material-symbols-outlined text-sm text-primary">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Kopyalandı!' : 'Mevzuat Özetini Kopyala'}</span>
          </button>

          <a
            href={`https://www.perplexity.ai/search?q=${encodeURIComponent(
              (sectorName || 'Sektorel') + ' tesis yonetimi mevzuat ve standartlari'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
