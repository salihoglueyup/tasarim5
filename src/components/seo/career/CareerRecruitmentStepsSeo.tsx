"use client";

import React from 'react';

export default function CareerRecruitmentStepsSeo() {
  const steps = [
    {
      step: '01',
      title: 'Dijital Başvuru & 12 Saatte İlk İnceleme',
      desc: 'Sitemizdeki başvuru formunu dolduran veya İK merkezimize ulaşan adayların profili 12 saat içinde değerlendirilir; uygun adaylara randevu iletilir.',
      icon: 'edit_document',
      badge: 'Hızlı Geri Dönüş',
    },
    {
      step: '02',
      title: '5188 Güvenlik & Adli Sicil Tahkikatı',
      desc: 'E-Devlet adli sicil kaydı, İçişleri Bakanlığı ÖGG kimlik durumu, askerlik durumu ve sağlık kurulu raporları tavizsiz olarak teyit edilir.',
      icon: 'policy',
      badge: 'Yasal Denetim',
    },
    {
      step: '03',
      title: 'Mesleki Yeterlilik & Yüz Yüze Mülakat',
      desc: 'Adayın kriz anı reflekleri, diksiyonu, takım çalışmasına uyumu ve teknik donanımı uzman operasyon müdürlerimiz tarafından test edilir.',
      icon: 'record_voice_over',
      badge: 'Birebir Değerlendirme',
    },
    {
      step: '04',
      title: 'Alo Yönetim Hizmet Akademisi Eğitimi',
      desc: 'Göreve başlamadan önce 6331 İSG standartları, yangın tahliyesi, ilk yardım, CCTV operatörlüğü ve rezidans protokol oryantasyonu verilir.',
      icon: 'school',
      badge: 'Sertifikalı Oryantasyon',
    },
    {
      step: '05',
      title: 'Zimmetli Başlangıç & 7/24 Saha Süpervizörlüğü',
      desc: 'Üniforma ve techizat zimmeti yapılarak göreve başlanır. Gece ve gündüz mobil denetim araçlarımızla personelin saha konforu ve güvenliği takip edilir.',
      icon: 'how_to_reg',
      badge: 'Kesintisiz Destek',
    },
  ];

  return (
    <section id="ise-alim-sureci" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              checklist
            </span>
            <span>Şeffaf & Standart İşe Alım Protokolü</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            5 Aşamalı Güvenlik Tahkikatı ve Görevlendirme Süreci
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Hem site sakinlerinin can ve mal güvenliğini teminat altına almak hem de mesleğini onurla icra eden
            çalışanlarımıza hak ettikleri değeri vermek için uyguladığımız titiz aşamalar.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between relative group hover:border-[var(--color-primary)]/40 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[var(--color-outline)] group-hover:text-[var(--color-primary)] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">
                      {item.icon}
                    </span>
                  </div>
                </div>

                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 mb-2">
                  {item.badge}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-outline)]/40 text-[11px] font-semibold text-[var(--color-primary)] flex items-center justify-between">
                <span>Aşama {idx + 1} / 5</span>
                <span className="material-symbols-outlined text-xs">done</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
