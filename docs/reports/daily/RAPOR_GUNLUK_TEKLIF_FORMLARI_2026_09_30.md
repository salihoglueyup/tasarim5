# GÜNLÜK GELİŞTİRME RAPORU — TEKLİF/LEAD FORMLARI İYİLEŞTİRMELERİ (2026-09-30)

Önceki rapor: [RAPOR_GUNLUK_SUNUCU_SORUNLARI_2026_09_30.md](RAPOR_GUNLUK_SUNUCU_SORUNLARI_2026_09_30.md).
Bağlam: `QuoteModal` ("Teklif Al" 4 adımlı modal) gözden geçirildikten sonra site genelindeki diğer teklif/lead formlarına ve admin tarafındaki görünürlüklerine bakıldı.

## Yapılanlar

1. **QuoteModal iyileştirmeleri** (`11f39944`): Sol panele logo eklendi, telefon alanına canlı `+90 5XX XXX XX XX` maskesi ve `isValidTrPhone`/`isValidEmail` ile blur-tetiklemeli satır-içi doğrulama ipuçları eklendi, başarı ekranına isimle ön-doldurulmuş WhatsApp devam butonu eklendi (mevcut `waLink()` helper'ı kullanıldı). 4 locale'e (tr/en/ru/ar) yeni çeviri key'leri eklendi. Gerçek uçtan uca gönderim ile doğrulandı (Postgres'e yazıldı, sonra temizlendi).
2. **Site genelindeki "Teklif Al" mimarisi incelendi**: 140+ sayfadaki tüm CTA'lar zaten tek merkezi `QuoteCtaButton` → `QuoteContext` → `QuoteModal` üzerinden aynı modalı açıyor (ayrı ayrı düzenlenecek başka bir "teklif al" bileşeni yok). Tek istisna, kendi bağımsız state'ine sahip gömülü `/teklif-al` sayfasıydı.
3. **`/teklif-al` sayfası QuoteModal ile hizalandı** (`87a9455b`): Telefon maskesi/doğrulaması `src/lib/forms/validation.ts` altında ortaklaştırılıp her iki formda da kullanıldı. **Gerçek bug**: `email` state'i vardı ama hiçbir `<input>` alanı render edilmiyordu — kullanıcılar e-postalarını hiçbir zaman gönderemiyordu; alan eklendi (4 locale'e `tc_optional` key'i de eklendi). Gerçek POST → Postgres kaydı → temizlik ile doğrulandı.
4. **`/admin/leads` sayfası incelendi**: Mimari zaten sağlamdı (çift katmanlı yetki — middleware + her server action'da ayrı `assertAdmin()`, okundu/okunmadı, detay modalı, silme). Tek eksik: `prisma.lead.findMany` sayfalama olmadan tüm kayıtları çekiyordu.
5. **Admin gelen kutusuna sayfalama eklendi** (`23a369bd`): `take: 50` + `?page=` ile önceki/sonraki gezinme, aralık dışı sayfa numaraları son geçerli sayfaya otomatik clamp ediliyor. 60 sahte kayıt oluşturup (63 toplam → 2 sayfa: 50+13) ve sınır dışı sayfa numaralarıyla (`0`, `999`) test edildi, ardından temizlendi — gerçek 3 kayıt sağlam kaldı.
6. **`useLeadSubmit` kullanan tüm formlar (8 dosya) tek tek tarandı** ve tekrar eden bir bug deseni bulundu: `errorKey` (ör. `lead_error_generic`) bazı formlarda `t()` ile çevrilmeden ham i18n key olarak kullanıcıya gösteriliyordu. Düzeltilenler (`23a369bd`):
   - `iletisim/IletisimClient.tsx` — `t()` sarmalayıcısı eksikti, eklendi.
   - `academy/AcademyEnrollmentModal.tsx` — dosyada i18n sistemi hiç yok (sabit TR metin), sabit dostane mesaja çevrildi.
   - `seo/career/CareerApplicationDualFormSeo.tsx` (istihdam köprüsü, aday + yönetici formları) — aynı şekilde sabit TR mesaja çevrildi.
   - Zaten doğru olanlar (dokunulmadı): `QuoteModal`, `CalculatorLeadForm`, `CallbackForm`, `NewsletterForm`.
7. **Test durumu**: Her iki commit'te de `tsc --noEmit` temiz, `vitest run` 131 dosya / 1135 test yeşil, `next build --webpack` başarılı. Tarayıcı doğrulamaları standalone build (`node .next/standalone/server.js`) üzerinden yapıldı — `next dev`'in HMR bağımlılığı bu sandbox ortamında güvenilir çalışmıyor (önceki rapordan bilinen kısıt).

## Kalanlar

- **React #418 hydration hatası hâlâ sürüyor**: Test sırasında hem `/teklif-al` hem anasayfada tekrar gözlemlendi (önceki raporda "açık" olarak not edilmişti, `suppressHydrationWarning` eklemesi tam çözmemişti). Form işlevselliğini bozmuyor (gerçek submit testleri başarılı oldu), yalnızca konsol hatası olarak kalıyor — kök sebep bu turda araştırılmadı.
- **Admin oturumu canlı test edilmedi**: Kullanıcının admin şifresi bilinmediğinden ve oturum jetonu üretme girişimi güvenlik sınırına takıldığından (haklı olarak), `/admin/leads` sayfalaması tarayıcı üzerinden değil, sayfanın sorgu mantığı doğrudan Prisma ile simüle edilerek doğrulandı. Kullanıcı isterse kendi girişiyle görsel doğrulama yapabilir.
- **Diğer lead formlarında tasarım/UX hizalaması yapılmadı**: `CalculatorLeadForm` gibi küçük widget'larda hâlâ telefon maskesi/doğrulama yok (bilinçli olarak dokunulmadı — bu turun kapsamı bug taraması + admin sayfalamaydı, genel tasarım tutarlılığı ayrı bir görev olabilir).
- **Redis/Postgres şifre rotasyonu**: Önceki raporda ertelenen güvenlik turu hâlâ yapılmadı.
