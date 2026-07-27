"use client";

import { useQuote } from '@/context/QuoteContext';

/**
 * Teklif modalını açan küçük client "island" (SEO V4 Faz 87).
 * Sayfa gövdesi sunucu bileşeni olarak SSR edilirken yalnız bu buton
 * interaktiftir; böylece içerik HTML'de garanti kalır.
 * Tıklamada GA4 dönüşüm event'i tetiklenir (Faz 240).
 */
export default function QuoteCtaButton({
  children,
  className,
  location,
}: {
  children: React.ReactNode;
  className?: string;
  /** Event'te hangi sayfadan açıldığını işaretlemek için (ör. "kadikoy"). */
  location?: string;
}) {
  const { openQuoteModal } = useQuote();
  const handleClick = () => {
    // Faz 17: Analytics sadece etkileşim anında dinamik yüklenir
    import('@/lib/analytics').then(({ trackEvent, AnalyticsEvents }) => {
      trackEvent(AnalyticsEvents.openQuoteModal, location ? { location } : {});
    });
    openQuoteModal();
  };
  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
