// Blog slug'larının doğruluk kaynağı artık yapılandırılmış içerik motorudur
// (SEO V4 Faz 151). Bu modül geriye dönük uyumluluk için POSTS'tan türetir;
// sitemap ve soft-404 (Faz 31) doğrulaması buradan yapılır.

import { POST_SLUGS, isValidPost } from '@/data/posts';

export const BLOG_SLUGS = POST_SLUGS;

export type BlogSlug = string;

export function isValidBlogSlug(slug: string): boolean {
  return isValidPost(slug);
}
