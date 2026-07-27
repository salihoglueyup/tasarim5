/* eslint-disable */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sharp modülünü dinamik yükle, yoksa kur
let sharp;
try {
  const sharpModule = await import('sharp');
  sharp = sharpModule.default || sharpModule;
} catch {
  console.log("sharp modülü bulunamadı, yükleniyor...");
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
  const sharpModule = await import('sharp');
  sharp = sharpModule.default || sharpModule;
}

const imagesDir = path.join(__dirname, '..', 'public', 'images');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (/\.(png|jpe?g|webp)$/i.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function optimizeAllImages() {
  console.log("⚡ [Optimizasyon Şovu] Public klasöründeki görseller taranıyor...");
  const allFiles = getAllFiles(imagesDir);
  let totalSavedBytes = 0;

  for (const filePath of allFiles) {
    const stats = fs.statSync(filePath);
    const origSizeKB = (stats.size / 1024).toFixed(2);
    const ext = path.extname(filePath).toLowerCase();

    // Sadece büyük veya henüz optimize edilmemiş dosyaları sıkıştır (örn > 100 KB veya PNG/JPG)
    if (stats.size > 100 * 1024 || ext !== '.webp') {
      const tempPath = filePath + '.tmp';
      try {
        console.log(`⏳ İşleniyor: ${path.relative(imagesDir, filePath)} (${origSizeKB} KB)`);
        
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Eğer genişlik 1920'den büyükse 1920'ye küçült (Hero ve arkaplanlar için maksimum ihtiyaç)
        let pipeline = image;
        if (metadata.width && metadata.width > 1920) {
          pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
        }

        // WebP formatında optimize et (kalite %78, çaba seviyesi 6)
        await pipeline.webp({ quality: 78, effort: 6 }).toFile(tempPath);

        const newStats = fs.statSync(tempPath);
        const newSizeKB = (newStats.size / 1024).toFixed(2);

        // Eğer yeni dosya daha küçükse orijinali ile değiştir, yoksa sil
        if (newStats.size < stats.size || ext !== '.webp') {
          const finalPath = ext !== '.webp' ? filePath.replace(/\.(png|jpe?g)$/i, '.webp') : filePath;
          fs.renameSync(tempPath, finalPath);
          if (ext !== '.webp' && finalPath !== filePath) {
            fs.unlinkSync(filePath); // Eski png/jpg dosyasını sil
          }
          const savedKB = (stats.size - newStats.size) / 1024;
          if (savedKB > 0) totalSavedBytes += stats.size - newStats.size;
          console.log(`✅ Başarılı: ${path.relative(imagesDir, finalPath)} -> ${newSizeKB} KB (Tasarruf: %${((1 - newStats.size/stats.size)*100).toFixed(0)})`);
        } else {
          fs.unlinkSync(tempPath);
          console.log(`ℹ️ Zaten optimal boyutta: ${path.relative(imagesDir, filePath)}`);
        }
      } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        console.error(`❌ Hata (${filePath}):`, err.message);
      }
    }
  }

  console.log(`\n🎉 Optimizasyon Tamamlandı! Toplam Tasarruf: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB!`);
}

optimizeAllImages();
