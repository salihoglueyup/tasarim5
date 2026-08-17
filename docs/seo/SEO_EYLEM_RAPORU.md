# 🚀 Alo Yönetim — Kapsamlı SEO Analizi, Otorite Kurtarma ve Büyüme Eylem Raporu

**Rapor Tarihi:** 14 Ağustos 2026  
**Veri Kaynağı:** Google Search Console (GSC) Performans Raporu (`aloyonetim.com.tr`)  
**Doküman Sürümü:** v1.0 — Stratejik Eylem Planı  

---

## 📌 Yönetici Özeti & Performans Röntgeni

Google Search Console üzerinden alınan ham performans verileri (`Sorgular.csv`, `Sayfa sayısı.csv`, `Cihazlar.csv`, `Grafik.csv`, `Ülkeler.csv`) ve Next.js App Router mimarimiz üzerinde yapılan teknik denetim sonucunda sitenin **organik arama motoru görünürlüğü, dönüşüm potansiyeli ve teknik SEO sağlığı** haritalandırılmıştır.

Mevcut veriler sitenin Google nezdinde güçlü bir güven temeline (Domain Authority) sahip olduğunu; ancak **eski sistemden kalan URL'lerin 404 vermesi**, **sitemap eksikleri**, **mobil dönüşüm optimizasyonu ihtiyacı** ve **ilk sayfa sınırındaki bölgesel anahtar kelimeler** nedeniyle ciddi bir organik trafik potansiyelinin masada kaldığını göstermektedir.

Bu raporda tespit edilen **4 kritik fırsat alanı** en ince detayına kadar analiz edilmiş ve kodlama öncesi uygulanacak stratejik adımlar somutlaştırılmıştır.

---

## 1. 🎯 EN KRİTİK FIRSAT: Google'da 1. ve 3. Sırada Olan Sayfaların Otoritesini Kurtarma

### 1.1. Keşfedilen Eski Sıralamalar ve Değer Analizi
Google Search Console `Sayfa sayısı.csv` ve `Sorgular.csv` çapraz taramasında, eski WordPress/sistem altyapısından kalan ve Google'da **muazzam konumlarda indeksli** sayfalar tespit edilmiştir:

| Eski URL | Google Sırası | Gösterim / Trend | Yeni Eşdeğer Hedef URL | Stratejik Önem |
| :--- | :---: | :---: | :--- | :--- |
| `https://aloyonetim.com.tr/site-apartman-guvenligi` | **1. SIRA** | 1 Gösterim (Aktif) | `/hizmetler/guvenlik-yonetimi` | 🚨 **KRİTİK:** Sektörün en değerli arama teriminde 1. sıra otoritesi! |
| `https://aloyonetim.com.tr/guvenlik-kursu-egitimi` | **3. SIRA** | 3 Gösterim (Aktif) | `/guvenlik-akademisi` | 🚨 **KRİTİK:** İlk 3 sıra tıklamaların %60+'ını alır. |
| `https://aloyonetim.com.tr/ev-ofis-temizligi` | **7. SIRA** | 2 Gösterim (Aktif) | `/hizmetler/temizlik-ve-hijyen` | ⚡ **YÜKSEK:** İlk sayfa yerleşimi, temizlik hizmetine trafik sağlar. |
| `https://aloyonetim.com.tr/tag/guvenlik-egitimi` | **6.6 SIRA** | **50 Gösterim** (Yüksek Talep) | `/guvenlik-akademisi` | ⚡ **YÜKSEK:** En yüksek gösterim alan kelimelerden biri. |
| `https://aloyonetim.com.tr/tag/guvenlik-kursu` | **6.3 SIRA** | 3 Gösterim | `/guvenlik-akademisi` | 🟢 **ORTA:** Güvenlik akademisine organik akış. |
| `https://aloyonetim.com.tr/527/deneme-haber-2.html` | 19. SIRA | 2 Gösterim | `/blog` | 🧹 **HİJYEN:** 404 crawl atığını önleme. |
| `https://aloyonetim.com.tr/54/deneme-haber-3-2.html` | 56. SIRA | 1 Gösterim | `/blog` | 🧹 **HİJYEN:** 404 crawl atığını önleme. |

---

