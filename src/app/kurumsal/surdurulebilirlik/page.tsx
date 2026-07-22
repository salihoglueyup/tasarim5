"use client";

import PageHeader from '@/components/layout/PageHeader';

const ecoPoints = [
  {
    title: "Güneş Enerjisi (GES) ve Yeşil Enerji Sistemleri",
    desc: "Ortak alan elektrik giderlerini düşürmek için sitelerde çatı ve otopark üstü GES projeleri planlıyoruz."
  },
  {
    title: "Yağmur Suyu Hasadı & Otomatik Peyzaj Sulama",
    desc: "Bahçe sulamalarında şebeke suyu yerine yağmur suyu depolama ve sensörlü otomatik damlama sistemleri kullanıyoruz."
  },
  {
    title: "Ekolojik Kimyasallar & %100 Doğa Dostu Hijyen",
    desc: "Temizlik süreçlerinde biyolojik olarak ayrışabilen, çocuklara ve evcil hayvanlara zarar vermeyen ürünler tercih edilir."
  },
  {
    title: "Sıfır Atık & Dönüştürülebilir Atık Takibi",
    desc: "Sitede cam, plastik, kağıt ve bayat ekmek atıklarının geri dönüşümünü organize ederek belediyelerle ortak hareket ediyoruz."
  }
];

export default function Surdurulebilirlik() {
  return (
    <>
      <PageHeader 
        title="Sürdürülebilirlik & Çevre Politikamız" 
        description="Gelecek nesillere daha yaşanabilir alanlar bırakmak için ekolojik ve enerji dostu tesis yönetimi." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ecoPoints.map((p, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
