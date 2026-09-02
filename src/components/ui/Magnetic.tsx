"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Faz 59: Magnetic bileşeninin mobilde ve dokunmatik ekranlarda
 * (pointer: coarse / touch / <768px) otomatik devre dışı bırakılması.
 * Dokunmatik ekranlarda sıfır JS listener ile saf DOM elemanı döndürülür.
 */
export default function Magnetic({ children, strength = 0.2, className = "" }: MagneticProps) {
  const [isTouch, setIsTouch] = useState(true); // SSR varsayılanı hafif pass-through
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsTouch(isCoarse || isSmallScreen);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const cacheRect = () => {
    if (isTouch) return;
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    let rect = rectRef.current;
    if (!rect) {
      if (!ref.current) return;
      rect = ref.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);

    rawX.set(middleX * strength);
    rawY.set(middleY * strength);
  };

  const reset = () => {
    if (isTouch) return;
    rectRef.current = null;
    rawX.set(0);
    rawY.set(0);
  };

  if (isTouch) {
    return <div className={`relative inline-flex ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative inline-flex ${className}`}
      ref={ref}
      onMouseEnter={cacheRect}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY }}
    >
      {children}
    </motion.div>
  );
}
