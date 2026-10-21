"use client";

import React, { useState } from 'react';
import Icon from '@/components/ui/branding/Icon';

export interface ArticleAiOverviewCardProps {
  title: string;
  tldr: string;
  authorName?: string;
  category?: string;
  slug: string;
  lang?: string;
  extraFaqs?: { question: string; answer: string }[];
  className?: string;
}

const UI_COPY: Record<
  string,
  {
    badge: string;
    verified: string;
    questionSuffix: string;
    copyTitle: string;
    copyAria: string;
    reviewLabel: string;
    legalLabel: string;
    legalValue: string;
    askAiLabel: string;
    chatGptQuerySuffix: string;
    claudeQuerySuffix: string;
  }
> = {
  tr: {
    badge: 'Google AI Overviews & TL;DR Doğrulanmış Özet',
    verified: 'Doğrulanmış Bilgi',
    questionSuffix: '— Google AI Hızlı Özeti ve Yasal Dayanağı',
    copyTitle: 'Özeti Kopyala',
    copyAria: 'Doğrudan yanıtı panoya kopyala',
    reviewLabel: 'Uzman İncelemesi:',
    legalLabel: 'Mevzuat Dayanağı:',
    legalValue: '634 KMK, 7579 S.K. (2026) & 5188 S.K.',
    askAiLabel: 'Bu konuyu doğrudan yapay zekaya sorun:',
    chatGptQuerySuffix: 'hakkında 634 sayılı Kat Mülkiyeti Kanunu ve 7579 sayılı Kanun ne diyor?',
    claudeQuerySuffix: 'alo yonetim kmk 634 ve 7579 sayılı kanun özeti',
  },
  en: {
    badge: 'Google AI Overviews & Verified TL;DR Summary',
    verified: 'Verified Fact',
    questionSuffix: '— Google AI Quick Summary & Legal Basis',
    copyTitle: 'Copy Summary',
    copyAria: 'Copy direct answer to clipboard',
    reviewLabel: 'Expert Review:',
    legalLabel: 'Legal Basis:',
    legalValue: 'Law No. 634 (KMK), Law No. 7579 (2026) & Law No. 5188',
    askAiLabel: 'Ask AI directly about this topic:',
    chatGptQuerySuffix: 'under Turkish Condominium Law No. 634 and Law No. 7579',
    claudeQuerySuffix: 'Alo Yonetim Turkish condominium law summary',
  },
  ru: {
    badge: 'Google AI Overviews • Проверенный обзор (TL;DR)',
    verified: 'Проверено',
    questionSuffix: '— Краткий обзор ИИ и правовая основа',
    copyTitle: 'Скопировать обзор',
    copyAria: 'Скопировать прямой ответ в буфер обмена',
    reviewLabel: 'Экспертная проверка:',
    legalLabel: 'Правовая база:',
    legalValue: 'Закон № 634 (KMK), Закон № 7579 (2026) и Закон № 5188',
    askAiLabel: 'Задайте вопрос ИИ по этой теме:',
    chatGptQuerySuffix: 'согласно Закону о кондоминиумах № 634 и Закону № 7579',
    claudeQuerySuffix: 'Alo Yonetim управление жилыми комплексами в Стамбуле',
  },
  ar: {
    badge: 'Google AI Overviews • ملخص موثق (TL;DR)',
    verified: 'معلومة موثقة',
    questionSuffix: '— ملخص الذكاء الاصطناعي والسند القانوني',
    copyTitle: 'نسخ الملخص',
    copyAria: 'نسخ الإجابة المباشرة إلى الحافظة',
    reviewLabel: 'مراجعة الخبراء:',
    legalLabel: 'السند القانوني:',
    legalValue: 'قانون الملكية الطابقية 634 والقانون 7579 (2026) والقانون 5188',
    askAiLabel: 'اسأل الذكاء الاصطناعي مباشرة عن هذا الموضوع:',
    chatGptQuerySuffix: 'وفق قانون الملكية الطابقية رقم 634 والقانون رقم 7579',
    claudeQuerySuffix: 'Alo Yonetim إدارة المجمعات والمرافق في إسطنبول',
  },
};

export default function ArticleAiOverviewCard({
  title,
  tldr,
  authorName = 'Alo Yönetim Hukuk ve Operasyon Masası',
  category = 'Tesis & Kat Mülkiyeti Hukuku',
  lang = 'tr',
  extraFaqs = [],
  className = '',
}: ArticleAiOverviewCardProps) {
  const [copied, setCopied] = useState(false);
  const copy = UI_COPY[lang] || UI_COPY.tr;

  const cleanAnswer = tldr.trim();
  const question = `${title} ${copy.questionSuffix}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Tek birleşik FAQPage JSON-LD: Ana TL;DR sorusu + makale içi çıkarılan SSS çiftleri
  const seenQuestions = new Set<string>([title.trim().toLowerCase()]);
  const mergedEntities = [
    {
      '@type': 'Question',
      name: title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: cleanAnswer,
      },
    },
    ...extraFaqs
      .filter((f) => {
        const key = f.question.trim().toLowerCase();
        if (!key || seenQuestions.has(key)) return false;
        seenQuestions.add(key);
        return true;
      })
      .map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mergedEntities,
  };

  return (
    <section
      id="article-ai-overview"
      aria-label={`${title} — ${copy.badge}`}
      className={`bg-[var(--color-surface)] dark:bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden my-6 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Brand Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-slate-500/5 via-slate-400/5 to-transparent dark:from-slate-400/5 dark:via-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Icon name="auto_awesome" className="text-[15px] text-slate-500 dark:text-slate-400" />
          <span>{copy.badge}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10">
            {category}
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 flex items-center gap-1">
            <Icon name="verified" className="text-xs text-emerald-600 dark:text-emerald-400" />
            {copy.verified}
          </span>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-3 relative z-10 tracking-tight">
        {question}
      </h3>

      {/* Answer Box */}
      <div className="bg-slate-50/80 dark:bg-[#111218] border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 mb-5 relative z-10 space-y-3 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <p
            id="article-instant-answer-text"
            className="tldr text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal"
          >
            {cleanAnswer}
          </p>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-white/10 shadow-xs cursor-pointer flex items-center justify-center"
            title={copy.copyTitle}
            aria-label={copy.copyAria}
          >
            <Icon name={copied ? 'check' : 'content_copy'} className="text-lg" />
          </button>
        </div>

        {/* Operational / Legal Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Icon name="check_circle" className="text-emerald-600 dark:text-emerald-400 text-base shrink-0" />
            <span>
              <strong>{copy.reviewLabel}</strong> {authorName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check_circle" className="text-emerald-600 dark:text-emerald-400 text-base shrink-0" />
            <span>
              <strong>{copy.legalLabel}</strong> {copy.legalValue}
            </span>
          </div>
        </div>
      </div>

      {/* AI Live Inquiries */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs relative z-10 pt-1">
        <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
          <Icon name="smart_toy" className="text-base text-slate-400" />
          <span>{copy.askAiLabel}</span>
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`https://chatgpt.com/?q=${encodeURIComponent(`${title} ${copy.chatGptQuerySuffix}`)}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Icon name="open_in_new" className="text-xs" />
            ChatGPT
          </a>
          <a
            href={`https://claude.ai/new?q=${encodeURIComponent(`${title} ${copy.claudeQuerySuffix}`)}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-3.5 py-1.5 rounded-xl bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Icon name="travel_explore" className="text-xs" />
            Claude
          </a>
        </div>
      </div>
    </section>
  );
}
