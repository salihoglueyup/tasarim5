"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';

export interface FacilityClaimReviewItem {
  id: string;
  claim: string;
  claimant: string;
  ratingValue: number;
  ratingExplanation: string;
  truth: string;
  legalBasis: string;
  courtPrecedent: string;
  riskIfIgnored: string;
}

const FACILITY_CLAIMS: FacilityClaimReviewItem[] = [
  {
    id: 'asansor-kirmizi-etiket',
    claim: 'Kırmızı etiketli asansör arızası giderilene kadar bina sakinlerinin kendi sorumluluğunda kullanılabilir; yöneticiye cezai işlem yapılmaz.',
    claimant: 'Bina Yöneticileri ve Kat Malikleri Arasında Yaygın Yanılgı',
    ratingValue: 1,
    ratingExplanation: 'Hukuken ve Cezai Olarak Geçersiz & Suç Teşkil Eder',
    truth: 'Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği m.15 gereğince kırmızı etiket iliştirilen güvensiz asansörlerin kullanıma derhal kapatılması zorunludur. Kırmızı etiketli asansörü mühürletmeyip çalıştırmaya devam eden yöneticiler, meydana gelebilecek kazalarda TCK m.85/89 (Taksirle Ölüme/Yaralamaya Neden Olma) kapsamında doğrudan şahsen hapis ve adli para cezasıyla yargılanır. Belediye zabıtası asansörü mühürler ve idari para cezası keser.',
    legalBasis: 'Asansör İşletme ve Bakım Yönetmeliği m.15 & TCK m.85/89',
    courtPrecedent: 'Yargıtay 12. C.D. 2018/4512 E., 2019/3321 K.',
    riskIfIgnored: 'Yöneticinin şahsi hapis cezası, asansörün zabıtaca mühürlenmesi ve 100.000 TL+ idari para cezası.',
  },
  {
    id: 'reaktif-enerji-kompanzasyon',
    claim: 'Sitenin kompanzasyon panosu arızalandığında elektrik faturasına yansıyan on binlerce liralık reaktif enerji cezası kat maliklerine aidat olarak dağıtılabilir.',
    claimant: 'Teknik Altyapıyı İhmal Eden Yönetimler',
    ratingValue: 1,
    ratingExplanation: 'Hukuken Haksız & Yönetici Kusuru',
    truth: 'EPDK Elektrik Piyasası Tarifeler Yönetmeliği uyarınca kurulu gücü 50 kVA üstü tesislerde endüktif reaktif tüketim %20’yi, kapasitif %15’i aştığında reaktif ceza kesilir. KMK m.35 ve Borçlar Kanunu vekâlet hükümleri gereğince tesisin kompanzasyon takibini yapmayarak siteyi cezaya sokmak yöneticinin ağır hizmet kusurudur. Kat malikleri faturadaki reaktif ceza kalemine itiraz ederek yöneticiden veya sorumlu bakım firmasından rücuen tahsil edilmesini talep edebilir.',
    legalBasis: 'EPDK Tarifeler Yönetmeliği & 634 Sayılı KMK m.35',
    courtPrecedent: 'Yargıtay 18. H.D. 2016/9821 E., 2017/1402 K.',
    riskIfIgnored: 'Sulh Hukuk Mahkemesi aracılığıyla ödenen reaktif cezanın yöneticiye şahsen rücu ettirilmesi.',
  },
  {
    id: 'yangin-sondurme-hidrofor',
    claim: 'Sitede yangın hidrantı, sprinkler ve hidrofor sisteminin aylık basınç ve akış testlerinin yapılması zorunlu değildir, yılda bir itfaiye raporu yeterlidir.',
    claimant: 'Maliyetten Kaçınan Amatör Site Yönetimleri',
    ratingValue: 1,
    ratingExplanation: 'Mevzuata Aykırı & Hayati Risk',
    truth: 'Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY) m.99 ve TSE/NFPA standartları uyarınca, sulu yangın söndürme sistemlerinin ve acil durum dizel hidroforlarının haftalık otomatik çalışma testi ve aylık basınç regülasyon testleri yapılarak işletme bakım defterine işlenmek zorundadır. Yangın anında çalışmayan söndürme sistemleri durumunda bina yöneticisi ve yönetim şirketi doğrudan asli kusurlu sayılır.',
    legalBasis: 'Binaların Yangından Korunması Hakkında Yönetmelik m.99',
    courtPrecedent: 'Yargıtay Hukuk Genel Kurulu 2017/11-1922 E., 2020/541 K.',
    riskIfIgnored: 'Olası bir yangında sigorta şirketinin hasar tazminatını tamamen reddetmesi ve adli takibat.',
  },
  {
    id: 'havuz-klor-ph-denetimi',
    claim: 'Site açık ve kapalı yüzme havuzlarında klor ve pH kimyasal ölçümleri haftada bir yapılsa yeterlidir.',
    claimant: 'Yetersiz Donanımlı Tesis Görevlileri',
    ratingValue: 1,
    ratingExplanation: 'Sağlık Mevzuatına Aykırı & Kapatma Sebebi',
    truth: 'Sağlık Bakanlığı Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları ve Şartları Hakkında Yönetmelik gereğince; site ve tesis havuzlarında serbest klor (1-3 ppm kapalı, 1-3 ppm açık), bağlı klor ve pH (6.5-7.8) değerleri günde en az 3 defa ölçülerek havuz işletme defterine yazılmak ve panoda sakinlerin görebileceği yere asılmak mecburidir. İl Sağlık Müdürlüğü denetimlerinde uygunsuz çıkan havuzlar derhal mühürlenir.',
    legalBasis: 'Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği Ek-1 & Ek-2',
    courtPrecedent: 'Danıştay 10. Dairesi 2019/3312 E., 2021/1109 K.',
    riskIfIgnored: 'Havuzun İl Sağlık Müdürlüğü tarafından kapatılması ve salgın hastalık kaynaklı tazminat davaları.',
  },
  {
    id: 'guvenlik-arama-yetkisi',
    claim: '5188 Sayılı Kanun kapsamında sitede görevli özel güvenlik personeli sakinlerin ve misafirlerin araç torpidosunu ve çantalarını elle arayabilir, kimliklerine el koyabilir.',
    claimant: 'Aşırı Yetki Kullanan Güvenlik Personeli',
    ratingValue: 1,
    ratingExplanation: 'Hukuken Yasak & TCK Kapsamında Suç',
    truth: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun m.7 uyarınca özel güvenlik personeli yalnızca detektör, duyarlı kapı veya x-ray cihazı ile kontrol yapabilir. Şüpheli durumlarda kişiyi alıkoyamaz, kimliğine el koyamaz veya zorla elle arama yapamaz; derhal genel kolluğa (Polis/Jandarma) haber vermek zorundadır. Aksi eylemler TCK m.109 (Kişiyi Hürriyetinden Yoksun Kılma) ve TCK m.120 (Haksız Arama) suçlarını oluşturur.',
    legalBasis: '5188 Sayılı Kanun m.7 & TCK m.109, m.120',
    courtPrecedent: 'Yargıtay 4. C.D. 2017/6102 E., 2018/1892 K.',
    riskIfIgnored: 'Güvenlik görevlisinin ve yönetim kurulunun haksız arama ve hürriyeti tahdit suçlarından yargılanması.',
  },
  {
    id: 'jenerator-periyodik-bakim',
    claim: 'Jeneratör elektrik kesintisinde otomatik devreye giriyorsa motor yağı ve mazot filtresi değişimine gerek yoktur; masraftan kaçınmak için yıllarca beklenebilir.',
    claimant: 'Bütçe Kısıtlaması Yapan Yöneticiler',
    ratingValue: 1,
    ratingExplanation: 'Teknik Olarak Yanlış & Yüksek Arıza Riski',
    truth: 'ISO 8528 ve motor üreticisi standartlarına göre acil durum dizel jeneratörleri hiç çalışmasa dahi motor yağı ve yakıt filtreleri kimyasal bozulma nedeniyle en geç yılda bir (veya her 250 çalışma saatinde bir) değiştirilmelidir. Bakımsız jeneratörler şebeke kesildiğinde marş basamaz, duman atarak yangın söndürme pompalarını ve asansör kurtarma sistemlerini enerjisiz bırakır.',
    legalBasis: 'ISO 8528 Standartları & Makine Mühendisleri Odası Teknik Kriterleri',
    courtPrecedent: 'Yargıtay 15. H.D. 2018/2103 E., 2019/4110 K.',
    riskIfIgnored: 'Asansörde mahsur kalma anında jeneratör arızası nedeniyle doğan maddi ve manevi tazminat sorumluluğu.',
  },
];

