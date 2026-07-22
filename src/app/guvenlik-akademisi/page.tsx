"use client";

import PageHeader from '@/components/layout/PageHeader';

const academyFeatures = [
  {
    title: "5188 Sayılı Kanun & Mevzuat Eğitimi",
    desc: "Tüm özel güvenlik personelimiz T.C. İçişleri Bakanlığı standartlarında kanuni yetkiler ve sorumluluklar konusunda eğitilir."
  },
  {
    title: "Kriz Yönetimi & Yangın Müdahale Simülasyonu",
    desc: "Acil durumlarda panik yönetimi, tahliye protokolleri ve ilk yardım simülasyonları periyodik olarak uygulanır."
  },
  {
    title: "Yapay Zeka Destekli Güvenlik Sistemleri Eğitimi",
    desc: "Plaka tanıma, hırsızlık tespiti ve nesne analizi yapan akıllı kameraların kullanımı öğretilir."
  },
  {
    title: "İletişim & Halkla İlişkiler Standartları",
    desc: "Site sakinlerine ve ziyaretçilere karşı nezaket, yüksek iletişim dili ve protokol karşılama prensipleri aşılanır."
  }
];

export default function GuvenlikAkademisi() {
  return (
    <>
      <PageHeader 
        title="Güvenlik Akademisi & Personel Eğitimi" 
        description="5188 sayılı kanuna uygun, teorik ve pratik simülasyonlarla eğitilen özel güvenlik kadromuz." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {academyFeatures.map((f, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                0{i + 1}
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{f.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
