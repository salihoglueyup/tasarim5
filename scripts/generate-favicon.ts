import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const SOURCE = path.join(__dirname, '..', 'public', 'images', 'logos', 'new-icon.webp');
const OUT_DIR = path.join(__dirname, '..', 'public');
const FAVICON_DIR = path.join(__dirname, '..', 'public', 'favicon');

async function main() {
  // 1. favicon.png — 32x32 (tarayıcı sekmesi)
  await sharp(SOURCE).resize(32, 32).png().toFile(path.join(OUT_DIR, 'favicon-32.png'));
  console.log('✓ favicon-32.png');

  // 2. favicon-192.png — Google favicon + PWA
  await sharp(SOURCE).resize(192, 192).png().toFile(path.join(OUT_DIR, 'favicon', 'favicon-192.png'));
  console.log('✓ favicon-192.png');

  // 3. favicon-512.png — PWA splash
  await sharp(SOURCE).resize(512, 512).png().toFile(path.join(OUT_DIR, 'favicon', 'favicon-512.png'));
  console.log('✓ favicon-512.png');

  // 4. apple-touch-icon.png — iOS Safari
  await sharp(SOURCE).resize(180, 180).png().toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // 5. favicon.ico — Next.js app/ convention (app/favicon.ico)
  // Sharp ICO formatını desteklemez ama 32x32 PNG'yi app dizinine kopyalayıp
  // Next.js'in favicon.ico convention'ı ile sunabiliriz.
  // Alternatif: 32x32 PNG'yi direkt ICO olarak yeniden adlandırıyoruz (modern tarayıcılar PNG-in-ICO'yu kabul eder).
  const png32Buffer = await sharp(SOURCE).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'favicon.ico'), png32Buffer);
  console.log('✓ src/app/favicon.ico (32x32 PNG)');

  console.log('\n🎉 Tüm favicon dosyaları oluşturuldu!');
}

main().catch(e => { console.error(e); process.exit(1); });
