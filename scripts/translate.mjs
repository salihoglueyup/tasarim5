import fs from 'fs';
import path from 'path';

async function translateText(text, targetLang) {
  if (!text) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch (e) {
    console.error(`Error translating: ${text.substring(0, 20)}...`, e);
    return text;
  }
}

async function translateFile(targetLang) {
  const sourcePath = path.join(process.cwd(), 'src/i18n/locales/tr/common.json');
  const targetPath = path.join(process.cwd(), `src/i18n/locales/${targetLang}/common.json`);
  
  console.log(`Translating to ${targetLang}...`);
  const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  let existingData = {};
  if (fs.existsSync(targetPath)) {
    existingData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  }
  const translatedData = { ...existingData };
  
  const entries = Object.entries(data);
  let count = 0;
  for (const [key, value] of entries) {
    if (!(key in existingData)) {
      if (typeof value === 'string' && value.trim() !== '') {
        // Small delay to prevent rate limiting
        await new Promise(r => setTimeout(r, 100));
        translatedData[key] = await translateText(value, targetLang);
      } else {
        translatedData[key] = value;
      }
      count++;
      if (count % 10 === 0) console.log(`${targetLang}: Translated ${count} new keys`);
    }
  }
  
  fs.writeFileSync(targetPath, JSON.stringify(translatedData, null, 2));
  console.log(`Finished translating to ${targetLang}!`);
}

async function run() {
  await translateFile('en');
  await translateFile('ru');
  await translateFile('ar');
  console.log('All translations completed.');
}

run();
