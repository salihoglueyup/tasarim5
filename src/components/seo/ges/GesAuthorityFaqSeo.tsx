"use client";

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
  badge: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Sitelerde çatı GES kurmak için genel kurulda oy birliği mi yoksa çoğunluk mu gerekir?',
    a: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 42 uyarınca ortak alanların faydalı yenilik ve ilaveleri kapsamında değerlendirildiğinden, kat maliklerinin sayı ve arsa payı çoğunluğuyla karar alınması yasal olarak yeterlidir (oy birliği aranmaz). Tek bir malikin itirazı genel kurul iradesini ve projeyi durduramaz.',
    badge: '634 KMK m.42 Hukuku',
  },
  {
    q: 'Paneller monte edilirken çatı su yalıtımı delinir mi? Su sızdırma riski var mıdır?',
    a: 'Kesinlikle hayır. Düz teras çatılarda beton delinmez; çatı kaplamasını delmeyen aerodinamik rüzgar balastlı (ağırlıklı) alüminyum konstrüksiyon kullanılır. Eğimli kiremit veya sandviç çatılarda ise çift kat EPDM contalı sızdırmaz montaj kitleri uygulanır ve 10 yıl su sızdırmazlık garanti sertifikası verilir.',
    badge: 'Su Yalıtım Güvencesi',
  },
  {
    q: 'GES yatırım maliyetini kiracılar mı yoksa ev sahipleri (kat malikleri) mi öder?',
    a: 'Güneş santrali binanın ayrılmaz bir demirbaşı ve gayrimenkul değerini artıran kalıcı bir tesisat olduğundan, yatırım maliyeti ev sahiplerine (kat maliklerine) aittir. Ancak kurulum tamamlandığında ortak elektrik faturası %70-85 düşeceği için aidat miktarı azalır ve kiracılar da her ay ciddi tasarruf eder.',
    badge: 'Demirbaş & Kiracı Hakları',
  },
  {
    q: 'Kış aylarında veya bulutlu günlerde sitenin elektriği kesilir veya voltaj düşer mi?',
    a: 'Hayır. Sistem on-grid (şebeke bağlantılı) çalışır. Güneşin olmadığı veya yetersiz kaldığı anlarda şehir şebekesi (BEDAŞ/AYEDAŞ) milisaniyeler içinde devreye girerek kesintisiz güç sağlar. Dairelerde veya asansörlerde hiçbir kesinti ya da voltaj dalgalanması yaşanmaz.',
    badge: 'Kesintisiz On-Grid Şebeke',
  },
  {
    q: 'Güneş panellerinin kullanım ömrü ve resmi garantisi ne kadardır?',
    a: 'Projelerimizde kullanılan Tier-1 monokristal paneller 12 yıl mekanik ürün garantisine ve 25 yıl boyunca en az %84 lineer elektrik üretim performans garantisine sahiptir. İnverter sistemleri ise 10 yıl resmi distribütör garantilidir.',
    badge: '25 Yıl Garanti',
  },
  {
    q: 'Üretilen fazla elektriğin şebekeye satışından elde edilen gelire vergi ödenir mi?',
    a: 'Gelir Vergisi Kanunu 9/9 maddesi uyarınca, apartman ve site çatılarında lisanssız kurulan güneş enerjisi santrallerinin fazla elektrik satışından elde edilen gelirler gelir vergisinden tamamen muaftır. Stopaj veya KDV doğmaz; para doğrudan site işletme hesabına net yatar.',
    badge: 'Vergi Muafiyeti',
  },
];

export default function GesAuthorityFaqSeo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="ges-sss"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-amber-500" aria-hidden="true">
              help_center
            </span>
            <span>Mevzuat, Finans & Mühendislik Cevapları</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Site Çatı GES Hakkında Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Kat maliklerinin, yöneticilerin ve denetçilerin en çok merak ettiği yasal çoğunluk, 
            çatı su yalıtımı, vergi muafiyeti ve kış performansına dair tüm soruların yanıtları:
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4 mb-14">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl md:rounded-3xl overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center gap-4 cursor-pointer hover:bg-[var(--color-surface-variant)]/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 w-fit">
                    {faq.badge}
                  </span>
                  <span className="text-sm sm:text-base font-bold">{faq.q}</span>
                </div>
                <span
                  className="material-symbols-outlined text-amber-500 transition-transform duration-300 shrink-0"
                  style={{ transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0)' }}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>

              {openIndex === idx && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[var(--color-outline)]/40 text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Downloadable Decision Template Card */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl">download_for_offline</span>
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                YÖNETİCİLER İÇİN HAZIR HUKUKİ ŞABLON
              </div>
              <div className="text-base sm:text-lg font-bold text-white">
                634 KMK m.42 Uyumlu Site Çatı GES Karar Metni Taslağı
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Genel kurul karar defterine doğrudan yazabileceğiniz noter ve avukat onaylı hazır karar metni.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/905325504848?text=Merhaba,%20sitemiz%20için%20KMK%2042%20GES%20karar%20metni%20şablonunu%20talep%20ediyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all shrink-0 w-full md:w-auto text-center"
          >
            <span className="material-symbols-outlined text-lg">description</span>
            <span>Şablonu Ücretsiz İste</span>
          </a>
        </div>
      </div>
    </section>
  );
}
