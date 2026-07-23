"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, Badge, Button } from '@/components';
import Link from 'next/link';

const landscapePoints = [
  {
    title: "Otomatik Sensörlü Damlama Sulama",
    desc: "Şebeke suyu yerine yağmur suyu depolarına bağlı, nem sensörlü ve zaman ayarlı otomatik sulama hatları.",
    icon: "water_drop"
  },
  {
    title: "Mevsimlik Çiçeklendirme & Çim Bakımı",
    desc: "Yılın 12 ayı canlı ve yeşil peyzaj için mevsimlik fide dikimi, çim havalandırma ve organik gübreleme.",
    icon: "park"
  },
  {
    title: "Periyodik Ağaç Budama & İlaçlama",
    desc: "Ağaç sağlığını koruyan, fırtına risklerini önleyen mevsimlik budama ve bitki koruma ilaçlaması.",
    icon: "forest"
  },
  {
    title: "Bahçe Mimarisi & Sert Zemin Düzenleme",
    desc: "Yürüyüş yolları, çardak bakımı, süs havuzu temizliği ve peyzaj aydınlatma armatürleri kontrolü.",
    icon: "deck"
  }
];

const faqs = [
  {
    q: "Otomatik sulama sistemi su faturamızı nasıl etkiler?",
    a: "Toprak nem sensörlü otomatik damlama ve sprinkler sistemleri, aşırı sulamanın önüne geçerek ortak alan su tüketiminde %35'e varan tasarruf sağlar."
  },
  {
    q: "Ağaç budama ve peyzaj atıkları nasıl tahliye ediliyor?",
    a: "Budama sonrası oluşan tüm organik atıklar aynı gün belediye ve lisanslı geri dönüşüm tesislerine taşınarak ortak alanlarda kirlilik oluşturmaz."
  }
];

export default function PeyzajVeBahceBakimi() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader 
        title="Peyzaj & Bahçe Bakımı" 
        description="Sensörlü otomatik sulama, mevsimlik çiçeklendirme ve periyodik ağaç budama hizmetleri." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#0e2c20] to-[#071912] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <Badge status="success">Otomatik Yağmur Suyu Hasadı</Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              4 Mevsim Yemyeşil ve Bakımlı Ortak Alan Peyzajı
            </h2>
            <p className="text-lg text-emerald-100 font-light leading-relaxed">
              Uzman ziraat mühendislerimiz ve peyzaj mimarlarımız denetiminde, bütçenizi koruyan doğa dostu çözümler üretiyoruz.
            </p>
          </div>
          <Link href="/teklif-al">
            <Button variant="primary" size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white shrink-0">
              Peyzaj Keşfi İsteyin 🌿
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {landscapePoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Peyzaj Bakımı SSS</h2>
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

