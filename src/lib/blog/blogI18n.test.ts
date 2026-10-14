import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

vi.mock('server-only', () => ({}));

import { hashString, normalizeForMemory, memoryId, DISTRICTS, collectPostStrings, localizePostFields, type BlogLang } from './blogI18n';
import { POSTS, POSTS_META, CATEGORIES } from '@/data/posts';
import { TR_ONLY_BLOG_SLUGS } from '@/data/districtGuides';
import { getLocalizedPost, getLocalizedPostMetas, getLocalizedCategories, TRANSLATED_BLOG_SLUGS } from './blogLocale';
import { isIndexable } from '@/lib/seo/indexPolicy';
// .mjs betiği: hash/normalize mantığının TS kütüphanesiyle aynı olduğunu doğrularız
import * as script from '../../../scripts/blog-i18n.mjs';

const LANGS: BlogLang[] = ['en', 'ru', 'ar'];
// İlçe rehberleri yalnızca Türkçe yayımlanır; en/ru/ar sürümleri çevrilene kadar noindex kalır.
const TR_ONLY = new Set(TR_ONLY_BLOG_SLUGS);
const TRANSLATED_POSTS = POSTS.filter((p) => !TR_ONLY.has(p.slug));
const readMem = (lang: BlogLang): Record<string, string> =>
  JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `src/i18n/blog/${lang}.json`), 'utf8'));
const MEM = Object.fromEntries(LANGS.map((l) => [l, readMem(l)])) as Record<BlogLang, Record<string, string>>;

describe('blog çeviri belleği: betik ve kütüphane tutarlılığı', () => {
  const samples = [
    'Kat Mülkiyeti Kanunu',
    "Kadıköy'de site yönetimi: Kadıköy ve Ataşehir karşılaştırması",
    "{d}'de zaten şablon",
    'Şişli, Beşiktaş ve Üsküdar',
    '',
  ];
  it('hashString/normalizeForMemory/memoryId betikle birebir aynı', () => {
    for (const s of samples) {
      expect(hashString(s)).toBe(script.hashString(s));
      expect(normalizeForMemory(s)).toEqual(script.normalizeForMemory(s));
      expect(memoryId(s)).toBe(script.memoryId(s));
    }
  });
  it('ilçe adları {d}, {d2} yer tutucularına indirgenir', () => {
    const n = normalizeForMemory("Kadıköy ve Şişli'de");
    expect(n.template).toBe("{d} ve {d2}'de");
    expect(n.districts).toEqual(['Kadıköy', 'Şişli']);
    expect(DISTRICTS.length).toBe(39);
  });
});

describe('blog çevirileri: kapsama ve yer tutucular', () => {
  it('her yazı, üst veri ve kategori en/ru/ar için eksiksiz çevrilmiş', () => {
    for (const lang of LANGS) {
      for (const post of TRANSLATED_POSTS) {
        const r = localizePostFields(post, lang, MEM[lang]);
        expect(r.missing, `${lang} ${post.slug}`).toBe(0);
      }
      for (const m of getLocalizedPostMetas(lang).filter((m) => !TR_ONLY.has(m.meta.slug))) expect(m.missing, `${lang} meta ${m.meta.slug}`).toBe(0);
      for (const c of getLocalizedCategories(lang)) expect(c.missing, `${lang} kategori ${c.slug}`).toBe(0);
    }
  });
  it('postsMetadata.ts başlık/açıklama/özeti yazılarla birebir aynı (liste sayfası çevirisi yazıdan gelir)', () => {
    const bySlug = new Map(POSTS.map((p) => [p.slug, p]));
    for (const m of POSTS_META) {
      const p = bySlug.get(m.slug)!;
      expect(p, m.slug).toBeTruthy();
      expect(m.title, m.slug).toBe(p.title);
      expect(m.description, m.slug).toBe(p.description);
      expect(m.tldr, m.slug).toBe(p.tldr);
    }
  });
  it('coverage.json tüm yazıları kapsıyor', () => {
    expect([...TRANSLATED_BLOG_SLUGS].sort()).toEqual(TRANSLATED_POSTS.map((p) => p.slug).sort());
  });
  it('bellekteki her giriş üç dilde de var ve yer tutucu etiketleri uyumlu', () => {
    const tagsOf = (s: string) => (s.match(/\{d\d*\}/g) || []).sort().join(',');
    const keys = new Set([...Object.keys(MEM.en), ...Object.keys(MEM.ru), ...Object.keys(MEM.ar)]);
    for (const k of keys) {
      expect(MEM.en[k], k).toBeTruthy();
      expect(MEM.ru[k], k).toBeTruthy();
      expect(MEM.ar[k], k).toBeTruthy();
      expect(tagsOf(MEM.ru[k]), k).toBe(tagsOf(MEM.en[k]));
      expect(tagsOf(MEM.ar[k]), k).toBe(tagsOf(MEM.en[k]));
    }
  });
  it('çevrilmiş çıktıda doldurulmamış yer tutucu kalmaz', () => {
    for (const lang of LANGS) {
      for (const post of TRANSLATED_POSTS) {
        const loc = getLocalizedPost(post.slug, lang)!;
        const all = JSON.stringify([loc.title, loc.description, loc.tldr, loc.content]);
        expect(all, `${lang} ${post.slug}`).not.toMatch(/\{d\d*\}/);
      }
    }
  });
  it('kaynakta bellekte olmayan (artık kullanılmayan) giriş birikmemiş', () => {
    const { map } = script.allTemplates();
    const used = new Set(map.keys());
    const orphan = Object.keys(MEM.en).filter((k) => !used.has(k));
    expect(orphan).toEqual([]);
  });
});

