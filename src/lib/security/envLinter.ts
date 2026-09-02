const SENSITIVE_KEYWORDS = [
  'DATABASE',
  'SECRET',
  'PASSWORD',
  'PRIVATE_KEY',
  'PRISMA',
  'REDIS_URL',
  'API_SECRET',
  'JWT',
  'SESSION_SECRET',
  'MASTER_KEY',
];

export interface EnvAuditResult {
  hasLeak: boolean;
  leaks: string[];
}

/**
 * Faz 189: İstemci Tarafına Sızabilecek Hassas Ortam Değişkeni Denetleyicisi (Env Linter)
 * `NEXT_PUBLIC_` öneki ile yanlışlıkla istemci tarayıcı koduna gömülebilecek
 * gizli anahtarları ve veritabanı url'lerini tespit edip engeller.
 */
export function auditEnvironmentVariables(
  envMap: Record<string, string | undefined> = process.env
): EnvAuditResult {
  const leaks: string[] = [];

  for (const [key, val] of Object.entries(envMap)) {
    if (!val) continue;

    // NEXT_PUBLIC_ öneki taşıyan değişkenleri incele
    if (key.startsWith('NEXT_PUBLIC_')) {
      const upperKey = key.toUpperCase();

      for (const keyword of SENSITIVE_KEYWORDS) {
        if (upperKey.includes(keyword)) {
          leaks.push(
            `KRİTİK GÜVENLİK SIZINTISI: '${key}' istemciye açık (NEXT_PUBLIC_) ancak '${keyword}' hassas anahtarı içeriyor!`
          );
          break;
        }
      }
    }
  }

  return {
    hasLeak: leaks.length > 0,
    leaks,
  };
}

/**
 * Uygulama başlangıcında otomatik denetim
 */
export function assertNoClientEnvLeaks(envMap: Record<string, string | undefined> = process.env): void {
  const audit = auditEnvironmentVariables(envMap);
  if (audit.hasLeak) {
    console.error('❌ İstemci Ortam Değişkeni Güvenlik İhlali:');
    audit.leaks.forEach((l) => console.error(`  - ${l}`));
    throw new Error('Hassas ortam değişkeni sızıntısı tespit edildiği için başlatma durduruldu.');
  }
}
