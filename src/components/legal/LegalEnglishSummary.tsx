'use client';

import React from 'react';

interface LegalEnglishSummaryProps {
  type: 'kvkk' | 'privacy';
  lang: string;
}

/**
 * Faz 168: KVKK ve Gizlilik Politikası İngilizce Özet Versiyonları
 */
export default function LegalEnglishSummary({ type, lang }: LegalEnglishSummaryProps) {
  if (lang !== 'en') return null;

  if (type === 'kvkk') {
    return (
      <div className="mb-10 p-6 md:p-8 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl" aria-hidden="true">verified_user</span>
          <h3 className="text-lg font-bold text-blue-950 dark:text-blue-200">
            Executive Summary: Data Protection Notice (Turkish Law No. 6698 - KVKK)
          </h3>
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            <strong>Data Controller:</strong> Alo Yönetim A.Ş., located in Istanbul, Turkey, acts as the primary data controller for residents, property owners, visitors, and commercial partners.
          </p>
          <p>
            <strong>Purposes of Processing:</strong> Personal data is processed to deliver condominium and facility management services, conduct 5188-licensed security operations (CCTV and visitor entry logs), bill monthly dues, and fulfill statutory obligations under Turkish Condominium Law No. 634.
          </p>
          <p>
            <strong>Data Subject Rights:</strong> Pursuant to Article 11 of Law No. 6698, you are entitled to inquire whether your data is processed, request information, request correction or erasure, object to adverse automated profiling, and claim damages for unlawful processing.
          </p>
          <p>
            <strong>Formal Inquiries:</strong> To exercise your statutory rights, please submit written requests to{' '}
            <a href="mailto:kvkk@aloyonetim.com.tr" className="font-semibold text-blue-600 dark:text-blue-400 underline">
              kvkk@aloyonetim.com.tr
            </a>{' '}
            accompanied by valid proof of identity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 p-6 md:p-8 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-2xl" aria-hidden="true">policy</span>
        <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-200">
          Executive Summary: Privacy & Data Confidentiality Policy
        </h3>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          <strong>Confidentiality Commitment:</strong> Alo Yönetim maintains the highest standards of data security, encrypting all transactions with TLS 1.3 and AES-256 protocols.
        </p>
        <p>
          <strong>Information Collected:</strong> We collect contact information submitted via service forms, dues calculation parameters, and standard web server telemetry (IP address, device type) used solely to enhance service reliability.
        </p>
        <p>
          <strong>Third-Party Sharing:</strong> Your personal information is never sold, leased, or transferred to third parties for commercial advertising. Data is shared exclusively with authorized public authorities when legally mandated.
        </p>
        <p>
          <strong>Privacy Inquiries:</strong> For inquiries regarding confidentiality practices, email us at{' '}
          <a href="mailto:gizlilik@aloyonetim.com.tr" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">
            gizlilik@aloyonetim.com.tr
          </a>.
        </p>
      </div>
    </div>
  );
}
