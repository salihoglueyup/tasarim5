import fs from 'fs';
import path from 'path';

export interface SqlScanResult {
  hasRisk: boolean;
  vulnerabilities: string[];
}

const DANGEROUS_SQL_PATTERNS = [
  { pattern: /\$queryRawUnsafe\s*\(/g, name: 'Prisma $queryRawUnsafe kullanımı' },
  { pattern: /\$executeRawUnsafe\s*\(/g, name: 'Prisma $executeRawUnsafe kullanımı' },
  { pattern: /\.query\s*\(\s*['"`][^'"`]*\+/g, name: 'String birleştirme ile SQL sorgusu oluşturma' },
  { pattern: /\.query\s*\(\s*`[^`]*\$\{/g, name: 'String interpolasyonu ile ham SQL çalıştırma' },
  { pattern: /exec\s*\(\s*['"`][^'"`]*\+/g, name: 'Ham SQL exec birleştirme' },
];

/**
 * Faz 193: SQL Injection Taraması ve Statik Güvenlik Analizi
 */
export function scanCodeForSqlInjection(code: string, fileName: string = 'unknown'): SqlScanResult {
  const vulnerabilities: string[] = [];

  for (const { pattern, name } of DANGEROUS_SQL_PATTERNS) {
    if (pattern.test(code)) {
      vulnerabilities.push(`[${fileName}] Güvenlik Riski: ${name}`);
    }
  }

  return {
    hasRisk: vulnerabilities.length > 0,
    vulnerabilities,
  };
}

/**
 * Belirtilen dizindeki tüm kaynak dosyaları SQL Injection riskine karşı tarar
 */
export function auditDirectoryForSqlSecurity(dirPath: string): {
  scannedFiles: number;
  isSecure: boolean;
  findings: string[];
} {
  const findings: string[] = [];
  let scannedFiles = 0;

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
          walk(fullPath);
        }
      } else if (entry.isFile() && /\.(ts|tsx|js|mjs)$/.test(entry.name)) {
        scannedFiles++;
        const content = fs.readFileSync(fullPath, 'utf-8');
        const result = scanCodeForSqlInjection(content, path.relative(process.cwd(), fullPath));
        if (result.hasRisk) {
          findings.push(...result.vulnerabilities);
        }
      }
    }
  }

  if (fs.existsSync(dirPath)) {
    walk(dirPath);
  }

  return {
    scannedFiles,
    isSecure: findings.length === 0,
    findings,
  };
}
