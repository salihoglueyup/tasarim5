"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';

interface TechnicalCriterion {
  id: string;
  category: 'Asansör & Taşıma' | 'Elektrik & Enerji' | 'Yangın & Acil Durum' | 'Mekanik & Tesisat';
  title: string;
  desc: string;
  points: number;
  lawRef: string;
  icon: string;
}

const TECHNICAL_CRITERIA: TechnicalCriterion[] = [
  {
    id: 'crit_asansor_etiket',
    category: 'Asansör & Taşıma',
    title: 'Asansör Yeşil Etiket (A Tipi Muayene & Aylık Bakım Karnesi)',
    desc: 'Sanayi Bakanlığı Asansör İşletme Yönetmeliği uyumu, tescil defteri ve mühürsüz kusursuz yeşil etiket.',
    points: 15,
    lawRef: 'Asansör İşletme ve Bakım Yönetmeliği Madde 9',
    icon: 'elevator'
  },
  {
    id: 'crit_jenerator_senkron',
    category: 'Elektrik & Enerji',
    title: 'Jeneratör ATS Otomatik Devreye Girme & Aylık Yük Testi',
    desc: 'Elektrik kesintisinde 10 saniyede devreye girme, akü şarj seviyesi, mazot filtre ve yağ analizi.',
    points: 15,
    lawRef: 'Binaların Yangından Korunması Hakkında Yönetmelik Madde 70',
    icon: 'power'
  },
  {
    id: 'crit_kompanzasyon',
    category: 'Elektrik & Enerji',
    title: 'Kompanzasyon Panosu & Reaktif / Kapasitif Ceza Koruması',
    desc: 'BEDAŞ/AYEDAŞ faturalarında %20 endüktif / %15 kapasitif sınırların aşılmasını engelleyen harmonik filtre ve röle takibi.',
    points: 15,
    lawRef: 'EPDK Elektrik Piyasası Müşteri Hizmetleri Yönetmeliği',
    icon: 'electric_meter'
  },
  {
    id: 'crit_yangin_sistem',
    category: 'Yangın & Acil Durum',
    title: 'Yangın Pompaları, Sprinkler & Duman Tahliye Jet Fanları',
    desc: 'Jokey pompa basınç testi, yangın dolapları debi ölçümü ve otopark duman damperlerinin otomasyonu.',
    points: 15,
    lawRef: 'Binaların Yangından Korunması Hakkında Yönetmelik Madde 92-99',
    icon: 'local_fire_department'
  },
  {
    id: 'crit_hidrofor_su',
    category: 'Mekanik & Tesisat',
    title: 'Frekans Kontrollü Hidrofor, Su Deposu Dezenfeksiyonu & Genleşme Tankı',
    desc: 'Kullanım suyu hidroforunun azot gazı basıncı, mekanik salmastra kontrolleri ve 6 aylık depo sterilizasyonu.',
    points: 10,
    lawRef: 'Sağlık Bakanlığı İnsani Tüketim Amaçlı Sular Yönetmeliği',
    icon: 'water_drop'
  },
  {
    id: 'crit_siginak_co',
    category: 'Yangın & Acil Durum',
    title: 'Sığınak Havalandırma (Nükleer/Biyolojik) & Otopark CO Tahliyesi',
    desc: 'Zehirli gaz birikiminde otomatik devreye giren fanlar ve sığınak hava sızdırmazlık damperleri.',
    points: 10,
    lawRef: '3194 İmar Kanunu Sığınak Yönetmeliği',
    icon: 'air'
  },
  {
    id: 'crit_paratoner_topraklama',
    category: 'Elektrik & Enerji',
    title: 'EMO Onaylı Yıllık Paratoner ve Elektrik Topraklama Ölçüm Raporu',
    desc: 'Yıldırımdan korunma radyoaktif/erken akışlı paratoner test raporu ve ana pano işletme topraklama direnci (Max 2 Ohm).',
    points: 10,
    lawRef: 'Elektrik Tesislerinde Topraklamalar Yönetmeliği',
    icon: 'bolt'
  },
  {
    id: 'crit_merkezi_isitma',
    category: 'Mekanik & Tesisat',
    title: 'Merkezi Isıtma Kazanı / Eşanjör & Brülör Baca Gazı Emisyonu',
    desc: 'Yoğuşmalı kazan verimlilik testi, baca sensörleri, sıcak su sirkülasyon pompaları ve yıllık eşanjör temizliği.',
    points: 10,
    lawRef: '5627 Sayılı Enerji Verimliliği Kanunu',
    icon: 'hvac'
  }
];

