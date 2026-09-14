"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import { getDistrictEmergencyProfile } from '@/data/districtEmergencyPreparednessData';

export interface DistrictEmergencyPreparednessSeoProps {
  districtSlug: string;
  districtName: string;
}

export default function DistrictEmergencyPreparednessSeo({
  districtSlug,
  districtName,
}: DistrictEmergencyPreparednessSeoProps) {
  const profile = getDistrictEmergencyProfile(districtSlug);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const toggleCheck = (idx: number) => {
    setCheckedList((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Schema.org EmergencyService Linked Data
  const schemaEmergency = {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    '@id': `${BASE_URL}/bolgeler/${districtSlug}#emergency-preparedness`,
    name: `${districtName} Deprem, Yangın ve Afet Acil Durum Eylem Planı`,
    description: `${districtName} ilçesindeki siteler ve rezidanslar için zemin yapısı, AFAD toplanma alanları, itfaiye lojistiği ve Alo Yönetim acil afet protokolü.`,
    url: `${BASE_URL}/bolgeler/${districtSlug}#emergency-preparedness`,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${districtName}, İstanbul`,
    },
    provider: {
      '@type': 'Organization',
      name: 'Alo Yönetim Tesis & Site Yönetimi',
      url: BASE_URL,
      telephone: '+90 (216) 000 00 00',
    },
  };

  return (
    <section
      id="emergency-preparedness"
      aria-label={`${districtName} Deprem, Yangın ve Afet Acil Durum Eylem Planı`}
      className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden my-8"
    >
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaEmergency) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">emergency</span>
            <span>Afet & Yangın Güvenliği Rehberi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            {districtName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-orange-400">Deprem, Yangın & Afet Eylem Protokolü</span>
          </h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm font-normal max-w-2xl leading-relaxed">
            {districtName} bölgesindeki site ve konutların zemin yapısı, AFAD acil toplanma alanları ve Alo Yönetim'in deprem anı otomatik sistem güvenlik standartları.
          </p>
        </div>

        {/* Risk Badge */}
        <div className="flex-shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-right">
            <span className="text-[11px] text-rose-300 block font-semibold uppercase tracking-wider">
              Bölgesel Sismik Kategori
            </span>
            <span className="text-sm sm:text-base font-extrabold text-rose-200">
              {profile.riskZone}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Card 1: Zemin & Yapı Stoku */}
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-base" aria-hidden="true">terrain</span>
              <span>Zemin & Yapı Dinamiği</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {profile.soilClassification}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs text-slate-400">
            <span className="text-slate-500">2000 Öncesi Yapı Oranı:</span>{' '}
            <strong className="text-amber-300 font-semibold">{profile.criticalBuildingAgeRatioPre2000}</strong>
          </div>
        </div>

        {/* Card 2: AFAD & İlk Müdahale */}
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-base" aria-hidden="true">local_hospital</span>
              <span>İtfaiye & Sağlık Lojistiği</span>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div>
                <span className="text-slate-500 text-xs block">Yetkili İtfaiye:</span>
                <strong className="text-white font-medium">{profile.localFireStation}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Afet Triyaj Hastanesi:</span>
                <strong className="text-white font-medium">{profile.emergencyFirstResponseCenter}</strong>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs text-slate-400">
            <span>AFAD Toplanma Alanı Sayısı:</span>{' '}
            <strong className="text-sky-300 font-semibold">{profile.afadAssemblyPointsCount} Nokta</strong>
          </div>
        </div>

        {/* Card 3: Önemli Toplanma Noktaları */}
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-base" aria-hidden="true">groups</span>
              <span>Ana Toplanma Meydanları</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {profile.primaryAssemblyAreas.map((area, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs text-slate-400">
            <span>Mevzuat: 3194 İmar & Sığınak Yön.</span>
          </div>
        </div>
      </div>

      {/* Alo Yönetim Protocol Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 mb-8">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-base" aria-hidden="true">security</span>
          <span>Alo Yönetim {districtName} Afet & Kriz Eylem Standardı</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {profile.aloYonetimDisasterPlanProtocol}
        </p>
        <div className="mt-3 text-xs text-slate-400 italic">
          <strong>Yasal Sığınak Standardı:</strong> {profile.mandatoryShelterStandard}
        </div>
      </div>

      {/* Interactive Site Safety Checklist */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/80 p-5">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-lg" aria-hidden="true">
              checklist_rtl
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {districtName} Siteleri İçin 4 Maddelik Kritik Afet Güvenliği Kontrol Listesi
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {checkedList.length} / {profile.checklistItems.length} Doğrulandı
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profile.checklistItems.map((item, idx) => {
            const isChecked = checkedList.includes(idx);

            return (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-lg mt-0.5 flex-shrink-0 ${
                    isChecked ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                  aria-hidden="true"
                >
                  {isChecked ? 'check_box' : 'check_box_outline_blank'}
                </span>
                <span className="leading-snug">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Emergency Link */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-rose-400" aria-hidden="true">phone_in_talk</span>
          <span>Acil Afet İhbar Hatları: AFAD 122 | İtfaiye 110 | Acil Çağrı 112</span>
        </div>
        <a
          href="/iletisim"
          className="text-rose-400 hover:text-rose-300 font-medium inline-flex items-center gap-1 transition"
        >
          <span>Sitenize Ücretsiz Yangın ve Afet Risk Raporu Talep Edin</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
        </a>
      </div>
    </section>
  );
}
