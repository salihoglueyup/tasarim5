const fs = require('fs');
const path = require('path');

const keysToDelete = [
  'about_stats_1_label', 'about_stats_2_label', 'about_stats_3_label', 'about_stats_4_label',
  'about_values_badge', 'about_values_title', 'about_values_desc',
  'about_value_1_title', 'about_value_1_desc', 'about_value_2_title', 'about_value_2_desc',
  'about_value_3_title', 'about_value_3_desc', 'about_value_4_title', 'about_value_4_desc'
];

const langs = ['en', 'ru', 'ar'];

langs.forEach(lang => {
  const filePath = path.join(__dirname, `../src/i18n/locales/${lang}/common.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;
    keysToDelete.forEach(k => {
      if (data[k]) {
        // Only delete if it matches exactly the Turkish value? Actually, just delete it to force re-translate.
        // Wait, if we delete it, `translate.mjs` will re-translate it!
        delete data[k];
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Deleted keys from ${lang}/common.json`);
    }
  }
});
