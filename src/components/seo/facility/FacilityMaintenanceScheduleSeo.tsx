"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface MaintenanceTask {
  id: string;
  system: string;
  period: string;
  legalBasis: string;
  lawUrl?: string;
  riskIfIgnored: string;
  aloAssurance: string;
  category: 'mechanical' | 'electrical' | 'fire' | 'health';
  icon: string;
}

const MAINTENANCE_TASKS: MaintenanceTask[] = [
  {
    id: 'asansor',
    system: 'Asansör Periyodik Muayenesi & Yeşil Etiket',
    period: 'Yılda 1 Kez (Zorunlu)',
    legalBasis: 'Asansör İşletme ve Bakım Yönetmeliği (Resmi Gazete No: 30737)',
    lawUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=30737&MevzuatTur=7&MevzuatTertip=5',
    riskIfIgnored: 'Kırmızı etiket ile asansörün zabıtaca mühürlenmesi ve yöneticinin şahsi cezai sorumluluğu.',
    aloAssurance: 'Yetkili A Tipi Muayene Kuruluşu (MMO/TÜRKAK) ile denetim koordinasyonu ve eksiksiz Yeşil Etiket onayı.',
    category: 'mechanical',
    icon: 'elevator'
  },
  {
    id: 'kompanzasyon',
    system: 'Kompanzasyon Panosu & Reaktif Güç Denetimi',
    period: 'Haftalık Kontrol / Aylık Sayaç Analizi',
    legalBasis: 'EPDK Elektrik Piyasası Tarifeler Yönetmeliği (Endüktif %20 / Kapasitif %15)',
    lawUrl: 'https://www.epdk.gov.tr',
    riskIfIgnored: 'Ortak sayaç elektrik faturasına %30 ile %70 arasında yüz binlerce liralık reaktif ceza eklenmesi.',
    aloAssurance: 'Röle ve kondansatörlerin haftalık kademe testi ile faturada %0 Reaktif Ceza kesin taahhüdü.',
    category: 'electrical',
    icon: 'electric_meter'
  },
  {
    id: 'jenerator',
    system: 'Dizel Jeneratör Grubu & ATS Otomatik Transfer',
    period: '15 Günde 1 Boşta / Ayda 1 Yük Altında',
    legalBasis: 'Binaların Yangından Korunması Hakkında Yönetmelik — Madde 67',
    lawUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=11736&MevzuatTur=7&MevzuatTertip=5',
    riskIfIgnored: 'Şebeke kesintisinde asansörlerin havada kalması, hidroforların durması ve yangın pompalarının çalışmaması.',
    aloAssurance: 'Yakıt kalitesi, akü şarjı ve ATS transfer panosu testleri ile kesintisiz 8 saniyede devreye girme garantisi.',
    category: 'electrical',
    icon: 'bolt'
  },
  {
    id: 'yangin',
    system: 'Yangın Algılama, Sprinkler & Hidrant Basıncı',
    period: '6 Ayda 1 Kapsamlı Test',
    legalBasis: 'Binaların Yangından Korunması Hakkında Yönetmelik — Madde 78 & 84',
    lawUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=11736&MevzuatTur=7&MevzuatTertip=5',
    riskIfIgnored: 'Yangın anında duman tahliyesinin çalışmaması, can kaybı riski ve sigorta hasar tazminatının reddi.',
    aloAssurance: 'Jokey pompa basınç testi, yangın tüpleri hidrostatik dolum takibi ve itfaiye onaylı acil tahliye tatbikatı.',
    category: 'fire',
    icon: 'local_fire_department'
  },
  {
    id: 'su-deposu',
    system: 'Kullanma Suyu Deposu & Hidrofor Dezenfeksiyonu',
    period: 'Yılda En Az 2 Kez',
    legalBasis: 'İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik & Hıfzıssıhha Kanunu',
    lawUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=1593&MevzuatTur=1&MevzuatTertip=3',
    riskIfIgnored: 'Lejyoner ve koliform bakterisi üremesi, bina sakinlerinde salgın hastalık ve tesisat paslanması.',
    aloAssurance: 'Biyosidal sertifikalı kimyasallarla ozon destekli dezenfeksiyon ve akredite laboratuvar mikrobiyoloji analiz raporu.',
    category: 'health',
    icon: 'water_drop'
  },
  {
    id: 'hvac',
    system: 'Kazan Dairesi, Chiller & Klima Santralleri (HVAC)',
    period: 'Sezon Geçişlerinde (Yılda 2 Kez)',
    legalBasis: 'Isınmadan Kaynaklanan Hava Kirliliğinin Kontrolü Yönetmeliği',
    lawUrl: 'https://www.csb.gov.tr',
    riskIfIgnored: 'Kazan patlama riski, karbonmonoksit sızıntısı, aşırı doğalgaz sarfiyatı ve chiller kule kireçlenmesi.',
    aloAssurance: 'Brülör baca gazı emisyon analizi, gaz alarm detektör kalibrasyonu ve %25 enerji tasarrufu optimizasyonu.',
    category: 'mechanical',
    icon: 'mode_fan'
  }
];

