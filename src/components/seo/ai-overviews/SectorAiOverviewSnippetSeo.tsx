"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

import Icon from '@/components/ui/branding/Icon';
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
    ? `${sectorName} tesis yönetiminde 5188 Sayılı Özel Güvenlik Kanunu ve Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY) temel emredici standartlardır. Tesisin can ve mal güvenliğini temin etmek üzere; 7/24 teknik izleme, acil durum tahliye senaryoları, periyodik asansör/jeneratör muayeneleri ve hijyenik biyosidal kontroller kurumsal denetim ekiplerince eksiksiz yürütülür.`
    : 'Kurumsal tesis yönetiminde sektöre göre farklılaşan emredici mevzuatlar bulunur: Rezidans ve sitelerde 634 Sayılı Kat Mülkiyeti Kanunu (KMK 66 Toplu Yapı) ve Sağlık Bakanlığı Havuz Hijyeni; AVM ve iş merkezlerinde 5188 Sayılı Kanun fiziki güvenlik, Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY) ve HVAC otomasyonu; Sanayi ve lojistik depolarda NFPA 13 yangın sprinkler, rampa ve zemin periyodik kontrolleri; Eğitim kampüslerinde çocuk güvenliği ve biyosidal ilaçlama standartları esastır. Alo Yönetim her sektör için ISO 45001 ve ISO 22301 belgeli süreçlere dayanan özelleştirilmiş işletim protokolleri uygular.';

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
      className={`bg-[var(--color-surface)] border border-slate-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-slate-500/10 via-slate-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
          <Icon name="domain" className="text-[15px]" />
          <span>Google AI Overviews & B2B Sektörel Mevzuat Otoritesi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 border border-slate-300/40">
            ISO 45001 Belgeli
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 border border-slate-300/40">
            BYKHY & NFPA 13
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <Icon name="gavel" className="text-slate-600 dark:text-slate-400 text-2xl mt-0.5 shrink-0" />
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
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
            <Icon name="apartment" className="text-base" />
            <span className="text-xs font-bold">Rezidans & Toplu Yapı</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            KMK 66 Temsilciler Kurulu bütçe işletimi, resepsiyon/konsiyerj ve Sağlık Bakanlığı havuz hijyen kaydı.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
            <Icon name="storefront" className="text-base" />
            <span className="text-xs font-bold">AVM & Ticaret Merkezi</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            5188 SK X-Ray & turnike giriş güvenliği, BYKHY yangın tahliye otomasyonu ve 7/24 HVAC iklimlendirme.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
            <Icon name="warehouse" className="text-base" />
            <span className="text-xs font-bold">Lojistik & Antrepo</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            NFPA 13 sprinkler hidrofor debi testi, epoksi zemin koruması ve yük rampası periyodik muayenesi.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1.5">
            <Icon name="school" className="text-base" />
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
          <Icon name="verified_user" className="text-sm text-slate-500" />
          <span>B2B Tesis Yöneticileri ve Denetçileri İçin Mevzuat Referansı</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] transition-all cursor-pointer"
            aria-label="Metni panoya kopyala"
          >
            <Icon name={copied ? 'check' : 'content_copy'} className="text-sm text-primary" />
            <span>{copied ? 'Kopyalandı!' : 'Mevzuat Özetini Kopyala'}</span>
          </button>

          <a
            href={`https://www.perplexity.ai/search?q=${encodeURIComponent(
              (sectorName || 'Sektorel') + ' tesis yonetimi mevzuat ve standartlari'
            )}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-600 hover:bg-slate-700 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <Icon name="open_in_new" className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
