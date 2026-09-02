"use client";

import React, { useState } from 'react';

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const POSITION_STYLES = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

/**
 * Faz 54: Framer Motion'dan arındırılmış, saf CSS opacity ve transform
 * geçişli, sıfır-jank hafif Tooltip bileşeni.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <div
        role="tooltip"
        aria-hidden={!isVisible}
        className={`absolute z-50 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-semibold rounded-lg shadow-xl whitespace-nowrap pointer-events-none transition-all duration-150 ease-out transform-gpu ${POSITION_STYLES[position]} ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
