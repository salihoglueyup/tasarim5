import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(__dirname, '../../public/images/logos/new-icon-Photoroom.webp');
const outputPath = path.resolve(__dirname, '../../public/images/hero-poster-v4.webp');

async function createCinematicPoster() {
  console.log('🎬 Sinematik Logo Posteri oluşturuluyor...');
  
  if (!fs.existsSync(logoPath)) {
    console.error(`HATA: Logo bulunamadı: ${logoPath}`);
    process.exit(1);
  }

  // 1. Logoyu yeniden boyutlandır
  const resizedLogo = sharp(logoPath).resize({ width: 280, fit: 'inside' });
  const logoMeta = await resizedLogo.metadata();
  
  // 2. Logoyu tamamen beyaz yapmak için: alpha kanalını çıkarıp beyaz zeminle birleştiriyoruz
  const alphaBuffer = await resizedLogo.extractChannel('alpha').toBuffer();
  
  const whiteLogoBuffer = await sharp({
    create: { width: logoMeta.width, height: logoMeta.height, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
    .joinChannel(alphaBuffer)
    .png()
    .toBuffer();

  // 3. Parlama (Glow) efekti için beyaz logonun bulanıklaştırılmış (blur) kopyası
  const glowBuffer = await sharp(whiteLogoBuffer)
    .blur(15)
    .toBuffer();

  // 4. Hepsini Koyu Arka Plan (Slate-950) üzerinde birleştir
  await sharp({
    create: {
      width: 1920,
      height: 1080,
      channels: 4,
      background: { r: 2, g: 6, b: 23, alpha: 1 } // Tailwind Slate-950
    }
  })
    .composite([
      // Önce arkaya parlamayı ekle
      { input: glowBuffer, gravity: 'center' },
      // Üzerine net beyaz logoyu ekle
      { input: whiteLogoBuffer, gravity: 'center' }
    ])
    .webp({ quality: 80, effort: 6 })
    .toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  console.log(`✅ İşlem tamamlandı! Yeni poster: ${(newSize / 1024).toFixed(2)} KB`);
}

createCinematicPoster().catch(err => {
  console.error('Hata:', err);
});
