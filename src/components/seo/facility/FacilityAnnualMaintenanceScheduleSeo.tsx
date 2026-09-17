"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';
import {
  FACILITY_ANNUAL_MAINTENANCE_SCHEDULE,
  MAINTENANCE_CATEGORIES,
  MaintenanceCategory,
} from '@/data/facilityAnnualMaintenanceScheduleData';

type QuarterFilter = 'Tümü' | 'Q1' | 'Q2' | 'Q3' | 'Q4';

export default function FacilityAnnualMaintenanceScheduleSeo() {
  const [selectedQuarter, setSelectedQuarter] = useState<QuarterFilter>('Tümü');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedMonth, setSelectedMonth] = useState<number | 'Tümü'>('Tümü');
  const [copied, setCopied] = useState(false);

  const months = [
    { num: 1, name: 'Ocak', quarter: 'Q1' },
    { num: 2, name: 'Şubat', quarter: 'Q1' },
    { num: 3, name: 'Mart', quarter: 'Q1' },
    { num: 4, name: 'Nisan', quarter: 'Q2' },
    { num: 5, name: 'Mayıs', quarter: 'Q2' },
    { num: 6, name: 'Haziran', quarter: 'Q2' },
    { num: 7, name: 'Temmuz', quarter: 'Q3' },
    { num: 8, name: 'Ağustos', quarter: 'Q3' },
    { num: 9, name: 'Eylül', quarter: 'Q3' },
    { num: 10, name: 'Ekim', quarter: 'Q4' },
    { num: 11, name: 'Kasım', quarter: 'Q4' },
    { num: 12, name: 'Aralık', quarter: 'Q4' },
  ];

  const filteredItems = useMemo(() => {
    return FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.filter((item) => {
      if (selectedQuarter !== 'Tümü' && item.quarter !== selectedQuarter) return false;
      if (selectedMonth !== 'Tümü' && item.month !== selectedMonth) return false;
      if (selectedCategory !== 'Tümü' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedQuarter, selectedMonth, selectedCategory]);

  const handleCopySchedule = () => {
    const text = filteredItems
      .map(
        (i) =>
          `[${i.monthName} - ${i.quarter}] ${i.title} (${i.category})\nStandart: ${i.standardOrRegulation}\nRisk: ${i.legalRiskIfNotDone}\nAlo Yönetim Güvencesi: ${i.aloYonetimGuarantee}\n`
      )
      .join('\n---\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Schema.org Schedule & TechArticle
  const schemaSchedule = {
    '@context': 'https://schema.org',
    '@type': 'Schedule',
    '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#yillik-bakim-takvimi`,
    name: 'ISO 41001 & Tesis Yönetimi 12 Aylık Periyodik Bakım ve Denetim Takvimi',
    description:
      'Siteler, plazalar ve rezidanslar için asansör yeşil etiket muayenesi, yangın pompa testleri, su deposu dezenfeksiyonu ve genel kurul takvimini içeren 12 aylık periyodik bakım kılavuzu.',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi#yillik-bakim-takvimi`,
    eventSchedule: FACILITY_ANNUAL_MAINTENANCE_SCHEDULE.map((item) => ({
      '@type': 'Schedule',
      name: `${item.monthName}: ${item.title}`,
      description: item.legalRiskIfNotDone,
      frequency: item.frequency,
    })),
  };

  return (
    <section
      id="yillik-bakim-takvimi"
      aria-label="ISO 41001 & Tesis Yönetimi 12 Aylık Periyodik Bakım ve Denetim Takvimi"
      className="my-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSchedule) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">calendar_month</span>
            <span>ISO 41001 Entegre Tesis Takvimi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            12 Aylık Periyodik Bakım, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Muayene ve Yasal Denetim Takvimi</span>
          </h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            Asansör A tipi muayenelerinden yangın hidrofor testlerine, su deposu analizlerinden trafo kompanzasyonuna kadar tesisinizi 365 gün yasal risklerden ve arıza maliyetlerinden koruyan kurumsal takvim.
          </p>
        </div>

        {/* Copy Schedule Button */}
        <button
          onClick={handleCopySchedule}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-900/20 transition flex-shrink-0"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {copied ? 'check_circle' : 'content_copy'}
          </span>
          <span>{copied ? 'Takvim Kopyalandı!' : 'Takvim Özetini Kopyala'}</span>
        </button>
      </div>

      {/* Filter Tabs (Quarters and Categories) */}
      <div className="space-y-4 mb-8">
        {/* Quarter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2">Dönem (Çeyrek):</span>
          {(['Tümü', 'Q1', 'Q2', 'Q3', 'Q4'] as QuarterFilter[]).map((q) => (
            <button
              key={q}
              onClick={() => {
                setSelectedQuarter(q);
                setSelectedMonth('Tümü');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedQuarter === q
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {q === 'Tümü' ? 'Tüm Yıl' : `${q} Çeyreği`}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 mr-2">Disiplin:</span>
          {['Tümü', ...MAINTENANCE_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Month Selector Pills */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-800/40 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedMonth('Tümü')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              selectedMonth === 'Tümü'
                ? 'bg-slate-700 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tüm Aylar
          </button>
          {months.map((m) => {
            const isQuarterMatch = selectedQuarter === 'Tümü' || m.quarter === selectedQuarter;
            if (!isQuarterMatch) return null;

            return (
              <button
                key={m.num}
                onClick={() => setSelectedMonth(m.num)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  selectedMonth === m.num
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
        <span>
          Listelenen <strong className="text-white">{filteredItems.length}</strong> periyodik bakım & denetim faaliyeti
        </span>
        <span className="hidden sm:inline">ISO 41001 & TS Standartları Uyumlu</span>
      </div>

      {/* Schedule Items Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800/50 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition group"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                    {item.monthName} ({item.quarter})
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-700/60 text-slate-300">
                    {item.category}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60">
                  {item.frequency}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                {item.title}
              </h3>

              {/* Standard */}
              <div className="mt-2 text-xs text-slate-400 font-mono">
                <span className="text-slate-500">Mevzuat:</span> {item.standardOrRegulation}
              </div>

              {/* Steps */}
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                {item.executionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[14px] text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden="true">
                      check_circle
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk & Alo Guarantee */}
            <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                <strong className="block text-[11px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">
                  ⚠️ Yapılmazsa Doğacak Risk:
                </strong>
                <span>{item.legalRiskIfNotDone}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <strong className="block text-[11px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
                  🛡️ Alo Yönetim Güvencesi:
                </strong>
                <span>{item.aloYonetimGuarantee}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-emerald-400" aria-hidden="true">
            assignment_turned_in
          </span>
          <div>
            <span className="font-bold text-white text-sm block">Tesisiniz İçin Özel Bakım Takvimi ve Maliyet Simülasyonu</span>
            <span>Mevcut tesisatınızın periyodik muayene durumunu uzman mühendislerimize ücretsiz inceletin.</span>
          </div>
        </div>
        <a
          href="/iletisim"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition flex-shrink-0"
        >
          <span>Ücretsiz Teknik Keşif İste</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
