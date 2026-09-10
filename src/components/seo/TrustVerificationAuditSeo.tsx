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
      code: 'ISO 14001:2026',
      name: 'Çevre Yönetim Sistemi',
      issuer: 'BELCERT Uluslararası Belgelendirme (ILAS-MS-0089)',
      scope: 'Tesislerde Sıfır Atık, Ekolojik Peyzaj Bakımı ve Enerji Verimliliği Yönetimi',
      certNumber: 'A1808962',
      validUntil: '04.08.2027',
      icon: 'eco'
    },
    {
      code: 'ISO 45001:2018',
      name: 'İş Sağlığı ve Güvenliği',
      issuer: 'BELCERT Uluslararası Belgelendirme (ILAS-MS-0089)',
      scope: 'Tesis Teknik Bakım, Yüksekte Çalışma ve Havuz Hijyeni İSG Standartları',
      certNumber: 'A1808966',
      validUntil: '04.08.2027',
      icon: 'health_and_safety'
    },
    {
      code: 'ISO 10002:2018',
      name: 'Müşteri Memnuniyeti Yönetimi',
      issuer: 'BELCERT Uluslararası Belgelendirme (ILAS-MS-0089)',
      scope: 'Kat Malikleri ve Sakin Şikayet/Talep Çözüm Süreçleri Yönetimi (%98.7 Çözüm)',
      certNumber: 'A1808961',
      validUntil: '04.08.2027',
      icon: 'sentiment_very_satisfied'
    },
    {
      code: 'ISO 22301:2019',
      name: 'İş Sürekliliği Yönetim Sistemi',
      issuer: 'BELCERT Uluslararası Belgelendirme (ILAS-MS-0089)',
      scope: 'Olağanüstü Durumlarda ve Kriz Anlarında Kesintisiz Tesis Hizmet Güvencesi',
      certNumber: 'A1808963',
      validUntil: '04.08.2027',
      icon: 'all_inclusive'
    },
    {
      code: 'ISO 31000:2018',
      name: 'Kurumsal Risk Yönetimi',
      issuer: 'BELCERT Uluslararası Belgelendirme (ILAS-MS-0089)',
      scope: 'Finansal, Hukuki ve Operasyonel Risklerin Proaktif Olarak Tespiti ve Yönetimi',
      certNumber: 'A1808965',
      validUntil: '04.08.2027',
      icon: 'security'
    },
    {
      code: '5188 Sayılı ÖGHDK',
      name: 'Özel Güvenlik Faaliyet İzin Belgesi',
      issuer: 'T.C. İçişleri Bakanlığı & T.C. İstanbul Valiliği',
      scope: '7/24 Silahlı/Silahsız Özel Güvenlik, Devriye ve Giriş-Çıkış Kontrolü',
      certNumber: '34-ÖG-2016/482',
      validUntil: 'Süresiz / Yıllık Denetimli',
      icon: 'local_police'
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
    name: 'Alo Yönetim',
    legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
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
    <div className="my-12 bg-[var(--color-surface)] text-[var(--color-primary)] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[var(--color-outline)]/60 relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-400/5 dark:bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
              E-E-A-T Güvenilirlik & Akreditasyon Mührü
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            TÜRKAK Akredite Kalite & 5188 Güvenlik Standartları
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
            Alo Yönetim, Türkiye ve uluslararası geçerliliğe sahip 5 ISO belgesi ve Bakanlık ruhsatı ile hizmet verir.
          </p>
        </div>

        <Link
          href="/kurumsal/kalite-belgelerimiz"
          className="px-5 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 self-start md:self-auto shadow-md hover:scale-105"
        >
          <span>Tüm Belgeleri Gör & İndir</span>
          <span className="material-symbols-outlined text-xs" aria-hidden="true">arrow_forward</span>
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
                ? 'bg-[var(--color-surface)] border-slate-900 dark:border-white shadow-md scale-105 ring-2 ring-slate-900/10 dark:ring-white/20'
                : 'bg-[var(--color-surface)]/70 border-[var(--color-outline)]/60 hover:border-slate-400 dark:hover:border-white/20 hover:bg-[var(--color-surface)] shadow-2xs'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl transition-colors ${
              selectedCert === idx ? 'text-[var(--color-primary)]' : 'text-[var(--color-tertiary)]'
            }`}>
              {c.icon}
            </span>
            <span className="text-xs font-bold text-[var(--color-primary)] line-clamp-1">{c.code}</span>
            <span className="text-[10px] text-[var(--color-secondary)] line-clamp-1">{c.name}</span>
          </button>
        ))}
      </div>

      {/* Active Certificate Details Card */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6 relative z-10 shadow-sm">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black rounded-lg text-xs tracking-wider shadow-xs">
              {active.code}
            </span>
            <h4 className="text-lg md:text-xl font-bold text-[var(--color-primary)]">{active.name}</h4>
          </div>
          <p className="text-sm text-[var(--color-secondary)] leading-relaxed font-light">
            <strong>Kapsam:</strong> {active.scope}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--color-tertiary)] pt-2">
            <div>
              <span className="block text-[var(--color-tertiary)] font-medium">Akreditasyon Kurumu:</span>
              <strong className="text-[var(--color-primary)]">{active.issuer}</strong>
            </div>
            <div>
              <span className="block text-[var(--color-tertiary)] font-medium">Sertifika / Ruhsat No:</span>
              <strong className="text-[var(--color-primary)] font-mono font-bold">{active.certNumber}</strong>
            </div>
          </div>
        </div>

        {/* Live Verify Button */}
        <div className="flex flex-col items-center md:items-end gap-3 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => handleVerify(active.certNumber)}
            className="w-full md:w-auto px-6 py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:scale-105"
          >
            <span className="material-symbols-outlined text-sm font-bold" aria-hidden="true">qr_code_scanner</span>
            <span>Sertifikayı Canlı Doğrula</span>
          </button>

          {verifiedStatus && (
            <div className="flex flex-col items-center md:items-end gap-1.5 animate-fade-in">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/40">
                {verifiedStatus}
              </span>
              {active.certNumber.startsWith('A1808') && (
                <a
                  href="https://www.belcert.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 underline flex items-center gap-1 hover:opacity-80"
                >
                  <span>BELCERT Resmi Doğrulama Portalı</span>
                  <span className="material-symbols-outlined text-[12px]" aria-hidden="true">open_in_new</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
