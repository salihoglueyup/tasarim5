import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { auditImageAccessibility } from './imageAltAuditor';
import { calculateContrastRatio } from './contrastValidator';

describe('Wave 9: Faz 206 - Faz 210 Form Etiketleri, Canlı Hata Duyurusu, Görsel Alt, Kontrast & Odak Halkası', () => {
  it('Faz 206: IletisimClient formunda tüm alanlar kalıcı label ve htmlFor ilişkisine sahiptir', () => {
    const formPath = path.resolve(process.cwd(), 'src/app/[lang]/iletisim/IletisimClient.tsx');
    const content = fs.readFileSync(formPath, 'utf-8');

    expect(content).toContain('htmlFor="name"');
    expect(content).toContain('id="name"');
    expect(content).toContain('htmlFor="phone"');
    expect(content).toContain('id="phone"');
    expect(content).toContain('htmlFor="email"');
    expect(content).toContain('id="email"');
    expect(content).toContain('htmlFor="subject"');
    expect(content).toContain('id="subject"');
    expect(content).toContain('htmlFor="message"');
    expect(content).toContain('id="message"');
  });

  it('Faz 207: Form hataları role="alert", aria-live="polite" ve aria-invalid taşır', () => {
    const formPath = path.resolve(process.cwd(), 'src/app/[lang]/iletisim/IletisimClient.tsx');
    const content = fs.readFileSync(formPath, 'utf-8');

    expect(content).toContain('aria-invalid={Boolean(errors.name)}');
    expect(content).toContain('role="alert" aria-live="polite"');
    expect(content).toContain('aria-describedby');
  });

  it('Faz 208: auditImageAccessibility görsel alt niteliklerini doğrular ve eksikleri tespit eder', () => {
    const validContent = `
      <Image src="/test.jpg" alt="Kadıköy Profesyonel Tesis Yönetimi" width={400} height={300} />
      <img src="/decorative.svg" alt="" aria-hidden="true" />
    `;
    const validReport = auditImageAccessibility(validContent, 'valid.tsx');
    expect(validReport.valid).toBe(true);
    expect(validReport.totalImages).toBe(2);

    const invalidContent = `
      <img src="/missing.jpg" />
      <Image src="/bad.jpg" alt="image" width={200} height={200} />
    `;
    const invalidReport = auditImageAccessibility(invalidContent, 'invalid.tsx');
    expect(invalidReport.valid).toBe(false);
    expect(invalidReport.missingAltCount).toBe(1);
    expect(invalidReport.suspiciousAltCount).toBe(1);
  });

  it('Faz 209: calculateContrastRatio WCAG 2.1 AA kontrast kurallarını doğrular', () => {
    // Siyah üzerine Beyaz -> 21:1 (Geçer)
    const highContrast = calculateContrastRatio('#ffffff', '#000000');
    expect(highContrast.ratio).toBeGreaterThan(20);
    expect(highContrast.passesAaNormalText).toBe(true);

    // Koyu arkaplan (#0f172a) üzerine beyaz metin (#ffffff) -> 15.6:1 (Geçer)
    const slateContrast = calculateContrastRatio('#ffffff', '#0f172a');
    expect(slateContrast.passesAaNormalText).toBe(true);

    // Açık gri (#cccccc) üzerine beyaz (#ffffff) -> 1.6:1 (Kaldı)
    const lowContrast = calculateContrastRatio('#cccccc', '#ffffff');
    expect(lowContrast.passesAaNormalText).toBe(false);
  });

  it('Faz 210: globals.css içinde klavye gezintisi için :focus-visible kuralları tanımlıdır', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain(':focus-visible');
    expect(cssContent).toContain('outline: 2px solid #3b82f6');
    expect(cssContent).toContain('box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25)');
  });
});
