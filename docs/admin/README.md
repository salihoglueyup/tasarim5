# 🛠️ Admin Paneli Kullanım Rehberi

Alo Yönetim admin paneli, içerik yönetimi ve lead takibi için JWT korumalı bir arayüzdür.

## Giriş

URL: `https://aloyonetim.com.tr/tr/admin` (veya `/en/admin`)

Kimlik bilgileri `.env` dosyasındaki `ADMIN_EMAIL` ve `ADMIN_PASSWORD` ile belirlenir.

> ⚠️ **Güvenlik:** Admin paneline erişim JWT token ile korunur. Token 24 saat geçerlidir.
> Paylaşılmamalı, şifre güçlü tutulmalıdır.

---

## Modüller

### 1. 📬 Lead Yönetimi
`/admin/leads`

Siteden gelen tüm form başvurularını listeler.

| Alan | Açıklama |
|---|---|
| Tür | contact / callback / quote / newsletter |
| Ad, Telefon, E-posta | İletişim bilgileri |
| Mesaj | Form içeriği |
| Okundu | Okundu/okunmadı işareti |
| Tarih | Gelme zamanı |

**Akış:**
- Yeni lead geldiğinde → Telegram/E-posta bildirimi alırsın (env'de tanımlıysa)
- Admin panelinden "Okundu" işaretle
- Lead'i takip et → müşteri ol

---

### 2. 📝 Blog Yazıları
`/admin/blog/posts`

**Yeni Makale Ekle:**
1. Sağ üst → **"Yeni Yaz"** butonu
2. Formu doldur (başlık, slug, içerik, kategori, yazar, vb.)
3. **"Yayınla"** → site hemen güncellenir
4. **"Taslak"** → yayınlamadan kaydet

**Düzenle / Sil:**
- Listeden makaleyi bul → ✏️ Düzenle veya 🗑️ Sil
- Silme işlemi geri alınamaz!

Detaylar: [../content/GUIDELINES.md](../content/GUIDELINES.md)

---

### 3. 📂 Blog Kategorileri
`/admin/blog/categories`

- Yeni kategori ekle (ad + slug + renk)
- Mevcut kategoriyi düzenle
- Kategori silinirse o kategorideki yazılar "kategorisiz" kalır

---

### 4. 👤 Blog Yazarları
`/admin/blog/authors`

- Yazar ekle (ad, unvan, fotoğraf, bio)
- E-E-A-T sinyali için gerçek yazar bilgileri önemlidir

---

### 5. ❓ S.S.S Yönetimi
`/admin/faqs`

500+ soru veritabanı buradan yönetilir.

**Yeni Soru Ekle:**
1. **"Yeni Soru"** → Soru + Cevap gir
2. Kategori seç (Genel, Havuz, Güvenlik, Peyzaj, vb.)
3. 4 dili doldur: Türkçe, İngilizce, Rusça, Arapça
4. **"Kaydet"**

**Toplu Yükleme (alternatif — JSON ile):**
```bash
# JSON dosyasını düzenle:
prisma/data/all_faqs_export.json

# Sunucuda yükle:
npx tsx import-faqs.ts
```

---

### 6. 🏢 Referanslar
`/admin/references`

- Referans proje ekle (isim, fotoğraf, konum, hizmet türü)
- Galeri görüntüleme düzeni

---

### 7. 🤝 İş Ortakları
`/admin/partners`

- Ortak/tedarikçi logosu ekle
- Logo Ticker bileşeninde görünür

---

### 8. 🧮 Hesaplayıcı Ayarları
`/admin/calculator`

- Havuz, güvenlik, aidat, bakım hesaplayıcı parametreleri
- m² başına maliyet, işçilik ücretleri
- Değerler değiştiğinde hesaplayıcılar anında güncellenir

---

## Güvenlik Notları

- Admin şifresini düzenli değiştir
- Şifreyi kimseyle paylaşma
- Oturumu kapatmayı unutma (sağ üst → Çıkış)
- `.env` dosyasındaki `JWT_SECRET` en az 64 karakter rastgele string olmalı

## Şifre Değiştirme

`.env` dosyasında:
```bash
ADMIN_EMAIL=yeni@email.com
ADMIN_PASSWORD=yeni_guclu_sifre
```

Sonra `make restart` veya Docker yeniden başlat.

---

**İlgili:**
- [../dev/DATABASE.md](../dev/DATABASE.md) — Veritabanı yapısı
- [../content/GUIDELINES.md](../content/GUIDELINES.md) — Blog yazım kuralları
- [../architecture/LEAD_SYSTEM.md](../architecture/LEAD_SYSTEM.md) — Lead sistemi
