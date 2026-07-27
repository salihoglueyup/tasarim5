const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// sharp modülünü bulmaya çalış, yoksa kur
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log("sharp modülü bulunamadı, yükleniyor...");
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
  sharp = require('sharp');
}

const logosDir = path.join(__dirname, 'public', 'images', 'logos');

const optimizeImages = async () => {
  const files = fs.readdirSync(logosDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
  
  for (const file of files) {
    const inputPath = path.join(logosDir, file);
    const outputPath = path.join(logosDir, file.replace(/\.(png|jpg)$/, '.webp'));
    
    console.log(`Dönüştürülüyor: ${file}...`);
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Başarılı: ${outputPath}`);
    } catch (err) {
      console.error(`Hata (${file}):`, err);
    }
  }
};

optimizeImages();
