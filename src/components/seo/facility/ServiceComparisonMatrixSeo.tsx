"use client";

import React from 'react';
import JsonLd from '@/components/seo/schema/JsonLd';
import { BASE_URL } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

const TX_MAP: Record<string, string> = {
  "Hukuki ve Mevzuat Uyumu": "scm_1",
  "Kulaktan dolma bilgiler, KMK 634 ve 5188 sayılı kanun riskleri": "scm_2",
  "Uzman hukukçu kadrosu, %100 KMK ve 5188 kanuni uyum garantisi": "scm_3",
  "Aidat Takibi & Tahsilat": "scm_4",
  "Elden/dekontla takip, geciken ödemeler, komşuluk ilişkilerinde sürtüşme": "scm_5",
  "Dijital sakin uygulaması, anlık bildirim, gecikmede otomatik yasal icra süreci": "scm_6",
  "7/24 Acil Teknik & Arıza": "scm_7",
  "Yöneticinin şahsi telefonuna bağımlılık, geç ve pahalı usta çağırma": "scm_8",
  "7/24 Çağrı ve Operasyon Merkezi, nöbetçi teknik ekip, anlaşmalı tedarikçi fiyatları": "scm_9",
  "Mali Şeffaflık & Denetim": "scm_10",
  "Yılda bir kez karmaşık defter özeti, denetim zorluğu": "scm_11",
  "Her ay detaylı gelir-gider faaliyet raporu, işletme projesi şeffaflığı": "scm_12",
  "Personel & Güvenlik Yönetimi": "scm_13",
  "Kayıtsız/eğitimsiz eleman çalıştırma, kıdem tazminatı riski": "scm_14",
  "5188 belgeli özel güvenlik, bordrolu ve sigortalı 200+ uzman personel, sıfır tazminat riski": "scm_15",
  "Kalite Standartları & Güvence": "scm_16",
  "Kurumsal akreditasyon veya kalite belgesi yok": "scm_17",
  "ISO 14001, 45001, 10002, 22301, 31000 ve 26000 (BELCERT, ILAS akrediteli)": "scm_18",
  "Geleneksel Site Yönetimi vs. Alo Yönetim": "scm_19",
  "Neden İstanbul'da 200+ tesis Alo Yönetim'i tercih ediyor?": "scm_20",
  "Kriter": "scm_21",
  "Geleneksel / Bireysel Yönetim": "scm_22",
  "Alo Yönetim Profesyonel Hizmet": "scm_23",
};

interface ComparisonRow {
  feature: string;
  traditional: string;
  aloYonetim: string;
}

interface ServiceComparisonMatrixSeoProps {
  title?: string;
  subtitle?: string;
  rows?: ComparisonRow[];
  className?: string;
}

const DEFAULT_ROWS: ComparisonRow[] = [
  {
    feature: "Hukuki ve Mevzuat Uyumu",
    traditional: "Kulaktan dolma bilgiler, KMK 634 ve 5188 sayılı kanun riskleri",
    aloYonetim: "Uzman hukukçu kadrosu, %100 KMK ve 5188 kanuni uyum garantisi"
  },
  {
    feature: "Aidat Takibi & Tahsilat",
    traditional: "Elden/dekontla takip, geciken ödemeler, komşuluk ilişkilerinde sürtüşme",
    aloYonetim: "Dijital sakin uygulaması, anlık bildirim, gecikmede otomatik yasal icra süreci"
  },
  {
    feature: "7/24 Acil Teknik & Arıza",
    traditional: "Yöneticinin şahsi telefonuna bağımlılık, geç ve pahalı usta çağırma",
    aloYonetim: "7/24 Çağrı ve Operasyon Merkezi, nöbetçi teknik ekip, anlaşmalı tedarikçi fiyatları"
  },
  {
    feature: "Mali Şeffaflık & Denetim",
    traditional: "Yılda bir kez karmaşık defter özeti, denetim zorluğu",
    aloYonetim: "Her ay detaylı gelir-gider faaliyet raporu, işletme projesi şeffaflığı"
  },
  {
    feature: "Personel & Güvenlik Yönetimi",
    traditional: "Kayıtsız/eğitimsiz eleman çalıştırma, kıdem tazminatı riski",
    aloYonetim: "5188 belgeli özel güvenlik, bordrolu ve sigortalı 200+ uzman personel, sıfır tazminat riski"
  },
  {
    feature: "Kalite Standartları & Güvence",
    traditional: "Kurumsal akreditasyon veya kalite belgesi yok",
    aloYonetim: "ISO 14001, 45001, 10002, 22301, 31000 ve 26000 (BELCERT, ILAS akrediteli)"
  }
];

/**
 * Hizmet Karşılaştırma & Information Gain Matrisi (ServiceComparisonMatrixSeo)
 * 
 * "Geleneksel Amatör Yöneticilik vs. Alo Yönetim Profesyonel Tesis Yönetimi"
 * karşılaştırmasını semantik `Table` ve `ItemList` şemasıyla sunar.
 * ChatGPT, Perplexity ve Google AI Overviews'ın tablo olarak alıntılamasını sağlar.
 */
export default function ServiceComparisonMatrixSeo({
  title = "Geleneksel Site Yönetimi vs. Alo Yönetim",
  subtitle = "Neden İstanbul'da 200+ tesis Alo Yönetim'i tercih ediyor?",
  rows = DEFAULT_ROWS,
  className = ""
}: ServiceComparisonMatrixSeoProps) {
  const { t } = useLanguage();
  const tx = (s: string): string => {
    const k = TX_MAP[s];
    return k ? t(k as Parameters<typeof t>[0]) : s;
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: subtitle,
    url: `${BASE_URL}/hakkimizda`,
    itemListElement: rows.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.feature,
      description: `Geleneksel: ${r.traditional} | Alo Yönetim: ${r.aloYonetim}`
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`my-12 overflow-hidden ${className}`}>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-primary)]">
            {tx(title)}
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] mt-2 font-light">
            {tx(subtitle)}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm bg-white dark:bg-zinc-900/90">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-800/80 border-b border-slate-200 dark:border-white/10 text-xs md:text-sm font-bold">
                <th className="p-4 md:p-5 text-slate-700 dark:text-slate-200 w-1/3">{tx('Kriter')}</th>
                <th className="p-4 md:p-5 text-rose-600 dark:text-rose-400 w-1/3">{tx('Geleneksel / Bireysel Yönetim')}</th>
                <th className="p-4 md:p-5 text-emerald-600 dark:text-emerald-400 w-1/3 bg-emerald-500/5">{tx('Alo Yönetim Profesyonel Hizmet')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs md:text-sm">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-semibold text-slate-900 dark:text-white">
                    {tx(row.feature)}
                  </td>
                  <td className="p-4 md:p-5 text-slate-500 dark:text-slate-400 font-light">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-rose-500 text-base shrink-0 mt-0.5" aria-hidden="true">close</span>
                      <span>{tx(row.traditional)}</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 text-slate-800 dark:text-slate-200 font-medium bg-emerald-500/5">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-emerald-500 text-base shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                      <span>{tx(row.aloYonetim)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

