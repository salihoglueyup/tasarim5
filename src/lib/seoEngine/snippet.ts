import type { SnippetHealthReport, HeadingStructureReport } from './types';
import { ORG_NAME } from '@/lib/schemas';
import { DISTRICTS } from '@/data/districts';
import { normalizeText, CTR_TRIGGER_WORDS } from './utils';

export function evaluateSnippetHealth(
  title: string,
  description: string,
  targetKeyword: string = 'tesis yönetimi'
): SnippetHealthReport {
  const recommendations: string[] = [];
  const detectedTriggers: string[] = [];

  const cleanTitle = title.trim();
  const cleanDesc = description.trim();
  const normTitle = normalizeText(cleanTitle);
  const normDesc = normalizeText(cleanDesc);
  const normKeyword = normalizeText(targetKeyword);

  const titleLength = cleanTitle.length;
  const descriptionLength = cleanDesc.length;

  let score = 100;

  // Başlık Uzunluğu (40-65 karakter ideal)
  if (titleLength < 35) {
    score -= 15;
    recommendations.push('Başlık çok kısa; 40-65 karakter arası daha yüksek tıklanma sağlar.');
  } else if (titleLength > 65) {
    score -= 15;
    recommendations.push('Başlık arama motoru sonuçlarında kesilebilir (65 karakterden uzun).');
  }

  // Açıklama Uzunluğu (120-160 karakter ideal)
  if (descriptionLength < 110) {
    score -= 15;
    recommendations.push('Meta açıklama çok kısa; en az 120 karakter ile arama niyetini zenginleştirin.');
  } else if (descriptionLength > 165) {
    score -= 10;
    recommendations.push('Meta açıklama 160 karakteri aşıyor, mobilde son kısmı kesilebilir.');
  }

  // Anahtar Kelime Varlığı
  const hasKeywordInTitle = normTitle.includes(normKeyword);
  if (!hasKeywordInTitle) {
    score -= 20;
    recommendations.push(`Başlıkta anahtar kelime (${targetKeyword}) bulunmuyor.`);
  } else if (normTitle.indexOf(normKeyword) < 25) {
    // Anahtar kelime başa yakınsa bonus
    score += 5;
  }

  const hasKeywordInDesc = normDesc.includes(normKeyword);
  if (!hasKeywordInDesc) {
    score -= 15;
    recommendations.push(`Açıklamada anahtar kelime (${targetKeyword}) yer almıyor.`);
  }

  // Yerel Sinyal (İstanbul veya İlçe adı)
  const hasLocation =
    normTitle.includes('istanbul') ||
    normDesc.includes('istanbul') ||
    DISTRICTS.some((d) => normTitle.includes(normalizeText(d.name)) || normDesc.includes(normalizeText(d.name)));

  if (!hasLocation) {
    score -= 10;
    recommendations.push('Yerel SEO sinyali eksik (İstanbul veya ilçe adı ekleyerek yerel aramaları hedefleyin).');
  }

  // CTR Tetikleyicileri
  for (const trigger of CTR_TRIGGER_WORDS) {
    const normTrigger = normalizeText(trigger);
    if (normTitle.includes(normTrigger) || normDesc.includes(normTrigger)) {
      if (!detectedTriggers.includes(trigger)) {
        detectedTriggers.push(trigger);
      }
    }
  }

  const hasCtrTriggers = detectedTriggers.length >= 2;
  if (!hasCtrTriggers) {
    score -= 10;
    recommendations.push('Kullanıcıyı tıklamaya teşvik eden eylem kelimeleri (örn: Şeffaf, 7/24, Ücretsiz Keşif) ekleyin.');
  }

  const finalScore = Math.min(100, Math.max(0, score));

  return {
    score: finalScore,
    isOptimal: finalScore >= 80,
    titleLength,
    descriptionLength,
    hasPrimaryKeywordInTitle: hasKeywordInTitle,
    hasPrimaryKeywordInDescription: hasKeywordInDesc,
    hasCtrTriggers,
    hasLocationSignal: hasLocation,
    detectedCtrTriggers: detectedTriggers,
    recommendations,
  };
}

/**
 * Türkçe Ateşman Okunabilirlik İndeksi Hesaplayıcısı.
 */

export function analyzeHeadingStructure(content: string): HeadingStructureReport {
  const issues: string[] = [];
  const headings: { level: 1 | 2 | 3; text: string; hasKeyword: boolean }[] = [];

  const lines = content.split('\n');
  const targetKeywords = ['tesis', 'yönetim', 'güvenlik', 'aidat', 'bakım', 'kmk', 'temizlik', 'istanbul'];

  for (const line of lines) {
    const trimmed = line.trim();
    let level: 1 | 2 | 3 | null = null;
    let text = '';

    if (trimmed.startsWith('### ')) {
      level = 3;
      text = trimmed.substring(4).trim();
    } else if (trimmed.startsWith('## ')) {
      level = 2;
      text = trimmed.substring(3).trim();
    } else if (trimmed.startsWith('# ')) {
      level = 1;
      text = trimmed.substring(2).trim();
    } else {
      const match = trimmed.match(/<h([1-3])>(.*?)<\/h\1>/i);
      if (match) {
        level = parseInt(match[1], 10) as 1 | 2 | 3;
        text = match[2].replace(/<[^>]*>?/gm, '').trim();
      }
    }

    if (level && text) {
      const norm = normalizeText(text);
      const hasKeyword = targetKeywords.some((k) => norm.includes(k));
      headings.push({ level, text, hasKeyword });
    }
  }

  const h1Count = headings.filter((h) => h.level === 1).length;
  const h2Count = headings.filter((h) => h.level === 2).length;
  const h3Count = headings.filter((h) => h.level === 3).length;

  if (h1Count === 0) issues.push('İçerikte ana H1 başlığı bulunamadı.');
  else if (h1Count > 1) issues.push(`İçerikte birden fazla (${h1Count} adet) H1 başlığı var. Sayfa başına yalnız 1 H1 olmalıdır.`);

  if (h2Count === 0) issues.push('İçerik alt konulara bölünmemiş (en az 2 adet H2 başlığı önerilir).');

  const h2WithKeywords = headings.filter((h) => h.level === 2 && h.hasKeyword).length;
  if (h2Count > 0 && h2WithKeywords === 0) {
    issues.push('H2 alt başlıklarında hedef sektörel anahtar kelimeler (Tesis, Güvenlik, Bakım vb.) geçmiyor.');
  }

  return {
    isValid: issues.length === 0,
    h1Count,
    h2Count,
    h3Count,
    headings,
    issues,
  };
}

/**
 * AI Arama Motorları (Gemini, ChatGPT, Perplexity) İçin Somut KPI ve Olguları Çıkarır.
 */
