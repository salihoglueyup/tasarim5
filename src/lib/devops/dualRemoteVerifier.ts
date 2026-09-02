export interface RemoteInfo {
  name: string;
  url: string;
  isConfigured: boolean;
}

export interface DualRemoteReport {
  hasOrigin: boolean;
  hasAlogroup: boolean;
  isFullyConfigured: boolean;
  remotes: RemoteInfo[];
  errors: string[];
}

/**
 * Faz 244: Çift Uzak Depo (origin & alogroup) Senkronizasyon Doğrulayıcısı
 */
export function verifyDualRemoteConfig(gitRemoteOutput: string): DualRemoteReport {
  const lines = gitRemoteOutput.split('\n').map((l) => l.trim());
  const remotes: RemoteInfo[] = [];
  const errors: string[] = [];

  const originMatch = lines.find((l) => l.startsWith('origin') && l.includes('salihoglueyup/tasarim5'));
  const alogroupMatch = lines.find((l) => l.startsWith('alogroup') && l.includes('AloGroupTR/web-aloyonetim'));

  const hasOrigin = Boolean(originMatch);
  const hasAlogroup = Boolean(alogroupMatch);

  if (!hasOrigin) {
    errors.push('origin deposu (salihoglueyup/tasarim5) eksik veya hatalı yapılandırılmış!');
  }
  if (!hasAlogroup) {
    errors.push('alogroup deposu (AloGroupTR/web-aloyonetim) eksik veya hatalı yapılandırılmış!');
  }

  return {
    hasOrigin,
    hasAlogroup,
    isFullyConfigured: hasOrigin && hasAlogroup,
    remotes: [
      { name: 'origin', url: originMatch ? originMatch.split(/\s+/)[1] : '', isConfigured: hasOrigin },
      { name: 'alogroup', url: alogroupMatch ? alogroupMatch.split(/\s+/)[1] : '', isConfigured: hasAlogroup },
    ],
    errors,
  };
}
