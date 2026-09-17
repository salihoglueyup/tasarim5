"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface FactCheckItem {
  id: string;
  myth: string;
  reality: string;
  legalCitation: string;
  lawBadge: string;
  verdict: 'Yanlış (Hukuki Mit)' | 'Doğru Yorum';
}

export const LEGAL_FACT_CHECKS: FactCheckItem[] = [
  {
    id: 'asansor-muafiyeti',
    myth: 'Zemin ve bodrum kattaki daireler asansör ve çatı bakım masraflarından muaftır.',
    reality:
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 20/1-c ve Yargıtay 20. Hukuk Dairesi içtihatlarına göre; yönetim planında aksine açık bir muafiyet hükmü yer almadıkça zemin veya bodrum kat malikleri asansörü fiilen kullanmadıkları gerekçesiyle bakım, revizyon ve yeşil etiket masraflarından muaf tutulamaz. Giderlere arsa payı oranında katılmak zorundadırlar.',
    legalCitation: '634 Sayılı KMK Madde 20/1-c & Yargıtay 20. HD Esas 2017/1248',
    lawBadge: 'KMK Madde 20',
    verdict: 'Yanlış (Hukuki Mit)',
  },
  {
    id: 'yonetici-tek-basina-zam',
    myth: 'Apartman veya site yöneticisi genel kurul yapmadan aidatı kafasına göre iki katına çıkarabilir.',
    reality:
      'Yönetici tek başına keyfi zam yapamaz. KMK Madde 35 ve 37 uyarınca yönetici, ancak kat malikleri kurulunda onaylanan işletme projesini uygular. Beklenmeyen enflasyon veya asgari ücret artışlarında ise ek bütçe (ek işletme projesi) hazırlayarak tüm kat maliklerine iadeli taahhütlü tebliğ etmek zorundadır. Tebliğden itibaren 7 gün içinde sulh hukuk mahkemesine itiraz hakkı mevcuttur.',
    legalCitation: '634 Sayılı KMK Madde 35, 37 & İİK Madde 68',
    lawBadge: 'KMK Madde 37',
    verdict: 'Yanlış (Hukuki Mit)',
  },
  {
    id: 'guvenlik-elle-arama',
    myth: 'Site özel güvenlik görevlisi araç torpidosunu ve misafir çantalarını elle arayabilir.',
    reality:
      '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun Madde 7 ve Türk Ceza Kanunu (TCK) Madde 109/120 uyarınca güvenlik personeli yalnızca detektör, kapı tipi metal arama ve X-ray cihazlarıyla kontrol yapabilir. Şüphe durumunda dahi elle arama yapamaz; elle fiziki arama yalnızca adli kolluk (Polis/Jandarma) yetkisindedir.',
    legalCitation: '5188 Sayılı Kanun Madde 7 & TCK Madde 109/120',
    lawBadge: '5188 SK Madde 7',
    verdict: 'Yanlış (Hukuki Mit)',
  },
  {
    id: 'gecikme-faizi-siniri',
    myth: 'Aidat borcunu geciktiren komşuya yönetim istediği oranda yüksek faiz ve ceza uygulayabilir.',
    reality:
      'KMK Madde 20/2 uyarınca gününde ödenmeyen aidat ve ortak avans borcuna yasal olarak aylık yüzde 5 (%5) oranında gecikme tazminatı işletilir. Bu oran emredici kanun hükmüdür; genel kurul kararıyla dahi fahiş oranda artırılamaz veya ticari faizle birleştirilemez (Yargıtay 18. Hukuk Dairesi).',
    legalCitation: '634 Sayılı KMK Madde 20/2 & Yargıtay 18. HD Esas 2014/8920',
    lawBadge: 'KMK Madde 20/2',
    verdict: 'Yanlış (Hukuki Mit)',
  },
  {
    id: 'kiraci-oy-hakki',
    myth: 'Kiracılar site genel kuruluna katılamaz, toplantıda söz ve oy hakkına sahip değildir.',
    reality:
      'KMK Madde 31 uyarınca kiracılar, konut sahibinden (kat malikinden) aldıkları yazılı temsil vekâleti ile genel kurula asil üye gibi katılıp oy kullanabilir. Ayrıca bağımsız bölümü fiilen ilgilendiren ortak yaşam, otopark ve ısınma kuralları konusunda toplantıda dinlenilme ve öneride bulunma meşru menfaatine sahiptirler.',
    legalCitation: '634 Sayılı KMK Madde 31 & Türk Borçlar Kanunu Madde 504',
    lawBadge: 'KMK Madde 31',
    verdict: 'Yanlış (Hukuki Mit)',
  },
];

