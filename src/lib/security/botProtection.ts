export interface BotProtectionOptions {
  honeypotFields?: string[];
  minTimeMs?: number; // Minimum insan doldurma süresi (varsayılan: 2000ms)
  maxAgeMs?: number; // Formun maksimum geçerlilik süresi (varsayılan: 24 saat)
}

export interface BotProtectionResult {
  isBot: boolean;
  reason?: 'honeypot' | 'fast_submission' | 'expired_timestamp' | 'future_timestamp';
}

const DEFAULT_HONEYPOT_FIELDS = ['company', 'website', 'fax', 'hp_field'];
const DEFAULT_MIN_TIME_MS = 2000;
const DEFAULT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/**
 * Faz 177: İletişim ve Teklif Formu API Bot Koruması
 * (Honeypot + Zaman Damgası Kontrolü)
 */
export function checkBotSubmission(
  payload: Record<string, unknown>,
  options: BotProtectionOptions = {}
): BotProtectionResult {
  const honeypotFields = options.honeypotFields || DEFAULT_HONEYPOT_FIELDS;
  const minTimeMs = options.minTimeMs ?? DEFAULT_MIN_TIME_MS;
  const maxAgeMs = options.maxAgeMs ?? DEFAULT_MAX_AGE_MS;
  const now = Date.now();

  // 1. Honeypot Alanları Kontrolü
  for (const field of honeypotFields) {
    const val = payload[field];
    if (typeof val === 'string' && val.trim().length > 0) {
      return { isBot: true, reason: 'honeypot' };
    }
  }

  // 2. elapsedMs Kontrolü (İstemci tarafından hesaplanan doldurma süresi)
  if ('elapsedMs' in payload) {
    const elapsed = Number(payload.elapsedMs);
    if (Number.isFinite(elapsed) && elapsed < minTimeMs) {
      return { isBot: true, reason: 'fast_submission' };
    }
  }

  // 3. Form Açılış Zaman Damgası (timestamp / formStartTime) Kontrolü
  const timestampRaw = payload.timestamp || payload.formStartTime;
  if (timestampRaw !== undefined) {
    const formStartTime = Number(timestampRaw);
    if (Number.isFinite(formStartTime)) {
      // Gelecek zaman damgası kontrolü (saat farkı toleransı 5 saniye)
      if (formStartTime > now + 5000) {
        return { isBot: true, reason: 'future_timestamp' };
      }

      // Çok hızlı gönderim (< 2 saniye)
      if (now - formStartTime < minTimeMs) {
        return { isBot: true, reason: 'fast_submission' };
      }

      // Aşırı eski form (> 24 saat)
      if (now - formStartTime > maxAgeMs) {
        return { isBot: true, reason: 'expired_timestamp' };
      }
    }
  }

  return { isBot: false };
}
