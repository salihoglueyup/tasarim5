"use client";

import React from 'react';

export default function CareerCtaBannerSeo() {
  return (
    <section className="py-16 md:py-20 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Candidate Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/80 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <span className="material-symbols-outlined text-sm">person</span>
                <span>Kariyer Arayanlar İçin</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-3">
                Maaşınız Gününde, Haklarınız Kanun Güvencesinde
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                5188 özel güvenlik, endüstriyel temizlik, bina teknisyenliği ve resepsiyon kadrolarımızda
                çalışmak üzere hemen başvurunuzu iletin.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[var(--color-outline)]/60">
              <a
                href="#acik-pozisyonlar"
                className="w-full py-3.5 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Açık Pozisyonları İncele</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-secondary)] font-medium">
                <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">call</span>
                <span>İK Destek: 0850 309 67 34</span>
              </div>
            </div>
          </div>

          {/* Property Manager Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-primary)] text-[var(--color-on-primary)] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-sm">apartment</span>
                <span>Site & Tesis Yönetimleri İçin</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Kıdem Tazminatı Riskini Sıfırlayın, Profesyonel Kadro Kurun
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Yıllar sonra kat maliklerinin önüne gelen yüz binlerce liralık sürpriz tazminat faturalarına son verin.
                İstihdam Köprüsü ile 24 saatte teklif alın.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/20">
              <a
                href="#basvuru-formu"
                className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-[var(--color-primary)] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Tesisime Personel Teklifi Al</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
                <span className="material-symbols-outlined text-sm text-white">verified_user</span>
                <span>Aylık Bloke Provizyon & Sıfır Dava Garantisi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
