"use client";

import { motion } from 'framer-motion';

export default function BentoServices() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <section id="hizmetler" className="py-32 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)] mb-6">
          Kusursuz işleyen bir sistem.
        </h2>
        <p className="text-xl text-[var(--color-secondary)] max-w-2xl mx-auto font-light">
          Klasik yönetim anlayışını unutun. Sitenizin her hücresini teknoloji ve insan odaklı yeni nesil bir mimariyle yönetiyoruz.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-6"
      >
        
        {/* Card 1: Güvenlik (Large) */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 md:row-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors"></div>
          <span className="material-symbols-outlined text-5xl text-[var(--color-primary)] mb-6">shield_person</span>
          <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-4">7/24 Kesintisiz Güvenlik</h3>
          <p className="text-[var(--color-secondary)] text-lg leading-relaxed max-w-md">
            Özel eğitimli personelimiz ve son teknoloji kamera/plaka tanıma sistemlerimizle sitenizin sınırlarından içeri sadece huzur girebilir.
          </p>
          <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
            <span className="material-symbols-outlined text-3xl text-[var(--color-secondary)]">arrow_forward</span>
          </div>
        </motion.div>

        {/* Card 2: Temizlik */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
        >
          <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">cleaning_services</span>
          <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">Premium Temizlik</h3>
          <p className="text-[var(--color-secondary)] leading-relaxed">
            Ortak alanlar, otoparklar ve peyzaj alanları her sabah ilk günkü parlaklığına kavuşur. Endüstriyel değil, butik temizlik anlayışı.
          </p>
        </motion.div>

        {/* Card 3: Aidat & Finans */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">account_balance_wallet</span>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">Şeffaf Finans</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              Tek tuşla aidat ödeme, anlık gelir-gider takibi ve %100 şeffaf bilanço paylaşımı.
            </p>
          </div>
        </motion.div>

        {/* Card 4: Hukuk */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-1 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
        >
          <div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4">gavel</span>
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">Hukuki Koruma</h3>
            <p className="text-[var(--color-secondary)] text-sm leading-relaxed">
              Geçiken aidatlar ve komşu anlaşmazlıkları için anında avukat desteği.
            </p>
          </div>
        </motion.div>

        {/* Card 5: Teknik Bakım */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex items-center gap-8"
        >
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">Periyodik Teknik Bakım</h3>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              Asansör, jeneratör, havuz dairesi ve yangın sistemleri arızalanmadan önce düzenli bakımla korunur. Sürpriz masraflara son.
            </p>
          </div>
          <div className="w-20 h-20 bg-[var(--color-background)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined text-3xl text-[var(--color-primary)]">engineering</span>
          </div>
        </motion.div>

        {/* Card 6: Sosyal Tesisler */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-[var(--color-surface)] rounded-[2.5rem] p-10 border border-[var(--color-outline)]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-surface-variant)] opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4 relative z-10">pool</span>
          <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3 relative z-10">Sosyal Alan & Havuz Yönetimi</h3>
          <p className="text-[var(--color-secondary)] leading-relaxed relative z-10">
            Sağlık Bakanlığı standartlarında havuz kimyasalları ölçümü, spor salonu bakımı ve peyzajın 4 mevsim yeşil kalması.
          </p>
        </motion.div>

      </motion.div>

    </section>
  );
}
