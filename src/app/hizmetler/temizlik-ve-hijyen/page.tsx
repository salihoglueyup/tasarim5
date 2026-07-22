"use client";

import PageHeader from '@/components/layout/PageHeader';

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

export default function TemizlikVeHijyen() {
  return (
    <>
      <PageHeader 
        title="Temizlik & Hijyen Yönetimi" 
        description="Ekolojik deterjanlar, endüstriyel otomatlar ve periyodik denetimlerle ortak alanlarda otel konforu." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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

      </section>
    </>
  );
}
