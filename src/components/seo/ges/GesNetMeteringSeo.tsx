"use client";

import React from 'react';

export default function GesNetMeteringSeo() {
  return (
    <section
      id="mahsuplasma-rehberi"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-amber-500" aria-hidden="true">
              sync
            </span>
            <span>EPDK 5/1-ç Aylık Mahsuplaşma Modeli</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Aylık Mahsuplaşma: Kendi Tüketiminiz ve Fazla Elektriğin Satışı Nasıl İşler?
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Şebeke bağlantılı (On-Grid) sistemimiz sayesinde gündüz bedava elektrik tüketir, 
            artan fazla elektriği ise resmi EPDK tarifesi üzerinden dağıtım şirketine satarak site bütçenize kazanç sağlarsınız.
          </p>
        </div>

        {/* 2 Comparison Columns: Gündüz Tüketim vs Fazla Satış */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Column 1: Gündüz Öz Tüketim */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <span className="material-symbols-outlined text-2xl">wb_sunny</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Gündüz Çalışma Modu
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-primary)]">
                    Bedava Öz Tüketim (Güneş Doğduğunda)
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                Güneş panellerinin ürettiği doğru akım (DC), akıllı inverter aracılığıyla bina şebekesine verilir. 
                Sitenin anlık yükleri şebekeden değil, doğrudan çatıdan beslenir:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs">
                  <span className="material-symbols-outlined text-base text-amber-500">elevator</span>
                  <span><strong>Asansörler:</strong> Gün boyu süren asansör trafiği güneşten beslenir.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs">
                  <span className="material-symbols-outlined text-base text-blue-500">water_drop</span>
                  <span><strong>Hidrofor & Yangın Pompaları:</strong> Dairelere su basan motorların elektrik tüketimi sıfırlanır.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs">
                  <span className="material-symbols-outlined text-base text-emerald-500">air</span>
                  <span><strong>Otopark Fanları & CCTV:</strong> 7/24 kesintisiz havalandırma ve güvenlik masrafsız çalışır.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-outline)]/40 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between">
              <span>Şebekeden Çekilen Elektrik:</span>
              <span className="text-sm font-black text-[var(--color-primary)]">0 TL / Gündüz</span>
            </div>
          </div>

          {/* Column 2: Şebekeye Satış */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <span className="material-symbols-outlined text-2xl">account_balance</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Fazla Üretim Modu
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-primary)]">
                    Şebekeye Satış & Nakit Mahsuplaşma
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                Özellikle öğle saatlerinde veya hafta içi sitede tüketim azaldığında üretilen fazla enerji, çift yönlü sayaçtan 
                dağıtım şirketine (BEDAŞ/AYEDAŞ) satılır:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs">
                  <span className="material-symbols-outlined text-base text-emerald-500">pin</span>
                  <span><strong>Çift Yönlü Sayaç:</strong> Üretilen ve tüketilen kWh anlık kayıt altına alınır.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs">
                  <span className="material-symbols-outlined text-base text-purple-500">payments</span>
                  <span><strong>Aylık Mahsup:</strong> Gece saatlerinde tüketilen elektrik bu paradan otomatik düşülür.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/50 text-xs">
                  <span className="material-symbols-outlined text-base text-blue-500">savings</span>
                  <span><strong>Site Hesabına Yatış:</strong> Artan bakiye nakit olarak site yönetimi banka hesabına ödenir.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-outline)]/40 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <span>Banka Hesabına Net Kazanç:</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Resmi EPDK Birim Fiyatı</span>
            </div>
          </div>
        </div>

        {/* Akü Masrafı Olmayan On-Grid Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <span className="material-symbols-outlined text-2xl">battery_charging_full</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--color-primary)]">
                On-Grid Mimari Sayesinde Akü Masrafı Yoktur!
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] mt-0.5 font-light">
                Sistem doğrudan şehir şebekesine bağlıdır. 3-5 yılda bir bozulan pahalı kimyasal bataryalara ihtiyaç duyulmaz; 
                şehir şebekesi siteniz için sınırsız ve bakım gerektirmeyen dev bir sanal batarya gibi çalışır.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-xs shrink-0 border border-blue-500/20">
            SIFIR AKÜ YIPRANMA MALİYETİ
          </span>
        </div>
      </div>
    </section>
  );
}
