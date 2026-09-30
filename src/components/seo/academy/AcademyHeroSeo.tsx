"use client";

import React from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/branding/Icon';
interface AcademyHeroSeoProps {
  lang?: string;
  onOpenEnrollment?: (courseName?: string) => void;
}

export default function AcademyHeroSeo({ lang = 'tr', onOpenEnrollment }: AcademyHeroSeoProps) {
  const stats = [
    {
      value: "%98",
      label: "EGM Sınav Başarısı",
      desc: "ÖGNET deneme sınavları ve soru çözümleriyle ilk girişte kazanma oranı",
      icon: "verified_user",
    },
    {
      value: "15.000+",
      label: "Sertifikalı Mezun",
      desc: "5188 temel ve yenileme eğitimini başarıyla tamamlayan uzman personel",
      icon: "school",
    },
    {
      value: "1.200+",
      label: "İstihdam Noktası",
      desc: "Alo Yönetim rezidans, site ve plazalarında doğrudan işe yerleştirme",
      icon: "work",
    },
    {
      value: "2 Şube",
      label: "Kadıköy & Mecidiyeköy",
      desc: "Metro ve Metrobüs'e 2 dakika, modern atış poligonu anlaşmalı kampüsler",
      icon: "location_city",
    },
  ];

  return (
    <section className="dark relative overflow-hidden bg-slate-950 text-white pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-rose-950/20 via-slate-900/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.12),rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href={lang === 'tr' ? '/' : `/${lang}`} className="hover:text-white transition-colors">
            Anasayfa
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-medium">Güvenlik Akademisi</span>
        </div>

        {/* Top Trust Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
            <Icon name="policy" className="text-sm text-rose-400" />
            <span>5188 SAYILI KANUN UYUMLU • T.C. İÇİŞLERİ BAKANLIĞI EGM ONAYLI</span>
          </div>

          <a
            href="https://www.guvenlikkursu.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/30 text-rose-200 border border-rose-500/40 text-xs font-medium hover:bg-rose-600/50 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>Resmi Eğitim Kurumu: guvenlikkursu.com</span>
            <Icon name="open_in_new" className="text-xs" />
          </a>
        </div>

        {/* Main Heading & Lead */}
        <div className="max-w-4xl mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            5188 Özel Güvenlik Eğitimi &{' '}
            <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-slate-200 bg-clip-text text-transparent">
              Kariyer Akademisi
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Silahlı ve silahsız özel güvenlik temel eğitimi, 5 yılda bir zorunlu kimlik kartı yenileme, 
            profesyonel poligon atışları ve EGM sınav hazırlığı. Kurs bitiminde Alo Yönetim&apos;in 1.200&apos;den fazla 
            prestijli rezidans ve tesis projesinde doğrudan istihdam garantisi.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <button
            type="button"
            onClick={() => onOpenEnrollment && onOpenEnrollment('5188 Temel Güvenlik Eğitimi (Silahlı / Silahsız)')}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-rose-600/25 active:scale-95 cursor-pointer"
          >
            <Icon name="edit_document" className="text-lg" />
            <span>Hızlı Kurs Ön Kayıt</span>
          </button>

          <a
            href="#kurs-paketleri"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-200 backdrop-blur-md cursor-pointer"
          >
            <Icon name="school" className="text-lg" />
            <span>Kurs Paketlerini İncele</span>
          </a>

          <a
            href="#uygunluk-sihirbazi"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors py-2 px-1"
          >
            <Icon name="help" className="text-base text-slate-400" />
            <span>Hangi Eğitime Uygunsunuz? (2 Dakikada Test Edin)</span>
            <Icon name="arrow_forward" className="text-base" />
          </a>
        </div>

        {/* 4-Stat KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 md:p-6 shadow-sm hover:border-white/25 transition-all duration-200 flex flex-col justify-between backdrop-blur-md group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight group-hover:text-rose-400 transition-colors">
                  {stat.value}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center shrink-0">
                  <Icon name={stat.icon} className="text-xl" />
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
