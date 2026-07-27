import type { Lead, LeadType } from './types';

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

export function validateLead(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object') {
    return { valid: false, errorKey: 'lead_error_invalid' };
  }

  const raw = input as Record<string, unknown>;
  const type = raw.type as LeadType;

  if (!LEAD_TYPES.includes(type)) {
    return { valid: false, errorKey: 'lead_error_invalid' };
  }

  const name = clean(raw.name);
  const email = clean(raw.email);
  const phoneRaw = clean(raw.phone);
  const phone = phoneRaw ? normalizePhone(phoneRaw) : undefined;
  const message = clean(raw.message);

  // E-posta verildiyse formatı geçerli olmalı.
  if (email && !EMAIL_RE.test(email)) {
    return { valid: false, errorKey: 'lead_error_email' };
  }
  // Telefon verildiyse en az 10 rakam içermeli.
  if (phone && phone.replace(/\D/g, '').length < 10) {
    return { valid: false, errorKey: 'lead_error_phone' };
  }

  // Tip bazlı zorunlu alanlar.
  switch (type) {
    case 'newsletter':
      if (!email) return { valid: false, errorKey: 'lead_error_email' };
      break;
    case 'callback':
      if (!name || !phone) return { valid: false, errorKey: 'lead_error_required' };
      break;
    case 'contact':
    case 'quote':
      if (!name) return { valid: false, errorKey: 'lead_error_required' };
      if (!phone && !email) return { valid: false, errorKey: 'lead_error_contact' };
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
