/**
 * v9 Hyper-Speed: LCP Görsel ve Medya Varlıkları Denetim Betiği
 * Bu betik, projenin public klasöründeki kritik LCP öğelerini (hero posteri, videolar, ana görseller)
 * denetleyerek boyut bütçelerini (PERFORMANCE.md) aşan kaynakları raporlar.
 *
 * Çalıştırma: node scripts/performance/check-lcp-assets.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../../public');
const BUDGETS_KB = {
  'hero-poster-v5.webp': 150, // LCP Görseli max 150 KB
  'brand-film.mp4': 3000,  // Ana Sayfa Video max 3 MB (3000 KB)
  'logo.svg': 50,          // Marka Logosu max 50 KB
  'favicon.ico': 50,
};

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

console.log(`${COLORS.bold}${COLORS.cyan}=====================================================${COLORS.reset}`);
console.log(`${COLORS.bold}${COLORS.cyan} ⚡ v9 LCP & Medya Varlık Denetimi (Asset Audit)${COLORS.reset}`);
console.log(`${COLORS.bold}${COLORS.cyan}=====================================================${COLORS.reset}\n`);

let totalSizeKB = 0;
let hasError = false;

function checkFile(relativePath, budgetKB) {
  const fullPath = path.join(ROOT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`${COLORS.yellow}[UYARI] Dosya bulunamadı: ${relativePath}${COLORS.reset}`);
    return;
  }

  const stats = fs.statSync(fullPath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  totalSizeKB += parseFloat(sizeKB);

  let status = `${COLORS.green}[GEÇTİ]${COLORS.reset}`;
  if (budgetKB && sizeKB > budgetKB) {
    status = `${COLORS.red}[BÜTÇE AŞIMI]${COLORS.reset}`;
    hasError = true;
  }

  const budgetText = budgetKB ? ` (Bütçe: ≤ ${budgetKB} KB)` : '';
  console.log(`${status} ${COLORS.bold}${relativePath}${COLORS.reset} -> ${sizeKB} KB${budgetText}`);
}

console.log('--- Kritik LCP ve Fold-Üstü Öğeler ---');
checkFile('images/hero-poster-v5.webp', BUDGETS_KB['hero-poster-v5.webp']);
checkFile('video/brand-film.mp4', BUDGETS_KB['brand-film.mp4']);
checkFile('images/hero-mockup.webp', 200);

console.log('\n--- Marka ve İkon Varlıkları ---');
checkFile('favicon.ico', BUDGETS_KB['favicon.ico']);
checkFile('icon.svg', 50);

console.log(`\n${COLORS.bold}Denetlenen Toplam Boyut: ${totalSizeKB.toFixed(2)} KB${COLORS.reset}`);

if (hasError) {
  console.log(`\n${COLORS.red}${COLORS.bold}🚨 DİKKAT: Bazı öğeler belirlenen performans bütçesini aşıyor! Lütfen sıkıştırma uygulayın.${COLORS.reset}\n`);
  process.exit(1);
} else {
  console.log(`\n${COLORS.green}${COLORS.bold}✨ MÜKEMMEL: Tüm kritik LCP varlıkları bütçe sınırları içerisinde!${COLORS.reset}\n`);
  process.exit(0);
}
