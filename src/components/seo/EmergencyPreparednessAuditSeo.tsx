'use client';

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export interface AuditCheckItem {
  id: string;
  title: string;
  lawStandard: string;
  description: string;
  weight: number;
}

const EMERGENCY_CHECKLIST: AuditCheckItem[] = [
  {
    id: 'fire-extinguishers',
    title: 'Yangın Söndürme Tüpleri & Hidrant Basınç Testleri',
    lawStandard: 'Binaların Yangından Korunması Hakkında Yönetmelik (Madde 99)',
    description: 'Ortak alanlardaki yangın tüplerinin 6 aylık periyodik manometre kontrolü ve yıllık resmi dolum sertifikası geçerli mi?',
    weight: 20
  },
  {
    id: 'evacuation-plan',
    title: 'Acil Kaçış & Toplanma Alanı Tahliye Planı',
    lawStandard: '6331 Sayılı İSG Kanunu & AFAD Standartları',
    description: 'Bina girişinde ve kat hollerinde fosforlu acil çıkış yönlendirmeleri ile belediye onaylı afet toplanma alanı krokisi asılı mı?',
    weight: 15
  },
  {
    id: 'elevator-earthquake-sensor',
    title: 'Asansör Deprem & Yangın Acil Durum Sensörleri',
    lawStandard: 'TS EN 81-73 / 81-77 Deprem Standartları',
    description: 'Sarsıntı veya duman algılandığında asansörlerin otomatik olarak en yakın kata inip kapılarını açık bırakma sistemi devrede mi?',
    weight: 20
  },
  {
    id: 'shelter-readiness',
    title: 'Sığınak Havalandırma, Aydınlatma ve Su Rezervi',
    lawStandard: '3194 Sayılı İmar Kanunu Sığınak Yönetmeliği',
    description: 'Bina sığınağı depo veya şahsi işgalden arındırılmış, havalandırma filtresi ve acil durum aydınlatması çalışır durumda mı?',
    weight: 15
  },
  {
    id: 'generator-hydrant',
    title: 'Jeneratör & Yangın Hidroforu Otomatik Devreye Girme',
    lawStandard: 'Elektrik İç Tesisleri & Yangın Pompaları Yönetmeliği',
    description: 'Şebeke elektriği kesildiğinde jeneratör 10 saniye içinde yangın pompalarını ve acil aydınlatmayı besleyebiliyor mu?',
    weight: 15
  },
  {
    id: 'staff-certification',
    title: 'Güvenlik ve Teknik Personel Yangın & İlk Yardım Sertifikası',
    lawStandard: '5188 Sayılı Kanun & Sağlık Bakanlığı İlk Yardım Yönetmeliği',
    description: 'Sitede görev yapan personelin geçerli yangınla mücadele ve temel ilk yardım sertifikaları mevcut mu?',
    weight: 15
  }
];

export default function EmergencyPreparednessAuditSeo() {
  const [checkedIds, setCheckedIds] = useState<string[]>(['fire-extinguishers', 'elevator-earthquake-sensor']);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalScore = EMERGENCY_CHECKLIST.reduce((sum, item) => {
    return sum + (checkedIds.includes(item.id) ? item.weight : 0);
  }, 0);

  const getScoreStatus = () => {
    if (totalScore >= 85) return { text: 'YÜKSEK HAZIRLIK', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (totalScore >= 50) return { text: 'ORTA RİSK / EKSİKLER VAR', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { text: 'YÜKSEK RİSK / ACİL ÖNLEM GEREKLİ', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const status = getScoreStatus();

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Apartman ve Sitelerde Deprem ve Yangın Acil Durum Hazırlık Denetimi',
    description: 'İstanbul genelindeki sitelerde 6331 ve Yangın Yönetmeliğine uygun 6 maddelik acil durum hazırlık kontrol listesi.',
    step: EMERGENCY_CHECKLIST.map((item, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: item.title,
      text: item.description,
    })),
  };

  return (
    <section className="relative py-16 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-12">
      <JsonLd data={howToSchema} />

      {/* Arka Plan Işık Efekti */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">emergency</span>
            Bina Afet & Acil Durum Güvenlik Denetimi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Siteniz Depreme ve Yangına <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">Ne Kadar Hazır?</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            6 maddelik yasal denetim listesini işaretleyin; sitenizin acil durum hazırlık puanını ve eksik kalan kritik güvenlik adımlarını anında görün.
          </p>
        </div>

        {/* Skor Paneli */}
        <div className={`p-6 rounded-2xl border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${status.bg}`}>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mevcut Bina Afet Hazırlık Skoru:
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-white">
                %{totalScore}
              </span>
              <span className={`text-sm sm:text-base font-extrabold ${status.color}`}>
                {status.text}
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-xs text-slate-300">
              {checkedIds.length} / {EMERGENCY_CHECKLIST.length} Standart Karşılanıyor
            </div>
            <div className="w-48 h-2.5 bg-slate-900 rounded-full mt-2 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${totalScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6 Maddelik Denetim Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_CHECKLIST.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'border border-slate-700 bg-slate-800 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <div className="text-[11px] font-semibold text-slate-400">
                      Yasal Dayanak: {item.lawStandard}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alt Aksiyon & Ücretsiz Keşif Butonu */}
        <div className="mt-10 p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <div>
            <h4 className="text-base font-bold text-white">Sitenizde Yangın ve Deprem Risk Analizi Yaptırmak İster misiniz?</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Alo Yönetim teknik ve güvenlik denetçileri sitenizi yerinde inceleyerek ücretsiz risk raporu hazırlasın.
            </p>
          </div>
          <a
            href="/tr/iletisim"
            className="px-5 py-2.5 bg-rose-500 text-white font-bold rounded-xl text-xs sm:text-sm hover:brightness-110 transition-all flex-shrink-0 flex items-center gap-1.5 shadow-lg shadow-rose-500/25"
          >
            <span>Ücretsiz Afet Keşfi Talep Et</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

      </div>
    </section>
  );
}