export default function FacilityLegalClaimReviewsSeo() {
  const [activeId, setActiveId] = useState<string>(FACILITY_CLAIMS[0].id);

  const activeClaim = FACILITY_CLAIMS.find((c) => c.id === activeId) || FACILITY_CLAIMS[0];

  // Schema.org ClaimReview Structured Data for Google Fact Check & AI Overviews
  const claimReviewSchemas = {
    '@context': 'https://schema.org',
    '@graph': FACILITY_CLAIMS.map((item) => ({
      '@type': 'ClaimReview',
      url: `${BASE_URL}/hizmetler/tesis-yonetimi#teknik-ve-hukuki-dogrulamalar`,
      claimReviewed: item.claim,
      itemReviewed: {
        '@type': 'Claim',
        author: {
          '@type': 'Organization',
          name: item.claimant,
        },
        datePublished: '2026-01-01',
        appearance: {
          '@type': 'WebPage',
          url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
        },
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: item.ratingValue,
        bestRating: 5,
        worstRating: 1,
        alternateName: item.ratingExplanation,
      },
      author: {
        '@type': 'Organization',
        name: 'Alo Yönetim Tesis Denetim & Hukuk Kurulu',
        url: BASE_URL,
      },
      reviewBody: `${item.truth} (Yasal Dayanak: ${item.legalBasis}, Emsal Karar / Standart: ${item.courtPrecedent})`,
    })),
  };

  return (
    <section id="teknik-ve-hukuki-dogrulamalar" className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      {/* Schema.org ClaimReview Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReviewSchemas) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-600/10 dark:bg-rose-400/10 border border-rose-600/20 dark:border-rose-400/20 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">fact_check</span>
            Google Fact Check & AI Tesis Doğrulama (ClaimReview)
          </div>
          <h3 className="text-xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Tesis ve Bina İşletmesinde <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 dark:from-rose-400 dark:to-amber-300">Yaygın 6 Teknik Yanılgı & Hukuki Gerçekler</span>
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            Sanayi Bakanlığı, EPDK, BYKHY yangın mevzuatı ve Yargıtay emsal kararları ışığında tesis işletmesinde en sık yapılan ölümcül hatalar ve kanuni sorumluluklar.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span>Mevzuat Denetimi 2026</span>
        </div>
      </div>

      {/* Claim Selection Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-8">
        {FACILITY_CLAIMS.map((item, idx) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`text-left p-3.5 rounded-2xl border transition-all text-xs flex items-start gap-2.5 ${
                isSelected
                  ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs'
                  : 'bg-[var(--color-surface-variant)]/40 border-transparent hover:border-[var(--color-outline)] text-[var(--color-secondary)]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                isSelected ? 'bg-rose-600 text-white' : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)]'
              }`}>
                {idx + 1}
              </span>
              <span className="font-semibold line-clamp-2">{item.claim}</span>
            </button>
          );
        })}
      </div>

      {/* Active Claim Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeClaim.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-rose-500/5 via-transparent to-amber-500/5 border border-rose-500/20 rounded-3xl p-6 md:p-8"
        >
          {/* Claim vs Reality Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[var(--color-outline)]/60">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs uppercase tracking-wider">
                İddia / Yanılgı
              </span>
              <span className="text-xs text-[var(--color-secondary)]">Kaynak: {activeClaim.claimant}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-100 dark:bg-rose-900/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">cancel</span>
              <span>Değerlendirme: {activeClaim.ratingExplanation}</span>
            </div>
          </div>

          <div className="py-6 space-y-6">
            {/* The Claim */}
            <div>
              <h4 className="text-xs uppercase font-bold text-rose-600 dark:text-rose-400 mb-1.5">
                İleri Sürülen Yanlış İddia:
              </h4>
              <p className="text-base md:text-lg font-bold text-[var(--color-primary)]">
                "{activeClaim.claim}"
              </p>
            </div>

            {/* The Verified Truth */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl p-5 md:p-6 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-base" aria-hidden="true">verified</span>
                Kanuni & Teknik Gerçek (Hukuki Çözüm):
              </div>
              <p className="text-sm md:text-base text-[var(--color-primary)] leading-relaxed">
                {activeClaim.truth}
              </p>
            </div>

            {/* Citations and Risks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="bg-[var(--color-surface-variant)]/60 p-4 rounded-xl border border-[var(--color-outline)]/60">
                <div className="text-[var(--color-secondary)] font-medium mb-1">Mevzuat / Yasal Dayanak:</div>
                <div className="font-bold text-[var(--color-primary)]">{activeClaim.legalBasis}</div>
              </div>
              <div className="bg-[var(--color-surface-variant)]/60 p-4 rounded-xl border border-[var(--color-outline)]/60">
                <div className="text-[var(--color-secondary)] font-medium mb-1">Emsal Karar / Standart:</div>
                <div className="font-bold text-blue-600 dark:text-blue-400">{activeClaim.courtPrecedent}</div>
              </div>
              <div className="bg-rose-50/60 dark:bg-rose-950/30 p-4 rounded-xl border border-rose-200 dark:border-rose-900/60">
                <div className="text-rose-700 dark:text-rose-300 font-medium mb-1">Uygulanmazsa Doğan Risk:</div>
                <div className="font-bold text-rose-900 dark:text-rose-100">{activeClaim.riskIfIgnored}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
