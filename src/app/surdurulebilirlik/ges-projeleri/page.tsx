"use client";

import { useState } from 'react';
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

const faqs = [
  {
    q: "Güneş Paneli (GES) yatırımı kendisini kaç yılda amorti eder?",
    a: "Sitelerin çatı alanı ve ortak elektrik faturasına bağlı olarak ortalama amortisman süresi 3.2 ile 4 yıl arasındadır. Kalan 20+ yıl üretilen enerji %100 kar kalır."
  },
  {
    q: "Çatıya güneş paneli kurmak için kat malikleri kurulunda kaç oy gerekir?",
    a: "Kat Mülkiyeti Kanunu uyarınca ortak alanlarda yenilenebilir enerji tesisatı kurulumu için kat maliklerinin sayı ve arsa payı çoğunluğu yeterlidir."
  }
];

export default function GesProjeleri() {
  const [monthlyBill, setMonthlyBill] = useState<number>(45000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Solar calculations
  const estimatedSavingsMonthly = Math.round(monthlyBill * 0.68);
  const estimatedSavingsYearly = estimatedSavingsMonthly * 12;
  const estimatedPaybackYears = 3.4;

  return (
    <>
      <PageHeader 
        title="Sitelerde Güneş Enerjisi (GES) Projeleri" 
        description="Çatı ve otopark üstü güneş santralleri ile ortak alan elektrik faturalarında %70 net tasarruf." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-amber-950 via-[#2e1d05] to-[#170e02] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-10">
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
            <Button variant="primary" size="lg" className="bg-amber-600 hover:bg-amber-500 text-white shrink-0 shadow-lg transition-transform hover:scale-105">
              Ücretsiz GES Fizibilitesi Alın ☀️
            </Button>
          </Link>
        </div>

        {/* Interactive Solar ROI Calculator Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
              GES Amortisman Simülatörü
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">Sitenizin Güneş Enerjisi Potansiyelini Hesaplayın</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
              Sitenizin aylık ortalama ortak alan elektrik faturasını girin; yıllık tasarruf miktarını ve amortisman süresini görün.
            </p>
            
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)]">Aylık Ortak Elektrik Faturası</label>
                <span className="text-xl font-bold text-amber-600">₺{monthlyBill.toLocaleString()} / ay</span>
              </div>
              <input 
                type="range"
                min={10000}
                max={300000}
                step={5000}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-amber-900 to-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-amber-300 font-semibold uppercase">Tahmini Yıllık GES Tasarrufu</span>
              <div className="text-4xl md:text-5xl font-extrabold text-amber-400">₺{estimatedSavingsYearly.toLocaleString()}</div>
            </div>
            
            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-300">Aylık Net Fatura İndirimi</div>
                <div className="text-xl font-bold text-white">~₺{estimatedSavingsMonthly.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-300">Ort. Amortisman Süresi</div>
                <div className="text-xl font-bold text-emerald-400">{estimatedPaybackYears} Yıl</div>
              </div>
            </div>

            <Link href="/teklif-al" className="w-full bg-white text-slate-900 font-bold py-3.5 px-6 rounded-xl text-center text-sm hover:bg-gray-100 transition-colors mt-2">
              Resmi Çatı Fizibilite Raporu İste
            </Link>
          </div>
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

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">GES Projeleri SSS</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-amber-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
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

