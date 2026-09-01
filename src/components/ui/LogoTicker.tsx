"use client";

import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const fallbackBrands = [
  { name: "Emaar Square", logo: null },
  { name: "Zorlu Center", logo: null },
  { name: "Ağaoğlu 1453", logo: null },
  { name: "Sinpaş Altınoran", logo: null },
  { name: "Dap Yapı Vazo Kule", logo: null },
  { name: "Tahincioğlu Palladium", logo: null },
  { name: "Nef Ataköy", logo: null },
  { name: "Rönesans Tower", logo: null },
];

export default function LogoTicker({ dbPartners }: { dbPartners?: { name: string; logo: string | null }[] }) {
  const { t } = useLanguage();

  const brands = dbPartners && dbPartners.length > 0 ? dbPartners : fallbackBrands;

  return (
    <section className="w-full py-16 bg-[var(--color-background)] overflow-hidden border-b border-[var(--color-outline)]/30">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] mb-8 text-center">
        <p className="text-sm font-medium text-[var(--color-tertiary)] uppercase tracking-widest">
          {t('home_logoticker_title')}
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Gradient fades on left and right for smooth entry/exit */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none"></div>

        <div className="flex whitespace-nowrap gap-16 md:gap-32 items-center px-16 animate-marquee">
          {/* We duplicate the list twice to create a seamless infinite loop */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {brand.logo ? (
                <div className="relative h-12 w-32">
                   <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                </div>
              ) : (
                <span className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-primary)]">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
