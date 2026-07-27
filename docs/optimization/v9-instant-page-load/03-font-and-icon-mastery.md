# 🎨 Font ve İkon Mimarisi (Zero-FOIT & Zero-FOUC)

**Hedef:** Sayfa yüklendiğinde metinlerin ve ikonların titreme (CLS) veya boşluk (FOIT - Flash of Invisible Text) olmaksızın anında ekranda belirmesini sağlamak.

---

## 1. Google Fonts (`next/font` ile Self-Host Mimarisi)

Next.js 16 App Router mimarisinde ana yazı tiplerimiz (`Inter` ve `Plus Jakarta Sans`), `next/font/google` üzerinden yüklenmektedir:

```tsx
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});
```

### Neden En Hızlısı?
- **Self-Hosted:** Derleme anında (build-time) font dosyaları indirilerek bizim statik sunucumuzdan (`/_next/static/media/...`) servis edilir. Dış bir Google sunucusuna ek ağ isteği atılmaz.
- **`display: 'swap'`:** Font dosyası gelene kadar sistem fallback fontu gösterilir, metin asla görünmez kalmaz.
- **`adjustFontFallback: true`:** Fallback fontun boyutları ve karakter aralıkları otomatik hesaplanıp orijinal fonta benzetilir, böylece font değiştiğinde düzen kayması (CLS) %0'a iner.

---

## 2. Material Symbols İkon Optimizasyonu (v9 Geliştirmesi)

Sitemizdeki ikonlar Google'ın "Material Symbols Outlined" ikon ailesinden gelmektedir. Eski yapıda, sayfa açılışını yavaşlatmaması için bu ikonlar `requestIdleCallback` (sayfa boştayken veya 1 saniye gecikmeli) ile yükleniyordu.

### Eski Problemin (Darboğazın) Tarifi:
1. Kullanıcı sayfaya girdiğinde ilk 1-2 saniye boyunca `<span className="material-symbols-outlined">arrow_forward</span>` elemanları ya boşluk olarak kalıyor (FOIT) ya da ham metin ("arrow_forward") olarak görünüp sonra ikona dönüşüyordu (FOUC).
2. Mobil 4G/3G bağlantılarda bu durum kalite algısını ve ilk etkileşim anını (FCP) olumsuz etkiliyordu.

### Yeni v9 Çözümü: Asenkron Preload Stylesheet (Hybrid Load)
İkon stil dosyasını hem oluşturmayı (render) bloklamayacak hem de 1 saniye beklemeden ağın ilk milisaniyelerinde indirecek olan asenkron ön-yükleme (Preload) kurgusu:

```html
<!-- 1. En yüksek öncelikle, oluşturmayı engellemeden indir (preload) -->
<link 
  rel="preload" 
  as="style" 
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
/>

<!-- 2. İndirme bittiği an DOM'a stylesheet olarak bağla -->
<link 
  rel="stylesheet" 
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
  media="print" 
  onload="this.media='all'" 
/>
```

Bu yöntem sayesinde tarayıcı CSS dosyasını LCP ile paralel olarak en yüksek öncelikle indirir ve biter bitmez ekrana yansıtır; ne 1 saniye gecikme yaşanır ne de ana oluşturma iş parçacığı (Main Thread) bloklanır!
