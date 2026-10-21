"use client";

import React, { useState } from 'react';
import Icon from '@/components/ui/branding/Icon';

export interface BlogAiTakeawaysProps {
  title: string;
  takeaways?: string[];
  slug: string;
  category?: string;
  className?: string;
  lang?: string;
}

const TAKEAWAY_COPY: Record<
  string,
  {
    badge: string;
    copyBtn: string;
    copiedBtn: string;
    heading: string;
    itemPrefix: string;
  }
> = {
  tr: {
    badge: 'Google AI & Gemini • Önemli Çıkarımlar (Key Takeaways)',
    copyBtn: 'Maddeleri Kopyala',
    copiedBtn: 'Kopyalandı',
    heading: 'Bu Yazıdan Bilmeniz Gereken 4 Temel Hukuki ve Operasyonel Not',
    itemPrefix: 'Hukuki & Operasyonel Çıkarım',
  },
  en: {
    badge: 'Google AI & Gemini • Key Takeaways',
    copyBtn: 'Copy Takeaways',
    copiedBtn: 'Copied',
    heading: '4 Key Legal & Operational Takeaways from This Guide',
    itemPrefix: 'Key Takeaway',
  },
  ru: {
    badge: 'Google AI & Gemini • Ключевые выводы (Key Takeaways)',
    copyBtn: 'Скопировать пункты',
    copiedBtn: 'Скопировано',
    heading: '4 ключевых правовых и практических вывода из этой статьи',
    itemPrefix: 'Ключевой вывод',
  },
  ar: {
    badge: 'Google AI & Gemini • أهم النقاط المستخلصة (Key Takeaways)',
    copyBtn: 'نسخ النقاط',
    copiedBtn: 'تم النسخ',
    heading: '4 نقاط قانونية وتشغيلية أساسية من هذا الدليل',
    itemPrefix: 'نقطة أساسية',
  },
};

export default function BlogAiTakeawaysSeo({
  title,
  takeaways,
  className = '',
  lang = 'tr',
}: BlogAiTakeawaysProps) {
  const [copied, setCopied] = useState(false);
  const copy = TAKEAWAY_COPY[lang] || TAKEAWAY_COPY.tr;

  const defaultTakeaways = [
    '634 Sayılı Kat Mülkiyeti Kanunu ve 7579 sayılı Kanun (2026) çerçevesinde kat malikleri kurulu kararları ve işletme projesi süreçleri yasal güvence altındadır.',
    'Bütçe ve aidat hesaplamalarında işletme projesinin kat malikleri kurulunda onaylanması (veya en çok 3 aylık geçici proje sınırına uyulması) icra takibinde temel dayanaktır.',
    'Ortak teknik alanlar, 5188 lisanslı güvenlik ve asansör periyodik yeşil etiket denetimleri yasal zorunluluktur.',
    'Kalem kalem şeffaf raporlama ve planlı önleyici bakım sayesinde işletme giderlerinde öngörülebilirlik sağlanır.',
  ];

  const items = takeaways && takeaways.length > 0 ? takeaways : defaultTakeaways;

  const handleCopy = () => {
    navigator.clipboard.writeText(items.map((it, i) => `${i + 1}. ${it}`).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${title} — ${copy.badge}`,
    description: copy.heading,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${copy.itemPrefix} ${idx + 1}`,
      description: item,
    })),
  };

  return (
    <aside
      id="blog-ai-takeaways"
      aria-label={copy.badge}
      className={`bg-[var(--color-surface)] dark:bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 my-6 relative overflow-hidden shadow-xs ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Brand Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 dark:bg-slate-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Icon name="auto_awesome" className="text-[15px] text-slate-500 dark:text-slate-400" />
          <span>{copy.badge}</span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-colors shadow-xs cursor-pointer"
        >
          <Icon name={copied ? 'done' : 'content_copy'} className="text-sm text-slate-500 dark:text-slate-400" />
          <span>{copied ? copy.copiedBtn : copy.copyBtn}</span>
        </button>
      </div>

      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 relative z-10">
        {copy.heading}
      </h3>

      <div id="blog-ai-takeaway-text" className="space-y-2.5 relative z-10">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-slate-50/70 dark:bg-white/[0.02] p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 shadow-xs">
              {index + 1}
            </span>
            <p className="pt-0.5">{item}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
