"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface FacilityCriterion {
  id: string;
  category: 'KMK & Bütçe' | 'Güvenlik & İSG' | 'Teknik İşletme' | 'Hijyen & Peyzaj';
  title: string;
  desc: string;
  points: number;
  lawRef: string;
  icon: string;
}

const FACILITY_CRITERIA: FacilityCriterion[] = [
  {
    id: 'crit_kmk_butce',
    category: 'KMK & Bütçe',
    title: 'KMK m.37 Şeffaf Yıllık İşletme Projesi & Bütçe Planı',
    desc: 'Kat malikleri kurulunda onaylanmış resmi gelir-gider bütçesi, şeffaf demirbaş fonu ve noter onaylı karar defteri.',
    points: 15,
    lawRef: '634 Sayılı Kat Mülkiyeti Kanunu Madde 37',
    icon: 'account_balance'
  },
  {
    id: 'crit_aidat_tahsilat',
    category: 'KMK & Bütçe',
    title: 'Otomatik Dijital Aidat Tahsilatı & Sıfır Gecikme Takibi',
    desc: 'Kredi kartı/POS entegrasyonu, SMS hatırlatma ve 30 günü geçen borçlara yasal %5 gecikme işletimi.',
    points: 15,
    lawRef: 'KMK Madde 20 & İcra İflas Kanunu',
    icon: 'credit_card'
  },
  {
    id: 'crit_5188_guvenlik',
    category: 'Güvenlik & İSG',
    title: 'Valilik İzinli 5188 Özel Güvenlik & 7/24 Devriye',
    desc: 'İstanbul Valiliği ÖGİ izin belgesi, üniformalı lisanslı personel, PTS plaka tanıma ve 30 günlük CCTV kaydı.',
    points: 15,
    lawRef: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
    icon: 'shield'
  },
  {
    id: 'crit_isg_tazminat',
    category: 'Güvenlik & İSG',
    title: 'Personel İş Hukuku, SGK & Kıdem Tazminatı Güvencesi',
    desc: 'Temizlik ve güvenlik personellerinin tüm tazminat ve İSG sorumluluklarının kurumsal firma üzerinde olması.',
    points: 10,
    lawRef: '4857 Sayılı İş Kanunu & 6331 İSG Kanunu',
    icon: 'verified_user'
  },
  {
    id: 'crit_asansor_teknik',
    category: 'Teknik İşletme',
    title: 'Asansör Yeşil Etiket Muayenesi & 7/24 Mobil Servis',
    desc: 'A Tipi Akredite kuruluş onaylı yeşil etiket, aylık periyodik bakım defteri ve 45 dk acil kurtarma süresi.',
    points: 15,
    lawRef: 'Sanayi Bakanlığı Asansör Yönetmeliği (2019/30740)',
    icon: 'elevator'
  },
  {
    id: 'crit_jenerator_kompanzasyon',
    category: 'Teknik İşletme',
    title: 'Jeneratör ATS Yük Testi & Reaktif Ceza Koruması',
    desc: 'Otomatik transfer panosu, hidrofor basınç kontrolü ve elektrik faturasında %0 reaktif ceza güvencesi.',
    points: 10,
    lawRef: 'EPDK Elektrik Piyasası Tarifeler Yönetmeliği',
    icon: 'power'
  },
  {
    id: 'crit_tse_temizlik',
    category: 'Hijyen & Peyzaj',
    title: 'TSE 13811 Standartlarında Ortak Alan Hijyen Yönetimi',
    desc: 'Blok koridorları, merdivenler, otopark otomat yıkaması ve Sağlık Bakanlığı onaylı biyosidal ilaçlama.',
    points: 10,
    lawRef: 'TSE 13811 Hijyen ve Sanitasyon Standardı',
    icon: 'cleaning_services'
  },
  {
    id: 'crit_peyzaj_sulama',
    category: 'Hijyen & Peyzaj',
    title: '4 Mevsim Periyodik Peyzaj Bakımı & Akıllı Sulama',
    desc: 'Düzenli çim biçme, ağaç form budaması, yağmur sensörlü sulama ile %40 su tasarrufu.',
    points: 10,
    lawRef: 'T.C. Çevre ve Şehircilik Bakanlığı Yeşil Alan Standartları',
    icon: 'yard'
  }
];

