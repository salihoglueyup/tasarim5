import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { middleware } from '@/middleware';
import { isIndexable, isLocaleIndexable } from '@/lib/seo/indexPolicy';
import { localePath } from '@/lib/i18n/localePath';
import { buildFacilityEdgeHeaders } from '@/lib/seo/facility/facilityEdgeOptimizer';

/**
 * Google Search Console — "noindex" etiketi tarafından hariç tutuldu (12.10.2026 / 194 Sayfa)
 * Tam Liste Doğrulama Test Paketi
 */
const GSC_194_NOINDEX_URLS: string[] = [
  'https://aloyonetim.com.tr/ru/bolgeler/cekmekoy/mahalleler/omerli',
  'https://aloyonetim.com.tr/ar/bolgeler/avcilar/mahalleler/ambarli',
  'https://aloyonetim.com.tr/ru/sozluk/kat-irtifakindan-kat-mulkiyetine-gecis',
  'https://aloyonetim.com.tr/ar/bolgeler/arnavutkoy/mahalleler/bolluca',
  'https://aloyonetim.com.tr/ru/bolgeler/silivri/mahalleler/semizkumlar',
  'https://aloyonetim.com.tr/en/bolgeler/gaziosmanpasa/mahalleler/barbaros-hayrettin-pasa',
  'https://aloyonetim.com.tr/en/bolgeler/sancaktepe/mahalleler/sarigazi',
  'https://aloyonetim.com.tr/en/bolgeler/sile/mahalleler/agva',
  'https://aloyonetim.com.tr/en/bolgeler/uskudar/mahalleler/kisikli',
  'https://aloyonetim.com.tr/ru/bolgeler/zeytinburnu/mahalleler/sumer',
  'https://aloyonetim.com.tr/ar/bolgeler/bakirkoy/mahalleler/florya',
  'https://aloyonetim.com.tr/en/bolgeler/silivri/mahalleler/semizkumlar',
  'https://aloyonetim.com.tr/ar/bolgeler/tuzla/mahalleler/aydinli',
  'https://aloyonetim.com.tr/ru/bolgeler/uskudar/tesis-yonetimi',
  'https://aloyonetim.com.tr/ar/bolgeler/adalar/mahalleler/burgazada',
  'https://aloyonetim.com.tr/en/bolgeler/kagithane/mahalleler/seyrantepe',
  'https://aloyonetim.com.tr/ru/bolgeler/gaziosmanpasa/mahalleler/barbaros-hayrettin-pasa',
  'https://aloyonetim.com.tr/ru/bolgeler/sultangazi/mahalleler/50-yil',
  'https://aloyonetim.com.tr/ar/bolgeler/eyupsultan/mahalleler/alibeykoy',
  'https://aloyonetim.com.tr/ru/bolgeler/uskudar/mahalleler/acibadem',
  'https://aloyonetim.com.tr/ar/bolgeler/umraniye/havuz-bakimi-ve-hijyen',
  'https://aloyonetim.com.tr/en/bolgeler/sultangazi/mahalleler/esentepe',
  'https://aloyonetim.com.tr/en/bolgeler/bakirkoy/mahalleler/florya',
  'https://aloyonetim.com.tr/en/bolgeler/silivri/mahalleler/selimpasa',
  'https://aloyonetim.com.tr/ru/bolgeler/catalca/mahalleler/ferhatpasa',
  'https://aloyonetim.com.tr/en/bolgeler/beykoz/mahalleler/kanlica',
  'https://aloyonetim.com.tr/ar/bolgeler/maltepe/mahalleler/cevizli-maltepe',
  'https://aloyonetim.com.tr/en/bolgeler/bakirkoy/mahalleler/yesilyurt',
  'https://aloyonetim.com.tr/en/bolgeler/sultangazi/mahalleler/50-yil',
  'https://aloyonetim.com.tr/ru/bolgeler/arnavutkoy/mahalleler/hadimkoy',
  'https://aloyonetim.com.tr/ar/sozluk/kmk-madde-37-isletme-projesi-itiraz-suresi',
  'https://aloyonetim.com.tr/ar/hizmetler/tesis-yonetimi/acik-veri',
  'https://aloyonetim.com.tr/ar/bolgeler',
  'https://aloyonetim.com.tr/ru/sozluk/tse-hyb-12850-belgesi',
  'https://aloyonetim.com.tr/en/bolgeler/buyukcekmece/mahalleler/kumburgaz',
  'https://aloyonetim.com.tr/ru/bolgeler/bayrampasa/mahalleler/muratpasa',
  'https://aloyonetim.com.tr/ar/blog',
  'https://aloyonetim.com.tr/en/bolgeler/cekmekoy',
  'https://aloyonetim.com.tr/ar/bolgeler/tuzla/temizlik-ve-hijyen',
  'https://aloyonetim.com.tr/en/bolgeler/gungoren/mahalleler/tozkoparan',
  'https://aloyonetim.com.tr/ar/sozluk/cctv-kamera-guvenlik-sistemi',
  'https://aloyonetim.com.tr/en/sozluk/plaza-tesis-yonetimi-ortak-gider-paylasimi',
  'https://aloyonetim.com.tr/ru/hizmetler/site-yonetimi',
  'https://aloyonetim.com.tr/en/hizmetler/site-yonetimi',
  'https://aloyonetim.com.tr/ru/bolgeler/catalca/mahalleler/kaleici',
  'https://aloyonetim.com.tr/ru/bolgeler/esenler/mahalleler/birlik',
  'https://aloyonetim.com.tr/ru/bolgeler/umraniye/mahalleler/ataturk',
  'https://aloyonetim.com.tr/ru/sozluk/denetci',
  'https://aloyonetim.com.tr/ru/sozluk/hidrofor-ve-basinc-dengeleme-sistemi',
  'https://aloyonetim.com.tr/en/sozluk/plaka-tanima-sistemi-pts',
  'https://aloyonetim.com.tr/ar/bolgeler/eyupsultan/temizlik-ve-hijyen',
  'https://aloyonetim.com.tr/ru/sozluk/ortak-alan',
  'https://aloyonetim.com.tr/ru/sozluk/ozel-guvenlik-izni-ogi',
  'https://aloyonetim.com.tr/ru/bolgeler/kadikoy/guvenlik-yonetimi',
  'https://aloyonetim.com.tr/en/bolgeler/sile/mahalleler/merkez-sile',
  'https://aloyonetim.com.tr/ru/bolgeler/eyupsultan/mahalleler/kemerburgaz',
  'https://aloyonetim.com.tr/en/bolgeler/avcilar/mahalleler/ispartakule',
  'https://aloyonetim.com.tr/ar/bolgeler/sariyer/mahalleler/zekeriyakoy',
  'https://aloyonetim.com.tr/en/bolgeler/eyupsultan/mahalleler/alibeykoy',
  'https://aloyonetim.com.tr/ar/bolgeler/uskudar/mahalleler/cengelkoy',
  'https://aloyonetim.com.tr/ru/bolgeler/sancaktepe/mahalleler/yenidogan',
  'https://aloyonetim.com.tr/en/bolgeler/zeytinburnu/mahalleler/merkezefendi',
  'https://aloyonetim.com.tr/ru/sozluk/hizmet-seviyesi-taahhudu-sla',
  'https://aloyonetim.com.tr/en/sozluk/periyodik-teknik-bakim-plani',
  'https://aloyonetim.com.tr/en/bolgeler/atasehir/mahalleler/barbaros',
  'https://aloyonetim.com.tr/en/bolgeler/kadikoy/mahalleler/fenerbahce',
  'https://aloyonetim.com.tr/en/bolgeler/beylikduzu/mahalleler/adnan-kahveci',
  'https://aloyonetim.com.tr/ar/bolgeler/beykoz/mahalleler/kavacik',
  'https://aloyonetim.com.tr/ru/bolgeler/arnavutkoy/mahalleler/bolluca',
  'https://aloyonetim.com.tr/en/sozluk/aidat-avans-ve-gider-payi',
  'https://aloyonetim.com.tr/ar/bolgeler/kagithane/mahalleler/caglayan',
  'https://aloyonetim.com.tr/ru/bolgeler/fatih/mahalleler/aksaray',
  'https://aloyonetim.com.tr/ar/bolgeler/kagithane/mahalleler/gultepe',
  'https://aloyonetim.com.tr/ru/bolgeler/sariyer/mahalleler/tarabya',
  'https://aloyonetim.com.tr/en/bolgeler/umraniye/mahalleler/ataturk',
  'https://aloyonetim.com.tr/ar/bolgeler/avcilar/mahalleler/cigli-avcilar',
  'https://aloyonetim.com.tr/en/bolgeler/cekmekoy/mahalleler/mimar-sinan-cekmekoy',
  'https://aloyonetim.com.tr/ar/bolgeler/beyoglu/mahalleler/cihangir',
  'https://aloyonetim.com.tr/en/bolgeler/bagcilar/mahalleler/mahmutbey',
  'https://aloyonetim.com.tr/en/bolgeler/basaksehir/mahalleler/kayasehir',
  'https://aloyonetim.com.tr/en/bolgeler/beyoglu/mahalleler/karakoy',
  'https://aloyonetim.com.tr/ar/bolgeler/kucukcekmece/mahalleler/atakent',
  'https://aloyonetim.com.tr/ar/bolgeler/besiktas/mahalleler/etiler',
  'https://aloyonetim.com.tr/ar/bolgeler/bahcelievler/mahalleler/sirinevler',
  'https://aloyonetim.com.tr/en/bolgeler/uskudar/mahalleler/altunizade',
  'https://aloyonetim.com.tr/ru/bolgeler/tuzla/mahalleler/postane',
  'https://aloyonetim.com.tr/ru/bolgeler/adalar/mahalleler/buyukada',
  'https://aloyonetim.com.tr/ar/bolgeler/pendik/mahalleler/yenisehir-pendik',
  'https://aloyonetim.com.tr/en/bolgeler/pendik/mahalleler/kurtkoy',
  'https://aloyonetim.com.tr/ar/bolgeler/maltepe/mahalleler/altaycesme',
  'https://aloyonetim.com.tr/ar/bolgeler/kadikoy/mahalleler/fenerbahce',
  'https://aloyonetim.com.tr/ar/bolgeler/kadikoy/mahalleler/bostanci',
  'https://aloyonetim.com.tr/en/bolgeler/sultanbeyli/mahalleler/battalgazi',
  'https://aloyonetim.com.tr/ru/bolgeler/bahcelievler/mahalleler/yenibosna',
  'https://aloyonetim.com.tr/ar/bolgeler/sultanbeyli/mahalleler/abdurrahmangazi',
  'https://aloyonetim.com.tr/en/bolgeler/fatih/mahalleler/aksaray',
  'https://aloyonetim.com.tr/ru/bolgeler/bagcilar/mahalleler/gunesli',
  'https://aloyonetim.com.tr/ar/bolgeler/cekmekoy/mahalleler/tasdelen',
  'https://aloyonetim.com.tr/ru/bolgeler/kagithane/mahalleler/hamidiye',
  'https://aloyonetim.com.tr/ar/bolgeler/sile/mahalleler/kumbaba',
  'https://aloyonetim.com.tr/ru/bolgeler/esenler/mahalleler/menderes',
  'https://aloyonetim.com.tr/ru/bolgeler/sultanbeyli/mahalleler/mecidiye',
  'https://aloyonetim.com.tr/ar/bolgeler/sariyer/mahalleler/istinye',
  'https://aloyonetim.com.tr/en/bolgeler/esenler/mahalleler/birlik',
  'https://aloyonetim.com.tr/en/bolgeler/sisli/mahalleler/esentepe',
  'https://aloyonetim.com.tr/en/bolgeler/beykoz/mahalleler/cubuklu',
  'https://aloyonetim.com.tr/ar/bolgeler/kucukcekmece/mahalleler/halkali',
  'https://aloyonetim.com.tr/ar/bolgeler/beykoz/mahalleler/kanlica',
  'https://aloyonetim.com.tr/ru/bolgeler/pendik/mahalleler/yenisehir-pendik',
  'https://aloyonetim.com.tr/ru/bolgeler/cekmekoy/mahalleler/mimar-sinan-cekmekoy',
  'https://aloyonetim.com.tr/en/bolgeler/maltepe/mahalleler/kucukyali',
  'https://aloyonetim.com.tr/ru/bolgeler/adalar/mahalleler/burgazada',
  'https://aloyonetim.com.tr/en/bolgeler/eyupsultan/mahalleler/gokturk',
  'https://aloyonetim.com.tr/ar/bolgeler/sisli/mahalleler/mecidiyekoy',
  'https://aloyonetim.com.tr/en/bolgeler/esenyurt/mahalleler/zafer',
  'https://aloyonetim.com.tr/ru/bolgeler/avcilar/mahalleler/ambarli',
  'https://aloyonetim.com.tr/ar/bolgeler/sancaktepe/mahalleler/samandira',
  'https://aloyonetim.com.tr/ar/bolgeler/umraniye/mahalleler/cakmak',
  'https://aloyonetim.com.tr/ru/bolgeler/maltepe/mahalleler/idealtepe',
  'https://aloyonetim.com.tr/ru/bolgeler/kucukcekmece/mahalleler/halkali',
  'https://aloyonetim.com.tr/ru/bolgeler/kartal/mahalleler/soganlik',
  'https://aloyonetim.com.tr/ar/bolgeler/zeytinburnu/mahalleler/kazlicesme',
  'https://aloyonetim.com.tr/ar/bolgeler/gaziosmanpasa/mahalleler/karadeniz',
  'https://aloyonetim.com.tr/ru/bolgeler/esenyurt/mahalleler/cumhuriyet-esenyurt',
  'https://aloyonetim.com.tr/ar/bolgeler/fatih/mahalleler/findikzade',
  'https://aloyonetim.com.tr/ar/bolgeler/sultangazi/mahalleler/cebeci',
  'https://aloyonetim.com.tr/en/bolgeler/sancaktepe/mahalleler/samandira',
  'https://aloyonetim.com.tr/en/bolgeler/umraniye/mahalleler/serifali',
  'https://aloyonetim.com.tr/ru/bolgeler/beykoz/mahalleler/kavacik',
  'https://aloyonetim.com.tr/ar/bolgeler/kartal/mahalleler/cevizli',
  'https://aloyonetim.com.tr/en/bolgeler/esenyurt/mahalleler/cumhuriyet-esenyurt',
  'https://aloyonetim.com.tr/en/bolgeler/kartal/mahalleler/yakacik',
  'https://aloyonetim.com.tr/ar/bolgeler/adalar/mahalleler/buyukada',
  'https://aloyonetim.com.tr/ar/bolgeler/beylikduzu/mahalleler/baris',
  'https://aloyonetim.com.tr/ar/bolgeler/atasehir/mahalleler/ataturk',
  'https://aloyonetim.com.tr/ru/bolgeler/buyukcekmece/mahalleler/alkent-2000',
  'https://aloyonetim.com.tr/ar/bolgeler/basaksehir/mahalleler/ispartakule',
  'https://aloyonetim.com.tr/ru/bolgeler/basaksehir/mahalleler/bahcesehir-2-kisim',
  'https://aloyonetim.com.tr/en/bolgeler/kucukcekmece/mahalleler/sefakoy',
  'https://aloyonetim.com.tr/en/bolgeler/adalar/mahalleler/heybaliada',
  'https://aloyonetim.com.tr/ru/bolgeler/uskudar/mahalleler/altunizade',
  'https://aloyonetim.com.tr/en/bolgeler/besiktas/mahalleler/levazim',
  'https://aloyonetim.com.tr/ar/bolgeler/sile/mahalleler/agva',
  'https://aloyonetim.com.tr/en/bolgeler/sariyer/mahalleler/zekeriyakoy',
  'https://aloyonetim.com.tr/en/bolgeler/arnavutkoy/mahalleler/hadimkoy',
  'https://aloyonetim.com.tr/ru/bolgeler/besiktas/mahalleler/etiler',
  'https://aloyonetim.com.tr/en/bolgeler/kadikoy/mahalleler/kozyatagi',
  'https://aloyonetim.com.tr/ar/bolgeler/esenler/mahalleler/davutpasa',
  'https://aloyonetim.com.tr/en/bolgeler/catalca/mahalleler/subasi',
  'https://aloyonetim.com.tr/ar/bolgeler/silivri/mahalleler/selimpasa',
  'https://aloyonetim.com.tr/ru/bolgeler/beyoglu/mahalleler/cihangir',
  'https://aloyonetim.com.tr/en/bolgeler/tuzla/mahalleler/postane',
  'https://aloyonetim.com.tr/ru/bolgeler/sariyer/mahalleler/maslak',
  'https://aloyonetim.com.tr/en/bolgeler/bayrampasa/mahalleler/yildirim',
  'https://aloyonetim.com.tr/en/bolgeler/bahcelievler/mahalleler/yenibosna',
  'https://aloyonetim.com.tr/ar/bolgeler/gungoren/mahalleler/merter',
  'https://aloyonetim.com.tr/ar/bolgeler/catalca/mahalleler/ferhatpasa',
  'https://aloyonetim.com.tr/ru/bolgeler/sisli/mahalleler/bomonti',
  'https://aloyonetim.com.tr/ru/bolgeler/atasehir/mahalleler/kucukbakkalkoy',
  'https://aloyonetim.com.tr/ar/bolgeler/bayrampasa/mahalleler/kocatepe',
  'https://aloyonetim.com.tr/ru/bolgeler/kadikoy/mahalleler/suadiye',
  'https://aloyonetim.com.tr/ru/bolgeler/beylikduzu/mahalleler/beylikduzu-osb',
  'https://aloyonetim.com.tr/ar/bolgeler/buyukcekmece/mahalleler/mimaroba',
  'https://aloyonetim.com.tr/ar/bolgeler/esenyurt/mahalleler/ardicli',
  'https://aloyonetim.com.tr/ar/bolgeler/bagcilar/mahalleler/gunesli',
  'https://aloyonetim.com.tr/sozluk/motat-tehlikeli-atik-yonetimi',
  'https://aloyonetim.com.tr/blog/etiket/entegre-y%C3%B6netim',
  'https://aloyonetim.com.tr/blog/etiket/zemin-et%C3%BCd%C3%BC',
  'https://aloyonetim.com.tr/blog/etiket/concierge',
  'https://aloyonetim.com.tr/blog/etiket/ortak%20alan%20hijyeni',
  'https://aloyonetim.com.tr/blog/etiket/beylikduzu',
  'https://aloyonetim.com.tr/ru/blog/etiket/3g-g%C3%BCvenlik',
  'https://aloyonetim.com.tr/ar/blog/etiket/3g-g%C3%BCvenlik',
  'https://aloyonetim.com.tr/blog/etiket/5188-g%C3%BCvenlik-%C5%9Firketi',
  'https://aloyonetim.com.tr/blog/etiket/kartal-g%C3%BCvenlik',
  'https://aloyonetim.com.tr/blog/etiket/sariyer-hasere-ve-dezenfeksiyon',
  'https://aloyonetim.com.tr/sozluk/ortak-alan-kiraya-verme-kmk-m-45',
  'https://aloyonetim.com.tr/sozluk/site-i-sletme-butcesi',
  'https://aloyonetim.com.tr/sozluk/i-sletme-projesi',
  'https://aloyonetim.com.tr/sozluk/ozel-guvenlik-i-zni-ogi',
  'https://aloyonetim.com.tr/arama?q={search_term_string}',
  'https://aloyonetim.com.tr/bolgeler/g-ng-ren',
  'https://aloyonetim.com.tr/bolgeler/ey-psultan',
  'https://aloyonetim.com.tr/bolgeler/be-ikta-',
  'https://aloyonetim.com.tr/sektorel-cozumler/toplukonut',
  'https://aloyonetim.com.tr/sektorel-cozumler/avm',
  'https://aloyonetim.com.tr/sektorel-cozumler/sanayi',
  'https://aloyonetim.com.tr/sektorel-cozumler/rezidans',
  'https://aloyonetim.com.tr/*',
  'https://aloyonetim.com.tr/*/referanslar',
  'https://aloyonetim.com.tr/*/sss',
  'https://aloyonetim.com.tr/*/hesaplayici',
  'https://aloyonetim.com.tr/*/iletisim',
  'https://aloyonetim.com.tr/rss.xml',
];

