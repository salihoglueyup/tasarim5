import type { ReadabilityReport } from './types';

export function calculateTurkishReadabilityScore(content: string): ReadabilityReport {
  const plainText = content.replace(/<[^>]*>?/gm, '').trim();
  if (!plainText) {
    return {
      score: 100,
      level: 'Çok Kolay',
      totalWords: 0,
      totalSentences: 0,
      totalSyllables: 0,
      averageWordLengthSyllables: 0,
      averageSentenceLengthWords: 0,
      feedback: 'İçerik boş.',
    };
  }

  // Cümle tespiti
  const sentences = plainText.split(/[.!?…]+/).filter((s) => s.trim().length > 0);
  const totalSentences = Math.max(1, sentences.length);

  // Kelime tespiti
  const words = plainText.match(/[a-z0-9ğüşıöçâîû]+/gi) || [];
  const totalWords = Math.max(1, words.length);

  // Hece tespiti (Türkçe sesli harfler)
  const vowels = /[aeıioöuüâîû]/gi;
  const vowelMatches = plainText.match(vowels) || [];
  const totalSyllables = Math.max(totalWords, vowelMatches.length);

  const avgWordLength = Number((totalSyllables / totalWords).toFixed(2));
  const avgSentenceLength = Number((totalWords / totalSentences).toFixed(2));

  // Ateşman Formülü
  const rawScore = 206.835 - 40.12 * avgWordLength - 1.015 * avgSentenceLength;
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  let level: 'Çok Kolay' | 'Kolay' | 'Orta' | 'Zor' | 'Çok Zor' = 'Orta';
  let feedback = 'Metin dengeli ve anlaşılır bir kurumsal tesis yönetimi diline sahip.';

  if (score >= 90) {
    level = 'Çok Kolay';
    feedback = 'Metin son derece akıcı ve herkesin rahatlıkla anlayabileceği sadelikte.';
  } else if (score >= 70) {
    level = 'Kolay';
    feedback = 'Metin akıcı ve kolay okunabilir.';
  } else if (score >= 50) {
    level = 'Orta';
    feedback = 'Metin profesyonel tesis ve site yöneticileri için ideal teknik derinlikte.';
  } else if (score >= 30) {
    level = 'Zor';
    feedback = 'Cümleler biraz uzun veya teknik terim yoğunluğu yüksek; ara başlıklarla bölmeniz önerilir.';
  } else {
    level = 'Çok Zor';
    feedback = 'Metin oldukça akademik/ağır; cümleleri kısaltarak okunabilirliği artırın.';
  }

  return {
    score,
    level,
    totalWords,
    totalSentences,
    totalSyllables,
    averageWordLengthSyllables: avgWordLength,
    averageSentenceLengthWords: avgSentenceLength,
    feedback,
  };
}

/**
 * Başlık Hiyerarşisi ve Semantik Yapı Denetleyicisi.
 */
