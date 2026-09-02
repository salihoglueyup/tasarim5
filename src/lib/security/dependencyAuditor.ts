import fs from 'fs';
import path from 'path';

export interface AuditSummary {
  totalDependencies: number;
  totalDevDependencies: number;
  hasWildcardVersions: boolean;
  wildcards: string[];
}

/**
 * Faz 199: Bağımlılık Güvenlik ve Uyumluluk Denetimi
 * package.json içindeki bağımlılıkları denetler, wildcards (*) veya tehlikeli sürümleri tespit eder.
 */
export function auditPackageDependencies(packageJsonPath?: string): AuditSummary {
  const filePath = packageJsonPath || path.resolve(process.cwd(), 'package.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const dependencies = content.dependencies || {};
  const devDependencies = content.devDependencies || {};

  const wildcards: string[] = [];

  for (const [pkg, ver] of Object.entries<string>(dependencies)) {
    if (ver === '*' || ver === 'latest') {
      wildcards.push(`${pkg}: ${ver}`);
    }
  }

  for (const [pkg, ver] of Object.entries<string>(devDependencies)) {
    if (ver === '*' || ver === 'latest') {
      wildcards.push(`${pkg}: ${ver}`);
    }
  }

  return {
    totalDependencies: Object.keys(dependencies).length,
    totalDevDependencies: Object.keys(devDependencies).length,
    hasWildcardVersions: wildcards.length > 0,
    wildcards,
  };
}
