"use client";

import React from 'react';

export default function AcademyCostBreakdownSeo() {
  return (
    <section id="ucret-ve-rapor-rehberi" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              payments
            </span>
            <span>Şeffaf Maliyet & Resmi Harç Rehberi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Sağlık Heyet Raporu & Resmi Harç Bilgilendirmesi
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Kursiyerlerimizin kayıt sürecinde sürpriz masraflarla karşılaşmaması için devlet hastanesi heyet raporu branşları ve devlete ödenen resmi harçların eksiksiz dökümü.
          </p>
        </div>

        {/* 2 Main Columns: Sağlık Raporu Rehberi vs Resmi Harçlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Health Report Guide */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
                  <span className="material-symbols-outlined text-2xl">local_hospital</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    Zorunlu Resmi Rapor
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-primary)]">
                    Devlet Hastanesi Sağlık Heyet Raporu
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                EGM mevzuatı gereği <strong>özel hastane veya tıp merkezi raporları kabul edilmez</strong>. 
                Raporun mutlaka Sağlık Bakanlığı&apos;na bağlı tam teşekküllü <strong>Devlet Hastaneleri veya Şehir Hastaneleri</strong>nden alınması şarttır.
              </p>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 mb-6">
                <div className="text-xs font-bold text-[var(--color-primary)] mb-3">
                  Heyet Raporundaki 5 Zorunlu Hekim Branşı:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-secondary)]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">psychology</span>
                    <span><strong>Psikiyatri:</strong> Akıl sağlığı yerinde</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">neurology</span>
                    <span><strong>Nöroloji:</strong> Nörolojik engel yok</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">visibility</span>
                    <span><strong>Göz:</strong> Görme kusuru sınırda</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">hearing</span>
                    <span><strong>KBB:</strong> İşitme ve konuşma tam</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">accessibility</span>
                    <span><strong>Ortopedi:</strong> Ayakta fiziki göreve mani hal yok</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-medium">
                <strong>Karar İbaresi:</strong> Silahlı için <em>&quot;Silahlı Özel Güvenlik Görevlisi Olur&quot;</em>, 
                silahsız için <em>&quot;Silahsız Özel Güvenlik Görevlisi Olur&quot;</em> ibaresi hekimler kurulunca rapora yazılmalıdır.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 text-xs text-[var(--color-secondary)]">
              💡 Rapor randevusu için Alo 182 veya MHRS üzerinden Devlet Hastanesi Sağlık Kurulu seçilmelidir.
            </div>
          </div>

          {/* Official Fees & Taxes Guide */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <span className="material-symbols-outlined text-2xl">receipt_long</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Devlete Ödenen Kalemler
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-primary)]">
                    Resmi Sınav ve Kimlik Harçları
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                Eğitim ücreti dışında devlete ödenen harçlar resmi bankalar veya İnteraktif Vergi Dairesi üzerinden adayın kendi T.C. kimlik numarasıyla yatırılır.
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[var(--color-primary)]">EGM Polis Akademisi Sınav Harcı</div>
                    <div className="text-[var(--color-secondary)]">Halkbank şubeleri veya internet bankacılığından yatırılır.</div>
                  </div>
                  <span className="material-symbols-outlined text-lg text-emerald-600 dark:text-emerald-400">check_circle</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[var(--color-primary)]">Özel Güvenlik Ruhsat Harcı (Vergi Dairesi)</div>
                    <div className="text-[var(--color-secondary)]">Sınavı kazandıktan sonra kimlik kartı basımı için 1 defaya mahsus yatırılır.</div>
                  </div>
                  <span className="material-symbols-outlined text-lg text-emerald-600 dark:text-emerald-400">account_balance</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[var(--color-primary)]">Poligon Fişek ve Atış Yolu Gideri</div>
                    <div className="text-[var(--color-secondary)]">Silahlı temel ve yenileme adayları için 25 fişek atış maliyeti kurs paketimize dahildir.</div>
                  </div>
                  <span className="material-symbols-outlined text-lg text-emerald-600 dark:text-emerald-400">price_check</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                <strong>Alo Güvenlik Ayrıcalığı:</strong> Kurs kayıt ücretimizde kredi kartına vade farksız taksit, 
                ücretsiz ders notları, ÖGNET deneme sınavı soru bankası ve sınav günü ücretsiz rehberlik sunulmaktadır.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/40 text-xs text-[var(--color-secondary)]">
              📞 Güncel dönem eğitim ücretleri ve taksit seçenekleri için: <strong>0850 309 67 34</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
