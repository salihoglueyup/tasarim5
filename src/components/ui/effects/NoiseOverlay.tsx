export default function NoiseOverlay() {
  // GPU performans optimizasyonu: Fullscreen SVG feTurbulence ve mix-blend-overlay
  // her scroll/mouse hareketinde tüm ekranın GPU'da yeniden hesaplanmasına (jank/lag)
  // sebep olduğu için devre dışı bırakıldı (60+ FPS kararlılık).
  return null;
}

