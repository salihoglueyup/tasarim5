# Değişiklik Günlüğü — Ekim 2026 (3. paket: ilçe rehberleri 2. dalga, hizmet rehberleri, marka netliği, mobil)

Kapsam: `v2026.10b-yerel-icerik-mobil-semrush` etiketinden sonraki 5 commit (`4cff3013` … `941a9af2`). Hepsi `origin/main` ve `alogroup/main` üzerinde.
İlke aynı: doğrulanamayan iddia yok; yasal ifadeler güncel mevzuat ve Valilik/avukat teyidine bağlanır.

| Commit | Ne yapıldı |
|---|---|
| `4cff3013` | `docs/DEPLOY-KONTROL-LISTESI-2026-10.md`: yedek, kod, DB/SQL, doğrulama, GSC ve Semrush adımları; production build (`next build --webpack`) hatasız tamamlandı. |
| `2158313a` | 6 yeni ilçe rehberi (Büyükçekmece, Gaziosmanpaşa, Sancaktepe, Avcılar, Tuzla, Zeytinburnu), en/ru/ar; rehber sayısı 18 → 24; 234 yeni cümle çevrildi. İlçe hizmet sayfalarındaki yerel özet bu ilçelerde de görünür. |
| `ba3f5a9d` | 10 hizmet rehberi yazısı derinleştirildi (temizlik, hukuk/icra ×2, tesis yönetimi, haşere, peyzaj, teknik bakım, havuz, güvenlik yönetimi, 5188 eğitim): sözleşmede aranacaklar, kontrol listeleri ve SSS; 130 yeni cümle çevrildi. |
| `c0f28d45` | SSS: "Alo Yönetim kimdir, diğer 'Alo' adlı kuruluşlarla ilişkisi nedir?" (4 dil, toplam 49 madde); GSC'deki "alo güvenlik / alo ik / alo holding" sorgularındaki marka karışıklığına karşı resmî unvan, merkez ve doğrulanmış grup şirketi bilgisi. |
| `941a9af2` | Dokunmatik cihazlarda kart, altbilgi ve gezinti bağlantılarına 32px tıklama alanı (`pointer: coarse`). |

## Ölçümler
- Çeviri belleği 2751/2751; 67/67 yazı tam çevrilmiş; tam test paketi 151 dosya / 1090 test geçiyor.
- Metin/HTML oranı (Semrush uyarısı, 87 sayfa): ölçüm %3–9; HTML'in büyük bölümü Next.js RSC yükü (51–130 KB), JSON-LD (23–63 KB) ve Tailwind işaretlemesi. Kök neden yapısal olduğu için bu pakette değiştirilmedi (içerik artışı oranı kademeli yükseltir).

## Bekleyen işler
Bkz. `docs/DEPLOY-KONTROL-LISTESI-2026-10.md` ve `docs/CHANGELOG-2026-10b.md` §7. `numberOfEmployees` (90) kesin teyit sonrası güncellenecek.
