"use client";

import PageHeader from '@/components/layout/PageHeader';
import { Card, Badge, Button } from '@/components';
import Link from 'next/link';

const gesPoints = [
  {
    title: "%70 Ortak Alan Elektrik Tasarrufu",
    desc: "Çatı ve otopark üstlerine kurulan güneş panelleri ile asansör, koridor aydınlatmaları ve hidrofor elektriğinde devasa tasarruf.",
    icon: "solar_power"
  },
  {
    title: "Sitelerde Elektrikli Araç Şarj İstasyonları (EV)",
    desc: "GES santrallerinden üretilen temiz enerji ile kat maliklerinin elektrikli araçları için ortak şarj üniteleri kurulumu.",
    icon: "ev_station"
  },
  {
    title: "Mahsuplaşma & Şebekeye Enerji Satışı",
    desc: "Üretilen fazla elektriğin dağıtım şirketine satılarak site bütçesine ek gelir kaynağı sağlanması.",
    icon: "account_balance"
  },
  {
    title: "Karbon Ayak İzi & Yeşil Bina Sertifikası",
    desc: "Binalarınızın gayrimenkul değerini %15 artıran LEED ve BREEAM uyumlu yeşil enerji dönüşümü.",
    icon: "eco"
  }
];

export default function GesProjeleri() {
  return (
    <>
      <PageHeader 
        title="Sitelerde Güneş Enerjisi (GES) Projeleri" 
        description="Çatı ve otopark üstü güneş santralleri ile ortak alan elektrik faturalarında %70 net tasarruf." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-amber-950 via-[#2e1d05] to-[#170e02] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl mb-20 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <Badge status="warning">%70 Elektrik Faturası Düşüşü</Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Güneşten Üretin, Sitenizin Ortak Elektrik Giderini Sıfırlayın
            </h2>
            <p className="text-lg text-amber-100 font-light leading-relaxed">
              Mühendislerimiz sitenizde ücretsiz fizibilite yaparak yatırım amortisman süresini hesaplar.
            </p>
          </div>
          <Link href="/teklif-al">
            <Button variant="primary" size="lg" className="bg-amber-600 hover:bg-amber-500 text-white shrink-0">
              Ücretsiz GES Fizibilitesi Alın
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gesPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
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
