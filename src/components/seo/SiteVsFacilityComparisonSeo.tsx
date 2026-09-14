"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

export interface ComparisonDimension {
  title: string;
  icon: string;
  siteFeature: string;
  facilityFeature: string;
  detailExplanation: string;
}

const COMPARISON_DIMENSIONS: ComparisonDimension[] = [
  {
    title: 'Hedef Gayrimenkul Türü',
    icon: 'home_work',
    siteFeature: 'Konut siteleri, apartmanlar, rezidanslar, villalar ve toplu konut yerleşkeleri.',
    facilityFeature: 'Plazalar, iş kuleleri, organize sanayi tesisleri, fabrikalar ve karma ticari mülkler.',
    detailExplanation: 'Site yönetimi konut sakinlerinin ortak yaşam alanlarına odaklanırken; tesis yönetimi ticari kuleler ve sanayi binalarının endüstriyel işletme süreçlerini kapsar.',
  },
  {
    title: 'Yasal Dayanak & Standartlar',
    icon: 'gavel',
    siteFeature: '634 Sayılı Kat Mülkiyeti Kanunu (KMK), Yönetim Planı ve Sulh Hukuk içtihatları.',
    facilityFeature: 'ISO 41001 Entegre Tesis Standardı, 6331 İSG, Ticaret Kanunu ve Kurumsal SLA.',
    detailExplanation: 'Site yönetiminde bütçe ve kararlar KMK 634 kanun maddelerine göre kesinleşir; kurumsal tesis yönetiminde ise uluslararası ISO 41001 KPI metrikleri bağlayıcıdır.',
  },
  {
    title: 'Karar Organı & Yetki',
    icon: 'groups',
    siteFeature: 'Kat Malikleri Kurulu (sayı ve arsa payı çoğunluğu), Denetçi ve Sakin Temsilcileri.',
    facilityFeature: 'Bina Maliki, Yatırım Fonu Yönetimi, Kurumsal Yönetim Kurulu veya Asset Manager.',
    detailExplanation: 'Sitelerde kararlar genel kurul divanında maliklerin oylarıyla alınırken, ticari tesislerde doğrudan varlık sahibi şirketin stratejik hedefleri uygulanır.',
  },
  {
    title: 'Temel Hedef & Başarı Metriği',
    icon: 'verified',
    siteFeature: '%99.2 aidat tahsilatı, komşuluk huzuru, şeffaf bütçe ve 45 dk acil mobil müdahale.',
    facilityFeature: '%30 işletme bütçesi tasarrufu, %0 reaktif elektrik cezası, kesintisiz HVAC & BMS.',
    detailExplanation: 'Konutlarda huzurlu yaşam ve düzenli aidat akışı esasken, ticari plazalarda kiracı memnuniyeti, enerji verimliliği ve gayrimenkulün değer artışı hedeflenir.',
  },
  {
    title: 'Kullanılan Yazılım & Teknoloji',
    icon: 'devices',
    siteFeature: 'Apsiyon Mobil Sakin Portalı, 3D Secure kredi kartı ödeme ve dijital karar oylama.',
    facilityFeature: 'BMS/SCADA bina otomasyonu, IoT kestirimci sensör takibi ve CAFM teknik yazılımı.',
    detailExplanation: 'Alo Yönetim, konut sitelerinde Apsiyon entegrasyonuyla sakinlerin cebine ulaşır; iş merkezlerinde ise merkezi otomasyon sistemlerini 7/24 izler.',
  },
  {
    title: 'Güvenlik & Operasyon Kapsamı',
    icon: 'shield_person',
    siteFeature: '5188 Lisanslı nizamiye güvenliği, plaka tanıma, havuz, peyzaj ve kat temizliği.',
    facilityFeature: 'X-Ray & turnike kontrolü, yangın otomasyonu, resepsiyon & A Tipi asansör işletmesi.',
    detailExplanation: 'Sitelerde yabancı araç/misafir kontrolü ve bahçe bakımı ön plandayken; plazalarda kurumsal karşılama, yükleme rampası ve yangın güvenliği esastır.',
  },
];

interface SiteVsFacilityComparisonSeoProps {
  currentPillar?: 'site' | 'facility';
  className?: string;
}

