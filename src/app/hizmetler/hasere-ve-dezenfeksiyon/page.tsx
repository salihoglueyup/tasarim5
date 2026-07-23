"use client";

import { useState } from 'react';
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

const faqs = [
  {
    q: "İlaçlama sonrasında ortak alanların boşaltılması gerekir mi?",
    a: "Hayır, kullandığımız biyosidal ürünler kokusuz, lekesiz ve Dünya Sağlık Örgütü (WHO) onaylı olduğu için günlük yaşam akışını aksatmaz."
  },
  {
    q: "İlaçlama periyotları kaç ayda bir yapılıyor?",
    a: "İklim şartlarına göre ilkbahar ve sonbahar geçişlerinde yılda 4 ila 6 kez periyodik ortak alan dezenfeksiyonu önerilmektedir."
  }
];

export default function HasereVeDezenfeksiyon() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader 
        title="Haşere İlaçlama & Dezenfeksiyon" 
        description="Sağlık Bakanlığı ruhsatlı, kokusuz ve ekolojik malzemelerle periyodik haşere koruması." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-purple-950 via-[#231536] to-[#120a1c] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-10">
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
              İlaçlama Randevusu Alın 🛡️
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

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">İlaçlama Hizmeti SSS</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-purple-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
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

