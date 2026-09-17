"use client";

import React from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { getDistrictCourthouseProfile } from '@/data/districtCourthouseMediationData';

export interface DistrictCourthouseMediationSeoProps {
  districtSlug: string;
  districtName: string;
}

export default function DistrictCourthouseMediationSeo({
  districtSlug,
  districtName,
}: DistrictCourthouseMediationSeoProps) {
  const profile = getDistrictCourthouseProfile(districtSlug);

  // Schema.org LegalService / GovernmentBuilding for Judicial District Authority
  const schemaCourthouse = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${BASE_URL}/bolgeler/${districtSlug}#courthouse-mediation`,
    name: `${districtName} Sulh Hukuk Adliyesi & Zorunlu Arabuluculuk Rehberi`,
    description: profile.mandatoryMediationNote,
    url: `${BASE_URL}/bolgeler/${districtSlug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile.courthouseAddress,
      addressLocality: districtName,
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    telephone: profile.courthousePhone,
    areaServed: districtName,
  };

  return (
    <section
      aria-label={`${districtName} Adliye Yetki Alanı ve Zorunlu Arabuluculuk Rehberi`}
      className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden my-8"
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCourthouse) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">balance</span>
            <span>7445 Sayılı Kanun Zorunlu Arabuluculuk Rehberi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            {districtName} Yetkili Sulh Hukuk Mahkemesi ve Arabuluculuk Bürosu
          </h2>
          <p className="text-slate-400 mt-2 text-xs sm:text-sm font-normal max-w-2xl leading-relaxed">
            1 Eylül 2023 itibarıyla tüm site aidat itirazları, kat malikleri kurulu kararı iptalleri ve tahliye davalarında dava açmadan önce adliye arabuluculuk bürosuna başvuru yasal dava şartıdır.
          </p>
        </div>

        <div className="shrink-0 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <span className="text-slate-400 block mb-1">Yetkili Adalet Sarayı:</span>
          <span className="text-white font-bold block">{profile.courthouseName}</span>
          <span className="text-slate-400 text-[11px] mt-1 block">Tel: {profile.courthousePhone}</span>
        </div>
      </div>

      {/* 2-Column Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Adliye ve Arabuluculuk Detayı */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <span className="material-symbols-outlined text-blue-400 text-lg" aria-hidden="true">account_balance</span>
            <span>Adliye ve Büronun Konumu</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
            <p><strong className="text-slate-200">Adres:</strong> {profile.courthouseAddress}</p>
            <p><strong className="text-slate-200">Büro:</strong> {profile.mediationBureauName}</p>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-800 leading-relaxed">
            {profile.mandatoryMediationNote}
          </p>
        </div>

        {/* Arabuluculuk Dosyası İçin Gerekli Evraklar */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <span className="material-symbols-outlined text-emerald-400 text-lg" aria-hidden="true">folder</span>
            <span>Başvuruda Hazır Bulundurulması Gereken Evraklar</span>
          </div>
          <ul className="space-y-2">
            {profile.requiredDocumentsForMediation.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                <span className="material-symbols-outlined text-emerald-400 text-sm shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alo Yönetim Hukuk Desteği Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/30 border border-blue-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-400 text-2xl shrink-0 mt-0.5" aria-hidden="true">gavel</span>
          <div>
            <span className="text-xs font-bold text-blue-300 block">Alo Yönetim Bölgesel Hukuk ve Arabuluculuk Masası:</span>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
              {profile.aloYonetimLegalSupport}
            </p>
          </div>
        </div>

        <Link
          href="/teklif-al"
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors"
        >
          Hukuki Danışmanlık Alın →
        </Link>
      </div>
    </section>
  );
}
