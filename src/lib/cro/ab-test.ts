/**
 * A/B Test Utility (Faz 88)
 * Kullanıcıyı rastgele varyasyonlara atar veya cookie/localStorage üzerinden sabitler.
 */

export type Experiment = {
  id: string;
  variants: string[];
};

export function getVariant(experiment: Experiment, userId?: string): string {
  // Eğer userId (veya cihaz/cookie ID) varsa deterministik bir varyant ata
  if (userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % experiment.variants.length;
    return experiment.variants[index];
  }
  
  // Rastgele atama (SSR sırasında hydration error olmaması için dikkat edilmeli, genellikle middleware'de yapılır)
  const randomIndex = Math.floor(Math.random() * experiment.variants.length);
  return experiment.variants[randomIndex];
}
