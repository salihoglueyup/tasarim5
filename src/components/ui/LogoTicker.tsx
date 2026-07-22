"use client";

import { motion } from 'framer-motion';

const brands = [
  "Emaar Square",
  "Zorlu Center",
  "Ağaoğlu 1453",
  "Sinpaş Altınoran",
  "Dap Yapı Vazo Kule",
  "Tahincioğlu Palladium",
  "Nef Ataköy",
  "Rönesans Tower",
];

export default function LogoTicker() {
  return (
    <section className="w-full py-16 bg-[var(--color-background)] overflow-hidden border-b border-[var(--color-outline)]/30">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] mb-8 text-center">
        <p className="text-sm font-medium text-[var(--color-tertiary)] uppercase tracking-widest">
          Türkiye'nin En Prestijli Projeleri Tarafından Tercih Ediliyoruz
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Gradient fades on left and right for smooth entry/exit */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[var(--color-background)] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[var(--color-background)] to-transparent z-10"></div>

        <motion.div 
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center px-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {/* We duplicate the list twice to create a seamless infinite loop */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-primary)]">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
