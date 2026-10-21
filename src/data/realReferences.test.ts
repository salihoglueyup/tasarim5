import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { REAL_REFERENCES, SECTORS, countBySector, featuredReferences, monogram } from './realReferences';
import { DISTRICTS } from '@/lib/blog/blogI18n';
import logos from './referenceLogos.json';

describe('gerçek referans listesi', () => {
  it('slug değerleri benzersiz ve sektörler geçerli', () => {
    const slugs = REAL_REFERENCES.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const r of REAL_REFERENCES) expect(SECTORS).toContain(r.sector);
  });

  it('ilçeler İstanbul\'un 39 ilçesinden biri (veya boş: çok bölgeli)', () => {
    for (const r of REAL_REFERENCES) {
      if (r.district) expect(DISTRICTS as readonly string[], r.slug).toContain(r.district);
    }
  });

  it('kapanan/devredilen veya portföy dışı firmalar listede yok', () => {
    const all = REAL_REFERENCES.map((r) => r.name).join('\n');
    for (const banned of [/Amk Gazetesi/, /Remedy/, /Hyve/, /Mehmet Toprak/, /Rönesans/, /Acıbadem Sağlık/, /Ağaoğlu/]) {
      expect(all).not.toMatch(banned);
    }
  });

  it('doğrulanamayan alanlar (yorum, puan, daire/çalışan sayısı) veri modelinde yok', () => {
    const keys = new Set(REAL_REFERENCES.flatMap((r) => Object.keys(r)));
    for (const k of ['testimonialText', 'testimonialAuthor', 'rating', 'units', 'staff', 'stats']) expect(keys.has(k)).toBe(false);
  });

  it('sektör sayıları toplamı liste uzunluğuna eşit ve öne çıkanlar en az 8', () => {
    const c = countBySector();
    expect(Object.values(c).reduce((a, b) => a + b, 0)).toBe(REAL_REFERENCES.length);
    expect(featuredReferences(12).length).toBeGreaterThanOrEqual(8);
  });

  it('logo manifesti yalnızca var olan slug ve dosyalara işaret eder', () => {
    const slugs = new Set(REAL_REFERENCES.map((r) => r.slug));
    for (const [slug, file] of Object.entries(logos as Record<string, string>)) {
      expect(slugs.has(slug), `${slug} listede yok`).toBe(true);
      expect(fs.existsSync(path.resolve(process.cwd(), 'public', file.replace(/^\//, ''))), file).toBe(true);
    }
  });

  it('monogram iki harf üretir', () => {
    expect(monogram('Dome Residence')).toBe('DR');
    expect(monogram('Reimco')).toBe('R');
  });
});

describe('referans sayfaları: uydurma içerik geri gelmesin', () => {
  const read = (p: string) => fs.readFileSync(path.resolve(process.cwd(), p), 'utf8');
  it('hizmet ve ana sayfa yorum bileşenleri gerçek referans şeridi gösterir (Review şeması yok)', () => {
    for (const f of [
      'src/components/sections/testimonials/ServiceTestimonialsShared.tsx',
      'src/components/sections/testimonials/TestimonialSlider.tsx',
    ]) {
      const s = read(f);
      expect(s).toContain('ReferenceBand');
      expect(s).not.toContain('ReviewListSeo');
      expect(s).not.toMatch(/unsplash/i);
    }
  });
  it('sitemap referans detay ve başarı hikâyesi URL\'leri üretmez', () => {
    const s = read('src/app/sitemap.ts');
    expect(s).not.toContain('/basari-hikayeleri');
    expect(s).not.toContain('referenceRoutes');
  });
  it('ai-knowledge doğrulanamayan personel ve memnuniyet oranı yayınlamaz', () => {
    const s = read('src/app/api/ai-knowledge/route.ts');
    expect(s).not.toContain('totalStaff');
    expect(s).not.toContain('satisfactionRate');
  });
});