export default function InteractiveFacilityAuditRadarSeo({
  districtName = "İstanbul",
  className = ""
}: {
  districtName?: string;
  className?: string;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'crit_kmk_butce',
    'crit_5188_guvenlik',
    'crit_asansor_teknik'
  ]);

  const toggleCriterion = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalScore = selectedIds.reduce((sum, id) => {
    const crit = FACILITY_CRITERIA.find(c => c.id === id);
    return sum + (crit ? crit.points : 0);
  }, 0);

  const getHealthStatus = (score: number) => {
    if (score >= 85) return { label: 'Kusursuz Entegre Tesis Standardı', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', savings: '%30 - %35' };
    if (score >= 60) return { label: 'İyi Düzey / Geliştirilebilir Tesisat', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', savings: '%20 - %25' };
    if (score >= 40) return { label: 'Orta Düzey / Hukuki & Mali Risk Var', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', savings: '%15 - %20' };
    return { label: 'Yüksek Risk / Acil Profesyonel Yönetim Gerekli', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/30', savings: '%25+' };
  };

  const status = getHealthStatus(totalScore);

  return (
    <div className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-6 sm:p-12 shadow-sm ${className}`}>
      {/* Başlık */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-white/10">
        <div>
          <span className="text-xs font-black text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3">
            İnteraktif Denetim Aracı
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
            {districtName} Tesis Yönetimi & Tasarruf Uyumluluk Radarı
          </h2>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-2 max-w-2xl">
            Sitenizdeki mevcut yönetim, teknik bakım, güvenlik ve hijyen kriterlerini işaretleyin; tesis sağlık skorunuzu ve tahmini bütçe tasarruf potansiyelinizi anında görün.
          </p>
        </div>

        {/* Skor Kartı */}
        <div className={`p-6 rounded-3xl ${status.bg} border ${status.border} flex flex-col items-center justify-center min-w-[220px] text-center`}>
          <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider">Tesis Sağlık Skoru</span>
          <div className={`text-5xl font-black ${status.color} my-1`}>
            {totalScore}<span className="text-2xl font-light text-[var(--color-secondary)]">/100</span>
          </div>
          <span className={`text-xs font-bold ${status.color} mt-1`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Kriterler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {FACILITY_CRITERIA.map((c) => {
          const isChecked = selectedIds.includes(c.id);
          return (
            <div
              key={c.id}
              onClick={() => toggleCriterion(c.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                isChecked
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                  : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center transition-colors ${
                isChecked ? 'bg-emerald-600 text-white' : 'border border-gray-300 dark:border-white/20'
              }`}>
                {isChecked && <span className="material-symbols-outlined text-sm font-black">check</span>}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.category}</span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">+{c.points} Puan</span>
                </div>
                <h4 className="text-base font-bold text-[var(--color-primary)] mt-1">{c.title}</h4>
                <p className="text-xs text-[var(--color-secondary)] font-light mt-1 leading-relaxed">{c.desc}</p>
                <div className="mt-2 text-[11px] font-mono text-slate-400">
                  <span className="material-symbols-outlined text-[12px] align-middle mr-1">gavel</span>
                  {c.lawRef}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tasarruf ve Eylem Alanı */}
      <div className="pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">trending_up</span>
          </div>
          <div>
            <div className="text-xs text-[var(--color-secondary)] uppercase tracking-wider font-bold">Tahmini Yıllık Bütçe Tasarrufu</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              Alo Yönetim ile {status.savings} Maliyet İndirimi
            </div>
          </div>
        </div>

        <Link
          href={`/teklif-al?hizmet=tesis-yonetimi&skor=${totalScore}`}
          className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl"
        >
          <span>Bu Skora Özel Ücretsiz Keşif Raporu İsteyin</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
