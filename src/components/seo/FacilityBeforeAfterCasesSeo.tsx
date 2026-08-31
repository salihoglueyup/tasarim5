"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export interface BeforeAfterCase {
  id: string;
  title: string;
  location: string;
  scale: string;
  badge: string;
  before: {
    issues: string[];
    costLoss: string;
    collectionRate: string;
    slaTime: string;
  };
  after: {
    solutions: string[];
    annualSavings: string;
    collectionRate: string;
    slaTime: string;
  };
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

const CASES_DATA: BeforeAfterCase[] = [
  {
    id: 'mega-site',
    title: '450 Konutlu Toplu Yapı & Yaşam Sitesi',
    location: 'Ataşehir / İstanbul',
    scale: '450 Bağımsız Bölüm · 8 Blok',
    badge: 'Toplu Konut & Site Yönetimi',
    before: {
      issues: [
        'Yıllık ₺380.000 kompanzasyon arızası kaynaklı reaktif elektrik cezası.',
        '%68 aidat tahsilat oranı, yüksek bütçe açığı ve biriken ortak fatura borçları.',
        'Asansör ve hidrofor arızalarında 3-4 günü bulan gecikmeli servis müdahaleleri.',
        'Eski site personelinin biriken kıdem tazminatı yükü ve kat maliklerinin şahsi sorumluluğu.'
      ],
      costLoss: '₺520.000 / Yıl Ek Zarar',
      collectionRate: '%68 Tahsilat',
      slaTime: '3-4 Gün Müdahale'
    },
    after: {
      solutions: [
        'Kompanzasyon panosu revizyonu ve 7/24 IoT uzaktan izleme ile %0 reaktif ceza.',
        'Kredi kartı/Sanal POS ve otomatik SMS hatırlatma ile %99.4 anlık tahsilat başarısı.',
        'Alo Yönetim bünyesindeki gezici mobil teknik servis ile maksimum 45 dakika arıza SLA garantisi.',
        'Tüm personel kadrosunun Alo Grup tüzel kişiliği güvencesine alınması ve sıfır kıdem riski.'
      ],
      annualSavings: '₺1.450.000 Net Yıllık Tasarruf',
      collectionRate: '%99.4 Tahsilat',
      slaTime: '45 Dk SLA Müdahale'
    },
    quote: {
      text: 'Alo Yönetim devraldıktan sonra 6 ay içinde reaktif elektrik cezalarımız tamamen bitti ve aidat tahsilatımız düzene girdi. Sitemizin piyasa değeri hissedilir derecede arttı.',
      author: 'Ahmet Y.',
      role: 'Site Denetim Kurulu Başkanı'
    }
  },
  {
    id: 'plaza-is-merkezi',
    title: 'A+ Kurumsal Plaza & Ticari İş Merkezi',
    location: 'Levent - Maslak Hattı / İstanbul',
    scale: '24 Katlı Kule · 65 Kurumsal Kiracı',
    badge: 'Plaza & İş Merkezi Yönetimi',
    before: {
      issues: [
        'Yetkisiz otopark işgalleri ve ziyaretçi giriş-çıkışlarında güvenlik zaafiyeti.',
        'Eski aydınlatma ve dengesiz HVAC iklimlendirme nedeniyle yüksek ortak gider payları.',
        'KMK m.37 işletme projesi şeffaf tebliğ edilmediği için kiracılarla sürekli hukuki ihtilaf.'
      ],
      costLoss: 'Yüksek Enerji İsrafı',
      collectionRate: '%74 Tahsilat',
      slaTime: '24 Saat Müdahale'
    },
    after: {
      solutions: [
        '5188 lisanslı özel güvenlik, yapay zeka destekli PTS plaka tanıma ve QR turnike sistemi.',
        'LED otomasyonu ve bina yönetim sistemi (BMS) optimizasyonuyla %32 elektrik tasarrufu.',
        'Her ay bağımsız denetim raporu ve şeffaf dijital portal üzerinden anlık gider paylaşımı.'
      ],
      annualSavings: '₺980.000 Enerji & İşletme Tasarrufu',
      collectionRate: '%99.8 Tahsilat',
      slaTime: '30 Dk SLA Müdahale'
    },
    quote: {
      text: 'Plazamızdaki kurumsal kiracıların memnuniyeti ilk kez %98 seviyesine ulaştı. Giriş güvenliği ve teknik işletme kusursuz işliyor.',
      author: 'Murat K.',
      role: 'Plaza Mülk Sahibi Temsilcisi'
    }
  },
  {
    id: 'luks-rezidans',
    title: 'Sahil Hattı Butik Rezidans & Yaşam Kompleksi',
    location: 'Kadıköy (Caddebostan) / İstanbul',
    scale: '75 Lüks Daire · Kapalı Havuz & Spa',
    badge: 'Rezidans & Lüks Yaşam',
    before: {
      issues: [
        'Bireysel yönetim döneminde havuz hijyeni ve kimyasal dengesinin düzensizliği.',
        'Kapalı otopark ve spor salonunda kamera kör noktaları ve güvenlik eksikliği.',
        'Komşuluk ilişkilerini zedeleyen yüz yüze aidat isteme gerginlikleri.'
      ],
      costLoss: 'Hizmet Kalite Kaybı',
      collectionRate: '%82 Tahsilat',
      slaTime: 'Plansız Bakım'
    },
    after: {
      solutions: [
        'Sağlık Bakanlığı onaylı günlük otomatik havuz klor/pH ölçümü ve TSE 13811 hijyen raporu.',
        '7/24 resepsiyon, konsiyerj ve tam donanımlı kapalı devre video analiz güvenlik çemberi.',
        'Alo Yönetim Sakin Mobil Uygulaması ile kimse kimseyle muhatap olmadan dijital ödeme konforu.'
      ],
      annualSavings: '%28 Bütçe Tasarrufu & VIP Konfor',
      collectionRate: '%100 Tahsilat',
      slaTime: '7/24 Kesintisiz Destek'
    },
    quote: {
      text: 'Artık apartman toplantılarında aidat kavgası yaşanmıyor. Her şey telefonumuzdaki mobil uygulamada şeffaf ve denetlenebilir.',
      author: 'Selin B.',
      role: 'Kat Maliki & Yönetim Kurulu Üyesi'
    }
  }
];

