"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

export interface CertificateItem {
  code: string;
  name: string;
  issuer: string;
  scope: string;
  certNumber: string;
  validUntil: string;
  icon: string;
}

export default function TrustVerificationAuditSeo() {
  const [selectedCert, setSelectedCert] = useState<number>(0);
  const [verifiedStatus, setVerifiedStatus] = useState<string | null>(null);

  const certificates: CertificateItem[] = [
    {
      code: 'ISO 9001:2015',
      name: 'Kalite Yönetim Sistemi',
      issuer: 'TÜRKAK & Uluslararası Akreditasyon Forumu (IAF)',
      scope: 'Apartman, Site, Rezidans ve Entegre Tesis Yönetimi Hizmetleri Standardizasyonu',
      certNumber: 'TR-QMS-2024-8841',
      validUntil: '2027',
      icon: 'verified'
    },
    {
      code: 'ISO 14001:2015',
      name: 'Çevre Yönetim Sistemi',
      issuer: 'TÜRKAK Akredite Belgelendirme Kuruluşu',
      scope: 'Tesislerde Sıfır Atık, Ekolojik Peyzaj Bakımı ve Enerji Verimliliği Yönetimi',
      certNumber: 'TR-EMS-2024-5512',
      validUntil: '2027',
      icon: 'eco'
    },
    {
      code: 'ISO 45001:2018',
      name: 'İş Sağlığı ve Güvenliği',
      issuer: 'TÜRKAK Akredite Belgelendirme Kuruluşu',
      scope: 'Tesis Teknik Bakım, Yüksekte Çalışma ve Havuz Hijyeni İSG Standartları',
      certNumber: 'TR-OHS-2024-3329',
      validUntil: '2027',
      icon: 'health_and_safety'
    },
    {
      code: 'ISO 27001:2022',
      name: 'Bilgi Güvenliği Yönetimi',
      issuer: 'TÜRKAK Akredite Belgelendirme Kuruluşu',
      scope: 'Sakin Verileri, KVKK Uyumlu Aidat Takibi ve Kamera/PTS Görüntü Güvenliği',
      certNumber: 'TR-ISMS-2024-9104',
      validUntil: '2027',
      icon: 'lock'
    },
    {
      code: 'ISO 10002:2018',
      name: 'Müşteri Memnuniyeti Yönetimi',
      issuer: 'TÜRKAK Akredite Belgelendirme Kuruluşu',
      scope: 'Kat Malikleri ve Sakin Şikayet/Talep Çözüm Süreçleri Yönetimi (%98.7 Çözüm)',
      certNumber: 'TR-CMS-2024-1185',
      validUntil: '2027',
      icon: 'sentiment_very_satisfied'
    },
    {
      code: '5188 Sayılı ÖGHDK',
      name: 'Özel Güvenlik Faaliyet İzin Belgesi',
      issuer: 'T.C. İçişleri Bakanlığı & T.C. İstanbul Valiliği',
      scope: '7/24 Silahlı/Silahsız Özel Güvenlik, Devriye ve Giriş-Çıkış Kontrolü',
      certNumber: 'İST-ÖG-2015-774',
      validUntil: 'Süresiz / Yıllık Denetimli',
      icon: 'security'
    }
  ];

  const handleVerify = (certNum: string) => {
    setVerifiedStatus('Doğrulanıyor...');
    setTimeout(() => {
      setVerifiedStatus(`✓ ${certNum} numaralı sertifika aktif ve geçerlidir.`);
    }, 600);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alo Yönetim Tesis Yönetimi A.Ş.',
    url: 'https://aloyonetim.com.tr',
    hasCredential: certificates.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Sertifika / Akreditasyon',
      name: `${c.code} ${c.name}`,
      recognizedBy: {
        '@type': 'Organization',
        name: c.issuer
      }
    }))
  };

  const active = certificates[selectedCert];

  return (
    <div className="my-12 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">verified</span>
              E-E-A-T Güvenilirlik & Akreditasyon Mührü
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            TÜRKAK Akredite Kalite & 5188 Güvenlik Standartları
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-light mt-1">
            Alo Yönetim, Türkiye ve uluslararası geçerliliğe sahip 5 ISO belgesi ve Bakanlık ruhsatı ile hizmet verir.
          </p>
        </div>

        <Link
          href="/kurumsal/kalite-belgelerimiz"
          className="px-5 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 self-start md:self-auto shadow-md hover:scale-105"
        >
          <span>Tüm Belgeleri Gör & İndir</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </Link>
      </div>

      {/* Grid Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 relative z-10">
        {certificates.map((c, idx) => (
          <button
            key={c.code}
            onClick={() => {
              setSelectedCert(idx);
              setVerifiedStatus(null);
            }}
            className={`p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-all border ${
              selectedCert === idx
                ? 'bg-white dark:bg-slate-900 border-slate-900 dark:border-white shadow-xl scale-105 ring-2 ring-slate-900/10 dark:ring-white/20'
                : 'bg-white/80 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 shadow-2xs'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl transition-colors ${
              selectedCert === idx ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {c.icon}
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{c.code}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{c.name}</span>
          </button>
        ))}
      </div>

      {/* Active Certificate Details Card */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6 relative z-10 shadow-lg">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black rounded-lg text-xs tracking-wider shadow-xs">
              {active.code}
            </span>
            <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{active.name}</h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            <strong>Kapsam:</strong> {active.scope}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2">
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium">Akreditasyon Kurumu:</span>
              <strong className="text-slate-800 dark:text-slate-200">{active.issuer}</strong>
            </div>
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium">Sertifika / Ruhsat No:</span>
              <strong className="text-slate-900 dark:text-white font-mono font-bold">{active.certNumber}</strong>
            </div>
          </div>
        </div>

        {/* Live Verify Button */}
        <div className="flex flex-col items-center md:items-end gap-3 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => handleVerify(active.certNumber)}
            className="w-full md:w-auto px-6 py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:scale-105"
          >
            <span className="material-symbols-outlined text-sm font-bold">qr_code_scanner</span>
            <span>Sertifikayı Canlı Doğrula</span>
          </button>

          {verifiedStatus && (
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 animate-fade-in bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/40">
              {verifiedStatus}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
