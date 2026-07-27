# İçerik Yönetişim Dokümanı (Content Guidelines)

> **Amaç (SEO Master Plan V4 — Faz 180):** Blog içeriğinde tutarlı kalite, SEO ve schema
> standardı sağlamak. Her yeni makale yayın öncesi bu checklist'ten geçer.

## 1. Teknik akış (yeni makale)
Yeni makale `src/data/posts.ts` içindeki `POSTS` dizisine bir `Post` nesnesi olarak eklenir:

```ts
{
  slug, title, description, category, tags, author,
  datePublished, dateModified?, image, pillar, tldr, content: PostBlock[]
}
```

- `slug`: ASCII, tireli, keyword'lü (Faz 89). Mevcut bir slug ile çakışmamalı.
- `category`: `CATEGORIES` slug'larından biri (hukuk/guvenlik/teknik/yonetim).
- `author`: `AUTHORS` slug'larından biri (E-E-A-T).
- `pillar`: ilgili hizmet sayfası yolu (cluster → pillar iç link).
- `tldr`: 2-3 cümle, kendi kendine yeten özet (AI/snippet — Faz 134).
- `content`: `PostBlock[]` (`p`/`h2`/`h3`/`ul`/`ol`/`quote`/`cta`).

Eklendiğinde otomatik gelenler: sitemap girişi, RSS öğesi, kategori/etiket/yazar arşivinde
listelenme, related posts, Article + Person schema, breadcrumb, okuma süresi, otomatik iç
linkleme.

## 2. Yayın öncesi SEO checklist
- [ ] `title` ≤ 60 karakter, birincil keyword içeriyor (Faz 72)
- [ ] `description` 70–160 karakter, benzersiz, CTA'lı (Faz 73)
- [ ] Tek H1 (PageHeader) + mantıklı H2/H3 hiyerarşisi (Faz 74/75)
- [ ] Birincil keyword [CONTENT_CLUSTERS.md](CONTENT_CLUSTERS.md)'de tek makaleye atanmış
      (cannibalization yok — Faz 173/96)
- [ ] `pillar` doğru; en az 3 iç link (pillar + related + sözlük/otomatik — Faz 174)
- [ ] `tldr` mevcut ve doğru (Faz 134)
- [ ] En az 1 CTA bloğu (`cta`) — Faz 87
- [ ] Görsel `image` alakalı; alt metin = başlık
- [ ] İddialı bilgide otoriter atıf (KMK, 5188 vb. — Faz 95)
- [ ] Uzun rehberlerde 1000+ kelime, kapsamlı (Faz 76/165)

## 3. Yazım stili
- Kısa paragraflar (≤ 3-4 cümle), taranabilir (Faz 88).
- Soru formatlı H2'ler (PAA/AI hedefi — Faz 142): "… nasıl yapılır?", "… nedir?".
- Somut, atıflı veri; abartısız ve doğru (Faz 136).
- Doğal dil; anahtar kelime doldurmadan.

## 4. Schema zorunlulukları
Her makalede (otomatik): `BlogPosting` (headline, author Person, datePublished/dateModified,
image, publisher, articleSection, keywords, mainEntityOfPage), `BreadcrumbList`, `WebPage`
(+ speakable), yazar `Person`. Rich Results Test ile doğrulanmalı (Faz 69/70).

## 5. Güncelleme döngüsü (Faz 172)
- Her makale en geç 12 ayda bir gözden geçirilir; veriler ve `dateModified` güncellenir.
- Düşük performanslı makaleler (GSC) iyileştirilir veya benzerleriyle birleştirilir (Faz 179).
- Mevsimsel içerikler sezon öncesi tazelenir (Faz 170).
