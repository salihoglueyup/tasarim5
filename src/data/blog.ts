// Blog yazılarının tek doğruluk kaynağı (canonical slug listesi).
// SEO V4 Faz 31 (soft-404) için buradan doğrulama yapılır; sitemap de bunu kullanır.
// Not: Gerçek CMS/MDX veri katmanı Bölüm G (Faz 151) ile gelecek; bu liste geçiş temelidir.

export const BLOG_SLUGS = [
  '2024-aidat-artis-oranlari',
  'deprem-risk-analizi',
  'kentsel-donusum-surecleri',
  'yuzme-havuzu-bakim-kimyasallari',
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

export function isValidBlogSlug(slug: string): slug is BlogSlug {
  return (BLOG_SLUGS as readonly string[]).includes(slug);
}
