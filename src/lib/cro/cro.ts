/**
 * CRO (dönüşüm) yardımcıları — WhatsApp tıkla-konuş bağlantısı.
 * Numara env-gated: NEXT_PUBLIC_WHATSAPP_NUMBER tanımlıysa onu, yoksa
 * kurumsal varsayılanı kullanır (buton her zaman çalışır).
 */

// Uluslararası format, yalnız rakam (+, boşluk, tire olmadan). Örn: 905505504848
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '902165504848';

/** Ön-dolu mesajlı WhatsApp bağlantısı üretir. */
export function waLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
