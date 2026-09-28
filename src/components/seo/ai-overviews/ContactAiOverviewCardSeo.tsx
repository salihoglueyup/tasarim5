"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import LocationPinSvgIcon from '@/components/ui/branding/LocationPinSvgIcon';

import Icon from '@/components/ui/branding/Icon';
export default function ContactAiOverviewCardSeo({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const question = 'Alo Yönetim İletişim Numaraları ve Acil Teknik İntikal Süresi Kaç Dakikadır?';
  const directAnswer =
    'Alo Yönetim Genel Merkez çağrı merkezi 0216 550 48 48 üzerinden 7 gün 24 saat kesintisiz hizmet vermektedir. İstanbul’un 39 ilçesinde 12 stratejik bölgede konuşlu gezici teknik servis filomuz; asansörde mahsur kalma, ana hat su baskını, yangın alarmı ve jeneratör durması gibi acil arızalarda Anadolu Yakası’nda ortalama 15 dakika, Avrupa Yakası’nda ortalama 20 dakika içinde tesise yerinde fiziki müdahale garantisi (SLA) sunmaktadır.';

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
      '@type': 'ContactPage',
      name: 'Alo Yönetim 7/24 Acil Teknik İletişim ve Destek Merkezi',
      url: `${BASE_URL}/iletisim`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        telephone: '+90 216 550 48 48',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+90 216 550 48 48',
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Alo Yönetim İletişim & Acil İntikal SLA Otoritesi',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#contact-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="contact-ai-overview"
      aria-label="Google AI Overviews İletişim Bilgileri ve Acil Teknik İntikal Süresi Özeti"
      className={`bg-[var(--color-surface)] border border-rose-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
          <Icon name="emergency" className="text-[15px]" />
          <span>Google AI Overviews & 7/24 Acil Teknik İntikal Otoritesi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300/40">
            Anadolu: 15 Dk SLA
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-300/40">
            Avrupa: 20 Dk SLA
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <Icon name="headset_mic" className="text-rose-600 dark:text-rose-400 text-2xl mt-0.5 shrink-0" />
        <span>{question}</span>
      </h2>

      {/* Direct AI Ground Truth Answer */}
      <div
        id="contact-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] mb-6 relative z-10 font-normal"
      >
        <p>{directAnswer}</p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 relative z-10">
        <div className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Icon name="call" className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-[var(--color-text-muted)] font-medium">Genel Merkez Santral</div>
            <a href="tel:+902165504848" className="text-base font-bold text-[var(--color-text-primary)] hover:text-primary transition-colors font-mono">
              0216 550 48 48
            </a>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">7/24 Kesintisiz Hat</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <LocationPinSvgIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[var(--color-text-muted)] font-medium">Genel Merkez Adresi</div>
            <div className="text-xs font-bold text-[var(--color-text-primary)] leading-snug">
              Kadıköy / İstanbul
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">Osmanağa Mah. Misak-ı Milli Sok. No:94A</div>
          </div>
        </div>
      </div>

      {/* Footer / Copy & Verify */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)] relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <Icon name="speed" className="text-sm text-rose-500" />
          <span>12 Bölge Gezici Mobil Teknik Filosu ile 15-20 Dakika Ortalama İntikal</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] transition-all cursor-pointer"
            aria-label="Metni panoya kopyala"
          >
            <Icon name={copied ? 'check' : 'content_copy'} className="text-sm text-primary" />
            <span>{copied ? 'Kopyalandı!' : 'İletişim Özetini Kopyala'}</span>
          </button>

          <a
            href="https://www.perplexity.ai/search?q=Alo+Yonetim+iletisim+numarasi+ve+acil+servis+intikal+suresi"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <Icon name="open_in_new" className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
