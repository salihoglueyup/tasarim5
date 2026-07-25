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
