import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 5: Medya, AVIF, Font & LCP Optimizasyonları (Faz 101 - Faz 105)', () => {
  const nextConfigPath = path.resolve(process.cwd(), 'next.config.ts');
  const heroPath = path.resolve(process.cwd(), 'src/components/sections/Hero.tsx');
  const postGridPath = path.resolve(process.cwd(), 'src/components/blog/PostGrid.tsx');
  const blogListPath = path.resolve(process.cwd(), 'src/components/blog/BlogListClient.tsx');
  const logoTickerPath = path.resolve(process.cwd(), 'src/components/ui/LogoTicker.tsx');

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
});
