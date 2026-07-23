"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

const legalSteps = [
  { step: "01", title: "Hatırlatma & SMS Bildirimi", desc: "Vadesi geçen aidat için otomatik nazik SMS ve e-posta bilgilendirmesi gönderilir." },
  { step: "02", title: "Kat Malikleri Danışmanlığı", desc: "Gecikmeye düşen malik aranarak komşuluk ilişkilerini zedelemeden ödeme kolaylığı sunulur." },
  { step: "03", title: "Hukuk Müşavirliği İhtarı", desc: "Ödenmeyen aidat için resmi avukatımız tarafından Kat Mülkiyeti Kanunu uyarınca ihtar çekilir." },
  { step: "04", title: "Şeffaf İcra Takibi", desc: "Projenin mali dengesini korumak adına icra takibi başlatılarak tahsilat %100 tamamlanır." }
];

const faqs = [
  {
    q: "Banka hesaplarımızı ve aidat harcamalarını nasıl takip edebiliriz?",
    a: "Alo Yönetim mobil uygulaması ve web sakin portalı üzerinden binanıza ait banka hesabının tüm girdi ve çıktı hareketlerini, fatura görsellerini ve aylık bilançoları 7/24 şeffaf şekilde inceleyebilirsiniz."
  },
  {
    q: "Mevcut bina yönetimi devri nasıl gerçekleşir?",
    a: "Eski yönetimden devir teslim süreci uzman avukatımız ve mali müşavirimiz eşliğinde gerçekleşir. Karar defteri tescilinden banka yetkilerinin devrine kadar tüm bürokratik adımları biz yürütüyoruz."
  },
  {
    q: "Aidat ödemeyen kat maliklerine karşı yasal süreç nasıl işler?",
    a: "Kat Mülkiyeti Kanunu uyarınca, gecikmeye düşen aidatlara aylık %5 yasal gecikme tazminatı uygulanır. 4 adımlı uzlaşmacı ve hukuki sürecimiz sayesinde aidat tahsilat oranımız %99.2 seviyesindedir."
  }
];

export default function TesisYonetimi() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader 
        title="Şeffaf Mülk & Tesis Yönetimi" 
        description="%100 şeffaf bilanço yazılımı, online aidat tahsilatı ve profesyonel hukuk desteği." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Transparency Banner */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-4 py-1.5 rounded-full w-fit">
              Canlı Şeffaf Portal
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)]">
              Her Kuruşun Hesabı Sakinlerin Cebinde
            </h2>
            <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">
              Alo Yönetim mobil uygulaması ile binanızın elektrik faturasından güvenlik maaşına kadar tüm harcamaları canlı olarak görüntüleyebilir, banka ekstrelerini dilediğiniz an inceleyebilirsiniz.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/hesaplayici" className="bg-[var(--color-primary)] text-white font-bold py-4 px-8 rounded-xl w-fit shadow-md hover:opacity-95 transition-opacity text-sm">
                Aidat Tasarrufunuzu Hesaplayın ⚡
              </Link>
              <Link href="/teklif-al" className="border border-[var(--color-outline)] text-[var(--color-primary)] font-bold py-4 px-8 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm">
                Yönetim Teklifi Al
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-[#122338] text-white p-10 rounded-[2.5rem] flex flex-col gap-6 w-full lg:w-80 shrink-0 shadow-xl">
            <div className="text-4xl font-extrabold text-blue-400">%100</div>
            <div className="text-lg font-semibold">Canlı Şeffaf Bilanço</div>
            <p className="text-xs text-gray-300 font-light leading-relaxed border-t border-white/10 pt-4">
              Gizli masraf yok, sürpriz ek bütçe yok. Tüm finansal kararlar kat malikleri onayından geçer.
            </p>
          </div>
        </div>

        {/* Legal Debt Collection 4-Step Flow */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">4 Adımda Aidat Tahsilat & Hukuk Akışı</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalSteps.map((s, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 flex flex-col gap-3">
                <span className="text-3xl font-extrabold text-blue-600/40">{s.step}</span>
                <h3 className="text-lg font-bold text-[var(--color-primary)]">{s.title}</h3>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Specific FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Sıkça Sorulan Sorular</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-blue-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="p-6 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 text-sm text-[var(--color-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

