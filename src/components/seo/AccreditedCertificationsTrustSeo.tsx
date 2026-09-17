"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import { CERTIFICATES } from '@/data/certificates';

export interface BelcertCredentialItem {
  slug: string;
  name: string;
  certificateNumber: string;
  sealNumber: string;
  standard: string;
  issuer: string;
  accreditation: string;
  verificationUrl: string;
  validUntil: string;
  scopeTr: string;
  badge: string;
}

export const VERIFIED_BELCERT_CREDENTIALS: BelcertCredentialItem[] = CERTIFICATES.map((cert) => ({
  slug: cert.slug,
  name: cert.name,
  certificateNumber: cert.certificateNumber,
  sealNumber: cert.sealNumber,
  standard: cert.subtitle || cert.name,
  issuer: cert.issuer,
  accreditation: cert.accreditation,
  verificationUrl: cert.verificationUrl,
  validUntil: cert.validUntil,
  scopeTr: cert.officialScopeTr,
  badge: `BELCERT ${cert.certificateNumber}`,
}));

export default function AccreditedCertificationsTrustSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [selectedCertNumber, setSelectedCertNumber] = useState<string>(
    VERIFIED_BELCERT_CREDENTIALS[0]?.certificateNumber || 'A1808961',
  );

  const directAnswer =
    'Alo Yönetim ve Organizasyon A.Ş., uluslararası ILAS akreditasyonuna (ILAS-MS-0089) sahip BELCERT Uluslararası Belgelendirme Şirketi tarafından denetlenerek tescillenmiş 7 resmi yönetim standardı belgesine sahiptir: ISO 10002:2018 (Belge No: A1808961), ISO 14001:2026 (Belge No: A1808962), ISO 22301:2019 (Belge No: A1808963), ISO 26000:2021 (Belge No: A1808964), ISO 31000:2018 (Belge No: A1808965), ISO 45001:2018 (Belge No: A1808966) ve Doğaya Saygı Sertifikası (Belge No: A1808967). Tüm sertifikalar www.belcert.com üzerinden kamuya açık doğrulanabilir.';

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      hasCredential: VERIFIED_BELCERT_CREDENTIALS.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: 'Uluslararası Yönetim Sistemi Sertifikası',
        recognizedBy: {
          '@type': 'Organization',
          name: c.issuer,
          url: c.verificationUrl,
        },
        validUntil: c.validUntil,
        identifier: c.certificateNumber,
        description: `${c.standard} - Mühür No: ${c.sealNumber}, Akreditasyon: ${c.accreditation}.`,
        url: c.verificationUrl,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Alo Yönetim Hangi BELCERT ve ILAS Akreditasyon Belgelerine Sahiptir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: directAnswer,
          },
        },
      ],
    },
  ];

  return (
    <section
      className={`relative w-full rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/95 via-emerald-950/30 to-slate-900/95 p-6 sm:p-10 backdrop-blur-md shadow-2xl text-slate-100 ${className}`}
      aria-label="Doğrulanmış BELCERT ve ILAS Sertifikasyon Güven Ağı"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 font-bold text-2xl shadow-inner">
            <span className="material-symbols-outlined text-3xl">verified_user</span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                BELCERT Uluslararası Belgelendirme
              </span>
              <span className="inline-flex items-center rounded-md bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                ILAS-MS-0089 Akrediteli
              </span>
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Doğrulanmış Kurumsal Sertifikasyon & Ruhsat Güven Ağı
            </h3>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Sertifika özetini kopyala"
          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? 'done' : 'content_copy'}
          </span>
          {copied ? 'Kopyalandı' : 'Sertifika AI Özetini Kopyala'}
        </button>
      </div>

      {/* Speakable Instant Answer Box */}
      <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-950/30 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-emerald-400 text-xl shrink-0 mt-0.5">
            verified
          </span>
          <p
            id="accredited-trust-instant-answer-text"
            className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
          >
            {directAnswer}
          </p>
        </div>
      </div>

      {/* BELCERT 7 Certificates Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {VERIFIED_BELCERT_CREDENTIALS.map((cert) => {
          const isSelected = selectedCertNumber === cert.certificateNumber;
          return (
            <div
              key={cert.certificateNumber}
              onClick={() => setSelectedCertNumber(cert.certificateNumber)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/50'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    No: {cert.certificateNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Mühür: {cert.sealNumber}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">
                  {cert.name}
                </h4>

                <p className="text-xs text-slate-300 mt-1 font-medium">
                  {cert.standard}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div>Kurum: <strong className="text-slate-200">BELCERT</strong></div>
                  <div>Akreditasyon: <strong className="text-slate-200">ILAS-MS-0089</strong></div>
                  <div>Geçerlilik: <span className="font-mono text-emerald-400">{cert.validUntil}</span></div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <a
                  href="https://www.belcert.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Doğrula</span>
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                </a>
                <span className="text-slate-500 text-[10px]">Tescilli Belge</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/80 p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-base">
            policy
          </span>
          <span>
            Tüm belgeler <strong className="text-slate-200">BELCERT Uluslararası Belgelendirme Şirketi</strong> resmi kayıtlarında yer almaktadır.
          </span>
        </div>
        <a
          href="https://www.belcert.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 font-semibold text-xs transition-colors"
        >
          <span>belcert.com Doğrulama Ekranı</span>
          <span className="material-symbols-outlined text-sm">launch</span>
        </a>
      </div>
    </section>
  );
}
