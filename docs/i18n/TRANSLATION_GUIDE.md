# 📝 Çeviri Ekleme Rehberi

Bu rehber, uygulamaya **yeni bir Türkçe metin** ekleyip tüm dillere çevirme adımlarını anlatır.

---

## Yöntem 1 — Otomatik (Önerilen)

### Adım 1: Türkçe metni ekle
`src/i18n/locales/tr/common.json` dosyasına yeni anahtarı ekle:
```json
{
  "services": {
    "yeni_hizmet": {
      "title": "Yeni Hizmet Başlığı",
      "description": "Hizmetin açıklaması buraya gelir."
    }
  }
}
```

### Adım 2: Otomatik çeviri scriptini çalıştır
```bash
node scripts/translate.mjs
```

Script şunları yapar:
- `tr/common.json`'daki yeni anahtarları tespit eder
- Google Translate API ile İngilizce, Rusça, Arapça'ya çevirir
- Diğer dil dosyalarını günceller (mevcut çevirilere dokunmaz)

### Adım 3: Çevirileri kontrol et
`en/common.json`, `ru/common.json`, `ar/common.json` dosyalarını açıp çevirilerin doğru olduğunu kontrol et.
Özellikle teknik terimler için manuel düzeltme gerekebilir.

### Adım 4: Component'ta kullan
```typescript
// Server Component
const dict = await getDictionary(lang);
<h2>{dict.services.yeni_hizmet.title}</h2>

// Client Component
const { t } = useLanguage();
<h2>{t('services.yeni_hizmet.title')}</h2>
```

---

## Yöntem 2 — Manuel

Tüm dil dosyalarına tek tek eklemek istersen:

```bash
# Türkçe (kaynak)
src/i18n/locales/tr/common.json

# İngilizce
src/i18n/locales/en/common.json

# Rusça
src/i18n/locales/ru/common.json

# Arapça
src/i18n/locales/ar/common.json
```

Her dosyaya aynı anahtar yapısını ekle, sadece metni ilgili dilde yaz.

---

## Anahtar İsimlendirme Kuralları

✅ **Doğru:**
```json
"security_calculator": { "title": "...", "button_text": "..." }
```

❌ **Yanlış:**
```json
"SecurityCalculator": { "Title": "...", "buttonText": "..." }
```

- Küçük harf + alt çizgi kullan (`snake_case`)
- Anlamlı, kısa isimler seç
- Sayfa/bölüm adını prefix olarak kullan (`hero_`, `nav_`, `footer_`)

---

## Yaygın Kullanım Örnekleri

### Navigasyon
```json
// tr/common.json
"nav": {
  "home": "Ana Sayfa",
  "about": "Hakkımızda"
}
```

### Buton Metinleri
```json
"cta": {
  "get_quote": "Ücretsiz Teklif Al",
  "contact_us": "Bize Ulaşın",
  "learn_more": "Daha Fazla Bilgi"
}
```

### Form Alanları
```json
"form": {
  "name_label": "Ad Soyad",
  "name_placeholder": "Adınızı giriniz",
  "submit": "Gönder"
}
```

---

## Sık Yapılan Hatalar

### ❌ Anahtar eksik diğer dillerde
Otomatik script çalıştırılmadan deploy edilirse, o dilde metin görünmez (undefined).
**Çözüm:** Her zaman `node scripts/translate.mjs` çalıştır.

### ❌ HTML içeren çeviriler
```json
// ❌ Yapma
"title": "En <span>İyi</span> Hizmet"

// ✅ Yap — HTML'i component'ta oluştur
"title": "En İyi Hizmet"
```

### ❌ Değişken içeren metinler
```json
// ❌ Yapma
"count": "{{count}} hizmet"

// ✅ Yap — String interpolation kullan
"count_prefix": "toplam",
"count_suffix": "hizmet"
```

---

## Script Konfigürasyonu

`scripts/translate.mjs` dosyasını düzenleyerek:
- Kaynak dil değiştirebilirsin (varsayılan: `tr`)
- Hedef dilleri ekleyip çıkarabilirsin
- Çeviri sağlayıcısını değiştirebilirsin

---

**Önceki:** [README.md](README.md) — i18n mimarisi
**Ana Sayfa:** [../../docs/README.md](../../docs/README.md)
