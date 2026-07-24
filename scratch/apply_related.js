const fs = require('fs');
const path = require('path');

const projectPath = 'c:\\Gelistirme\\Alo Yönetim\\Bazı Tasarımlar\\Tasarım 5';
const pages = [
  { file: 'guvenlik-yonetimi/page.tsx' },
  { file: 'tesis-yonetimi/page.tsx' },
  { file: 'temizlik-ve-hijyen/page.tsx' },
  { file: 'teknik-bakim/page.tsx' },
  { file: 'peyzaj-ve-bahce-bakimi/page.tsx' },
  { file: 'havuz-bakimi-ve-hijyen/page.tsx' },
  { file: 'hasere-ve-dezenfeksiyon/page.tsx' },
  { file: 'hukuk-ve-icra-danismanligi/page.tsx' }
];

pages.forEach(p => {
  const filePath = path.join(projectPath, 'src', 'app', 'hizmetler', p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('RelatedServices')) {
      // index.ts'den import almıyoruz çünkü RelatedServices henüz index.ts'de yok. 
      // Direk dosya yolundan alalım veya components'ten. 
      // Biz components/index.ts içine export etmediğimiz için relative alalım.
      content = content.replace("import PageHeader from '@/components/layout/PageHeader';", "import PageHeader from '@/components/layout/PageHeader';\nimport RelatedServices from '@/components/sections/RelatedServices';");
      
      const relatedBlock = `\n\n        <RelatedServices currentPath="/hizmetler/${p.file.replace('/page.tsx', '')}" />\n\n        {/* Bottom Call To Action Banner */}`;
      
      content = content.replace('{/* Bottom Call To Action Banner */}', relatedBlock);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Added RelatedServices to ' + p.file);
    }
  }
});

// src/components/index.ts güncellenmesi (isteğe bağlı ama temizlik için)
const idxPath = path.join(projectPath, 'src', 'components', 'index.ts');
let idxContent = fs.readFileSync(idxPath, 'utf8');
if (!idxContent.includes('RelatedServices')) {
  idxContent = idxContent.replace("export { default as SeoTextSection } from './sections/SeoTextSection';", "export { default as SeoTextSection } from './sections/SeoTextSection';\nexport { default as RelatedServices } from './sections/RelatedServices';");
  fs.writeFileSync(idxPath, idxContent, 'utf8');
}
