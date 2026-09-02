import { execSync } from 'child_process';

console.log('--- Çift Uzak Depo Senkronizasyon Kontrolü (Faz 244) ---');

try {
  const remotes = execSync('git remote -v', { encoding: 'utf-8' });
  const hasOrigin = remotes.includes('salihoglueyup/tasarim5');
  const hasAlogroup = remotes.includes('AloGroupTR/web-aloyonetim');

  if (hasOrigin && hasAlogroup) {
    console.log('✅ Her iki depo da tanımlı:');
    console.log('   - origin: salihoglueyup/tasarim5');
    console.log('   - alogroup: AloGroupTR/web-aloyonetim');
    console.log('✅ Senkronizasyon hazır.');
  } else {
    console.error('❌ Eksik uzak depo tespit edildi!');
    process.exit(1);
  }
} catch (err) {
  console.error('Hata:', err.message);
  process.exit(1);
}
