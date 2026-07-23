"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

const cleaningHighlights = [
  {
    title: "Ekolojik & Çocuk Dostu Deterjanlar",
    desc: "Ağır kimyasallar yerine insan ve evcil hayvan sağlığına zarar vermeyen %100 doğa dostu ürünler.",
    icon: "eco"
  },
  {
    title: "Endüstriyel Binicili Zemin Otomatları",
    desc: "Kapalı otopark ve geniş mermer hollerde iz bırakmayan yüksek devirli endüstriyel yıkama ekipmanları.",
    icon: "cleaning_services"
  },
  {
    title: "Sezonluk Periyodik Hijyen Takvimi",
    desc: "Bahar aylarında dış cephe cam temizliği, yazın havuz çevresi dezenfeksiyonu ve kışın kar küreme.",
    icon: "calendar_month"
  },
  {
    title: "Asansör & Ortak Alan Sterilizasyonu",
    desc: "Virüs ve bakterilere karşı nano gümüş teknolojisiyle 24 saat etkili ortak alan hijyen kaplaması.",
    icon: "sanitizer"
  }
];

const seasonalMatrix = [
  { season: "İlkbahar", task: "Dış cephe cam temizliği, bahçe peyzaj canlandırması ve çöp konteynerleri yıkanması." },
  { season: "Yaz", task: "Açık yüzme havuzu çevresi hijyen bakımı, haşere ve sinek ilaçlaması." },
  { season: "Sonbahar", task: "Yağmur giderleri ve mazgalların temizliği, yaprak toplama ve çatı oluk kontrolü." },
  { season: "Kış", task: "Kapalı otopark zemin otomatı uygulaması, tuzlama ve kar küreme nöbetleri." }
];

const faqs = [
  {
    q: "Temizlik ürünleriniz çocuk ve evcil hayvan sağlığı için güvenli mi?",
    a: "Evet, kullandığımız tüm temizlik ve dezenfeksiyon ürünleri Sağlık Bakanlığı onaylı, biyolojik olarak doğada çözünen ve hipoalerjenik içeriğe sahiptir."
  },
  {
    q: "Temizlik periyotları nasıl belirleniyor?",
    a: "Sitenizin ihtiyaçlarına göre günlük blok içi merdiven paspaslama, haftalık asansör ve cam silimi, aylık kapalı otopark zemin otomatı yıkaması şeklinde özelleştirilmiş takvim hazırlanır."
  }
];

export default function TemizlikVeHijyen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader 
        title="Temizlik & Hijyen Yönetimi" 
        description="Ekolojik deterjanlar, endüstriyel otomatlar ve periyodik denetimlerle ortak alanlarda otel konforu." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#0e2c20] to-[#071912] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full w-fit">
              %100 Ekolojik Hijyen Garantisi
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Sitenizde Otel Konforunda Temizlik ve Hijyen Standardı
            </h2>
            <p className="text-lg text-emerald-100 font-light leading-relaxed">
              Uzman kat hizmetleri ekibimiz ve sanayi tipi zemin otomatlarımızla ortak alanları her gün ilk günkü parlaklığına kavuşturuyoruz.
            </p>
          </div>
          <Link href="/teklif-al" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-2xl shrink-0 text-sm shadow-lg transition-transform hover:scale-105">
            Temizlik Teklifi Alın 🌿
          </Link>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cleaningHighlights.map((c, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{c.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{c.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Seasonal Matrix Table */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Dört Mevsim Periyodik Temizlik Takvimi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalMatrix.map((m, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 flex flex-col gap-3">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                  {m.season}
                </span>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{m.task}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Temizlik Hizmeti SSS</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-emerald-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
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

