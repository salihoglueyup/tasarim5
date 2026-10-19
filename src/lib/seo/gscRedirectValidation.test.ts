import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';
import { isIndexable } from '@/lib/seo/indexPolicy';
import sitemap from '@/app/sitemap';

/**
 * Google Search Console — "Yönlendirmeli sayfa" (12.10.2026 / 78 Sayfa)
 * 1-Hop Kalıcı 301 Yönlendirme & Zincir Önleme Doğrulama Test Paketi
 */
const GSC_78_REDIRECT_URLS: string[] = [
  'https://aloyonetim.com.tr/tr/bolgeler/kartal/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/sozluk',
  'https://aloyonetim.com.tr/tr/iletisim',
  'http://aloyonetim.com.tr/',
  'https://aloyonetim.com.tr/tr/istihdam-koprusu',
  'https://aloyonetim.com.tr/tr/bolgeler/avcilar',
  'https://aloyonetim.com.tr/kurumsal',
  'https://aloyonetim.com.tr/kurumsal/hakkimizda',
  'https://aloyonetim.com.tr/tr/kurumsal',
  'https://aloyonetim.com.tr/tr/kurumsal/sertifikalar',
  'https://aloyonetim.com.tr/tr/bolgeler/basaksehir/havuz-bakimi-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/uskudar/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/basaksehir',
  'https://aloyonetim.com.tr/tr/hizmetler/tesis-yonetimi/rehber',
  'https://aloyonetim.com.tr/tr/bolgeler/sancaktepe',
  'https://aloyonetim.com.tr/tr/bolgeler/sisli/temizlik-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/atasehir/guvenlik-yonetimi',
  'https://aloyonetim.com.tr/tr/hizmetler/hukuk-ve-icra-danismanligi',
  'https://aloyonetim.com.tr/hizmetler/hasere-kontrol',
  'https://aloyonetim.com.tr/hizmetler/ozel-guvenlik',
  'https://aloyonetim.com.tr/tag/guvenlik-kursu',
  'https://aloyonetim.com.tr/tr/bolgeler/maltepe',
  'https://aloyonetim.com.tr/tag/guvenlik-egitimi',
  'https://aloyonetim.com.tr/tr/bolgeler/besiktas',
  'https://aloyonetim.com.tr/tr/bolgeler/zeytinburnu',
  'https://aloyonetim.com.tr/tr/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
  'https://aloyonetim.com.tr/tr',
  'http://www.aloyonetim.com.tr/',
  'https://www.aloyonetim.com.tr/',
  'https://aloyonetim.com.tr/tr/referanslar',
  'https://aloyonetim.com.tr/tr/sozluk/kmk-ne-demek-634-sayili-kat-mulkiyeti-kanunu',
  'https://aloyonetim.com.tr/tr/sozluk/kmk-37-isletme-projesi-butce-itiraz-suresi',
  'https://aloyonetim.com.tr/tr/bolgeler/beylikduzu/mahalleler',
  'https://aloyonetim.com.tr/tr/bolgeler/uskudar/mahalleler',
  'https://aloyonetim.com.tr/kurumsal/sertifikalar',
  'https://aloyonetim.com.tr/tr/bolgeler/sancaktepe/mahalleler',
  'https://aloyonetim.com.tr/tr/kurumsal/sertifikalar/dogaya-saygi',
  'https://aloyonetim.com.tr/tr/kurumsal/sertifikalar/iso-26000',
  'https://aloyonetim.com.tr/tr/kurumsal/sertifikalar/iso-45001',
  'https://aloyonetim.com.tr/tr/kurumsal/sertifikalar/iso-22301',
  'https://aloyonetim.com.tr/tr/teklif-al',
  'https://aloyonetim.com.tr/tr/referanslar/bati-atasehir-ticaret-merkezi',
  'https://aloyonetim.com.tr/tr/bolgeler/bayrampasa/temizlik-ve-hijyen',
  'https://aloyonetim.com.tr/en/blog/etiket/sariyer hasere-ve-dezenfeksiyon',
  'https://aloyonetim.com.tr/tr/bolgeler/bagcilar/mahalleler',
  'https://aloyonetim.com.tr/blog/etiket/entegre yönetim',
  'https://aloyonetim.com.tr/bolgeler/sariyer/mahalleler/yenıkoy',
  'https://aloyonetim.com.tr/tr/bolgeler/pendik/temizlik-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/atasehir/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/basaksehir/peyzaj-ve-bahce-bakimi',
  'https://aloyonetim.com.tr/tr/bolgeler/atasehir/mahalleler/bati-atasehir',
  'https://aloyonetim.com.tr/45/deneme-haber-3.html',
  'https://aloyonetim.com.tr/tr/sozluk/tse-hyb-12850-belgesi',
  'https://aloyonetim.com.tr/tr/bolgeler/gaziosmanpasa/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/referanslar/horizon-plaza-loft',
  'https://aloyonetim.com.tr/tr/bolgeler/besiktas/temizlik-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/kadikoy/hasere-ve-dezenfeksiyon',
  'https://aloyonetim.com.tr/tr/bolgeler/umraniye/aidat-takibi',
  'https://aloyonetim.com.tr/tr/bolgeler/uskudar/havuz-bakimi-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/sariyer/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/bakirkoy/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/besiktas/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/besiktas/teknik-bakim',
  'https://aloyonetim.com.tr/tr/bolgeler/besiktas/havuz-bakimi-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/beylikduzu/tesis-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/uskudar/guvenlik-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/sariyer/havuz-bakimi-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/beylikduzu/guvenlik-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/umraniye/teknik-bakim',
  'https://aloyonetim.com.tr/tr/bolgeler/atasehir/hasere-ve-dezenfeksiyon',
  'https://aloyonetim.com.tr/tr/bolgeler/bakirkoy/guvenlik-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/kartal/guvenlik-yonetimi',
  'https://aloyonetim.com.tr/tr/bolgeler/besiktas/peyzaj-ve-bahce-bakimi',
  'https://aloyonetim.com.tr/tr/bolgeler/atasehir/aidat-takibi',
  'https://aloyonetim.com.tr/tr/bolgeler/umraniye/havuz-bakimi-ve-hijyen',
  'https://aloyonetim.com.tr/tr/bolgeler/sisli/teknik-bakim',
  'https://aloyonetim.com.tr/tr/bolgeler/maltepe/teknik-bakim',
  'https://aloyonetim.com.tr/tr/bolgeler/umraniye/hukuk-ve-icra-danismanligi',
];

