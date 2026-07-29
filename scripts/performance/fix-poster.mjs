import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(__dirname, '../../public/images/logos/new-icon-Photoroom.webp');
const outputPath = path.resolve(__dirname, '../../public/images/hero-poster-v5.webp');

async function fixCinematicPoster() {
  console.log('🎬 Sinematik Logo Posteri onarılıyor (linear yöntemi)...');
  
  if (!fs.existsSync(logoPath)) {
    console.error(`HATA: Logo bulunamadı: ${logoPath}`);
    process.exit(1);
  }

  // 1. Logoyu yeniden boyutlandır ve Buffer olarak al
  const resizedBuffer = await sharp(logoPath)
    .resize({ width: 320, fit: 'inside' })
    .toBuffer();
    
  // 2. Linear kullanarak RGB kanallarını tamamen beyaza çevir, Alpha'ya dokunma
  // Çıktı = Girdi * a + b
  const whiteLogoBuffer = await sharp(resizedBuffer)
    .linear(
      [0, 0, 0, 1], // R, G, B'yi sıfırla, Alpha'yı 1 ile çarp (koru)
      [255, 255, 255, 0] // R, G, B'ye 255 ekle, Alpha'ya 0 ekle
    )
    .png()
    .toBuffer();

  // 3. Parlama (Glow) efekti için beyaz logonun bulanıklaştırılmış (blur) kopyası
  const glowBuffer = await sharp(whiteLogoBuffer)
    .blur(18)
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
  console.log(`✅ İşlem tamamlandı! Yeni poster (v5): ${(newSize / 1024).toFixed(2)} KB`);
}

fixCinematicPoster().catch(err => {
  console.error('Hata:', err);
});
