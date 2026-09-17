"use client";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Donanım hızlandırmalı yerel akıcı kaydırma:
  // JS tabanlı Lenis scroll döngüsü kaldırıldı; işletim sistemi ve GPU'nun
  // doğal 120 FPS / 144 Hz kaydırma performansı devrede.
  return <>{children}</>;
}
