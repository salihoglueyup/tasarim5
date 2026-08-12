git reset

git add "src/components/seo/JobPostingSeo.tsx"
git commit -m "feat(seo): JobPostingSeo (Is Ilanlari) zengin arama bileseni eklendi"

git add "src/components/seo/CourseSeo.tsx"
git commit -m "feat(seo): CourseSeo (Egitim Kurslari) bileseni olusturuldu"

git add "src/components/seo/DynamicFAQ.tsx"
git commit -m "feat(seo): DynamicFAQ (Hareketli SSS) erisilebilir yapiya kavusturuldu"

git add "src/components/seo/AggregateRatingSeo.tsx"
git commit -m "feat(seo): AggregateRatingSeo (Degerlendirme Yildizlari) UI bileseni eklendi"

git add "src/components/seo/ImageWithSeo.tsx"
git commit -m "feat(seo): ImageWithSeo gorsel optimizasyon ve schema modulu eklendi"

git add "src/components/seo/ServiceSeo.tsx"
git commit -m "feat(seo): ServiceSeo (Hizmet & Fiyat) sema altyapisi hazirlandi"

git add "src/components/seo/LocalBusinessSeo.tsx" "src/components/seo/ArticleSeo.tsx" "src/components/seo/VideoObjectSeo.tsx" "src/components/seo/DynamicBreadcrumb.tsx" "src/components/seo/GTMDataLayer.tsx" "src/components/seo/index.ts" "src/components/index.ts"
git commit -m "feat(seo): Kalan lokal SEO, makale ve indeks ihracat (export) dosyalari ayarlandi"

git add "src/app/[lang]/istihdam-koprusu/page.tsx"
git commit -m "feat(pages): Istihdam Koprusu SEO entegrasyonu tamamlandi"

git add "src/app/[lang]/hizmetler/tesis-yonetimi/page.tsx"
git commit -m "feat(pages): Tesis Yonetimi sayfasi zengin sonuclarla donatildi"

git add "src/app/[lang]/bolgeler/[ilce]/page.tsx"
git commit -m "feat(pages): Bolgeler ve mahalle sayfalarina dinamik SSS baglandi"

git add "src/app/[lang]/blog/[slug]/page.tsx"
git commit -m "feat(pages): Blog makale kapaklarina ImageObject semasi enjekte edildi"

git add "src/app/[lang]/hizmetler/aidat-takibi/page.tsx" "src/app/[lang]/hizmetler/havuz-bakimi-ve-hijyen/page.tsx"
git commit -m "chore(pages): Diger hizmet sayfalarindaki ufak stil guncellemeleri"

git add "src/app/manifest.ts" "next.config.ts" "package.json" "package-lock.json"
git commit -m "feat(pwa): manifest.ts, next.config ve paket (PWA) ayarlari yapildi"

git add "src/app/~offline"
git commit -m "feat(pwa): cevrimdisi (offline) mod icin fallback sayfasi tasarlandi"

git add "public/humans.txt" "public/.well-known/security.txt" "public/browserconfig.xml"
git commit -m "feat(core): humans.txt, security.txt ve tarayici configleri ile site kimligi belirlendi"

git add "src/app/api/indexnow" "public/5a2b1c3d4e5f6g7h8i9j0k1l2m3n4o5p.txt"
git commit -m "feat(api): IndexNow arama motoru anlik ping mekanizmasi kuruldu"

git add "src/app/not-found.tsx" "src/components/layout/GlobalNotFound.tsx" "src/app/[lang]/[...catchAll]"
git commit -m "feat(core): Ozel ve akilli 404 sayfalari kurgulandi (Global & Catch-all)"

git add .
git commit -m "chore(core): Middleware, analiz kutuphaneleri ve global layout guncellendi"

git push
