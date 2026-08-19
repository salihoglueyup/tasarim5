"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';

interface CleaningCriterion {
  id: string;
  category: 'Ortak Alan & Bloklar' | 'Mekanik Zemin & Otopark' | 'İSG & Kimyasal Güvenliği' | 'Personel & Hukuki Sorumluluk';
  title: string;
  desc: string;
  points: number;
  lawRef: string;
  icon: string;
}

const CLEANING_CRITERIA: CleaningCriterion[] = [
  {
    id: 'crit_kimyasal_msds',
    category: 'İSG & Kimyasal Güvenliği',
    title: 'Sağlık Bakanlığı & TSE Onaylı Kimyasallar ve MSDS Güvenlik Formları',
    desc: 'Tüm temizlik ve dezenfeksiyon ürünlerinde Malzeme Güvenlik Bilgi Formu (MSDS) arşivi, renk kodlu mikrofiber bez sistemi (çapraz bulaşmayı önleme).',
    points: 15,
    lawRef: 'TSE 13811 Hijyen ve Sanitasyon Yönetim Standardı',
    icon: 'science'
  },
  {
    id: 'crit_isg_bordro',
    category: 'Personel & Hukuki Sorumluluk',
    title: '4857 Sayılı Kanun Uyumlu Taşeron / Tesis Yönetimi Sorumluluk Güvencesi',
    desc: 'Personelin kıdem, ihbar, SGK ve İSG risklerinin profesyonel yönetim şirketine devredilmesi, site yönetimine rücu etmeyen sıfır hukuki risk modeli.',
    points: 15,
    lawRef: '4857 Sayılı İş Kanunu & 6331 Sayılı İSG Kanunu',
    icon: 'verified_user'
  },
  {
    id: 'crit_otopark_otomat',
    category: 'Mekanik Zemin & Otopark',
    title: 'Binicili / İtmeli Endüstriyel Zemin Otomatı ile Periyodik Otopark Yıkama',
    desc: 'Kapalı ve açık otopark epoksi/helikopter perdahlı zeminlerin yağ sökücü kimyasallarla periyodik derinlemesine yıkanması ve vakumlanması.',
    points: 15,
    lawRef: 'Otopark Zemin Hijyen & Yangın Güvenlik Standardı',
    icon: 'local_car_wash'
  },
  {
    id: 'crit_asansor_dezenfeksiyon',
    category: 'Ortak Alan & Bloklar',
    title: 'Asansör Kabin, Buton & Giriş Holleri Günlük Dezenfeksiyon Protokolü',
    desc: 'Ortak temas yüzeylerinde (interkom, kapı kolları, tırabzanlar) günlük antiviral ve antibakteriyel yüzey dezenfeksiyonu uygulaması.',
    points: 15,
    lawRef: 'Halk Sağlığı Genel Müdürlüğü Ortak Alan Hijyen Rehberi',
    icon: 'cleaning_services'
  },
  {
    id: 'crit_atik_yonetimi',
    category: 'Ortak Alan & Bloklar',
    title: 'Sıfır Atık Belgesi & Ayrıştırılmış Çöp / Geri Dönüşüm Transferi',
    desc: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Sıfır Atık mevzuatına uygun renkli çöp kutuları ve günlük kapıdan atık toplama disiplini.',
    points: 10,
    lawRef: 'Çevre ve Şehircilik Bakanlığı Sıfır Atık Yönetmeliği',
    icon: 'recycling'
  },
  {
    id: 'crit_dis_cephe_cam',
    category: 'Mekanik Zemin & Otopark',
    title: 'Dış Cephe Cam Temizliği & Sepetli Platform / İple Erişim İSG İzni',
    desc: 'Yüksek binalarda ve plazalarda sertifikalı iple erişim uzmanları veya sepetli vinç ile yılda en az 2 kez dış cephe cam silimi.',
    points: 10,
    lawRef: 'Yapı İşlerinde İş Sağlığı ve Güvenliği Yönetmeliği',
    icon: 'window'
  },
  {
    id: 'crit_cop_bacasi_dezenfeksiyon',
    category: 'İSG & Kimyasal Güvenliği',
    title: 'Çöp Şutu & Konteyner Alanı Basınçlı Yıkama ve Koku Kontrolü',
    desc: 'Bina çöp bacaları ve konteyner yıkama alanlarının haftalık dezenfekte edilmesi, haşere ve larva oluşumuna karşı biyosidal ilaçlama entegrasyonu.',
    points: 10,
    lawRef: 'Biyosidal Ürünlerin Kullanım Usul ve Esasları Yönetmeliği',
    icon: 'delete_sweep'
  },
  {
    id: 'crit_denetim_formu',
    category: 'Personel & Hukuki Sorumluluk',
    title: 'QR Kodlu Dijital Kat Denetim & Hijyen Takip Çizelgesi',
    desc: 'Her kat, yangın merdiveni ve sığınakta temizlik personelinin günlük giriş-çıkış saatini kayıt altına alan dijital QR denetim sistemi.',
    points: 10,
    lawRef: 'ISO 9001:2015 & ISO 14001 Kalite ve Çevre Yönetim Sistemi',
    icon: 'qr_code_scanner'
  }
];

