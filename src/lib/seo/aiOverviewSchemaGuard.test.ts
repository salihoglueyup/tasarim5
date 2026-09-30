import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Guard: src/components/seo/ai-overviews/ altındaki her bileşen en az bir
 * schema.org JSON-LD node'u yayınlamalı (Google AI Overviews / LLM
 * alıntılanabilirliği bu yapılandırılmış veriye bağlı). Bir refactor
 * sırasında JsonLd çağrısı sessizce silinirse burada yakalanır.
 */

const AI_OVERVIEWS_DIR = path.join(process.cwd(), 'src/components/seo/ai-overviews');

// Google/LLM'lerin Q&A içerik için tanıdığı, gerçek zengin-sonuç ürettiren tipler.
// Salt "WebPage" veya "SpeakableSpecification" bunların yerini tutmaz.
const QA_RECOGNIZED_TYPES = ['FAQPage', 'QAPage', 'ClaimReview', 'HowTo', 'Question'];

// Dosya içeriği bu desenlerden birini taşıyorsa "Q&A şeklinde içerik" sayılır
// (soru/cevap, mit/gerçek veya iddia/doğrulama çiftleri render ediyor demektir).
const QA_CONTENT_HINTS = [/\bquestion\b/i, /\bacceptedAnswer\b/i, /\bmyth\b/i, /\bclaim\b/i, /groundTruthAnswer/];

function listComponentFiles(): string[] {
  return fs
    .readdirSync(AI_OVERVIEWS_DIR, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.tsx$/.test(e.name))
    .map((e) => path.join(AI_OVERVIEWS_DIR, e.name));
}

describe('AI Overview bileşenleri: schema.org JSON-LD güvencesi', () => {
  const files = listComponentFiles();

  it('ai-overviews dizininde en az bir bileşen dosyası bulunur (dizin taşınmış/boşalmış olabilir)', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it('her bileşen en az bir @type schema node\'u yayınlar', () => {
    const offenders: string[] = [];
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      if (!/'@type'/.test(content)) {
        offenders.push(path.relative(process.cwd(), f));
      }
    }
    expect(offenders).toEqual([]);
  });

  it('soru-cevap şeklinde içerik render eden bileşenler FAQPage/QAPage/ClaimReview/HowTo kullanır (yalnız WebPage/Speakable yetmez)', () => {
    const offenders: string[] = [];
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      const looksLikeQa = QA_CONTENT_HINTS.some((re) => re.test(content));
      if (!looksLikeQa) continue;

      const hasRecognizedType = QA_RECOGNIZED_TYPES.some((t) => content.includes(`'${t}'`) || content.includes(`"${t}"`));
      if (!hasRecognizedType) {
        offenders.push(path.relative(process.cwd(), f));
      }
    }
    expect(offenders).toEqual([]);
  });
});
