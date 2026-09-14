"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';

export interface LegalClaimReview {
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

const LEGAL_CLAIMS: LegalClaimReview[] = [
  {
    id: 'asansor-masrafi',
    claim: 'Zemin kat ve bodrum kat daireler asansörü kullanmadığı için asansör bakım, elektrik ve yenileme masrafını ödemez.',
    claimant: 'Zemin Kat Malikleri Arasında Yaygın Yanılgı',
    ratingValue: 1,
    ratingExplanation: 'Hukuken Geçersiz & Yanlış',
    truth: '634 Sayılı KMK Madde 20/1-c gereğince kat malikleri ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek veya kendi bağımsız bölümünün durumu dolayısıyla bunlardan faydalanmaya lüzum olmadığını ileri sürmek suretiyle gider payını ödemekten kaçınamaz. Yönetim planında açıkça muafiyet maddesi konulmadıkça zemin kat maliki tüm asansör giderlerine arsa payı oranında katılmak zorundadır.',
    legalBasis: '634 Sayılı KMK Madde 20/1-c',
    courtPrecedent: 'Yargıtay 20. H.D. 2017/1423 E., 2018/2198 K.',
    riskIfIgnored: 'Ödenmeyen pay için aylık %5 gecikme tazminatıyla icra takibi ve avukatlık vekâlet ücreti yükümlülüğü doğar.',
  },
  {
    id: 'yonetici-secimi',
    claim: 'Apartman veya site genel kurulunda toplantıya katılanların oy çokluğuyla yönetici seçilebilir.',
    claimant: 'Yetersiz Hukuki Bilgiye Sahip Divan Heyetleri',
    ratingValue: 1,
    ratingExplanation: 'Hukuken Hükümsüz & İptale Tabi',
    truth: 'KMK Madde 34 açık hükmü uyarınca; yönetici, kat maliklerinin hem sayı (kişi) hem de arsa payı bakımından salt çoğunluğu (%50 + 1) tarafından seçilir. Toplantıda kaç kişi olursa olsun, tüm bağımsız bölüm maliklerinin ve arsa payının salt çoğunluğu sağlanamazsa yönetici seçimi geçersizdir. Sulh Hukuk Mahkemesi nezdinde iptal davası açılabilir.',
    legalBasis: '634 Sayılı KMK Madde 34/4',
    courtPrecedent: 'Yargıtay 18. H.D. 2015/12891 E., 2016/4012 K.',
    riskIfIgnored: 'Seçilen yöneticinin banka hesabı açma, icra takibi başlatma ve sözleşme yapma yetkisi mahkemece iptal edilir.',
  },
  {
    id: 'cam-balkon-kapama',
    claim: 'Kendi bağımsız bölümümün balkonu bana aittir, kimseye sormadan cam balkon ile kapatabilirim.',
    claimant: 'Bağımsız Bölüm Malikleri',
    ratingValue: 1,
    ratingExplanation: 'Mevzuata Aykırı & Yıkıma Tabi',
    truth: 'KMK Madde 19/2 gereğince kat maliklerinden biri, bütün kat maliklerinin beşte dördünün (4/5) yazılı rızası olmadıkça ana gayrimenkulün ortak yerlerinde inşaat, onarım ve tesis yapamaz. Balkonlar ana yapının dış cephe bütünlüğüne dahil olduğundan, 4/5 yazılı onay alınmadan takılan katlanır cam balkonlar için her bir kat maliki eski hale getirme davası açabilir.',
    legalBasis: '634 Sayılı KMK Madde 19/2',
    courtPrecedent: 'Yargıtay Hukuk Genel Kurulu 2016/18-854 E., 2019/312 K.',
    riskIfIgnored: 'Sulh Hukuk Mahkemesi cam balkonun sökülmesine ve tüm yargılama masraflarının yapan malike yüklenmesine hükmeder.',
  },
  {
    id: 'aidat-icra-ihtari',
    claim: 'Aidat borcumu ödemezsem yönetici önce noterden ihtarname çekmelidir, doğrudan icraya veremez ve yalnızca %9 yasal faiz işler.',
    claimant: 'Gecikmeye Düşen Borçlu Malikler',
    ratingValue: 1,
    ratingExplanation: 'Hukuken Yanlış & Yüksek Masraf Riski',
    truth: 'KMK Madde 20/2 gereğince gider veya avans payını ödemeyen kat maliki hakkında diğer kat maliklerinden her biri veya yönetici tarafından, yönetim planına, KMK\'ya ve genel hükümlere göre dava açılabilir, icra takibi yapılabilir. Gider payını ödemeyen malik doğrudan aylık yüzde beş (%5) gecikme tazminatı ödemekle yükümlüdür. Tebliğ edilmiş işletme projesi İİK 68/1 uyarınca ilamsız icra takibi için doğrudan yeterlidir; noter ihtarı şart değildir.',
    legalBasis: '634 Sayılı KMK Madde 20/2 & İİK Madde 68/1',
    courtPrecedent: 'Yargıtay 20. H.D. 2018/3411 E., 2019/1894 K.',
    riskIfIgnored: 'Aylık %5 (yıllık bileşikte %60\'ı aşan) kanuni gecikme tazminatı, icra harçları ve vekalet ücreti ile borç ikiye katlanır.',
  },
];

export default function SiteLegalClaimReviewsSeo() {
  const [activeId, setActiveId] = useState<string>(LEGAL_CLAIMS[0].id);

  const activeClaim = LEGAL_CLAIMS.find((c) => c.id === activeId) || LEGAL_CLAIMS[0];

  // Schema.org ClaimReview Structured Data for Google Fact Check & AI Overviews
  const claimReviewSchemas = {
    '@context': 'https://schema.org',
    '@graph': LEGAL_CLAIMS.map((item) => ({
      '@type': 'ClaimReview',
      url: `${BASE_URL}/hizmetler/site-yonetimi#hukuki-dogrulamalar`,
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
          url: `${BASE_URL}/hizmetler/site-yonetimi`,
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
        name: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
        url: BASE_URL,
      },
      reviewBody: `${item.truth} (Yasal Dayanak: ${item.legalBasis}, Yerleşik İçtihat: ${item.courtPrecedent})`,
    })),
  };

