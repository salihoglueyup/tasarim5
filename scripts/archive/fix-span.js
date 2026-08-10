const fs = require('fs');
const path = require('path');
const langs = ['en', 'ru', 'ar'];
const titles = {
  en: 'We have digitized <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">traditional management.</span>',
  ru: 'Мы перевели в цифру <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">традиционное управление.</span>',
  ar: 'لقد قمنا برقمنة <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">الإدارة التقليدية.</span>'
};

langs.forEach(l => {
  const p = path.join(__dirname, '../src/i18n/locales', l, 'common.json');
  const data = require(p);
  data.about_hero_title = titles[l];
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
});
console.log('Fixed span tags in translations.');