describe('GSC "Yönlendirmeli sayfa" (78 URL) 1-Hop Kalıcı 301 & Zincir Önleme Doğrulaması', () => {
  it('Listedeki 78 URL eksiksiz tanımlanmış olmalı', () => {
    expect(GSC_78_REDIRECT_URLS).toHaveLength(78);
  });

  it('78 URL\'nin tamamı tek adımda (1-hop 301) nihai kanonik HTTPS hedefine yönlenmeli, zincirleme yönlendirme veya noindex üretmemeli', async () => {
    for (const rawUrl of GSC_78_REDIRECT_URLS) {
      const req = new NextRequest(rawUrl, {
        headers: { accept: 'text/html' },
      });
      const res = await middleware(req);

      expect(res.status, `URL 301 dönmeli: ${rawUrl}`).toBe(301);
      const robotsHeader = res.headers.get('X-Robots-Tag') ?? '';
      expect(robotsHeader, `Yönlendirmede noindex olmamalı: ${rawUrl}`).not.toContain('noindex');

      const location = res.headers.get('location');
      expect(location, `Location başlığı olmalı: ${rawUrl}`).toBeTruthy();

      const targetUrl = new URL(location!);
      expect(targetUrl.protocol, `Hedef protokol https: olmalı: ${rawUrl} -> ${location}`).toBe('https:');
      expect(targetUrl.hostname, `Hedef host aloyonetim.com.tr olmalı: ${rawUrl} -> ${location}`).toBe('aloyonetim.com.tr');
      expect(targetUrl.pathname.startsWith('/tr/') || targetUrl.pathname === '/tr', `Hedef URL /tr öneki taşımamalı: ${location}`).toBe(false);

      // Hedef URL tekrar middleware'e girdiğinde 200 OK ve indexable olmalı (2-hop zincir olmamalı!)
      const secondReq = new NextRequest(targetUrl.toString(), {
        headers: { accept: 'text/html' },
      });
      const secondRes = await middleware(secondReq);
      expect(secondRes.status, `Hedef URL 2. kez yönlenmemeli (1-hop kuralı): ${rawUrl} -> ${location}`).toBe(200);
      const secondRobots = secondRes.headers.get('X-Robots-Tag') ?? '';
      expect(secondRobots, `Hedef URL X-Robots-Tag: all taşımalı: ${rawUrl} -> ${location}`).toContain('all');
      expect(secondRobots).not.toContain('noindex');

      const localeMatch = targetUrl.pathname.match(/^\/(en|ru|ar)(\/.*|$)/);
      const targetLocale = localeMatch ? localeMatch[1] : 'tr';
      const cleanTargetPath = localeMatch ? (localeMatch[2] || '/') : targetUrl.pathname;
      expect(
        isIndexable(cleanTargetPath, targetLocale),
        `Hedef rota isIndexable(true) olmalı: ${targetUrl.pathname} (${targetLocale})`
      ).toBe(true);
    }
  });

  it('Çoklu dönüşüm gerektiren eski URL\'ler (/tr/kurumsal, /tr/kurumsal/sertifikalar, /tr/referanslar/:slug, http://www...) tek adımda nihai hedefe ulaşmalı', async () => {
    const multiTransformCases = [
      { input: 'https://aloyonetim.com.tr/tr/kurumsal', expected: 'https://aloyonetim.com.tr/hakkimizda' },
      { input: 'https://aloyonetim.com.tr/tr/kurumsal/sertifikalar', expected: 'https://aloyonetim.com.tr/kurumsal/kalite-belgelerimiz' },
      { input: 'https://aloyonetim.com.tr/kurumsal/sertifikalar', expected: 'https://aloyonetim.com.tr/kurumsal/kalite-belgelerimiz' },
      { input: 'https://aloyonetim.com.tr/tr/referanslar/bati-atasehir-ticaret-merkezi', expected: 'https://aloyonetim.com.tr/referanslar' },
      { input: 'https://aloyonetim.com.tr/tr/referanslar/horizon-plaza-loft', expected: 'https://aloyonetim.com.tr/referanslar' },
      { input: 'http://www.aloyonetim.com.tr/tr/kurumsal', expected: 'https://aloyonetim.com.tr/hakkimizda' },
      { input: 'https://aloyonetim.com.tr/tag/guvenlik-kursu', expected: 'https://aloyonetim.com.tr/guvenlik-akademisi' },
      { input: 'https://aloyonetim.com.tr/tag/guvenlik-egitimi', expected: 'https://aloyonetim.com.tr/guvenlik-akademisi' },
      { input: 'https://aloyonetim.com.tr/45/deneme-haber-3.html', expected: 'https://aloyonetim.com.tr/blog' },
    ];

    for (const tc of multiTransformCases) {
      const res = await middleware(new NextRequest(tc.input, { headers: { accept: 'text/html' } }));
      expect(res.status).toBe(301);
      expect(res.headers.get('location')).toBe(tc.expected);
    }
  });

  it('Ana sitemap.ts hiçbir /tr/ önekli veya yönlendirmeli URL içermemeli', async () => {
    const items = await sitemap();
    const sitemapUrls = new Set(items.map((i) => i.url));

    for (const url of sitemapUrls) {
      expect(url.includes('aloyonetim.com.tr/tr')).toBe(false);
    }
    for (const redirectUrl of GSC_78_REDIRECT_URLS) {
      expect(sitemapUrls.has(redirectUrl)).toBe(false);
    }
  });
});
