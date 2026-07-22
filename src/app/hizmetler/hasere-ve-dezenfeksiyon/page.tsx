"use client";

import PageHeader from '@/components/layout/PageHeader';
import { Card, Badge, Button } from '@/components';
import Link from 'next/link';

const pestPoints = [
  {
    title: "T.C. Sağlık Bakanlığı Ruhsatlı İlaçlama",
    desc: "İnsan sağlığına, evcil hayvanlara ve bitkilere zarar vermeyen kokusuz ve lekesiz ruhsatlı kimyasallar.",
    icon: "verified"
  },
  {
    title: "Otopark, Sığınak & Kazan Dairesi Koruması",
    desc: "Kemirgen ve haşerelerin üreme noktaları olan bodrum, sığınak ve asansör boşluklarında periyodik jel uygulama.",
    icon: "bug_report"
  },
  {
    title: "Ortak Alan ULV Sisleme İlaçlaması",
    desc: "Yaz aylarında çöp odaları, peyzaj alanları ve bina girişlerinde uçkun ve sivrisinek ULV sisleme uygulaması.",
    icon: "cleaning"
  },
  {
    title: "Periyodik İlaçlama Raporlama & Sertifika",
    desc: "Her uygulama sonrası kat maliklerine sunulan detaylı etken madde kullanım ve denetim raporu.",
    icon: "description"
  }
];

export default function HasereVeDezenfeksiyon() {
  return (
    <>
      <PageHeader 
        title="Haşere İlaçlama & Dezenfeksiyon" 
        description="Sağlık Bakanlığı ruhsatlı, kokusuz ve ekolojik malzemelerle periyodik haşere koruması." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-purple-950 via-[#231536] to-[#120a1c] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl mb-20 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <Badge status="purple">Sağlık Bakanlığı Ruhsatlı</Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Haşere ve Bakterilere Karşı %100 Güvenli Ortak Alanlar
            </h2>
            <p className="text-lg text-purple-100 font-light leading-relaxed">
              Profesyonel biyosidal uygulayıcı sertifikalı ekibimizle yaşam alanlarınızı böcek ve kemirgenlerden arındırıyoruz.
            </p>
          </div>
          <Link href="/teklif-al">
            <Button variant="primary" size="lg" className="bg-purple-600 hover:bg-purple-500 text-white shrink-0">
              İlaçlama Randevusu Alın
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pestPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

      </section>
    </>
  );
}
