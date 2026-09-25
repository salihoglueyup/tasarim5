"use client";

import React from 'react';
import Link from 'next/link';

export default function QualityComparisonMatrixSeo() {
  const comparisonRows = [
    {
      kriter: 'Uluslararası Akreditasyon & Belgeler',
      amator: 'Belgesiz, kurumsal olmayan kulaktan dolma yöntemler',
      alo: 'TÜRKAK & IAF Onaylı ISO 41001, 9001, 27001, 45001, 14001 ve TSE HYB',
      isCritical: true,
    },
    {
      kriter: 'Saha ve Taşeron Kalite Denetimi',
      amator: 'Yılda bir kez genel kurulda sözlü beyan, sıfır ara kontrol',
      alo: 'Yılda 48 kez habersiz çapraz saha denetimi ve fotoğraflı raporlama',
      isCritical: true,
    },
    {
      kriter: 'Acil Arıza Müdahalesi ve SLA',
      amator: 'Yöneticinin müsaitliğine ve bireysel usta insafına bağlı',
      alo: 'Yazılı 20 Dakika Acil Teknik Müdahale SLA ve A Tipi yeşil etiket takibi',
      isCritical: false,
    },
    {
      kriter: 'İSG ve Hukuki Tazminat Sorumluluğu',
      amator: 'İş kazalarında kat maliklerine milyonluk rücu ve hapis cezası riski',
      alo: 'ISO 45001 uyumlu, bordrolu ve sigortalı kadro; kat malikine sıfır risk',
      isCritical: true,
    },
    {
      kriter: 'Kişisel Veri Mahremiyeti (KVKK)',
      amator: 'WhatsApp gruplarında paylaşılan borç listeleri ve telefon ifşaları',
      alo: 'ISO 27001 onaylı 256-bit SSL, KVKK uyumlu izole mobil sakin uygulaması',
      isCritical: false,
    },
    {
      kriter: 'Mali Şeffaflık ve Kasa Denetimi',
      amator: 'Kayıp fişler, elden toplanan paralar ve karmaşık defter özetleri',
      alo: 'Canlı banka entegrasyonu, kuruşu kuruşuna anlık şeffaf dijital bilanço',
      isCritical: true,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--color-background)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-sm">compare</span>
            Kalite Standartları Karşılaştırması
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Amatör Yönetim vs. TÜRKAK Onaylı Alo Yönetim
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            Standartsız bireysel yönetimlerin yarattığı güvenlik ve hukuki riskleri, 
            uluslararası akreditasyon güvencemizle nasıl ortadan kaldırdığımızı inceleyin.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-[var(--color-outline)]/70 shadow-sm bg-[var(--color-surface)]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/60">
                <th className="py-4 px-5 font-bold text-[var(--color-primary)] w-1/3">
                  Kalite & Güvenlik Kriteri
                </th>
                <th className="py-4 px-5 font-bold text-rose-600 dark:text-rose-400 w-1/3">
                  Geleneksel / Bireysel Yönetim
                </th>
                <th className="py-4 px-5 font-bold text-emerald-600 dark:text-emerald-400 w-1/3 bg-emerald-500/5">
                  Alo Yönetim (ISO & TÜRKAK Onaylı)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-outline)]/40">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--color-surface-variant)]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-[var(--color-primary)]">
                    <div className="flex items-center gap-2">
                      {row.isCritical && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" title="Kritik Standart" />
                      )}
                      <span>{row.kriter}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[var(--color-secondary)]">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-rose-500 text-base shrink-0 mt-0.5">
                        close
                      </span>
                      <span>{row.amator}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[var(--color-primary)] font-medium bg-emerald-500/5">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-emerald-500 text-base shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{row.alo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>Mavi nokta: Kat Mülkiyeti Kanunu ve İş Kanunu kapsamında cezai yaptırımı olan standartlar.</span>
          </div>
          <Link
            href="/teklif-al"
            className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
          >
            Siteniz İçin Kalite Denetimi Başlatın
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
