"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';
const TX_MAP: Record<string, string> = {
  "5188 Özel Güvenlik & PTS": "smt_1",
  "Ortak Alan & Blok Temizliği": "smt_2",
  "7/24 Teknik Bakım & Asansör": "smt_3",
  "Aidat Tahsilatı & KMK 37 Muhasebe": "smt_4",
  "Peyzaj Mimarisi & Bahçe": "smt_5",
  "Havuz Bakımı & Kimyasal Hijyen": "smt_6",
  "Entegre Tesis & Karma Yaşam Yönetimi": "smt_7",
  "Tam Kapsamlı Kurumsal Çözüm": "smt_8",
  "Yüksek sakin ve ziyaretçi sirkülasyonuna sahip projeler için 7/24 yerinde tesis müdürü, vardiyalı 5188 güvenlik, sürekli teknik ve endüstriyel hijyen ekibiyle A-Z yönetim.": "smt_9",
  "20 Dk Acil SLA": "smt_10",
  "%22 Toplu Satın Alma Tasarrufu": "smt_11",
  "Profesyonel Site & Rezidans Yönetimi": "smt_12",
  "En Çok Tercih Edilen Model": "smt_13",
  "Kat Mülkiyeti Kanunu m.34 uyarınca resmi yöneticilik, şeffaf dijital kasa, mobil aidat tahsilat sistemi, periyodik temizlik ve gezici teknik bakım ağı.": "smt_14",
  "%98.7 Aidat Tahsilat Garantisi": "smt_15",
  "Gereksiz Site Harcamalarına Son": "smt_16",
  "Standart Apartman & Butik Mülk Yönetimi": "smt_17",
  "Ekonomik & Huzurlu Yönetim": "smt_18",
  "10-40 daireli butik apartmanlar için komşuluk ihtilaflarını bitiren, resmi KMK işletme projesi, dijital aidat paneli ve haftalık ortak alan temizlik paketi.": "smt_19",
  "Sıfır Komşuluk İhtilafı": "smt_20",
  "Düşük Yönetici Maliyeti": "smt_21",
  "Butik Apartman": "smt_22",
  "10 - 40 Daire": "smt_23",
  "Orta Ölçekli Site": "smt_24",
  "40 - 150 Daire": "smt_25",
  "Rezidans & Karma Yaşam": "smt_26",
  "150+ Bağımsız Bölüm": "smt_27",
  "Plaza & İş Merkezi": "smt_28",
  "Ofis, AVM, Tesis": "smt_29",
  "İnteraktif Çözüm Sihirbazı": "smt_30",
  "Siteniz İçin Doğru Yönetim Modelini Belirleyin": "smt_31",
  "Mülk ölçeğinizi ve öncelikli hizmet ihtiyaçlarınızı seçin; saniyeler içinde bütçenize en uygun operasyonel modeli ve tasarruf avantajlarını keşfedin.": "smt_32",
  "Mülk Türünüzü Seçin:": "smt_33",
  "Öncelikli Hizmet İhtiyaçlarınızı İşaretleyin:": "smt_34",
  "ÖNERİLEN ÇÖZÜM MODELİ": "smt_35",
  "Hizmet Seviyesi (SLA):": "smt_36",
  "Maliyet Avantajı:": "smt_37",
  "Seçilen Modül Sayısı:": "smt_38",
  "Bu Pakete Özel Ücretsiz Keşif Al": "smt_39",
  "Paket Detaylarını İncele": "smt_40",
  "Temel Hizmet": "smt_41",
};

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
  const { t, language } = useLanguage();
  const lp = (p: string) => (language === 'tr' ? p : `/${language}${p === '/' ? '' : p}`);
  const tx = (s: string): string => {
    const k = TX_MAP[s];
    return k ? t(k as Parameters<typeof t>[0]) : s;
  };
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
        sla: '20 Dk Acil SLA',
        savings: '%22 Toplu Satın Alma Tasarrufu',
        badgeColor: 'border-slate-500/30 text-slate-700 dark:text-slate-300 bg-slate-500/10'
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
        badgeColor: 'border-slate-500/30 text-slate-700 dark:text-slate-300 bg-slate-500/10'
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-4">
            <Icon name="tune" className="text-sm" />
            {tx('İnteraktif Çözüm Sihirbazı')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tx('Siteniz İçin Doğru Yönetim Modelini Belirleyin')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            {tx('Mülk ölçeğinizi ve öncelikli hizmet ihtiyaçlarınızı seçin; saniyeler içinde bütçenize en uygun operasyonel modeli ve tasarruf avantajlarını keşfedin.')}
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[var(--color-background)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: Property Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-600 text-white flex items-center justify-center text-[10px] font-black">
                  1
                </span>
                {tx('Mülk Türünüzü Seçin:')}
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
                        ? 'bg-slate-500/10 border-slate-500 text-slate-900 dark:text-slate-200 shadow-xs'
                        : 'bg-[var(--color-surface)] border-[var(--color-outline)]/60 text-[var(--color-secondary)] hover:border-[var(--color-primary)]'
                    }`}
                  >
                    <Icon name={item.icon} className="text-2xl text-slate-600 dark:text-slate-400" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">{tx(item.label)}</div>
                      <div className="text-[11px] text-[var(--color-secondary)] font-light">{tx(item.sub)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service Needs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-600 text-white flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                {tx('Öncelikli Hizmet İhtiyaçlarınızı İşaretleyin:')}
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
                          ? 'bg-slate-500/10 border-slate-500/80 text-slate-900 dark:text-slate-200'
                          : 'bg-[var(--color-surface)] border-[var(--color-outline)]/50 text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                      }`}
                    >
                      <Icon name={isChecked ? 'check_box' : 'check_box_outline_blank'} className="text-base text-slate-600 dark:text-slate-400" />
                      <span>{tx(opt.label)}</span>
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {tx('ÖNERİLEN ÇÖZÜM MODELİ')}
                </span>
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${rec.badgeColor}`}>
                  {tx(rec.tag)}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                {tx(rec.packageName)}
              </h3>

              <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                {tx(rec.desc)}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{tx('Hizmet Seviyesi (SLA):')}</span>
                  <span className="font-bold text-emerald-400">{tx(rec.sla)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{tx('Maliyet Avantajı:')}</span>
                  <span className="font-bold text-slate-400">{tx(rec.savings)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{tx('Seçilen Modül Sayısı:')}</span>
                  <span className="font-bold text-white">{selectedNeeds.length} {tx('Temel Hizmet')}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link
                href={lp('/teklif-al')}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-400 hover:to-slate-500 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                {tx('Bu Pakete Özel Ücretsiz Keşif Al')}
                <Icon name="arrow_forward" className="text-sm" />
              </Link>
              <Link
                href={lp(rec.slug)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors"
              >
                {tx('Paket Detaylarını İncele')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
