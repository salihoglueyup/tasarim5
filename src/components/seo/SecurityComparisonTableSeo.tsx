"use client";

import React from 'react';
import JsonLd from './JsonLd';

interface ComparisonRow {
  criteria: string;
  individualWatchman: {
    status: 'negative' | 'warning' | 'positive';
    text: string;
  };
  licensed5188Company: {
    status: 'negative' | 'warning' | 'positive';
    text: string;
  };
  lawReference: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    criteria: '5188 Sayılı Kanun Yasal Koruma & Kimlik Sorma Yetkisi',
    individualWatchman: {
      status: 'negative',
      text: 'Yasal yetkisi yoktur. Şüpheliyi durdurma, kimlik sorma, arama ve zapt etme hakkı bulunmaz (Sivil vatandaş statüsü).'
    },
    licensed5188Company: {
      status: 'positive',
      text: 'T.C. İçişleri Bakanlığı onaylı 5188 Kimlik Kartlı özel güvenlik personeli ile tam yasal yetki ve resmi üniformalı caydırıcılık.'
    },
    lawReference: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun Madde 7'
  },
  {
    criteria: 'Hukuki Sorumluluk & Tazminat / Hırsızlık Risk Teminatı',
    individualWatchman: {
      status: 'negative',
      text: 'Tüm hukuki ve mali sorumluluk doğrudan kat malikleri ve yöneticiye aittir. Hırsızlık ve hasarda şahsi dava açılması gerekir.'
    },
    licensed5188Company: {
      status: 'positive',
      text: 'Kurumsal Mesleki ve Mali Sorumluluk Sigortası ile tesisteki tüm maddi/fiziki güvenlik riskleri poliçe kapsamında tazmin edilir.'
    },
    lawReference: '5188 Sayılı Kanun Madde 21 (Zorunlu Mali Sorumluluk Sigortası)'
  },
  {
    criteria: 'Kıdem, İhbar Tazminatı & SGK İş Hukuku Yükümlülükleri',
    individualWatchman: {
      status: 'negative',
      text: 'Yıllar içinde biriken astronomik kıdem/ihbar tazminatları, yıllık izin ve fazla mesai davaları site bütçesine devasa yük getirir.'
    },
    licensed5188Company: {
      status: 'positive',
      text: 'Tüm personel SGK, kıdem, ihbar, yemek, yol ve özlük hakları şirketimiz sorumluluğundadır. Site sadece aylık KDV\'li hizmet faturasını öder.'
    },
    lawReference: '4857 Sayılı İş Kanunu ve 5510 Sayılı Sosyal Sigortalar Kanunu'
  },
  {
    criteria: '7/24 Kesintisiz Vardiya & Ani Rapor/İzin Durumunda Yedek Personel',
    individualWatchman: {
      status: 'negative',
      text: 'Personel hastalandığında, izne çıktığında veya işi bıraktığında güvenlik noktası günlerce boş kalır veya komşular nöbet tutmak zorunda kalır.'
    },
    licensed5188Company: {
      status: 'positive',
      text: 'Mobil operasyon merkezimizden 1 saat içinde aynı nitelikte yedek özel güvenlik personeli yönlendirilir; nizamiyede sıfır kesinti yaşanır.'
    },
    lawReference: 'Özel Güvenlik Hizmetleri Uygulama Yönetmeliği'
  },
  {
    criteria: 'Adli Sicil, Güvenlik Soruşturması & Psikoteknik Rapor',
    individualWatchman: {
      status: 'warning',
      text: 'Yönetimler detaylı arşiv ve emniyet güvenlik soruşturmasını derinlemesine yapamaz; psikolojik yeterlilik testi uygulanmaz.'
    },
    licensed5188Company: {
      status: 'positive',
      text: 'Emniyet Genel Müdürlüğü ve Valilik onaylı arşiv araştırması, adli sicil kaydı ve tam teşekküllü sağlık/psikoteknik raporu zorunludur.'
    },
    lawReference: '5188 Sayılı Kanun Madde 10 (Özel Güvenlik Görevlilerinde Aranacak Şartlar)'
  },
  {
    criteria: 'Yangın, İlk Yardım, Deprem ve Kriz Müdahale Eğitimi',
    individualWatchman: {
      status: 'negative',
      text: 'Temel acil durum, yangın söndürme ve cankurtaran/ilk yardım eğitimi genellikle bulunmaz.'
    },
    licensed5188Company: {
      status: 'positive',
      text: 'Alo Güvenlik Akademisi ve AFAD müfredatı uyumlu periyodik Yangın Eğitici Sertifikası, Sağlık Bakanlığı İlk Yardım ve Kriz İletişimi eğitimi.'
    },
    lawReference: 'Binaların Yangından Korunması Hakkında Yönetmelik'
  }
];

