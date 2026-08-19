"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';

interface AuditCriterion {
  id: string;
  category: 'Yasal Mevzuat' | 'Fiziki Çevre' | 'Elektronik Donanım' | 'Operasyon & Kriz';
  title: string;
  desc: string;
  points: number;
  lawRef: string;
  icon: string;
}

const AUDIT_CRITERIA: AuditCriterion[] = [
  {
    id: 'crit_5188',
    category: 'Yasal Mevzuat',
    title: '5188 Sayılı Kanun Valilik İzin Belgesi & Özel Güvenlik Kimlik Kartı',
    desc: 'Görev yapan personelin Emniyet Genel Müdürlüğü onaylı çalışma ruhsatı ve adli sicil temizliği.',
    points: 15,
    lawRef: '5188 Sayılı Kanun Madde 7 ve 10',
    icon: 'verified_user'
  },
  {
    id: 'crit_insurance',
    category: 'Yasal Mevzuat',
    title: 'Zorunlu Özel Güvenlik Mali Sorumluluk Sigortası',
    desc: 'Hırsızlık, sabotaj ve üçüncü şahıs zararlarına karşı siteyi koruyan kurumsal teminat poliçesi.',
    points: 15,
    lawRef: '5188 Sayılı Kanun Madde 21',
    icon: 'policy'
  },
  {
    id: 'crit_nizamiye',
    category: 'Fiziki Çevre',
    title: 'Nizamiye Ziyaretçi Kayıt, Kimlik Kontrolü & X-Ray / El Dedektörü',
    desc: 'Siteye giren her kurye, misafir ve taşeronun kimlik doğrulaması ve bagaj/paket araması yapılması.',
    points: 10,
    lawRef: 'Özel Güvenlik Uygulama Yönetmeliği',
    icon: 'badge'
  },
  {
    id: 'crit_lighting',
    category: 'Fiziki Çevre',
    title: 'Çevre Duvarı / Çit Yüksekliği (Min 2m) & LED Çevre Aydınlatması',
    desc: 'Karanlık bölge bırakmayan hareket sensörlü projektörler ve jiletli tel/lazer sınır güvenliği.',
    points: 10,
    lawRef: 'Binaların Yangından ve Sabotajdan Korunması Esasları',
    icon: 'lightbulb'
  },
  {
    id: 'crit_pts',
    category: 'Elektronik Donanım',
    title: 'Yapay Zeka Destekli Otomatik Plaka Tanıma Sistemi (PTS) & Bariyer',
    desc: 'Yabancı araç girişini engelleyen, misafir süresi sayan ve kara liste alarmı veren akıllı kamera.',
    points: 15,
    lawRef: 'Elektronik Güvenlik Standartları',
    icon: 'directions_car'
  },
  {
    id: 'crit_cctv',
    category: 'Elektronik Donanım',
    title: 'Kör Noktasız 4K Gece Görüşlü IP Kamera Ağı & 30 Günlük Şifreli Kayıt',
    desc: 'KVKK uyumlu, otopark, blok girişleri ve çocuk parklarını 7/24 izleyen NVR kayıt sistemi.',
    points: 15,
    lawRef: 'KVKK 6698 Sayılı Kanun ve Güvenlik Standartları',
    icon: 'videocam'
  },
  {
    id: 'crit_devriye',
    category: 'Operasyon & Kriz',
    title: 'GPS & RFID Destekli Anlık Devriye Tur Kontrol Kalemi',
    desc: 'Gece ve gündüz saat başı kritik kontrol noktalarının okutulması ve amir denetim raporu.',
    points: 10,
    lawRef: 'Özel Güvenlik Denetleme Başkanlığı Yönergesi',
    icon: 'security'
  },
  {
    id: 'crit_yangin',
    category: 'Operasyon & Kriz',
    title: 'Yangın Algılama, Sismik Doğalgaz Kesme & Acil Tahliye Planı',
    desc: 'Deprem sensörüyle gazı kesen solenoid vana, panik barlı yangın kapıları ve toplanma alanı.',
    points: 10,
    lawRef: 'Yangın Yönetmeliği Madde 112 & AFAD Kriterleri',
    icon: 'crisis_alert'
  }
];

