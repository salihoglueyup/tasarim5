import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { PAGE_META } from './pageMeta';

const LANGS = ['tr', 'en', 'ru', 'ar'] as const;
const load = (l: string) => JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/i18n/locales', l, 'common.json'), 'utf8')) as Record<string, string>;

/** Dil bağımsız sayısal iddialar: tahsilat/puan/portföy sayıları, uydurma süre ve tasarruf yüzdeleri. */
const BANNED_ALL: RegExp[] = [
  /7\/24/, /\b24\/7\b/, /ISO 41001/,
  /%\s?9[0-9]\b/, /\b9[0-9](?:[.,]\d)?\s?%/, /\b4[.,]9\s?(?:\/|★)/, /(?:120|150|200|340|400|500)\+/, /15\s?-\s?25\s?(?:dk|min|мин)/i,
  /\b45\s?(?:dk|dakika|min|minutes|мин|минут|-minute)\b/i, /%\s?(?:2[5-9]|3[0-5])\s?-\s?%?\s?(?:2[5-9]|3[0-9])/,
  /\b48\s?(?:saat|hours|часа|ساعة)/i,
];
/** Türkçe'ye özgü: tasarruf yüzdesi, 48 saat vaadi, portföy abartıları. */
const BANNED_TR: RegExp[] = [/%\s?\d+[^.\n]{0,40}tasarruf/i, /tasarruf[^.\n]{0,40}%\s?\d+/i, /48\s?saat/i, /yüzlerce (?:proje|site)/i, /kanıtlanmış/i];

describe('çeviri sözlüğü doğrulanamayan iddia içermez', () => {
  for (const lang of LANGS) {
    it(`${lang}: sayısal iddia yok`, () => {
      const bad: string[] = [];
      for (const [k, v] of Object.entries(load(lang))) {
        if (typeof v !== 'string') continue;
        for (const re of BANNED_ALL) if (re.test(v)) bad.push(`${k}: ${re}`);
        if (lang === 'tr') for (const re of BANNED_TR) if (re.test(v)) bad.push(`${k}: ${re}`);
      }
      expect(bad, bad.join('\n')).toEqual([]);
    });
  }

  it('PAGE_META (en/ru/ar) doğrulanamayan iddia veya yarım kalan başlık içermez', () => {
    const bad: string[] = [];
    for (const [route, locales] of Object.entries(PAGE_META)) {
      for (const [lang, meta] of Object.entries(locales)) {
        const combined = `${meta.title} — ${meta.description}`;
        for (const re of BANNED_ALL) {
          if (re.test(combined)) bad.push(`${route} [${lang}]: ${re}`);
        }
        if (/(?:\s&\s*|\sи\s*)$/u.test(meta.title)) {
          bad.push(`${route} [${lang}] dangling conjunction in title: "${meta.title}"`);
        }
      }
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });
});

