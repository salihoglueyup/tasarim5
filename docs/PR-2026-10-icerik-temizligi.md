# PR taslağı: İçerik temizliği, SEO ve çok dilli içerik (Ekim 2026)

## Özet
Doğrulanamayan iddiaları ve şablon içeriği kaldırıp yerine özgün, çevrilmiş içerik koyan 22 commit.
Ayrıntılı commit tablosu: `docs/CHANGELOG-2026-10.md`.

## Neler değişti
- 96 şablon ilçe×hizmet blog yazısı kaldırıldı, kalıcı yönlendirme kuruldu.
- Uydurma fiyat, yorum, tasarruf, SLA ve portföy iddiaları temizlendi; koruma testi eklendi.
- 12 ilçe için özgün rehber (4 dilde), 29+ editoryal yazı derinleştirildi.
- 523 şablon SSS yerine 46 elle yazılmış, 4 dilli SSS; SSS/blog sayfa ağırlığı azaltıldı.
- 57 sözlük terimine ayrıntı (20'si 4 dilde).

## Test planı
- [x] `npx tsc --noEmit`
- [x] `npx vitest run` (1 bilinen kırık: Faz 118, OG görseli WIP)
- [x] `next build --webpack`
- [x] Yönlendirmeler ve çevrilmiş rehber sayfaları yerel sunucuda doğrulandı
- [ ] Prod deploy sonrası: SQL temizliği, GSC sitemap yeniden gönderimi
- [ ] Avukat kontrolü (`docs/hukuk-kontrol-listesi-2026-10.md`)

## Riskler
- Eski blog URL'leri 308 ile yönleniyor; GSC'de kısa süreli dalgalanma olabilir.
- Hukuki ifadeler avukat onayı bekliyor (özellikle m.37 itiraz süresi).
