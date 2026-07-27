/**
 * Lead (talep) veri modeli — Fonksiyonel Katman Track 1.
 * Tüm site formları (iletişim, teklif sihirbazı, newsletter, geri-arama)
 * tek bir normalleştirilmiş Lead tipine indirgenir ve /api/lead'e POST edilir.
 */

export type LeadType = 'contact' | 'quote' | 'newsletter' | 'callback';

export interface Lead {
  type: LeadType;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  /** Kaynak sayfa, dil, hesaplayıcı çıktısı, UTM vb. serbest bağlam. */
  meta?: Record<string, string | number | boolean | null | undefined>;
}

/** Tek bir bildirim/kayıt kanalının sonucu. */
export interface ChannelResult {
  channel: 'email' | 'telegram' | 'database';
  status: 'ok' | 'skipped' | 'error';
  detail?: string;
}

/** dispatchLead toplu sonucu. */
export interface DispatchResult {
  ok: boolean;
  channels: ChannelResult[];
}
