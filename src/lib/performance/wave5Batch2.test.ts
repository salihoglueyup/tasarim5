import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { DEFAULT_BLUR_DATA_URL, getBlurPlaceholder } from './imagePlaceholder';

describe('Wave 5: Faz 111 - Faz 115 Performans & Medya Geliştirmeleri', () => {
  const layoutPath = path.resolve(process.cwd(), 'src/app/[lang]/layout.tsx');
  const manifestPath = path.resolve(process.cwd(), 'src/app/manifest.ts');
  const imageWithSeoPath = path.resolve(process.cwd(), 'src/components/seo/ImageWithSeo.tsx');
  const iletisimPath = path.resolve(process.cwd(), 'src/app/[lang]/iletisim/IletisimClient.tsx');
  const lazyMapFacadePath = path.resolve(process.cwd(), 'src/components/ui/LazyMapFacade.tsx');
  const liteYouTubePath = path.resolve(process.cwd(), 'src/components/ui/LiteYouTubeEmbed.tsx');

  it('Faz 111: layout.tsx Cairo fontunu preload: false yapar ve yalnızca RTL rotalarında yükler', () => {
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).toContain('preload: false');
    expect(layoutContent).toContain('isRtl ? cairo.variable :');
  });

  it('Faz 112: manifest.ts optimize public/favicon/ dizinindeki ikonları referans alır', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    expect(manifestContent).toContain('/favicon/favicon-192.png');
    expect(manifestContent).toContain('/favicon/favicon-512.png');
    expect(manifestContent).toContain('maskable');
  });

  it('Faz 113: imagePlaceholder.ts ve ImageWithSeo.tsx blurDataURL fallback sağlar', () => {
    const placeholder = getBlurPlaceholder(true);
    expect(placeholder.placeholder).toBe('blur');
    expect(placeholder.blurDataURL).toBe(DEFAULT_BLUR_DATA_URL);

    const imageSeoContent = fs.readFileSync(imageWithSeoPath, 'utf-8');
    expect(imageSeoContent).toContain('blurProps');
    expect(imageSeoContent).toContain('placeholder === \'blur\'');
  });

  it('Faz 114: LazyMapFacade.tsx mevcut ve IletisimClient.tsx harita iframe yerine cephe kullanır', () => {
    expect(fs.existsSync(lazyMapFacadePath)).toBe(true);
    const iletisimContent = fs.readFileSync(iletisimPath, 'utf-8');
    expect(iletisimContent).toContain('<LazyMapFacade');
    expect(iletisimContent).toContain('autoLoadOnIntersection={true}');
  });

  it('Faz 115: LiteYouTubeEmbed.tsx sıfır ilk iframe JS yüküyle YouTube cephesi sunar', () => {
    expect(fs.existsSync(liteYouTubePath)).toBe(true);
    const liteContent = fs.readFileSync(liteYouTubePath, 'utf-8');
    expect(liteContent).toContain('extractYouTubeId');
    expect(liteContent).toContain('youtube-nocookie.com');
    expect(liteContent).toContain('isActivated');
  });
});
