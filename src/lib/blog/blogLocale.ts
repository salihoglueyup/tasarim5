import 'server-only';
// Blog yazılarının en/ru/ar sürümleri: yazılar Türkçe kaynakta (src/data/posts.ts) tutulur,
// çeviriler src/i18n/blog/{lang}.json çeviri belleğinden gelir (bkz. blogI18n.ts).
// Çevirisi eksik hiçbir şey sessizce Türkçe gösterilmez: eksik varsa sayfa noindex olur.

import { POSTS, POSTS_META, CATEGORIES } from '@/data/posts';
import type { Post, PostMeta, Category } from '@/data/posts';
import { localizePostFields, localizeText, type BlogLang, type TranslationMemory } from './blogI18n';
import en from '@/i18n/blog/en.json';
import ru from '@/i18n/blog/ru.json';
import ar from '@/i18n/blog/ar.json';
import coverage from '@/i18n/blog/coverage.json';

const MEMORY: Record<BlogLang, TranslationMemory> = { en, ru, ar } as Record<BlogLang, TranslationMemory>;

export function isBlogLang(lang: string): lang is BlogLang {
  return lang === 'en' || lang === 'ru' || lang === 'ar';
}

export const TRANSLATED_BLOG_SLUGS: readonly string[] = coverage.translatedSlugs;

export interface LocalizedCategory {
  slug: string;
  name: string;
  description: string;
  missing: number;
}

export function localizeCategory(cat: Category, lang: BlogLang): LocalizedCategory {
  const name = localizeText(cat.name, lang, MEMORY[lang]);
  const description = localizeText(cat.description, lang, MEMORY[lang]);
  return { slug: cat.slug, name: name.value, description: description.value, missing: name.missing + description.missing };
}

export function getLocalizedCategories(lang: BlogLang): LocalizedCategory[] {
  return CATEGORIES.map((c) => localizeCategory(c, lang));
}

export interface LocalizedPost {
  post: Post;
  /** Çevrilmiş alanlar (title/description/tldr/content). */
  title: string;
  description: string;
  tldr: string | null;
  content: Post['content'];
  category: LocalizedCategory | null;
  /** Bellekte karşılığı olmayan metin sayısı; 0 değilse sayfa indekslenmemelidir. */
  missing: number;
}

export function getLocalizedPost(slug: string, lang: BlogLang): LocalizedPost | null {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  const f = localizePostFields(post, lang, MEMORY[lang]);
  const cat = CATEGORIES.find((c) => c.slug === post.category);
  const category = cat ? localizeCategory(cat, lang) : null;
  return {
    post,
    title: f.title,
    description: f.description,
    tldr: f.tldr,
    content: f.content as Post['content'],
    category,
    missing: f.missing + (category?.missing ?? 0),
  };
}

export interface LocalizedPostMeta {
  meta: PostMeta;
  title: string;
  description: string;
  category: LocalizedCategory | null;
  missing: number;
}

export function getLocalizedPostMetas(lang: BlogLang): LocalizedPostMeta[] {
  return POSTS_META.map((meta) => {
    const title = localizeText(meta.title, lang, MEMORY[lang]);
    const description = localizeText(meta.description, lang, MEMORY[lang]);
    const cat = CATEGORIES.find((c) => c.slug === meta.category);
    const category = cat ? localizeCategory(cat, lang) : null;
    return {
      meta,
      title: title.value,
      description: description.value,
      category,
      missing: title.missing + description.missing + (category?.missing ?? 0),
    };
  });
}
