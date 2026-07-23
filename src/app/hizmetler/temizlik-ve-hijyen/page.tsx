"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const cleaningHighlights = [
  {
    title: "Ekolojik & Çocuk Dostu Deterjanlar",
    desc: "Ağır kimyasallar yerine insan ve evcil hayvan sağlığına zarar vermeyen %100 doğa dostu ürünler.",
    icon: "eco",
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Endüstriyel Binicili Zemin Otomatları",
    desc: "Kapalı otopark ve geniş mermer hollerde iz bırakmayan yüksek devirli endüstriyel yıkama ekipmanları.",
    icon: "cleaning_services",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Sezonluk Periyodik Hijyen Takvimi",
    desc: "Bahar aylarında dış cephe cam temizliği, yazın havuz çevresi dezenfeksiyonu ve kışın kar küreme.",
    icon: "calendar_month",
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Asansör & Ortak Alan Sterilizasyonu",
    desc: "Virüs ve bakterilere karşı nano gümüş teknolojisiyle 24 saat etkili ortak alan hijyen kaplaması.",
    icon: "sanitizer",
    color: "from-purple-500 to-fuchsia-600"
  }
];

const seasonalMatrix = [
  { 
    id: "ilkbahar",
    season: "İlkbahar", 
    task: "Dış cephe cam temizliği, bahçe peyzaj canlandırması ve çöp konteynerleri yıkanması.",
    icon: "local_florist",
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  { 
    id: "yaz",
    season: "Yaz", 
    task: "Açık yüzme havuzu çevresi hijyen bakımı, haşere ve sinek ilaçlaması.",
    icon: "light_mode",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  { 
    id: "sonbahar",
    season: "Sonbahar", 
    task: "Yağmur giderleri ve mazgalların temizliği, yaprak toplama ve çatı oluk kontrolü.",
    icon: "air",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  { 
    id: "kis",
    season: "Kış", 
    task: "Kapalı otopark zemin otomatı uygulaması, tuzlama ve kar küreme nöbetleri.",
    icon: "ac_unit",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  }
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
  const [activeSeason, setActiveSeason] = useState(seasonalMatrix[0]);

  return (
    <>
      <PageHeader 
        title="Temizlik & Hijyen Yönetimi" 
        description="Ekolojik deterjanlar, endüstriyel otomatlar ve periyodik denetimlerle ortak alanlarda otel konforu." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#0e2c20] to-[#071912] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="flex flex-col gap-6 max-w-2xl relative z-10">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full w-fit">
              %100 Ekolojik Hijyen Garantisi
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Sitenizde Otel Konforunda Temizlik ve Hijyen Standardı
            </h2>
            <p className="text-lg text-emerald-100/80 font-light leading-relaxed">
              Uzman kat hizmetleri ekibimiz ve sanayi tipi zemin otomatlarımızla ortak alanları her gün ilk günkü parlaklığına kavuşturuyoruz.
            </p>
          </div>
          <Link href="/teklif-al" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-2xl shrink-0 text-sm shadow-xl transition-all hover:scale-105 hover:shadow-emerald-500/25 relative z-10 flex items-center gap-2">
            Temizlik Teklifi Alın 🌿
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cleaningHighlights.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-5 shadow-sm group hover:shadow-xl transition-all overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{c.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{c.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Seasonal Matrix Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-10">
            <div className="max-w-lg">
              <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                İnteraktif Döngü
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">Dört Mevsim Periyodik Temizlik Takvimi</h2>
            </div>
            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-white/5 p-2 rounded-2xl">
              {seasonalMatrix.map(season => (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    activeSeason.id === season.id 
                      ? 'bg-white dark:bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm' 
                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm ${activeSeason.id === season.id ? season.color : ''}`}>
                    {season.icon}
                  </span>
                  {season.season}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 sm:h-48 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-12 rounded-full ${activeSeason.bg} ${activeSeason.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{activeSeason.icon}</span>
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)]">{activeSeason.season} Dönemi Rutinleri</h3>
                </div>
                <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed max-w-3xl">
                  {activeSeason.task}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8">Temizlik Hizmeti SSS</h2>
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
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10"
                    >
                      <div className="p-6 text-sm text-[var(--color-secondary)] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

