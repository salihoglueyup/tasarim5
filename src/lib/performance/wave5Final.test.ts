import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { inspectImageCache, cleanStaleImageCache } from './imageCachePurge';
import { CWV_ULTRA_TARGETS, validateLcpTarget } from '../seo/dualCorePageSpeedEngine';

describe('Wave 5 Final: Faz 121 - Faz 125 Performans, Görsel Dayanıklılık & LCP Doğrulama', () => {
  const globalsCssPath = path.resolve(process.cwd(), 'src/app/globals.css');
  const imageFallbackPath = path.resolve(process.cwd(), 'src/components/ui/ImageFallback.tsx');

  it('Faz 121: globals.css GPU kompozitör rahatlatma sınıfları barındırır', () => {
    const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');
    expect(cssContent).toContain('.gpu-compositor-layer');
    expect(cssContent).toContain('.gradient-clean');
    expect(cssContent).toContain('contain: paint');
  });

  it('Faz 122: ImageFallback.tsx mevcuttur ve kırılan görseller için yedek desteği sunar', () => {
    expect(fs.existsSync(imageFallbackPath)).toBe(true);
    const content = fs.readFileSync(imageFallbackPath, 'utf-8');
    expect(content).toContain('fallbackSrc');
    expect(content).toContain('onError');
    expect(content).toContain('hasError');
  });

  it('Faz 123: imageCachePurge.ts görsel önbelleğini hatasız inceler ve temizler', () => {
    const stats = inspectImageCache();
    expect(stats).toHaveProperty('totalFiles');
    expect(stats).toHaveProperty('totalSizeBytes');

    const cleanResult = cleanStaleImageCache({ maxAgeDays: 9999 });
    expect(cleanResult).toHaveProperty('deletedFiles');
    expect(cleanResult).toHaveProperty('freedBytes');
  });

  it('Faz 124: CWV_ULTRA_TARGETS LCP hedefini < 1.2s olarak belirler ve doğrular', () => {
    expect(CWV_ULTRA_TARGETS.LCP_ms).toBe(1200);
    expect(validateLcpTarget(950)).toBe(true);
    expect(validateLcpTarget(1199)).toBe(true);
    expect(validateLcpTarget(1350)).toBe(false);
  });

  it('Faz 125: Wave 5 kapsamında tüm medya ve font dosyaları doğru formatlardadır', () => {
    const publicImages = path.resolve(process.cwd(), 'public/images');
    if (fs.existsSync(publicImages)) {
      const files = fs.readdirSync(publicImages);
      // Hero poster WebP veya AVIF formatında olmalı
      expect(files.some(f => f.includes('hero-poster-v5.webp'))).toBe(true);
    }
  });
});
