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
  // Wave 56: GA4 Temel Dönüşüm Etkinlikleri (Önemli Etkinlik / Key Event)
  telefonTikla: 'telefon_tikla',
  whatsappTikla: 'whatsapp_tikla',
  teklifFormuGonderildi: 'teklif_formu_gonderildi',
} as const;

/**
 * Wave 56: Telefon Tıkla-Ara GA4 Dönüşüm Takibi
 * @param konum Tıklanan alan ('header' | 'footer' | 'floating' | 'contact_page' | 'quote_modal' | 'body')
 * @param telefon Aranan numara (opsiyonel)
 */
export function trackPhoneClick(konum: string = 'header', telefon?: string): void {
  trackEvent('telefon_tikla', { konum, telefon });
  trackEvent('click_to_call', { location: konum });
}

/**
 * Wave 56: WhatsApp GA4 Dönüşüm Takibi
 * @param konum Tıklanan alan ('floating' | 'header' | 'footer' | 'contact_page')
 */
export function trackWhatsAppClick(konum: string = 'floating'): void {
  trackEvent('whatsapp_tikla', { konum });
  trackEvent('click_whatsapp', { location: konum });
}

/**
 * Wave 56: Teklif Formu Gönderildi GA4 Dönüşüm Takibi
 * @param formTipi Form tipi ('teklif_formu' | 'modal' | 'iletisim' vb.)
 * @param extra Ek form parametreleri (ilçe, hizmet, vb.)
 */
export function trackQuoteSubmit(formTipi: string = 'teklif_formu', extra: EventParams = {}): void {
  trackEvent('teklif_formu_gonderildi', { form_tipi: formTipi, ...extra });
  trackEvent('generate_lead', { form_name: formTipi, ...extra });
}