describe('GSC "noindex etiketi tarafından hariç tutuldu" (194 URL) Tam Çözüm Doğrulaması', () => {
  it('Listedeki 194 URL eksiksiz tanımlanmış olmalı', () => {
    expect(GSC_194_NOINDEX_URLS).toHaveLength(194);
  });

  it('193 sayfa/rota URL\'sinin tamamı noindex içermemeli; çevrilmiş olanlar 200 (all), diğerleri tek adımda (301) kanonik indekslenebilir hedefe yönlenmeli', async () => {
    const pageUrls = GSC_194_NOINDEX_URLS.filter((u) => !u.endsWith('/rss.xml'));
    expect(pageUrls).toHaveLength(193);

    for (const rawUrl of pageUrls) {
      const req = new NextRequest(rawUrl, {
        headers: { accept: 'text/html' },
      });
      const res = await middleware(req);

      const robotsHeader = res.headers.get('X-Robots-Tag') ?? '';
      expect(robotsHeader, `Hiçbir yanıtta noindex olmamalı: ${rawUrl}`).not.toContain('noindex');
      expect([200, 301], `Durum kodu 200 veya 301 olmalı: ${rawUrl}`).toContain(res.status);

      if (res.status === 200) {
        const parsed = new URL(rawUrl);
        const localeMatch = parsed.pathname.match(/^\/(en|ru|ar)(\/.*|$)/);
        const locale = localeMatch ? localeMatch[1] : 'tr';
        const cleanPath = localeMatch ? (localeMatch[2] || '/') : parsed.pathname;
        expect(robotsHeader, `200 dönen URL X-Robots-Tag: all taşımalı: ${rawUrl}`).toContain('all');
        expect(isIndexable(cleanPath, locale), `200 dönen URL isIndexable(true) olmalı: ${rawUrl}`).toBe(true);
      } else {
        const location = res.headers.get('location');
        expect(location, `Location başlığı olmalı: ${rawUrl}`).toBeTruthy();

        const targetUrl = new URL(location!);
        expect(targetUrl.search, `Hedef URL query string taşımamalı: ${rawUrl} -> ${location}`).toBe('');

        // Hedef URL tekrar middleware'e girdiğinde 200 OK ve indexable olmalı (zincirleme yönlendirme olmamalı)
        const secondReq = new NextRequest(targetUrl.toString(), {
          headers: { accept: 'text/html' },
        });
        const secondRes = await middleware(secondReq);
        expect(secondRes.status, `Hedef URL 2. kez yönlenmemeli (1-hop kuralı): ${rawUrl} -> ${location}`).toBe(200);
        const secondRobots = secondRes.headers.get('X-Robots-Tag') ?? '';
        expect(secondRobots, `Hedef URL noindex olmamalı: ${rawUrl} -> ${location}`).toContain('all');
        expect(secondRobots).not.toContain('noindex');

        const localeMatch = targetUrl.pathname.match(/^\/(en|ru|ar)(\/.*|$)/);
        const targetLocale = localeMatch ? localeMatch[1] : 'tr';
        const cleanTargetPath = localeMatch ? (localeMatch[2] || '/') : targetUrl.pathname;
        expect(
          isIndexable(cleanTargetPath, targetLocale),
          `Hedef rota isIndexable(true) olmalı: ${targetUrl.pathname} (${targetLocale})`
        ).toBe(true);
      }
    }
  });

  it('rss.xml ve feed.xml next.config.ts içinde X-Robots-Tag: noindex almamalı, route handler içinde all almalı', () => {
    const nextConfigContent = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf8');
    expect(nextConfigContent).not.toContain("source: '/(feed|rss)\\\\.xml'");

    const rssRouteContent = fs.readFileSync(path.join(process.cwd(), 'src/app/rss.xml/route.ts'), 'utf8');
    const feedRouteContent = fs.readFileSync(path.join(process.cwd(), 'src/app/feed.xml/route.ts'), 'utf8');
    expect(rssRouteContent).toContain("'X-Robots-Tag': 'all");
    expect(feedRouteContent).toContain("'X-Robots-Tag': 'all");
  });

  it('buildFacilityEdgeHeaders çevrilmemiş bölge/mahalle rotalarında en/ru/ar hreflang üretmemeli', () => {
    const mahalleHeaders = buildFacilityEdgeHeaders('/mahalleler', 'tr');
    expect(mahalleHeaders['Link']).toContain('hreflang="tr"');
    expect(mahalleHeaders['Link']).toContain('hreflang="x-default"');
    expect(mahalleHeaders['Link']).not.toContain('hreflang="en"');
    expect(mahalleHeaders['Link']).not.toContain('hreflang="ru"');
    expect(mahalleHeaders['Link']).not.toContain('hreflang="ar"');

    const districtFacilityHeaders = buildFacilityEdgeHeaders('/bolgeler/uskudar/tesis-yonetimi', 'tr');
    expect(districtFacilityHeaders['Link']).toContain('hreflang="tr"');
    expect(districtFacilityHeaders['Link']).not.toContain('hreflang="en"');
    expect(districtFacilityHeaders['Link']).not.toContain('hreflang="ru"');
    expect(districtFacilityHeaders['Link']).not.toContain('hreflang="ar"');

    const mainFacilityHeaders = buildFacilityEdgeHeaders('/hizmetler/tesis-yonetimi', 'tr');
    expect(mainFacilityHeaders['Link']).toContain('hreflang="tr"');
    expect(mainFacilityHeaders['Link']).toContain('hreflang="en"');
    expect(mainFacilityHeaders['Link']).toContain('hreflang="ru"');
    expect(mainFacilityHeaders['Link']).toContain('hreflang="ar"');
  });

  it('localePath çevrilmemiş rotalarda (/bolgeler, çevrilmemiş /sozluk/[terim]) daima kanonik Türkçe yolu döndürmeli', () => {
    expect(localePath('/bolgeler', 'en')).toBe('/bolgeler');
    expect(localePath('/bolgeler/kadikoy/tesis-yonetimi', 'ru')).toBe('/bolgeler/kadikoy/tesis-yonetimi');
    expect(localePath('/sozluk/cctv-kamera-guvenlik-sistemi', 'ar')).toBe('/sozluk/cctv-kamera-guvenlik-sistemi');
    expect(localePath('/sozluk/kat-irtifakindan-kat-mulkiyetine-gecis', 'ru')).toBe('/sozluk/kat-irtifakindan-kat-mulkiyetine-gecis');

    // Çevrilmiş rotalarda dil önekini korumalı
    expect(localePath('/sozluk', 'ar')).toBe('/ar/sozluk');
    expect(localePath('/sozluk/ortak-alan', 'ru')).toBe('/ru/sozluk/ortak-alan');
    expect(localePath('/hizmetler/site-yonetimi', 'en')).toBe('/en/hizmetler/site-yonetimi');
    expect(localePath('/hizmetler/tesis-yonetimi', 'en')).toBe('/en/hizmetler/tesis-yonetimi');
    expect(localePath('/hakkimizda', 'ru')).toBe('/ru/hakkimizda');
    expect(localePath('/iletisim', 'ar')).toBe('/ar/iletisim');
    expect(isLocaleIndexable('/hizmetler/tesis-yonetimi', 'en')).toBe(true);
  });
});
