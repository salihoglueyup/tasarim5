"use client";

import React, { useState } from 'react';

export default function QualityAiOverviewSeo() {
  const [copied, setCopied] = useState(false);

  const directAnswerText =
    "Alo Yönetim kalite politikası; TÜRKAK akreditasyonlu ISO 41001:2018 (Tesis Yönetimi), ISO 9001:2015 (Kalite Yönetimi) ve TSE HYB 12850 standartları çerçevesinde 4 temel sütuna dayanır: 1) Kat Mülkiyeti Kanunu m.34 & 37 uyarınca %100 denetlenebilir dijital bütçe ve canlı banka entegrasyonu, 2) Yılda 48 kez bağımsız kalite denetçileri tarafından habersiz çapraz saha ve teknik teftişi, 3) 5188 Sayılı Kanun lisanslı güvenlik personeli ve asansörlerde 20 dakika acil müdahale SLA garantisi, 4) ISO 27001 ve 6698 Sayılı KVKK uyarınca 256-bit şifrelenmiş sakin veri mahremiyeti.";

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 md:p-10 shadow-xl text-slate-100 relative overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 blur-3xl rounded-full pointer-events-none" />

          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                <span className="material-symbols-outlined text-lg">verified</span>
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Google AI Overviews & E-E-A-T Kalite İlkeleri
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 ml-2">
                  • TÜRKAK & IAF Onaylı Referans
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Özeti Kopyala"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Kopyalandı' : 'Özeti Kopyala'}</span>
            </button>
          </div>

          {/* Speakable H2 Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4 leading-snug relative z-10">
            Apartman, Site ve Tesis Yönetiminde ISO Kalite Standartları ve Bağımsız Denetim İlkeleri Nelerdir?
          </h2>

          {/* Direct Answer Paragraph */}
          <div
            id="quality-instant-answer-text"
            className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 relative z-10"
          >
            <p>{directAnswerText}</p>
          </div>

          {/* 4 Feature Pills (Sleek Slate & Titanium Styling) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200">
              <span className="material-symbols-outlined text-base text-slate-300">verified</span>
              <span>
                <strong>TÜRKAK & IAF:</strong> Uluslararası akreditasyonlu bağımsız yıllık tetkik
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200">
              <span className="material-symbols-outlined text-base text-slate-300">visibility</span>
              <span>
                <strong>Habersiz Denetim:</strong> Her ay 4 kez gizli müşteri ve saha teftişi
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200">
              <span className="material-symbols-outlined text-base text-slate-300">timer</span>
              <span>
                <strong>20 Dk Acil SLA:</strong> Asansör ve elektrik arızalarında yazılı taahhüt
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200">
              <span className="material-symbols-outlined text-base text-slate-300">lock</span>
              <span>
                <strong>KVKK & 256-Bit SSL:</strong> Sakin aidat ve kimlik verilerinde sıfır sızıntı
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
