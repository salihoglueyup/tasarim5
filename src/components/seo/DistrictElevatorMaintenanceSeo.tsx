import React from 'react';
import Link from 'next/link';

export interface DistrictElevatorMaintenanceSeoProps {
  districtName: string;
  districtSlug: string;
  managedProjects?: number;
}

/**
 * Wave 56: İlçe Bazlı Asansör Bakım, Arıza & Yeşil Etiket SEO Bileşeni
 * 
 * Hedef Arama Terimleri:
 * - "[İlçe] asansör bakım" (ör. Bakırköy asansör bakım poz 10.4)
 * - "[İlçe] asansör arıza" (ör. Bakırköy asansör arıza poz 21.9)
 * - "[İlçe] asansör yeşil etiket periyodik kontrol"
 * - "[İlçe] 7/24 nöbetçi asansör servisi"
 */
export default function DistrictElevatorMaintenanceSeo({
  districtName,
  districtSlug,
  managedProjects = 30,
}: DistrictElevatorMaintenanceSeoProps) {
  const elevatorFaqs = [
    {
      q: `${districtName}'de asansör yeşil etiket muayenesi nasıl yapılır?`,
      a: `${districtName} Belediyesi'nin protokol imzaladığı akredite A tipi muayene kuruluşu (MMO veya TSE) ile yıllık periyodik kontrol organize edilir. Alo Yönetim teknik heyeti muayene öncesi ön denetim yaparak eksikleri giderir ve ilk seferde yeşil etiket alınmasını garanti eder.`,
    },
    {
      q: `${districtName} genelinde acil asansör arıza ve mahsur kalma müdahale süresi nedir?`,
      a: `${districtName} ilçesinde konumlanan nöbetçi mobil teknik ekiplerimiz ve yetkili asansör servis ortaklarımız sayesinde acil mahsur kalma çağrılarına ortalama 15 ile 25 dakika içinde yerinde müdahale sağlanır.`,
    },
    {
      q: 'Kırmızı veya sarı etiketli asansörlerin hukuki sorumluluğu kime aittir?',
      a: '634 sayılı KMK ve Asansör İşletme ve Bakım Yönetmeliği uyarınca, kırmızı etiketli (güvensiz) asansörün kullandırılmasından doğacak can ve mal kayıplarında bina yöneticisi ve kat malikleri kurulu doğrudan hukuki ve cezai sorumluluk taşır. Alo Yönetim bu riski 48 saat içinde revizyon planı çıkararak sıfırlar.',
    },
  ];

  return (
    <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Üst Rozet */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sanayi Bakanlığı & MMO Uyumlu Asansör İşletmesi</span>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          📍 {districtName} Bölge Mobil Servis Ağı
        </span>
      </div>

      {/* Başlık & Spot */}
      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
        {districtName} Asansör Bakımı, Arıza Müdahalesi & Yıllık Yeşil Etiket Yönetimi
      </h3>
      <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-4xl mb-8">
        {districtName} genelindeki konut siteleri, plazalar ve apartmanlarda asansörlerin aylık periyodik bakımı, 
        7/24 acil arıza servisi ve Sanayi Bakanlığı 2019/30740 sayılı Asansör Yönetmeliği kapsamında 
        A tipi akredite muayene (MMO / TSE) yeşil etiket süreçlerini sıfır risk protokolüyle yönetiyoruz.
      </p>

      {/* 4 Stratejik Asansör Taahhüdü */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">timer</span>
            <span>15-25 Dk Acil SLA</span>
          </div>
          <h4 className="text-base font-bold text-white">7/24 Mahsur Kalma Servisi</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {districtName} sınırlarında 7/24 hazır bekleyen mobil teknisyenlerle acil çağrılara ışık hızında müdahale.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">verified</span>
            <span>%100 Yeşil Etiket</span>
          </div>
          <h4 className="text-base font-bold text-white">Yıllık MMO Muayenesi</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eksik tespit ve ön muayene ile kırmızı/sarı etiket riskini ortadan kaldırır, güvenli tescil sağlarız.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">engineering</span>
            <span>Önleyici Bakım</span>
          </div>
          <h4 className="text-base font-bold text-white">Çift Halat & Fren Emniyeti</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Motor, halat aşınması, kuyu dibi temizliği ve kapı kilit güvenlik kontaklarının periyodik ölçümü.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">gavel</span>
            <span>Hukuki Koruma</span>
          </div>
          <h4 className="text-base font-bold text-white">Yönetici Sorumluluk Devri</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sözleşmeli servis denetimiyle kat malikleri ve yöneticinin cezai/maddi sorumluluklarını yasal olarak koruruz.
          </p>
        </div>
      </div>

      {/* SSS Akordeon / Liste */}
      <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4 mb-8">
        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          {districtName} Asansör Bakımı ve Muayenesi Hakkında Sıkça Sorulanlar
        </h4>
        <div className="divide-y divide-slate-800">
          {elevatorFaqs.map((faq, idx) => (
            <div key={idx} className="py-3 space-y-1">
              <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400 font-bold">Q:</span> {faq.q}
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Aksiyon Çağrısı */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          {districtName}&apos;de {managedProjects}+ projede sıfır iş kazası ve kesintisiz yeşil etiket güvencesi.
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:+902165504848"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-400" aria-hidden="true">call</span>
            <span>7/24 Arıza Hattı</span>
          </a>
          <Link
            href="/teklif-al"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 group"
          >
            <span>Asansör Bakım Teklifi Al</span>
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