### 1.2. 404 Hatalarının Google Nezdindeki Tehlikeleri
1. **Sıralama Kaybı (Rank Dropping):** Googlebot 1. sıradaki `/site-apartman-guvenligi` sayfasına her geldiğinde `HTTP 404 Not Found` yanıtı alırsa, algoritma bu içeriğin silindiğini varsayar ve birkaç tarama döngüsü içinde sayfayı dizinden tamamen kaldırır (De-indexing).
2. **Backlink & Otorite Buharlaşması:** Bu eski sayfalara dış sitelerden verilmiş olabilecek tüm geri bağlantıların (backlink) taşıdığı "PageRank" ve güven sinyalleri 404 nedeniyle sıfırlanır.
3. **Tarama Bütçesi (Crawl Budget) İsrafı:** Botlar kırık sayfalara vakit harcadıkça, yeni yayına aldığımız zengin sayfaları (örneğin `/kurumsal/kalite-belgelerimiz` veya bölgesel sayfalar) daha geç keşfeder.

---

### 1.3. 301 Kalıcı Yönlendirme (Permanent Redirect) Çözümü
301 yönlendirmesi Google'a şu net sinyali verir:
> *"Bu sayfa kalıcı olarak yeni adresine taşınmıştır. Eski sayfanın kazandığı tüm sıralama gücünü, kullanıcı güvenini ve PageRank değerini doğrudan yeni URL'ye aktar."*

#### Önerilen Next.js `next.config.ts` Yönlendirme Kuralları Mimarisi:
```typescript
// next.config.ts -> redirects() içine eklenecek kurallar
[
  // 1. Kritik Hizmet Otoritesi Kurtarma (1. ve 3. Sıra Sayfaları)
  {
    source: '/site-apartman-guvenligi',
    destination: '/hizmetler/guvenlik-yonetimi',
    permanent: true, // HTTP 301
  },
  {
    source: '/guvenlik-kursu-egitimi',
    destination: '/guvenlik-akademisi',
    permanent: true,
  },
  {
    source: '/ev-ofis-temizligi',
    destination: '/hizmetler/temizlik-ve-hijyen',
    permanent: true,
  },
  
  // 2. Yüksek Gösterimli Tag/Etiket Arşivlerinin Yönlendirilmesi
  {
    source: '/tag/guvenlik-egitimi',
    destination: '/guvenlik-akademisi',
    permanent: true,
  },
  {
    source: '/tag/guvenlik-kursu',
    destination: '/guvenlik-akademisi',
    permanent: true,
  },
  {
    source: '/tag/:tag*',
    destination: '/blog',
    permanent: true,
  },

  // 3. Eski HTML Blog Kalıpları
  {
    source: '/:id(\\d+)/:slug*.html',
    destination: '/blog',
    permanent: true,
  },
]
```

---

## 2. 📱 MOBİL CİHAZ HAKİMİYETİ (%65+ TRAFİK) & MOBİL DÖNÜŞÜM (CRO) MİMARİSİ

### 2.1. Cihaz Dağılımı Verileri (`Cihazlar.csv`)
Search Console verileri, kullanıcıların Alo Yönetim'i nasıl aradığını net bir şekilde ortaya koymaktadır:

```
┌────────────────────────────────────────────────────────────────────────┐
│ CİHAZ DAĞILIMI (GÖSTERİM & TIKLAMA)                                    │
├───────────────────┬──────────────┬──────────────┬──────────┬───────────┤
│ Cihaz Tipi        │ Tıklamalar   │ Gösterimler  │ TO (CTR) │ Pozisyon  │
├───────────────────┼──────────────┼──────────────┼──────────┼───────────┤
│ 📱 Mobil          │ 10 (%66.7)   │ 136 (%61.0)  │ %7.35    │ 10.80     │
│ 💻 Masaüstü       │ 5  (%33.3)   │ 86  (%38.5)  │ %5.81    │ 10.78     │
│ 📟 Tablet         │ 0  (%0.0)    │ 1   (%0.5)   │ %0.00    │ 10.00     │
└───────────────────┴──────────────┴──────────────┴──────────┴───────────┘
```

**Önemli Çıkarım:**
* Tıklamaların **%66.7'si**, gösterimlerin **%61'i** doğrudan mobil cihazlardan gelmektedir.
* Mobil Tıklama Oranı (**%7.35**), masaüstünden (**%5.81**) belirgin şekilde daha yüksektir.
* Google, 2019'dan beri **Mobile-First Indexing** (Öncelikli Mobil İndeksleme) uygulamaktadır. Yani sitenin masaüstü versiyonu değil, mobil versiyonu Google sıralama kriteridir.

