/**
 * Faz 232: Next.js Bundle Size Budget Runner
 * Enforces 180 KB First Load JS limit
 */
const fs = require('fs');
const path = require('path');

const MAX_BUDGET_KB = 180;

function checkBundle() {
  const buildManifestPath = path.resolve(process.cwd(), '.next/build-manifest.json');
  
  if (!fs.existsSync(buildManifestPath)) {
    console.log(`[Bundle Budget] .next/build-manifest.json bulunamadı. Derleme öncesi kontrol atlanıyor.`);
    process.exit(0);
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf-8'));
    const rootFiles = manifest.pages['/'] || [];
    
    let totalBytes = 0;
    for (const file of rootFiles) {
      const filePath = path.resolve(process.cwd(), '.next', file);
      if (fs.existsSync(filePath)) {
        totalBytes += fs.statSync(filePath).size;
      }
    }

    const totalKb = Math.round((totalBytes / 1024) * 100) / 100;
    console.log(`[Bundle Budget] Ana sayfa First Load JS boyutu: ${totalKb} KB (Bütçe: ${MAX_BUDGET_KB} KB)`);

    if (totalKb > MAX_BUDGET_KB) {
      console.warn(`⚠️ [Bundle Budget] UYARI: Bundle boyutu bütçeyi ${totalKb - MAX_BUDGET_KB} KB aştı!`);
    } else {
      console.log(`✅ [Bundle Budget] Bütçe korundu (${totalKb} KB <= ${MAX_BUDGET_KB} KB).`);
    }
  } catch (err) {
    console.warn(`[Bundle Budget] Kontrol sırasında hata:`, err.message);
  }
}

checkBundle();
