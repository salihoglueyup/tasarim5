/**
 * GA4 event yardımcı (SEO Master Plan V4 — Bölüm J, Faz 240/243).
 *
 * Ana dönüşümleri (teklif modalı, tıkla-ara, form gönderimi) GA4'e event olarak
 * gönderir. GA yalnız `NEXT_PUBLIC_GA_ID` tanımlıysa yüklendiğinden (Faz 10),
 * `gtag` yoksa çağrı sessizce no-op olur — hata üretmez.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: EventParams) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  } else if (Array.isArray((window as any).dataLayer)) {
    // GA henüz hazır değilse dataLayer'a bırak (gtag hazır olunca işlenir).
    (window as any).dataLayer.push({ event: name, ...params });
  }
}

// Standart dönüşüm event adları (tutarlılık için tek yerden).
export const AnalyticsEvents = {
  openQuoteModal: 'open_quote_modal',
  submitQuote: 'generate_lead',
  submitContact: 'contact_form_submit',
  clickToCall: 'click_to_call',
  clickWhatsApp: 'click_whatsapp',
} as const;
