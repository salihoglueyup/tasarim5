"use client";

import React from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';

interface FacilityComparisonRow {
  criteria: string;
  individualManagement: {
    status: 'negative' | 'warning' | 'positive';
    text: string;
  };
  aloYonetimIntegrated: {
    status: 'negative' | 'warning' | 'positive';
    text: string;
  };
  lawReference: string;
}

const COMPARISON_DATA: FacilityComparisonRow[] = [
  {
    criteria: 'KMK m.37 Şeffaf Bütçe, İşletme Projesi & Aidat Tahsilatı',
    individualManagement: {
      status: 'negative',
      text: 'Tahmini Excel tabloları, geciken aidatlar, komşuluk ilişkilerinin zedelenmesi ve %35-40 tahsilat açığı.'
    },
    aloYonetimIntegrated: {
      status: 'positive',
      text: 'Yasal tebliğli KMK m.37 işletme projesi, 3D Secure kredi kartı & otomatik SMS ile %99.2 düzenli tahsilat başarısı.'
    },
    lawReference: '634 Sayılı Kat Mülkiyeti Kanunu Madde 20 & 37'
  },
  {
    criteria: '5188 Lisanslı Özel Güvenlik & Valilik İzin Ruhsatı',
    individualManagement: {
      status: 'negative',
      text: 'Valilik izinsiz bekçi çalıştırma nedeniyle ağır idari para cezası riski; kimlik sorma ve arama yetkisizliği.'
    },
    aloYonetimIntegrated: {
      status: 'positive',
      text: 'T.C. İstanbul Valiliği 5188 izinli üniformalı lisanslı personel, AI plaka tanıma sistemi ve 7/24 devriye masası.'
    },
    lawReference: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun'
  },
  {
    criteria: 'Personel Kıdem Tazminatı, SGK & İSG Yasal Sorumluluğu',
    individualManagement: {
      status: 'negative',
      text: 'Yıllar içinde biriken astronomik kıdem tazminatı ve iş kazası sorumlulukları doğrudan kat maliklerinin şahsi mülküne rücu eder.'
    },
    aloYonetimIntegrated: {
      status: 'positive',
      text: 'Tüm kapıcı, temizlik ve güvenlik personellerinin kıdem/ihbar tazminatları şirketimizce üstlenilir; kat maliklerine 0 mali risk yansır.'
    },
    lawReference: '4857 Sayılı İş Kanunu & 6331 İSG Kanunu'
  },
  {
    criteria: 'Teknik Altyapı, Asansör Yeşil Etiket & 7/24 Mobil Mühendislik',
    individualManagement: {
      status: 'negative',
      text: 'Arıza anında dışarıdan usta arama, fahiş servis faturaları ve BEDAŞ/AYEDAŞ faturalarında reaktif güç cezaları.'
    },
    aloYonetimIntegrated: {
      status: 'positive',
      text: '45 dakikada acil mobil müdahale, A Tipi asansör yeşil etiket garantisi ve kompanzasyon takibiyle %0 reaktif ceza güvencesi.'
    },
    lawReference: 'Sanayi Bakanlığı Asansör Yönetmeliği (2019/30740)'
  },
  {
    criteria: 'Toplu Satın Alma Gücü ile Ortak Gider Tasarrufu',
    individualManagement: {
      status: 'negative',
      text: 'Tek bir bina olarak malzeme, yakıt, kimyasal ve asansör bakımında perakende liste fiyatından yüksek maliyet ödeme.'
    },
    aloYonetimIntegrated: {
      status: 'positive',
      text: 'Yüzlerce projeden oluşan satın alma hacmimizle ortak faturalarda, bakım anlaşmalarında ve sigortada %25 - %35 net tasarruf.'
    },
    lawReference: 'Toptan Tedarik & Ölçek Ekonomisi Standardı'
  },
  {
    criteria: 'Mobil Sakin Uygulaması, 7/24 Çağrı Merkezi & Denetim',
    individualManagement: {
      status: 'negative',
      text: 'WhatsApp gruplarında kargaşa, ulaşılamayan yöneticiler, kayıp makbuzlar ve denetimsiz kasa harcamaları.'
    },
    aloYonetimIntegrated: {
      status: 'positive',
      text: 'iOS/Android mobil uygulamadan tek tıkla aidat ödeme, arıza talebi açma, anlık gelir-gider dökümü ve 7/24 profesyonel çağrı merkezi.'
    },
    lawReference: 'ISO 9001:2015 & ISO 27001 Bilgi Güvenliği'
  }
];

export default function FacilityComparisonMatrixSeo({ className = "" }: { className?: string }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    about: 'Bireysel Apartman Yönetimi ile Alo Yönetim Profesyonel Tesis Yönetimi Karşılaştırma Matrisi',
    description: 'KMK 634 bütçe, 5188 güvenlik, teknik bakım ve aidat tasarrufu açısından amatör ve profesyonel tesis yönetim modellerinin analizi.'
  };

  return (
    <div className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-12 shadow-sm ${className}`}>
      <JsonLd data={schemaData} />

      {/* Başlık */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[var(--color-outline)]/60">
        <div>
          <span className="text-xs font-black text-slate-900 dark:text-slate-200 bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3">
            Hizmet & Maliyet Karşılaştırması
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
            Bireysel Yönetici vs. Alo Yönetim Entegre Tesis Yönetimi
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-2 max-w-2xl">
            Amatör site yönetimi modelleri ile kurumsal 634 KMK tesis işletmeciliği arasındaki hukuki, operasyonel ve maliyet farkları.
          </p>
        </div>

        <Link
          href="/teklif-al?hizmet=tesis-yonetimi"
          className="px-6 py-3.5 rounded-xl bg-[var(--color-primary)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0"
        >
          <span>Ücretsiz Bütçe Analizi İsteyin</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* Tablo */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--color-outline)]/60 text-xs font-black uppercase text-[var(--color-secondary)]">
              <th className="py-4 px-4 w-1/4">Yönetim & Hizmet Kriteri</th>
              <th className="py-4 px-4 w-3/8 text-rose-600 dark:text-rose-400">Bireysel / Amatör Yönetim</th>
              <th className="py-4 px-4 w-3/8 text-emerald-600 dark:text-emerald-400">Alo Yönetim Tesis İşletmesi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-outline)]/30 text-sm">
            {COMPARISON_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-4 font-bold text-[var(--color-primary)] align-top">
                  <div>{row.criteria}</div>
                  <div className="text-[11px] font-mono text-[var(--color-tertiary)] font-normal mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">gavel</span>
                    {row.lawReference}
                  </div>
                </td>
                <td className="py-5 px-4 text-xs font-light text-[var(--color-secondary)] bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 rounded-xl align-top">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-rose-500 text-base shrink-0 mt-0.5">cancel</span>
                    <span>{row.individualManagement.text}</span>
                  </div>
                </td>
                <td className="py-5 px-4 text-xs font-medium text-[var(--color-primary)] bg-emerald-500/5 dark:bg-emerald-950/20 rounded-xl align-top border border-emerald-500/30">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base shrink-0 mt-0.5">check_circle</span>
                    <span>{row.aloYonetimIntegrated.text}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
