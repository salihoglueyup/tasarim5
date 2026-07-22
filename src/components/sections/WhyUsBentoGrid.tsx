"use client";

import { motion } from 'framer-motion';

const bentoItems = [
  {
    span: "lg:col-span-8",
    title: "Yapay Zeka Destekli Kameralar & PTS Entegrasyonu",
    desc: "Sitenize giren çıkan yabancı araçlar ve şüpheli hareketler yapay zeka ile anında tespit edilip güvenlik odasına uyarı düşer.",
    icon: "videocam",
    tag: "Güvenlik Teknolojisi"
  },
  {
    span: "lg:col-span-4",
    title: "Şeffaf Satın Alma Gücü",
    desc: "100+ projeden gelen toplu tedarik alımımızla siteniz sigorta ve malzemede %20+ tasarruf eder.",
    icon: "savings",
    tag: "Tasarruf"
  },
  {
    span: "lg:col-span-4",
    title: "7/24 Nöbetçi Teknik Ekip",
    desc: "Gece yarısı meydana gelen jeneratör ve kazan dairesi arızalarına ortalama 20 dakikada müdahale edilir.",
    icon: "engineering",
    tag: "Teknik Servis"
  },
  {
    span: "lg:col-span-8",
    title: "Mobil Uygulamadan Canlı Aidat ve Bilanço Takibi",
    desc: "Kat malikleri toplanan aidatların hangi faturalara harcandığını fotoğraflı dekontlarıyla anlık olarak cebinden izler.",
    icon: "phone_iphone",
    tag: "Mobil Portal"
  },
  {
    span: "lg:col-span-6",
    title: "Hukuk Kadromuzla Husumetsiz İcra Takibi",
    desc: "Aidatını ödemeyen dairelerin yasal süreçleri avukatlarımızca komşuluk ilişkileri bozulmadan şeffafça yürütülür.",
    icon: "gavel",
    tag: "Hukuki Destek"
  },
  {
    span: "lg:col-span-6",
    title: "ISO 9001 ve Ekolojik Yeşil Temizlik",
    desc: "Ortak alanlarda kullanılan tüm kimyasallar doğa ve çocuk dostudur, bitkilere ve evcil hayvanlara zarar vermez.",
    icon: "eco",
    tag: "Ekolojik Temizlik"
  }
];

export default function WhyUsBentoGrid() {
  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
          Teknolojik Üstünlüğümüz
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          Neden Alo Yönetim?
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          Sitenize değer katan modern bento teknolojilerimiz ve şeffaf yönetim modelimiz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {bentoItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className={`${item.span} bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between gap-6 shadow-sm hover:border-[var(--color-primary)] transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-500/10 px-4 py-1.5 rounded-full">
                {item.tag}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{item.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
