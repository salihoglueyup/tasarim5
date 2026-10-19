import { describe, it, expect, beforeAll } from 'vitest';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import robots from '@/app/robots';
import { middleware } from '@/middleware';

/**
 * Google Search Console "Robots.txt tarafından engellendi" (15 URL — Doğrulama: 13.10.2026)
 * Regresyon ve Doğrulama Test Paketi
 */
const GSC_ROBOTS_BLOCKED_QUOTE_URLS: string[] = [
  'https://aloyonetim.com.tr/teklif-al?hizmet=guvenlik&bolge=Silivri',
  'https://aloyonetim.com.tr/teklif-al?hizmet=guvenlik&bolge=Şile',
  'https://aloyonetim.com.tr/teklif-al?hizmet=tesis-yonetimi&bolge=sancaktepe',
  'https://aloyonetim.com.tr/teklif-al?hizmet=guvenlik&bolge=Beylikdüzü',
  'https://aloyonetim.com.tr/teklif-al?hizmet=guvenlik&bolge=Ataşehir',
  'https://aloyonetim.com.tr/teklif-al?hizmet=guvenlik&bolge=Ümraniye',
  'https://aloyonetim.com.tr/teklif-al?hizmet=temizlik&bolge=Kadıköy',
  'https://aloyonetim.com.tr/teklif-al?hizmet=teknik-bakim&bolge=Kadıköy',
  'https://aloyonetim.com.tr/teklif-al?paket=orta-olcek',
  'https://aloyonetim.com.tr/teklif-al?hizmet=teknik-bakim&bolge=Bakırköy',
  'https://aloyonetim.com.tr/teklif-al?paket=toplu-yapi',
];

const GSC_ROBOTS_BLOCKED_FONT_URLS: string[] = [
  'https://aloyonetim.com.tr/_next/static/media/1bffadaabf893a1e-s.p.3-6t-g6q0vh0a.woff2',
  'https://aloyonetim.com.tr/_next/static/media/1a099d89ee94ee96-s.p.35a5cae5tspm2.woff2',
  'https://aloyonetim.com.tr/_next/static/media/83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2',
  'https://aloyonetim.com.tr/_next/static/media/fba5a26ea33df6a3-s.p.18rizl4rsrl42.woff2',
];

const ALL_15_GSC_ROBOTS_URLS = [
  ...GSC_ROBOTS_BLOCKED_QUOTE_URLS,
  ...GSC_ROBOTS_BLOCKED_FONT_URLS,
];

/**
 * RFC 9309 (Google robots.txt) kural eşleştirici:
 * En uzun eşleşen kural kazanır; eşit uzunlukta Allow kazanır.
 */
function isAllowedByRobots(urlStr: string, allows: string[], disallows: string[]): boolean {
  const parsed = new URL(urlStr);
  const pathAndQuery = parsed.pathname + parsed.search;

  const patternToRegex = (pattern: string): RegExp => {
    const hasEndAnchor = pattern.endsWith('$');
    const clean = hasEndAnchor ? pattern.slice(0, -1) : pattern;
    const escaped = clean
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');
    return new RegExp(`^${escaped}${hasEndAnchor ? '$' : ''}`);
  };

  let bestAllowLen = -1;
  for (const a of allows) {
    if (patternToRegex(a).test(pathAndQuery)) {
      bestAllowLen = Math.max(bestAllowLen, a.length);
    }
  }

  let bestDisallowLen = -1;
  for (const d of disallows) {
    if (patternToRegex(d).test(pathAndQuery)) {
      bestDisallowLen = Math.max(bestDisallowLen, d.length);
    }
  }

  if (bestDisallowLen === -1) return true;
  return bestAllowLen >= bestDisallowLen;
}

describe('GSC "Robots.txt tarafından engellendi" (15 URL) Doğrulama Paketi', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test_jwt_secret_key_for_vitest_runner_2026';
  });

  it('Rapordaki 15 URL nin tamamı robots.txt (User-agent: * ve AI botları) tarafından ALLOWED olmalı', () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

    for (const rule of rules) {
      const allows = Array.isArray(rule.allow) ? rule.allow : rule.allow ? [rule.allow] : [];
      const disallows = Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : [];

      for (const rawUrl of ALL_15_GSC_ROBOTS_URLS) {
        expect(
          isAllowedByRobots(rawUrl, allows, disallows),
          `${rawUrl} adresi robots.txt tarafından engellenmemeli`
        ).toBe(true);
      }
    }
  });

  it('Rapordaki 11 /teklif-al?... URL si tek adımda (1-hop 301) kanonik /teklif-al sayfasına (200 OK, index) yönlenmeli', async () => {
    for (const rawUrl of GSC_ROBOTS_BLOCKED_QUOTE_URLS) {
      const req1 = new NextRequest(rawUrl, {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      });
      const res1 = await middleware(req1);

      expect(res1.status, `${rawUrl} 301 dönmeli`).toBe(301);
      const location1 = res1.headers.get('location');
      expect(location1).toBeTruthy();

      const targetUrl = new URL(location1!, 'https://aloyonetim.com.tr');
      expect(targetUrl.href, `${rawUrl} doğrudan temiz /teklif-al adresine gitmeli`).toBe(
        'https://aloyonetim.com.tr/teklif-al'
      );

      // Hedef URL doğrudan 200 OK ve indexlenebilir olmalı
      const req2 = new NextRequest(targetUrl.href, {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      });
      const res2 = await middleware(req2);
      expect(res2.status).toBe(200);
      expect(res2.headers.get('X-Robots-Tag') || '').not.toContain('noindex');
    }
  });

  it('Rapordaki 4 eski /_next/static/media/*.woff2 font URL si 404 vermeden mevcut /fonts/inter-latin-wght-normal.woff2 dosyasına (200 OK) çözümlenmeli', async () => {
    const fontDiskPath = path.join(process.cwd(), 'public/fonts/inter-latin-wght-normal.woff2');
    expect(fs.existsSync(fontDiskPath)).toBe(true);

    for (const fontUrl of GSC_ROBOTS_BLOCKED_FONT_URLS) {
      const req = new NextRequest(fontUrl, {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      });
      const res = await middleware(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('x-middleware-rewrite')).toContain('/fonts/inter-latin-wght-normal.woff2');
    }
  });

  it('Bileşenler ve JSON-LD şemaları artık ?hizmet=...&bolge=... parametreli /teklif-al linki üretmemeli', () => {
    const filesToCheck = [
      'src/components/seo/district/DistrictSecurityAuditTableSeo.tsx',
      'src/components/seo/facility/CleaningScheduleGeneratorSeo.tsx',
      'src/lib/schemas/services.ts',
    ];

    for (const relPath of filesToCheck) {
      const content = fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
      expect(content, `${relPath} içinde /teklif-al?hizmet= kalmamalı`).not.toContain('/teklif-al?hizmet=');
    }
  });
});
