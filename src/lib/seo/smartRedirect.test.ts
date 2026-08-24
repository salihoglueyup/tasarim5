import { describe, it, expect } from 'vitest';
import { resolveSmartRedirect } from './smartRedirect';

describe('Smart Self-Healing 301 Redirect Motoru (smartRedirect.ts)', () => {
  it('ilçe ve hizmet birleşimi yanlış URL yi doğru yerel iniş sayfasına bağlar', () => {
    const res1 = resolveSmartRedirect('/kadikoy-temizlik');
    expect(res1?.targetUrl).toBe('/bolgeler/kadikoy/temizlik-ve-hijyen');
    expect(res1?.confidence).toBeGreaterThan(0.9);

    const res2 = resolveSmartRedirect('/etiler-guvenlik.html');
    expect(res2?.targetUrl).toBe('/bolgeler/besiktas/guvenlik-yonetimi');

    const res3 = resolveSmartRedirect('/bahcesehir-site-yonetimi');
    expect(res3?.targetUrl).toBe('/bolgeler/basaksehir/tesis-yonetimi');

    const res4 = resolveSmartRedirect('/florya-havuz-bakimi.php');
    expect(res4?.targetUrl).toBe('/bolgeler/bakirkoy/havuz-bakimi-ve-hijyen');

    const res5 = resolveSmartRedirect('/gokturk-peyzaj');
    expect(res5?.targetUrl).toBe('/bolgeler/eyupsultan/peyzaj-ve-bahce-bakimi');
  });

  it('yalnızca ilçe veya mahalle girildiğinde ilçe ana sayfasına yönlendirir', () => {
    const res1 = resolveSmartRedirect('/kadikoy-subesi');
    expect(res1?.targetUrl).toBe('/bolgeler/kadikoy');

    const res2 = resolveSmartRedirect('/moda-yonetim');
    expect(res2?.targetUrl).toBe('/bolgeler/kadikoy/tesis-yonetimi'); // 'yonetim' hizmetiyle eşleşti
  });

  it('yalnızca hizmet eşanlamlısı girildiğinde ana pillar hizmete yönlendirir', () => {
    const res1 = resolveSmartRedirect('/ozel-guvenlik-sirketleri');
    expect(res1?.targetUrl).toBe('/hizmetler/guvenlik-yonetimi');

    const res2 = resolveSmartRedirect('/bocek-ilaclama');
    expect(res2?.targetUrl).toBe('/hizmetler/hasere-ve-dezenfeksiyon');

    const res3 = resolveSmartRedirect('/asansor-bakimi');
    expect(res3?.targetUrl).toBe('/hizmetler/teknik-bakim');
  });

  it('statik rota eşanlamlılarını doğru hedeflere yönlendirir', () => {
    const res1 = resolveSmartRedirect('/teklif-iste');
    expect(res1?.targetUrl).toBe('/teklif-al');

    const res2 = resolveSmartRedirect('/iso-belgeleri');
    expect(res2?.targetUrl).toBe('/kurumsal/kalite-belgelerimiz');

    const res3 = resolveSmartRedirect('/bize-ulasin');
    expect(res3?.targetUrl).toBe('/iletisim');
  });

  it('farklı dil prefix lerini koruyarak yönlendirir', () => {
    const res1 = resolveSmartRedirect('/en/kadikoy-cleaning');
    expect(res1?.targetUrl).toBe('/en/bolgeler/kadikoy/temizlik-ve-hijyen');

    const res2 = resolveSmartRedirect('/ru/get-quote');
    expect(res2?.targetUrl).toBe('/ru/teklif-al');
  });
});
