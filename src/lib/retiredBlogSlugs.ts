/**
 * Kaldırılan "ilçe × hizmet" şablon blog yazıları (ör. kadikoy-teknik-bakim-2026).
 * İçerikleri /bolgeler/<ilçe>/<hizmet> sayfalarıyla aynı konuyu tekrar ettiği için yazılar silindi;
 * eski adresler ilgili bölge-hizmet sayfasına kalıcı yönlendirilir.
 */
const DISTRICT_SLUGS = ['atasehir', 'bakirkoy', 'basaksehir', 'besiktas', 'beylikduzu', 'kadikoy', 'kartal', 'maltepe', 'sariyer', 'sisli', 'umraniye', 'uskudar'];
const SERVICE_SLUGS = ['guvenlik-yonetimi', 'hasere-ve-dezenfeksiyon', 'havuz-bakimi-ve-hijyen', 'hukuk-ve-icra-danismanligi', 'peyzaj-ve-bahce-bakimi', 'teknik-bakim', 'temizlik-ve-hijyen', 'tesis-yonetimi'];

export function retiredBlogTarget(slug: string): string | undefined {
  const m = /^([a-z]+)-(.+)-2026$/.exec(slug);
  if (!m || !DISTRICT_SLUGS.includes(m[1]) || !SERVICE_SLUGS.includes(m[2])) return undefined;
  return `/bolgeler/${m[1]}/${m[2]}`;
}
