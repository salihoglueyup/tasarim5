const fs = require('fs');
const path = require('path');

const commonPath = path.join(__dirname, '../src/i18n/locales/tr/common.json');
const common = require(commonPath);

const compDir = path.join(__dirname, '../src/components/sections');
const files = fs.readdirSync(compDir).filter(f => f.endsWith('Calculator.tsx'));

const missing = {};
const regex = /t\(['"]([^'"]+)['"]\)/g;

files.forEach(f => {
  const content = fs.readFileSync(path.join(compDir, f), 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    if (!common[key]) {
      missing[key] = ""; // Will fill with dummy or generated Turkish text later
    }
  }
});

fs.writeFileSync(path.join(__dirname, 'missing_calculator_keys.json'), JSON.stringify(missing, null, 2));
console.log(`Found ${Object.keys(missing).length} missing keys.`);
