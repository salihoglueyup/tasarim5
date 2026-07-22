"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

const legalSteps = [
  { step: "01", title: "Hatırlatma & SMS Bildirimi", desc: "Vadesi geçen aidat için otomatik nazik SMS ve e-posta bilgilendirmesi gönderilir." },
  { step: "02", title: "Kat Malikleri Danışmanlığı", desc: "Gecikmeye düşen malik aranarak komşuluk ilişkilerini zedelemeden ödeme kolaylığı sunulur." },
  { step: "03", title: "Hukuk Müşavirliği İhtarı", desc: "Ödenmeyen aidat için resmi avukatımız tarafından Kat Mülkiyeti Kanunu uyarınca ihtar çekilir." },
  { step: "04", title: "Şeffaf İcra Takibi", desc: "Projenin mali dengesini korumak adına icra takibi başlatılarak tahsilat %100 tamamlanır." }
];

export default function TesisYonetimi() {
  return (
    <>
      <PageHeader 
        title="Şeffaf Mülk & Tesis Yönetimi" 
        description="%100 şeffaf bilanço yazılımı, online aidat tahsilatı ve profesyonel hukuk desteği." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Transparency Banner */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-16 rounded-[3rem] shadow-sm mb-20 flex flex-col lg:flex-row justify-between items-center gap-10">
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
            <Link href="/hesaplayici" className="bg-[var(--color-primary)] text-white font-bold py-4 px-8 rounded-xl w-fit shadow-md hover:opacity-95 transition-opacity text-sm">
              Aidat Tasarrufunuzu Hesaplayın ⚡
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-[#122338] text-white p-10 rounded-[2.5rem] flex flex-col gap-6 w-full lg:w-80 shrink-0">
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

      </section>
    </>
  );
}
