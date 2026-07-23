"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

const securityFeatures = [
  {
    title: "5188 Sayılı Kanun Ruhsatı",
    desc: "T.C. İçişleri Bakanlığı tarafından denetlenen, silahlı ve silahsız özel güvenlik sertifikalı profesyonel personel.",
    icon: "verified_user"
  },
  {
    title: "Yapay Zeka Plaka Tanıma & Bariyer",
    desc: "Sakin araçlarını otomatik tanıyan, misafir girişlerinde sms ile onay alan akıllı erişim otomasyonu.",
    icon: "center_focus_strong"
  },
  {
    title: "NFC/QR Nokta Devriye Takibi",
    desc: "Güvenlik personelinin 15 dakikada bir kontrol noktalarını okuttuğu canlı GPS ve NFC devriye sistemi.",
    icon: "qr_code_scanner"
  },
  {
    title: "VVIP Protokol & Resepsiyon",
    desc: "Rezidans ve iş merkezlerinde yüksek nezaket, kargo teslimatı ve misafir karşılama standartları.",
    icon: "shield_person"
  },
  {
    title: "Gece Görüşlü Termal Kameralar",
    desc: "Kör nokta bırakmayan, hareket algıladığı an merkeze alarm yollayan 4K gece görüş kamerası ağı.",
    icon: "videocam"
  },
  {
    title: "Acil Durum & Tahliye Planlaması",
    desc: "Deprem, yangın ve su baskını senaryolarında bina tahliye ve ilk yardım sertifikalı nöbetçi personel.",
    icon: "emergency"
  }
];

const faqs = [
  {
    q: "Güvenlik personeliniz 5188 sayılı kanun kapsamında mı çalışıyor?",
    a: "Evet, tüm personelimiz T.C. İçişleri Bakanlığı Özel Güvenlik Daire Başkanlığı onaylı kimlik kartına sahiptir. Şirketimiz 5188 sayılı kanun uyarınca özel güvenlik faaliyet izin belgelidir."
  },
  {
    q: "NFC / QR Kodlu devriye takibi sakinler tarafından izlenebilir mi?",
    a: "Evet, yönetim kuruluna tanımlanan panellerden güvenlik görevlilerinin anlık devriye turları, saat kaçta hangi noktayı kontrol ettikleri canlı olarak haritada görünür."
  },
  {
    q: "Kargo ve misafir kabul protokolü nasıl işletiliyor?",
    a: "Misafir geldiğinde sakinlerimize mobil uygulama uyarısı yollanır veya dahili telefondan onay alınır. Kargo ve kuryeler kayıt altına alınarak güvenle yönlendirilir."
  }
];

export default function GuvenlikYonetimi() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader 
        title="Özel Güvenlik Yönetimi" 
        description="7/24 fiziki nöbet, AI kamerayla devriye takibi ve 5188 kanuni güvencesiyle huzurlu yaşam alanları." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Banner Teaser */}
        <div className="bg-gradient-to-br from-blue-900 via-[#122338] to-[#081524] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full w-fit">
              T.C. İçişleri Bakanlığı 5188 Belgeli
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Sitenizde 7/24 Kesintisiz Sıfır Toleranslı Güvenlik Ağı
            </h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              Tek bir kör nokta bırakmaksızın, yapay zeka kameralar ve yüksek disiplinli özel güvenlik kadromuzla ailenizin ve mülkünüzün güvenliğini üstleniyoruz.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/15 flex flex-col gap-4 text-center">
            <div className="text-4xl font-extrabold text-blue-400">7/24</div>
            <div className="text-lg font-semibold">Canlı Devriye & Kamera Takibi</div>
            <Link href="/teklif-al" className="mt-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-500 transition-colors text-xs">
              Güvenlik Keşfi İsteyin
            </Link>
          </div>
        </div>

        {/* 6 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((f, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{f.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)]">{f.title}</h3>
              <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Güvenlik Hizmeti SSS</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-blue-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
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