describe('blog: doğrulanamayan iddialar geri gelmesin', () => {
  const banned: RegExp[] = [
    /%30'a varan/, /yüz binlerce/i, /Sağlık Bakanlığı onaylı/, /ozon/i, /biyometrik/i, /yapay zeka/i,
    /Ziraat mühendis/, /kusursuz/i, /Ek Madde 69/, /87 maddelik/, /1\.0 ?- ?3\.0 ppm/, /550\.000/, /Dünya Sağlık Örgütü \(WHO\) standartlarında/,
    /noter onaylı işletme projesi tebligatı/i, /Kayaşehir|Bahçeşehir mega/,
  ];
  it('Türkçe kaynak yasaklı kalıp içermez', () => {
    const all = POSTS.map((p) => collectPostStrings(p).join('\n')).join('\n') + POSTS_META.map((m) => `${m.title}\n${m.description}\n${m.tldr}`).join('\n');
    for (const re of banned) expect(all, String(re)).not.toMatch(re);
  });
  it('çevirilerde de uydurma rakam/özellik yok', () => {
    const bad: RegExp[] = [/550,000/, /ozone/i, /biometric/i, /face recognition/i, /озон/i, /биометр/i, /الأوزون|بيومتري/];
    for (const lang of LANGS) {
      const text = Object.values(MEM[lang]).join('\n');
      for (const re of bad) expect(text, `${lang} ${re}`).not.toMatch(re);
    }
  });
  it('7579 sonrası: işletme projesi eski "7 gün itiraz/tebliğle kesinleşir" anlatımı yok', () => {
    const all = POSTS.map((p) => collectPostStrings(p).join('\n')).join('\n');
    expect(all).not.toMatch(/KMK m\.37 gereğince[^.]*tebliğ edilerek kesinleşen/);
    expect(all).not.toMatch(/7 günlük kesinleşme/);
  });
});

describe('blog: indeks politikası', () => {
  it('çevrilmiş blog listesi ve yazıları en/ru/ar için indekslenebilir, tr her zaman', () => {
    for (const lang of ['en', 'ru', 'ar']) {
      expect(isIndexable('/blog', lang)).toBe(true);
      expect(isIndexable(`/blog/${POSTS[0].slug}`, lang)).toBe(true);
      expect(isIndexable('/blog/kategori/hukuk', lang)).toBe(false);
      expect(isIndexable('/blog/etiket/aidat', lang)).toBe(false);
      expect(isIndexable('/blog/yazar/eyup-salihoglu', lang)).toBe(false);
      expect(isIndexable('/blog/olmayan-yazi', lang)).toBe(false);
    }
    expect(isIndexable('/blog/olmayan-yazi', 'tr')).toBe(true);
  });
  it('kategori listesi çevrilmiş', () => {
    expect(getLocalizedCategories('en').map((c) => c.name)).toContain('Law & Legislation');
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });
});

describe('yalnızca Türkçe ilçe rehberleri', () => {
  it('rehberler Türkçe indekslenir, en/ru/ar sürümleri noindex kalır', () => {
    expect(TR_ONLY_BLOG_SLUGS.length).toBe(12);
    for (const slug of TR_ONLY_BLOG_SLUGS) {
      expect(POSTS.some((p) => p.slug === slug), slug).toBe(true);
      expect(isIndexable(`/blog/${slug}`, 'tr'), slug).toBe(true);
      for (const lang of LANGS) expect(isIndexable(`/blog/${slug}`, lang), `${lang} ${slug}`).toBe(false);
    }
  });
});
