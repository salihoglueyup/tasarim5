// Kullanım: node scripts/reference-logos.mjs
// public/images/referanslar/<slug>.(svg|png|webp|jpg|jpeg) dosyalarını tarar ve src/data/referenceLogos.json üretir.
// slug değerleri src/data/realReferences.ts içindeki referans slug'larıdır.
import fs from 'fs';
import path from 'path';

const dir = 'public/images/referanslar';
const exts = ['.svg', '.png', '.webp', '.jpg', '.jpeg'];
fs.mkdirSync(dir, { recursive: true });
const out = {};
for (const f of fs.readdirSync(dir)) {
  const ext = path.extname(f).toLowerCase();
  if (!exts.includes(ext)) continue;
  const slug = path.basename(f, path.extname(f));
  // aynı slug için birden çok dosya varsa tercih sırası: svg > webp > png > jpg
  if (!out[slug] || exts.indexOf(ext) < exts.indexOf(path.extname(out[slug]))) out[slug] = `/images/referanslar/${f}`;
}
fs.writeFileSync('src/data/referenceLogos.json', JSON.stringify(out, null, 2) + '\n');
console.log(`${Object.keys(out).length} logo bulundu`);
