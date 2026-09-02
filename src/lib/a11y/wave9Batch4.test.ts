import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { auditSvgAriaHidden } from './svgAriaAuditor';
import { validateHtmlLangDirection } from './langAttributeAuditor';

describe('Wave 9: Faz 216 - Faz 220 SVG aria-hidden, Video Altyazı/Deşifre, Dinamik HTML Lang, Yatay Kaydırma & Progress Bar', () => {
  it('Faz 216: auditSvgAriaHidden dekoratif SVG ikonlarda aria-hidden="true" varlığını denetler', () => {
    const validSvg = `
      <svg aria-hidden="true" width="24" height="24"><path d="M0 0" /></svg>
      <svg role="img" aria-label="Arama İkonu"><path d="M1 1" /></svg>
    `;
    const validReport = auditSvgAriaHidden(validSvg, 'valid.tsx');
    expect(validReport.valid).toBe(true);

    const invalidSvg = `
      <svg width="24" height="24"><path d="M0 0" /></svg>
    `;
    const invalidReport = auditSvgAriaHidden(invalidSvg, 'invalid.tsx');
    expect(invalidReport.valid).toBe(false);
    expect(invalidReport.missingAriaHiddenCount).toBe(1);
  });

  it('Faz 217: AccessibleVideoPlayer bileşeni altyazı track ve deşifre metni desteği sunar', () => {
    const playerPath = path.resolve(process.cwd(), 'src/components/ui/AccessibleVideoPlayer.tsx');
    const content = fs.readFileSync(playerPath, 'utf-8');

    expect(content).toContain('kind="captions"');
    expect(content).toContain('aria-controls="video-transcript-content"');
    expect(content).toContain('aria-expanded={showTranscript}');
    expect(content).toContain('role="region"');
  });

  it('Faz 218: validateHtmlLangDirection desteklenen tüm dillerde geçerli BCP 47 ve yön doğrular', () => {
    const trCheck = validateHtmlLangDirection('tr');
    expect(trCheck.isValid).toBe(true);
    expect(trCheck.direction).toBe('ltr');
    expect(trCheck.bcp47).toBe('tr-TR');

    const arCheck = validateHtmlLangDirection('ar');
    expect(arCheck.isValid).toBe(true);
    expect(arCheck.direction).toBe('rtl');

    const layoutPath = path.resolve(process.cwd(), 'src/app/[lang]/layout.tsx');
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).toContain('<html lang={lang} dir={isRtl ? \'rtl\' : \'ltr\'}');
  });

  it('Faz 219: useHorizontalScrollKeyboard klavye yön tuşlarıyla kaydırma kancası mevcuttur', () => {
    const hookPath = path.resolve(process.cwd(), 'src/hooks/useHorizontalScrollKeyboard.ts');
    expect(fs.existsSync(hookPath)).toBe(true);

    const content = fs.readFileSync(hookPath, 'utf-8');
    expect(content).toContain('ArrowRight');
    expect(content).toContain('ArrowLeft');
    expect(content).toContain('scrollBy');
    expect(content).toContain('tabindex');
  });

  it('Faz 220: AccessibleProgressBar role="progressbar" ve ARIA değer aralıklarını tanımlar', () => {
    const progressPath = path.resolve(process.cwd(), 'src/components/ui/AccessibleProgressBar.tsx');
    const content = fs.readFileSync(progressPath, 'utf-8');

    expect(content).toContain('role="progressbar"');
    expect(content).toContain('aria-valuenow={clampedValue}');
    expect(content).toContain('aria-valuemin={min}');
    expect(content).toContain('aria-valuemax={max}');
    expect(content).toContain('aria-label={label}');
  });
});
