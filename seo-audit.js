const fs = require('fs');
const path = require('path');

console.log("🔍 Alo Yönetim - Otomatik SEO Audit Başlıyor...\n");

const PUBLIC_DIR = path.join(__dirname, 'public');
const APP_DIR = path.join(__dirname, 'src', 'app', '[lang]');

let score = 100;
const deductions = [];

function checkFileExists(filePath, name, pointPenalty) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${name} bulundu.`);
  } else {
    console.log(`❌ ${name} bulunamadı!`);
    score -= pointPenalty;
    deductions.push(name + " eksik");
  }
}

// 1. Robots.txt Kontrolü
checkFileExists(path.join(PUBLIC_DIR, 'robots.txt'), 'robots.txt', 10);

// 2. Sitemap Kontrolü (Bizde route olarak var src/app/sitemap.ts)
const sitemapTsPath = path.join(__dirname, 'src', 'app', 'sitemap.ts');
checkFileExists(sitemapTsPath, 'sitemap.ts', 15);

// 3. Layout.tsx Metadata Kontrolü
const layoutPath = path.join(APP_DIR, 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, 'utf8');
  if (content.includes('metadataBase')) {
    console.log("✅ metadataBase yapılandırması bulundu.");
  } else {
    console.log("❌ metadataBase eksik!");
    score -= 10;
  }
  
  if (content.includes('verification:')) {
    console.log("✅ GSC Verification kodu bulundu.");
  } else {
    console.log("❌ GSC Verification eksik!");
    score -= 5;
  }
}

console.log("\n----------------------------------");
console.log(`📊 Toplam SEO Sağlık Skoru: ${score} / 100`);
if (deductions.length > 0) {
  console.log("⚠️ Eksikler:", deductions.join(', '));
} else {
  console.log("🌟 Mükemmel! Temel SEO dosyaları tam.");
}
console.log("----------------------------------\n");
