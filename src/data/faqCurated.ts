/**
 * Özenle yazılmış SSS (46 madde, 4 dilde). Önceki ilçe×konu permütasyonu şablon soruların yerine geçer.
 * Biçim, eski veritabanı kaydıyla uyumludur (FaqClient ve /api/faqs bunu doğrudan kullanır).
 */
import { FAQ_PART_A, type FaqRow } from './faq/partA';
import { FAQ_PART_B } from './faq/partB';
import { FAQ_PART_C } from './faq/partC';

export interface CuratedFaq {
  id: string;
  category: string;
  order: number;
  question: string;
  answer: string;
  question_en: string;
  answer_en: string;
  question_ru: string;
  answer_ru: string;
  question_ar: string;
  answer_ar: string;
}

const ROWS: FaqRow[] = [...FAQ_PART_A, ...FAQ_PART_B, ...FAQ_PART_C];

export const CURATED_FAQS: CuratedFaq[] = ROWS.map(([category, q, a, qEn, aEn, qRu, aRu, qAr, aAr], i) => ({
  id: `faq-${String(i + 1).padStart(2, '0')}`,
  category,
  order: i + 1,
  question: q,
  answer: a,
  question_en: qEn,
  answer_en: aEn,
  question_ru: qRu,
  answer_ru: aRu,
  question_ar: qAr,
  answer_ar: aAr,
}));

export const CURATED_FAQ_CATEGORIES = Array.from(new Set(CURATED_FAQS.map((f) => f.category)));