export default function SiteVsFacilityComparisonSeo({
  currentPillar = 'site',
  className = '',
}: SiteVsFacilityComparisonSeoProps) {
  const [activeDecision, setActiveDecision] = useState<'site' | 'facility'>(currentPillar);

  // Schema.org Table & FAQPage
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    about: 'Site Yönetimi ile Entegre Tesis Yönetimi Arasındaki Farklar Karşılaştırma Tablosu',
    description: '634 Sayılı KMK konut yönetimi ile ISO 41001 kurumsal tesis işletmeciliği arasındaki 6 temel farkın analizi.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Site yönetimi ile tesis yönetimi arasındaki fark nedir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Site yönetimi, 634 sayılı Kat Mülkiyeti Kanunu kapsamında çok bağımsız bölümlü konutların aidat tahsilatı, 5188 güvenliği, temizlik ve genel kurul süreçlerini yürütür. Tesis yönetimi ise ISO 41001 standartlarında plaza, iş merkezi ve sanayi binalarının HVAC, otomasyon, enerji verimliliği ve teknik işletmesini tek merkezden yönetir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bizim binamız için site yönetimi mi yoksa tesis yönetimi mi gereklidir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eğer mülkünüz ağırlıklı olarak dairelerden ve yaşam alanlarından oluşuyorsa (apartman, rezidans, site) Profesyonel Site Yönetimi modeli uygulanır. Plaza, iş merkezi, fabrika veya ticari kiracıların bulunduğu karma yapılarda ise Entegre Tesis Yönetimi modeli gereklidir.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={[comparisonSchema, faqSchema]} />

      <section
        id="karsilastirma"
        className={`w-full bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-sm ${className}`}
      >
        {/* Üst Başlık & Rozet */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-base text-brand-600 dark:text-brand-400" aria-hidden="true">
              compare_arrows
            </span>
            <span>Otorite Karşılaştırma Rehberi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Site Yönetimi ile Tesis Yönetimi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600 dark:from-brand-400 dark:via-sky-400 dark:to-indigo-300">
              Arasındaki Fark Nedir?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] font-light mt-3 leading-relaxed">
            Kat malikleri, bina yöneticileri ve kurumsal mülk sahipleri için doğru yönetim modelini belirleme tablosu.
            Gayrimenkulünüzün niteliğine göre mevzuat, teknoloji ve operasyonel ayrışmalar:
          </p>
        </div>

        {/* Karşılaştırma Tablosu (Google Position Zero Optimize) */}
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/30 mb-12">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]">
                <th className="p-4 sm:p-5 text-xs sm:text-sm font-extrabold text-[var(--color-primary)] uppercase tracking-wider w-1/4">
                  Karşılaştırma Kriteri
                </th>
                <th className="p-4 sm:p-5 text-xs sm:text-sm font-extrabold text-brand-600 dark:text-brand-400 uppercase tracking-wider w-3/8 bg-brand-50/50 dark:bg-brand-950/20">
                  🏢 Profesyonel Site Yönetimi (Konut)
                </th>
                <th className="p-4 sm:p-5 text-xs sm:text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider w-3/8 bg-indigo-50/50 dark:bg-indigo-950/20">
                  🏭 Entegre Tesis Yönetimi (B2B/Ticari)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-outline)]/40 text-xs sm:text-sm">
              {COMPARISON_DIMENSIONS.map((dim, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[var(--color-surface-variant)]/40 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-bold text-[var(--color-primary)] flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-slate-500 dark:text-slate-400" aria-hidden="true">
                      {dim.icon}
                    </span>
                    <span>{dim.title}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-[var(--color-secondary)] leading-relaxed bg-brand-50/20 dark:bg-brand-950/10">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{dim.siteFeature}</p>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-light">{dim.detailExplanation}</p>
                  </td>
                  <td className="p-4 sm:p-5 text-[var(--color-secondary)] leading-relaxed bg-indigo-50/20 dark:bg-indigo-950/10">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{dim.facilityFeature}</p>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-light">Endüstriyel KPI & kurumsal garanti güvencesi.</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hangi Modeli Seçmelisiniz? İnteraktif Yönlendirme Kartı */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-[2rem] p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold tracking-widest text-brand-400 uppercase">
                  Gayrimenkulünüz İçin Hızlı Karar Verin
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1">
                  Binanız İçin Hangi Çözüm Doğru?
                </h3>
              </div>
              <div className="inline-flex rounded-xl p-1 bg-white/10 backdrop-blur-sm border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveDecision('site')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeDecision === 'site'
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Konut & Apartman
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDecision('facility')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeDecision === 'facility'
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Plaza & İş Merkezi
                </button>
              </div>
            </div>

            {activeDecision === 'site' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-brand-300">
                    🏢 Konut ve Apartmanlar İçin: Profesyonel Site Yönetimi
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    Kat mülkiyeti kanununa tam uyum, %99.2 aidat tahsilat güvencesi, Apsiyon mobil sakin portalı,
                    5188 lisanslı güvenlik ve 45 dakika acil teknik servis filosu ile komşuluk ilişkilerini zedelemeden
                    sitenizi kurumsal güvenceyle yönetelim.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                  <Link
                    href="/hizmetler/site-yonetimi"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center"
                  >
                    <span>Site Yönetimi Detayları</span>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                  </Link>
                  <Link
                    href="/teklif-al"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all text-center"
                  >
                    <span>Ücretsiz Site Keşfi İste</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-indigo-300">
                    🏭 Ticari Plazalar ve İş Merkezleri İçin: Entegre Tesis Yönetimi
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    ISO 41001 sertifikalı teknik işletme, BMS/HVAC otomasyonu, enerji verimliliği, reaktif güç cezası
                    koruması ve kurumsal SLA taahhüdü ile tesisinizin işletme maliyetlerini %30 düşürüp gayrimenkul değerini artıralım.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                  <Link
                    href="/hizmetler/tesis-yonetimi"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center"
                  >
                    <span>Tesis Yönetimi Detayları</span>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                  </Link>
                  <Link
                    href="/teklif-al"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all text-center"
                  >
                    <span>Kurumsal RFP / Keşif İste</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
