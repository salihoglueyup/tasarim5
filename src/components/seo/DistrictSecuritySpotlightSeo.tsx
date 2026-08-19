"use client";

import React from 'react';
import Link from 'next/link';

interface DistrictSecuritySpotlightSeoProps {
  districtName: string;
  districtSlug: string;
  managedProjects: number;
  className?: string;
}

export default function DistrictSecuritySpotlightSeo({
  districtName,
  districtSlug,
  managedProjects,
  className = ""
}: DistrictSecuritySpotlightSeoProps) {
  return (
    <div className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 md:p-12 border border-slate-800 shadow-2xl ${className}`}>
      {/* Arka plan dekoratif desen */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider w-fit">
            <span className="material-symbols-outlined text-sm">security</span>
            5188 Kanun Uyumu · {districtName} Güvenlik Masası
          </div>

          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            {districtName}&apos;de 5188 Sayılı Kanun Kapsamında Profesyonel Site Güvenliği
          </h3>

          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
            {districtName} genelindeki <strong>{managedProjects}+ projede</strong> T.C. İçişleri Bakanlığı ve İstanbul Valiliği onaylı 5188 lisanslı özel güvenlik personeli, yapay zeka destekli PTS kamera ve 7/24 devriye sistemleri ile sıfır güvenlik açığı sağlıyoruz.
          </p>

          {/* 3 Temel Güvence Rozeti */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 text-xs">
              <span className="material-symbols-outlined text-blue-400 text-lg">verified_user</span>
              <span className="font-medium text-gray-200">Valilik 5188 İzin Danışmanlığı</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 text-xs">
              <span className="material-symbols-outlined text-emerald-400 text-lg">videocam</span>
              <span className="font-medium text-gray-200">AI PTS & Çevre CCTV</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 text-xs">
              <span className="material-symbols-outlined text-cyan-400 text-lg">shield_with_house</span>
              <span className="font-medium text-gray-200">Zorunlu Mali Sorumluluk Sigortası</span>
            </div>
          </div>
        </div>

        {/* Aksiyon Kutusu */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <Link
            href={`/bolgeler/${districtSlug}/guvenlik-yonetimi`}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-lg text-center"
          >
            <span>{districtName} Özel Güvenlik Sayfası</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
          <Link
            href={`/teklif-al?hizmet=guvenlik&bolge=${encodeURIComponent(districtName)}`}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm text-center"
          >
            <span>Ücretsiz Keşif Talep Et</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
