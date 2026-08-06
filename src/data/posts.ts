/**
 * Blog içerik motoru — tek, ölçeklenebilir veri kaynağı
 * (SEO Master Plan V4 — Bölüm G, Faz 151/160).
 *
 * Karar (Faz 151): MDX toolchain yerine tip-güvenli, yapılandırılmış veri modeli.
 * İçerik "block" dizisi olarak tutulur; sunucuda render edilir (AI/crawler dostu,
 * JS-bağımsız), Article schema ve otomatik iç linkleme buradan beslenir.
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'cta'; text: string; href: string; label: string };

export type Category = { slug: string; name: string; description: string };

export const CATEGORIES: Category[] = [
  { slug: 'hukuk', name: 'Hukuk & Mevzuat', description: 'Kat Mülkiyeti Kanunu, aidat icra takibi ve yönetim hukuku rehberleri.' },
  { slug: 'guvenlik', name: 'Güvenlik', description: 'Site güvenliği, özel güvenlik mevzuatı ve risk yönetimi içerikleri.' },
  { slug: 'teknik', name: 'Teknik Bakım', description: 'Asansör, havuz, jeneratör ve enerji verimliliği rehberleri.' },
  { slug: 'yonetim', name: 'Yönetim & Bütçe', description: 'Aidat yönetimi, bütçe optimizasyonu ve şeffaf site yönetimi.' },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string; // Category slug
  tags: string[];
  author: string; // Author slug
  datePublished: string; // ISO
  dateModified?: string;
  image: string;
  /** İlgili pillar hizmet sayfası (cluster → pillar iç link). */
  pillar: string;
  /** AI/snippet özeti (Faz 134). */
  tldr: string;
  content: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: '2024-aidat-artis-oranlari',
    title: 'Aidat Artış Oranları Nasıl Belirlenir? (2026 Rehberi)',
    description:
      'Site ve apartmanlarda aidat artış oranı nasıl hesaplanır? Kat Mülkiyeti Kanunu çerçevesinde aidat belirleme, TÜFE ilişkisi ve şeffaf bütçe süreci.',
    category: 'yonetim',
    tags: ['aidat', 'bütçe', 'kat mülkiyeti kanunu', 'işletme projesi'],
    author: 'elif-demir',
    datePublished: '2026-01-15T08:00:00+03:00',
    dateModified: '2026-07-20T08:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
    tldr: 'Aidat artışı yasal bir orana bağlı değildir; kat malikleri kurulunun onayladığı işletme projesindeki tahmini giderlere göre belirlenir. Şeffaf bütçe ve TÜFE referansı sağlıklı bir artış için esastır.',
    content: [
      { type: 'p', text: 'Her yıl aidat dönemi yaklaştığında kat maliklerinin en çok merak ettiği soru aynıdır: “Aidat ne kadar artacak ve bu artış nasıl belirleniyor?” Bu rehberde, aidat artışının hukuki temelini ve sağlıklı bir bütçe sürecini açıklıyoruz.' },
      { type: 'h2', text: 'Aidat artışının yasal bir üst sınırı var mı?' },
      { type: 'p', text: 'Hayır. Kat Mülkiyeti Kanunu (634 sayılı KMK), aidat artışına sabit bir yüzde sınırı getirmez. Aidat; sitenin bir sonraki yıl için tahmini giderlerini karşılayacak şekilde belirlenir. Yani artış oranı, kira artışlarındaki gibi TÜFE ile sınırlı değildir; gerçek gider tahminine dayanır.' },
      { type: 'h2', text: 'Aidatı belirleyen temel kalemler' },
      { type: 'ul', items: [
        'Personel giderleri (güvenlik, temizlik, kapıcı) ve asgari ücret artışı',
        'Elektrik, su, doğalgaz gibi ortak alan enerji giderleri',
        'Asansör, jeneratör, hidrofor periyodik bakım sözleşmeleri',
        'Sigorta, demirbaş yenileme ve öngörülemeyen onarım için ihtiyat payı',
      ] },
      { type: 'p', text: 'Bu kalemlerin çoğu enflasyona ve asgari ücret artışına doğrudan bağlıdır. Bu nedenle aidat artışı çoğunlukla TÜFE ve asgari ücret artışının bir bileşimi olarak şekillenir.' },
      { type: 'h2', text: 'İşletme projesi: şeffaflığın anahtarı' },
      { type: 'p', text: 'Sağlıklı bir aidat artışı, yöneticinin hazırladığı ve kat malikleri kurulunun onayladığı işletme projesine dayanır. İşletme projesi, bir yıllık tahmini gelir ve giderleri kalem kalem gösterir. Böylece artış keyfi değil, belgeye dayalı olur.' },
      { type: 'quote', text: 'Aidat artışı bir “zam” değil, gelecek yılın gerçek giderlerinin daire başına paylaşımıdır. Şeffaf işletme projesi, güveni ve tahsilatı artırır.' },
      { type: 'h2', text: 'Toplu satın alma ile aidatı düşürmek' },
      { type: 'p', text: 'Profesyonel yönetim firmaları, yüzlerce projeyi yönettikleri için güvenlik, sigorta ve bakım sözleşmelerinde toplu satın alma avantajı sağlar. Bu, bireysel yönetilen binalara kıyasla ortak giderleri belirgin şekilde düşürebilir ve aidat artış baskısını hafifletir.' },
      { type: 'cta', text: 'Sitenizin bütçesini profesyonelce optimize etmek ister misiniz?', href: '/teklif-al', label: 'Ücretsiz Bütçe Analizi Alın' },
    ],
  },
  {
    slug: 'aidat-icra-takibi-nasil-yapilir',
    title: 'Aidat Borcu İçin İcra Takibi Nasıl Yapılır?',
    description:
      'Ödenmeyen aidatlar için Kat Mülkiyeti Kanunu kapsamında icra takibi süreci: ihtar, icra takibi, gecikme tazminatı ve tahsilat adımları.',
    category: 'hukuk',
    tags: ['aidat', 'icra takibi', 'kat mülkiyeti kanunu', 'hukuk'],
    author: 'ahmet-yilmaz',
    datePublished: '2026-02-10T08:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/hukuk-ve-icra-danismanligi',
    tldr: 'Ödenmeyen aidat için KMK m.20 uyarınca icra takibi başlatılabilir; borçlu ayrıca aylık %5 gecikme tazminatı öder. Süreç, borcun belgelenmesi ve icra dairesine başvuruyla ilerler.',
    content: [
      { type: 'p', text: 'Aidatların düzenli tahsil edilememesi, sitenin nakit akışını bozan en yaygın sorundur. İyi haber şu ki, Kat Mülkiyeti Kanunu aidat alacağını güçlü şekilde korur ve hızlı bir tahsilat yolu sunar.' },
      { type: 'h2', text: 'Aidat ödemek yasal bir zorunluluktur' },
      { type: 'p', text: 'KMK m.20 uyarınca her kat maliki, ortak giderlere ve avanslara katılmakla yükümlüdür. Aidatını ödemeyen malik yalnızca borçlu olmakla kalmaz; aynı zamanda gecikme tazminatı ödemek zorunda kalır.' },
      { type: 'h2', text: 'İcra takibi adımları' },
      { type: 'ol', items: [
        'Borcun belgelenmesi: karar defteri, işletme projesi ve ödeme kayıtlarıyla borç netleştirilir.',
        'Yazılı ihtar: borçluya ödeme için makul süre tanıyan yazılı bildirim gönderilir.',
        'İcra takibi başlatma: ödeme yapılmazsa icra dairesine başvurularak takip açılır.',
        'Gecikme tazminatı: KMK gereği aylık %5 oranında gecikme tazminatı talep edilebilir.',
        'Tahsilat: ödeme emrine itiraz edilmezse takip kesinleşir ve tahsilat süreci işler.',
      ] },
      { type: 'h2', text: 'Yönetici ne yapmalı?' },
      { type: 'p', text: 'Yöneticinin, tahsilatı geciktirmeden ve tüm maliklere eşit davranarak süreci başlatması önemlidir. Gecikmiş takip, hem alacağın büyümesine hem de diğer maliklerin adalet duygusunun zedelenmesine yol açar.' },
      { type: 'quote', text: 'Aidat icra takibi bir “husumet” değil, tüm kat maliklerinin hakkını koruyan bir yönetim sorumluluğudur.' },
      { type: 'cta', text: 'Aidat tahsilatında profesyonel hukuk ve icra desteği alın.', href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Hukuk & İcra Hizmetimiz' },
    ],
  },
  {
    slug: 'kentsel-donusum-surecleri',
    title: 'Kentsel Dönüşüm Süreçleri: Kat Malikleri İçin Yol Haritası',
    description:
      'Riskli yapı tespiti, çoğunluk kararı, yıkım ve yeni yapı süreci. Kentsel dönüşümde kat maliklerinin hakları ve dikkat edilmesi gerekenler.',
    category: 'hukuk',
    tags: ['kentsel dönüşüm', 'riskli yapı', 'kat mülkiyeti kanunu'],
    author: 'ahmet-yilmaz',
    datePublished: '2026-03-05T08:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
    tldr: 'Kentsel dönüşüm; riskli yapı tespiti, maliklerin salt çoğunlukla karar alması, yıkım ve yeni inşaat aşamalarından oluşur. 6306 sayılı Kanun süreci ve malik haklarını düzenler.',
    content: [
      { type: 'p', text: 'İstanbul’un yaşlanan yapı stoğu ve deprem gerçeği, kentsel dönüşümü birçok site için gündeme getiriyor. Süreci doğru yönetmek, hem güvenlik hem de mülk değeri açısından kritik.' },
      { type: 'h2', text: 'Süreç nasıl başlar?' },
      { type: 'p', text: '6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun kapsamında süreç, binanın “riskli yapı” olarak tespitiyle başlar. Lisanslı kuruluşlar tarafından yapılan tespit sonucu bina riskli çıkarsa dönüşüm süreci işler.' },
      { type: 'h2', text: 'Temel aşamalar' },
      { type: 'ol', items: [
        'Riskli yapı tespiti ve itiraz süresi',
        'Maliklerin toplanması ve çoğunlukla karar alınması',
        'Müteahhit/yüklenici seçimi ve sözleşme',
        'Yıkım, yeni proje ve iskân süreci',
      ] },
      { type: 'h2', text: 'Malik haklarına dikkat' },
      { type: 'p', text: 'Kararların hukuka uygun çoğunlukla alınması, sözleşmelerin malik lehine dengeli olması ve kira yardımı gibi devlet desteklerinin doğru kullanılması sürecin en kritik noktalarıdır. Profesyonel danışmanlık, mağduriyetleri önler.' },
      { type: 'cta', text: 'Site yönetiminizde hukuki süreçleri güvenle yönetin.', href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Hukuk Danışmanlığı' },
    ],
  },
  {
    slug: 'deprem-risk-analizi',
    title: 'Binalarda Deprem Risk Analizi Neden Önemlidir?',
    description:
      'Bina deprem risk analizi nasıl yapılır? Zemin etüdü, taşıyıcı sistem değerlendirmesi ve site yönetiminin alması gereken önlemler.',
    category: 'guvenlik',
    tags: ['deprem', 'risk analizi', 'yapı güvenliği'],
    author: 'mert-kaya',
    datePublished: '2026-02-25T08:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/teknik-bakim',
    tldr: 'Deprem risk analizi; zemin etüdü ve taşıyıcı sistemin değerlendirilmesiyle binanın deprem dayanımını ortaya koyar. Site yönetimleri düzenli yapı denetimi ve acil durum planıyla riski azaltır.',
    content: [
      { type: 'p', text: 'İstanbul’da yaşayan her site sakini için deprem, ertelenemez bir gerçektir. Yapının deprem dayanımını bilmek, hem can güvenliği hem de doğru yatırım kararları için ilk adımdır.' },
      { type: 'h2', text: 'Risk analizi neleri kapsar?' },
      { type: 'ul', items: [
        'Zemin etüdü: binanın oturduğu zeminin taşıma gücü ve sıvılaşma riski',
        'Taşıyıcı sistem değerlendirmesi: kolon, kiriş ve perde duvarların durumu',
        'Beton ve donatı testleri: malzeme dayanımının ölçülmesi',
        'Yapısal düzensizliklerin tespiti (yumuşak kat, kısa kolon vb.)',
      ] },
      { type: 'h2', text: 'Site yönetiminin sorumluluğu' },
      { type: 'p', text: 'Site yönetimi; düzenli yapı denetimi yaptırmak, ortak alanlardaki acil çıkış ve tahliye planlarını güncel tutmak ve sakinleri bilinçlendirmekle sorumludur. Jeneratör, yangın ve acil durum sistemlerinin periyodik bakımı bu sürecin ayrılmaz parçasıdır.' },
      { type: 'quote', text: 'Deprem güvenliği tek seferlik bir işlem değil, sürekli bir yönetim disiplinidir.' },
      { type: 'cta', text: 'Teknik bakım ve yapı güvenliği süreçlerinizi profesyonellere emanet edin.', href: '/hizmetler/teknik-bakim', label: 'Teknik Bakım Hizmetimiz' },
    ],
  },
  {
    slug: 'yuzme-havuzu-bakim-kimyasallari',
    title: 'Yüzme Havuzu Bakım Kimyasalları ve Su Hijyeni Rehberi',
    description:
      'Havuz suyu kimyasal dengesi nasıl sağlanır? pH, klor, siyanürik asit değerleri ve site havuzlarında yasal hijyen standartları.',
    category: 'teknik',
    tags: ['havuz bakımı', 'hijyen', 'su kimyası'],
    author: 'mert-kaya',
    datePublished: '2026-05-20T08:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1537565266751-341a94bc7d6f?q=80&w=2000&auto=format&fit=crop',
    pillar: '/hizmetler/havuz-bakimi-ve-hijyen',
    tldr: 'Sağlıklı havuz suyu için pH 7.2–7.6, serbest klor 1–3 ppm aralığında tutulmalıdır. Site havuzları, Sağlık Bakanlığı hijyen yönetmeliğine uygun düzenli ölçüm ve dezenfeksiyon gerektirir.',
    content: [
      { type: 'p', text: 'Havuz sezonu açıldığında site sakinlerinin en çok değer verdiği konu suyun berraklığı ve güvenliğidir. Ancak berrak görünen su, her zaman hijyenik olmayabilir. Doğru kimyasal denge, hem sağlık hem de yasal uyum için şarttır.' },
      { type: 'h2', text: 'Kritik değerler' },
      { type: 'ul', items: [
        'pH: 7.2 – 7.6 (cildi ve gözü korur, dezenfeksiyon verimini artırır)',
        'Serbest klor: 1 – 3 ppm (mikroorganizmaları etkisiz kılar)',
        'Siyanürik asit (stabilizatör): 30 – 50 ppm arası',
        'Alkalinite: 80 – 120 ppm (pH’ı stabil tutar)',
      ] },
      { type: 'h2', text: 'Yasal hijyen zorunluluğu' },
      { type: 'p', text: 'Yüzme havuzları, Sağlık Bakanlığı’nın havuz suyu hijyen yönetmeliğine tabidir. Düzenli su numunesi analizi, kayıt tutma ve dezenfeksiyon, site yönetiminin sorumluluğundadır. Bu kayıtlar denetimlerde talep edilir.' },
      { type: 'h3', text: 'Sık yapılan hatalar' },
      { type: 'ul', items: [
        'Kloru gece yerine gündüz eklemek (güneşte klor hızla tükenir)',
        'pH ölçmeden klor eklemek (yüksek pH’ta klor etkisizdir)',
        'Filtre ters yıkamasını ihmal etmek',
      ] },
      { type: 'cta', text: 'Havuz sezonunu sağlık standartlarına uygun geçirin.', href: '/hizmetler/havuz-bakimi-ve-hijyen', label: 'Havuz Bakım Hizmetimiz' },
    ],
  },
  {
    slug: 'site-yonetimine-gecis-rehberi',
    title: 'Profesyonel Site Yönetimine Geçiş: A’dan Z’ye Rehber',
    description:
      'Kendi kendine yönetimden profesyonel tesis yönetimine geçiş nasıl yapılır? Karar süreci, yönetim planı, demirbaş devri ve dikkat edilecekler.',
    category: 'yonetim',
    tags: ['site yönetimi', 'yönetim değişikliği', 'işletme projesi', 'demirbaş'],
    author: 'elif-demir',
    datePublished: '2026-04-12T08:00:00+03:00',
    dateModified: '2026-07-01T08:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
    tldr: 'Profesyonel yönetime geçiş; kat malikleri kurulu kararı, yönetim planına uyum, demirbaş ve evrak devri ile tamamlanır. Doğru firma seçimi şeffaflık, dijital aidat takibi ve toplu satın alma avantajı sağlar.',
    content: [
      { type: 'p', text: 'Site büyüdükçe gönüllü yönetim modeli çoğu zaman yetersiz kalır; aidat tahsilatı zorlaşır, bakımlar aksar ve kat malikleri arasında anlaşmazlıklar artar. Bu rehber, profesyonel yönetime geçişin tüm adımlarını açıklıyor.' },
      { type: 'h2', text: '1. Karar süreci' },
      { type: 'p', text: 'Profesyonel yönetime geçiş, kat malikleri kurulunun kararıyla başlar. Toplantıda ihtiyaçlar belirlenir, teklifler değerlendirilir ve yönetim firması yetkilendirilir.' },
      { type: 'h2', text: '2. Firma seçiminde nelere bakmalı?' },
      { type: 'ul', items: [
        'Şeffaf işletme projesi ve dijital aidat takibi sunuyor mu?',
        'Güvenlik, temizlik, teknik bakım gibi hizmetleri tek çatı altında veriyor mu?',
        'Toplu satın alma ile maliyet avantajı sağlıyor mu?',
        'Referansları ve yönettiği proje sayısı nedir?',
      ] },
      { type: 'h2', text: '3. Devir ve başlangıç' },
      { type: 'p', text: 'Yeni yönetim; mevcut yönetim planını inceler, demirbaşları tutanakla devralır, evrak ve karar defterini teslim alır. Ardından ilk işletme projesi hazırlanarak kat maliklerine sunulur.' },
      { type: 'quote', text: 'Doğru bir geçiş, ilk aydan itibaren şeffaf raporlama ve düzenli aidat tahsilatıyla kendini gösterir.' },
      { type: 'h2', text: '4. Geçiş sonrası kazanımlar' },
      { type: 'ul', items: [
        'Düzenli ve denetlenebilir aidat tahsilatı',
        'Periyodik bakımlarla artan mülk değeri',
        'Toplu satın alma ile düşen ortak giderler',
        'Hukuki süreçlerde profesyonel destek',
      ] },
      { type: 'cta', text: 'Sitenizi profesyonel yönetime taşımak için ilk adımı atın.', href: '/teklif-al', label: 'Ücretsiz Keşif Talep Et' },
    ],
  },

  // -------------------------------------------------------------------------
  // Hizmet Rehberleri — services.ts verisinden üretildi (generate-blog-draft)
  // -------------------------------------------------------------------------
  {
    slug: 'guvenlik-yonetimi-hizmeti-rehberi-2026',
    title: 'Güvenlik Yönetimi: Kapsamlı Rehber (2026)',
    description: '5188 sayılı kanuna uygun, kimlikli özel güvenlik personeli ve entegre kamera sistemleriyle 7/24 site güvenliği. Hizmetin kapsamı, faydaları ve profesyonel seçim kriterleri.',
    category: 'guvenlik',
    tags: ['site güvenliği', 'özel güvenlik', 'apartman güvenliği', 'kameralı güvenlik', 'güvenlik yönetimi'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T08:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
    pillar: '/hizmetler/guvenlik-yonetimi',
    tldr: 'Güvenlik yönetimi, profesyonel tesis yönetiminin temel bileşenidir. 5188 sayılı kanun kapsamında kimlikli personel, 7/24 kamera sistemi ve acil müdahale protokolleriyle sitenizi güvence altına alır.',
    content: [
      { type: 'h2', text: 'Güvenlik Yönetimi Nedir?' },
      { type: 'p', text: '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun kapsamında, eğitimli ve kimlikli özel güvenlik personeli ile entegre kamera sistemleriyle yürütülen 7/24 site güvenlik hizmetidir. Profesyonel tesis yönetiminde güvenlik, sakinlerin yaşam kalitesini ve mülk değerini doğrudan etkileyen kritik bir hizmet alanıdır.' },
      { type: 'h2', text: 'Güvenlik Yönetimi Hizmetinin Kapsamı' },
      { type: 'ul', items: [
        'Kimlikli ve eğitimli özel güvenlik görevlileri',
        '7/24 kamera izleme ve devriye',
        'Ziyaretçi ve araç giriş-çıkış kontrolü',
        'Acil durum müdahale protokolleri',
      ] },
      { type: 'h2', text: 'Neden Profesyonel Güvenlik Yönetimi?' },
      { type: 'p', text: 'Bireysel kapıcı ya da bekçi çözümleri yerine profesyonel güvenlik yönetimi; sistematik eğitim, yasal uyumluluk (5188 lisansı), teknik altyapı ve 7/24 destek gibi avantajlar sunar. Site yönetim firması seçerken güvenlik alanındaki deneyim ve referansları mutlaka değerlendirin.' },
      { type: 'h2', text: 'Doğru Firma Nasıl Seçilir?' },
      { type: 'ol', items: [
        '5188 lisanslı olduğunu doğrulayın',
        'Referans ve aktif proje sayısını sorun',
        'Acil müdahale süresini sözleşmeye ekletin',
        'Kamera sistemi ve kayıt altyapısını yerinde görün',
        'Aylık raporlama ve şeffaflık mekanizmalarını değerlendirin',
      ] },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'Özel güvenlik görevlisi istihdam etmek zorunlu mu?' },
      { type: 'p', text: '634 sayılı Kat Mülkiyeti Kanunu doğrudan zorunluluk getirmez; ancak 5188 sayılı kanun, özel güvenlik hizmeti sunulacaksa lisanslı personel çalıştırılmasını şart koşar. Büyük siteler ve rezidanslar için profesyonel güvenlik yönetimi hem yasal hem pratik açıdan tercih edilmesi gereken yoldur.' },
      { type: 'h3', text: 'Güvenlik yönetimi hizmeti ne kadar tutar?' },
      { type: 'p', text: 'Maliyet; sitenin büyüklüğü, vardiya sayısı ve kamera altyapısına göre değişir. Ücretsiz keşif sonrası kalem kalem, gizli gider içermeyen net teklif alabilirsiniz.' },
      { type: 'cta', text: 'Güvenlik yönetimi için ücretsiz keşif ve teklif almak üzere bize ulaşın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  },
  {
    slug: 'tesis-yonetimi-hizmeti-rehberi-2026',
    title: 'Tesis Yönetimi: Kapsamlı Rehber (2026)',
    description: 'Aidat takibinden bütçe planlamasına, tüm ortak alan işletmesini şeffaf ve dijital olarak yöneten profesyonel tesis yönetimi. Kapsam, faydalar ve doğru firma seçimi.',
    category: 'yonetim',
    tags: ['site yönetimi', 'apartman yönetimi', 'profesyonel yönetim', 'aidat yönetimi', 'tesis yönetim şirketi'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T08:10:00+03:00',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
    tldr: 'Tesis yönetimi; aidat tahsilatı, ortak alan işletmesi, bütçe şeffaflığı ve kat malikleri kuruluyla koordinasyonu kapsayan bütünsel bir yönetim hizmetidir. Profesyonel firma ile çalışmak mülk değerini artırır ve yönetim yükünü azaltır.',
    content: [
      { type: 'h2', text: 'Tesis Yönetimi Nedir?' },
      { type: 'p', text: 'Tesis yönetimi; apartman, site, rezidans veya plaza gibi çok kişili mülklerde ortak alanların işletilmesi, aidat tahsilatı, bütçe planlaması ve kat malikleri kurulunun temsil edilmesi işlemlerinin profesyonel bir yönetim firması tarafından üstlenilmesidir. 634 sayılı Kat Mülkiyeti Kanunu çerçevesinde yönetim, kat maliklerinin hem hakkı hem yükümlülüğüdür.' },
      { type: 'h2', text: 'Tesis Yönetimi Hizmetinin Kapsamı' },
      { type: 'ul', items: [
        'Dijital aidat takibi ve online ödeme altyapısı',
        'Şeffaf işletme projesi ve yıllık bütçe',
        'Ortak alanların bütünsel işletmesi',
        'Kat malikleri kuruluna düzenli raporlama',
      ] },
      { type: 'h2', text: 'Profesyonel Tesis Yönetiminin Faydaları' },
      { type: 'p', text: 'Bağımsız yönetim girişimleri çoğunlukla bütçe açıkları, aidat tahsilat sorunları ve hukuki belirsizliklerle karşılaşır. Profesyonel bir yönetim firması; deneyim, teknoloji ve hukuki bilgisiyle bu sorunları sistematik biçimde çözer. Sonuç: daha yüksek aidat tahsilat oranı, daha düşük ortak gider ve artan mülk değeri.' },
      { type: 'h2', text: 'Tesis Yönetim Şirketi Nasıl Seçilir?' },
      { type: 'ol', items: [
        'Yönettiği aktif proje sayısını ve türünü sorun',
        'Aidat tahsilat oranı ve geçmiş performansı isteyin',
        'Dijital raporlama ve şeffaflık araçlarını değerlendirin',
        'Sözleşme kapsamını ve çıkış koşullarını netleştirin',
        'Yerel ekip varlığını ve acil müdahale süresini öğrenin',
      ] },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'Tesis yönetim şirketi değiştirmek ne kadar sürer?' },
      { type: 'p', text: 'Geçiş süreci tipik olarak 2-4 hafta alır. Alo Yönetim, eski yönetimden demirbaş ve belge devir tutanaklarını alarak 48 saat içinde operasyonu devreder.' },
      { type: 'h3', text: 'Yönetim şirketi aidatın ne kadarını alır?' },
      { type: 'p', text: 'Yönetim ücreti ayrı bir kalem olarak işletme projesinde yer alır ve kat malikleri kurulunda onaylanır; sabit ücret modeliyle toplanan aidatın belirli bir yüzdesi alınmaz.' },
      { type: 'cta', text: 'Tesis yönetimi için ücretsiz keşif ve şeffaf teklif almak üzere bize ulaşın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  },
  {
    slug: 'temizlik-ve-hijyen-hizmeti-rehberi-2026',
    title: 'Site Temizliği ve Hijyen Yönetimi: Kapsamlı Rehber (2026)',
    description: 'Ortak alanlar, dış cephe ve sosyal donatılar için profesyonel temizlik ve hijyen programı. Kapsam, standartlar ve doğru firma seçimi rehberi.',
    category: 'yonetim',
    tags: ['site temizliği', 'ortak alan temizliği', 'apartman temizlik şirketi', 'profesyonel temizlik'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T08:20:00+03:00',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/temizlik-ve-hijyen',
    tldr: 'Site temizliği; merdiven, otopark, asansör ve dış cephe gibi ortak alanların düzenli ve hijyenik tutulmasını kapsar. Profesyonel temizlik programı hem sağlık standartlarını karşılar hem de binanın uzun ömürlü kalmasına katkı sağlar.',
    content: [
      { type: 'h2', text: 'Site Temizliği Nedir ve Neden Önemlidir?' },
      { type: 'p', text: 'Site temizliği; bina girişleri, merdivenler, asansörler, garaj, havuz çevresi ve bahçe gibi ortak kullanım alanlarının düzenli aralıklarla profesyonel ekipman ve sertifikalı kimyasallarla temizlenmesidir. Hijyenik ortak alanlar hem sağlık riskini azaltır hem de binanın estetik değerini ve ömrünü korur.' },
      { type: 'h2', text: 'Temizlik ve Hijyen Hizmetinin Kapsamı' },
      { type: 'ul', items: [
        'Profesyonel ekipmanla günlük/haftalık ortak alan temizliği',
        'Periyodik dezenfeksiyon ve hijyen kontrolü',
        'Mevsimsel dış cephe ve cam temizliği',
        'Sertifikalı, insan sağlığına uygun temizlik kimyasalları',
      ] },
      { type: 'h2', text: 'Temizlik Sıklığı Nasıl Belirlenir?' },
      { type: 'p', text: 'Temizlik sıklığı; bina büyüklüğü, daire sayısı ve ortak alan yoğunluğuna göre değişir. Yüksek katlı bloklarda asansör ve merdiven günlük, dış alanlar haftalık; büyük sosyal donatılı sitelerde havuz çevresi ve park alanları ise günlük temizlik gerektirebilir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'Apartman temizliği için ayrı şirket tutmak mı, yoksa yönetim firmasından mı almak daha iyi?' },
      { type: 'p', text: 'Tesis yönetim firmasından paket hizmet almak, koordinasyon kolaylığı ve tek sözleşme avantajı sağlar. Denetim ve raporlama tek elden yürütüldüğünde kalite tutarlılığı daha kolay sağlanır.' },
      { type: 'h3', text: 'Temizlik hizmeti ne kadar tutar?' },
      { type: 'p', text: 'Maliyet; alan büyüklüğü, temizlik sıklığı ve kapsamına göre değişir. Ücretsiz keşif sonrası kalem kalem teklif sunulur.' },
      { type: 'cta', text: 'Profesyonel temizlik ve hijyen hizmeti için ücretsiz teklif alın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  },
  {
    slug: 'teknik-bakim-hizmeti-rehberi-2026',
    title: 'Teknik Bakım ve Onarım: Kapsamlı Rehber (2026)',
    description: 'Asansör, jeneratör, hidrofor ve elektrik panolarının periyodik bakımıyla kesintisiz ve güvenli işletme. Kapsam, yasal zorunluluklar ve doğru yönetim.',
    category: 'teknik',
    tags: ['asansör bakımı', 'jeneratör bakımı', 'teknik işletme', 'periyodik bakım', 'bina teknik servis'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T08:30:00+03:00',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/teknik-bakim',
    tldr: 'Teknik bakım; asansör, jeneratör, hidrofor ve elektrik altyapısının periyodik olarak kontrol edilmesidir. Arıza öncesi önleyici bakım, hem yasal zorunluluk hem de uzun vadede maliyet tasarrufu sağlar.',
    content: [
      { type: 'h2', text: 'Teknik Bakım Nedir?' },
      { type: 'p', text: 'Teknik bakım; binalardaki mekanik, elektrik ve altyapı sistemlerinin (asansör, jeneratör, hidrofor, yangın tesisat, kompanzasyon panosu vb.) periyodik olarak kontrol edilip arıza öncesinde müdahale edilmesidir. Önleyici bakım yaklaşımı, acil onarım maliyetlerini ve sakin memnuniyetsizliğini önemli ölçüde azaltır.' },
      { type: 'h2', text: 'Teknik Bakım Hizmetinin Kapsamı' },
      { type: 'ul', items: [
        'Asansör ve jeneratör periyodik bakım ve sertifikasyonu',
        'Elektrik panosu ve kompanzasyon denetimi',
        'Hidrofor ve su tesisatı kontrolü',
        'Arıza öncesi önleyici bakım programı',
      ] },
      { type: 'h2', text: 'Hangi Sistemler Yasal Zorunluluk Kapsamında?' },
      { type: 'p', text: 'Asansörler, Makine ve Kimya Endüstrisi Kurumu (MKEK) standartları ve ilgili yönetmelikler gereği periyodik muayeneye tabidir. Kaçış merdiveni, yangın algılama sistemleri ve doğalgaz tesisatı da düzenli denetim gerektiren sistemler arasındadır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'Asansör bakımı ne sıklıkla yapılmalı?' },
      { type: 'p', text: 'Yönetmelik gereği asansörler yılda en az bir kez periyodik muayeneden geçmelidir. Yoğun kullanımlı veya yüksek katlı binalarda aylık bakım önerilir.' },
      { type: 'h3', text: 'Teknik bakım giderleri işletme projesinde nasıl yer alır?' },
      { type: 'p', text: 'Periyodik bakım sözleşmeleri, işletme projesinde ayrı bir kalem olarak yer alır ve kat malikleri kurulunca onaylanır. Şeffaf raporlama ile her kalem kat maliklerine belgelenir.' },
      { type: 'cta', text: 'Teknik bakım için ücretsiz keşif ve teklif almak üzere bize ulaşın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  },
  {
    slug: 'peyzaj-ve-bahce-bakimi-hizmeti-rehberi-2026',
    title: 'Peyzaj ve Bahçe Bakımı: Kapsamlı Rehber (2026)',
    description: 'Yeşil alanların düzenli bakımı, sulama sistemleri ve mevsimsel bitkilendirmeyle değer katan profesyonel peyzaj yönetimi.',
    category: 'teknik',
    tags: ['bahçe bakımı', 'peyzaj yönetimi', 'site bahçesi', 'çevre düzenleme', 'yeşil alan bakımı'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T08:40:00+03:00',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/peyzaj-ve-bahce-bakimi',
    tldr: 'Peyzaj ve bahçe bakımı; çim biçme, budama, sulama sistemi yönetimi ve mevsimsel bitkilendirmeyi kapsar. Bakımlı yeşil alanlar sitenin görünümünü ve değerini doğrudan artırır.',
    content: [
      { type: 'h2', text: 'Peyzaj ve Bahçe Bakımı Nedir?' },
      { type: 'p', text: 'Site peyzaj yönetimi; ortak yeşil alanların, çim zeminlerin, ağaç ve çalıların, çiçek yataklarının ve otomatik sulama sistemlerinin düzenli bakımını kapsar. Profesyonel peyzaj hizmeti yalnızca estetik bir katkı değil; uzun vadede yeşil alanın korunması ve mülk değerinin sürdürülmesi açısından stratejik bir yatırımdır.' },
      { type: 'h2', text: 'Peyzaj Hizmetinin Kapsamı' },
      { type: 'ul', items: [
        'Düzenli çim biçme ve kenar kesimi',
        'Otomatik sulama sistemi yönetimi ve onarımı',
        'Mevsimsel bitkilendirme ve tasarım',
        'Ağaç ve çalı sağlık kontrolü ile budama',
      ] },
      { type: 'h2', text: 'Mevsimsel Planlama Neden Önemli?' },
      { type: 'p', text: 'Bahçe bakımı yıl boyu değişen program gerektirir: ilkbaharda dikim ve gübreleme, yazın yoğun sulama ve çim biçme, sonbaharda yaprak temizliği ve kışa hazırlık, kışın dayanıklı türlerin korunması. Profesyonel peyzaj firması bu süreci takvimle yönetir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'Sulama sistemi bakımı kim tarafından yapılmalı?' },
      { type: 'p', text: 'Sulama sistemi; sezonda en az iki kez (sezon açılış ve kapanış) kontrol edilmelidir. Damlatma başlıkları, vana ve programlayıcılar peyzaj firması tarafından denetlenir.' },
      { type: 'h3', text: 'Peyzaj hizmeti işletme projesine nasıl dahil edilir?' },
      { type: 'p', text: 'Yıllık peyzaj sözleşmesi, işletme projesinde "çevre düzenleme ve bahçe bakımı" kalemi olarak yer alır ve kat malikleri kurulunun onayına sunulur.' },
      { type: 'cta', text: 'Peyzaj ve bahçe bakımı için ücretsiz teklif alın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  },
  {
    slug: 'havuz-bakimi-ve-hijyen-hizmeti-rehberi-2026',
    title: 'Havuz Bakımı ve Hijyen: Kapsamlı Rehber (2026)',
    description: 'Havuz suyu kimyasal dengesi, filtrasyon ve hijyen denetimiyle sağlık standartlarına uygun profesyonel havuz işletmesi.',
    category: 'teknik',
    tags: ['havuz bakımı', 'havuz hijyeni', 'havuz suyu yönetimi', 'site havuzu bakımı'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T08:50:00+03:00',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/havuz-bakimi-ve-hijyen',
    tldr: 'Havuz bakımı; günlük pH ve klor dengesi, filtrasyon sistemi yönetimi, havuz yüzeyi temizliği ve yasal hijyen denetim uyumunu kapsar. Profesyonel havuz operatörü olmadan yapılan havuz işletmesi hem sağlık riski hem de yasal sorumluluk yaratır.',
    content: [
      { type: 'h2', text: 'Havuz Bakımı Neden Profesyonel Gerektirir?' },
      { type: 'p', text: 'Yüzme havuzu işletmesi; su kimyası, mikrobiyolojik kontrol, mekanik sistem bakımı ve yasal hijyen mevzuatı bilgisi gerektiren teknik bir alandır. Yanlış pH veya yetersiz dezenfeksiyon; Legionella, E. coli gibi ciddi sağlık riskleri doğurur ve yönetim kurulunu hukuki sorumluluğa açar.' },
      { type: 'h2', text: 'Havuz Bakım Hizmetinin Kapsamı' },
      { type: 'ul', items: [
        'Günlük su kimyası (pH, klor, alkalinite) ölçümü ve dengeleme',
        'Filtrasyon, pompa ve dezenfeksiyon sistemi yönetimi',
        'Yasal hijyen denetim uyumu ve raporlama',
        'Sezon açılış ve kapanış bakımı',
      ] },
      { type: 'h2', text: 'Hangi Yasal Düzenlemeler Geçerli?' },
      { type: 'p', text: 'Sağlık Bakanlığı Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları ve Şartları Hakkında Yönetmelik kapsamında havuz suyu periyodik analizleri zorunludur. Denetimde standartların karşılanamaması halinde havuz faaliyeti durdurulabilir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'Havuz ne sıklıkla temizlenmelidir?' },
      { type: 'p', text: 'Su yüzeyi ve havuz tabanı günlük, filtre sistemi haftalık temizlenmelidir. Su analizi sezon boyunca en az 2 haftada bir laboratuvara gönderilmelidir.' },
      { type: 'h3', text: 'Havuz kapatma (kışlık) bakımı neden önemlidir?' },
      { type: 'p', text: 'Sezon sonu doğru gerçekleştirilmeyen kapatma işlemi; yosun oluşumuna, pompa hasarına ve beton yüzey bozulmasına neden olur. Sezon açılışında ek maliyet ve uzun hazırlık süresi yaratır.' },
      { type: 'cta', text: 'Havuz bakım ve hijyen hizmeti için ücretsiz teklif alın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  },
  {
    slug: 'hasere-ve-dezenfeksiyon-hizmeti-rehberi-2026',
    title: 'Haşere İlaçlama ve Dezenfeksiyon: Kapsamlı Rehber (2026)',
    description: 'Ortak alanlar ve çevre için sertifikalı ilaçlama, haşere kontrolü ve periyodik dezenfeksiyon hizmeti. Yasal gereklilikler ve uygulama sıklığı rehberi.',
    category: 'teknik',
    tags: ['haşere ilaçlama', 'dezenfeksiyon hizmeti', 'pest kontrol', 'site ilaçlama', 'biyosidal uygulama'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T09:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123edd7?q=80&w=2069&auto=format&fit=crop',
    pillar: '/hizmetler/hasere-ve-dezenfeksiyon',
    tldr: 'Haşere ve dezenfeksiyon hizmeti; biyosidal ürün yetkili firmalar tarafından, Sağlık Bakanlığı onaylı ürünlerle uygulanmalıdır. Periyodik program olmaksızın reaktif ilaçlama hem daha maliyetli hem de daha az etkilidir.',
    content: [
      { type: 'h2', text: 'Haşere Kontrolü ve Dezenfeksiyon Neden Gerekli?' },
      { type: 'p', text: 'Ortak alanlar, çöp odaları ve kanallar; haşere ve kemirgen için uygun ortamlar oluşturur. Profesyonel ilaçlama; yalnızca görünür sorunu gidermez, kaynakta kontrol ederek tekrarı önler. Dezenfeksiyon ise özellikle asansör, kapı kolu ve ortak dokunma noktalarındaki mikrobiyal riskleri azaltır.' },
      { type: 'h2', text: 'Haşere ve Dezenfeksiyon Hizmetinin Kapsamı' },
      { type: 'ul', items: [
        'Sertifikalı biyosidal ürünlerle periyodik ilaçlama',
        'Böcek ve kemirgen önleyici bariyer uygulaması',
        'Ortak alan yüzey dezenfeksiyonu',
        'Sağlık mevzuatına uygun uygulama ve belgelendirme',
      ] },
      { type: 'h2', text: 'Yasal Zorunluluklar' },
      { type: 'p', text: 'Biyosidal ürün uygulamaları, Biyosidal Ürünler Yönetmeliği kapsamında yalnızca Bakanlık izinli firmalar tarafından yapılabilir. Siteye ait uygulama kayıtlarının saklanması, olası denetimde yasal uyum belgesi olarak önem taşır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'İlaçlama ne sıklıkla yapılmalı?' },
      { type: 'p', text: 'Standart program ayda bir genel ilaçlama + mevsimsel yoğunlaşmayı (yaz başında çoğalma dönemi öncesi) kapsar. Aktif infestasyon durumunda ek uygulamalar gerekebilir.' },
      { type: 'h3', text: 'İlaçlama sırasında evde olmak gerekiyor mu?' },
      { type: 'p', text: 'Ortak alanlara (merdiven, bodrum, çöp odası) yapılan uygulamalar için sakinlerin evde olması gerekmez. Daire içi uygulama isteniyorsa önceden randevu alınır.' },
      { type: 'cta', text: 'Periyodik ilaçlama ve dezenfeksiyon programı için teklif alın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  },
  {
    slug: 'hukuk-ve-icra-danismanligi-hizmeti-rehberi-2026',
    title: 'Hukuk ve İcra Danışmanlığı: Aidat Takibi Rehberi (2026)',
    description: 'Aidat icra takibi ve Kat Mülkiyeti Kanunu kapsamında yönetim hukuku danışmanlığıyla haklarınızın korunması. Pratik adımlar ve yasal süreç.',
    category: 'hukuk',
    tags: ['aidat icra takibi', 'kat mülkiyeti hukuku', 'yönetim hukuk danışmanlığı', 'site hukuku'],
    author: 'alo-yonetim-editor',
    datePublished: '2026-08-06T09:10:00+03:00',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
    pillar: '/hizmetler/hukuk-ve-icra-danismanligi',
    tldr: 'Aidat borçlarında icra takibi, Kat Mülkiyeti Kanunu\'nun 20. maddesi kapsamında yöneticinin hakkı ve sorumluluğudur. Hukuki süreç; ihtarname, icra takibi ve gerekirse dava aşamalarından oluşur. Profesyonel yönetim firması bu süreci sizin adınıza yürütür.',
    content: [
      { type: 'h2', text: 'Aidat Ödememe Durumunda Ne Yapılır?' },
      { type: 'p', text: '634 sayılı Kat Mülkiyeti Kanunu\'nun 20. maddesi, aidat borçlarını zamanında ödemeyen kat maliklerine gecikme tazminatı ve icra takibi uygulanabileceğini açıkça düzenler. Yönetici ya da yönetim firması, borcun ödenmemesi halinde yasal yollara başvurma yetkisine sahiptir.' },
      { type: 'h2', text: 'Aidat İcra Sürecinin Adımları' },
      { type: 'ol', items: [
        'İhtarname gönderimi (noterden veya iadeli taahhütlü)',
        'İcra müdürlüğüne başvuru (ilamsız icra takibi)',
        'Borçlunun itiraz süresi (7 gün)',
        'İtiraz halinde itirazın iptali davası',
        'Kesinleşen alacak için haciz işlemleri',
      ] },
      { type: 'h2', text: 'Yönetim Hukuku Danışmanlığı Neleri Kapsar?' },
      { type: 'ul', items: [
        'Aidat borçlarında icra takibi',
        'Kat Mülkiyeti Kanunu kapsamında danışmanlık',
        'Kat malikleri kurulu kararlarının hukuki denetimi',
        'Yönetim planı hazırlama ve güncelleme',
      ] },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: 'Aidat borcunda faiz işler mi?' },
      { type: 'p', text: 'Evet. KMK md. 20 uyarınca, ödeme tarihinden itibaren yasal faiz işler. Yönetim planında daha yüksek gecikme tazminatı öngörülebilir.' },
      { type: 'h3', text: 'İcra takibi başlatmadan önce ihtarname zorunlu mu?' },
      { type: 'p', text: 'Yasal zorunluluk olmasa da ihtarname; ödeme yapılmasını kolaylaştırır, yargı sürecini hızlandırır ve mahkemede iyi niyet belgesi işlevi görür.' },
      { type: 'cta', text: 'Aidat takibi ve hukuk danışmanlığı için bize ulaşın.', href: '/teklif-al', label: 'Ücretsiz Danışmanlık' },
    ],
  },
];

export const POST_SLUGS = POSTS.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function isValidPost(slug: string): boolean {
  return POST_SLUGS.includes(slug);
}

/** Okuma süresi tahmini (Faz 177) — ~200 kelime/dakika. */
export function readingMinutes(post: Post): number {
  const words = post.content.reduce((n, b) => {
    if ('text' in b) return n + b.text.split(/\s+/).length;
    if ('items' in b) return n + b.items.join(' ').split(/\s+/).length;
    return n;
  }, post.title.split(/\s+/).length);
  return Math.max(2, Math.round(words / 200));
}

/** İlgili yazılar (Faz 158/174): aynı kategori/tag önceliğiyle. */
export function relatedPosts(post: Post, limit = 3): Post[] {
  return POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function postsByCategory(slug: string): Post[] {
  return POSTS.filter((p) => p.category === slug);
}
export function postsByTag(tag: string): Post[] {
  return POSTS.filter((p) => p.tags.includes(tag));
}
export function postsByAuthor(slug: string): Post[] {
  return POSTS.filter((p) => p.author === slug);
}
export const ALL_TAGS = Array.from(new Set(POSTS.flatMap((p) => p.tags)));
