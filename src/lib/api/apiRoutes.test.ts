import { describe, it, expect, beforeAll } from 'vitest';
import { NextRequest } from 'next/server';

describe('Wave 10 Faz 227: API Uç Noktaları Birim & Entegrasyon Testleri', () => {
  beforeAll(() => {
    process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/alo_yonetim';
    process.env.JWT_SECRET = 'test-jwt-secret-key-at-least-32-chars-long';
  });

  it('GET /api/calculator hesaplayıcı parametrelerini eksiksiz döner', async () => {
    const { GET: getCalculator } = await import('@/app/api/calculator/route');
    const res = await getCalculator();
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('baseCostPerUnit');
    expect(data).toHaveProperty('securityAddon');
    expect(data).toHaveProperty('poolAddon');
    expect(data).toHaveProperty('greenAddon');
    expect(data).toHaveProperty('elevatorAddon');
    expect(data).toHaveProperty('savingsRate');
    expect(typeof data.baseCostPerUnit).toBe('number');
  });

  it('GET /api/health RFC 8485 standartlarında sistem sağlık raporu sunar', async () => {
    const { GET: getHealth } = await import('@/app/api/health/route');
    const res = await getHealth();
    expect([200, 503]).toContain(res.status);

    const data = await res.json();
    expect(data).toHaveProperty('status');
    expect(data).toHaveProperty('latencyMs');
    expect(data).toHaveProperty('services');
    expect(data.services).toHaveProperty('database');
    expect(data.services).toHaveProperty('cache');
    expect(data).toHaveProperty('sla');
    expect(data.sla.targetUptime).toBe('99.9%');
  });

  it('POST /api/lead geçersiz gövde verildiğinde 400 hatası üretir', async () => {
    const { POST: postLead } = await import('@/app/api/lead/route');
    const req = new NextRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: 'invalid-json',
    });

    const res = await postLead(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.errorKey).toBe('lead_error_invalid');
  });

  it('POST /api/lead honeypot (company alanı dolu) içeren bot gönderimini sessizce yutar', async () => {
    const { POST: postLead } = await import('@/app/api/lead/route');
    const req = new NextRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Spam Bot',
        phone: '05551234567',
        email: 'bot@spam.com',
        company: 'Spam Corp Inc', // Honeypot
        elapsedMs: 50, // Çok hızlı bot
      }),
    });

    const res = await postLead(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.channels).toEqual([]);
  });
});