export default function FacilityMaintenanceScheduleSeo() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTasks = selectedCategory === 'all' 
    ? MAINTENANCE_TASKS 
    : MAINTENANCE_TASKS.filter(t => t.category === selectedCategory);

  return (
    <section className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-6 sm:p-12 shadow-sm relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">engineering</span>
          E-E-A-T Mühendislik Standardı
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
          Tesis Yönetimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">Periyodik Bakım & Denetim Takvimi</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light mt-2 max-w-2xl mx-auto">
          634 sayılı KMK ve ilgili bakanlık yönetmeliklerine göre ortak alan teknik donanımlarının yasal kontrol süreleri ve Alo Yönetim güvencesi.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]/70 w-fit mx-auto">
          {[
            { key: 'all', label: 'Tüm Sistemler (6)', icon: 'apps' },
            { key: 'mechanical', label: 'Mekanik & Asansör', icon: 'elevator' },
            { key: 'electrical', label: 'Elektrik & Jeneratör', icon: 'bolt' },
            { key: 'fire', label: 'Yangın Emniyeti', icon: 'local_fire_department' },
            { key: 'health', label: 'Su & Sağlık', icon: 'water_drop' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xs border border-[var(--color-outline)]/80'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Maintenance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/70 hover:border-blue-500/40 transition-all hover:shadow-md group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">{task.icon}</span>
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-800 text-[var(--color-primary)]">
                  {task.period}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[var(--color-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {task.system}
                </h4>
                <p className="text-[11px] text-[var(--color-tertiary)] mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">gavel</span>
                  <span>{task.legalBasis}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 text-xs text-rose-700 dark:text-rose-300">
                <strong className="block text-[10px] uppercase font-bold tracking-wider mb-0.5">İhmal Edilirse Risk:</strong>
                <p className="text-[11px] leading-relaxed">{task.riskIfIgnored}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--color-outline)]/40">
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-xs text-emerald-800 dark:text-emerald-300">
                <strong className="block text-[10px] uppercase font-bold tracking-wider mb-0.5 text-emerald-700 dark:text-emerald-400">
                  Alo Yönetim Çözümü:
                </strong>
                <p className="text-[11px] leading-relaxed">{task.aloAssurance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Callout */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-sm sm:text-base">Sitenizin Teknik Donanım & Yasal Uyumluluk Durumunu Biliyor Musunuz?</h4>
          <p className="text-xs text-slate-300 font-light">
            Alo Yönetim mühendisleri tesisinizi yerinde incelesin, tüm teknik eksikleri ücretsiz raporlasın.
          </p>
        </div>
        <Link
          href="/teklif-al"
          className="bg-white text-slate-950 font-bold py-2.5 px-6 rounded-xl hover:bg-slate-100 transition-all text-xs shrink-0 shadow"
        >
          Ücretsiz Teknik Keşif İste
        </Link>
      </div>
    </section>
  );
}
