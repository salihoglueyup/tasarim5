import React from 'react';

export type FlagCode = 'tr' | 'en' | 'ru' | 'ar' | string;

export interface FlagIconProps {
  code: FlagCode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

// 4:3 Resmi Bayrak Oranları
const SIZE_MAP = {
  xs: 'w-[18px] h-[13.5px]', // Navbar hap butonu için keskin 4:3
  sm: 'w-5 h-[15px]',        // Menü içi satırlar için ideal 4:3
  md: 'w-6 h-[18px]',        // Orta boy
  lg: 'w-8 h-6',             // Büyük boy
};

const LABELS: Record<string, string> = {
  tr: 'Türkiye',
  en: 'English (United Kingdom)',
  ru: 'Русский (Россия)',
  ar: 'العربية (السعودية)',
};

/**
 * Resmi lipis/flag-icons standartlarında, %100 oranlı ve piksel keskinliğinde
 * vektörel SVG Bayrak Bileşeni.
 */
export default function FlagIcon({
  code,
  className = '',
  size = 'sm',
  ariaLabel,
}: FlagIconProps) {
  const normalized = (code || 'tr').toLowerCase();
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.sm;
  const label = ariaLabel || LABELS[normalized] || normalized.toUpperCase();

  const containerClasses = `inline-flex items-center justify-center shrink-0 overflow-hidden rounded-[3px] border border-black/15 dark:border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.12)] ${sizeClass} ${className}`;

  switch (normalized) {
    case 'tr':
      return (
        <span className={containerClasses} title={label} aria-label={label} role="img">
          <svg viewBox="0 0 640 480" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd">
              <path fill="#e30a17" d="M0 0h640v480H0z" />
              <path fill="#fff" d="M407 247.5c0 66.2-54.6 119.9-122 119.9s-122-53.7-122-120 54.6-119.8 122-119.8 122 53.7 122 119.9" />
              <path fill="#e30a17" d="M413 247.5c0 53-43.6 95.9-97.5 95.9s-97.6-43-97.6-96 43.7-95.8 97.6-95.8 97.6 42.9 97.6 95.9z" />
              <path fill="#fff" d="m430.7 191.5-1 44.3-41.3 11.2 40.8 14.5-1 40.7 26.5-31.8 40.2 14-23.2-34.1 28.3-33.9-43.5 12-25.8-37z" />
            </g>
          </svg>
        </span>
      );

    case 'en':
    case 'gb':
    case 'uk':
      return (
        <span className={containerClasses} title={label} aria-label={label} role="img">
          <svg viewBox="0 0 640 480" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
            <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
            <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
            <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
          </svg>
        </span>
      );

    case 'ru':
      return (
        <span className={containerClasses} title={label} aria-label={label} role="img">
          <svg viewBox="0 0 640 480" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd">
              <path fill="#fff" d="M0 0h640v160H0z" />
              <path fill="#0039a6" d="M0 160h640v160H0z" />
              <path fill="#d52b1e" d="M0 320h640v160H0z" />
            </g>
          </svg>
        </span>
      );

    case 'ar':
    case 'sa':
      return (
        <span className={containerClasses} title={label} aria-label={label} role="img">
          <svg viewBox="0 0 640 480" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            <path fill="#165d31" d="M0 0h640v480H0z" />
            <g fill="#fff" transform="translate(40, 20) scale(0.88)">
              {/* İnce Şahadet Yazısı Silüeti */}
              <path d="M120 180c4-12 16-12 22 0v36h-8v-28c-3-6-8-6-11 0v28h-8v-36h5zm38-6c10 0 16 8 16 18v26h-8v-20c0-6-3-10-7-10s-8 4-8 10v20h-8v-44h8v10zm38 6c4-12 16-12 22 0v36h-8v-28c-3-6-8-6-11 0v28h-8v-36h5zm38-6c10 0 16 8 16 18v26h-8v-20c0-6-3-10-7-10s-8 4-8 10v20h-8v-44h8v10zm38 6c4-12 16-12 22 0v36h-8v-28c-3-6-8-6-11 0v28h-8v-36h5zm38-6c10 0 16 8 16 18v26h-8v-20c0-6-3-10-7-10s-8 4-8 10v20h-8v-44h8v10zm38 6c4-12 16-12 22 0v36h-8v-28c-3-6-8-6-11 0v28h-8v-36h5z" opacity="0.95" />
              <path d="M140 230h280c6 0 10 3 10 6s-4 6-10 6H140c-6 0-10-3-10-6s4-6 10-6z" opacity="0.9" />
              {/* İkonik Arap Kılıcı */}
              <path d="M130 280h290c10 0 18 5 18 5s-8 5-18 5H130c-5 0-9-3-9-5s4-5 9-5z" />
              <path d="M420 274v18h10v-18z" />
              <circle cx="438" cy="283" r="4.5" />
            </g>
          </svg>
        </span>
      );

    default:
      return (
        <span className={containerClasses} title={label} aria-label={label} role="img">
          <span className="text-[10px] font-black uppercase text-slate-700 bg-slate-100 w-full h-full flex items-center justify-center">
            {normalized.slice(0, 2)}
          </span>
        </span>
      );
  }
}
