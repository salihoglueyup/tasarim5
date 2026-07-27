# 🤝 Katkı Kılavuzu

## Genel Prensipler

- **Önce planla:** Büyük değişiklikler için önce bir issue veya draft PR aç
- **Küçük commit'ler:** Her commit tek bir sorunu çözer
- **Test et:** Değişiklikten önce ve sonra `npm run build` çalıştır
- **Türkçe içerik:** UI metinleri ve yorum satırları Türkçe olabilir; kod İngilizce

---

## Commit Mesajı Formatı

[Conventional Commits](https://www.conventionalcommits.org/) standardını kullanıyoruz:

```
<tip>(<kapsam>): <kısa açıklama>

[opsiyonel gövde]
```

### Tip Listesi
| Tip | Kullanım |
|---|---|
| `feat` | Yeni özellik |
| `fix` | Hata düzeltme |
| `perf` | Performans iyileştirme |
| `style` | Sadece görsel/CSS değişikliği |
| `refactor` | Yeniden düzenleme (davranış değişmez) |
| `docs` | Sadece dokümantasyon |
| `chore` | Yapılandırma, bağımlılık, araç |
| `test` | Test ekleme/güncelleme |

### Örnekler
```bash
feat(blog): add related articles component
fix(form): handle empty phone field validation
perf(hero): remove blocking poster image
docs(dev): update deployment guide for Vercel
chore: update eslint config
style(bolgeler): migrate from blue to slate palette
```

---

## Dallanma (Branch) Stratejisi

```
main                    ← Production (koruma altında)
  └── seo/master-plan   ← SEO/içerik geliştirme
  └── feat/yeni-ozellik ← Özellik geliştirme
  └── fix/hata-adi      ← Hata düzeltme
  └── chore/temizlik    ← Temizlik/refactor
```

---

## Kod Standartları

### TypeScript
- `any` kullanmaktan kaçın; mümkünse tipi belirt
- Server Component vs Client Component ayrımına dikkat et — `'use client'` gerekmedikçe ekleme
- Yeni sayfa eklerken `generateMetadata()` fonksiyonunu unutma

### Tailwind CSS
- **Mavi (blue-*) renk sınıfı kullanma** — Proje paleti Slate/Titanium'dur
- Renk paleti kuralları:
  ```
  ✅ bg-slate-900, text-white, border-slate-900
  ✅ dark:bg-white, dark:text-slate-950
  ✅ text-emerald-600 (vurgu rengi)
  ❌ bg-blue-600, text-blue-500, border-blue-400
  ```
- Tasarım token'ları için `var(--color-*)` CSS değişkenlerini kullan

### Framer Motion
- `LazyMotion` içinde `motion.*` yerine `m.*` kullan (tree shaking için)
- `prefers-reduced-motion` desteğini kontrol et

### i18n
- Yeni UI metinleri `src/lib/translations.ts`'e eklenir (hem `tr` hem `en`)
- Sayfalar `/[lang]/` altında yer alır

---

## Pull Request Süreci

1. Branch oluştur: `git checkout -b feat/ozellik-adi`
2. Değişikliklerini yap
3. Build al: `npm run build` (288 rota hatasız derlenmelidir)
4. TypeScript kontrol: `npx tsc --noEmit`
5. Commit + push: `git push origin feat/ozellik-adi`
6. GitHub'da PR aç → kısa açıklama yaz
7. Preview deploy URL'ini kontrol et (Vercel otomatik oluşturur)

---

## Sık Kullanılan Yollar

| Amaç | Dosya/Klasör |
|---|---|
| Yeni sayfa | `src/app/[lang]/<slug>/page.tsx` |
| Yeni bileşen | `src/components/<kategori>/` |
| UI çevirisi | `src/lib/translations.ts` |
| Schema / JSON-LD | `src/lib/schemas.ts` |
| Lead/form API | `src/app/api/lead/route.ts` |
| Global stiller | `src/app/globals.css` |
| Görseller | `public/images/` |
