import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { auditSemanticLandmarks } from './semanticLandmarkAuditor';
import { validateTouchTarget } from './touchTargetValidator';

describe('Wave 9: Faz 211 - Faz 215 Hareket Azaltma, Yüksek Kontrast, Tablo Scope, Semantik Bölge & Dokunmatik Boyut', () => {
  it('Faz 211: globals.css prefers-reduced-motion: reduce sorgusu ile animasyonları sıfırlar', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('@media (prefers-reduced-motion: reduce)');
    expect(cssContent).toContain('animation-duration: 0.01ms !important');
    expect(cssContent).toContain('transition-duration: 0.01ms !important');
  });

  it('Faz 212: globals.css prefers-contrast: more yüksek kontrast desteği sunar', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('@media (prefers-contrast: more)');
    expect(cssContent).toContain('border-width: 2px !important');
    expect(cssContent).toContain('box-shadow: none !important');
  });

  it('Faz 213: ComparisonTableSeo tablosu scope="col" ve scope="row" niteliklerine sahiptir', () => {
    const tablePath = path.resolve(process.cwd(), 'src/components/seo/ComparisonTableSeo.tsx');
    const tableContent = fs.readFileSync(tablePath, 'utf-8');

    expect(tableContent).toContain('scope="col"');
    expect(tableContent).toContain('scope="row"');
  });

  it('Faz 214: auditSemanticLandmarks ana HTML5 yapı taşlarını tanır ve tam puan verir', () => {
    const semanticPage = `
      <header><nav>Menü</nav></header>
      <main>
        <article>
          <h1>Makale</h1>
          <section>İçerik</section>
        </article>
        <aside>Kenar Çubuğu</aside>
      </main>
      <footer>Alt Bilgi</footer>
    `;
    const result = auditSemanticLandmarks(semanticPage);
    expect(result.hasMain).toBe(true);
    expect(result.hasNav).toBe(true);
    expect(result.hasHeader).toBe(true);
    expect(result.hasFooter).toBe(true);
    expect(result.score).toBe(100);
  });

  it('Faz 215: validateTouchTarget 44x44px dokunmatik hedef standardını doğrular', () => {
    const validTarget = validateTouchTarget(48, 48);
    expect(validTarget.valid).toBe(true);

    const smallTarget = validateTouchTarget(32, 32);
    expect(smallTarget.valid).toBe(false);
    expect(smallTarget.error).toContain('44x44px');

    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    expect(cssContent).toContain('@media (pointer: coarse)');
    expect(cssContent).toContain('min-height: 44px');
    expect(cssContent).toContain('min-width: 44px');
  });
});
