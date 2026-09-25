"use client";

import React from 'react';

export default function CareerLegalGuaranteeDeepDiveSeo() {
  const pillars = [
    {
      icon: 'savings',
      title: 'Aylık Bloke Provizyon Havuzu',
      desc: 'Personelin kıdem tazminatı karşılıkları her ay düzenli olarak banka fonunda bloke edilir. Yönetim veya firma değişse bile para hazır bekler.',
      benefit: 'Yıllar Sonra Sürpriz Fatura Yok',
    },
    {
      icon: 'gavel',
      title: 'Yargıtay Emsal Kararlarıyla Uyumlu Sözleşme',
      desc: 'Sözleşmelerimiz asıl işveren - alt işveren ilişkisini İş Kanunu Madde 2 ve Yargıtay Hukuk Genel Kurulu kararlarına tam uyumlu şekilde tanzim eder.',
      benefit: 'Hukuki Sorumluluk Kalkanı',
    },
    {
      icon: 'receipt_long',
      title: 'Her Ay Şeffaf SGK & Banka Dekontu Teslimi',
      desc: 'Personelin resmi banka maaş dekontları, SGK e-bildirgeleri ve prim ödeme belgeleri her ay site denetim kuruluna dijital olarak teslim edilir.',
      benefit: 'Sıfır SGK İdari Para Cezası',
    },
    {
      icon: 'diversity_3',
      title: 'Alo Yönetim Hukuk Departmanı Muhataplığı',
      desc: 'Eski personellerin açabileceği olası işe iade veya fazla mesai davalarında kat malikleri değil, Alo Yönetim kurumsal avukatları süreci yürütür.',
      benefit: 'Yönetim Kuruluna Sıfır Adliye Yükü',
    },
  ];

  return (
    <section id="yasal-guvence" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              shield_with_heart
            </span>
            <span>Hukuki & Mali Teminat Modeli</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Kıdem Tazminatı Kalkanı: Kat Maliklerine Sıfır Risk
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Geleneksel kapıcı veya güvenlik çalıştırmada en büyük kabus, yıllar sonra gelen yüz binlerce liralık
            toplu kıdem tazminatı faturaları ve açılan iş mahkemesi davalarıdır. İstihdam Köprüsü ile bu riski tarihe gömüyoruz.
          </p>
        </div>

        {/* Comparison / Problem vs Solution Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Traditional Danger */}
          <div className="p-6 md:p-8 rounded-3xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm mb-3">
                <span className="material-symbols-outlined text-lg">warning</span>
                <span>Geleneksel / Doğrudan Kapıcı & Güvenlik Riskleri</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3">
                Yıllar Sonra Kat Maliklerine Yansıyan Ağır Faturalar
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>10 yıl çalışan bir personelin ayrılması halinde 400.000 TL+ toplu tazminat borcu çıkar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>Ödemek için olağanüstü genel kurul toplanır, komşular arasında kavgalar ve icralık durumlar doğar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>Fazla mesai veya yıllık izin uyuşmazlığında kat malikleri doğrudan davalı sıfatıyla mahkemeye verilir.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 text-xs font-semibold text-rose-700 dark:text-rose-400">
              Risk: Yüksek Maliyet, Komşuluk Kırgınlığı ve Hukuki Belirsizlik
            </div>
          </div>

          {/* Alo Yonetim Solution */}
          <div className="p-6 md:p-8 rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-primary)]/30 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm mb-3">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span>Alo Yönetim İstihdam Köprüsü Güvencesi</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3">
                Aylık Düzenli Provizyon ile %100 Bloke Fon Kalkanı
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>Tazminat payı her ay fatura içinde bloke fona aktarılır; personelin parası gününde hazırdır.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>Personel ayrıldığında ödeme fon havuzundan yapılır; maliklere 1 TL dahi sürpriz borç çıkmaz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>Tüm yasal işveren sorumluluğu kurumsal tüzel kişiliğimizdedir; site yönetimi rahat bir nefes alır.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 text-xs font-semibold text-[var(--color-primary)] flex items-center justify-between">
              <span>Sonuç: 0 TL Beklenmedik Borç, %100 Hukuki Güvence</span>
              <span className="material-symbols-outlined text-base">check_circle</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/30 border border-[var(--color-outline)]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0 mb-3">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--color-primary)] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="text-[11px] font-bold text-[var(--color-primary)] pt-3 border-t border-[var(--color-outline)]/40">
                {item.benefit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
