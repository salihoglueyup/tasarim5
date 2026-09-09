import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { CERTIFICATES, getCertificate } from '@/data/certificates';

describe('Sertifikalar Ground Truth & Akreditasyon Doğrulama Testleri', () => {
  it('Tüm 7 sertifikanın fiziksel PDF dosyası public/certificates/ altında mevcut olmalıdır', () => {
    expect(CERTIFICATES).toHaveLength(7);

    for (const cert of CERTIFICATES) {
      const fullPdfPath = path.join(process.cwd(), 'public', cert.pdf);
      expect(fs.existsSync(fullPdfPath), `Dosya bulunamadı: ${cert.pdf}`).toBe(true);
      const stat = fs.statSync(fullPdfPath);
      expect(stat.size).toBeGreaterThan(10000); // Boş olmamalı
    }
  });

  it('Tüm sertifikalar BELCERT Uluslararası Belgelendirme ve ILAS akreditasyonu taşımalıdır', () => {
    for (const cert of CERTIFICATES) {
      expect(cert.issuer).toBe('BELCERT Uluslararası Belgelendirme Şirketi');
      expect(cert.accreditation).toBe('ILAS ACCREDITED (ILAS-MS-0089)');
      expect(cert.holderName).toBe('ALO YÖNETİM VE ORGANİZASYON ANONİM ŞİRKETİ');
      expect(cert.verificationUrl).toBe('https://www.belcert.com');
      expect(cert.datePublished).toBe('2026-08-04');
      expect(cert.validUntil).toBe('2027-08-04');
      expect(cert.period).toBe('1 Yıl / 1 Year');
    }
  });

  it('Sertifika seri numaraları ve mühür kodları taranmış orijinalleriyle birebir eşleşmelidir', () => {
    const cert10002 = getCertificate('iso-10002');
    expect(cert10002?.certificateNumber).toBe('A1808961');
    expect(cert10002?.sealNumber).toBe('064794');

    const cert14001 = getCertificate('iso-14001');
    expect(cert14001?.certificateNumber).toBe('A1808962');
    expect(cert14001?.sealNumber).toBe('064792');

    const cert22301 = getCertificate('iso-22301');
    expect(cert22301?.certificateNumber).toBe('A1808963');
    expect(cert22301?.sealNumber).toBe('064791');

    const cert26000 = getCertificate('iso-26000');
    expect(cert26000?.certificateNumber).toBe('A1808964');
    expect(cert26000?.sealNumber).toBe('064790');

    const cert31000 = getCertificate('iso-31000');
    expect(cert31000?.certificateNumber).toBe('A1808965');
    expect(cert31000?.sealNumber).toBe('064789');

    const cert45001 = getCertificate('iso-45001');
    expect(cert45001?.certificateNumber).toBe('A1808966');
    expect(cert45001?.sealNumber).toBe('064787');

    const certDogaya = getCertificate('dogaya-saygi');
    expect(certDogaya?.certificateNumber).toBe('A1808967');
    expect(certDogaya?.sealNumber).toBe('064786');
  });

  it('Resmi belge kapsamı gayrimenkul yönetimi ve genel danışmanlık faaliyetlerini içermelidir', () => {
    for (const cert of CERTIFICATES) {
      expect(cert.officialScopeTr).toContain('GAYRİMENKUL YÖNETİMİ FAALİYETLERİ');
      expect(cert.officialScopeTr).toContain('GENEL YÖNETİM VE ORGANİZASYON DANIŞMANLIĞI');
      expect(cert.officialScopeEn).toContain('REAL ESTATE MANAGEMENT ACTIVITIES');
    }
  });

  it('document-sitemap.xml route dosyasında 2026-08-04 lastmod tarihi tanımlı olmalıdır', () => {
    const sitemapRoutePath = path.join(process.cwd(), 'src/app/document-sitemap.xml/route.ts');
    const content = fs.readFileSync(sitemapRoutePath, 'utf8');
    expect(content).toContain('2026-08-04');
    expect(content).toContain('A1808961');
    expect(content).toContain('A1808962');
  });
});
