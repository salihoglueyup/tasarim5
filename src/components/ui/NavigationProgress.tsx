"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Rota (pathname veya searchParams) değiştiğinde yüklemeyi 100%'e tamamla ve gizle
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    setProgress((prev) => {
      if (prev > 0) {
        finishTimerRef.current = setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 300);
        return 100;
      }
      return prev;
    });

    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, [pathname, searchParams]);

  // Sayfa içi link tıklamalarını yakalayarak anında (0 ms) yükleme barını başlat
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      // Yeni sekmede açılanlar, anchor (#) linkleri, boş linkler veya aynı sayfa linklerini yoksay
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        targetAttr === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Harici link mi kontrol et
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      } catch {
        return;
      }

      // İçi boş navigasyon başlat
      if (timerRef.current) clearInterval(timerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);

      setIsVisible(true);
      setProgress(15);

      // Yükleme sırasında %85'e kadar pürüzsüzce ilerle
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 85;
          }
          const diff = (85 - prev) * 0.15;
          return prev + Math.max(diff, 1);
        });
      }, 100);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timerRef.current) clearInterval(timerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, []);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[99999] pointer-events-none transition-opacity duration-300 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.9)] origin-left transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          transform: "translateZ(0)",
          willChange: "width, opacity",
        }}
      />
    </div>
  );
}