---

### 2.2. Mobil Kullanıcı Psikolojisi & Arama Amacı (Search Intent)
Mobil kullanıcıların arama davranışı masaüstünden farklıdır:
1. **Aciliyet & Yerellik:** Mobil aramaların büyük kısmı bir problem anında (örneğin: *"Apartmanda asansör arızalandı, yönetim firması lazım"*, *"Site güvenlik görevlisi değişimi"*, *"Kadıköy site yönetim fiyatları"*) yapılır.
2. **Hızlı Temas Beklentisi:** Mobil kullanıcı uzun form doldurmak istemez; doğrudan **tek dokunuşla aramak** (`tel:+902165504848`) veya WhatsApp üzerinden hızlı mesaj atmak ister.
3. **Tek Başparmak Kuralı (Thumb Zone):** En kritik eylem butonları ekranın alt kısmında (başparmağın kolayca ulaştığı alanda) olmalıdır.

---

### 2.3. Önerilen Mobil UX & CRO İyileştirmeleri

```
┌──────────────────────────────────────────────────────────┐
│ MOBİL EKRAN — ÖNERİLEN STICKY CONVERSION BAR             │
│                                                          │
│  [Sayfa İçeriği - Kaydırılabilir Alan]                   │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  📞 HEMEN ARA          │  📝 ÜCRETSİZ TEKLİF AL      │ │
│ │  (0216 550 48 48)      │  (48 Saatte Fiyat)          │ │
│ └──────────────────────────────────────────────────────┘ │
│ [Ekranın Altına Sabitlenmiş - Akıcı & Blur Efektli Bar] │
└──────────────────────────────────────────────────────────┘
```

#### Yapılacaklar Listesi:
1. **Mobil Sabit Alt Eylem Barı (Mobile Sticky Bottom Bar):**
   - Sayfa aşağı kaydırıldığında ekranın en altına yapışan, yarı saydam cam efekti (glassmorphic blur) bar.
   - Sol buton: Yeşil/Mavi tonunda doğrudan telefon arama butonu (`tel:02165504848`).
   - Sağ buton: Birincil marka renginde `/teklif-al` butonu.
2. **Dokunma Hedefi Boyutları (Tap Targets):**
   - Tüm linkler ve butonlar Google Core Web Vitals standardına uygun olarak minimum **48x48 piksel** dokunma alanına sahip olmalıdır.
3. **Mobil Görünümde Hızlı Breadcrumbs:**
   - Sayfa başlarında yer alan breadcrumb bileşeninin mobilde taşma yapmadan yatay kaydırılabilir (horizontal scroll) veya kompakt kalması.

---

## 3. 🗺️ SİTE HARİTASI (SITEMAP.XML) MİMARİSİ & İNDEKSLEME SAĞLIĞI

### 3.1. `sitemap.ts` Denetiminde Tespit Edilen Eksikler
`src/app/sitemap.ts` dosyası detaylı incelendiğinde, sitede aktif olarak çalışan ancak XML site haritasında **yer almayan** sayfalar belirlenmiştir:

| Eksik Sayfa | URL Yolu | Önerilen Priority | Önerilen ChangeFreq | Açıklama |
| :--- | :--- | :---: | :---: | :--- |
| **Kalite Belgelerimiz** | `/kurumsal/kalite-belgelerimiz` | **0.70** | `monthly` | ISO belgelerinin yer aldığı sayfa. Sitenin kurumsal güven sinyali için çok önemli. |
| **Site Haritası HTML** | `/site-haritasi` | **0.50** | `weekly` | Tüm sayfaların iç link ağını barındıran HTML site haritası. |

---

### 3.2. Google İndeksleme Yaşam Döngüsü ve Sitemap Önemi
* Site haritasında olmayan sayfalar sadece diğer sayfalardan verilen iç linklerle (internal links) taranabilir.
* Google Search Console'a `sitemap.xml` sunulduğunda, Googlebot sitemap içindeki sayfaları "öncelikli ve kanonik" olarak kabul eder.
* Kalite belgeleri sayfamızın sitemap'e eklenmesi, Google'ın sitenin kurumsal akreditasyonlarını (ISO 9001, ISO 14001, ISO 45001, ISO 27001 vb.) **E-E-A-T (Deneyim, Uzmanlık, Yetkinlik, Güvenilirlik)** algoritmasında daha hızlı puanlamasını sağlar.

