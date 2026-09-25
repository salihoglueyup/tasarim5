"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type PropertyType = 'apartment' | 'medium_site' | 'mega_residence' | 'commercial';

interface NeedOption {
  id: string;
  label: string;
  icon: string;
}

const NEED_OPTIONS: NeedOption[] = [
  { id: 'security', label: '5188 Özel Güvenlik & PTS', icon: 'shield' },
  { id: 'cleaning', label: 'Ortak Alan & Blok Temizliği', icon: 'cleaning_services' },
  { id: 'technical', label: '7/24 Teknik Bakım & Asansör', icon: 'engineering' },
  { id: 'dues', label: 'Aidat Tahsilatı & KMK 37 Muhasebe', icon: 'payments' },
  { id: 'landscape', label: 'Peyzaj Mimarisi & Bahçe', icon: 'park' },
  { id: 'pool', label: 'Havuz Bakımı & Kimyasal Hijyen', icon: 'pool' },
];

export default function ServicesMatcherSeo() {
  const [propertyType, setPropertyType] = useState<PropertyType>('medium_site');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'security',
    'cleaning',
    'technical',
    'dues',
  ]);

  const toggleNeed = (id: string) => {
    if (selectedNeeds.includes(id)) {
      if (selectedNeeds.length > 1) {
        setSelectedNeeds(selectedNeeds.filter((n) => n !== id));
      }
    } else {
      setSelectedNeeds([...selectedNeeds, id]);
    }
  };

  // Recommendation engine logic
  const getRecommendation = () => {
    if (propertyType === 'commercial' || propertyType === 'mega_residence') {
      return {
        packageName: 'Entegre Tesis & Karma Yaşam Yönetimi',
        slug: '/hizmetler/tesis-yonetimi',
        tag: 'Tam Kapsamlı Kurumsal Çözüm',
        desc: 'Yüksek sakin ve ziyaretçi sirkülasyonuna sahip projeler için 7/24 yerinde tesis müdürü, vardiyalı 5188 güvenlik, sürekli teknik ve endüstriyel hijyen ekibiyle A-Z yönetim.',
        sla: '20 Dk Acil SLA & ISO 41001 Standardı',
        savings: '%22 Toplu Satın Alma Tasarrufu',
        badgeColor: 'border-purple-500/30 text-purple-700 dark:text-purple-300 bg-purple-500/10'
      };
    }

    if (propertyType === 'medium_site') {
      return {
        packageName: 'Profesyonel Site & Rezidans Yönetimi',
        slug: '/hizmetler/site-yonetimi',
        tag: 'En Çok Tercih Edilen Model',
        desc: 'Kat Mülkiyeti Kanunu m.34 uyarınca resmi yöneticilik, şeffaf dijital kasa, mobil aidat tahsilat sistemi, periyodik temizlik ve gezici teknik bakım ağı.',
        sla: '%98.7 Aidat Tahsilat Garantisi',
        savings: 'Gereksiz Site Harcamalarına Son',
        badgeColor: 'border-blue-500/30 text-blue-700 dark:text-blue-300 bg-blue-500/10'
      };
    }

    return {
      packageName: 'Standart Apartman & Butik Mülk Yönetimi',
      slug: '/hizmetler/site-yonetimi',
      tag: 'Ekonomik & Huzurlu Yönetim',
      desc: '10-40 daireli butik apartmanlar için komşuluk ihtilaflarını bitiren, resmi KMK işletme projesi, dijital aidat paneli ve haftalık ortak alan temizlik paketi.',
      sla: 'Sıfır Komşuluk İhtilafı',
      savings: 'Düşük Yönetici Maliyeti',
      badgeColor: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10'
    };
  };

  const rec = getRecommendation();

  return (
    <section id="hizmet-secici" className="py-20 md:py-28 bg-[var(--color-surface)] border-y border-[var(--color-outline)]/60 relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-sm">tune</span>
            İnteraktif Çözüm Sihirbazı
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Siteniz İçin Doğru Yönetim Modelini Belirleyin
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            Mülk ölçeğinizi ve öncelikli hizmet ihtiyaçlarınızı seçin; saniyeler içinde 
            bütçenize en uygun operasyonel modeli ve tasarruf avantajlarını keşfedin.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[var(--color-background)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: Property Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                  1
                </span>
                Mülk Türünüzü Seçin:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'apartment', label: 'Butik Apartman', sub: '10 - 40 Daire', icon: 'home' },
                  { id: 'medium_site', label: 'Orta Ölçekli Site', sub: '40 - 150 Daire', icon: 'apartment' },
                  { id: 'mega_residence', label: 'Rezidans & Karma Yaşam', sub: '150+ Bağımsız Bölüm', icon: 'domain' },
                  { id: 'commercial', label: 'Plaza & İş Merkezi', sub: 'Ofis, AVM, Tesis', icon: 'corporate_fare' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id as PropertyType)}
                    className={`flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      propertyType === item.id
                        ? 'bg-blue-500/10 border-blue-500 text-blue-900 dark:text-blue-200 shadow-xs'
                        : 'bg-[var(--color-surface)] border-[var(--color-outline)]/60 text-[var(--color-secondary)] hover:border-[var(--color-primary)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl text-blue-600 dark:text-blue-400">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">{item.label}</div>
                      <div className="text-[11px] text-[var(--color-secondary)] font-light">{item.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service Needs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                Öncelikli Hizmet İhtiyaçlarınızı İşaretleyin:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {NEED_OPTIONS.map((opt) => {
                  const isChecked = selectedNeeds.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleNeed(opt.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all text-xs font-semibold cursor-pointer ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/80 text-amber-900 dark:text-amber-200'
                          : 'bg-[var(--color-surface)] border-[var(--color-outline)]/50 text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base text-amber-600 dark:text-amber-400">
                        {isChecked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Column (Right) */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  ÖNERİLEN ÇÖZÜM MODELİ
                </span>
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${rec.badgeColor}`}>
                  {rec.tag}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                {rec.packageName}
              </h3>

              <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                {rec.desc}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Hizmet Seviyesi (SLA):</span>
                  <span className="font-bold text-emerald-400">{rec.sla}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Maliyet Avantajı:</span>
                  <span className="font-bold text-amber-400">{rec.savings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Seçilen Modül Sayısı:</span>
                  <span className="font-bold text-white">{selectedNeeds.length} Temel Hizmet</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/teklif-al"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Bu Pakete Özel Ücretsiz Keşif Al
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href={rec.slug}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors"
              >
                Paket Detaylarını İncele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
