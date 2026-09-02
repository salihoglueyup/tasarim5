import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { formatAccessiblePrice } from '@/components/ui/AccessiblePrice';
import { runLighthouseA11yAudit } from './dualCoreA11yEngine';

describe('Wave 9: Faz 221 - Faz 225 Fiyat Erişilebilirliği, Menü Kapatma, Autocomplete & Lighthouse 100/100', () => {
  it('Faz 221: formatAccessiblePrice ekran okuyucu için "Türk Lirası" ifadesini sağlar', () => {
    const price = formatAccessiblePrice(4500);
    expect(price.visual).toBe('4.500 ₺');
    expect(price.accessible).toBe('4.500 Türk Lirası');

    const componentPath = path.resolve(process.cwd(), 'src/components/ui/AccessiblePrice.tsx');
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('sr-only');
    expect(content).toContain('aria-hidden="true"');
  });

  it('Faz 222: Menü kapatma ve açma butonlarında açıkça "Menüyü Kapat" aria-label tanımlıdır', () => {
    const mobileMenuPath = path.resolve(process.cwd(), 'src/components/layout/MobileMenu.tsx');
    const mobileMenuContent = fs.readFileSync(mobileMenuPath, 'utf-8');
    expect(mobileMenuContent).toContain('aria-label="Menüyü Kapat"');

    const headerPath = path.resolve(process.cwd(), 'src/components/layout/Header.tsx');
    const headerContent = fs.readFileSync(headerPath, 'utf-8');
    expect(headerContent).toContain('aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}');
  });

  it('Faz 223: Form alanları autoComplete="name", "tel" ve "email" taşır', () => {
    const formPath = path.resolve(process.cwd(), 'src/app/[lang]/iletisim/IletisimClient.tsx');
    const content = fs.readFileSync(formPath, 'utf-8');

    expect(content).toContain('autoComplete="name"');
    expect(content).toContain('autoComplete="tel"');
    expect(content).toContain('autoComplete="email"');

    const newsletterPath = path.resolve(process.cwd(), 'src/components/layout/NewsletterForm.tsx');
    const newsletterContent = fs.readFileSync(newsletterPath, 'utf-8');
    expect(newsletterContent).toContain('autoComplete="email"');
  });

  it('Faz 224: runLighthouseA11yAudit tam uyumlu sayfada 100/100 skor verir', () => {
    const accessibleHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>Alo Yönetim</title></head>
        <body>
          <a href="#main-content" class="sr-only">İçeriğe atla</a>
          <header>
            <nav aria-label="Ana Menü">Menü</nav>
          </header>
          <main id="main-content">
            <h1>Alo Yönetim Profesyonel Tesis Hizmetleri</h1>
            <h2>Hizmetlerimiz</h2>
            <p>Açıklama</p>
            <Image src="/logo.webp" alt="Alo Yönetim Kurumsal Logo" width={200} height={50} />
            <form>
              <label htmlFor="user-name">Adınız</label>
              <input id="user-name" type="text" />
            </form>
          </main>
          <footer>Alt Bilgi</footer>
        </body>
      </html>
    `;

    const report = runLighthouseA11yAudit(accessibleHtml, 'tr');
    expect(report.score).toBe(100);
    expect(report.passed).toBe(true);
    expect(report.summary).toContain('100/100');
  });

  it('Faz 225: Eksik hiyerarşi veya görsel alt niteliği olduğunda Lighthouse puanı kırılır', () => {
    const invalidHtml = `
      <html>
        <body>
          <main>
            <h1>Başlık 1</h1>
            <h3>Atlanmış Başlık 3</h3>
            <img src="/foto.jpg" />
          </main>
        </body>
      </html>
    `;

    const report = runLighthouseA11yAudit(invalidHtml, 'tr');
    expect(report.score).toBeLessThan(100);
    expect(report.passed).toBe(false);
  });
});
