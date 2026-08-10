const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/app/[lang]/hizmetler');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const extractedTranslations = {
  "nav_home": "Anasayfa",
  "btn_get_quote": "Hemen Teklif Al 🚀"
};

dirs.forEach(dirName => {
  const pagePath = path.join(baseDir, dirName, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  let changed = false;

  const prefixMap = {
    'aidat-takibi': 'dues',
    'guvenlik-yonetimi': 'sec',
    'hasere-ve-dezenfeksiyon': 'pest',
    'havuz-bakimi-ve-hijyen': 'pool',
    'hukuk-ve-icra-danismanligi': 'legal',
    'peyzaj-ve-bahce-bakimi': 'land',
    'teknik-bakim': 'maint',
    'temizlik-ve-hijyen': 'clean',
    'tesis-yonetimi': 'fac'
  };

  const prefix = prefixMap[dirName] || dirName.replace(/-/g, '_');
  
  // 1. Breadcrumbs "Anasayfa"
  if (content.includes("name: 'Anasayfa'")) {
    content = content.replace("name: 'Anasayfa'", "name: t('nav_home')");
    changed = true;
  }
  
  // 2. Hemen Teklif Al button
  if (content.includes("Hemen Teklif Al <span")) {
    content = content.replace(/Hemen Teklif Al\s*<span/g, "{t('btn_get_quote')} <span");
    changed = true;
  }
  
  // 3. serviceType
  const serviceTypeMatch = content.match(/serviceType:\s*'([^']+)'/);
  if (serviceTypeMatch) {
    const serviceName = serviceTypeMatch[1];
    const key = `serv_${prefix}_name`;
    extractedTranslations[key] = serviceName;
    content = content.replace(serviceTypeMatch[0], `serviceType: t('${key}')`);
    changed = true;
  }
  
  // 4. h1 extraction (only if not already dangerouslySetInnerHTML)
  if (!content.includes('dangerouslySetInnerHTML') && content.includes('<h1')) {
    const h1Regex = /<h1([^>]*)>([\s\S]*?)<\/h1>/;
    const h1Match = content.match(h1Regex);
    if (h1Match) {
      const attrs = h1Match[1];
      let innerHTML = h1Match[2].trim();
      
      // clean up formatting in innerHTML to match translation string
      innerHTML = innerHTML.replace(/\s+/g, ' '); // remove newlines and multiple spaces
      innerHTML = innerHTML.replace(/"/g, "'"); // replace double quotes with single quotes inside tags
      
      const key = `serv_${prefix}_hero_title`;
      extractedTranslations[key] = innerHTML;
      
      const newH1 = `<h1${attrs} dangerouslySetInnerHTML={{ __html: t('${key}') }} />`;
      content = content.replace(h1Match[0], newH1);
      changed = true;
    }
  }

  // 5. Add framer-motion to hero if missing
  if (!content.includes("from 'framer-motion'")) {
    content = content.replace(/import Link from 'next\/link';/, "import Link from 'next/link';\nimport { motion, AnimatePresence } from 'framer-motion';");
    changed = true;
  }

  // Replace <div className="flex flex-col items-center gap-6"> with motion.div
  if (content.includes('<div className="flex flex-col items-center gap-6">')) {
    content = content.replace(
      '<div className="flex flex-col items-center gap-6">',
      `<motion.div \n            initial={{ opacity: 0, y: 30 }}\n            animate={{ opacity: 1, y: 0 }}\n            transition={{ duration: 0.8 }}\n            className="flex flex-col items-center gap-6"\n          >`
    );
    content = content.replace(
      /<\/Link>\s*<\/div>\s*<\/div>/,
      `</Link>\n            </div>\n          </motion.div>`
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(pagePath, content);
    console.log(`Updated ${dirName}`);
  }
});

fs.writeFileSync(path.join(__dirname, 'services_translations.json'), JSON.stringify(extractedTranslations, null, 2));
console.log('Done!');
