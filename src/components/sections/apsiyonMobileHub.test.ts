import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Alo Yönetim x Apsiyon Mobil Entegrasyonu ve /app Sayfası Güvence Testleri', () => {
  const uiDir = path.resolve(process.cwd(), 'src/components/ui');
  const sectionsDir = path.resolve(process.cwd(), 'src/components/sections');
  const modalsDir = path.resolve(process.cwd(), 'src/components/modals');
  const seoDir = path.resolve(process.cwd(), 'src/components/seo');
  const appLayoutPath = path.resolve(process.cwd(), 'src/app/[lang]/app/layout.tsx');
  const appPagePath = path.resolve(process.cwd(), 'src/app/[lang]/app/page.tsx');

  it('1. AppBadges.tsx resmi Apsiyon iOS, Android ve Huawei mağaza linklerini ve güvenlik özniteliklerini taşır', () => {
    const badgesContent = fs.readFileSync(path.join(uiDir, 'AppBadges.tsx'), 'utf-8');
    expect(badgesContent).toContain('https://apps.apple.com/app/apsiyon/id1115852575');
    expect(badgesContent).toContain('https://play.google.com/store/apps/details?id=com.apsiyon.mobile');
    expect(badgesContent).toContain('https://appgallery.huawei.com/app/C100486001');
    expect(badgesContent).toContain('target="_blank"');
    expect(badgesContent).toContain('rel="noopener noreferrer"');
    // Faz 72 uyumu: SVG width/height/aria-hidden
    expect(badgesContent).toContain('width="28"');
    expect(badgesContent).toContain('height="28"');
    expect(badgesContent).toContain('aria-hidden="true"');
  });

  it('2. AppShowcase.tsx (Anasayfa) tıklanabilir Apsiyon mağaza ve doğrudan Web portal giriş bağlantılarını içerir', () => {
    const showcaseContent = fs.readFileSync(path.join(sectionsDir, 'AppShowcase.tsx'), 'utf-8');
    expect(showcaseContent).toContain('https://apps.apple.com/app/apsiyon/id1115852575');
    expect(showcaseContent).toContain('https://play.google.com/store/apps/details?id=com.apsiyon.mobile');
    expect(showcaseContent).toContain('https://online.apsiyon.com/');
    expect(showcaseContent).toContain('target="_blank"');
    expect(showcaseContent).toContain('rel="noopener noreferrer"');
  });

  it('3. PortalModal.tsx sakinleri resmi Apsiyon Web Portalı girişine ve mobil mağazalara güvenle yönlendirir', () => {
    const modalContent = fs.readFileSync(path.join(modalsDir, 'PortalModal.tsx'), 'utf-8');
    expect(modalContent).toContain('https://online.apsiyon.com/');
    expect(modalContent).toContain('https://apps.apple.com/app/apsiyon/id1115852575');
    expect(modalContent).toContain('https://play.google.com/store/apps/details?id=com.apsiyon.mobile');
    expect(modalContent).toContain('Apsiyon Altyapısı Güvencesiyle');
    expect(modalContent).toContain('Şifremi Unuttum');
  });

  it('4. ApsiyonLogo.tsx resmi Apsiyon vektörel koordinatlarını ve #00A5DF marka rengini taşır', () => {
    const logoContent = fs.readFileSync(path.join(uiDir, 'ApsiyonLogo.tsx'), 'utf-8');
    expect(logoContent).toContain('#00A5DF');
    expect(logoContent).toContain('role="img"');
    // Orijinal ikon çatı yolu
    expect(logoContent).toContain('M30.47,13.27');
  });

  it('5. ApsiyonMobileHub.tsx Sakin ve Yönetici (Apsiyon Manager) modları, QR kod, KMK güvenlik rozetleri ve FAQ barındırır', () => {
    const hubContent = fs.readFileSync(path.join(sectionsDir, 'ApsiyonMobileHub.tsx'), 'utf-8');
    // Framer motion içermez, CSS donanım hızlandırma
    expect(hubContent).not.toContain("from 'framer-motion'");
    expect(hubContent).toContain('transform-gpu');
    // Apsiyon Sakin ve Manager linkleri
    expect(hubContent).toContain('https://apps.apple.com/app/apsiyon/id1115852575');
    expect(hubContent).toContain('https://play.google.com/store/apps/details?id=com.apsiyon.mobile');
    expect(hubContent).toContain('https://apps.apple.com/app/apsiyon-manager/id1453210408');
    expect(hubContent).toContain('https://play.google.com/store/apps/details?id=com.apsiyon.manager');
    expect(hubContent).toContain('https://online.apsiyon.com/');
    // Apsiyon resmi rengi ve logo entegrasyonu
    expect(hubContent).toContain('#00A5DF');
    expect(hubContent).toContain('ApsiyonLogo');
    // QR, yasal güvenceler ve SSS
    expect(hubContent).toContain('QR');
    expect(hubContent).toContain('634 KMK Tam Uyumluluk');
    expect(hubContent).toContain('256-Bit SSL Şifreleme');
    expect(hubContent).toContain('KVKK Gizlilik Koruması');
    expect(hubContent).toContain('BDDK Lisanslı Sanal POS');
    expect(hubContent).toContain('FAQPage');
    // Doğrudan Hub içinde MobileApplication Schema.org verisi ve simülatörsüz temiz akış
    expect(hubContent).toContain('MobileApplication');
    expect(hubContent).toContain('aggregateRating');
    expect(hubContent).not.toContain('<MobileAppLiveSimulatorSeo');
  });

  it('6. MobileAppLiveSimulatorSeo.tsx Apsiyon Sakin & Yönetici Portalı yapılandırılmış verisi ve telefon arayüzü sunar', () => {
    const simulatorContent = fs.readFileSync(path.join(seoDir, 'MobileAppLiveSimulatorSeo.tsx'), 'utf-8');
    expect(simulatorContent).toContain('Apsiyon — Alo Yönetim Sakin & Yönetici Portalı');
    expect(simulatorContent).toContain('https://apps.apple.com/app/apsiyon/id1115852575');
    expect(simulatorContent).toContain('https://play.google.com/store/apps/details?id=com.apsiyon.mobile');
    expect(simulatorContent).toContain('Apsiyon Sakin');
    expect(simulatorContent).toContain('ApsiyonLogo');
    expect(simulatorContent).toContain('#00A5DF');
  });

  it('7. /app layout.tsx ve page.tsx Apsiyon mobil entegrasyonu, zengin metadata ve temiz tekil h1 içerir', () => {
    const layoutContent = fs.readFileSync(appLayoutPath, 'utf-8');
    expect(layoutContent).toContain('Alo Yönetim Sakin & Yönetici Mobil Portalı — Apsiyon Güvencesiyle');
    expect(layoutContent).toContain('apsiyon sakin indir');
    expect(layoutContent).toContain('apsiyon manager');

    const pageContent = fs.readFileSync(appPagePath, 'utf-8');
    expect(pageContent).toContain('Alo Yönetim & Apsiyon Mobil Portalı');
    expect(pageContent).toContain('ApsiyonMobileHub');
    // Çift h1 olmamalı (PageHeader page.tsx içinde doğrudan kullanılmaz, ApsiyonMobileHub tekil h1 taşır)
    expect(pageContent).not.toContain('<PageHeader');
  });
});
