"use client";

import { useQuote } from '@/context/QuoteContext';

/**
 * Teklif modalını açan küçük client "island" (SEO V4 Faz 87).
 * Sayfa gövdesi sunucu bileşeni olarak SSR edilirken yalnız bu buton
 * interaktiftir; böylece içerik HTML'de garanti kalır.
 */
export default function QuoteCtaButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { openQuoteModal } = useQuote();
  return (
    <button type="button" onClick={openQuoteModal} className={className}>
      {children}
    </button>
  );
}
