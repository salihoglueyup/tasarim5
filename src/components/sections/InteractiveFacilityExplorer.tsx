'use client';

import React, { useState } from 'react';

export interface Hotspot {
  id: string;
  title: string;
  category: string;
  icon: string;
  top: string;
  left: string;
  badge: string;
  description: string;
  sla: string;
  features: string[];
}

const FACILITY_HOTSPOTS: Hotspot[] = [
  {
    id: 'security',
    title: '5188 Özel Güvenlik & Nizamiye',
    category: 'Giriş & Çevre Güvenliği',
    icon: 'shield_lock',
    top: '78%',
    left: '22%',
    badge: '7/24 NÖBET',
    description: '5188 Sayılı Kanun onaylı, üniformalı ve sertifikalı özel güvenlik personeli ile nizamiye kapısı, plaka tanıma sistemi ve çevre güvenliği kontrolü.',
    sla: '15 Saniye Acil Yanıt Süresi',
    features: ['Plaka Tanıma & Bariyer Otomasyonu', 'Ziyaretçi Kimlik & SMS Doğrulama', '4K Gece Görüşlü CCTV Devriye', 'Acil Durum & Yangın İhbar Protokolü']
  },
  {
    id: 'technical',
    title: 'Kazan Dairesi & Asansör & Jeneratör',
    category: 'Teknik Altyapı & Enerji',
    icon: 'engineering',
    top: '82%',
    left: '68%',
    badge: 'KESİNTİSİZ GÜÇ',
    description: 'Merkezi ısıtma, hidrofor, jeneratör ve asansör sistemlerinin 7/24 nöbetçi teknisyenler ve dijital sensörlerle periyodik bakım takibi.',
    sla: '30 Dakika Arıza Müdahale Taahhüdü',
    features: ['Yeşil Etiket Asansör Muayene Takibi', 'Haftalık Jeneratör Yük Testleri', 'Merkezi Isıtma & Boyler Optimizasyonu', 'Termal Kamera Elektrik Panosu Taraması']
  },
  {
    id: 'landscape',
    title: 'Peyzaj & Bahçe & Çocuk Parkı',
    category: 'Çevre & Yeşil Alan',
    icon: 'park',
    top: '60%',
    left: '82%',
    badge: 'EKO-DOSTU',
    description: 'Ziraat mühendisleri denetiminde mevsimlik peyzaj, otomatik akıllı sulama, budama, çim havalandırma ve TSE onaylı çocuk parkı bakımı.',
    sla: 'Haftalık 2 Gün Detaylı Peyzaj Bakımı',
    features: ['Akıllı Damlama & Yağmurlama Sulama', 'Mevsimlik Çiçeklendirme & Ağaç Budama', 'TSE EN 1176 Çocuk Oyun Alanı Denetimi', 'Çevreye Duyarlı Ekolojik Gübreleme']
  },
  {
    id: 'pool',
    title: 'Yüzme Havuzu & Sosyal Tesis',
    category: 'Hijyen & Sosyal Alan',
    icon: 'pool',
    top: '65%',
    left: '42%',
    badge: 'SAĞLIK BAKANLIĞI ONAYLI',
    description: 'Açık ve kapalı yüzme havuzlarının günlük kimyasal/pH ölçümleri, filtrasyon temizliği, sauna ve fitness salonu dezenfeksiyonu.',
    sla: 'Günde 3 Kez Dijital Klor/pH Kaydı',
    features: ['Günlük 3 Vardiya Klor/pH Ölçümü', 'Sağlık Bakanlığı Onaylı Kimyasallar', 'Ters Yıkama & Kum Filtresi Değişimi', 'Fitness & Sauna 7/24 Hijyen Protokolü']
  },
  {
    id: 'management',
    title: 'Yönetim Ofisi & Dijital Muhasebe',
    category: 'KMK 634 & Şeffaf Finans',
    icon: 'account_balance',
    top: '32%',
    left: '48%',
    badge: '%100 ŞEFFAF',
    description: 'Alo Yönetim mobil uygulaması üzerinden anlık aidat takibi, gelir-gider bilançosu, online banka entegrasyonu ve KMK 634 işletme projesi.',
    sla: 'Anlık Dijital Gelir/Gider Raporu',
    features: ['Mobil Uygulama ile Online Aidat Ödeme', '7/24 Dijital Arıza & Talep Masası', 'Yıllık Şeffaf KMK İşletme Projesi', 'Avukat Destekli Hukuk & İcra Takibi']
  }
];

export default function InteractiveFacilityExplorer() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(FACILITY_HOTSPOTS[0]);

  return (
    <section id="facility-explorer" className="relative py-20 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-white rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden my-12">
      {/* Arka Plan Işık Efektleri */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bölüm Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/10 dark:bg-white/10 border border-slate-900/20 dark:border-white/20 text-slate-900 dark:text-slate-100 text-xs font-black uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">apartment</span>
            İnteraktif Akıllı Tesis Keşfi
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Modern Bir Rezidansta <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400">Neleri Yönetiyoruz?</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light">
            Binanın üzerindeki noktalara tıklayarak nizamiye güvenliğinden kazan dairesine, yüzme havuzundan dijital muhasebeye sunduğumuz kurumsal standartları keşfedin.
          </p>
        </div>

        {/* Ana İnteraktif Alan: 2 Kolonlu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sol Kolon: İnteraktif Tesis Maketi / Haritası */}
          <div className="lg:col-span-7 relative bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 min-h-[420px] sm:min-h-[500px] flex items-center justify-center overflow-hidden shadow-xl group">
            
            {/* Tesis İllüstrasyon Çerçevesi */}
            <div className="relative w-full max-w-md h-80 sm:h-96 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-sm">
              <span className="material-symbols-outlined text-7xl sm:text-8xl text-slate-300 dark:text-slate-700/60 mb-3 animate-pulse">
                domain
              </span>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest text-center">
                Alo Yönetim Entegre Tesis Modeli (360°)
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 text-center max-w-xs">
                Keşfetmek istediğiniz hizmet noktasını seçin
              </div>

              {/* Tıklanabilir Hotspot Noktaları */}
              {FACILITY_HOTSPOTS.map((spot) => {
                const isActive = activeHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    style={{ top: spot.top, left: spot.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 scale-125 shadow-xl ring-4 ring-slate-900/20 dark:ring-white/20 z-20 font-bold'
                        : 'bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:scale-110 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 z-10 shadow-sm'
                    }`}
                    title={spot.title}
                  >
                    <span className="material-symbols-outlined text-base sm:text-lg">
                      {spot.icon}
                    </span>
                    {/* Yanıp sönen dalga efekti */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-full bg-slate-400/20 dark:bg-white/20 animate-ping pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Alt Kısayol Menüsü */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-1.5 z-10">
              {FACILITY_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeHotspot.id === spot.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-extrabold'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:text-white'
                  }`}
                >
                  {spot.category.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Sağ Kolon: Aktif Hizmet Detay Kartı */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">{activeHotspot.icon}</span>
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {activeHotspot.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {activeHotspot.title}
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700">
                {activeHotspot.badge}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              {activeHotspot.description}
            </p>

            {/* SLA Taahhüdü */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-2xs">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0">
                verified_user
              </span>
              <div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Kurumsal Hizmet Seviyesi Taahhüdü (SLA)
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {activeHotspot.sla}
                </div>
              </div>
            </div>

            {/* 4 Ana Özellik */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Operasyonel Standartlar:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {activeHotspot.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm">
                      check_circle
                    </span>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="/tr/hizmetler"
                className="w-full py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:scale-105"
              >
                <span>Hizmet Detaylarını İncele</span>
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
