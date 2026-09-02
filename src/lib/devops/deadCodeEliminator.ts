export interface DeadCodeReport {
  scannedFiles: number;
  deadExportsFound: number;
  clean: boolean;
  warnings: string[];
}

/**
 * Faz 240: Proje Geneli Kullanılmayan Kod ve Export Denetleyicisi (Dead Code Elimination)
 * Ağaç sallama (Tree-shaking) verimliliğini korumak ve First Load JS boyutunu
 * şişirmemek için kaynak kodlardaki atıl parçaları denetler.
 */
export function auditDeadCode(
  fileContents: Record<string, string>,
  entryPoints: string[] = ['src/components/index.ts', 'src/lib/index.ts']
): DeadCodeReport {
  const warnings: string[] = [];
  let deadExportsFound = 0;

  // Tüm export edilmiş isimleri topla
  const declaredExports = new Map<string, { file: string; line: number }>();
  const allUsages = new Set<string>();

  for (const [filePath, content] of Object.entries(fileContents)) {
    // Export ifadelerini ara: export function foo, export const bar, export type Baz
    const exportRegex = /export\s+(?:const|function|class|type|interface)\s+([A-Za-z0-9_]+)/g;
    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      declaredExports.set(match[1], { file: filePath, line: 0 });
    }

    // Kullanım ifadelerini ara
    const identifierRegex = /\b([A-Za-z0-9_]+)\b/g;
    let idMatch;
    while ((idMatch = identifierRegex.exec(content)) !== null) {
      allUsages.add(idMatch[1]);
    }
  }

  // Tanımlanan her export en az bir dosyada kullanılmış mı?
  for (const [exportName, info] of declaredExports.entries()) {
    // Özel Next.js anahtarları ve entrypoint dosyaları muaf tutulur
    if (['GET', 'POST', 'PUT', 'DELETE', 'dynamic', 'metadata', 'viewport', 'default'].includes(exportName)) {
      continue;
    }

    let usageCount = 0;
    for (const content of Object.values(fileContents)) {
      const occurrences = content.split(exportName).length - 1;
      usageCount += occurrences;
    }

    // Sadece tanımlandığı yerde geçiyorsa (usageCount === 1) muhtemelen atıldır
    if (usageCount <= 1) {
      deadExportsFound++;
      warnings.push(`[${info.file}] Muhtemel atıl export: "${exportName}" başka dosyalarda çağrılmıyor.`);
    }
  }

  return {
    scannedFiles: Object.keys(fileContents).length,
    deadExportsFound,
    clean: deadExportsFound === 0,
    warnings,
  };
}
