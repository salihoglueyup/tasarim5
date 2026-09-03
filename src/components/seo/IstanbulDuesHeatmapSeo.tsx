'use client';

import React, { useState, useMemo } from 'react';
import JsonLd from './JsonLd';

export interface DistrictDuesData {
  slug: string;
  name: string;
  side: 'anadolu' | 'avrupa';
  avgDuesM2: number;
  aloDuesM2: number;
  savingsRate: number;
  activeUnits: number;
  description: string;
  popularComplexes: string[];
}

const DISTRICT_DUES_DATA: DistrictDuesData[] = [
  {
    slug: 'kadikoy',
    name: 'Kadıköy',
    side: 'anadolu',
    avgDuesM2: 48,
    aloDuesM2: 37,
    savingsRate: 23,
    activeUnits: 18500,
    description: 'Bağdat Caddesi, Caddebostan ve Fenerbahçe hattında yüksek hizmet kalitesi ve optimize bütçe yönetimi.',
    popularComplexes: ['Caddebostan Sahil Rezidansları', 'Fenerbahçe Konutları', 'Moda Butik Siteleri']
  },
  {
    slug: 'atasehir',
    name: 'Ataşehir',
    side: 'anadolu',
    avgDuesM2: 52,
    aloDuesM2: 39,
    savingsRate: 25,
    activeUnits: 24000,
    description: 'Finans Merkezi çevresi, Batı Ataşehir ve Varyap bölgesindeki kule ve çok bloklu sitelerde tam profesyonel yönetim.',
    popularComplexes: ['Batı Ataşehir Kuleleri', 'Finans Şehir Siteleri', 'Ataşehir Blokları']
  },
  {
    slug: 'uskudar',
    name: 'Üsküdar',
    side: 'anadolu',
    avgDuesM2: 44,
    aloDuesM2: 34,
    savingsRate: 22,
    activeUnits: 14200,
    description: 'Altunizade, Çamlıca ve Kandilli lüks site ve villa projelerinde özel güvenlik ve peyzaj optimizasyonu.',
    popularComplexes: ['Çamlıca Konakları', 'Kandilli Koru Siteleri', 'Altunizade Rezidans']
  },
  {
    slug: 'besiktas',
    name: 'Beşiktaş',
    side: 'avrupa',
    avgDuesM2: 65,
    aloDuesM2: 48,
    savingsRate: 26,
    activeUnits: 16800,
    description: 'Levent, Etiler, Ulus ve Akatlar hattında premium concierge, 5188 özel güvenlik ve teknik bakım.',
    popularComplexes: ['Etiler Koru Konutları', 'Ulus Vadi Siteleri', 'Levent Plaza Rezidans']
  },
  {
    slug: 'sariyer',
    name: 'Sarıyer',
    side: 'avrupa',
    avgDuesM2: 72,
    aloDuesM2: 52,
    savingsRate: 28,
    activeUnits: 21500,
    description: 'Maslak kuleleri, Zekeriyaköy villaları ve Tarabya sitelerinde entegre tesis ve sosyal alan yönetimi.',
    popularComplexes: ['Maslak Mashattan & 1453', 'Zekeriyaköy Villaları', 'Tarabya Sahil Konutları']
  },
  {
    slug: 'sisli',
    name: 'Şişli',
    side: 'avrupa',
    avgDuesM2: 58,
    aloDuesM2: 44,
    savingsRate: 24,
    activeUnits: 19300,
    description: 'Bomonti, Fulya, Mecidiyeköy ve Nişantaşı bölgesinde yüksek yoğunluklu rezidans ve iş merkezi yönetimi.',
    popularComplexes: ['Bomonti Rezidans Kuleleri', 'Fulya Teras Konutları', 'Mecidiyeköy Blokları']
  },
  {
    slug: 'bakirkoy',
    name: 'Bakırköy',
    side: 'avrupa',
    avgDuesM2: 54,
    aloDuesM2: 41,
    savingsRate: 24,
    activeUnits: 15600,
    description: 'Florya, Yeşilköy ve Ataköy sahilde 7/24 özel güvenlik, havuz bakımı ve kurumsal aidat muhasebesi.',
    popularComplexes: ['Ataköy Sahil Rezidansları', 'Florya Konakları', 'Yeşilköy Sahil Siteleri']
  },
  {
    slug: 'maltepe',
    name: 'Maltepe',
    side: 'anadolu',
    avgDuesM2: 42,
    aloDuesM2: 32,
    savingsRate: 24,
    activeUnits: 22100,
    description: 'Dragos, Küçükyalı ve Zümrütevler geniş ölçekli site projelerinde toplu satın alma gücüyle tasarruf.',
    popularComplexes: ['Dragos Kıyı Siteleri', 'Küçükyalı Park Konutları', 'Zümrütevler Kuleleri']
  },
  {
    slug: 'kartal',
    name: 'Kartal',
    side: 'anadolu',
    avgDuesM2: 40,
    aloDuesM2: 30,
    savingsRate: 25,
    activeUnits: 26400,
    description: 'Kordonboyu sahil şeridi, Soğanlık ve Uğur Mumcu kulelerinde asansör ve enerji giderlerinde maksimum verim.',
    popularComplexes: ['Kartal Sahil Rezidansları', 'Soğanlık Kuleleri', 'Yakacık Doğa Siteleri']
  },
  {
    slug: 'pendik',
    name: 'Pendik',
    side: 'anadolu',
    avgDuesM2: 38,
    aloDuesM2: 28,
    savingsRate: 26,
    activeUnits: 28900,
    description: 'Kurtköy, Yenişehir ve Marina çevresinde çok etaplı sitelerde merkezi bütçe ve güvenlik otomasyonu.',
    popularComplexes: ['Kurtköy Doğa Konutları', 'Yenişehir Kent Siteleri', 'Pendik Marina Rezidans']
  },
  {
    slug: 'beylikduzu',
    name: 'Beylikdüzü',
    side: 'avrupa',
    avgDuesM2: 36,
    aloDuesM2: 27,
    savingsRate: 25,
    activeUnits: 35000,
    description: 'Barış, Yakuplu ve Adnan Kahveci mahallelerinde 500+ daireli mega sitelerde şeffaf dijital yönetim.',
    popularComplexes: ['Beylikdüzü Doğa Siteleri', 'Yakuplu Marina Konakları', 'Barış Yaşam Kent']
  },
  {
    slug: 'basaksehir',
    name: 'Başakşehir',
    side: 'avrupa',
    avgDuesM2: 45,
    aloDuesM2: 33,
    savingsRate: 27,
    activeUnits: 31200,
    description: 'Bahçeşehir, Kayaşehir ve Başakşehir 1-5. Etaplarda profesyonel temizlik, güvenlik ve peyzaj hizmetleri.',
    popularComplexes: ['Bahçeşehir Gölet Siteleri', 'Kayaşehir Vadi Evleri', 'Başakşehir 4. Etap']
  }
];

