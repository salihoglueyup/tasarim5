export interface EntrypointAuditReport {
  hasDbRetryLoop: boolean;
  hasPrismaMigration: boolean;
  hasSmartSeedCheck: boolean;
  hasGracefulFallback: boolean;
  valid: boolean;
  errors: string[];
}

/**
 * Faz 246: Docker Başlangıç (Entrypoint) ve Veritabanı Otomasyonu Denetleyicisi
 */
export function auditEntrypointScript(entrypointContent: string): EntrypointAuditReport {
  const errors: string[] = [];

  const hasDbRetryLoop = /MAX_RETRIES=\d+/.test(entrypointContent) && /until\s+node\s+-e/i.test(entrypointContent);
  const hasPrismaMigration = /prisma\s+(?:db\s+push|migrate)/i.test(entrypointContent);
  const hasSmartSeedCheck = /NEED_SEED=/.test(entrypointContent) && /seed\.ts/i.test(entrypointContent);
  const hasGracefulFallback = /echo.*uyarı|echo.*tamamlanamadı/i.test(entrypointContent);

  if (!hasDbRetryLoop) {
    errors.push('PostgreSQL bağlantı bekleme döngüsü eksik!');
  }
  if (!hasPrismaMigration) {
    errors.push('Prisma şema doğrulama/migration komutu eksik!');
  }
  if (!hasSmartSeedCheck) {
    errors.push('Akıllı DB seed kontrol mekanizması eksik!');
  }

  return {
    hasDbRetryLoop,
    hasPrismaMigration,
    hasSmartSeedCheck,
    hasGracefulFallback,
    valid: hasDbRetryLoop && hasPrismaMigration && hasSmartSeedCheck,
    errors,
  };
}