export default function InteractiveTechnicalAuditRadarSeo({ districtName }: { districtName?: string } = {}) {
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'crit_asansor_etiket',
    'crit_jenerator_senkron'
  ]);
  const [selectedFilter, setSelectedFilter] = useState<string>('Tümü');

  const toggleCriterion = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalScore = TECHNICAL_CRITERIA.reduce((acc, curr) => {
    return checkedIds.includes(curr.id) ? acc + curr.points : acc;
  }, 0);

  const getScoreStatus = (score: number) => {
    if (score >= 85) {
      return {
        label: 'İDEAL TEKNİK ALTYAPI (A+ STANDART)',
        badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        barColor: '#10b981',
        desc: 'Tesisinizin teknik mekanik ve elektrik altyapısı yasal yönetmeliklere, TMMOB standartlarına ve can güvenliği mevzuatına tam uyumludur.'
      };
    }
    if (score >= 60) {
      return {
        label: 'ORTA RİSK / PERİYODİK DENETİM EKSİKLİĞİ',
        badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        barColor: '#f59e0b',
        desc: 'Bazı kritik ekipmanlarınızda bakım ve yasal test gecikmeleri tespit edildi. Kompanzasyon cezası veya asansör kırmızı etiket riski mevcut.'
      };
    }
    return {
      label: 'KRİTİK TEKNİK VE YASAL SORUMLULUK RİSKİ',
      badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      barColor: '#ef4444',
      desc: 'Tesisinizde ağır yasal yaptırım, yangın sistemi arızası, asansör mühürlenme veya yüksek reaktif enerji cezası tehlikesi bulunmaktadır. Acil teknik keşif önerilir.'
    };
  };

  const status = getScoreStatus(totalScore);

  const categories = ['Tümü', 'Asansör & Taşıma', 'Elektrik & Enerji', 'Yangın & Acil Durum', 'Mekanik & Tesisat'];
  const filteredCriteria = selectedFilter === 'Tümü'
    ? TECHNICAL_CRITERIA
    : TECHNICAL_CRITERIA.filter((c) => c.category === selectedFilter);

  // Schema.org Quiz JSON-LD
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Site ve Apartman Teknik Bakım & Altyapı Uygunluk Radarı (2026)',
    description: 'Asansör yeşil etiket, jeneratör, kompanzasyon ve yangın sistemleri yasal uyumluluk ve arıza risk testi.',
    hasPart: TECHNICAL_CRITERIA.map((c) => ({
      '@type': 'Question',
      name: c.title,
      text: `${c.desc} (${c.lawRef})`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bu teknik gereklilik tesisinizde aktif ve periyodik onaylı olmalıdır.'
      }
    }))
  };

  return (
    <section className="my-10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden relative">
      <JsonLd data={quizSchema} />
      
      {/* Arka Plan Işık Efekti */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Üst Başlık & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase">
            <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
            TMMOB & Sanayi Bakanlığı Mevzuat Uyum Radarı
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Güncelleme: 2026 Standartları
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
          Tesis & Site Teknik Sağlık ve Yasal Uyum Hesaplayıcı
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-8">
          Sitenizdeki asansör, jeneratör, kompanzasyon ve yangın tesisatının durumunu işaretleyin; 
          olası <strong>yasal para cezalarını, reaktif elektrik kesintilerini</strong> ve can güvenliği risk puanınızı anında hesaplayın.
        </p>

        {/* Skor Paneli & Özet Kartı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-900/90 rounded-2xl p-6 border border-slate-800 mb-8">
          {/* Sol: SVG Circular Score Meter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-2 text-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#1e293b"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={status.barColor}
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * totalScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{totalScore}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">/ 100 Puan</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 mt-2 font-medium">Teknik Uyum Skoru</span>
          </div>

          {/* Sağ: Durum Analizi ve Eylem Çağrısı */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${status.badgeClass}`}>
                {status.label}
              </span>
              <span className="text-xs text-slate-400">
                ({checkedIds.length} / {TECHNICAL_CRITERIA.length} Kriter Karşılanıyor)
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-light">
              {status.desc}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/teklif-al?hizmet=teknik-bakim&utm_source=technical_radar"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-base">engineering</span>
                Ücretsiz 48 Saatlik Teknik Keşif İste
              </Link>
              <a
                href="tel:02165504848"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700"
              >
                <span className="material-symbols-outlined text-base">call</span>
                0216 550 48 48
              </a>
            </div>
          </div>
        </div>

        {/* Kategori Filtre Butonları */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Kriter Listesi (Checklist) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredCriteria.map((c) => {
            const isChecked = checkedIds.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => toggleCriterion(c.id)}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-blue-950/30 border-blue-500/40 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                  isChecked ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-700 bg-slate-800 text-transparent'
                }`}>
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      {c.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      +{c.points} Puan
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {c.desc}
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">gavel</span>
                    {c.lawRef}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bilgilendirme Dipnotu */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-blue-400">info</span>
            TMMOB Makina ve Elektrik Mühendisleri Odası denetim prensipleri esas alınmıştır.
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            Alo Yönetim Teknik Operasyon & Denetim Masası
          </span>
        </div>
      </div>
    </section>
  );
}
