import * as fs from 'fs';
import * as path from 'path';

const LOCALES_DIR = path.join(process.cwd(), 'src/i18n/locales');

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map((item: any) => item[0]).join('');
  } catch (e) {
    console.error(`Çeviri hatası (${targetLang}): ${text.substring(0, 40)}...`);
    return text;
  }
}

async function main() {
  const trRaw = fs.readFileSync(path.join(LOCALES_DIR, 'tr/common.json'), 'utf-8');
  const enRaw = fs.readFileSync(path.join(LOCALES_DIR, 'en/common.json'), 'utf-8');
  const ruRaw = fs.readFileSync(path.join(LOCALES_DIR, 'ru/common.json'), 'utf-8');
  const arRaw = fs.readFileSync(path.join(LOCALES_DIR, 'ar/common.json'), 'utf-8');

  const tr: Record<string, string> = JSON.parse(trRaw);
  const en: Record<string, string> = JSON.parse(enRaw);
  const ru: Record<string, string> = JSON.parse(ruRaw);
  const ar: Record<string, string> = JSON.parse(arRaw);

  const missingKeys = Object.keys(tr).filter(k => !(k in en));
  console.log(`Toplam ${missingKeys.length} eksik key bulundu. Çeviri başlıyor...\n`);

  const targets: { lang: string; dict: Record<string, string>; file: string }[] = [
    { lang: 'en', dict: en, file: path.join(LOCALES_DIR, 'en/common.json') },
    { lang: 'ru', dict: ru, file: path.join(LOCALES_DIR, 'ru/common.json') },
    { lang: 'ar', dict: ar, file: path.join(LOCALES_DIR, 'ar/common.json') },
  ];

  for (const target of targets) {
    console.log(`\n=== ${target.lang.toUpperCase()} çevirisi başlıyor ===`);
    let count = 0;

    for (const key of missingKeys) {
      const trValue = tr[key];
      if (!trValue) continue;

      await new Promise(r => setTimeout(r, 200));
      const translated = await translateText(trValue, target.lang);
      target.dict[key] = translated;
      count++;

      if (count % 10 === 0) {
        console.log(`  ${count}/${missingKeys.length} tamamlandı...`);
      }
    }

    // Anahtarları TR ile aynı sıraya göre sırala
    const sorted: Record<string, string> = {};
    for (const k of Object.keys(tr)) {
      if (k in target.dict) sorted[k] = target.dict[k];
    }

    fs.writeFileSync(target.file, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
    console.log(`✓ ${target.lang} — ${count} key eklendi, dosya güncellendi.`);
  }

  console.log('\n✅ i18n parity sync tamamlandı!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
