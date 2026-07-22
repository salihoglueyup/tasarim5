"use client";

import PageHeader from '@/components/layout/PageHeader';

const qualityCards = [
  {
    title: "ISO 9001:2015 Hizmet Standartları",
    desc: "Tüm operasyonlarımız yılda iki kez bağımsız uluslararası denetçiler tarafından denetlenir ve belgelendirilir.",
    icon: "verified"
  },
  {
    title: "ISO 27001 Bilgi Güvenliği Protokolü",
    desc: "Kat maliklerinin kişisel ve finansal verileri 256-bit şifrelemeyle yüksek güvenlikli bulut sunucularında korunur.",
    icon: "security"
  },
  {
    title: "OHSAS 18001 İş Sağlığı ve Güvenliği",
    desc: "Tüm saha çalışanlarımızın İSG eğitimleri ve koruyucu ekipmanları sıfır kaza hedefiyle takip edilir.",
    icon: "health_and_safety"
  },
  {
    title: "Sürekli Denetim & Gizli Müşteri Testleri",
    desc: "Güvenlik, temizlik ve teknik personelimizin hizmet kalitesi ayda 4 kez gizli denetmenlerce kontrol edilir.",
    icon: "fact_check"
  }
];

export default function KalitePolitikamiz() {
  return (
    <>
      <PageHeader 
        title="Kalite Politikamız" 
        description="ISO standartlarında şeffaf, ölçülebilir ve bağımsız denetlenen yüksek hizmet kalitesi." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {qualityCards.map((q, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{q.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{q.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
