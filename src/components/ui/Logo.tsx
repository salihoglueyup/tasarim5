import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'auto' | 'white' | 'dark';
}

export default function Logo({ className = "", variant = 'auto' }: LogoProps) {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 
        Pure Transparent Background Eagle Emblem Logo (new-icon-Photoroom.png)
      */}
      <div className="relative w-[40px] h-[40px] md:w-[44px] md:h-[44px] flex-shrink-0">
        <Image 
          src="/images/logos/new-icon-Photoroom.png" 
          alt="Alo Yönetim Icon" 
          width={44}
          height={44}
          className={`w-full h-full object-contain transition-all duration-300 ${
            isWhite 
              ? 'filter brightness-0 invert drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]' 
              : 'drop-shadow-sm'
          }`}
        />
      </div>
      
      {/* Brand Text Part: Modern High-Contrast Typography */}
      <div className="flex flex-col justify-center">
        <span className={`text-[20px] md:text-[22px] font-[var(--font-section-h2)] font-extrabold leading-none tracking-tight mb-1 transition-colors duration-300 ${
          isWhite 
            ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]' 
            : 'text-slate-900 dark:text-white'
        }`}>
          ALO YÖNETİM
        </span>
        <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-extrabold leading-none transition-colors duration-300 ${
          isWhite 
            ? 'text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]' 
            : 'text-slate-500 dark:text-slate-400'
        }`}>
          Tesis Yönetimi
        </span>
      </div>
    </div>
  );
}