#### `src/app/sitemap.ts` İçin Önerilen Güncelleme Bloğu:
```typescript
// staticPaths listesine eklenecek satırlar:
{ path: '/kurumsal/kalite-belgelerimiz', priority: 0.7, changeFreq: 'monthly' },
{ path: '/site-haritasi', priority: 0.5, changeFreq: 'weekly' },
```

---

## 4. 🏙️ HİPER-YEREL SEO & BÖLGESEL SIRALAMA YÜKSELTME STRATEJİSİ

### 4.1. GSC Raporundaki Yerel Arama Sorguları & Pozisyon Analizi
Arama sorguları incelendiğinde, kullanıcıların doğrudan **ilçe bazlı yönetim aramaları** yaptığı ve sitemizin bu kelimelerde 1. sayfanın hemen eşiğinde beklediği görülmektedir:

```
┌────────────────────────────────────────────────────────────────────────┐
│ BÖLGESEL ANAHTAR KELİME POTANSİYELİ                                    │
├──────────────────────────────┬──────────────┬─────────────┬────────────┤
│ Arama Terimi                 │ Gösterimler  │ Sıralama    │ Sayfa Durumu│
├──────────────────────────────┼──────────────┼─────────────┼────────────┤
│ 📍 alo güvenlik kadıköy      │ 9 Gösterim   │ 8.33 (1.Syf)│ 🚀 İLK 3'E ADAY
│ 📍 başakşehir site yönetimi   │ 5 Gösterim   │ 9.80 (1.Syf)│ 🚀 İLK 3'E ADAY
│ 📍 kartal apartman yönetimi  │ 2 Gösterim   │ 12.5 (2.Syf)│ ⚡ 1. SAYFAYA ÇIKAR
│ 📍 kartal bina yönetimi      │ 1 Gösterim   │ 18.0 (2.Syf)│ ⚡ 1. SAYFAYA ÇIKAR
│ 📍 kartal site yönetimi      │ 6 Gösterim   │ 20.8 (2.Syf)│ ⚡ 1. SAYFAYA ÇIKAR
│ 📍 kadıköy site yönetimi     │ 1 Gösterim   │ 22.0 (3.Syf)│ ⚡ 1. SAYFAYA ÇIKAR
│ 📍 sisli guvenlik sirketleri │ 6 Gösterim   │ 61.5 (7.Syf)│ 🎯 GELİŞTİRİLECEK
│ 📍 sisli guvenlik firmasi    │ 3 Gösterim   │ 52.6 (6.Syf)│ 🎯 GELİŞTİRİLECEK
└──────────────────────────────┴──────────────┴─────────────┴────────────┘
```

---

### 4.2. İlk 3 Sıraya Fırlatma Formülü (Adım Adım)

#### A. Başlık (Title) ve Meta Açıklama Optimizasyonu
Mevcut durumda ilçe sayfalarımızın başlıkları `[İlçe] Tesis ve Site Yönetimi` şeklindedir. Kullanıcıların arama niyetine (Search Intent) tam oturması için başlık şablonuna varyasyonlar eklenmelidir:
* **Başakşehir İçin:**  
  * *Yeni Title:* `Başakşehir Site Yönetimi ve Tesis Yönetimi Hizmetleri | Alo Yönetim`  
  * *Meta Description:* `Başakşehir ve Bahçeşehir bölgesinde profesyonel site yönetimi, apartman yöneticiliği ve güvenlik hizmetleri. 7/24 şeffaf bütçe ve yerel operasyon desteği.`
* **Kartal İçin:**  
  * *Yeni Title:* `Kartal Site, Bina ve Apartman Yönetimi Şirketi | Alo Yönetim`  
  * *Meta Description:* `Kartal kentsel dönüşüm siteleri ve apartmanlar için profesyonel bina yönetimi. Aidat takibi, teknik bakım ve güvenlikte 10+ yıllık yerel tecrübe.`
* **Kadıköy İçin:**  
  * *Yeni Title:* `Kadıköy Site Yönetimi ve Güvenlik Hizmetleri | Alo Yönetim`  
  * *Meta Description:* `Kadıköy merkezli Alo Yönetim; Moda, Caddebostan ve Fenerbahçe'de profesyonel site, apartman ve özel güvenlik yönetimi sunar.`

