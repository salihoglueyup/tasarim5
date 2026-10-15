// Çevirisi tamamlanan ilçe rehberlerinin anlık görüntüsünü çeviri belleği aracı (blog-i18n.mjs) için yazar.
// Kullanım: npx tsx scripts/dump-guides.ts
import fs from 'fs';
import { TRANSLATED_GUIDES } from '../src/data/districtGuides';

fs.writeFileSync('src/i18n/blog/guides.snapshot.json', JSON.stringify(TRANSLATED_GUIDES, null, 1) + '\n');
console.log('rehber sayısı', TRANSLATED_GUIDES.length);
