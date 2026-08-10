const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/import\s*\{\s*([^}]*?)\bJsonLd\b([^}]*?)\s*\}\s*from\s*['"]@\/components['"]/g, (match, p1, p2) => {
    const otherImports = [p1, p2].join('').split(',').map(s => s.trim()).filter(s => s);
    let replacement = `import JsonLd from '@/components/seo/JsonLd';`;
    if (otherImports.length > 0) {
      replacement += `\nimport { ${otherImports.join(', ')} } from '@/components';`;
    }
    return replacement;
  });
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walk('./src');
