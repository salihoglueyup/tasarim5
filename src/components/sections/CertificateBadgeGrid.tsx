"use client";

import { motion } from 'framer-motion';

const certs = [
  {
    code: "ISO 9001:2015",
    title: "Kalite Yönetim Sistemi",
    desc: "Tüm tesis ve site yönetimi operasyonlarımız uluslararası standartlara göre denetlenir.",
    icon: "verified"
  },
  {
    code: "ISO 27001",
    title: "Bilgi Güvenliği Yönetimi",
    desc: "Kat maliklerinin kişisel verileri ve finansal bilgileri yüksek güvenlikli sunucularda saklanır.",
    icon: "security"
  },
  {
    code: "KVKK Uyumlu",
    title: "Kişisel Verilerin Korunması",
    desc: "CCTV kamera kayıtları ve ziyaretçi defterleri 6698 sayılı kanuna %100 uygun işlenir.",
    icon: "gavel"
  },
  {
    code: "OHSAS 18001 / ISO 45001",
    title: "İş Sağlığı ve Güvenliği",
    desc: "Temizlik, güvenlik ve teknik personelimizin İSG eğitimleri eksiksiz olarak güncellenir.",
    icon: "health_and_safety"
  },
  {
    code: "ISO 14001",
    title: "Çevre Yönetim Sistemi",
    desc: "Sitemizde kullanılan tüm kimyasallar ekolojik ve doğaya saygılı ürünlerden seçilir.",
    icon: "eco"
  },
  {
    code: "5188 Özel Güvenlik",
    title: "Yetkili Güvenlik Şirketi",
    desc: "İçişleri Bakanlığı Emniyet Genel Müdürlüğü ruhsatlı özel güvenlik hizmeti altyapısı.",
    icon: "shield"
  }
];

export default function CertificateBadgeGrid() {
  return (
    <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
          Resmi Standartlarımız
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          Kalite Sertifikalarımız & Güvencelerimiz
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          Rastgele değil, uluslararası akredite kurumlar tarafından onaylanmış resmi protokollerle hizmet veriyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map((c, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-sm hover:border-[var(--color-primary)] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{c.icon}</span>
              </div>
              <span className="bg-blue-500/10 text-blue-600 font-bold text-xs px-3 py-1 rounded-full">
                {c.code}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-primary)]">{c.title}</h3>
            <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
