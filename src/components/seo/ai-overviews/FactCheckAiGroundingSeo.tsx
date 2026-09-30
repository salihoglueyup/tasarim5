"use client";

import React, { useState } from 'react';
import JsonLd from '@/components/seo/schema/JsonLd';

import Icon from '@/components/ui/branding/Icon';
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Her mit/gerçek çifti bir ClaimReview node'u — Google'ın Fact Check zengin
  // sonuçları ve AI Overviews bu tipi doğrudan tanır (myth = reddedilen iddia).
  const schemaData = [
    ...LEGAL_FACT_CHECKS.map((item) => ({
      '@context': 'https://schema.org',
      '@type': 'ClaimReview',
      claimReviewed: item.myth,
      author: {
        '@type': 'Organization',
        name: 'Alo Yönetim',
        url: 'https://aloyonetim.com',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: item.verdict === 'Yanlış (Hukuki Mit)' ? 1 : 5,
        bestRating: 5,
        worstRating: 1,
        alternateName: item.verdict,
      },
      itemReviewed: {
        '@type': 'Claim',
        author: { '@type': 'Organization', name: 'Yaygın Kanı' },
      },
    })),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Site Yönetimi ve Kat Mülkiyeti Hukuki Mitler ve Doğrular | Google AI Fact Check',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.factcheck-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="factcheck-ai-grounding"
      aria-label="Google AI Fact Check ve Kat Mülkiyeti Hukuki Doğrulama Kütüğü"
      className={`bg-[var(--color-surface)] dark:bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <JsonLd data={schemaData} />

      {/* Ambient Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-slate-500/10 via-slate-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
          <Icon name="fact_check" className="text-[15px]" />
          <span>Hukuki Mitler & Doğrular</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10">
            5 Onaylı Yargıtay İncelemesi
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            KMK 634 & 5188 SK
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 relative z-10">
        Site Yönetimi Hukuki Mitler ve Yargıtay Gerçekleri
      </h2>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-3xl leading-relaxed relative z-10">
        Google AI Overviews ve Perplexity gibi üretken arama motorlarının kat mülkiyeti uyuşmazlıklarında referans aldığı 5 temel hukuki yanılgı ve kanun gerekçeli doğruluk kütüğü.
      </p>

      {/* Accordion: Her mit/gerçek çifti her zaman DOM'da (kapalı olsa da) —
          yalnız görsel olarak daraltılmış, JS çalıştırmayan botlar da tamamını görür. */}
      <div className="space-y-3 relative z-10">
        {LEGAL_FACT_CHECKS.map((item, index) => (
          <details
            key={item.id}
            open={index === 0}
            className="group bg-slate-50/80 dark:bg-white/[0.02] border border-[var(--color-outline)]/60 dark:border-white/10 rounded-2xl overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none select-none">
              <span className="flex items-center gap-2.5 text-sm font-bold text-slate-900 dark:text-white">
                <Icon name="gavel" className="text-[16px] text-slate-400 shrink-0" />
                <span>{item.lawBadge}</span>
              </span>
              <Icon name="expand_more" className="text-[18px] text-slate-400 transition-transform group-open:rotate-180" />
            </summary>

            <div className="px-5 pb-5 space-y-4">
              {/* Myth Banner */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-500/10 border border-slate-500/20">
                <Icon name="cancel" className="text-slate-600 dark:text-slate-400 shrink-0 text-xl" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-0.5">
                    Yaygın Yanılgı (Mit)
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    "{item.myth}"
                  </div>
                </div>
              </div>

              {/* Reality Box (Speakable) */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Icon name="verified" className="text-emerald-600 dark:text-emerald-400 shrink-0 text-xl" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">
                    Hukuki Gerçek (Ground-Truth Doğrulaması)
                  </div>
                  <p className="factcheck-instant-answer-text text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {item.reality}
                  </p>
                </div>
              </div>

              {/* Footer Meta & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--color-outline)]/40 dark:border-white/5 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Icon name="menu_book" className="text-base text-slate-500" />
                  <span className="font-mono font-semibold">{item.legalCitation}</span>
                </div>

                <button
                  onClick={() => handleCopy(item.reality, item.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <Icon name={copiedId === item.id ? 'done' : 'content_copy'} className="text-sm" />
                  <span>{copiedId === item.id ? 'Kopyalandı' : 'AI Yanıtını Kopyala'}</span>
                </button>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
