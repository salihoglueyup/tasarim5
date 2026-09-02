import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 5: Faz 116 - Faz 120 Medya & Görsel Optimizasyonları', () => {
  const pdfBadgePath = path.resolve(process.cwd(), 'src/components/ui/PdfDownloadBadge.tsx');
  const certSlugPath = path.resolve(process.cwd(), 'src/app/[lang]/kurumsal/sertifikalar/[slug]/page.tsx');
  const ogRoutePath = path.resolve(process.cwd(), 'src/app/api/og/route.tsx');
  const layoutPath = path.resolve(process.cwd(), 'src/app/[lang]/layout.tsx');
  const postBodyPath = path.resolve(process.cwd(), 'src/components/blog/PostBody.tsx');
  const refClientPath = path.resolve(process.cwd(), 'src/app/[lang]/referanslar/ReferencesClient.tsx');

  it('Faz 116: PdfDownloadBadge.tsx mevcuttur ve sertifika sayfasında dosya boyutu rozeti yer alır', () => {
    expect(fs.existsSync(pdfBadgePath)).toBe(true);
    const certContent = fs.readFileSync(certSlugPath, 'utf-8');
    expect(certContent).toContain('PDF · 1.8 MB');
    expect(certContent).toContain('download');
  });

  it('Faz 117: /api/og edge ImageResponse önbellekleme başlıkları taşır', () => {
    const ogContent = fs.readFileSync(ogRoutePath, 'utf-8');
    expect(ogContent).toContain("runtime = 'edge'");
    expect(ogContent).toContain('Cache-Control');
    expect(ogContent).toContain('s-maxage=604800');
  });

  it('Faz 118: layout.tsx sosyal medya openGraph görsellerinde optimize WebP kullanır', () => {
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).toContain('type: \'image/webp\'');
    expect(layoutContent).toContain('hero-poster-v5.webp');
  });

  it('Faz 119: Projede ağır animasyonlu GIF bulunmaz (0 GIF kuralı)', () => {
    const publicFiles = fs.readdirSync(path.resolve(process.cwd(), 'public'));
    const gifFiles = publicFiles.filter(f => f.endsWith('.gif'));
    expect(gifFiles.length).toBe(0);
  });

  it('Faz 120: PostBody ve ReferencesClient görsellerde loading="lazy" ve decoding="async" uygular', () => {
    const postBodyContent = fs.readFileSync(postBodyPath, 'utf-8');
    const refContent = fs.readFileSync(refClientPath, 'utf-8');
    expect(postBodyContent).toContain('loading="lazy" decoding="async"');
    expect(refContent).toContain('loading="lazy" decoding="async"');
  });
});
