import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { rateLimitSlidingWindow, applyApiRateLimit } from './rateLimiter';
import { checkBotSubmission } from './botProtection';
import { generateCsrfToken, validateCsrfToken } from './csrf';
import { generateETag, createETagResponse } from './etag';

describe('Wave 8: Faz 176 - Faz 180 Güvenlik, Rate Limiting, CSRF, ETag & DB Projeksiyonları', () => {
  it('Faz 176: Sliding-window rate limiter dakikada 60 istek sınırını ve kalan sayıyı doğru hesaplar', async () => {
    const testIp = '192.168.1.105';
    const res1 = await applyApiRateLimit(testIp, 'unit_test', 3, 60);
    expect(res1.success).toBe(true);
    expect(res1.limit).toBe(3);
    expect(res1.remaining).toBe(2);

    const res2 = await applyApiRateLimit(testIp, 'unit_test', 3, 60);
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = await applyApiRateLimit(testIp, 'unit_test', 3, 60);
    expect(res3.success).toBe(true);
    expect(res3.remaining).toBe(0);

    const res4 = await applyApiRateLimit(testIp, 'unit_test', 3, 60);
    expect(res4.success).toBe(false);
    expect(res4.remaining).toBe(0);
  });

  it('Faz 177: checkBotSubmission honeypot alanlarını ve 2 saniyenin altındaki hızlı bot gönderimlerini yakalar', () => {
    // Normal insan gönderimi
    const humanSubmission = checkBotSubmission({
      name: 'Ahmet Yılmaz',
      phone: '05321112233',
      elapsedMs: 4500,
    });
    expect(humanSubmission.isBot).toBe(false);

    // Honeypot dolmuş bot gönderimi
    const botWithHoneypot = checkBotSubmission({
      name: 'Bot User',
      company: 'Spam Corp',
      elapsedMs: 5000,
    });
    expect(botWithHoneypot.isBot).toBe(true);
    expect(botWithHoneypot.reason).toBe('honeypot');

    // Çok hızlı gönderim (< 2 saniye)
    const fastBot = checkBotSubmission({
      name: 'Fast Bot',
      elapsedMs: 800,
    });
    expect(fastBot.isBot).toBe(true);
    expect(fastBot.reason).toBe('fast_submission');
  });

  it('Faz 178: generateCsrfToken ve validateCsrfToken kriptografik HMAC doğrulaması yapar', () => {
    const { token, signature } = generateCsrfToken();
    expect(token).toBeDefined();
    expect(signature).toBeDefined();

    // Geçerli token kontrolü
    const isValid = validateCsrfToken(token, signature);
    expect(isValid).toBe(true);

    // Sahte imza kontrolü
    const isFakeValid = validateCsrfToken(token, 'fake_hex_signature_1234567890abcdef');
    expect(isFakeValid).toBe(false);

    // Boş token kontrolü
    expect(validateCsrfToken(null, signature)).toBe(false);
  });

  it('Faz 179: ETag üretimi ve If-None-Match eşleşmesinde 304 Not Modified yanıtı döner', () => {
    const payload = { message: 'Alo Yönetim API Verisi', version: '2026.1' };
    const etag = generateETag(payload);
    expect(etag).toMatch(/^"[A-Za-z0-9_-]+"$/);

    // İlk istek (If-None-Match yok -> 200 döner)
    const req1 = new Request('https://aloyonetim.com.tr/api/test');
    const res1 = createETagResponse(req1, payload);
    expect(res1.status).toBe(200);
    expect(res1.headers.get('ETag')).toBe(etag);

    // İkinci istek (Doğru ETag ile If-None-Match gönderildiğinde -> 304 Not Modified döner)
    const req2 = new Request('https://aloyonetim.com.tr/api/test', {
      headers: { 'if-none-match': etag },
    });
    const res2 = createETagResponse(req2, payload);
    expect(res2.status).toBe(304);
  });

  it('Faz 180: Admin dashboard ve posts sorgularında SELECT * yerine select projeksiyonları kullanılır', () => {
    const dashboardPagePath = path.resolve(process.cwd(), 'src/app/[lang]/admin/dashboard/page.tsx');
    const postsPagePath = path.resolve(process.cwd(), 'src/app/[lang]/admin/posts/page.tsx');

    const dashboardContent = fs.readFileSync(dashboardPagePath, 'utf-8');
    const postsContent = fs.readFileSync(postsPagePath, 'utf-8');

    expect(dashboardContent).toContain('select: {');
    expect(dashboardContent).toContain('category: {');
    expect(postsContent).toContain('select: {');
    expect(postsContent).toContain('category: {');
    expect(postsContent).toContain('author: {');
  });
});
