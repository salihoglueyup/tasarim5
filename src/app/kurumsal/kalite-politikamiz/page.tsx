"use client";

import PageHeader from '@/components/layout/PageHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const qualityCards = [
  {
    title: "ISO 9001:2015",
    subtitle: "Hizmet Standartları Yönetimi",
    desc: "Tüm operasyonlarımız yılda iki kez bağımsız uluslararası denetçiler tarafından denetlenir ve belgelendirilir.",
    icon: "verified",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "ISO 27001",
    subtitle: "Bilgi Güvenliği Yönetimi",
    desc: "Kat maliklerinin kişisel ve finansal verileri 256-bit şifrelemeyle yüksek güvenlikli bulut sunucularında, KVKK ve GDPR'a tam uyumlu olarak korunur.",
    icon: "security",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "ISO 45001",
    subtitle: "İş Sağlığı ve Güvenliği",
    desc: "Tüm saha çalışanlarımızın İSG eğitimleri, periyodik sağlık taramaları ve koruyucu donanım kullanımları 'Sıfır Kaza' vizyonuyla denetlenir.",
    icon: "health_and_safety",
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "ISO 14001",
    subtitle: "Çevre Yönetim Sistemi",
    desc: "Ekolojik temizlik ürünleri kullanımı ve atık yönetimi süreçlerimizle, yaşadığımız çevreye duyarlı sürdürülebilir operasyonlar yürütüyoruz.",
    icon: "eco",
    color: "from-green-500 to-emerald-700"
  },
  {
    title: "Gizli Denetim",
    subtitle: "Saha Hizmetleri Testi",
    desc: "Bağımsız kalite departmanımız tarafından ayda 4 kez habersiz olarak yapılan gizli müşteri ve saha denetimleriyle hizmet kesintisizliği sağlanır.",
    icon: "fact_check",
    color: "from-purple-500 to-indigo-600"
  }
];

export default function KalitePolitikamiz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <PageHeader 
        title="Kalite Politikamız" 
        description="ISO standartlarında şeffaf, ölçülebilir ve bağımsız denetlenen yüksek hizmet kalitesi." 
      />

      <section ref={containerRef} className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
          
          {/* Left Sticky Manifesto */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 flex flex-col gap-8">
              <span className="text-xs font-bold text-blue-600 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
                Kalite Manifestomuz
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] leading-tight tracking-tight">
                Mükemmellik <br />Bir Seçim Değil, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sözümüzdür.</span>
              </h2>
              <div className="space-y-6 text-[var(--color-secondary)] font-light leading-relaxed">
                <p>
                  Alo Yönetim olarak, sadece binaları değil, yaşam kalitesini yönetiyoruz. Bu bilinçle, her operasyon adımımızı uluslararası sertifikalarla güvence altına alıyoruz.
                </p>
                <p>
                  Güvenlikten temizliğe, finanstan hukuka kadar tüm departmanlarımız, bağımsız denetim kuruluşları tarafından düzenli olarak test edilmekte ve belgelenmektedir. 
                  Çünkü şeffaflık ve denetlenebilirlik, kurumsal yönetim anlayışımızın temel taşıdır.
                </p>
              </div>

              {/* Stats Box */}
              <div className="mt-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-8 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-4xl font-black text-blue-600">5+</div>
                  <div className="text-xs font-bold text-[var(--color-secondary)] uppercase mt-1">Uluslararası Sertifika</div>
                </div>
                <div className="w-px h-12 bg-[var(--color-outline)]/50"></div>
                <div>
                  <div className="text-4xl font-black text-emerald-500">48</div>
                  <div className="text-xs font-bold text-[var(--color-secondary)] uppercase mt-1">Yıllık İç Denetim</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Scroll-Animated Cards Timeline */}
          <div className="lg:col-span-7 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-[3.5rem] top-0 bottom-0 w-1 bg-[var(--color-outline)]/30 rounded-full hidden sm:block" />
            <motion.div 
              className="absolute left-6 md:left-[3.5rem] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-emerald-500 rounded-full hidden sm:block origin-top"
              style={{ scaleY: progressBarHeight }}
            />

            <div className="flex flex-col gap-10">
              {qualityCards.map((q, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative flex items-start gap-6 md:gap-10"
                >
                  {/* Timeline Dot */}
                  <div className="hidden sm:flex z-10 w-14 h-14 bg-[var(--color-surface)] border-4 border-white dark:border-slate-900 rounded-full shadow-lg items-center justify-center shrink-0 relative -left-1">
                    <span className={`material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-br ${q.color}`}>
                      {q.icon}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-3 shadow-sm hover:shadow-xl transition-all w-full group relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${q.color} opacity-5 rounded-bl-[100px] -z-0 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <span className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${q.color} tracking-widest uppercase mb-1`}>
                      {q.title}
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--color-primary)] relative z-10">{q.subtitle}</h3>
                    <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed mt-2 relative z-10">{q.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
