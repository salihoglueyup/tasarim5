/**
 * Sözlük terimi -> URL slug'ı. Tek kaynak: sözlük sayfaları, sitemap ve tüm iç linkler bunu kullanır.
 * Kendi regex'ini yazma: "İ".toLowerCase() birleştirici nokta (U+0307) üretir ve naif
 * /[^a-z0-9]+/ -> "-" dönüşümü "i-sletme-projesi" gibi 404 veren slug'lar üretir.
 */
export function termToSlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
