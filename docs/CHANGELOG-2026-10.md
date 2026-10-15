# Değişiklik Günlüğü — Ekim 2026 (içerik temizliği, SEO, çok dilli içerik)

Kapsam: `b35a8618` (blog denetimi) sonrasındaki 22 commit (`60bd3631` … `17d2ecd9`). Hepsi `origin/main` ve `alogroup/main` üzerinde.
İlke: doğrulanamayan iddia yok, tek kaynaktan doğrulanmış veri (`src/lib/facts.ts`), yalnızca gerçekten çevrilmiş sayfalar indekslenir.

## 1. Şablon içeriğin kaldırılması ve yönlendirme

| Commit | Ne yapıldı | Neden |
|---|---|---|
| `7cb51a18` | 96 "ilçe × hizmet" şablon blog yazısı kaldırıldı; eski adresler `/bolgeler/<ilçe>/<hizmet>` sayfasına kalıcı (308) yönlendiriliyor. Çeviri belleği 1.224 → 898 girişe indi. | Yazılar %60+ birbirinin kopyasıydı; arama sonuçlarında tekrar/zayıf içerik riski. |
| `15faf9b6` | Kaldırılan slug'lar DB sorgularından (sitemap, RSS, haber/görsel sitemap, blog listeleri, arama önerisi) dışlandı. Tekrar eden KMK 37/45 sözlük maddeleri birleştirildi. | Prod DB'de eski yazılar duruyordu; sitemap'te yönlendirilen URL'ler görünüyordu (99 tekrarlı başlık grubu → 3). |

## 2. Doğrulanamayan iddiaların temizliği

| Commit | Ne yapıldı |
|---|---|
| `ec9f7a70` | Blog yazılarından "7/24", "ISO 41001", "200+ referans" ifadeleri kaldırıldı; değişen 26 cümlenin en/ru/ar çevirisi güncellendi. |
| `7f210b0b` | Gecikme tazminatı ve gider paylaşımı ifadeleri KMK m.20'ye uyarlandı (eklenen bir cümle m.20'nin emredici yapısıyla çelişiyordu). |
| `65eaa39d` | **İkinci dalga:** uydurma fiyat paketleri ve `AggregateOffer` şeması, sahte yorum bankası, "%30 tasarruf", "%0 reaktif ceza garantisi", "Kanıtlanmış Tasarruf", "%99 tahsilat", portföy rakamları (28.000+ daire, 1,2 milyon m², 350+ site), "45 dk/15–20 dk" SLA ifadeleri, "TSE Onaylı" rozeti, "istihdam garantisi" kaldırıldı. `sourceHonesty` koruma testi bu kalıpları yasaklayacak şekilde genişletildi. |
| `fb582fb6` ve diğer içerik commit'leri | Eklenen her hukuki ifade "güncel mevzuatı teyit edin / hukuk danışmanına başvurun" kalıbıyla yazıldı. |

## 3. Blog: ilçe rehberleri

| Commit | Ne yapıldı |
|---|---|
| `60bd3631` | 12 ilçe için özgün "Site ve Apartman Yönetimi Rehberi (2026)" (Türkçe). Veri: ilçe verisi, gerçek referanslar, yakaya göre SLA ve dağıtım şirketleri. |
| `32e5d781` | Rehberler 790–940 kelimeye çıktı (yıllık takvim, ilçeye özgü bölümler); ilçe sayfalarından rehbere link kartı; tanımsız CSS değişkeni düzeltmesi (`7a9cc37a`). |
| `187d2639` | Her rehbere ilçeye özgü 4 senaryo (toplam 48): 885–1.101 kelime, benzerlik %25–31. |
| `a323cf16`, `38507166` | 12 rehberin tamamı en/ru/ar'a çevrildi ve indekslenebilir. Çeviri aracı rehber anlık görüntüsünü (`guides.snapshot.json`) okuyor; anlık görüntü kaynakla farklılaşırsa test kırılıyor. |

## 4. Blog: editoryal yazıların derinleştirilmesi

| Commit | Yazılar |
|---|---|
| `b64b5e61` | İşletme projesi, aidat gecikmesi, yönetim şirketi seçimi |
| `8178d560` | 5188 güvenlik yazıları, yönetici hakları, siteye geçiş |
| `b5c7be32` | Sanayi İSG, mega site, şirket seçimi, HVAC, havuz kimyasalı, yasal sorumluluklar |
| `78d128e3` | Concierge, kentsel dönüşüm, soft/hard hizmetler, faydalar, aidat icra |
| `fb582fb6` | Yönetim planı, 7579 değişikliği, entegre yönetim |
| `17d2ecd9` | 9 yazı daha: akış, kontrol listeleri, risk adımları |

Her turda yeni cümleler en/ru/ar'a çevrildi; çeviri belleği ve `coverage.json` güncellendi. Ortalama kelime 536 → 579; "birleştir/sil adayı" 0.

## 5. SSS ve sözlük

| Commit | Ne yapıldı |
|---|---|
| `05deed59` | Veritabanındaki 523 permütasyonlu şablon SSS yerine elle yazılmış 46 soru (4 dilde, statik). Liste `/api/faqs` ile sayfalanıyor. Blog listesi payload'ı küçüldü (HTML 558 → 257 KB), SSS HTML 1,0 MB → 348 KB. Çevirisi olmayan rehberler en/ru/ar listesinden gizlendi. |
| `99eed8a6` | Anasayfa SSS'i yeni kaynaktan; avukat kontrol listesi (`docs/hukuk-kontrol-listesi-2026-10.md`). |
| `6123cc32`, `00d71223` | 57 sözlük terimine ayrıntılı açıklama, "dikkat edilecekler" ve SSS (`FAQPage` şemalı). |
| `edcf7fa9` | Çevrilmiş 20 terimin ayrıntıları en/ru/ar sayfalarında. |
| (plan) | `docs/ai-overviews-plani-2026-10.md`: 30 hedef sorgu, içerik standardı, takvim. |

## 6. Test ve koruma

- `sourceHonesty.test.ts`: yasaklı iddia kalıpları genişletildi.
- `faqCurated.test.ts`, `dictionaryDetails*.test.ts`: SSS ve sözlük yapısı/çeviri tutarlılığı.
- `blogI18n.test.ts`: çevrilmiş/yalnızca Türkçe rehber ayrımı, anlık görüntü eşleşmesi.
- Bilinen tek kırık test: `wave5Batch3.test.ts` (Faz 118, kullanıcının bekleyen OG görseli değişikliği nedeniyle).

## 7. Bekleyen işler (kod dışı)

1. Avukat kontrolü: özellikle "7 günlük itiraz süresi 7579 sonrası geçerli mi?" (sitede hâlâ geçen yerler listede).
2. Prod: deploy + `prisma/data/claims-cleanup-2026-10.sql` (gitignore'da; sunucuya elle kopyalanmalı) + GSC'de sitemap yeniden gönderme.
3. RU/AR çevirilerin ana dil konuşuru tarafından gözden geçirilmesi.
4. Kullanıcıya ait bekleyen değişiklikler (`layout.tsx` OG, `seo.ts`, `og-aloyonetim.*`) bilerek hiçbir commit'e alınmadı.
