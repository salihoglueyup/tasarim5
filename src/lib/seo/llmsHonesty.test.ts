import { describe, it, expect } from 'vitest';
import { buildLlmsText, buildLlmsFullText } from './llmsContent';
import { FACTS, RESPONSE_TARGET_TEXT } from '@/lib/facts';

describe('llms.txt / llms-full.txt yalnızca doğrulanmış bilgi içerir', () => {
  const files = { 'llms.txt': buildLlmsText(), 'llms-full.txt': buildLlmsFullText() };

  it('doğrulanmış temel bilgiler yer alır', () => {
    for (const [name, text] of Object.entries(files)) {
      expect(text, name).toContain(`${FACTS.foundingYear}'dan beri`);
      expect(text, name).toContain(`${FACTS.districtCount} ilçe`);
      expect(text, name).toContain(`${FACTS.referenceCount} kurum`);
      expect(text, name).toContain(RESPONSE_TARGET_TEXT.tr);
      expect(text, name).toContain('7579');
    }
  });

  it('doğrulanamayan iddialar, vaka ve mahkeme kararı numaraları yok', () => {
    const banned: RegExp[] = [
      /%\s?9[0-9]/, /%\s?30\b/, /%\s?3[2-5]/, /\b4[.,]9\s?\/\s?5/, /\b340\+/, /\b120\+/, /\b400\+/, /\b150\+/, /\b200\+/, /garanti/i, /kanıtlanmış/i,
      /sıfır (?:risk|ceza|tazminat)/i, /\bE\.\s*\/\s*\d{4}|\d{4}\/\d+\s*E\./, /Yargıtay \d+\./, /Ataşehir 840|Kadıköy 420/, /Doğrulanmış Google Yorumu/, /kurumsal lider/i,
    ];
    for (const [name, text] of Object.entries(files)) for (const re of banned) expect(text, `${name} ${re}`).not.toMatch(re);
  });
});
