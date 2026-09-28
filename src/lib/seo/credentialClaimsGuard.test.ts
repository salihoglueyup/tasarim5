import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Sitede yalnızca public/certificates altında PDF'i bulunan belgeler (src/data/certificates.ts)
// iddia edilebilir. Belgelerimiz BELCERT tarafından ILAS akreditasyonuyla verilmiştir — TÜRKAK değil.
// ISO 9001 / 27001 / 41001 ve TSE Hizmet Yeterlilik belgelerine sahip değiliz; bu standartlar
// yalnızca bilgilendirici bağlamda (ör. "ISO 41001 nedir") anılabilir.

const SRC = path.join(process.cwd(), 'src');

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'generated' ? [] : walk(p);
    return /\.(ts|tsx|json)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name) ? [p] : [];
  });
}

const UNHELD = String.raw`ISO(?:\/IEC)?\s?(?:9001|27001|27701|41001|50001)`;

const RULES: { id: string; re: RegExp; allow?: RegExp }[] = [
  {
    // Şirket kimliği tek kaynaktan gelir: CANONICAL_NAP (napGuardEngine.ts). Eski/çelişen değerler yasak.
    id: 'nap-conflict',
    re: /0054089761200001|918234-0|Sahrayıcedit|0540897612|0680458921|34-ÖG-2016\/482|532 ?234 ?56 ?78|5322345678/,
  },
  {
    id: 'tse-hyb',
    re: /TSE HYB|HYB 128\d\d|Hizmet (Yeri )?Yeterlilik Belge/i,
    // Asansör bakım firmalarının Sanayi Bakanlığı Satış Sonrası HYB zorunluluğu üçüncü taraf gerekliliğidir.
    allow: /Satış Sonrası|asansör (bakım |servis)[^.]{0,30}(firma|servis)|HYB[^.]{0,20}asansör (servis|bakım firma)|asansör bakım firmasından/i,
  },
  {
    id: 'turkak',
    re: /T[ÜU]RKAK/i,
    // Asansör muayenesi, su/havuz analizi gibi üçüncü taraf kuruluş/laboratuvar akreditasyonu meşrudur.
    allow: /A Tipi Muayene|muayene kuruluş|laboratuvar|analiz|yeşil etiket|MMO\/TÜRKAK/i,
  },
  {
    id: 'unheld-cert-claim',
    re: new RegExp(
      [
        String.raw`${UNHELD}[^'"\x60\n]{0,50}(Sertifikas|Sertifikal|Belgesi|Belgeli|Certified|Certificate\b|Akredit|Accredit|Onaylı)`,
        String.raw`(Belgeli|Sertifikalı|belgelerimiz|sertifikalarımız|akreditasyonlu|Certified)[^'"\x60\n]{0,40}${UNHELD}`,
        String.raw`(recognizedBy|hasCredential|award|credentialCategory|certification|accreditationBody|certBody|certifyingAuthority|authorityBody)[^\n]{0,80}${UNHELD}`,
      ].join('|'),
      'i',
    ),
  },
];

describe('Doğrulanamayan belge iddiaları koruması', () => {
  it('kaynak kodda sahip olmadığımız belge / yanlış akreditasyon iddiası bulunmamalı', () => {
    const violations: string[] = [];
    for (const file of walk(SRC)) {
      const lines = fs.readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        // Bilgilendirici (sahiplik iddiası olmayan) satırlar gerekçesiyle işaretlenebilir
        if (/claims-guard-ignore:\s*\S/.test(line) || /claims-guard-ignore:\s*\S/.test(lines[i - 1] ?? '')) return;
        // Türkçe İ/ı (ör. "AKREDİTE") JS'in /i bayrağıyla eşleşmez; ASCII'ye katlanmış halini de dene
        const variants = [line, line.replace(/İ/g, 'I').replace(/ı/g, 'i')];
        for (const r of RULES) {
          if (variants.some((v) => r.re.test(v)) && !(r.allow && variants.some((v) => r.allow!.test(v)))) {
            violations.push(`[${r.id}] ${path.relative(process.cwd(), file)}:${i + 1}: ${line.trim().slice(0, 140)}`);
          }
        }
      });
    }
    expect(violations, `\n${violations.length} ihlal:\n${violations.join('\n')}`).toEqual([]);
  });
});
