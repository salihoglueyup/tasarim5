"use client";

import React, { useState } from 'react';

export default function GesAiOverviewSeo() {
  const [copied, setCopied] = useState(false);

  const overviewText =
    "634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 42 uyarınca, ortak alanların faydalı yenilik ve ilaveleri kapsamında sitelerin çatısına güneş enerjisi santrali (GES) kurulabilmesi için kat malikleri kurulunun sayı ve arsa payı çoğunluğuyla karar alması yasal olarak yeterlidir (oy birliği aranmaz). EPDK Elektrik Piyasasında Lisanssız Elektrik Üretim Yönetmeliği Madde 5/1-ç kapsamında kurulan on-grid sistemlerde dağıtım şirketi (BEDAŞ, AYEDAŞ vb.) tarafından çift yönlü sayaç takılır. Gündüz üretilen güneş enerjisi doğrudan asansör, hidrofor ve ortak aydınlatmalarda bedava tüketilir; tüketimden arta kalan fazla elektrik ise şebekeye verilerek aylık mahsuplaşma ile site banka hesabına nakit aktarılır veya sonraki ayların elektrik faturalarından düşülür.";

  const handleCopy = () => {
    navigator.clipboard.writeText(overviewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      aria-label="Google AI Overviews ve GES Mevzuat Otoritesi"
      className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/40 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-800/80 p-6 sm:p-8 md:p-10 shadow-lg shadow-amber-500/5 backdrop-blur-xl relative overflow-hidden"
    >
      {/* Decorative gradient flare */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wide uppercase">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            psychology
          </span>
          <span>Google AI Overviews & Çatı GES Hukuki Standartları</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            634 KMK m.42
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400">
            EPDK 5/1-ç Uyumlu
          </span>
        </div>
      </div>

      {/* Question Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 flex items-start gap-3">
        <span
          className="material-symbols-outlined text-amber-500 dark:text-amber-400 text-2xl sm:text-3xl shrink-0 mt-0.5"
          aria-hidden="true"
        >
          wb_sunny
        </span>
        <span>
          Apartman ve Sitelerde Çatı GES Kurulumu İçin Kat Malikleri Kurulu Kararı Nasıl Alınır ve Mahsuplaşma Nasıl Çalışır?
        </span>
      </h2>

      {/* Core Grounded Overview Text */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6 shadow-xs font-normal">
        <p>{overviewText}</p>
      </div>

      {/* 4 Competency Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white mb-1.5">
            <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400">
              gavel
            </span>
            <span>%100 Yasal Çoğunluk</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            634 KMK m.42 uyarınca sayı ve arsa payı çoğunluğu yeterlidir, tek bir malik projeyi engelleyemez.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white mb-1.5">
            <span className="material-symbols-outlined text-base text-amber-600 dark:text-amber-400">
              sync_alt
            </span>
            <span>Çift Yönlü Mahsuplaşma</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Fazla elektrik dağıtım şirketine satılarak her ay site banka hesabına nakit ödenir veya mahsup edilir.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white mb-1.5">
            <span className="material-symbols-outlined text-base text-blue-600 dark:text-blue-400">
              verified
            </span>
            <span>Tier-1 Panel & Sızdırmazlık</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Statik membran sızdırmaz montaj sistemi ve 25 yıl lineer güç garantili monokristal solar paneller.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white mb-1.5">
            <span className="material-symbols-outlined text-base text-purple-600 dark:text-purple-400">
              ev_station
            </span>
            <span>EV Şarj Entegrasyonu</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Güneş elektriği kapalı otoparktaki araç şarj istasyonlarına aktarılarak sakinlere %40 indirim sağlar.
          </p>
        </div>
      </div>

      {/* Footer Citation & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-amber-500">menu_book</span>
          <span>
            Yasal Dayanak: 634 Sayılı Kat Mülkiyeti Kanunu m.42, EPDK Lisanssız Elektrik Üretim Yönetmeliği m.5/1-ç
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Kopyalandı' : 'Özeti Kopyala'}</span>
          </button>

          <a
            href="https://www.perplexity.ai/search?q=Sitelerde+%C3%A7at%C4%B1+GES+kurulumu+kat+m%C3%BClkiyeti+kanunu+maddesi+ve+EPDK+mahsupla%C5%9Fma+%C5%9Fartlar%C4%B1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
