"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export interface InstantAnswerCardProps {
  question: string;
  shortAnswer: string;
  bulletPoints?: string[];
  lawArticle?: string;
  verifiedBy?: string;
  lastUpdated?: string;
  category?: string;
}

/**
 * InstantAnswerCardSeo — Google Featured Snippet (0. Sıra Doğrudan Cevap Kutusu)
 *
 * Google'ın "Position Zero" doğrudan cevap kutuları ve AI Overviews için
 * optimize edilmiş, Schema.org Question/Answer ve Speakable şeması içeren bileşen.
 */
export default function InstantAnswerCardSeo({
  question = 'Site ve Apartman Yönetiminde Aidat Nasıl Belirlenir?',
  shortAnswer = 'Site aidatları, Kat Mülkiyeti Kanunu (KMK) Madde 37 uyarınca yöneticinin hazırladığı ve kat malikleri genel kurulunca onaylanan yıllık "İşletme Projesi" bütçesine göre belirlenir. Toplam yıllık tahmini masraflar, bağımsız bölümlerin arsa payı veya eşit paylaşım kuralına göre bölünerek aylık aidat miktarı kesinleşir.',
  bulletPoints = [
    'KMK Madde 20 uyarınca kapıcı, güvenlik ve temizlik giderleri kural olarak eşit dağıtılır.',
    'Ortak tesislerin (havuz, asansör, jeneratör) bakım ve yenileme masrafları arsa payı oranında paylaştırılır.',
    'Genel kurulda kabul edilen işletme projesi tüm kat maliklerine taahhütlü mektupla tebliğ edilir.',
    '7 gün içinde itiraz edilmeyen işletme projesi kesinleşir ve icra takip kabiliyeti kazanır.'
  ],
  lawArticle = '634 Sayılı KMK Madde 20 & Madde 37',
  verifiedBy = 'Alo Yönetim Hukuk & Operasyon Denetim Kurulu',
  lastUpdated = '2026',
  category = 'KMK & Aidat Mevzuatı'
}: InstantAnswerCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${question}\n\n${shortAnswer}\n\nÖzet Maddeler:\n${bulletPoints.map(b => `• ${b}`).join('\n')}\n\nKaynak: Alo Yönetim (${lawArticle})`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: question,
    text: question,
    answerCount: 1,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${shortAnswer} ${bulletPoints.join(' ')}`,
      author: {
        '@type': 'Organization',
        name: 'Alo Yönetim'
      },
      datePublished: '2026-01-01',
      dateModified: new Date().toISOString()
    }
  };

  return (
    <div className="my-10 bg-[var(--color-surface)] text-[var(--color-primary)] p-8 md:p-10 rounded-[2.5rem] border border-[var(--color-outline)]/80 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="px-3.5 py-1.5 bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400">stars</span>
            Google 0. Sıra Doğrudan Cevap
          </span>
          <span className="px-3 py-1 bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)] rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-1.5 bg-[var(--color-surface-variant)] hover:border-slate-400 border border-[var(--color-outline)] rounded-xl text-xs font-semibold text-[var(--color-primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Cevabı ve mevzuat maddesini kopyala"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span>{copied ? 'Kopyalandı!' : 'Özeti Kopyala'}</span>
        </button>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-extrabold text-[var(--color-primary)] mb-4 leading-snug relative z-10 flex items-start gap-3">
        <span className="text-slate-400 font-serif text-2xl md:text-3xl leading-none select-none">Q:</span>
        <span>{question}</span>
      </h3>

      {/* Direct Featured Snippet Paragraph */}
      <div className="bg-[var(--color-surface-variant)] border-l-4 border-slate-900 dark:border-white p-5 rounded-r-2xl mb-6 relative z-10">
        <p className="text-sm md:text-base text-[var(--color-primary)] leading-relaxed font-normal">
          {shortAnswer}
        </p>
      </div>

      {/* Bullet Points */}
      {bulletPoints && bulletPoints.length > 0 && (
        <div className="space-y-2.5 mb-6 relative z-10">
          <h4 className="text-xs font-bold uppercase text-[var(--color-secondary)] tracking-wider">
            Temel Yasal ve Uygulama Esasları:
          </h4>
          <ul className="space-y-2">
            {bulletPoints.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--color-secondary)]">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trust Footer */}
      <div className="pt-4 border-t border-[var(--color-outline)]/40 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-secondary)] relative z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400">gavel</span>
          <span>Mevzuat Dayanağı: <strong className="text-[var(--color-primary)]">{lawArticle}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-slate-500">verified_user</span>
          <span>Doğrulayan: <span className="text-[var(--color-primary)] font-medium">{verifiedBy}</span> ({lastUpdated})</span>
        </div>
      </div>
    </div>
  );
}
