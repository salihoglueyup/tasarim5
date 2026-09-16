"use client";

import React, { useState } from 'react';

interface PositionZeroAnswerBoxProps {
  /** Soru başlığı — ör. "Tesis Yönetimi Nedir ve Neleri Kapsar?" */
  question: string;
  /** 40-50 kelimelik hap, kesin ve alıntılanabilir doğrudan tanım */
  answer: string;
  /** Yasal standart — ör. "ISO 41001:2018 & KMK 634" */
  standardBadge?: string;
  /** İkincil alt detay veya madde referansı */
  subText?: string;
  /** Vurgu rengi teması */
  accentColor?: 'indigo' | 'emerald' | 'blue' | 'cyan' | 'amber' | 'orange';
  className?: string;
  id?: string;
  answerId?: string;
}

export default function PositionZeroAnswerBox({
  question,
  answer,
  standardBadge = 'ISO 41001 & 634 Sayılı KMK',
  subText,
  accentColor = 'indigo',
  className = '',
  id,
  answerId,
}: PositionZeroAnswerBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const citation = `${question}\n${answer}\n(Kaynak: Alo Yönetim — ${standardBadge})`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const borderClass =
    accentColor === 'emerald'
      ? 'border-emerald-500/30'
      : accentColor === 'blue'
      ? 'border-blue-500/30'
      : accentColor === 'cyan'
      ? 'border-cyan-500/30'
      : accentColor === 'amber'
      ? 'border-amber-500/30'
      : accentColor === 'orange'
      ? 'border-orange-500/30'
      : 'border-indigo-500/30';

  const badgeBgClass =
    accentColor === 'emerald'
      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
      : accentColor === 'blue'
      ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
      : accentColor === 'cyan'
      ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20'
      : accentColor === 'amber'
      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
      : accentColor === 'orange'
      ? 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20'
      : 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20';

  const quoteBorder =
    accentColor === 'emerald'
      ? 'border-emerald-600 dark:border-emerald-400'
      : accentColor === 'blue'
      ? 'border-blue-600 dark:border-blue-400'
      : accentColor === 'cyan'
      ? 'border-cyan-600 dark:border-cyan-400'
      : accentColor === 'amber'
      ? 'border-amber-600 dark:border-amber-400'
      : accentColor === 'orange'
      ? 'border-orange-600 dark:border-orange-400'
      : 'border-indigo-600 dark:border-indigo-400';

  return (
    <div
      id={id}
      role="region"
      aria-label={question}
      className={`bg-[var(--color-surface)] border ${borderClass} rounded-[2rem] p-6 sm:p-8 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Header: Rozetler & Kopyalama */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeBgClass}`}>
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified</span>
            <span>Doğrudan Yanıt (Position Zero)</span>
          </span>
          <span className="text-xs font-mono text-[var(--color-secondary)] bg-[var(--color-surface-variant)] px-2.5 py-1 rounded-md border border-[var(--color-outline)]/60">
            {standardBadge}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--color-outline)]/80 hover:bg-[var(--color-surface-variant)]"
          title="Tanımı Alıntıla & Kopyala"
        >
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span>{copied ? 'Alıntılandı' : 'Alıntıla'}</span>
        </button>
      </div>

      {/* Soru / Başlık */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-primary)] tracking-tight mb-3">
        {question}
      </h2>

      {/* 40-50 Kelimelik Featured Snippet Bloğu */}
      <blockquote className={`border-l-4 ${quoteBorder} pl-4 sm:pl-5 py-2 my-3 bg-gradient-to-r from-slate-900/5 dark:from-white/5 to-transparent rounded-r-xl`}>
        <p id={answerId} className="text-sm sm:text-base text-[var(--color-primary)] leading-relaxed font-normal">
          {answer}
        </p>
      </blockquote>

      {subText && (
        <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light mt-3">
          {subText}
        </p>
      )}
    </div>
  );
}
