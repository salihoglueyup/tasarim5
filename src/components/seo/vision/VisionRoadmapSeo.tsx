"use client";

import React from 'react';

interface Milestone {
  period: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  achievements: string[];
  isCurrent?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    period: '2014 — 2019',
    badge: 'Kuruluş & KMK Altyapısı',
    badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    title: 'Hukuki Güvence ve İlk 50 Prestijli Proje',
    description:
      'Geleneksel kapıcı/yönetici kaosuna son vermek amacıyla 634 Sayılı Kat Mülkiyeti Kanunu uzmanı hukukçular ve mali müşavirler öncülüğünde kurumsal tesis yönetimi altyapısı kuruldu. İstanbul genelinde 50 prestijli sitenin yönetimi başarıyla üstlenildi.',
    achievements: [
      '634 Sayılı KMK Hukuk Müşavirliği departmanının kuruluşu',
      'İlk 50 toplu yapı ve rezidans projesinin profesyonel yönetimi',
      'ISO 9001 Hizmet Kalite Standardı belgelendirmesi',
    ],
  },
  {
    period: '2020 — 2023',
    badge: 'Dijitalleşme & Akademi',
    badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
    title: 'Sakin Mobil Portalı & 5188 Güvenlik Akademisi',
    description:
      'Kat maliklerinin aidatlarını kredi kartıyla ödeyebildiği, gelir-gideri kuruşu kuruşuna canlı izlediği mobil uygulama hayata geçirildi. Taşeron güvenlik sorununu kökten çözmek için kendi EGM onaylı güvenlik eğitim kurumumuz (guvenlikkursu.com) faaliyete başladı.',
    achievements: [
      '7/24 Açık Kasa Sakin Mobil Portalı lansmanı',
      'guvenlikkursu.com Kadıköy & Mecidiyeköy şubelerinin entegrasyonu',
      'Dokunulmaz vadeli bloke kıdem fonu sisteminin devreye alınması',
    ],
  },
  {
    period: '2024 — 2026 (Bugün)',
    badge: 'Pazar Lideri & AI',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    title: '45.000+ Bağımsız Bölüm & Akıllı IoT Otomasyonu',
    description:
      'Bugün Türkiye genelinde 45.000 bağımsız bölüm ve 1.200 lisanslı saha kadrosuyla sektörün en güvenilir mülk yönetim markası haline geldik. Asansör, hidrofor ve jeneratörlerde IoT kestirimci arıza takibiyle işletme bütçelerinde %28 doğrudan tasarruf sağlıyoruz.',
    achievements: [
      '45.000+ bağımsız bölüm ve 1.200+ eğitimli personel',
      'Sensörlü kestirimci arıza analiziyle %28 enerji/bütçe tasarrufu',
      '%99,4 zamanında aidat tahsilat başarı oranı',
    ],
    isCurrent: true,
  },
  {
    period: '2027 — 2030 Hedefi',
    badge: 'Sürdürülebilir Gelecek',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    title: 'Otonom Yeşil Siteler & Karbon Nötr Tesisler',
    description:
      'Tüm projelerimizde Çevre Bakanlığı ve uluslararası ESG standartlarına tam uyumlu Karbon Nötr tesis sertifikasyonu, ortak otoparkların tamamında elektrikli araç (EV) şarj ağı ve ortak alanlarda otonom temizlik robotları ile geleceğin sitelerini inşa ediyoruz.',
    achievements: [
      'Tüm portföyde Karbon Nötr yeşil bina sertifikasyonu',
      '%100 Elektrikli Araç (EV) şarj istasyonu altyapısı',
      'Akıllı şehir ve mikro güneş enerjisi (GES) şebeke entegrasyonu',
    ],
  },
];

export default function VisionRoadmapSeo() {
  return (
    <section
      id="vizyon-yol-haritasi"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-brand-500" aria-hidden="true">
              timeline
            </span>
            <span>Stratejik Yol Haritası</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            2014 — 2030 Stratejik Vizyon Yol Haritası
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Geçmişten gelen köklü tecrübemizi, geleceğin yapay zeka ve sürdürülebilir yeşil tesis teknolojileriyle birleştiren 
            kurumsal gelişim ve liderlik yolculuğumuz:
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {MILESTONES.map((milestone, idx) => (
            <div
              key={idx}
              className={`bg-[var(--color-surface)] border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all relative ${
                milestone.isCurrent
                  ? 'border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-[var(--color-outline)]/80 hover:border-[var(--color-outline)]'
              }`}
            >
              <div>
                {/* Period & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xl sm:text-2xl font-black text-[var(--color-primary)] tracking-tight">
                    {milestone.period}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${milestone.badgeColor}`}
                  >
                    {milestone.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-3 leading-snug">
                  {milestone.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6 font-normal">
                  {milestone.description}
                </p>

                {/* Achievements List */}
                <ul className="space-y-2 border-t border-[var(--color-outline)]/40 pt-4">
                  {milestone.achievements.map((item, aIdx) => (
                    <li
                      key={aIdx}
                      className="flex items-start gap-2 text-xs text-[var(--color-primary)] font-medium"
                    >
                      <span className="material-symbols-outlined text-sm text-brand-500 shrink-0 mt-0.5">
                        arrow_right
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {milestone.isCurrent && (
                <div className="mt-6 pt-3 border-t border-emerald-500/30 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Aktif Hizmet ve Liderlik Dönemi</span>
                  </span>
                  <span>45.000+ Bağımsız Bölüm</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
