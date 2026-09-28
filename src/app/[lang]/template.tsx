// Sayfa geçiş animasyonu yalnızca CSS'tir (globals.css → .page-enter). Eski framer-motion sarmalayıcısı
// SSR HTML'ini `opacity: 0` ile gizliyor ve içeriği JS hidrasyonuna kadar görünmez bırakıyordu (LCP gecikmesi).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
