"use client";

import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';

export default function VizyonMisyon() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <>
      <PageHeader 
        title="Vizyon & Misyon" 
        description="Sektöre yön veren teknolojik vizyonumuz ve kat maliklerine sunduğumuz temel değerlerimiz." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto overflow-hidden">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-24"
        >
          
          {/* Vision Section */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-[4rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="lg:w-1/3 shrink-0">
                <div className="text-[8rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-100 to-transparent dark:from-white/10 dark:to-transparent leading-none select-none">
                  01
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] -mt-16 relative z-10 pl-2">Vizyon.</h2>
              </div>
              <div className="lg:w-2/3">
                <p className="text-xl md:text-3xl text-[var(--color-secondary)] font-light leading-relaxed">
                  Türkiye genelindeki tüm toplu yaşam alanlarında ve rezidanslarda, <span className="font-semibold text-blue-600 dark:text-blue-400">geleneksel ve kapalı</span> yönetim sistemlerini tamamen ortadan kaldırarak; <span className="font-semibold text-[var(--color-primary)]">%100 şeffaf, yapay zeka destekli ve dijital</span> bir mülk yönetimi standardı inşa etmek.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-outline)] to-transparent" />

          {/* Mission Section */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-[4rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="lg:w-1/3 shrink-0 order-1 lg:order-2 text-right">
                <div className="text-[8rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-100 to-transparent dark:from-white/10 dark:to-transparent leading-none select-none">
                  02
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] -mt-16 relative z-10 pr-2">Misyon.</h2>
              </div>
              <div className="lg:w-2/3 order-2 lg:order-1 text-left lg:text-right">
                <p className="text-xl md:text-3xl text-[var(--color-secondary)] font-light leading-relaxed">
                  Kat maliklerinin aidat kaygılarını ortadan kaldıran <span className="font-semibold text-emerald-600 dark:text-emerald-400">şeffaf bütçe yönetimi</span> sunmak, 7/24 kesintisiz güvenlik ve teknolojik bakımla yaşam kalitesini en üst düzeye çıkarmak ve <span className="font-semibold text-[var(--color-primary)]">binaların gayrimenkul değerini artırmak</span>.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
}
