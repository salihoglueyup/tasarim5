"use client";

import React, { useState } from 'react';

export default function CareerDualProtectionSeo() {
  const [activeTab, setActiveTab] = useState<'both' | 'managers' | 'employees'>('both');

  const managerBenefits = [
    {
      icon: "gavel",
      title: "Kıdem & İhbar Tazminatı Havuzu",
      desc: "Her personelin kıdem karşılığı aylık provizyonla bloke hesapta fonlanır. Personel yıllar sonra ayrıldığında veya emekli olduğunda kat maliklerinden tek kuruş ek avans ya da bütçe istenmez.",
      tag: "Sıfır Dava Riski",
    },
    {
      icon: "verified_user",
      title: "4857 & 6331 Kurumsal İşveren Sorumluluğu",
      desc: "Personelin resmi işvereni Alo Yönetim'dir. SGK e-bildirgeleri, muhtasar beyannameler, özlük dosyaları ve zorunlu İş Sağlığı ve Güvenliği (İSG) denetimleri tamamen şirketimizce üstlenilir.",
      tag: "Tam Hukuki Kalkan",
    },
    {
      icon: "published_with_changes",
      title: "24 Saatte Sertifikalı Yedek Personel (İkame)",
      desc: "Personel hastalandığında, yıllık izne çıktığında ya da acil mazeret bildirdiğinde nöbet boş kalmaz. İstanbul genelindeki 12 lojistik merkezimizden 24 saat içinde görevli atanır.",
      tag: "%100 Kesintisiz Hizmet",
    },
    {
      icon: "receipt_long",
      title: "%100 Vergiden İndirilebilir İşletme Faturası",
      desc: "Site yönetimi bordro hesaplama, kıdem karşılığı ayırma ve SGK cezalarıyla uğraşmaz. Tek kalem kurumsal hizmet faturası ile tüm operasyon yasal olarak giderleştirilir.",
      tag: "Mali Tasarruf & Şeffaflık",
    },
  ];

  const employeeBenefits = [
    {
      icon: "account_balance",
      title: "Zamanında ve Bankadan Eksiksiz Net Maaş",
      desc: "Tüm çalışanlarımızın hak edişleri her ayın 1'inde kurumsal anlaşmalı banka hesabına kuruşu kuruşuna yatar. Gecikme, eksik ödeme veya elden para ödeme söz konusu dahi olamaz.",
      tag: "Maaş Güvencesi",
    },
    {
      icon: "health_and_safety",
      title: "Gerçek Hak Edişten %100 Resmi SGK",
      desc: "Maaşınız ne ise SGK bildiriminiz o tutardan yapılır. Asgari gösterilip kalanı elden verilmez; emeklilik, kıdem ve sağlık haklarınız kanun önünde sonuna kadar korunur.",
      tag: "Emeklilik Güvencesi",
    },
    {
      icon: "school",
      title: "Alo Yönetim Hizmet Akademisi & Sertifikasyon",
      desc: "5188 kimlik yenileme eğitim desteği, yangın ve tahliye tatbikatları, ilk yardım ve rezidans protokol eğitimleri şirketimizce karşılanır; mesleki vizyonunuz desteklenir.",
      tag: "Ücretsiz Sürekli Eğitim",
    },
    {
      icon: "trending_up",
      title: "Şeffaf Kariyer ve İç Terfi Basamakları",
      desc: "Saha personellerimiz arasından düzenli olarak vardiya amiri, güvenlik şefi, teknik süpervizör ve saha denetmeni atamaları yapılır; emeğiniz karşılıksız kalmaz.",
      tag: "Hızlı Kariyer Yolu",
    },
  ];

  return (
    <section id="cift-yonlu-guvence" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              balance
            </span>
            <span>Çift Taraflı Koruma Modeli</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Hem Site Yönetimlerini Hem Emekçileri Koruyan Sistem
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Geleneksel kapıcı ve güvenlik istihdamındaki tazminat davaları ve hak kayıplarını geride bırakın.
            İstihdam Köprüsü, iki tarafın da haklarını kanun gücü ve fonlama mekanizmasıyla garanti altına alır.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 mt-8">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Tüm Güvenceler (İki Taraf)
            </button>
            <button
              onClick={() => setActiveTab('managers')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'managers'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Yönetimler İçin Kalkan
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'employees'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Çalışanlar İçin Haklar
            </button>
          </div>
        </div>

        {/* Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Managers / Properties */}
          {(activeTab === 'both' || activeTab === 'managers') && (
            <div className="bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--color-outline)]/60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-[var(--color-on-primary)] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                        apartment
                      </span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[var(--color-secondary)] font-bold">
                        İşveren Tarafı
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
                        Site & Tesis Yönetimleri İçin
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-outline)] text-[var(--color-primary)]">
                    4 Ana Güvence
                  </span>
                </div>

                <div className="space-y-6">
                  {managerBenefits.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">
                          {item.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)]">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/60 flex items-center justify-between text-xs text-[var(--color-secondary)]">
                <span>Yargıtay Hukuk Genel Kurulu 2024 Emsalleriyle Uyumlu</span>
                <a href="#basvuru-formu" className="font-semibold text-[var(--color-primary)] hover:underline">
                  Personel Talep Et →
                </a>
              </div>
            </div>
          )}

          {/* Right Column: Employees / Candidates */}
          {(activeTab === 'both' || activeTab === 'employees') && (
            <div className="bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--color-outline)]/60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-[var(--color-on-primary)] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                        badge
                      </span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[var(--color-secondary)] font-bold">
                        Çalışan Tarafı
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
                        Güvenlik, Temizlik & Teknik Emekçilerimiz
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-outline)] text-[var(--color-primary)]">
                    4 Yasal Hak
                  </span>
                </div>

                <div className="space-y-6">
                  {employeeBenefits.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">
                          {item.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)]">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/60 flex items-center justify-between text-xs text-[var(--color-secondary)]">
                <span>4857 Sayılı Kanun & İŞKUR Akreditasyon Standartları</span>
                <a href="#acik-pozisyonlar" className="font-semibold text-[var(--color-primary)] hover:underline">
                  Kariyer Fırsatları →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
