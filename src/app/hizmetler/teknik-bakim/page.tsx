"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

const techIntervals = [
  { equipment: "Asansör Sistemleri", interval: "Aylık Periyodik Bakım & Yeşil Etiket Takibi", status: "20 Dk Müdahale" },
  { equipment: "Jeneratör & Trafo", interval: "Haftalık Yük Testi & Yakıt Seviye Denetimi", status: "Sıfır Kesinti" },
  { equipment: "Hidrofor & Su Depoları", interval: "6 Aylık Dezenfeksiyon & Basınç Testi", status: "Kesintisiz Su" },
  { equipment: "Yangın Pompa Hatları", interval: "Aylık Basınç & Sprinkler Vana Testi", status: "İtfaiye Onaylı" }
];

const faqs = [
  {
    q: "Acil bir arıza durumunda (asansör mahsur kalma vb.) ortalama varış süreniz nedir?",
    a: "Nöbetçi teknik gezici ekibimiz lokasyona bağlı olarak ortalama 20 dakikada adrese ulaşır. Asansör içi 7/24 acil butonumuz doğrudan çağrı merkezimize bağlanır."
  },
  {
    q: "Asansör yeşil etiket sorumluluğu kimdedir?",
    a: "A Tipi akredite muayene kuruluşlarının yıllık denetimlerini Alo Yönetim teknik departmanı organize eder. Eksikler giderilerek %100 Yeşil Etiket sürekliliği sağlanır."
  },
  {
    q: "Jeneratör ve jeneratör yakıt takibi nasıl yapılıyor?",
    a: "Haftalık periyodik yük testleri yapılır, yakıt seviyesi kritik eşiğe düşmeden toplu yakıt ikmaliyle indirimli fiyattan tamamlanır."
  }
];

export default function TeknikBakim() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader 
        title="7/24 Teknik Bakım & Onarım" 
        description="Asansör, jeneratör, hidrofor ve havuz bakımlarında 20 dakikada nöbetçi müdahale SLA garantisi." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* SLA Timer Banner */}
        <div className="bg-gradient-to-br from-blue-900 to-[#122338] text-white p-10 md:p-14 rounded-[3rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full w-fit">
              SLA Müdahale Garantisi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">20 Dakikada Nöbetçi Ekip Adreste</h2>
            <p className="text-sm text-gray-300 font-light max-w-xl">
              Asansörde mahsur kalma, ana boru patlaması ve jeneratör arızalarında nöbetçi teknik personelimiz en geç 20 dakikada sahaya ulaşır.
            </p>
            <div className="pt-2">
              <Link href="/teklif-al" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 px-7 rounded-xl inline-flex items-center gap-2 text-sm transition-transform hover:scale-105">
                <span className="material-symbols-outlined">build</span>
                Teknik Bakım Anlaşması Alın
              </Link>
            </div>
          </div>
          <div className="bg-white/10 p-8 rounded-3xl border border-white/15 text-center shrink-0">
            <div className="text-5xl font-extrabold text-blue-400">20 DK</div>
            <div className="text-xs text-gray-300 mt-1 font-medium">Ortalama Varış Süresi</div>
          </div>
        </div>

        {/* Maintenance Intervals Table */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Önleyici Periyodik Bakım Matrisi</h2>
          <div className="flex flex-col gap-4">
            {techIntervals.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">{item.equipment}</h3>
                    <p className="text-xs text-[var(--color-secondary)] font-light">{item.interval}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-4 py-2 rounded-full w-fit">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Teknik Bakım SSS</h2>
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

