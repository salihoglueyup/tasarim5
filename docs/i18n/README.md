# 🌍 Çoklu Dil (i18n) Mimarisi

## Genel Bakış

Alo Yönetim **4 dili** destekler:

| Dil | Kod | Yön |
|---|---|---|
| Türkçe | `tr` | LTR (Varsayılan) |
| İngilizce | `en` | LTR |
| Rusça | `ru` | LTR |
| Arapça | `ar` | RTL |

---

## Dosya Yapısı

```
src/
├── i18n/
│   ├── locales/
│   │   ├── tr/
│   │   │   └── common.json     ← Türkçe çeviriler (kaynak)
│   │   ├── en/
│   │   │   └── common.json     ← İngilizce çeviriler
│   │   ├── ru/
│   │   │   └── common.json     ← Rusça çeviriler
│   │   └── ar/
│   │       └── common.json     ← Arapça çeviriler
│   └── getDictionary.ts        ← Server-side çeviri yükleyici
├── context/
│   └── LanguageContext.tsx     ← Client-side dil context'i
└── middleware.ts               ← URL tabanlı dil tespiti (proxy)
```

---

## URL Yapısı

Dil kodu URL'nin başında yer alır:
```
aloyonetim.com.tr/tr/hizmetler      ← Türkçe
aloyonetim.com.tr/en/hizmetler      ← İngilizce
aloyonetim.com.tr/ru/hizmetler      ← Rusça
aloyonetim.com.tr/ar/hizmetler      ← Arapça
```

`/` (kök) → Tarayıcı diline göre otomatik yönlendirme (`Accept-Language`)

---

## Çeviri Sistemi

### Server Component'larda (Next.js Server Side)
```typescript
import { getDictionary } from '@/i18n/getDictionary';

const dict = await getDictionary(lang);
// dict.hero.title, dict.services.cleaning, vs.
```

### Client Component'larda
```typescript
import { useLanguage } from '@/context/LanguageContext';

const { t, lang } = useLanguage();
// t('hero.title'), lang === 'tr'
```

### Anahtar Yapısı (`common.json`)
```json
{
  "nav": { "home": "Ana Sayfa", "services": "Hizmetler" },
  "hero": { "title": "...", "subtitle": "..." },
  "services": { "cleaning": { "title": "...", "desc": "..." } }
}
```

---

## Otomatik Çeviri Scripti

`scripts/translate.mjs` — Türkçe'de yeni anahtarlar eklendiğinde diğer dillere otomatik çevirir:

```bash
node scripts/translate.mjs
```

- Sadece eksik anahtarları çevirir (mevcut çevirilere dokunmaz)
- Google Translate API kullanır
- Türkçe → İngilizce, Rusça, Arapça

---

## RTL (Arapça) Desteği

`src/app/[lang]/layout.tsx`:
```typescript
const isRtl = lang === 'ar';
// <html dir={isRtl ? 'rtl' : 'ltr'}>
// Font: Cairo (arapça subset)
```

---

## Veritabanı Modelleri — Çoklu Dil

Veritabanı tabloları çoklu dili ayrı kolonlarla saklar:
```prisma
model Faq {
  question    String   // Türkçe
  question_en String?  // İngilizce
  question_ru String?  // Rusça
  question_ar String?  // Arapça
  answer      String
  answer_en   String?
  answer_ru   String?
  answer_ar   String?
}
```

API katmanı `lang` parametresine göre doğru kolonu döner.

---

**Sonraki:** [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md) — Yeni çeviri nasıl eklenir
