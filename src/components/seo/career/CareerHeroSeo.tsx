"use client";

import React from 'react';
import Link from 'next/link';

interface CareerHeroSeoProps {
  lang?: string;
  onOpenApply?: (role?: string) => void;
}

export default function CareerHeroSeo({ lang = 'tr', onOpenApply }: CareerHeroSeoProps) {
  const stats = [
    {
      value: "1.200+",
      label: "Aktif Saha Personeli",
      desc: "İstanbul genelinde 5188 lisanslı ve İSG belgeli kadro",
      icon: "groups",
    },
    {
      value: "%100",
      label: "Provizyonlu Kıdem Fonu",
      desc: "Aylık bloke fon garantisiyle sıfır mali yük",
      icon: "verified_user",
    },
    {
      value: "0 TL",
      label: "Maliklere Sürpriz Borç",
      desc: "Yönetim devirlerinde toplu tazminat riski yok",
      icon: "shield",
    },
    {
      value: "39 İlçe",
      label: "İstanbul İkame Ağı",
      desc: "24 saatte sertifikalı yedek personel yönlendirmesi",
      icon: "swap_horiz",
    },
  ];

  return (
    <section className="dark relative overflow-hidden bg-slate-950 text-white pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-slate-800/30 via-slate-900/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Breadcrumb & Navigation helper */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href={lang === 'tr' ? '/' : `/${lang}`} className="hover:text-white transition-colors">
            Anasayfa
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-medium">İstihdam Köprüsü</span>
        </div>

        {/* Top Trust Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              handshake
            </span>
            <span>4857 & 5188 MEVZUAT UYUMLU • İSTİHDAM KÖPRÜSÜ MODELİ</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            İstanbul 39 İlçede Canlı İşe Alım
          </span>
        </div>

        {/* Main Heading & Lead */}
        <div className="max-w-4xl mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Tesis Yönetimi ve Güvenlik{' '}
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              İstihdam Köprüsü
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Apartman, site, plaza ve tesis yönetimlerinin personel kıdem tazminatı, SGK denetimi ve hukuki sorumluluklarını
            kurumsal güvenceyle sıfırlarken; binlerce emekçiye zamanında yatan net maaş, tam SGK ve resmi kariyer kapısı açıyoruz.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <a
            href="#acik-pozisyonlar"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              work
            </span>
            <span>Açık Pozisyonları İncele</span>
          </a>

          <a
            href="#basvuru-formu"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-200 backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              assignment_ind
            </span>
            <span>Personel Talep Et (Yöneticiler)</span>
          </a>

          <a
            href="#yasal-guvence"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors py-2 px-1"
          >
            <span>Kıdem Tazminatı Kalkanı Nasıl İşler?</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </a>
        </div>

        {/* 4-Stat KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 md:p-6 shadow-sm hover:border-white/25 transition-all duration-200 flex flex-col justify-between backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">
                    {stat.icon}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{stat.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