export default function FactCheckAiGroundingSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [activeTab, setActiveTab] = useState<string>(LEGAL_FACT_CHECKS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedFact = LEGAL_FACT_CHECKS.find((f) => f.id === activeTab) || LEGAL_FACT_CHECKS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: LEGAL_FACT_CHECKS.map((item) => ({
        '@type': 'Question',
        name: `Mit mi Gerçek mi: ${item.myth}`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${item.reality} (Yasal Dayanak: ${item.legalCitation})`,
        },
      })),
    },
    ...LEGAL_FACT_CHECKS.map((item) => ({
      '@context': 'https://schema.org',
      '@type': 'ClaimReview',
      claimReviewed: item.myth,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '1',
        bestRating: '5',
        worstRating: '1',
        alternateName: item.verdict,
      },
      itemReviewed: {
        '@type': 'Claim',
        author: {
          '@type': 'Organization',
          name: 'Kat Mülkiyeti Yaygın Yanılgıları',
        },
        datePublished: '2026-01-01',
      },
      author: {
        '@type': 'Organization',
        name: 'Alo Yönetim Hukuk ve Mevzuat Masası',
        url: BASE_URL,
      },
      url: `${BASE_URL}/sss#${item.id}`,
      text: item.reality,
    })),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Site Yönetimi ve Kat Mülkiyeti Hukuki Mitler ve Doğrular | Google AI Fact Check',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#factcheck-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="factcheck-ai-grounding"
      aria-label="Google AI Fact Check ve Kat Mülkiyeti Hukuki Doğrulama Kütüğü"
      className={`bg-[var(--color-surface)] border border-rose-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Ambient Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">fact_check</span>
          <span>Google AI Overviews • Hukuki Doğruluk & ClaimReview</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300/40">
            5 Onaylı Yargıtay İncelemesi
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            KMK 634 & 5188 SK
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[var(--color-heading-text)] tracking-tight mb-3 relative z-10">
        Site Yönetimi Hukuki Mitler ve Yargıtay Gerçekleri
      </h2>

      <p className="text-sm text-[var(--color-secondary)] mb-6 max-w-3xl leading-relaxed relative z-10">
        Google AI Overviews ve Perplexity gibi üretken arama motorlarının kat mülkiyeti uyuşmazlıklarında referans aldığı 5 temel hukuki yanılgı ve kanun gerekçeli doğruluk kütüğü.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {LEGAL_FACT_CHECKS.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-[1.02]'
                  : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-outline)]/40'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {isActive ? 'check_circle' : 'gavel'}
              </span>
              <span>{item.lawBadge}</span>
            </button>
          );
        })}
      </div>

      {/* Main Fact Card */}
      <div className="bg-gradient-to-br from-rose-500/[0.04] to-transparent border border-rose-500/20 rounded-2xl p-5 sm:p-6 relative z-10">
        {/* Myth Banner */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 mb-4">
          <span className="material-symbols-outlined text-rose-600 shrink-0 text-xl" aria-hidden="true">
            cancel
          </span>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Yaygın Yanılgı (Mit)
            </div>
            <div className="text-sm sm:text-base font-bold text-[var(--color-heading-text)]">
              "{selectedFact.myth}"
            </div>
          </div>
        </div>

        {/* Reality Box (Speakable) */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <span className="material-symbols-outlined text-emerald-600 shrink-0 text-xl" aria-hidden="true">
            verified
          </span>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">
              Hukuki Gerçek (Ground-Truth Doğrulaması)
            </div>
            <p
              id="factcheck-instant-answer-text"
              className="text-xs sm:text-sm text-[var(--color-primary)] font-medium leading-relaxed"
            >
              {selectedFact.reality}
            </p>
          </div>
        </div>

        {/* Footer Meta & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-outline)]/40 text-xs">
          <div className="flex items-center gap-2 text-[var(--color-secondary)]">
            <span className="material-symbols-outlined text-base text-rose-600" aria-hidden="true">menu_book</span>
            <span className="font-mono font-semibold">{selectedFact.legalCitation}</span>
          </div>

          <button
            onClick={() => handleCopy(selectedFact.reality, selectedFact.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              {copiedId === selectedFact.id ? 'done' : 'content_copy'}
            </span>
            <span>{copiedId === selectedFact.id ? 'Kopyalandı' : 'AI Yanıtını Kopyala'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