export default function InteractiveCleaningAuditRadarSeo({ districtName }: { districtName?: string } = {}) {
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'crit_kimyasal_msds',
    'crit_asansor_dezenfeksiyon'
  ]);
  const [selectedFilter, setSelectedFilter] = useState<string>('Tümü');

  const toggleCriterion = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalScore = CLEANING_CRITERIA.reduce((acc, curr) => {
    return checkedIds.includes(curr.id) ? acc + curr.points : acc;
  }, 0);

  const getScoreStatus = (score: number) => {
    if (score >= 85) {
      return {
        label: 'A+ MAKSİMUM HİJYEN VE KURUMSAL UYUMLULUK',
        badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        barColor: '#10b981',
        desc: 'Tesisinizin temizlik ve hijyen standartları TSE 13811 ve İSG mevzuatına tam uyumludur. Hukuki tazminat riski bulunmamaktadır.'
      };
    }
    if (score >= 60) {
      return {
        label: 'ORTA DÜZEY HİJYEN / ENDÜSTRİYEL EKİPMAN EKSİKLİĞİ',
        badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        barColor: '#f59e0b',
        desc: 'Temel alanlar temizlenmekte ancak makineleşme, otopark yıkama veya kimyasal MSDS arşivinde eksikler bulunmaktadır.'
      };
    }
    return {
      label: 'KRİTİK HİJYEN & İŞ HUKUKU TAZMİNAT RİSKİ',
      badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      barColor: '#ef4444',
      desc: 'Doğrudan istihdam edilen temizlik personelinin kıdem/ihbar sorumluluğu kat maliklerine aittir. Yetersiz hijyen şikayetleri ve İSG yaptırımı riski yüksektir.'
    };
  };

  const status = getScoreStatus(totalScore);

  const categories = ['Tümü', 'Ortak Alan & Bloklar', 'Mekanik Zemin & Otopark', 'İSG & Kimyasal Güvenliği', 'Personel & Hukuki Sorumluluk'];
  const filteredCriteria = selectedFilter === 'Tümü'
    ? CLEANING_CRITERIA
    : CLEANING_CRITERIA.filter((c) => c.category === selectedFilter);

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${districtName ? districtName + ' ' : ''}Site ve Tesis Temizlik Hijyen Uyumluluk Radarı 2026`,
    description: 'Site, rezidans ve apartmanlarda TSE 13811 hijyen standardı, zemin makineleri ve İSG mevzuat uyumunu ölçen 8 kriterli denetim motoru.',
    educationalUse: 'assessment',
    hasPart: CLEANING_CRITERIA.map((c) => ({
      '@type': 'Question',
      name: c.title,
      text: `${c.desc} (Yasal Dayanak: ${c.lawRef})`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uygulanıyor (Puan: ' + c.points + ')'
      }
    }))
  };

  return (
    <div className="my-12 p-8 md:p-12 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/40 shadow-xl relative overflow-hidden">
      <JsonLd data={quizSchema} />

      {/* Decorative gradient blur */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 mb-3">
          <span className="material-symbols-outlined text-sm">cleaning_services</span>
          <span>TSE 13811 & İSG HİJYEN DENETİM MOTORU</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
          {districtName ? `${districtName} ` : ''}Site ve Bina Temizlik & Hijyen Uygunluk Radarı
        </h2>
        <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-2 max-w-3xl">
          Tesisinizdeki temizlik operasyonunun standartlara uygunluğunu aşağıdaki 8 kritik kriter üzerinden test edin; anlık hijyen skorunuzu ve tazminat risk puanınızı hesaplayın.
        </p>
      </div>

      {/* Score Dashboard & Interactive Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 rounded-2xl p-6 md:p-8 mb-8 relative z-10">
        {/* SVG Circular Meter */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                className="stroke-gray-200 dark:stroke-white/10"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={status.barColor}
                strokeWidth="10"
                strokeDasharray={314.159}
                strokeDashoffset={314.159 - (314.159 * totalScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.5s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-[var(--color-primary)] tracking-tight">
                {totalScore}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-secondary)] mt-0.5">
                / 100 PUAN
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-[var(--color-secondary)] mt-3 text-center">
            {checkedIds.length} / {CLEANING_CRITERIA.length} Kriter Sağlandı
          </span>
        </div>

        {/* Dynamic Risk Analysis Box */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-black rounded-full border ${status.badgeClass}`}>
              {status.label}
            </span>
          </div>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light leading-relaxed">
            {status.desc}
          </p>
          <div className="pt-3 border-t border-gray-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[var(--color-secondary)] font-medium">
              <strong className="text-[var(--color-primary)]">Tazminat Garantisi:</strong> Alo Yönetim ile çalışan sitelerde temizlik personelinin tüm kıdem ve ihbar sorumluluğu %100 şirketimize aittir.
            </div>
            <Link
              href="/teklif-al"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs md:text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <span>Ücretsiz Hijyen Keşfi ve Teklif Al</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === cat
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-white/5 text-[var(--color-secondary)] hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Criteria Checkbox List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {filteredCriteria.map((crit) => {
          const isChecked = checkedIds.includes(crit.id);
          return (
            <div
              key={crit.id}
              onClick={() => toggleCriterion(crit.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                isChecked
                  ? 'bg-teal-500/10 border-teal-500/40 shadow-sm'
                  : 'bg-gray-50 dark:bg-white/5 border-gray-200/60 dark:border-white/10 opacity-75 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-lg ${isChecked ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'}`}>
                      {crit.icon}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider">
                      {crit.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400">
                      +{crit.points} Puan
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // Handled by parent div
                      className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[var(--color-primary)] mb-1">
                  {crit.title}
                </h4>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                  {crit.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-200/40 dark:border-white/5 flex items-center justify-between text-[11px] text-[var(--color-secondary)] font-medium">
                <span>Standart: {crit.lawRef}</span>
                <span className={isChecked ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-400'}>
                  {isChecked ? '✓ Mevcut' : '✗ Eksik'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
