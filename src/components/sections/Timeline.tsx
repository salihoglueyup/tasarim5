"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    title: "Ücretsiz Keşif ve Analiz",
    description: "Uzman ekibimiz sitenizi ziyaret eder. Güvenlik, temizlik, teknik altyapı ve mali durum detaylıca analiz edilip bir durum raporu çıkarılır.",
    icon: "search",
  },
  {
    title: "Bütçe ve Planlama",
    description: "Sitenizin ihtiyaçlarına en uygun bütçe taslağı hazırlanır. Gereksiz masraflar kesilir, verimlilik odaklı yeni bir yönetim planı sunulur.",
    icon: "calculate",
  },
  {
    title: "Yönetim Devri",
    description: "Tüm hukuki ve idari süreçler pürüzsüz bir şekilde devralınır. Eski yönetimin bıraktığı eksikler hızla giderilir.",
    icon: "handshake",
  },
  {
    title: "Dijital ve Şeffaf İşleyiş",
    description: "Mobil uygulama üzerinden 7/24 aidat takibi, gelir-gider görüntüleme ve anında destek talebi oluşturma dönemi başlar.",
    icon: "smartphone",
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Scale the line height from 0 to 1 as we scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-32 px-[var(--spacing-gutter)] bg-[var(--color-background)]">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)] mb-6">
            Kaos biter, <br />
            <span className="text-[var(--color-secondary)]">Sistem başlar.</span>
          </h2>
          <p className="text-xl text-[var(--color-secondary)] font-light">
            Sorunlu bir yönetimden, tıkır tıkır işleyen bir sisteme geçiş sürecimiz.
          </p>
        </div>

        <div ref={containerRef} className="relative pl-8 md:pl-0">
          
          {/* Background Line (Dim) */}
          <div className="absolute top-0 left-[39px] md:left-1/2 md:-translate-x-1/2 w-[2px] h-full bg-[var(--color-outline)]/50 rounded-full"></div>
          
          {/* Animated Foreground Line (Filled) */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute top-0 left-[39px] md:left-1/2 md:-translate-x-1/2 w-[2px] h-full bg-[var(--color-primary)] rounded-full z-10"
          ></motion.div>

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[-40px] md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-[var(--color-surface)] border-2 border-[var(--color-primary)] rounded-full flex items-center justify-center z-20 shadow-sm">
                    <span className="material-symbols-outlined text-[var(--color-primary)] text-xl">{step.icon}</span>
                  </div>

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'} pl-6 md:pl-0`}>
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="bg-[var(--color-surface)] p-8 rounded-[2rem] border border-[var(--color-outline)] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="text-sm font-bold text-[var(--color-secondary)] mb-2">Adım 0{index + 1}</div>
                      <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{step.title}</h3>
                      <p className="text-[var(--color-secondary)] leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                  
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
