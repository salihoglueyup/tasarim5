import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 7: Faz 166 - Faz 170 Çok Dilli Sözlük, Başarı Hikayeleri, Yasal Özet, Arapça Leading & Çerez İzni', () => {
  const sozlukClientPath = path.resolve(process.cwd(), 'src/app/[lang]/sozluk/SozlukClient.tsx');
  const basariClientPath = path.resolve(process.cwd(), 'src/app/[lang]/basari-hikayeleri/BasariHikayeleriClient.tsx');
  const legalSummaryPath = path.resolve(process.cwd(), 'src/components/legal/LegalEnglishSummary.tsx');
  const globalsCssPath = path.resolve(process.cwd(), 'src/app/globals.css');
  const cookieConsentPath = path.resolve(process.cwd(), 'src/components/ui/CookieConsent.tsx');

  it('Faz 166: SozlukClient İngilizce seçildiğinde ENGLISH_TERMS ile DefinedTermSetSeo besler', () => {
    const content = fs.readFileSync(sozlukClientPath, 'utf-8');
    expect(content).toContain('ENGLISH_TERMS');
    expect(content).toContain('activeTerms');
    expect(content).toContain('terms={activeTerms}');
  });

  it('Faz 167: BasariHikayeleriClient çok dilli vaka analizlerini ve çeviri anahtarlarını destekler', () => {
    const content = fs.readFileSync(basariClientPath, 'utf-8');
    expect(content).toContain('getStoryField');
    expect(content).toContain('case_1_title');
    expect(content).toContain('case_2_title');
    expect(content).toContain('case_3_title');
  });

  it('Faz 168: LegalEnglishSummary KVKK ve Gizlilik Politikası için İngilizce özet kartlarını barındırır', () => {
    const content = fs.readFileSync(legalSummaryPath, 'utf-8');
    expect(content).toContain('Executive Summary: Data Protection Notice');
    expect(content).toContain('Executive Summary: Privacy & Data Confidentiality Policy');
    expect(content).toContain('Law No. 6698');
    expect(content).toContain('kvkk@aloyonetim.com.tr');
  });

  it('Faz 169: globals.css Arapça için özel satır yüksekliği (leading) ve glif optimizasyonları içerir', () => {
    const content = fs.readFileSync(globalsCssPath, 'utf-8');
    expect(content).toContain('[dir="rtl"] h1');
    expect(content).toContain('line-height: 1.45 !important');
    expect(content).toContain('line-height: 1.85 !important');
    expect(content).toContain('[dir="rtl"] input');
  });

  it('Faz 170: CookieConsent 4 dilde (TR, EN, RU, AR) yerelleştirilmiş metin ve bağlantılar içerir', () => {
    const content = fs.readFileSync(cookieConsentPath, 'utf-8');
    expect(content).toContain('Çerez Tercihleri');
    expect(content).toContain('Cookie Preferences');
    expect(content).toContain('Настройки файлов cookie');
    expect(content).toContain('تفضيلات ملفات تعريف الارتباط');
    expect(content).toContain('policyHref');
  });
});
