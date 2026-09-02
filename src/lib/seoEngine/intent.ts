import type { SearchIntentResult, SearchIntentType } from './types';
import { normalizeText } from './utils';

export function classifySearchIntent(queryOrText: string): SearchIntentResult {
  const norm = normalizeText(queryOrText);
  const matchedSignals: string[] = [];

  const transactionalSignals = ['teklif', 'fiyat', 'ucret', 'satin al', 'hizmet al', 'iletisim', 'hemen ara', 'teklif al'];
  const informationalSignals = ['nedir', 'nasil', 'kanun', 'madde', 'rehber', 'sartlari', 'hesaplama', 'neden'];
  const navigationalSignals = ['giris', 'login', 'portal', 'alo yonetim iletisim', 'telefon numarasi', 'adres'];
  const commercialSignals = ['en iyi', 'karsilastirma', 'tavsiye', 'firmalari', 'sirketleri', 'farki', 'avantajlari', 'hangisi'];

  let transCount = 0;
  let infoCount = 0;
  let navCount = 0;
  let commCount = 0;

  for (const s of transactionalSignals) {
    if (norm.includes(s)) {
      transCount++;
      matchedSignals.push(`İşlemsel: ${s}`);
    }
  }

  for (const s of informationalSignals) {
    if (norm.includes(s)) {
      infoCount++;
      matchedSignals.push(`Bilgisel: ${s}`);
    }
  }

  for (const s of navigationalSignals) {
    if (norm.includes(s)) {
      navCount++;
      matchedSignals.push(`Gezinme: ${s}`);
    }
  }

  for (const s of commercialSignals) {
    if (norm.includes(s)) {
      commCount++;
      matchedSignals.push(`Ticari Araştırma: ${s}`);
    }
  }

  let intent: SearchIntentType = 'informational';
  let maxScore = infoCount;
  let recommendedCta = 'Detaylı Bilgi ve Rehberi İnceleyin';
  let recommendedSchemaType = 'Article / TechArticle';

  if (transCount > maxScore) {
    intent = 'transactional';
    maxScore = transCount;
    recommendedCta = 'Ücretsiz Keşif ve Fiyat Teklifi Alın';
    recommendedSchemaType = 'OfferCatalog / ProfessionalService';
  }

  if (commCount > maxScore) {
    intent = 'commercial';
    maxScore = commCount;
    recommendedCta = 'Tesis Yönetim Hizmetlerimizi Karşılaştırın';
    recommendedSchemaType = 'Service / Review';
  }

  if (navCount > maxScore) {
    intent = 'navigational';
    maxScore = navCount;
    recommendedCta = 'Müşteri Paneline Giriş Yapın veya Arayın';
    recommendedSchemaType = 'Organization / ContactPoint';
  }

  const confidencePercent = Math.min(100, Math.max(50, 50 + maxScore * 15));

  return {
    intent,
    confidencePercent,
    matchedSignals,
    recommendedCta,
    recommendedSchemaType,
  };
}

/**
 * İçerikten Otomatik Soru-Cevap (FAQ) Çıkarıcısı ve Schema Üreticisi.
 */
