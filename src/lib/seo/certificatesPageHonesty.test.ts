import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { CERTIFICATES } from '@/data/certificates';

const root = process.cwd();
const read = (p: string) => fs.readFileSync(path.join(root, p), 'utf8');

describe('Kalite belgelerimiz sayfası: sahte doğrulama ve uydurma fayda yok', () => {
  it('sayfada sahte "canlı sorgula" simülasyonu bulunmaz', () => {
    const client = read('src/app/[lang]/kurumsal/kalite-belgelerimiz/CertificatesClient.tsx');
    expect(client).not.toContain('handleAuditVerify');
    expect(client).not.toContain('AKTİF ve GEÇERLİDİR');
    expect(client).not.toContain('setTimeout');
    expect(client).toContain('https://www.belcert.com');
  });

  it('belge verilerinde uydurma yüzdeli faydalar ve garanti dili yoktur', () => {
    for (const c of CERTIFICATES) {
      expect(c.faydalar, c.slug).toEqual([]);
      expect(`${c.description} ${c.longDescription}`, c.slug).not.toMatch(/%\d|garanti|kesintisiz/i);
    }
  });

  it('tüm belgeler için dört dilde kısa açıklama anahtarı vardır', () => {
    for (const lang of ['tr', 'en', 'ru', 'ar']) {
      const dict = JSON.parse(read(`src/i18n/locales/${lang}/common.json`)) as Record<string, string>;
      for (const c of CERTIFICATES) expect(dict[`crt_desc_${c.slug}`]?.length, `${lang} ${c.slug}`).toBeGreaterThan(20);
    }
  });
});
