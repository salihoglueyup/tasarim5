const fs = require('fs');
const dir = 'src/components/sections/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Calculator.tsx') || f.endsWith('Testimonials.tsx'));

const replacements = [
  { search: 'Ücretsiz Keşif İste', key: 'calc_btn_free_discovery' },
  { search: 'Detaylı Rapor İste', key: 'calc_btn_detail_report' },
  { search: 'Hemen Alacak Dosyası Aç', key: 'calc_btn_open_file' },
  { search: ' Kişi', key: 'calc_unit_person' },
  { search: ' Adet', key: 'calc_unit_item' }
];

let extracted = {};

files.forEach(f => {
  let content = fs.readFileSync(dir + f, 'utf8');
  let changed = false;

  replacements.forEach(r => {
    if (content.includes(r.search) && !content.includes(`t('${r.key}')`)) {
      let replaceWith = `{t('${r.key}')}`;
      if (r.search === ' Kişi' || r.search === ' Adet') {
        replaceWith = ` {t('${r.key}')}`;
      }
      
      content = content.split(r.search).join(replaceWith);
      extracted[r.key] = r.search.trim();
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(dir + f, content);
  }
});

fs.writeFileSync('missed_translations.json', JSON.stringify(extracted, null, 2));
console.log('Missed translations processed!');