export default function InteractiveSecurityRiskRadarSeo() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'crit_5188',
    'crit_nizamiye',
    'crit_cctv'
  ]);

  const toggleCriterion = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const totalScore = selectedIds.reduce((sum, id) => {
    const crit = AUDIT_CRITERIA.find((c) => c.id === id);
    return sum + (crit ? crit.points : 0);
  }, 0);

  const getEvaluation = () => {
    if (totalScore >= 85) {
      return {
        level: 'A+ Tam Güvenli & 5188 Lisanslı',
        badgeColor: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        strokeColor: '#10b981',
        description: 'Siteniz fiziki ve elektronik açıdan üst düzey korunuyor. Hukuki ve mali riskleriniz minimize edilmiş durumda.',
        ctaText: 'Güvenlik Standartlarınızı Korumak İçin Teklif Alın'
      };
    }
    if (totalScore >= 50) {
      return {
        level: 'Orta Seviye (Kritik Açıklar Mevcut)',
        badgeColor: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
        strokeColor: '#f59e0b',
        description: 'Sitenizde bazı güvenlik önlemleri var ancak yasal mali sorumluluk, kör nokta veya devriye takip zafiyetleri bulunuyor.',
        ctaText: 'Ücretsiz Güvenlik Açığı Keşif Raporu İsteyin'
      };
    }
    return {
      level: 'Yüksek Risk & Yasal Sorumluluk Tehlikesi',
      badgeColor: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
      strokeColor: '#f43f5e',
      description: 'Siteniz hırsızlık, yetkisiz giriş ve yasal tazminat davalarına karşı açık hedef durumunda. Acil 5188 profesyonel güvenlik protokolü gereklidir.',
      ctaText: 'Acil Güvenlik Risk Analizi ve Teklif Alın'
    };
  };

  const evalData = getEvaluation();
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Site ve Apartman 5188 Güvenlik Risk Skoru Hesaplayıcı',
    description: 'Sitenizin 5188 sayılı yasa, fiziki çevre, yapay zeka kamera ve acil durum tahliye standartlarına göre güvenlik açığı ve risk skorunu ölçün.',
    hasPart: AUDIT_CRITERIA.map((c, i) => ({
      '@type': 'Question',
      name: c.title,
      text: c.desc,
      position: i + 1
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">radar</span>
            <span>İnteraktif 5188 Güvenlik & Risk Analiz Testi</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
            Sitenizin <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400">Güvenlik ve Risk Skorunu</span> Hesaplayın
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-3">
            Aşağıdaki 8 kritik güvenlik kriterini işaretleyin; sitenizin yasal, fiziki ve teknolojik koruma seviyesini anında görün.
          </p>
        </div>

        {/* Main Grid: Left Questions, Right Live Score Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Checkbox List (8 Cols) */}
          <div className="lg:col-span-8 space-y-3.5">
            {AUDIT_CRITERIA.map((crit) => {
              const isChecked = selectedIds.includes(crit.id);
              return (
                <div
                  key={crit.id}
                  onClick={() => toggleCriterion(crit.id)}
                  className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-slate-500/5 dark:bg-white/5 border-slate-400 dark:border-slate-500 shadow-sm'
                      : 'bg-transparent border-gray-200/80 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950' : 'border border-gray-300 dark:border-white/20'
                  }`}>
                    {isChecked && <span className="material-symbols-outlined text-base">check</span>}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {crit.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        +{crit.points} Puan
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-[var(--color-primary)]">
                      {crit.title}
                    </h3>
                    <p className="text-xs text-[var(--color-secondary)] font-light mt-1 leading-relaxed">
                      {crit.desc}
                    </p>
                    <div className="inline-flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-2 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded">
                      <span className="material-symbols-outlined text-xs">gavel</span>
                      <span>{crit.lawRef}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Live Score Gauge & CTA (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-7 md:p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6 text-center">
            
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
              Sitenizin Güvenlik Skoru
            </span>

            {/* Circular Gauge */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke={evalData.strokeColor}
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{totalScore}</span>
                <span className="text-[11px] text-gray-400 font-medium">/ 100 Puan</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`px-3 py-1.5 rounded-full border text-xs font-bold inline-block ${evalData.badgeColor}`}>
              {evalData.level}
            </div>

            {/* Insight Text */}
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              {evalData.description}
            </p>

            {/* CTA Button */}
            <Link
              href="/teklif-al"
              className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 px-5 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs"
            >
              <span>{evalData.ctaText}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

            <span className="text-[10px] text-gray-400 block">
              🔒 T.C. İçişleri Bakanlığı 5188 Sayılı Kanun Uyumlu
            </span>

          </div>

        </div>

      </div>
    </>
  );
}
