"use client";

import React from 'react';

export default function GesEvChargingHubSeo() {
  return (
    <section
      id="ev-sarj-entegrasyonu"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              ev_station
            </span>
            <span>Güneş + Elektrikli Araç Şarj Sinerjisi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Sitelerde Elektrikli Araç (EV) Şarj İstasyonları Entegrasyonu
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Çatıda güneşten ürettiğiniz enerjiyi site otoparkındaki akıllı şarj kutularına besleyerek 
            hem sakinlere <strong>piyasanın %40 altına ekonomik şarj</strong> sağlayın hem de site bütçesine ek gelir kazandırın.
          </p>
        </div>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Card 1: Sakinlere İndirim */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-emerald-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/20">
                <span className="material-symbols-outlined text-2xl">electric_car</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Sakinler İçin Avantaj
              </span>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mt-1 mb-3">
                Piyasa Fiyatının %40 Altına Şarj
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4">
                Sakinlerimiz Alo Yönetim mobil uygulaması veya temassız RFID kartlarıyla şarjı başlatır. 
                Güneş enerjisi kullanıldığı için AVM veya otoyol istasyonlarına kıyasla neredeyse yarı fiyatına güvenle şarj ederler.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs font-semibold text-[var(--color-primary)]">
              ✓ Mobil uygulama üzerinden anlık kWh ve ücret takibi
            </div>
          </div>

          {/* Card 2: Site Bütçesine Gelir */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-amber-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 border border-amber-500/20">
                <span className="material-symbols-outlined text-2xl">paid</span>
              </div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Site İçin Finansal Model
              </span>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mt-1 mb-3">
                Yönetim Bütçesine Sürekli Nakit Gelir
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4">
                Ortak otoparkta misafir araçlara veya harici kullanıma açık istasyonlardan toplanan şarj gelirleri, 
                doğrudan sitenin resmi banka hesabına aktarılır. Bu gelirler ortak gider bütçesine destek olarak aidatları aşağı çeker.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs font-semibold text-[var(--color-primary)]">
              ✓ EPDK Şarj Hizmeti Yönetmeliği&apos;ne tam uyumlu altyapı
            </div>
          </div>

          {/* Card 3: Akıllı Yük Dengeleme */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20">
                <span className="material-symbols-outlined text-2xl">speed</span>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Şebeke & Trafo Güvenliği
              </span>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mt-1 mb-3">
                Dinamik Yük Dengeleme (DLB)
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4">
                Sitedeki asansörler ve hidroforlar pik saatlerde çalıştığında sistem araçların şarj hızını anlık dengeler. 
                Trafo sigortasının atması veya dağıtım şirketinden ceza gelmesi akıllı otomasyonumuzla engellenir.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs font-semibold text-[var(--color-primary)]">
              ✓ 22 kW AC Hızlı Şarj ve 60-120 kW DC Opsiyonu
            </div>
          </div>
        </div>

        {/* Technical Callout */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-emerald-400">verified_user</span>
            <div>
              <div className="text-sm font-bold text-white">
                Binalarda Enerji Performansı ve Otopark Yönetmeliği Uyumlu
              </div>
              <div className="text-xs text-slate-400">
                Yeni yönetmeliğe göre 20 araç üzeri otoparklarda zorunlu olan EV altyapısını GES ile birleştirerek maliyetsiz kuruyoruz.
              </div>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-mono font-bold text-emerald-300 shrink-0 border border-white/10">
            SIFIR EK MALİYETLE KURULUM
          </span>
        </div>
      </div>
    </section>
  );
}
