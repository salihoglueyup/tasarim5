"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, Badge, Button } from '@/components';
import Link from 'next/link';

const poolPoints = [
  {
    title: "Günlük Klor-pH & Bakteri Analizleri",
    desc: "Açık ve kapalı yüzme havuzlarında günün 3 farklı saatinde dijital ölçümlerle su dengesi ve hijyen takibi.",
    icon: "science"
  },
  {
    title: "Kum Filtresi Değişimi & Backwash",
    desc: "Havuz makine dairesinde yer alan kum filtrelerinin periyodik ters yıkanması ve kuvars kum yenilemesi.",
    icon: "filter_alt"
  },
  {
    title: "Sezonluk Havuz Açılış & Kışlık Kapama",
    desc: "Yaz sezonu öncesi seramik derz yenileme, şok klorlama ve kış aylarında koruyucu havuz brandası uygulaması.",
    icon: "pool"
  },
  {
    title: "Sağlık Bakanlığı Numune Denetimi",
    desc: "İl Sağlık Müdürlüğü yetkili laboratuvarlarınca alınan su numunelerinin %100 hijyen uygunluk raporlanması.",
    icon: "verified"
  }
];

const faqs = [
  {
    q: "Havuz suyunun klor ve pH test sonuçları sakinlerle paylaşılıyor mu?",
    a: "Evet, günlük yapılan dijital klor-pH ölçüm değerleri hem sosyal tesis bilgi panosunda fiziki olarak ilan edilir hem de Alo Yönetim mobil uygulamasında güncellenir."
  },
  {
    q: "Sağlık Bakanlığı denetimleri nasıl yürütülüyor?",
    a: "Halk Sağlığı Kurumu tarafından alınan aylık numuneler akredite laboratuvarlarda incelenir ve uygunluk belgeleri yönetim panosunda yayınlanır."
  }
];

export default function HavuzBakimiVeHijyen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader 
        title="Yüzme Havuzu Bakımı & Hijyeni" 
        description="Sağlık Bakanlığı standartlarında günlük su analizleri, kimyasal denge ve sezonluk bakımlar." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-cyan-950 via-[#0c2838] to-[#071724] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <Badge status="info">%100 Sağlık Bakanlığı Onaylı</Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Sitenizde Berrak, Hijyenik ve Güvenli Yüzme Havuzları
            </h2>
            <p className="text-lg text-cyan-100 font-light leading-relaxed">
              Sertifikalı havuz operatörlerimizin denetiminde çocuklarınız ve aileniz için mikroptan arındırılmış havuz suyu sağlıyoruz.
            </p>
          </div>
          <Link href="/teklif-al">
            <Button variant="primary" size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white shrink-0">
              Havuz Bakım Teklifi Alın 🏊‍♂️
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {poolPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Havuz Bakımı SSS</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-cyan-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
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

