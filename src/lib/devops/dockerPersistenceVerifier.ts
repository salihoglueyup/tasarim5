export interface PersistenceCheckReport {
  postgresHasPersistentVolume: boolean;
  redisHasPersistentVolume: boolean;
  redisHasAofEnabled: boolean;
  hasRestartPolicy: boolean;
  valid: boolean;
  errors: string[];
}

/**
 * Faz 245: Docker Veri Kalıcılığı (Data Persistence) ve Yeniden Başlatma Güvenliği
 * Konteyner durdurulup yeniden başlatıldığında PostgreSQL ve Redis verilerinin
 * kaybolmayacağını (Persistent Volumes, AOF ve restart: unless-stopped) doğrular.
 */
export function verifyDockerPersistenceConfig(dockerComposeContent: string): PersistenceCheckReport {
  const errors: string[] = [];

  const postgresHasPersistentVolume = /(?:\.\/data\/postgres|postgres_data):\/var\/lib\/postgresql\/data/.test(dockerComposeContent);
  const redisHasPersistentVolume = /(?:\.\/data\/redis|redis_data):\/data/.test(dockerComposeContent);
  const redisHasAofEnabled = /--appendonly\s+yes/.test(dockerComposeContent);
  const hasRestartPolicy = /restart:\s+unless-stopped/.test(dockerComposeContent);

  if (!postgresHasPersistentVolume) {
    errors.push('PostgreSQL servisinde kalıcı veri dizini/volume eksik!');
  }
  if (!redisHasPersistentVolume) {
    errors.push('Redis servisinde kalıcı veri dizini/volume eksik!');
  }
  if (!redisHasAofEnabled) {
    errors.push('Redis için --appendonly yes AOF kalıcılık bayrağı eksik!');
  }
  if (!hasRestartPolicy) {
    errors.push('Konteyner yeniden başlatma (restart: unless-stopped) politikası eksik!');
  }

  return {
    postgresHasPersistentVolume,
    redisHasPersistentVolume,
    redisHasAofEnabled,
    hasRestartPolicy,
    valid: postgresHasPersistentVolume && redisHasPersistentVolume && redisHasAofEnabled && hasRestartPolicy,
    errors,
  };
}
