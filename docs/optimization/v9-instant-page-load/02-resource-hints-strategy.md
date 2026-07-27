# 🌐 Resource Hints (Ağ İpuçları) ve Middleware (Proxy) Stratejisi

**Hedef:** Sayfa ilk yüklenirken (Cold Start) harici alan adlarıyla yapılan ağ el sıkışmalarını (DNS lookup, TCP handshake, TLS negotiation) sıfırlamak ve TTFB (Time to First Byte) gecikmesini minimuma indirmek.

---

## 1. Middleware (Proxy) Katmanının Performans Prensibi

Next.js mimarisinde gelen her HTTP isteği ilk olarak Middleware (`src/proxy.ts`) katmanından geçer. Sayfa yükleme hızını (Hyper-Speed) korumak için Middleware üzerinde uyulması gereken **Altın Kurallar**:

1. **Sıfır Ağ / Veritabanı İsteği (Zero-I/O in Middleware):** Middleware içerisinde asla harici bir API, veritabanı sorgusu veya ağır dosya okuma işlemi yapılmamalıdır. Buradaki her 50 ms'lik gecikme, sitenin TTFB ve FCP süresine doğrudan 50 ms olarak yansır.
2. **Minimal Bundle:** Bizim yapımızda `src/proxy.ts` yalnızca i18n (`/tr` prefix yönlendirmesi ve default locale rewrite) işlemini milisaniyeler içinde yapan çok hafif bir kurgudadır.
3. **Klasör Önerisi:** Optimizasyon mantığı için ana dizine ağır bir `middleware/` veya `interceptors/` klasörü açmak **kesinlikle tavsiye edilmez**; bu durum Edge runtime hafızasını şişirir. Bunun yerine performans modülleri aşağıda açıklanan 3 katmanlı mimariye ayrılır.

---

## 2. 3 Katmanlı Optimizasyon Klasör Mimarisi (Önerilen)

Optimizasyon mantığımızı projede en doğru yere konumlandırmak için şu 3 hiyerarşik alan kullanılır:

| Klasör Konumu | Katman Türü | Kullanım Amacı ve Örnek İçerikler |
| :--- | :--- | :--- |
| **`src/lib/performance/`** | **Runtime & Client Tools** | Tarayıcıda çalışan canlı optimizasyon araçları: `resourceHints.ts`, `imageOptimizer.ts`, font ve LCP yükleyici konfigürasyonları. |
| **`scripts/performance/`** | **Build-Time & Audit CLI** | Terminalden çalıştırılan veya CI/CD otomasyonunda bundle, resim, linter ve CWV skoru denetleyen araçlar: `check-lcp-assets.js`. |
| **`docs/optimization/`** | **Dokümantasyon & Roadmap** | Geliştirici ekibi ve sistem mimarisi için audit raporları, kararlar ve yol haritaları. |

---

## 3. Resource Hints (Preconnect, Preload, DNS-Prefetch) Kuralları

Tarayıcı HTML dosyasını okurken `<head>` içindeki etiketleri görerek ağ bağlantılarını önceden açar. Sitemiz için uygulanacak kural seti:

```html
<!-- 1. Google Fonts & Material Symbols CDN İçin Preconnect (El sıkışmayı 150ms önceden bitirir) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

<!-- 2. Unsplash Görsel Sunucuları İçin Preconnect -->
<link rel="preconnect" href="https://images.unsplash.com" />

<!-- 3. Analitik (GA4 & Clarity) İçin DNS-Prefetch (DNS sorgusunu arka planda hazırlar) -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.clarity.ms" />
```

### Uygulama Metodu:
Bu başlıklar Next.js 16 standartlarına uygun olarak, ya `layout.tsx` içinde JSX `<link />` elemanları olarak ya da `next.config.ts` içerisindeki `headers()` fonksiyonu üzerinden HTTP Response Headers olarak tüm isteklere enjekte edilecektir.