export default function FacilityBeforeAfterCasesSeo() {
  const [activeCaseId, setActiveCaseId] = useState<string>('mega-site');

  const activeCase = CASES_DATA.find((c) => c.id === activeCaseId) || CASES_DATA[0];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Alo Yönetim Gerçek Tesis Yönetimi Başarı ve Tasarruf Vakaları',
    description: 'İstanbul genelindeki sitelerde, plazalarda ve rezidanslarda sağlanan somut tasarruf ve operasyonel iyileştirme vaka analizleri.',
    itemListElement: CASES_DATA.map((c, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: c.title,
      description: `${c.before.costLoss} zarardan ${c.after.annualSavings} kazanca geçiş sağlanan ${c.location} vaka çalışması.`
    }))
  };

  return (
    <div className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[3rem] p-6 sm:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span>Kanıtlanmış Gerçek KPI & Tasarruf Sonuçları</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
          Öncesi vs. Sonrası: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">Somut Vaka Analizleri</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light mt-2">
          Alo Yönetim modeliyle işletilen gerçek tesislerde elektrik cezaları, tahsilat gecikmeleri ve teknik riskler nasıl çözüldü?
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/60 w-fit mx-auto">
          {CASES_DATA.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCaseId(c.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeCaseId === c.id
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm border border-[var(--color-outline)]/80'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {c.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Case Details */}
      <div className="space-y-8">
        {/* Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/60">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">{activeCase.title}</h4>
            <div className="flex items-center gap-3 text-xs text-[var(--color-secondary)] mt-1">
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px]">location_on</span>
                {activeCase.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px]">domain</span>
                {activeCase.scale}
              </span>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
            {activeCase.after.annualSavings}
          </span>
        </div>

        {/* Before vs After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Column */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  <span className="material-symbols-outlined text-base">cancel</span>
                  Bireysel / Eski Yönetim Dönemi
                </span>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/50 px-2.5 py-1 rounded-md">
                  {activeCase.before.costLoss}
                </span>
              </div>
              <ul className="space-y-2.5">
                {activeCase.before.issues.map((issue, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[var(--color-secondary)] flex items-start gap-2 leading-relaxed">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-rose-200/60 dark:border-rose-900/40 text-center">
              <div className="p-2.5 bg-white/70 dark:bg-black/20 rounded-xl">
                <span className="text-[10px] text-gray-500 block">Tahsilat Başarısı</span>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{activeCase.before.collectionRate}</span>
              </div>
              <div className="p-2.5 bg-white/70 dark:bg-black/20 rounded-xl">
                <span className="text-[10px] text-gray-500 block">Arıza Müdahale</span>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{activeCase.before.slaTime}</span>
              </div>
            </div>
          </div>

          {/* After Column */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Alo Yönetim Entegre İşletme Modeli
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 rounded-md">
                  {activeCase.after.annualSavings}
                </span>
              </div>
              <ul className="space-y-2.5">
                {activeCase.after.solutions.map((sol, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[var(--color-secondary)] flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-200/60 dark:border-emerald-900/40 text-center">
              <div className="p-2.5 bg-white/70 dark:bg-black/20 rounded-xl">
                <span className="text-[10px] text-gray-500 block">Tahsilat Başarısı</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activeCase.after.collectionRate}</span>
              </div>
              <div className="p-2.5 bg-white/70 dark:bg-black/20 rounded-xl">
                <span className="text-[10px] text-gray-500 block">Arıza Müdahale</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activeCase.after.slaTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="p-6 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl text-emerald-500 dark:text-emerald-400 leading-none">“</span>
            <div>
              <p className="text-xs sm:text-sm text-[var(--color-primary)] font-medium italic">
                {activeCase.quote.text}
              </p>
              <span className="text-xs text-[var(--color-secondary)] block mt-1">
                <strong>{activeCase.quote.author}</strong> — {activeCase.quote.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
