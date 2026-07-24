const fs = require('fs');
const path = require('path');

const appDir = 'c:\\Gelistirme\\Alo Yönetim\\Bazı Tasarımlar\\Tasarım 5\\src\\app';
const langDir = path.join(appDir, '[lang]');

// Klasörleri oluştur
if (!fs.existsSync(langDir)) {
  fs.mkdirSync(langDir);
}

// Taşınacak klasör ve dosyalar
const itemsToMove = [
  'basari-hikayeleri',
  'blog',
  'guvenlik-akademisi',
  'hakkimizda',
  'hesaplayici',
  'hizmetler',
  'iletisim',
  'istihdam-koprusu',
  'kurumsal',
  'kvkk-ve-aydinlatma-metni',
  'referanslar',
  'sektorel-cozumler',
  'site-haritasi',
  'sss',
  'surdurulebilirlik',
  'teklif-al',
  'page.tsx',
  'layout.tsx',
  'error.tsx',
  'not-found.tsx',
  'global-error.tsx'
];

itemsToMove.forEach(item => {
  const oldPath = path.join(appDir, item);
  const newPath = path.join(langDir, item);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved: ${item}`);
  }
});

// Layout dosyasındaki global.css yolunu düzelt
const layoutPath = path.join(langDir, 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  let content = fs.readFileSync(layoutPath, 'utf8');
  content = content.replace('import "./globals.css";', 'import "../globals.css";');
  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log('Fixed globals.css path in layout.tsx');
}
