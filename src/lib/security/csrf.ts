import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET || 'alo_yonetim_csrf_secure_token_secret_2026';
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000; // 2 saat

export interface CsrfTokenPair {
  token: string;
  signature: string;
}

/**
 * Faz 178: Form Gönderimlerinde Kriptografik CSRF Token Üretimi
 * (HMAC-SHA256 & Zaman Damgalı)
 */
export function generateCsrfToken(): CsrfTokenPair {
  const nonce = crypto.randomBytes(16).toString('hex');
  const timestamp = Date.now().toString(36);
  const token = `${nonce}.${timestamp}`;

  const signature = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(token)
    .digest('hex');

  return { token, signature };
}

/**
 * Faz 178: CSRF Token Doğrulama (Timing-Safe Karşılaştırma)
 */
export function validateCsrfToken(token: string | null | undefined, signature: string | null | undefined): boolean {
  if (!token || !signature) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [, timestampStr] = parts;
  const timestamp = parseInt(timestampStr, 36);

  if (isNaN(timestamp)) return false;

  // Süre aşımı kontrolü (2 saat)
  const now = Date.now();
  if (now - timestamp > TOKEN_TTL_MS || timestamp > now + 5000) {
    return false;
  }

  // Beklenen imzayı hesapla
  const expectedSignature = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(token)
    .digest('hex');

  try {
    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