export default function SecurityComparisonTableSeo() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: 'Bireysel Bekçi vs 5188 Lisanslı Profesyonel Özel Güvenlik Şirketi Karşılaştırma Matrisi',
    description: 'Apartman ve site yönetimleri için bireysel kapıcı/bekçi istihdamı ile 5188 sayılı yasa kapsamında kurumsal özel güvenlik hizmeti almanın hukuki, mali ve operasyonel farkları.',
    about: {
      '@type': 'Service',
      name: 'Özel Güvenlik Yönetimi',
      serviceType: '5188 Lisanslı Özel Güvenlik Hizmetleri'
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">balance</span>
            <span>Yönetim Kurulu Karar Rehberi</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
            Bireysel Bekçi vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400">5188 Lisanslı Özel Güvenlik</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-3">
            Siteniz için karar vermeden önce hukuki sorumlulukları, tazminat risklerini ve yasal koruma yetkilerini karşılaştırın.
          </p>
        </div>

        {/* Responsive Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10">
                <th className="py-4 px-4 md:px-6 text-sm font-bold text-[var(--color-primary)] w-1/3">
                  Karşılaştırma Kriteri & Yasal Dayanak
                </th>
                <th className="py-4 px-4 md:px-6 text-sm font-bold text-rose-600 dark:text-rose-400 w-1/3 bg-rose-500/5 rounded-t-2xl">
                  Bireysel Bekçi / Kapıcı İstihdamı
                </th>
                <th className="py-4 px-4 md:px-6 text-sm font-bold text-emerald-600 dark:text-emerald-400 w-1/3 bg-emerald-500/5 rounded-t-2xl">
                  5188 Lisanslı Alo Yönetim Güvenliği
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-500/5 transition-colors">
                  
                  {/* Criteria & Law Reference */}
                  <td className="py-5 px-4 md:px-6 align-top">
                    <div className="font-bold text-[var(--color-primary)] text-sm md:text-base">
                      {row.criteria}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded-md">
                      <span className="material-symbols-outlined text-xs" aria-hidden="true">gavel</span>
                      <span>{row.lawReference}</span>
                    </div>
                  </td>

                  {/* Individual Watchman Column */}
                  <td className="py-5 px-4 md:px-6 align-top bg-rose-500/5">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-rose-500 text-lg shrink-0 mt-0.5" aria-hidden="true">
                        {row.individualWatchman.status === 'negative' ? 'cancel' : 'error'}
                      </span>
                      <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {row.individualWatchman.text}
                      </span>
                    </div>
                  </td>

                  {/* 5188 Licensed Company Column */}
                  <td className="py-5 px-4 md:px-6 align-top bg-emerald-500/5">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-emerald-500 text-lg shrink-0 mt-0.5" aria-hidden="true">
                        check_circle
                      </span>
                      <span className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {row.licensed5188Company.text}
                      </span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-base" aria-hidden="true">verified</span>
            <span>Tüm güvenlik sözleşmelerimiz T.C. İçişleri Bakanlığı EGM ve Valilik onaylı yasal şablonlara dayanır.</span>
          </div>
          <span className="font-semibold text-[var(--color-primary)]">
            Sıfır Hukuki Risk & Tam Bütçe Güvencesi
          </span>
        </div>

      </div>
    </>
  );
}
