"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 0.2, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Jank önleme: rect'i her mousemove'da okumak yerine hover başında bir kez ölç ve önbelleğe al.
  // Böylece sıcak yolda (mousemove) senkron layout okuması (getBoundingClientRect) kalkar.
  const rectRef = useRef<DOMRect | null>(null);

  // Sıfır Re-Render (Zero Re-Render) Hızlandırması (v6): State yerine doğrudan MotionValue!
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const cacheRect = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    // rect önbellekte yoksa (ör. onMouseEnter kaçırıldıysa) tembel oku.
    let rect = rectRef.current;
    if (!rect) {
      if (!ref.current) return;
      rect = ref.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);

    // React state tetiklenmeden doğrudan GPU animasyon motoruna iletilir!
    rawX.set(middleX * strength);
    rawY.set(middleY * strength);
  };

  const reset = () => {
    rectRef.current = null;
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className={`relative inline-flex ${className}`}
      ref={ref}
      onMouseEnter={cacheRect}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
