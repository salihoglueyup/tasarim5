const fs = require('fs');
const content = fs.readFileSync('src/app/[lang]/hakkimizda/page.tsx', 'utf8');
const regex = /t\(['"]([^'"]+)['"]\)\s*\|\|\s*["']([^"']+)["']/g;
let match;
const found = {};
while ((match = regex.exec(content)) !== null) {
  found[match[1]] = match[2];
}
console.log(JSON.stringify(found, null, 2));
