"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';
import { DISTRICTS } from '@/data/districts';

export interface DistrictPortfolioHighlight {
  slug: string;
  name: string;
  side: 'anadolu' | 'avrupa';
  managedCount: number;
  sampleProjects: string[];
  features: string[];
  savingAvg: string;
}

const PORTFOLIO_DATA: DistrictPortfolioHighlight[] = [
  {
    slug: 'kadikoy',
    name: 'Kadıköy',
    side: 'anadolu',
    managedCount: 48,
    sampleProjects: ['Caddebostan Sahil Rezidansları', 'Moda Butik Siteleri', 'Fenerbahçe Konakları', 'Acıbadem Yaşam Evleri'],
    features: ['7/24 Concierge & Resepsiyon', '5188 Özel Güvenlik Çemberi', 'Otomatik Aidat & SMS Tahsilatı'],
    savingAvg: '%28 Tasarruf'
  },
  {
    slug: 'atasehir',
    name: 'Ataşehir',
    side: 'anadolu',
    managedCount: 62,
    sampleProjects: ['Batı Ataşehir Kuleleri', 'Finans Şehir Konutları', 'Varyap Çevresi Siteleri', 'Brandium Bölgesi Blokları'],
    features: ['HVAC & BMS Bina Otomasyonu', 'Yüksek Gerilim Trafo & Kompanzasyon', '%0 Reaktif Ceza Garantisi'],
    savingAvg: '%31 Tasarruf'
  },
  {
    slug: 'besiktas',
    name: 'Beşiktaş',
    side: 'avrupa',
    managedCount: 36,
    sampleProjects: ['Levent İş Plazaları', 'Etiler Butik Konutları', 'Ulus Koru Rezidansı', 'Akatlar Sitesi'],
    features: ['A+ Plaza İklimlendirme & Temizlik', 'Yapay Zeka Plaka Tanıma (PTS)', 'VIP Güvenlik & Resepsiyon'],
    savingAvg: '%29 Tasarruf'
  },
  {
    slug: 'sisli',
    name: 'Şişli',
    side: 'avrupa',
    managedCount: 41,
    sampleProjects: ['Mecidiyeköy Ticari Kuleler', 'Bomonti Rezidansları', 'Nişantaşı Lüks Apartmanları', 'Fulya Siteleri'],
    features: ['Asansör A Tipi Yeşil Etiket Koordinasyonu', 'Sıfır Atık & Çöp Şutu Hijyeni', 'KMK İcra & Hukuk Takibi'],
    savingAvg: '%27 Tasarruf'
  },
  {
    slug: 'basaksehir',
    name: 'Başakşehir',
    side: 'avrupa',
    managedCount: 75,
    sampleProjects: ['Bahçeşehir Mega Siteleri', 'Kayaşehir Toplu Yapıları', 'Başakşehir 5. Etap Blokları', 'Ispartakule Konutları'],
    features: ['KMK 66-74 Toplu Yapı Konsolidasyonu', 'Geniş Peyzaj & Otomatik Sulama', 'Nizamiye & Devriye Güvenliği'],
    savingAvg: '%34 Tasarruf'
  },
  {
    slug: 'bakirkoy',
    name: 'Bakırköy',
    side: 'avrupa',
    managedCount: 39,
    sampleProjects: ['Ataköy Sahil Kuleleri', 'Yeşilköy Villa Siteleri', 'Florya Konakları', 'İncirli Apartman Grubu'],
    features: ['TSE 13811 Endüstriyel Hijyen', 'Kapalı/Açık Otopark Yönetimi', '7/24 Nöbetçi Mobil Teknik Servis'],
    savingAvg: '%30 Tasarruf'
  },
  {
    slug: 'uskudar',
    name: 'Üsküdar',
    side: 'anadolu',
    managedCount: 34,
    sampleProjects: ['Altunizade Siteleri', 'Çamlıca Konakları', 'Kandilli Koru Evleri', 'Kısıklı Butik Yaşam'],
    features: ['Bahçe & Ekolojik Peyzaj Bakımı', 'Yüzme Havuzu Hijyen Sertifikasyonu', 'Şeffaf Mobil Bütçe Portalı'],
    savingAvg: '%26 Tasarruf'
  },
  {
    slug: 'sariyer',
    name: 'Sarıyer',
    side: 'avrupa',
    managedCount: 32,
    sampleProjects: ['Maslak Kurumsal Plazalar', 'Tarabya Villa Kompleksleri', 'Zekeriyaköy Siteleri', 'İstinye Konutları'],
    features: ['Yangın & Deprem Otomasyon Denetimi', '5188 Silahlı/Silahsız Özel Güvenlik', '7/24 Acil SLA Müdahalesi'],
    savingAvg: '%33 Tasarruf'
  }
];

