"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

interface MevzuatReferenceSeoProps {
  kanunAdi: string; // Örn: "634 Sayılı Kat Mülkiyeti Kanunu"
  maddeNo: string; // Örn: "Madde 20"
  maddeBasligi?: string; // Örn: "Genel Giderlere Katılma ve Aidat Yükümlülüğü"
  orijinalMetin: string; // Kanun metninin aslı
  uzmanYorumu?: string; // Alo Yönetim Hukuk Danışmanlığı yorumu
  resmiGazeteNo?: string;
  className?: string;
}

/**
 * KMK & Hukuki Mevzuat Doğrulama Kartı (MevzuatReferenceSeo)
 * 
 * Hukuk, aidat icra ve güvenlik sayfalarında mevzuat maddelerini kaynak gösterir.
 * Google ve AI arama motorlarına (Perplexity, ChatGPT) `Legislation` şeması basarak
 * şirketin hukuki uzmanlık ve otorite (E-E-A-T) puanını maksimize eder.
 */
export default function MevzuatReferenceSeo({
  kanunAdi = "634 Sayılı Kat Mülkiyeti Kanunu",
  maddeNo = "Madde 20",
  maddeBasligi = "Genel Giderlere Katılma",
  orijinalMetin,
  uzmanYorumu,
  resmiGazeteNo = "12038",
  className = ""
}: MevzuatReferenceSeoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${kanunAdi} - ${maddeNo}\n"${orijinalMetin}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Legislation',
    name: `${kanunAdi} — ${maddeNo}: ${maddeBasligi}`,
    legislationType: 'Kanun Maddesi',
    legislationIdentifier: maddeNo,
    description: orijinalMetin,
    legislationPassedBy: {
      '@type': 'GovernmentOrganization',
      name: 'Türkiye Büyük Millet Meclisi'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim Hukuk & Danışmanlık',
      url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/90 dark:bg-zinc-900/90 border border-amber-500/20 dark:border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden my-8 ${className}`}
      >
        {/* Arka Plan Hukuk Terazisi İkonu */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none z-0">
          <span className="material-symbols-outlined" style={{ fontSize: '12rem' }} aria-hidden="true">
            gavel
          </span>
        </div>

        <div className="relative z-10">
          {/* Üst Başlık & Etiketler */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-lg" aria-hidden="true">policy</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Resmi Mevzuat Referansı
                </span>
                <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                  {kanunAdi} — <span className="text-amber-600 dark:text-amber-400">{maddeNo}</span>
                </h4>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-200 dark:border-white/10 transition-colors shadow-sm"
              title="Kanun metnini kopyala"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Kopyalandı!' : 'Metni Kopyala'}</span>
            </button>
          </div>

          {/* Orijinal Kanun Metni */}
          <div className="bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl p-4 md:p-5 my-4">
            {maddeBasligi && (
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-2">
                {maddeBasligi}
              </div>
            )}
            <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 italic font-serif leading-relaxed">
              "{orijinalMetin}"
            </blockquote>
          </div>

          {/* Uzman Hukuki Yorumu */}
          {uzmanYorumu && (
            <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-start gap-3">
              <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-lg shrink-0 mt-0.5" aria-hidden="true">
                verified
              </span>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                <strong className="font-semibold text-slate-900 dark:text-white">Alo Yönetim Hukuk Danışmanlığı Değerlendirmesi: </strong>
                {uzmanYorumu}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
