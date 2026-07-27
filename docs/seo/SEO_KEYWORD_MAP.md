# SEO Anahtar Kelime → Sayfa Eşleme Matrisi

> **Amaç (SEO Master Plan V4 — Faz 71/96):** Her indekslenebilir sayfaya **tek bir birincil
> keyword** atanır; aynı keyword birden fazla sayfada birincil olarak hedeflenmez
> (cannibalization önleme). İkincil/long-tail keyword'ler H2/H3, içerik gövdesi ve iç link
> anchor'larında kullanılır.
>
> Bu doküman title (Faz 72), meta description (Faz 73), H1 (Faz 74) ve alt başlık (Faz 75)
> kararlarının tek referansıdır. Yeni sayfa eklenince buraya bir satır eklenmelidir.

## Niyet (intent) lejantı
- **B** = Bilgi (informational) · **T** = Ticari (commercial) · **İ** = İşlem (transactional) · **N** = Navigasyon

---

## Çekirdek / kurumsal

| Sayfa | Birincil keyword | İkincil / long-tail | Niyet |
|-------|------------------|---------------------|-------|
| `/` | tesis yönetimi | bina yönetimi, site yönetimi, profesyonel apartman yönetimi | T |
| `/hakkimizda` | Alo Yönetim hakkında | tesis yönetim firması, kurumsal yönetim ekibi | N |
| `/kurumsal/vizyon-misyon` | vizyon ve misyon | kurumsal değerler, yönetim vizyonu | B |
| `/kurumsal/kalite-politikamiz` | kalite politikası | ISO 9001 tesis yönetimi, kalite belgeleri | B |
| `/kurumsal/surdurulebilirlik` | sürdürülebilir tesis yönetimi | yeşil bina, enerji verimliliği | B |
| `/referanslar` | tesis yönetimi referansları | yönetilen siteler, müşteri portföyü | T |
| `/basari-hikayeleri` | site yönetimi başarı hikayeleri | vaka çalışması, aidat tasarrufu örneği | T |

## Hizmetler (her biri benzersiz birincil keyword)

| Sayfa | Birincil keyword | İkincil / long-tail | Niyet |
|-------|------------------|---------------------|-------|
| `/hizmetler` | tesis yönetimi hizmetleri | bina yönetim hizmetleri, hizmet paketleri | T |
| `/hizmetler/guvenlik-yonetimi` | site güvenlik yönetimi | özel güvenlik hizmeti, 5188 güvenlik, kameralı güvenlik | T |
| `/hizmetler/tesis-yonetimi` | profesyonel tesis yönetimi | apartman yönetimi, plaza yönetimi, aidat yönetimi | T |
| `/hizmetler/temizlik-ve-hijyen` | site temizlik hizmeti | ortak alan temizliği, profesyonel temizlik şirketi | T |
| `/hizmetler/teknik-bakim` | teknik bakım hizmeti | asansör bakımı, jeneratör bakımı, periyodik bakım | T |
| `/hizmetler/peyzaj-ve-bahce-bakimi` | peyzaj ve bahçe bakımı | site bahçe bakımı, çevre düzenleme | T |
| `/hizmetler/havuz-bakimi-ve-hijyen` | havuz bakımı | havuz suyu hijyeni, havuz kimyasalı yönetimi | T |
| `/hizmetler/hasere-ve-dezenfeksiyon` | haşere ilaçlama | dezenfeksiyon hizmeti, pest kontrol | T |
| `/hizmetler/hukuk-ve-icra-danismanligi` | aidat icra takibi | kat mülkiyeti hukuku, yönetim hukuk danışmanlığı | T |

## Özel çözümler & kaynaklar

| Sayfa | Birincil keyword | İkincil / long-tail | Niyet |
|-------|------------------|---------------------|-------|
| `/sektorel-cozumler` | sektörel tesis yönetimi | rezidans yönetimi, AVM yönetimi, fabrika tesis yönetimi | T |
| `/guvenlik-akademisi` | özel güvenlik eğitimi | 5188 temel eğitim, güvenlik sertifikası | B/T |
| `/istihdam-koprusu` | güvenlik görevlisi iş ilanı | tesis yönetimi kariyer, güvenlik istihdam | İ |
| `/hesaplayici` | aidat hesaplama | yönetim ücreti hesaplama, aidat hesaplayıcı | B/T |
| `/sozluk` | site yönetimi terimleri | aidat nedir, demirbaş nedir, KMK sözlük | B |
| `/blog` | site yönetimi blog | tesis yönetimi rehberleri, aidat ipuçları | B |
| `/sss` | site yönetimi sıkça sorulan sorular | yönetim değişikliği, aidat soruları | B |

## Dönüşüm & iletişim

| Sayfa | Birincil keyword | İkincil / long-tail | Niyet |
|-------|------------------|---------------------|-------|
| `/iletisim` | tesis yönetimi iletişim | Alo Yönetim telefon, ofis adresi | N/İ |
| `/teklif-al` | tesis yönetimi teklif | ücretsiz yönetim teklifi, site yönetim fiyatı | İ |
| `/site-haritasi` | site haritası | — | N |

## Blog yazıları (birincil keyword — cluster; ayrıntı Bölüm G)

| Slug | Birincil keyword |
|------|------------------|
| `2024-aidat-artis-oranlari` | aidat artış oranları |
| `deprem-risk-analizi` | bina deprem risk analizi |
| `kentsel-donusum-surecleri` | kentsel dönüşüm süreci |
| `yuzme-havuzu-bakim-kimyasallari` | havuz bakım kimyasalları |

## Yasal (noindex adayı değil; düşük öncelik, thin)

`/kvkk-ve-aydinlatma-metni`, `/gizlilik-politikasi`, `/cerez-politikasi`, `/kullanim-sartlari`
— birincil keyword hedeflenmez; yalnızca marka + sayfa adı.

---

## Cannibalization notları (Faz 96)
- **"tesis yönetimi"** çekirdek keyword'ü ana sayfada (`/`) hedeflenir; `/hizmetler/tesis-yonetimi`
  daha spesifik **"profesyonel tesis yönetimi / apartman yönetimi"** varyasyonuna odaklanır.
- **"güvenlik"** iki sayfada var: `/hizmetler/guvenlik-yonetimi` (hizmet, ticari) vs
  `/guvenlik-akademisi` (eğitim, bilgi) — niyet farkı ile ayrışır, çakışma yok.
- **"aidat"**: `/hesaplayici` (araç), `/hizmetler/hukuk-ve-icra-danismanligi` (icra),
  `/sozluk#aidat` (tanım) — farklı niyet, farklı birincil keyword.

## Bölüm E ile ilişki (programatik yerel)
Yerel sayfalar (`/bolgeler/[ilce]/[hizmet]`) birincil keyword formülü: **`{hizmet} {ilçe}`**
(ör. "güvenlik yönetimi Kadıköy"). Bu, yukarıdaki genel hizmet keyword'leriyle çakışmaz çünkü
yerel niyet (near-me) taşır — canonical self-referencing kalır (Faz 118).