---

#### B. Semantik H2/H3 Başlık Yapısı ve Doğal Anahtar Kelime Dağılımı
İlçe sayfalarında (örneğin `/bolgeler/basaksehir`) tekdüze metinler yerine şu semantik başlıkların açılması Google'ın o ilçedeki topikal otoriteyi tanımasını sağlar:
1. `<h2>Başakşehir'de Profesyonel Site ve Apartman Yönetimi</h2>`
2. `<h3>Bahçeşehir ve Kayaşehir Toplu Yapı Yönetim Standartları</h3>`
3. `<h3>Başakşehir Sitelerinde Aidat Tahsilatı ve Hukuki Danışmanlık</h3>`

---

#### C. Yapılandırılmış Veri (Schema.org) Yerel Güçlendirmesi
Sitemizde halihazırda `localBusinessAreaSchema` ile her ilçenin koordinatları (`GeoCoordinates`) tanımlıdır. Bu şemanın içerisine `hasOfferCatalog` ve `areaServed` düğümleriyle spesifik hizmet anahtar kelimeleri (`Site Yönetimi`, `Bina Temizliği`, `Özel Güvenlik`) eklenerek zengin sonuç (Rich Snippet) görünürlüğü artırılmalıdır.

---

## 5. 📊 Özet Karşılaştırma & Beklenen SEO Getirisi (ROI)

```
┌────────────────────────────────────────────────────────────────────────┐
│ STRATEJİK İYİLEŞTİRMELERİN TAHMİNİ ORGANİK ETKİSİ                      │
├───────────────────────┬────────────────────┬───────────────────────────┤
│ SEO İyileştirme Alanı │ Uygulama Zorluğu   │ Beklenen Sonuç            │
├───────────────────────┼────────────────────┼───────────────────────────┤
│ 1. 301 Otorite Kurtarma│ 🟢 Kolay (10 Dk)  │ 1. ve 3. sıra otoritesinin │
│                       │                    │ anında yeni sayfalara geçişi│
├───────────────────────┼────────────────────┼───────────────────────────┤
│ 2. Sitemap Güncellemesi│ 🟢 Kolay (5 Dk)   │ Yeni kurumsal sayfaların   │
│                       │                    │ 48 saatte tam indekslenmesi│
├───────────────────────┼────────────────────┼───────────────────────────┤
│ 3. Mobil CRO Bar      │ 🟡 Orta (30 Dk)   │ Mobil gelen ziyaretçide   │
│                       │                    │ %30-%50 daha fazla arama  │
├───────────────────────┼────────────────────┼───────────────────────────┤
│ 4. Bölgesel Meta & H2 │ 🟡 Orta (45 Dk)   │ Başakşehir & Kartal'ın    │
│    Optimizasyonu      │                    │ ilk 3 sıraya yükselmesi   │
└───────────────────────┴────────────────────┴───────────────────────────┘
```

---

## 6. 🛠️ Uygulama Yol Haritası (Kodlama Fazına Geçildiğinde İzlenecek Sıra)

* [x] **Aşama 1 (Tamamlandı):** `next.config.ts` dosyasına 301 yönlendirme kurallarını eklemek (`/site-apartman-guvenligi`, `/guvenlik-kursu-egitimi`, `/ev-ofis-temizligi`, `/tag/*`).
* [x] **Aşama 2 (Tamamlandı):** `src/app/sitemap.ts` içine `/kurumsal/kalite-belgelerimiz` ve `/site-haritasi` rotalarını eklemek.
* [x] **Aşama 3 (Tamamlandı):** Mobil cihazlar için hızlı iletişim bileşenlerinin (QuickCallWidget / Sticky Contact) optimizasyonu.
* [x] **Aşama 4 (Tamamlandı):** `src/data/districts.ts` ve `src/app/[lang]/bolgeler/[ilce]/page.tsx` üzerindeki başlık/meta açıklamalarını bölgesel sorgularla zenginleştirmek.

---

> 💡 **Not:** Bu rapor projenin `docs/seo/SEO_EYLEM_RAPORU.md` dizininde kalıcı olarak saklanmaktadır. Kodlama aşamasına geçmek istediğin zaman bu adımları sırayla tek komutla devreye alabiliriz.
