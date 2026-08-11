# 📝 İçerik Yönetişim Dokümanı (Content Guidelines)

> **Amaç (SEO Master Plan V4 — Faz 180):** Blog içeriğinde tutarlı kalite, SEO ve schema
> standardı sağlamak. Her yeni makale yayın öncesi bu checklist'ten geçer.

---

## 1. Blog Sistemi — Teknik Akış

Blog yazıları **Admin panelinden** veritabanına eklenir. `src/data/posts.ts` dosyası artık kullanılmamaktadır.

### Yeni Makale Ekleme Adımları

1. **Admin paneline gir:** `https://aloyonetim.com.tr/tr/admin`
2. **Blog → Yazılar → Yeni Yaz** tıkla
3. Aşağıdaki alanları doldur:

| Alan | Açıklama | Zorunlu |
|---|---|---|
| `slug` | URL dostu, keyword'lü, tireli, ASCII | ✅ |
| `title` | Başlık (≤60 karakter, keyword içermeli) | ✅ |
| `description` | Meta açıklama (70–160 karakter, CTA'lı) | ✅ |
| `category` | Sistemdeki kategori slug'larından biri | ✅ |
| `tags` | Virgülle ayrılmış etiketler | ✅ |
| `author` | Sistemdeki yazar slug'larından biri | ✅ |
| `pillar` | İlgili hizmet sayfası yolu (cluster → pillar iç link) | ✅ |
| `tldr` | 2-3 cümle kendi kendine yeten özet (AI/snippet) | ✅ |
| `image` | Kapak görseli URL'si | ✅ |
| `content` | Tiptap editörden JSON bloklar | ✅ |
| `published` | Yayınla / Taslak olarak sakla | ✅ |
| `datePublished` | Yayın tarihi | ✅ |

### İçerik Blokları (Tiptap Editör)

Editörde kullanılabilecek blok tipleri:
- `p` — Paragraf
- `h2` / `h3` — Başlıklar (H1 otomatik üretilir, editörde H2'den başla)
- `ul` / `ol` — Listeler
- `quote` — Alıntı bloğu
- `cta` — Çağrı aksiyonu (iletişim, teklif)

**Eklendiğinde otomatik gelenler:** Sitemap girişi, RSS öğesi, kategori/etiket/yazar arşivinde listelenme, related posts, Article + Person schema, breadcrumb, okuma süresi.

---

## 2. Yayın Öncesi SEO Checklist

- [ ] `slug` ASCII, tireli, keyword'lü; mevcut bir slug ile çakışmıyor
- [ ] `title` ≤ 60 karakter, birincil keyword içeriyor (Faz 72)
- [ ] `description` 70–160 karakter, benzersiz, CTA'lı (Faz 73)
- [ ] Editörde tek H2'den başlayan mantıklı başlık hiyerarşisi (H2/H3, H1 otomatik) (Faz 74/75)
- [ ] Birincil keyword [CLUSTERS.md](CLUSTERS.md)'de tek makaleye atanmış (cannibalization yok — Faz 173/96)
- [ ] `pillar` doğru; en az 3 iç link (pillar + related + sözlük/otomatik — Faz 174)
- [ ] `tldr` mevcut ve doğru (Faz 134)
- [ ] En az 1 CTA bloğu — Faz 87
- [ ] Görsel `image` alakalı; alt metin = başlık
- [ ] İddialı bilgide otoriter atıf (KMK, 5188 vb. — Faz 95)
- [ ] Uzun rehberlerde 1000+ kelime, kapsamlı (Faz 76/165)

---

## 3. Yazım Stili

- Kısa paragraflar (≤ 3-4 cümle), taranabilir (Faz 88)
- Soru formatlı H2'ler (PAA/AI hedefi — Faz 142): "… nasıl yapılır?", "… nedir?"
- Somut, atıflı veri; abartısız ve doğru (Faz 136)
- Doğal dil; anahtar kelime doldurmadan

---

## 4. Schema Zorunlulukları

Her makalede (otomatik): `BlogPosting` (headline, author Person, datePublished/dateModified,
image, publisher, articleSection, keywords, mainEntityOfPage), `BreadcrumbList`, `WebPage`
(+ speakable), yazar `Person`.

Rich Results Test ile doğrula: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)

---

## 5. Güncelleme Döngüsü (Faz 172)

- Her makale en geç **12 ayda bir** gözden geçirilir; veriler ve `dateModified` güncellenir (Admin panel → Düzenle)
- Düşük performanslı makaleler (GSC → Performans) iyileştirilir veya benzerleriyle birleştirilir (Faz 179)
- Mevsimsel içerikler sezon öncesi tazelenir — bkz. [CALENDAR.md](CALENDAR.md)

---

## 6. Kategori & Yazar Yönetimi

### Kategoriler Ekle/Düzenle
Admin paneli → Blog → Kategoriler

### Yazar Ekle/Düzenle
Admin paneli → Blog → Yazarlar

> **Not:** Yeni kategori veya yazar eklemek için Admin paneli kullanılır.
> Kod tarafında değişiklik gerekmez — tüm veriler veritabanında tutulur.