export default function FacilityDistrictPortfolioSeo() {
  const [selectedSide, setSelectedSide] = useState<'all' | 'anadolu' | 'avrupa'>('all');

  const filtered = PORTFOLIO_DATA.filter((p) => selectedSide === 'all' || p.side === selectedSide);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Alo Yönetim İstanbul 39 İlçe Tesis Yönetimi Portföy ve Referans Kataloğu',
    description: 'İstanbul genelinde 400+ tesis referansı ile Kadıköy, Beşiktaş, Ataşehir, Başakşehir ve diğer 35 ilçede profesyonel yönetim.',
    itemListElement: PORTFOLIO_DATA.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${p.name} Tesis Yönetimi Referansları`,
      url: `https://aloyonetim.com.tr/bolgeler/${p.slug}/tesis-yonetimi`
    }))
  };

  return (
    <div className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[3rem] p-6 sm:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm">location_city</span>
          <span>İstanbul Geneli 400+ Aktif Tesis Referansı</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
          39 İlçe <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">Tesis Yönetimi Portföyü</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light mt-2">
          Bulunduğunuz ilçedeki aktif referans projelerimizi ve sağladığımız ortalama aidat tasarruf oranlarını inceleyin.
        </p>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mt-6 p-1 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/60 w-fit mx-auto">
          <button
            type="button"
            onClick={() => setSelectedSide('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedSide === 'all'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm border border-[var(--color-outline)]/80'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Tüm İstanbul (39 İlçe)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSide('anadolu')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedSide === 'anadolu'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm border border-[var(--color-outline)]/80'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Anadolu Yakası
          </button>
          <button
            type="button"
            onClick={() => setSelectedSide('avrupa')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedSide === 'avrupa'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm border border-[var(--color-outline)]/80'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Avrupa Yakası
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.slug}
            className="p-5 rounded-3xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col justify-between gap-4 hover:border-indigo-500/40 transition-all hover:shadow-md group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-[var(--color-primary)] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-indigo-500 text-lg">domain</span>
                  {item.name}
                </h4>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {item.savingAvg}
                </span>
              </div>

              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block">
                {item.managedCount}+ Aktif Tesis & Site
              </span>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Örnek Projeler:</span>
                <ul className="space-y-0.5">
                  {item.sampleProjects.slice(0, 3).map((proj, idx) => (
                    <li key={idx} className="text-xs text-[var(--color-secondary)] flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-indigo-500" />
                      <span className="truncate">{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--color-outline)]/40">
              <Link
                href={`/bolgeler/${item.slug}/tesis-yonetimi`}
                className="w-full py-2 px-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)] hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 text-xs font-bold text-[var(--color-primary)] transition-all flex items-center justify-center gap-1 group-hover:border-indigo-500/40"
              >
                <span>{item.name} Hizmet Detayı</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* All 39 Districts Link Footer */}
      <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/40 text-center">
        <p className="text-xs text-[var(--color-secondary)] mb-3">
          Tüm İstanbul&apos;da 39 ilçenin tamamında mobil teknik servis ve 5188 güvenlik altyapımızla 7/24 hizmetinizdeyiz.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {DISTRICTS.slice(0, 15).map((d) => (
            <Link
              key={d.slug}
              href={`/bolgeler/${d.slug}/tesis-yonetimi`}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 border border-[var(--color-outline)]/40 hover:border-indigo-500/40 transition-colors"
            >
              {d.name}
            </Link>
          ))}
          <Link
            href="/bolgeler"
            className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/30"
          >
            + Tüm 39 İlçe Listesi
          </Link>
        </div>
      </div>
    </div>
  );
}
