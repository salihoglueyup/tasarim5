// Kullanım: node scripts/i18n-add-keys.mjs <spec.json>
// spec: { "after": "mevcut_anahtar", "keys": { "yeni_anahtar": { "tr": "...", "en": "...", "ru": "...", "ar": "..." } } }
// Dört dilin common.json dosyasına, "after" anahtarının hemen altına satır olarak ekler (biçimi korur),
// ardından JSON'u doğrular. Aynı anahtar zaten varsa değerini günceller.
import fs from 'fs';
import path from 'path';

const specPath = process.argv[2];
if (!specPath) { console.error('spec dosyası gerekli'); process.exit(1); }
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const LANGS = ['tr', 'en', 'ru', 'ar'];
const ROOT = path.resolve('src/i18n/locales');
const q = (v) => JSON.stringify(v);

for (const lang of LANGS) {
  const file = path.join(ROOT, lang, 'common.json');
  let lines = fs.readFileSync(file, 'utf8').split('\n');
  const eol = lines.some((l) => l.endsWith('\r')) ? '\r' : '';
  lines = lines.map((l) => l.replace(/\r$/, ''));
  const data = JSON.parse(lines.join('\n'));

  let anchor = lines.findIndex((l) => l.trimStart().startsWith(`${q(spec.after)}:`));
  if (anchor === -1) { console.error(`${lang}: anchor bulunamadı: ${spec.after}`); process.exit(1); }

  let added = 0, updated = 0;
  for (const [key, vals] of Object.entries(spec.keys)) {
    if (vals[lang] === undefined) { console.error(`${lang}: ${key} için değer yok`); process.exit(1); }
    const existing = lines.findIndex((l) => l.trimStart().startsWith(`${q(key)}:`));
    const line = `  ${q(key)}: ${q(vals[lang])},`;
    if (existing !== -1) { lines[existing] = line; updated++; }
    else { lines.splice(anchor + 1, 0, line); anchor++; added++; }
  }
  const out = lines.join(eol ? '\r\n' : '\n');
  JSON.parse(out); // geçerlilik
  fs.writeFileSync(file, out, 'utf8');
  console.log(`${lang}: +${added} eklendi, ${updated} güncellendi (toplam ${Object.keys(JSON.parse(out)).length} anahtar)`);
}