export default function IstanbulDuesHeatmapSeo() {
  const [selectedSide, setSelectedSide] = useState<'all' | 'anadolu' | 'avrupa'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictDuesData>(DISTRICT_DUES_DATA[0]);
  const [areaSize, setAreaSize] = useState<number>(10000); // 10.000 m2 varsayılan site alanı

  const filteredDistricts = useMemo(() => {
    return DISTRICT_DUES_DATA.filter(
      (d) => selectedSide === 'all' || d.side === selectedSide
    );
  }, [selectedSide]);

  // Tasarruf Hesaplamaları
  const monthlyMarketTotal = areaSize * selectedDistrict.avgDuesM2;
  const monthlyAloTotal = areaSize * selectedDistrict.aloDuesM2;
  const monthlySavings = monthlyMarketTotal - monthlyAloTotal;
  const annualSavings = monthlySavings * 12;

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'İstanbul İlçe Bazlı Ortalama Site Aidat & Tesis Yönetim Maliyetleri Endeksi 2026',
    description: 'İstanbul 12 ilçesinde m2 başına düşen ortalama site aidatı ve Alo Yönetim bütçe optimizasyon verileri.',
    spatialCoverage: {
      '@type': 'Place',
      name: 'İstanbul, Türkiye',
    },
    creator: {
      '@type': 'Organization',
      name: 'Alo Yönetim',
      url: 'https://aloyonetim.com.tr',
    },
  };

  return (
    <section className="relative py-16 bg-[var(--color-surface)] text-[var(--color-primary)] rounded-[2.5rem] border border-[var(--color-outline)]/80 shadow-sm overflow-hidden my-12">
      <JsonLd data={datasetSchema} />

      {/* Arka Plan Gradientleri */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400" aria-hidden="true">trending_down</span>
            İstanbul İlçe Aidat & Bütçe Tasarruf Isı Haritası (2026)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            İlçenize Göre <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">Site Aidat Raporu</span> & Tasarruf Oranı
          </h2>
          <p className="mt-3 text-[var(--color-secondary)] text-sm sm:text-base font-light">
            İstanbul genelindeki 12 ilçede piyasa ortalaması aidat maliyetlerini inceleyin, Alo Yönetim&apos;in toplu satın alma ve verimli operasyon gücüyle sitenizde sağlanacak yıllık net kazancı hesaplayın.
          </p>
        </div>

        {/* Yaka Seçim Butonları */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedSide('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedSide === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-bold'
                : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-outline)]/70 hover:border-slate-400'
            }`}
          >
            Tüm İstanbul (12 İlçe)
          </button>
          <button
            onClick={() => setSelectedSide('anadolu')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedSide === 'anadolu'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-bold'
                : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-outline)]/70 hover:border-slate-400'
            }`}
          >
            Anadolu Yakası
          </button>
          <button
            onClick={() => setSelectedSide('avrupa')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedSide === 'avrupa'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-bold'
                : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-outline)]/70 hover:border-slate-400'
            }`}
          >
            Avrupa Yakası
          </button>
        </div>

        {/* İlçe Kartları Isı Grid'i */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {filteredDistricts.map((d) => {
            const isSelected = selectedDistrict.slug === d.slug;
            return (
              <button
                key={d.slug}
                onClick={() => setSelectedDistrict(d)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-surface-variant)] border-slate-900 dark:border-white shadow-md ring-2 ring-slate-900/10 dark:ring-white/20'
                    : 'bg-[var(--color-surface)] border-[var(--color-outline)]/80 hover:border-slate-400 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-bold transition-colors ${
                    isSelected ? 'text-[var(--color-primary)] font-black' : 'text-[var(--color-primary)]'
                  }`}>
                    {d.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    -%{d.savingsRate}
                  </span>
                </div>
                <div className="text-xs text-[var(--color-secondary)]">
                  Ort: <span className="font-semibold text-[var(--color-primary)]">{d.avgDuesM2} ₺/m²</span>
                </div>
                <div className="text-xs text-[var(--color-primary)] font-bold mt-0.5">
                  Alo: {d.aloDuesM2} ₺/m²
                </div>
              </button>
            );
          })}
        </div>

        {/* Seçili İlçe Detayı & İnteraktif Büyüklük Simülatörü */}
        <div className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/70 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sol Bölüm: İlçe Analiz Kartı */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-900/5 dark:bg-white/10 text-[var(--color-primary)] border border-[var(--color-outline)] font-bold text-xs">
                  {selectedDistrict.side === 'anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası'}
                </span>
                <span className="text-xs text-[var(--color-secondary)] font-medium">
                  {selectedDistrict.activeUnits.toLocaleString('tr-TR')} Bağımsız Bölüm Kapasitesi
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
                {selectedDistrict.name} Bölgesi Tesis Analizi
              </h3>
              <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
                {selectedDistrict.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider">
                  Bölgede Yönetilen Örnek Projeler:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDistrict.popularComplexes.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-primary)] text-xs border border-[var(--color-outline)]/70">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`/bolgeler/${selectedDistrict.slug}/tesis-yonetimi`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] hover:underline group"
                >
                  <span>{selectedDistrict.name} Bölge Hizmet Detayları</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Sağ Bölüm: Canlı Tasarruf Hesaplayıcı */}
            <div className="lg:col-span-7 bg-[var(--color-surface)] p-6 sm:p-7 rounded-2xl border border-[var(--color-outline)]/80 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dues-area-range" className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                    Sitenizin Toplam Kapalı / Açık Alanı (m²):
                  </label>
                  <span className="text-sm font-extrabold text-[var(--color-primary)] px-3 py-1 rounded-lg bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60">
                    {areaSize.toLocaleString('tr-TR')} m²
                  </span>
                </div>
                <input
                  id="dues-area-range"
                  aria-label="Sitenizin Toplam Kapalı veya Açık Alanı (m²)"
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={areaSize}
                  onChange={(e) => setAreaSize(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
                />
                <div className="flex justify-between text-[11px] text-[var(--color-secondary)] mt-1">
                  <span>2.000 m² (Butik Apartman)</span>
                  <span>50.000 m² (Site)</span>
                  <span>100.000 m² (Mega Rezidans)</span>
                </div>
              </div>

              {/* Karşılaştırma Kutuları */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-[var(--color-surface-variant)] rounded-xl border border-[var(--color-outline)]/60">
                  <div className="text-[11px] text-[var(--color-secondary)] font-medium">Bölge Piyasa Ortalaması</div>
                  <div className="text-base sm:text-lg font-bold text-[var(--color-primary)] mt-1">
                    {monthlyMarketTotal.toLocaleString('tr-TR')} ₺ <span className="text-xs font-normal text-[var(--color-secondary)]">/ay</span>
                  </div>
                  <div className="text-[10px] text-[var(--color-tertiary)] mt-0.5">{selectedDistrict.avgDuesM2} ₺/m²</div>
                </div>

                <div className="p-3.5 bg-[var(--color-surface-variant)] rounded-xl border border-[var(--color-outline)]/80 shadow-2xs">
                  <div className="text-[11px] text-[var(--color-primary)] font-semibold">Alo Yönetim Operasyonu</div>
                  <div className="text-base sm:text-lg font-extrabold text-[var(--color-primary)] mt-1">
                    {monthlyAloTotal.toLocaleString('tr-TR')} ₺ <span className="text-xs font-normal text-[var(--color-secondary)]">/ay</span>
                  </div>
                  <div className="text-[10px] text-[var(--color-secondary)] mt-0.5">{selectedDistrict.aloDuesM2} ₺/m²</div>
                </div>

                <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 text-[var(--color-primary)] rounded-xl shadow-2xs">
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">Yıllık Net Tasarruf</div>
                  <div className="text-base sm:text-lg font-black mt-1 text-emerald-700 dark:text-emerald-300">
                    {annualSavings.toLocaleString('tr-TR')} ₺
                  </div>
                  <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-semibold mt-0.5">
                    -%{selectedDistrict.savingsRate} Maliyet Avantajı
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[var(--color-outline)]/40">
                <div className="text-xs text-[var(--color-secondary)] text-center sm:text-left font-light">
                  * Veriler 2026 İstanbul bölgesel enerji, personel ve malzeme endeksi baz alınarak hesaplanmıştır.
                </div>
                <a
                  href="/teklif-al?hizmet=tesis-yonetimi"
                  className="px-6 py-3.5 bg-[var(--color-primary)] hover:opacity-90 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all flex-shrink-0 flex items-center gap-2 shadow-md hover:scale-105"
                >
                  <span>Sitenize Özel Fiyat Alın</span>
                  <span className="material-symbols-outlined text-sm font-bold" aria-hidden="true">arrow_forward</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
