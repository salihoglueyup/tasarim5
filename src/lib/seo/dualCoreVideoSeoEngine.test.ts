import { describe, it, expect } from 'vitest';
import {
  VIDEO_CONTENT_CATALOG,
  buildVideoObjectSchema,
  buildVideoChapterMarkup,
  buildVideoSiteMapEntry,
  buildVideoCarouselSchema,
  buildYouTubeDescriptionTemplate,
  buildYouTubeTagList,
} from './dualCoreVideoSeoEngine';

describe('BÖLÜM K — 🎥 Video SEO & YouTube Optimizasyon Motoru (dualCoreVideoSeoEngine.test.ts)', () => {
  /* =========================================================================
   * K1 — VIDEOOBJECT ŞEMA MOTORU (Faz 236-255)
   * ========================================================================= */
  describe('K1: VideoObject Şema & Sitemap Testleri (Faz 236-255)', () => {
    it('VIDEO_CONTENT_CATALOG en az 3 detaylı video şartnamesi içerir', () => {
      expect(VIDEO_CONTENT_CATALOG.length).toBeGreaterThanOrEqual(3);
      VIDEO_CONTENT_CATALOG.forEach((video) => {
        expect(video.durationISO).toMatch(/^PT(\d+M)?(\d+S)?$/);
        expect(video.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(video.thumbnailUrl).toBeDefined();
        expect(video.chapters.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('buildVideoObjectSchema geçerli VideoObject ve Google Clip şemaları üretir', () => {
      const video = VIDEO_CONTENT_CATALOG[0];
      const schema = buildVideoObjectSchema(video);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('VideoObject');
      expect(schema.name).toBe(video.title);
      expect(schema.duration).toBe(video.durationISO);
      expect(schema.hasPart).toBeInstanceOf(Array);
      expect((schema.hasPart as Array<{ '@type': string }>)[0]['@type']).toBe('Clip');
    });

    it('buildVideoChapterMarkup doğru zaman damgalı metin üretir', () => {
      const video = VIDEO_CONTENT_CATALOG[0];
      const markup = buildVideoChapterMarkup(video.chapters);
      expect(markup).toContain('00:00 -');
      expect(markup.split('\n').length).toBe(video.chapters.length);
    });

    it('buildVideoSiteMapEntry XML formatında geçerli video sitemap parçası üretir', () => {
      const video = VIDEO_CONTENT_CATALOG[1];
      const entry = buildVideoSiteMapEntry(video);
      expect(entry).toContain('<video:video>');
      expect(entry).toContain(`<video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>`);
      expect(entry).toContain(video.title);
      expect(entry).toContain('</video:video>');
    });

    it('buildVideoCarouselSchema ItemList içinde birden fazla video nesnesi döner', () => {
      const carousel = buildVideoCarouselSchema(VIDEO_CONTENT_CATALOG);
      expect(carousel['@type']).toBe('ItemList');
      expect(carousel.itemListElement.length).toBe(VIDEO_CONTENT_CATALOG.length);
      expect((carousel.itemListElement[0] as unknown as { item: { '@type': string } }).item['@type']).toBe('VideoObject');
    });
  });

  /* =========================================================================
   * K2 — YOUTUBE ANALYTICS & OPTİMİZASYON (Faz 253-270)
   * ========================================================================= */
  describe('K2: YouTube Açıklama & Etiket Optimizasyonu (Faz 253-270)', () => {
    it('buildYouTubeDescriptionTemplate 500 karakterden uzun, CTA ve iletişim bilgileri içerir', () => {
      const video = VIDEO_CONTENT_CATALOG[0];
      const desc = buildYouTubeDescriptionTemplate(video);
      expect(desc.length).toBeGreaterThan(500);
      expect(desc).toContain('TIMESTAMPS');
      expect(desc).toContain('0216 550 48 48');
      expect(desc).toContain('https://www.linkedin.com/company/aloyonetim');
    });

    it('buildYouTubeTagList en az 10 adet anahtar kelime etiketi döner', () => {
      const video = VIDEO_CONTENT_CATALOG[0];
      const tags = buildYouTubeTagList(video);
      expect(tags.length).toBeGreaterThanOrEqual(10);
      expect(tags).toContain('site yönetimi');
      expect(tags).toContain('alo yönetim');
    });
  });
});
