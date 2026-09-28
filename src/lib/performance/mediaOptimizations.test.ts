import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 5: Medya, AVIF, Font & LCP Optimizasyonları (Faz 101 - Faz 110)', () => {
  const nextConfigPath = path.resolve(process.cwd(), 'next.config.ts');
  const heroSubPath = path.resolve(process.cwd(), 'src/components/sections/core/Hero.tsx');
  const heroPath = fs.existsSync(heroSubPath) ? heroSubPath : path.resolve(process.cwd(), 'src/components/sections/Hero.tsx');
  const postGridPath = path.resolve(process.cwd(), 'src/components/blog/PostGrid.tsx');
  const blogListPath = path.resolve(process.cwd(), 'src/components/blog/BlogListClient.tsx');
  const logoTickerPath = path.resolve(process.cwd(), 'src/components/ui/branding/LogoTicker.tsx');
  const footerSubPath = path.resolve(process.cwd(), 'src/components/layout/footer/Footer.tsx');
  const footerPath = fs.existsSync(footerSubPath) ? footerSubPath : path.resolve(process.cwd(), 'src/components/layout/Footer.tsx');
  const globalsCssPath = path.resolve(process.cwd(), 'src/app/globals.css');
  const layoutPath = path.resolve(process.cwd(), 'src/app/[lang]/layout.tsx');

  it('next.config.ts görsellerde AVIF formatını öncelikli tanımlar (Faz 101)', () => {
    const configContent = fs.readFileSync(nextConfigPath, 'utf-8');
    expect(configContent).toContain("'image/avif'");
    expect(configContent).toContain("'image/webp'");
  });

  it('Hero.tsx LCP görselinde priority=true ve fetchPriority=high taşır (Faz 102)', () => {
    const heroContent = fs.readFileSync(heroPath, 'utf-8');
    expect(heroContent).toContain('priority={true}');
    expect(heroContent).toContain('fetchPriority="high"');
    expect(heroContent).toContain('hero-poster-v5.webp');
  });

  it('Blog listesi ve kart görsellerinde ayrıntılı responsive sizes tanımlıdır (Faz 103)', () => {
    const postGridContent = fs.readFileSync(postGridPath, 'utf-8');
    const blogListContent = fs.readFileSync(blogListPath, 'utf-8');
    expect(postGridContent).toContain('sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"');
    expect(blogListContent).toContain('sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"');
  });

  it('Görsellerde quality=75 varsayılanı bant genişliği tasarrufu sağlar (Faz 104)', () => {
    const heroContent = fs.readFileSync(heroPath, 'utf-8');
    const logoTickerContent = fs.readFileSync(logoTickerPath, 'utf-8');
    expect(heroContent).toContain('quality={75}');
    expect(logoTickerContent).toContain('quality={75}');
  });

  it('Hero arka plan videosu preload="none" kullanarak mobilde kota korur (Faz 105)', () => {
    const heroContent = fs.readFileSync(heroPath, 'utf-8');
    expect(heroContent).toContain('preload="none"');
  });

  it('Hero.tsx saveData veya yavaş ağlarda (2G/3G) videoyu yüklemeyi iptal eder (Faz 106)', () => {
    const heroContent = fs.readFileSync(heroPath, 'utf-8');
    expect(heroContent).toContain('saveData');
    expect(heroContent).toContain('effectiveType');
  });

  it('Footer.tsx sosyal medya SVG ikonlarında width, height ve viewBox sabittir (Faz 107)', () => {
    const footerContent = fs.readFileSync(footerPath, 'utf-8');
    expect(footerContent).toContain('width="20" height="20"');
    expect(footerContent).toContain('width="16" height="16"');
  });

  it('globals.css mobil cihazlarda backdrop-blur sınıflarını optimize eder (Faz 108)', () => {
    const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');
    expect(cssContent).toContain('@media (max-width: 768px)');
    expect(cssContent).toContain('.backdrop-blur-xl');
    expect(cssContent).toContain('.backdrop-blur-2xl');
    expect(cssContent).toContain('backdrop-filter: blur(8px) !important');
  });

  it('ikonlar Google Fonts yerine kendi SVG sprite dosyasından yüklenir (Faz 109)', () => {
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');
    expect(layoutContent).not.toContain('fonts.googleapis.com');
    expect(cssContent).not.toContain('fonts.googleapis.com');
    const sprite = fs.readFileSync(path.resolve(process.cwd(), 'public/icons/sprite.svg'), 'utf-8');
    expect(sprite).toContain('<symbol id="arrow_forward"');
    expect(cssContent).toContain('.icon {');
  });

  it('Inter değişken font dosyası olarak (100-900) kendi barındırılır, ağırlık başına ayrı dosya yüklenmez (Faz 110)', () => {
    const fontsCss = fs.readFileSync(path.resolve(process.cwd(), 'src/app/fonts.css'), 'utf-8');
    expect(fontsCss).toContain("font-family: 'Inter'");
    expect(fontsCss).toContain('font-weight: 100 900');
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).not.toContain('next/font/google');
  });
});