  return (
    <section id="hukuki-dogrulamalar" className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
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
            Google Fact Check & AI Hukuki Doğrulama (ClaimReview)
          </div>
          <h3 className="text-xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Site Yönetiminde <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 dark:from-rose-400 dark:to-amber-300">Yaygın 4 Hukuki Yanılgı & Kanuni Gerçekler</span>
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            Kat Mülkiyeti Kanunu (KMK 634) ve Yargıtay emsal kararları ışığında mülk sahiplerinin en çok yanıldığı konuları ve hukuki doğruluk derecelerini inceleyin.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span>Mevzuat Denetimi 2026</span>
        </div>
      </div>

      {/* Claim Selection Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {LEGAL_CLAIMS.map((item, index) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 shadow-sm ring-2 ring-rose-500/20'
                  : 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)]/80 hover:border-rose-300 dark:hover:border-rose-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                  Yanılgı #{index + 1}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600/10 text-rose-700 dark:text-rose-300 border border-rose-600/20">
                  Hükümsüz
                </span>
              </div>
              <p className="text-xs font-semibold text-[var(--color-primary)] line-clamp-2">
                {item.claim}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Claim Detail Fact-Check Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeClaim.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-[var(--color-surface-variant)]/70 border border-[var(--color-outline)] rounded-3xl p-6 sm:p-8 space-y-6"
        >
          {/* Claim vs Truth Split Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: The Claim (False) */}
            <div className="lg:col-span-5 bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">cancel</span>
                  İleri Sürülen İddia / Yanılgı
                </div>
                <blockquote className="text-sm sm:text-base font-bold text-[var(--color-primary)] italic leading-relaxed">
                  &ldquo;{activeClaim.claim}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-rose-200/60 dark:border-rose-900/40 space-y-1">
                <div className="text-[11px] text-[var(--color-secondary)]">Kaynak / İddia Eden:</div>
                <div className="text-xs font-medium text-[var(--color-primary)]">{activeClaim.claimant}</div>
                <div className="inline-flex items-center gap-1 mt-2 text-xs font-extrabold text-rose-600 dark:text-rose-400">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">gpp_bad</span>
                  Hukuki Değerlendirme: {activeClaim.ratingExplanation}
                </div>
              </div>
            </div>

            {/* Right: The Verified Truth */}
            <div className="lg:col-span-7 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">verified_user</span>
                  Mevzuat Gerçeği & Doğrulama
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-primary)] leading-relaxed font-normal">
                  {activeClaim.truth}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-emerald-200/60 dark:border-emerald-900/40">
                <div className="bg-[var(--color-surface)] border border-emerald-300/40 dark:border-emerald-800/40 rounded-xl p-3">
                  <div className="text-[11px] text-[var(--color-secondary)] font-medium">Yasal Dayanak</div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{activeClaim.legalBasis}</div>
                </div>
                <div className="bg-[var(--color-surface)] border border-emerald-300/40 dark:border-emerald-800/40 rounded-xl p-3">
                  <div className="text-[11px] text-[var(--color-secondary)] font-medium">Yargıtay İçtihadı</div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{activeClaim.courtPrecedent}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warning Box */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl shrink-0 mt-0.5" aria-hidden="true">
              warning
            </span>
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Yanılgıda Israr Edilirse Karşılaşılacak Hukuki Risk
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-primary)] leading-relaxed">
                {activeClaim.riskIfIgnored}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
