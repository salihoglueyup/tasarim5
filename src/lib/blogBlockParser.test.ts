import { describe, it, expect } from 'vitest';
import { renderPostBlocksToHtml, slugifyHeading, parseMarkdownLinks } from './blogBlockParser';
import type { PostBlock } from '@/data/posts';

describe('Blog Blok-HTML Çevirici Motoru (blogBlockParser.ts - Faz 17)', () => {
  it('slugifyHeading Türkçe karakterleri ve özel sembolleri temizleyerek SEO uyumlu ID üretir', () => {
    expect(slugifyHeading('1. VIP Concierge ve Lobi Karşılama Protokolleri')).toBe(
      'heading-1-vip-concierge-ve-lobi-karsilama-protokolleri'
    );
    expect(slugifyHeading('Şeffaf Aidat & İşletme Projesi (KMK m.37)')).toBe(
      'heading-seffaf-aidat-isletme-projesi-kmk-m-37'
    );
    expect(slugifyHeading('')).toBe('heading-section');
  });

  it('parseMarkdownLinks markdown bağlantılarını temiz <a> etiketlerine dönüştürür', () => {
    const text = 'Lüks binalarda [entegre tesis yönetimi](/hizmetler/tesis-yonetimi) standarttır.';
    const parsed = parseMarkdownLinks(text);
    expect(parsed).toContain('<a href="/hizmetler/tesis-yonetimi"');
    expect(parsed).toContain('entegre tesis yönetimi</a>');
  });

  it('JSON string formatındaki PostBlock dizisini zengin semantik HTML olarak render eder', () => {
    const rawJson = JSON.stringify([
      { type: 'p', text: 'Giriş paragrafı [link](https://aloyonetim.com).' },
      { type: 'h2', text: '1. Ana Başlık' },
      { type: 'ul', items: ['Madde 1', 'Madde 2'] },
      { type: 'quote', text: 'Önemli alıntı' },
      { type: 'cta', text: 'Teklif Alın', href: '/teklif-al', label: 'Hemen Başvurun' },
    ]);

    const html = renderPostBlocksToHtml(rawJson);

    expect(html).toContain('<p class="text-slate-700');
    expect(html).toContain('<h2 id="heading-1-ana-baslik"');
    expect(html).toContain('<ul class="my-6');
    expect(html).toContain('✓</span>');
    expect(html).toContain('Madde 1');
    expect(html).toContain('<blockquote class="my-8');
    expect(html).toContain('"Önemli alıntı"');
    expect(html).toContain('<div class="my-10');
    expect(html).toContain('href="/teklif-al"');
    expect(html).toContain('Hemen Başvurun →');
  });

  it('PostBlock[] dizisini doğrudan kabul eder ve eksiksiz HTML üretir', () => {
    const blocks: PostBlock[] = [
      { type: 'h3', text: 'Alt Başlık' },
      { type: 'ol', items: ['Aşama 1', 'Aşama 2'] },
    ];

    const html = renderPostBlocksToHtml(blocks);

    expect(html).toContain('<h3 id="heading-alt-baslik"');
    expect(html).toContain('<ol class="my-6');
    expect(html).toContain('Aşama 1');
  });

  it('Boş veya geçersiz girdi durumunda güvenli fallback sağlar', () => {
    expect(renderPostBlocksToHtml('')).toBe('');
    expect(renderPostBlocksToHtml(null)).toBe('');
    expect(renderPostBlocksToHtml(undefined)).toBe('');
    expect(renderPostBlocksToHtml('Düz metin paragrafı')).toContain('<p class="text-slate-700');
  });
});
