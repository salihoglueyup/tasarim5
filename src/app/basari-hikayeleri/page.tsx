"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

const cases = [
  {
    title: "Lalezar Konakları (240 Daire)",
    tag: "%24 Bütçe Tasarrufu",
    desc: "Eski amatör yönetimden devralınan 240 dairelik projede, toplu satın alma ve enerji optimizasyonu ile ilk yılda 1.2 Milyon ₺ net tasarruf sağlandı.",
    stats: ["240 Bağımsız Bölüm", "%24 Tasarruf Oranı", "48 Saat Devir Süresi"]
  },
  {
    title: "Sapphire Residence & Plaza",
    tag: "Kesintisiz 7/24 Teknik Güvence",
    desc: "Asansör ve iklimlendirme sistemlerinde önleyici bakım protokolüne geçilerek 3 yıl boyunca sıfır arıza ve sıfır duruş başarısı elde edildi.",
    stats: ["180 Lüks Rezidans", "%99.9 Uptime", "20 Dk Müdahale"]
  },
  {
    title: "Marina Towers & Alışveriş Merkezi",
    tag: "%100 Tahsilat Başarısı",
    desc: "Mobil aidat ödeme sistemi ve avukat kadromuzun şeffaf yasal süreçleri ile aidat alacakları %100 oranında tahsil edildi.",
    stats: ["320 Daire + 40 Mağaza", "%100 Tahsilat", "7/24 Güvenlik"]
  }
];

export default function BasariHikayeleri() {
  return (
    <>
      <PageHeader 
        title="Başarı Hikayeleri & Vaka Analizleri" 
        description="Yönettiğimiz prestijli projelerde sağladığımız bütçe tasarrufları ve dönüşüm başarıları." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="flex flex-col gap-12">
          {cases.map((c, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:border-[var(--color-primary)] transition-all">
              <div className="flex flex-col gap-4 max-w-2xl">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit">
                  {c.tag}
                </span>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">{c.title}</h2>
                <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
              </div>

              <div className="flex flex-col gap-4 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 w-full lg:w-72 shrink-0">
                {c.stats.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-[var(--color-primary)]">
                    <span className="material-symbols-outlined text-blue-600">check_circle</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
