import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, '../../public/images/hero-poster.webp');
const outputPath = path.resolve(__dirname, '../../public/images/hero-poster-compressed.webp');

async function compressImage() {
  console.log('🖼️ Resmi sıkıştırma işlemi başlatılıyor...');
  
  if (!fs.existsSync(inputPath)) {
    console.error('HATA: hero-poster.webp bulunamadı!');
    process.exit(1);
  }

  const metadata = await sharp(inputPath).metadata();
  console.log(`Orijinal: ${metadata.width}x${metadata.height} / Boyut: ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KB`);

  // Webp compression
  await sharp(inputPath)
    .resize(1920) // Max width 1920px (Full HD) to save space
    .webp({ quality: 60, effort: 6 }) // High compression
    .toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  console.log(`Yeni Boyut: ${(newSize / 1024).toFixed(2)} KB`);

  // Replace old file with compressed one
  fs.unlinkSync(inputPath);
  fs.renameSync(outputPath, inputPath);

  console.log('✅ İşlem tamamlandı! Orijinal dosya sıkıştırıldı ve değiştirildi.');
}

compressImage().catch(err => {
  console.error('Sıkıştırma hatası:', err);
});
