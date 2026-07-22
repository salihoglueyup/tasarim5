"use client";

import PageHeader from '@/components/layout/PageHeader';

const sectors = [
  {
    title: "Rezidans & Karma Projeler",
    desc: "Vale hizmetinden resepsiyona, akıllı ev otomasyon entegrasyonundan concierge çözümlerine kadar üst segment yönetim."
  },
  {
    title: "Alışveriş Merkezi & Ticari Alanlar",
    desc: "Yoğun insan trafiği yönetimi, havalandırma santralleri bakımı, 7/24 özel güvenlik ve şeffaf mağaza ortak gider paylaştırımı."
  },
  {
    title: "Sanayi Siteleri & Organize Sanayi Bölgeleri",
    desc: "Ağır vasıta giriş güvenliği, altyapı trafo ve jeneratör işletimi, yangın koruma hatları denetimi ve hukuki idare."
  },
  {
    title: "Toplu Konut & Uydukent Projeleri",
    desc: "Binlerce dairelik geniş peyzaj alanları, merkezi ısınma sistemleri faturalandırması ve kesintisiz mobil sakin portalı."
  }
];

export default function SektorelCozumler() {
  return (
    <>
      <PageHeader 
        title="Sektörel Çözümlerimiz" 
        description="Rezidans, AVM, Sanayi ve Toplu Konut projelerine özel terzi usulü profesyonel yönetim modelleri." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{s.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
