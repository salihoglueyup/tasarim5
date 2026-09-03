"use client";

import React from 'react';
import JsonLd from './JsonLd';

export interface SlaGuaranteeItem {
  id: string;
  icon: string;
  badge: string;
  title: string;
  guaranteeText: string;
  details: string[];
  legalReference: string;
  borderGlow: string;
}

const GUARANTEES_DATA: SlaGuaranteeItem[] = [
  {
    id: 'sla-45min',
    icon: 'timer',
    badge: '45 Dakika SLA Garantisi',
    title: 'Acil Teknik & Güvenlik Müdahale Taahhüdü',
    guaranteeText: 'Kritik arızalarda (asansörde kalma, ana hidrofor/su baskını, jeneratör devre dışı kalma veya güvenlik alarmı) maksimum 45 dakika içinde sertifikalı mühendis ve teknik ekibimiz sahada fiziki müdahaleye başlar.',
    details: [
      '39 ilçede konuşlanmış 7/24 mobil nöbetçi teknik filosu.',
      'Sakin mobil uygulamasından tek tıkla acil arıza kaydı ve anlık konum takibi.',
      'SLA süresi aşımı durumunda aylık yönetim işletme bedelinde sözleşmeli indirim.'
    ],
    legalReference: 'ISO 41001 Standardı & Sözleşmeli SLA Protokolü',
    borderGlow: 'hover:border-blue-500/50 hover:shadow-blue-500/10'
  },
  {
    id: 'sla-zero-penalty',
    icon: 'bolt',
    badge: '%100 Ceza Tazminat Güvencesi',
    title: 'Sıfır Reaktif Enerji & Fatura Koruması',
    guaranteeText: 'Tesisinizin kompanzasyon panosu ve elektrik sayaçları IoT uzaktan telemetri ile 7/24 izlenir. Şirketimiz takibindeyken oluşabilecek her türlü reaktif enerji cezasını şirketimiz %100 nakden tazmin eder.',
    details: [
      'Gecikmeli reaktif/kapasitif limit aşımında anlık otomatik mühendis uyarısı.',
      'Elektrik faturalarında yıllık ortalama %15 ile %25 arasında net tasarruf.',
      'TEDAŞ ve elektrik dağıtım şirketleri nezdinde resmi itiraz ve mahsuplaşma yönetimi.'
    ],
    legalReference: 'EPDK Elektrik Piyasası Tarifeler Yönetmeliği',
    borderGlow: 'hover:border-amber-500/50 hover:shadow-amber-500/10'
  },
  {
    id: 'sla-zero-risk',
    icon: 'shield_person',
    badge: 'Sıfır Hukuki & Kıdem Riski',
    title: 'Personel Tazminatı & SGK İşveren Güvencesi',
    guaranteeText: 'Sitede görev yapan temizlik, güvenlik ve teknik personelin tüm SGK primleri, maaşları, kıdem ve ihbar tazminatları Alo Grup tüzel kişiliği güvencesindedir. Kat maliklerine hiçbir şahsi hukuki sorumluluk rücu etmez.',
    details: [
      '4857 Sayılı İş Kanunu ve 6331 İSG mevzuatına %100 tam uyumlu bordrolama.',
      'Personel ayrılışlarında veya emeklilikte kıdem tazminatı fonu şirketimizce karşılanır.',
      'Apartman yöneticisinin şahsi hapis veya icra riskleri kurumsal olarak sıfırlanır.'
    ],
    legalReference: '4857 Sayılı İş Kanunu & 6331 Sayılı İSG Kanunu',
    borderGlow: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10'
  }
];

export default function FacilityCorporateSlaGuaranteesSeo() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Alo Yönetim Resmi Kurumsal SLA ve Hukuki Garanti Taahhütnamesi',
    description: '45 dakika acil müdahale SLA, %100 reaktif ceza muafiyeti ve sıfır kıdem tazminatı riski resmi sözleşme taahhütleri.',
    itemListElement: GUARANTEES_DATA.map((g, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: g.title,
      description: g.guaranteeText
    }))
  };

  return (
    <div className="my-16 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-[3.5rem] p-6 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-slate-200 border border-white/20 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm text-emerald-400" aria-hidden="true">verified</span>
          <span>Sözleşmeyle İmza Altına Alınan Resmi Taahhütler</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          3 Büyük <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">Kurumsal SLA ve Hukuki Garanti</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-light mt-2">
          Alo Yönetim ile çalışan hiçbir kat maliki veya yöneticisi beklenmeyen fatura cezası, arıza mağduriyeti veya personel tazminatıyla karşılaşmaz.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {GUARANTEES_DATA.map((g) => (
          <div
            key={g.id}
            className={`p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between gap-6 transition-all duration-300 ${g.borderGlow} hover:bg-white/10`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">{g.icon}</span>
                </span>
                <span className="text-[11px] font-bold font-mono px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/15">
                  {g.badge}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white leading-snug">{g.title}</h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {g.guaranteeText}
              </p>

              <ul className="space-y-2 pt-2">
                {g.details.map((d, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] text-slate-400 block font-medium">
                Resmi Dayanak: {g.legalReference}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
