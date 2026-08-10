const fs = require('fs');

const files = [
  'src/app/[lang]/hizmetler/hasere-ve-dezenfeksiyon/page.tsx',
  'src/app/[lang]/hizmetler/havuz-bakimi-ve-hijyen/page.tsx',
  'src/app/[lang]/hizmetler/hukuk-ve-icra-danismanligi/page.tsx',
  'src/app/[lang]/hizmetler/peyzaj-ve-bahce-bakimi/page.tsx',
  'src/app/[lang]/hizmetler/teknik-bakim/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('import { RelatedArticles }')) {
    content = content.replace("import JsonLd from '@/components/seo/JsonLd';", "import JsonLd from '@/components/seo/JsonLd';\nimport { RelatedArticles } from '@/components';");
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});
