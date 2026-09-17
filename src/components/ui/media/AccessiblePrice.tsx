import React from 'react';

export interface AccessiblePriceProps {
  amount: number | string;
  currencySymbol?: string;
  currencyName?: string;
  period?: string; // örn: "ay" veya "daire / ay"
  className?: string;
}

/**
 * Faz 221: Erişilebilir Para Birimi ve Fiyat Gösterimi (WCAG 1.3.1)
 * Ekran okuyucuların "₺" sembolünü atlamasını veya yanlış telaffuz etmesini önlemek
 * için görsel sembolü `aria-hidden="true"` ile gizler, `sr-only` ile net metin okutur.
 */
export default function AccessiblePrice({
  amount,
  currencySymbol = '₺',
  currencyName = 'Türk Lirası',
  period,
  className = '',
}: AccessiblePriceProps) {
  const formattedAmount = typeof amount === 'number' ? amount.toLocaleString('tr-TR') : amount;

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {/* Gören kullanıcılar için görsel çıktı */}
      <span aria-hidden="true">
        {formattedAmount} {currencySymbol}
        {period && <span className="text-xs opacity-75">/{period}</span>}
      </span>

      {/* Ekran okuyucular için kusursuz sesli metin */}
      <span className="sr-only">
        {formattedAmount} {currencyName}
        {period && ` (${period} başına)`}
      </span>
    </span>
  );
}

/**
 * Yardımcı fonksiyon: saf dize olarak hem görsel hem erişilebilir format üretir
 */
export function formatAccessiblePrice(
  amount: number | string,
  currencyName: string = 'Türk Lirası'
): { visual: string; accessible: string } {
  const formattedAmount = typeof amount === 'number' ? amount.toLocaleString('tr-TR') : amount;
  return {
    visual: `${formattedAmount} ₺`,
    accessible: `${formattedAmount} ${currencyName}`,
  };
}
