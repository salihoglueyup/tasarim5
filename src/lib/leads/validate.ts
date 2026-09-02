import type { Lead, LeadType } from './types';
import trCommon from '@/i18n/locales/tr/common.json';
import enCommon from '@/i18n/locales/en/common.json';
import ruCommon from '@/i18n/locales/ru/common.json';
import arCommon from '@/i18n/locales/ar/common.json';

const ERROR_DICTS: Record<string, Record<string, string>> = {
  tr: trCommon,
  en: enCommon,
  ru: ruCommon,
  ar: arCommon,
};

/**
 * Faz 172: Çok Dilli Form Hata ve Doğrulama Mesajları
 */
export function getValidationErrorMessage(errorKey: string, lang: string = 'tr'): string {
  const dict = ERROR_DICTS[lang] || ERROR_DICTS.tr;
  return dict[errorKey] || dict['lead_error_generic'] || 'Bir sorun oluştu.';
}

/**
 * Hafif, bağımlılıksız lead doğrulama + normalizasyon (Track 1).
 * Harici validation kütüphanesi eklemeden; her form tipinin zorunlu
 * alanlarını denetler, string'leri trim'ler ve TR telefonu normalize eder.
 */

const LEAD_TYPES: LeadType[] = ['contact', 'quote', 'newsletter', 'callback'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 2000;

export interface ValidationResult {
  valid: boolean;
  /** i18n mesaj anahtarı — frontend `t()` ile gösterebilir. */
  errorKey?: string;
  /** Doğrudan yerelleştirilmiş hata mesajı (Faz 172). */
  errorMessage?: string;
  /** Temizlenmiş/normalize edilmiş lead (valid ise). */
  lead?: Lead;
}

/** TR telefon numarasını sadeleştir: rakamlar + baştaki +. */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const plus = trimmed.startsWith('+') ? '+' : '';
  const digits = trimmed.replace(/\D/g, '');
  return `${plus}${digits}`;
}

function clean(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed.slice(0, MAX_LEN) : undefined;
}

export function validateLead(input: unknown, lang: string = 'tr'): ValidationResult {
  const fail = (errorKey: string): ValidationResult => ({
    valid: false,
    errorKey,
    errorMessage: getValidationErrorMessage(errorKey, lang),
  });

  if (!input || typeof input !== 'object') {
    return fail('lead_error_invalid');
  }

  const raw = input as Record<string, unknown>;
  const type = raw.type as LeadType;

  if (!LEAD_TYPES.includes(type)) {
    return fail('lead_error_invalid');
  }

  const name = clean(raw.name);
  const email = clean(raw.email);
  const phoneRaw = clean(raw.phone);
  const phone = phoneRaw ? normalizePhone(phoneRaw) : undefined;
  const message = clean(raw.message);

  // E-posta verildiyse formatı geçerli olmalı.
  if (email && !EMAIL_RE.test(email)) {
    return fail('lead_error_email');
  }
  // Telefon verildiyse en az 10 rakam içermeli.
  if (phone && phone.replace(/\D/g, '').length < 10) {
    return fail('lead_error_phone');
  }

  // Tip bazlı zorunlu alanlar.
  switch (type) {
    case 'newsletter':
      if (!email) return fail('lead_error_email');
      break;
    case 'callback':
      if (!name || !phone) return fail('lead_error_required');
      break;
    case 'contact':
    case 'quote':
      if (!name) return fail('lead_error_required');
      if (!phone && !email) return fail('lead_error_contact');
      break;
  }

  const meta =
    raw.meta && typeof raw.meta === 'object' && !Array.isArray(raw.meta)
      ? (raw.meta as Lead['meta'])
      : undefined;

  return {
    valid: true,
    lead: { type, name, email, phone, message, meta },
  };
}
