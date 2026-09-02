/**
 * Faz 113: Görsel Yüklemelerinde Bulanık Önizleme (Blur Placeholder)
 * 
 * Görsel indirilene kadar beyaz/boş ekran parlamasını önlemek ve algılanan
 * performansı (Perceived Performance) maksimize etmek için ultra hafif SVG Base64 blur önizlemesi.
 */

export const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzFmMjQzMCIvPjwvc3ZnPg==';

export const LIGHT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdGZSIvPjwvc3ZnPg==';

export function getBlurPlaceholder(isDark: boolean = true): { placeholder: 'blur'; blurDataURL: string } {
  return {
    placeholder: 'blur',
    blurDataURL: isDark ? DEFAULT_BLUR_DATA_URL : LIGHT_BLUR_DATA_URL,
  };
}
