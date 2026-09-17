"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface AcademicCitationBoxSeoProps {
  pageUrl?: string;
  pageTitle: string;
  publishYear?: number;
  authorName?: string;
  documentCategory?: string;
}

type CitationStyle = 'legal' | 'apa' | 'bibtex';

export default function AcademicCitationBoxSeo({
  pageUrl = `${BASE_URL}/hizmetler/site-yonetimi`,
  pageTitle,
  publishYear = 2026,
  authorName = 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
  documentCategory = 'Kat Mülkiyeti Kanunu ve Tesis Yönetimi Uygulama Kılavuzu',
}: AcademicCitationBoxSeoProps) {
  const [activeStyle, setActiveStyle] = useState<CitationStyle>('legal');
  const [copied, setCopied] = useState(false);

  const cleanUrl = pageUrl.startsWith('http') ? pageUrl : `${BASE_URL}${pageUrl}`;

  const citations: Record<CitationStyle, { name: string; text: string }> = {
    legal: {
      name: 'Adli / Hukuki Standart (Yargı & Mevzuat)',
      text: `${authorName} (${publishYear}). "${pageTitle}". Alo Yönetim Mevzuat ve Araştırma Serisi, 634 Sayılı KMK Uygulama Raporu. URL: ${cleanUrl}`,
    },
    apa: {
      name: 'APA 7th Edition',
      text: `${authorName}. (${publishYear}). ${pageTitle}. Alo Yönetim Yayınları. ${cleanUrl}`,
    },
    bibtex: {
      name: 'BibTeX (LaTeX)',
      text: `@misc{aloyonetim_${publishYear},
  author = {{${authorName}}},
  title = {${pageTitle}},
  year = {${publishYear}},
  howpublished = {\\url{${cleanUrl}}},
  note = {Alo Yönetim Araştırma Merkezi}
}`,
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(citations[activeStyle].text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Schema.org ScholarlyArticle & citation metadata for Google Scholar & AI Grounding
  const schemaCitation = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': `${cleanUrl}#citation`,
    headline: pageTitle,
    name: pageTitle,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: BASE_URL,
    },
    datePublished: `${publishYear}-01-01`,
    inLanguage: 'tr-TR',
    url: cleanUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim Gayrimenkul ve Tesis Yönetim Grubu A.Ş.',
      url: BASE_URL,
    },
    about: documentCategory,
    citation: cleanUrl,
  };

  return (
    <section className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
      {/* Schema.org ScholarlyArticle Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCitation) }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 dark:bg-violet-400/10 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">format_quote</span>
            Akademik, Hukuki & AI Atıf Motoru (Citation Index)
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-[var(--color-primary)]">
            Bu Rehbere Hukuki veya Akademik Atıf Yapın
          </h3>
          <p className="text-xs text-[var(--color-secondary)] mt-1 max-w-2xl">
            Rapor, tez, makale ve mahkeme layihalarınızda bu sayfayı tescilli kurumsal kaynak olarak alıntılamak için uygun formatı kopyalayın.
          </p>
        </div>

        {/* Style Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80">
          {(['legal', 'apa', 'bibtex'] as CitationStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeStyle === style
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {style === 'legal' ? 'Adli / Mevzuat' : style.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Citation Box & Copy */}
      <div className="relative bg-[var(--color-surface-variant)]/70 border border-[var(--color-outline)] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <cite className="not-italic text-xs sm:text-sm font-mono text-[var(--color-primary)] leading-relaxed break-all sm:break-normal">
          {citations[activeStyle].text}
        </cite>

        <button
          onClick={handleCopy}
          className="shrink-0 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          aria-label="Atfı Kopyala"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span>{copied ? 'Kopyalandı!' : 'Atfı Kopyala'}</span>
        </button>
      </div>
    </section>
  );
}
