import { describe, it, expect } from 'vitest';
import { autoLinkHtml, AUTO_LINKS } from './autoLinker';

describe('Gelişmiş Otomatik İç Linkleme Motoru (autoLinker.ts)', () => {
  it('AUTO_LINKS havuzunda yüzlerce terim başarıyla derlenmiştir', () => {
    expect(AUTO_LINKS.length).toBeGreaterThan(50);
  });

  it('Düz metindeki anahtar kelimeleri doğru sayfalara bağlar', () => {
    const input = '<p>İstanbul genelinde profesyonel tesis yönetimi ve bina güvenliği hizmetleri sunuyoruz.</p>';
    const output = autoLinkHtml(input, '/blog/ornek-yazi', 4);

    expect(output).toContain('<a href="/hizmetler/tesis-yonetimi"');
    expect(output).toContain('tesis yönetimi');
  });

  it('Türkçe çekim eklerini (aidatların, asansörün vb.) tanıyıp doğru linkler', () => {
    const input = '<p>Gününde ödenmeyen aidatların takibi için hukuki destek sağlıyoruz.</p>';
    const output = autoLinkHtml(input, '/hakkimizda', 3);

    expect(output).toContain('aidatların');
    expect(output).toContain('<a href=');
  });

  it('Mevcut <a> etiketleri içine ASLA ikinci bir link yerleştirmez', () => {
    const input = '<p>Daha fazla bilgi için <a href="/iletisim">tesis yönetimi</a> sayfamızı ziyaret edin.</p>';
    const output = autoLinkHtml(input, '/blog/test', 4);

    // a içinde a (<a ... <a ...) oluşmamalı
    const anchorCount = (output.match(/<a\s/g) || []).length;
    expect(anchorCount).toBe(1);
    expect(output).toContain('<a href="/iletisim">tesis yönetimi</a>');
  });

  it('Kendine link vermeyi (self-referencing) engeller', () => {
    const input = '<p>Rezidans tesis yönetimi ve genel tesis yönetimi hizmetlerimiz mevcuttur.</p>';
    const output = autoLinkHtml(input, '/hizmetler/tesis-yonetimi', 4);

    // /hizmetler/tesis-yonetimi linki eklenmemeli
    expect(output).not.toContain('<a href="/hizmetler/tesis-yonetimi"');
  });

  it('Farklı bir dil (en/ru/ar) verildiğinde iç linkleri ilgili dil önekiyle bağlar', () => {
    const input = '<p>Rezidans tesis yönetimi hizmetlerimiz mevcuttur.</p>';
    const output = autoLinkHtml(input, '/en/blog/facility-article', 4, 'en');

    expect(output).toContain('<a href="/en/hizmetler/tesis-yonetimi/rezidans-site-yonetimi"');
  });
});
