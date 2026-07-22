"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = ["Tümü", "Güvenlik", "Temizlik", "Teknik Bakım", "Mülk Yönetimi"];

const allServices = [
  {
    title: "7/24 AI Destekli Özel Güvenlik",
    category: "Güvenlik",
    desc: "T.C. İçişleri Bakanlığı 5188 kanununa tabi, plaka tanıma ve yapay zeka kameralarla korunan 7/24 fiziki güvenlik.",
    link: "/hizmetler/guvenlik-yonetimi",
    icon: "security",
    stats: "5188 Sayılı Kanun Uyumluluğu"
  },
  {
    title: "Endüstriyel Ortak Alan Temizliği",
    category: "Temizlik",
    desc: "Ekolojik deterjanlar, zemin yıkama otomatları ve uzman kadroyla blok, otopark ve asansör sterilizasyonu.",
    link: "/hizmetler/temizlik-ve-hijyen",
    icon: "cleaning_services",
    stats: "Sertifikalı Ekolojik Deterjanlar"
  },
  {
    title: "7/24 Teknik Bakım & Onarım",
    category: "Teknik Bakım",
    desc: "Asansör, jeneratör, hidrofor, yangın tesisatı ve havuz bakımlarında 20 dakikada acil müdahale SLA garantisi.",
    link: "/hizmetler/teknik-bakim",
    icon: "engineering",
    stats: "20 Dk Acil Ekip Müdahalesi"
  },
  {
    title: "Şeffaf Mülk & Aidat Yönetimi",
    category: "Mülk Yönetimi",
    desc: "%100 şeffaf bilanço yazılımı, online aidat tahsilatı ve profesyonel hukuk desteği ile sıfır aidat gecikmesi.",
    link: "/hizmetler/tesis-yonetimi",
    icon: "account_balance_wallet",
    stats: "Sakin Mobil Portalı Entegre"
  },
  {
    title: "Peyzaj & Bahçe Mimarisi Bakımı",
    category: "Temizlik",
    desc: "Mevsimlik bitki dikimi, otomatik çim sulama sistemleri bakımı ve periyodik ağaç budama hizmetleri.",
    link: "/hizmetler/temizlik-ve-hijyen",
    icon: "park",
    stats: "Otomatik Sensörlü Sulama"
  },
  {
    title: "Havuz Kimyası & Hijyen Bakımı",
    category: "Teknik Bakım",
    desc: "Açık ve kapalı yüzme havuzlarının günlük klor-pH ölçümleri, filtre değişimi ve bakteri analizleri.",
    link: "/hizmetler/teknik-bakim",
    icon: "pool",
    stats: "Sağlık Bakanlığı Onaylı"
  },
  {
    title: "Bütçe Optimasyon & Hukuk Danışmanlığı",
    category: "Mülk Yönetimi",
    desc: "Toplu satın alma gücümüzle bütçede %22 net tasarruf ve kat mülkiyeti kanununda uzman avukat desteği.",
    link: "/hizmetler/tesis-yonetimi",
    icon: "gavel",
    stats: "%22 Bütçe Tasarrufu"
  },
  {
    title: "Haşere Mücadelesi & İlaçlama",
    category: "Temizlik",
    desc: "Sağlık Bakanlığı ruhsatlı, insan sağlığına zararsız kokusuz ve periyodik ortak alan haşere dezenfeksiyonu.",
    link: "/hizmetler/temizlik-ve-hijyen",
    icon: "bug_report",
    stats: "Periyodik Ruhsatlı İlaçlama"
  }
];

export default function Hizmetler() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredServices = activeCategory === "Tümü" 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory);

  return (
    <>
      <PageHeader 
        title="Hizmetlerimiz" 
        description="Profesyonel site yönetimi, 7/24 özel güvenlik, endüstriyel temizlik ve teknik bakım çözümlerimiz." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* SLA Guarantee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gradient-to-br from-blue-900 to-[#122338] text-white p-8 rounded-3xl flex flex-col gap-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-blue-400">timer</span>
            <div className="text-2xl font-bold">20 Dk Acil Müdahale</div>
            <p className="text-xs text-gray-300 font-light">Asansör arızası ve su baskınlarında nöbetçi teknik ekibimiz 20 dakikada sahada.</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 to-[#0e2c20] text-white p-8 rounded-3xl flex flex-col gap-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-emerald-400">verified_user</span>
            <div className="text-2xl font-bold">%100 Şeffaf Bilanço</div>
            <p className="text-xs text-gray-300 font-light">Tüm faturalar, banka hesapları ve karar defterleri mobil uygulamadan 7/24 canlı izlenir.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-[#231536] text-white p-8 rounded-3xl flex flex-col gap-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-purple-400">trending_down</span>
            <div className="text-2xl font-bold">%22.4 Bütçe Tasarrufu</div>
            <p className="text-xs text-gray-300 font-light">Toplu satın alma gücümüz ile sigorta, asansör bakımı ve elektrikte devasa tasarruf.</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((service, i) => (
            <motion.div
              layout
              key={i}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full w-fit">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-[var(--color-primary)] leading-snug">{service.title}</h3>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{service.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500">{service.stats}</span>
                <Link href={service.link} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  Detay
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </section>
    </>
  );
}
