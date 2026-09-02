import React from 'react';

/**
 * Faz 72: UI ikonlarının SVG boyutlarını (width/height), aria-hidden ve viewBox
 * tanımlarını optimize ederek HTML ayrıştırma anında layout shift'i sıfırlama.
 */
export default function AppBadges() {
  const badgeClasses = "flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-4 py-2 rounded-xl hover:from-[#252525] hover:to-[#0a0a0a] transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group cursor-pointer";

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 pt-2">
      {/* App Store */}
      <button
        type="button"
        title="Yakında App Store'da"
        className={badgeClasses}
      >
        <svg 
          viewBox="0 0 384 512" 
          width="28" 
          height="28" 
          aria-hidden="true" 
          fill="white" 
          className="w-7 h-7 shrink-0"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-medium text-white/80 leading-none">Download on the</span>
          <span className="text-lg font-bold text-white leading-tight mt-0.5 tracking-tight">App Store</span>
        </div>
      </button>

      {/* Google Play */}
      <button
        type="button"
        title="Yakında Google Play'de"
        className={badgeClasses}
      >
        <svg 
          viewBox="0 0 512 512" 
          width="28" 
          height="28" 
          aria-hidden="true" 
          className="w-7 h-7 shrink-0"
        >
          <path fill="#4285F4" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
          <path fill="#34A853" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
          <path fill="#EA4335" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
          <path fill="#FBBC05" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z"/>
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-medium text-white/80 leading-none uppercase">GET IT ON</span>
          <span className="text-lg font-bold text-white leading-tight mt-0.5 tracking-tight">Google Play</span>
        </div>
      </button>
      
      {/* Huawei AppGallery */}
      <button
        type="button"
        title="Yakında AppGallery'de"
        className={badgeClasses}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          aria-hidden="true" 
          fill="#CF0A2C" 
          className="w-7 h-7 shrink-0"
        >
          <path d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3zm7 17H5V8h14v12z"/>
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-medium text-white/80 leading-none uppercase">EXPLORE IT ON</span>
          <span className="text-lg font-bold text-white leading-tight mt-0.5 tracking-tight">AppGallery</span>
        </div>
      </button>
    </div>
  );
}
