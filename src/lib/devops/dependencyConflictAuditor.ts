export interface PackageJsonStructure {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  overrides?: Record<string, string>;
}

export interface DependencyAuditReport {
  totalDeps: number;
  totalDevDeps: number;
  duplicateCount: number;
  valid: boolean;
  duplicates: string[];
  versionConflicts: string[];
  recommendations: string[];
}

/**
 * Faz 241: Bağımlılık Çakışma ve Gereksiz Paket Denetleyicisi (Dependency Audit)
 */
export function auditDependencies(pkg: PackageJsonStructure): DependencyAuditReport {
  const deps = pkg.dependencies || {};
  const devDeps = pkg.devDependencies || {};

  const depKeys = Object.keys(deps);
  const devDepKeys = Object.keys(devDeps);

  const duplicates: string[] = [];
  const versionConflicts: string[] = [];
  const recommendations: string[] = [];

  // 1. Hem dep hem devDep içinde bulunan paketler (Çift referans)
  for (const key of depKeys) {
    if (devDepKeys.includes(key)) {
      duplicates.push(key);
    }
  }

  // 2. React & React DOM versiyon uyumluluğu
  if (deps.react && deps['react-dom']) {
    const reactClean = deps.react.replace(/[\^~]/, '');
    const reactDomClean = deps['react-dom'].replace(/[\^~]/, '');
    if (reactClean !== reactDomClean) {
      versionConflicts.push(`React (${deps.react}) ve React-DOM (${deps['react-dom']}) sürümleri birebir örtüşmüyor!`);
    }
  }

  // 3. Prisma Client & Prisma CLI versiyon uyumluluğu
  if (deps['@prisma/client'] && devDeps.prisma) {
    const clientVer = deps['@prisma/client'].replace(/[\^~]/, '');
    const cliVer = devDeps.prisma.replace(/[\^~]/, '');
    if (clientVer !== cliVer) {
      versionConflicts.push(`@prisma/client (${deps['@prisma/client']}) ile prisma CLI (${devDeps.prisma}) sürümleri örtüşmüyor!`);
    }
  }

  const valid = duplicates.length === 0 && versionConflicts.length === 0;

  return {
    totalDeps: depKeys.length,
    totalDevDeps: devDepKeys.length,
    duplicateCount: duplicates.length,
    valid,
    duplicates,
    versionConflicts,
    recommendations,
  };
}
