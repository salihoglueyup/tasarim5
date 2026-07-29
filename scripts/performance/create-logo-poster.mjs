import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(__dirname, '../../public/images/logos/new-icon-Photoroom.webp');
const outputPath = path.resolve(__dirname, '../../public/images/hero-poster-v3.webp');

async function createPoster() {
  console.log('🖼️ Logo posteri oluşturuluyor...');
  
  if (!fs.existsSync(logoPath)) {
    console.error(`HATA: Logo bulunamadı: ${logoPath}`);
    process.exit(1);
  }

  // 1. Logoyu yeniden boyutlandır (yaklaşık 200x200 veya benzeri, saydamlığı koruyarak)
  const logoBuffer = await sharp(logoPath)
    .resize({ width: 300, fit: 'inside' })
    .toBuffer();

  // 2. Koyu renk bir arka plan (Slate-950: rgb(2, 6, 23)) oluştur ve logoyu tam ortaya yerleştir
  await sharp({
    create: {
      width: 1920,
      height: 1080,
      channels: 4,
      background: { r: 2, g: 6, b: 23, alpha: 1 }
    }
  })
    .composite([{ input: logoBuffer, gravity: 'center' }])
    .webp({ quality: 80, effort: 6 })
    .toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  console.log(`✅ İşlem tamamlandı! Yeni poster: ${(newSize / 1024).toFixed(2)} KB`);
}

createPoster().catch(err => {
  console.error('Hata:', err);
});
