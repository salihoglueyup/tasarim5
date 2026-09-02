import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { auditHeadingHierarchy } from './headingAuditor';

describe('Wave 9: Faz 201 - Faz 205 WCAG 2.1 AA Erişilebilirlik (A11y) Temelleri', () => {
  it('Faz 201: Header bileşeninde interaktif butonlar açıklayıcı aria-label taşır', () => {
    const headerPath = path.resolve(process.cwd(), 'src/components/layout/Header.tsx');
    const headerContent = fs.readFileSync(headerPath, 'utf-8');

    expect(headerContent).toContain('aria-label="Dil Seçimi"');
    expect(headerContent).toContain('aria-label="Temayı Değiştir"');
    expect(headerContent).toContain('aria-label="Online İşlemler Girişi"');
    expect(headerContent).toContain('aria-label="Hızlı teklif alın"');
    expect(headerContent).toContain('aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}');
  });

  it('Faz 202: NavigationWrapper #main-content atlama bağlantısına (Skip Navigation Link) sahiptir', () => {
    const navWrapperPath = path.resolve(process.cwd(), 'src/components/layout/NavigationWrapper.tsx');
    const navContent = fs.readFileSync(navWrapperPath, 'utf-8');

    expect(navContent).toContain('href="#main-content"');
    expect(navContent).toContain('sr-only focus:not-sr-only');
    expect(navContent).toContain('id="main-content"');
  });

  it('Faz 203: auditHeadingHierarchy başlık seviyelerini denetler ve kural ihlallerini yakalar', () => {
    const validMarkup = `
      <h1>Alo Yönetim Tesis Hizmetleri</h1>
      <p>Açıklama</p>
      <h2>Hizmet Kategorileri</h2>
      <h3>Özel Güvenlik</h3>
      <h3>Temizlik ve Hijyen</h3>
      <h2>Sıkça Sorulan Sorular</h2>
    `;
    const validResult = auditHeadingHierarchy(validMarkup, 'validPage.tsx');
    expect(validResult.valid).toBe(true);
    expect(validResult.h1Count).toBe(1);

    const invalidMarkup = `
      <h1>İlk H1 Başlığı</h1>
      <h1>İkinci H1 Başlığı</h1>
      <h3>Atlanmış H3 Başlığı</h3>
    `;
    const invalidResult = auditHeadingHierarchy(invalidMarkup, 'invalidPage.tsx');
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.h1Count).toBe(2);
    expect(invalidResult.errors.length).toBeGreaterThan(1);
  });

  it('Faz 204: useFocusTrap hook dosyası mevcuttur ve LoginModal tarafından kullanılır', () => {
    const hookPath = path.resolve(process.cwd(), 'src/hooks/useFocusTrap.ts');
    const loginModalPath = path.resolve(process.cwd(), 'src/components/layout/LoginModal.tsx');

    expect(fs.existsSync(hookPath)).toBe(true);

    const loginContent = fs.readFileSync(loginModalPath, 'utf-8');
    expect(loginContent).toContain('useFocusTrap');
    expect(loginContent).toContain('ref={trapRef}');
  });

  it('Faz 205: FaqClient akordeonları aria-expanded ve aria-controls eşleşmesine sahiptir', () => {
    const faqClientPath = path.resolve(process.cwd(), 'src/app/[lang]/sss/FaqClient.tsx');
    const faqContent = fs.readFileSync(faqClientPath, 'utf-8');

    expect(faqContent).toContain('aria-expanded={isOpen}');
    expect(faqContent).toContain('aria-controls={`faq-panel-${faq.id}`}');
    expect(faqContent).toContain('id={`faq-panel-${faq.id}`}');
    expect(faqContent).toContain('role="region"');
  });
});
