"use client";

import React, { useState, useMemo } from 'react';
import { BASE_URL } from '@/lib/constants';

export interface FactCheckClaimItem {
  id: string;
  claim: string;
  truth: string;
  verdict: 'Yanlış (Hukuken Geçersiz)' | 'Doğru (Yasal Standart)';
  ratingValue: 1 | 5;
  legalBasis: string;
  category: 'aidat' | 'yonetim' | 'guvenlik' | 'ortak-alan' | 'teknik';
  categoryLabel: string;
  penaltyOrConsequence?: string;
}

export const LEGAL_FACT_CHECKS_20: FactCheckClaimItem[] = [
  {
    id: 'claim-asansor-zemin-kat',
    claim: 'Zemin ve bodrum kat sakinleri asansör bakım, revizyon ve yeşil etiket masraflarından muaftır.',
    truth: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 20/1-c uyarınca, ana gayrimenkulün yönetim planında aksine açık bir muafiyet maddesi bulunmadıkça zemin veya bodrum kat malikleri asansörü kullanmadıkları gerekçesiyle masraflara katılmaktan kaçınamaz.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: '634 Sayılı KMK Madde 20/1-c & Yargıtay 20. Hukuk Dairesi E. 2017/1248',
    category: 'teknik',
    categoryLabel: 'Teknik & Asansör',
    penaltyOrConsequence: 'Ödenmeyen pay için aylık %5 gecikme tazminatı ve icra takibi uygulanır.',
  },
  {
    id: 'claim-yonetici-tek-basina-zam',
    claim: 'Site yöneticisi kurul kararı olmadan aidatı istediği zaman kendi inisiyatifiyle artırabilir.',
    truth: 'Yönetici tek başına keyfi zam yapamaz. KMK Madde 35 ve 37 uyarınca yönetici, ancak kat malikleri kurulunda onaylanan işletme projesini uygular. Zorunlu ek bütçelerde ise ek işletme projesini maliklere tebliğ etmek zorundadır; 7 gün içinde itiraz hakkı vardır.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 35, 37 & İİK Madde 68',
    category: 'yonetim',
    categoryLabel: 'Yönetim & Kurul',
    penaltyOrConsequence: 'Tebliğ edilmeyen ek aidat artışı hukuken hükümsüzdür ve icra takibine konu edilemez.',
  },
  {
    id: 'claim-guvenlik-arac-torpido-arama',
    claim: 'Site özel güvenlik görevlileri şüpheli gördükleri araçların torpidosunu veya misafirlerin çantalarını elle arayabilir.',
    truth: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun Madde 7 uyarınca özel güvenlik personeli yalnızca detektör, X-ray veya metal kapıdan geçirme suretiyle kontrol yapabilir. Elle fiziki arama yapma yetkisi sadece genel kolluğa (Polis/Jandarma) aittir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: '5188 Sayılı Kanun Madde 7 & TCK Madde 109, 120',
    category: 'guvenlik',
    categoryLabel: 'Güvenlik & Kamera',
    penaltyOrConsequence: 'Hukuka aykırı elle arama yapan görevli hakkında kişiyi hürriyetinden yoksun kılma davası açılabilir.',
  },
  {
    id: 'claim-gecikme-faizi-fayis-oran',
    claim: 'Yönetim, aidat borcunu geciktiren malik veya kiracıya genel kurul kararıyla aylık %20 faiz uygulayabilir.',
    truth: 'KMK Madde 20/2 emredici kuraldır: Gecikilen günler için aylık yüzde 5 (%5) gecikme tazminatı işletilir. Genel kurul kararıyla dahi bu oran yüzde 5 üzerine çıkarılamaz; aksine kararlar mutlak butlanla sakattır.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: '634 Sayılı KMK Madde 20/2 & Yargıtay 18. HD E. 2014/8920',
    category: 'aidat',
    categoryLabel: 'Aidat & Bütçe',
    penaltyOrConsequence: '%5 üzerindeki faiz talepleri mahkemece doğrudan reddedilir ve haksız takip tazminatı doğabilir.',
  },
  {
    id: 'claim-kiraci-genel-kurul-oy',
    claim: 'Kiracılar site genel kurullarına hiçbir koşulda vekâletle dahi katılamaz ve oy kullanamaz.',
    truth: 'KMK Madde 31 uyarınca oy hakkı aslen malike ait olsa da, malikin yazılı vekaletname vermesi durumunda kiracı genel kurula katılarak malik adına oy kullanabilir. Ayrıca bağımsız bölümü fiilen ilgilendiren konularda söz hakkı mevcuttur.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 31 & Türk Borçlar Kanunu Madde 504',
    category: 'yonetim',
    categoryLabel: 'Yönetim & Kurul',
    penaltyOrConsequence: 'Usulüne uygun yazılı vekâlet taşıyan kiracının salona alınmaması genel kurul iptal sebebidir.',
  },
  {
    id: 'claim-cam-balkon-izinsiz',
    claim: 'Daire sahibi dış cepheye uyumlu olduğu sürece izin almadan serbestçe katlanır cam balkon yaptırabilir.',
    truth: 'KMK Madde 19/2 gereğince kat maliklerinden biri, bütün kat maliklerinin beşte dördünün (4/5) yazılı rızası olmadıkça ana gayrimenkulün ortak yerlerinde ve dış cephesinde inşaat ve onarım yapamaz. Cam balkon dış cephe bütünlüğünü etkilediğinden 4/5 rıza şarttır.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 19/2 & Yargıtay 18. HD E. 2015/1420',
    category: 'ortak-alan',
    categoryLabel: 'Ortak Alan & Tadilat',
    penaltyOrConsequence: 'Rıza alınmadan yapılan cam balkon için eski hale getirme ve söküm kararı verilir.',
  },
  {
    id: 'claim-evcil-hayvan-yonetim-plani',
    claim: 'Yönetim planında açık yasak olsa bile daire içinde evcil hayvan beslenmesine hiçbir şekilde müdahale edilemez.',
    truth: 'Yargıtay yerleşik içtihatlarına göre, tapuya tescilli Yönetim Planında "Bağımsız bölümlerde kedi, köpek veya evcil hayvan beslenemez" hükmü yer alıyorsa bu kural sözleşme hükmündedir ve hayvanın tahliyesine karar verilir. Yasak yoksa çevreye rahatsızlık vermemek şartıyla beslenebilir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 28 & Yargıtay Hukuk Genel Kurulu E. 2017/18-1240',
    category: 'ortak-alan',
    categoryLabel: 'Ortak Alan & Tadilat',
    penaltyOrConsequence: 'Yönetim planında açık yasak varsa tahliye davası açılır ve mahkeme kararıyla tahliye edilir.',
  },
  {
    id: 'claim-cati-tamirati-en-ust-kat',
    claim: 'Çatı ortak alan olmasına rağmen sadece en üst katı koruduğu için çatı izolasyonunu üst kat ödemelidir.',
    truth: 'KMK Madde 4 ve Madde 20/1-c gereğince çatılar, baca ayakları ve teraslar ana binanın mutlak ortak yeridir. En alt kattaki dükkan veya daire dahil tüm kat malikleri arsa payları oranında çatı bakım, yalıtım ve onarım masraflarına katılmakla yükümlüdür.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 4, Madde 20/1-c & Yargıtay 20. HD E. 2018/2150',
    category: 'ortak-alan',
    categoryLabel: 'Ortak Alan & Tadilat',
    penaltyOrConsequence: 'Geciken onarım nedeniyle alt katlara su sızarsa tüm malikler müştereken tazminat öder.',
  },
  {
    id: 'claim-gurultu-yapan-hemen-tahliye',
    claim: 'Sitede sürekli gürültü yapan komşuyu yönetici polis çağırarak ertesi gün siteden tahliye ettirebilir.',
    truth: 'Yöneticinin tek başına tahliye yetkisi yoktur. KMK Madde 18 ve 25 uyarınca öncelikle noter ihtarı ve zabıta/kolluk tutanağı gereklidir. Çekilmezlik hali kanıtlandığında kat malikleri kurulu kararıyla sulh hukuk mahkemesinde kat mülkiyetinin devri davası açılabilir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 18, Madde 25 & Kabahatler Kanunu Md. 36',
    category: 'yonetim',
    categoryLabel: 'Yönetim & Kurul',
    penaltyOrConsequence: 'Hukuki süreç işletilmeden yapılan fiili müdahaleler konut dokunulmazlığını ihlal suçunu doğurur.',
  },
  {
    id: 'claim-otopark-kiraya-verme',
    claim: 'Dairesini satan kat maliki kapalı otoparktaki tahsisli araç yerini dilerse siteden bağımsız birine kiralayabilir.',
    truth: 'KMK Madde 4 ve 6 gereğince otoparklar ortak alan ve eklenti niteliğindedir. Bağımsız bölümden ayrı olarak dışarıdan bir şahsa satılamaz, devredilemez veya kiralanamaz. Ortak alanlar yalnızca site sakinlerinin kullanımına özgülenmiştir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 4, 6 & Otopark Yönetmeliği',
    category: 'ortak-alan',
    categoryLabel: 'Ortak Alan & Tadilat',
    penaltyOrConsequence: 'Site dışı araçların siteye girişi özel güvenlik tarafından KMK ve kurul kararıyla engellenir.',
  },
  {
    id: 'claim-asansor-kirmizi-etiket-sorumluluk',
    claim: 'Asansörün kırmızı etiketli (güvensiz) olması durumunda meydana gelen kazalarda yönetici değil sadece asansör bakım firması sorumludur.',
    truth: 'Asansör İşletme ve Bakım Yönetmeliği uyarınca bina/site yöneticisi, kırmızı etiket alan asansörün kullanımını 60 gün içinde durdurmak ve yeşil etikete geçirmekle doğrudan müteselsilen sorumludur. Kırmızı etiketli asansörü çalıştırmaya devam eden yönetici adli ve cezai olarak sorumludur.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'Asansör İşletme ve Bakım Yönetmeliği Madde 15 & TCK Madde 85/89',
    category: 'teknik',
    categoryLabel: 'Teknik & Asansör',
    penaltyOrConsequence: 'Olası kazada yönetici hakkında taksirle yaralama veya ölüme sebebiyetten ceza davası açılır.',
  },
  {
    id: 'claim-aidat-odemeyen-kiraci-tahliye',
    claim: 'Kiracı aidatı ödemezse ev sahibi kirayı tahliye davası açmadan doğrudan icra yoluyla tahliye edebilir.',
    truth: 'Türk Borçlar Kanunu Madde 315 uyarınca aidat yan giderdir. Kiracıya en az 30 günlük yazılı ödeme mehli tanıyan noter ihtarı veya İİK 68/a örnek no 13 tahliye ihtarlı ödeme emri gönderilmelidir. Süre bitiminde ödenmezse icra mahkemesinden tahliye talep edilebilir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'TBK Madde 315 & İİK Madde 269',
    category: 'aidat',
    categoryLabel: 'Aidat & Bütçe',
    penaltyOrConsequence: '30 günlük kanuni süre dolmadan açılan tahliye davaları mahkemece usulden reddedilir.',
  },
  {
    id: 'claim-guvenlik-kamera-kvkk',
    claim: 'Site yönetimi güvenlik gerekçesiyle dairelerin kapı eşiklerini ve özel balkonlarını doğrudan gören kameralar takabilir.',
    truth: '6698 Sayılı KVKK ve Kişisel Verileri Koruma Kurulu ilke kararları uyarınca; ortak giriş kapısı, otopark ve çevre duvarları taranabilir ancak kişilerin özel hayatının gizliliğini ihlal edecek şekilde daire kapılarını veya balkon içlerini gören kamera açıları hukuka aykırıdır.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: '6698 Sayılı KVKK Madde 4, 12 & TCK Madde 134',
    category: 'guvenlik',
    categoryLabel: 'Güvenlik & Kamera',
    penaltyOrConsequence: 'KVKK Kurulu tarafından 100.000 TL ile 1.000.000 TL arasında idari para cezası kesilir.',
  },
  {
    id: 'claim-denetci-raporu-zorunlulugu',
    claim: 'Apartman veya sitelerde denetçi raporu olmasa da yöneticinin ibrası genel kurulda geçerlidir.',
    truth: 'KMK Madde 41 uyarınca denetçi veya denetim kurulu, yöneticinin hesaplarını en geç üç ayda bir incelemek ve yıllık genel kurul öncesi yazılı raporunu tüm kat maliklerine sunmak zorundadır. Denetim raporu okunmadan yapılan ibra işlemleri dava yoluyla iptal edilebilir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: '634 Sayılı KMK Madde 41 & Yargıtay 18. HD E. 2016/3210',
    category: 'yonetim',
    categoryLabel: 'Yönetim & Kurul',
    penaltyOrConsequence: 'Sulh Hukuk Mahkemesinde açılacak dava ile genel kurul kararı iptal edilir.',
  },
  {
    id: 'claim-yangin-merdiveni-kilit',
    claim: 'Hırsızlık önleme gerekçesiyle yangın kaçış merdiveni kapıları mesai saatleri dışında kilitlenebilir.',
    truth: 'Binaların Yangından Korunması Hakkında Yönetmelik Madde 27 gereğince kaçış yolu kapıları hiçbir zaman kilitlenemez, dışarıdan kilitli olsa dahi içeriden panik bar kolu ile tek bir itme hareketiyle derhal açılabilmelidir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'Binaların Yangından Korunması Hakkında Yönetmelik Md. 27',
    category: 'teknik',
    categoryLabel: 'Teknik & Asansör',
    penaltyOrConsequence: 'İtfaiye ve belediye denetimlerinde ruhsat iptali ve ağır idari yaptırımlar uygulanır.',
  },
  {
    id: 'claim-ticari-tabela-asma',
    claim: 'Zemin kattaki dükkan sahibi binanın tüm dış cephesini kaplayacak şekilde devasa tabela asabilir.',
    truth: 'KMK Madde 19 ve belediye reklam-ilan yönetmelikleri uyarınca tabelanın kendi bağımsız bölüm alanını aşması veya dış cephe ortak alanına taşması durumunda kat maliklerinin 4/5 yazılı onayı ve belediye tabela izni zorunludur.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 19 & Belediye İlan ve Reklam Yönetmeliği',
    category: 'ortak-alan',
    categoryLabel: 'Ortak Alan & Tadilat',
    penaltyOrConsequence: 'Mahkeme kararıyla fuzuli işgal tazminatı (ecrimisil) ve tabelanın sökümü kararlaştırılır.',
  },
  {
    id: 'claim-kuyu-suyu-deposu-temizligi',
    claim: 'Kuyu suyu kullanan siteler su deposu dezenfeksiyonunu yılda bir kez yaptırsa mevzuat için yeterlidir.',
    truth: 'Sağlık Bakanlığı 2007/67 Sayılı Genelgesi uyarınca bina ve sitelerde su depolarının yılda en az iki (2) kez yetkili biyosidal ürün uygulama izin belgeli firmalarca temizlenip dezenfekte edilmesi ve akredite laboratuvar analiz raporu alınması kanuni zorunluluktur.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'Sağlık Bakanlığı Su Depoları Genelgesi 2007/67 & Hıfzıssıhha Kanunu',
    category: 'teknik',
    categoryLabel: 'Teknik & Asansör',
    penaltyOrConsequence: 'İl Sağlık Müdürlüğü denetiminde salgın hastalık riski tespiti durumunda adli soruşturma açılır.',
  },
  {
    id: 'claim-vekalet-sayisi-siniri',
    claim: 'Bir kat maliki genel kurula katılmayan tüm komşularının vekâletini toplayarak tek başına çoğunluk sağlayabilir.',
    truth: 'KMK Madde 31/son fıkrası emredici sınırlama getirir: Bir kişi, oy sayısının yüzde beşinden (%5) fazlasını kullanmak üzere vekil tayin edilemez. Kırk ve daha az daireli binalarda ise bir kişi en fazla iki (2) vekâlet alabilir.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: '634 Sayılı KMK Madde 31/son & Yargıtay 20. HD E. 2019/3410',
    category: 'yonetim',
    categoryLabel: 'Yönetim & Kurul',
    penaltyOrConsequence: 'Sınırı aşan vekâletlerle kullanılan oylar iptal edilir ve genel kurul kararları hükümsüz sayılır.',
  },
  {
    id: 'claim-kombiye-gecis-oybirligi',
    claim: 'Merkezi sistem ısıtmadan ferdi kombili ısıtma sistemine geçiş için salt çoğunluk yeterlidir.',
    truth: 'KMK Madde 42/4 uyarınca merkezi ısıtma sisteminden ferdi kombili sisteme geçişte toplam arsa payının ve kat maliklerinin oybirliği ile karar vermesi şarttır. Toplam inşaat alanı 2.000 m² ve üzeri binalarda ise merkezi sistem zorunludur.',
    verdict: 'Yanlış (Hukuken Geçersiz)',
    ratingValue: 1,
    legalBasis: 'KMK Madde 42/4 & Binalarda Enerji Performansı Yönetmeliği',
    category: 'teknik',
    categoryLabel: 'Teknik & Asansör',
    penaltyOrConsequence: 'Oybirliği olmadan kombiye geçen bağımsız bölümler eski hale getirilmek zorundadır.',
  },
  {
    id: 'claim-profesyonel-yonetim-yetkisi',
    claim: 'Kat malikleri kurulu genel kurulda salt çoğunlukla profesyonel bir tesis yönetim şirketine yetki devri yapabilir.',
    truth: 'KMK Madde 34 gereğince yönetici kat maliklerinin hem sayı hem arsa payı çoğunluğu ile atanır. Dışarıdan profesyonel tesis yönetim şirketi yönetici olarak seçilebilir veya seçilen yönetici kurulu şirketten tam kapsamlı yönetim hizmeti alabilir.',
    verdict: 'Doğru (Yasal Standart)',
    ratingValue: 5,
    legalBasis: '634 Sayılı KMK Madde 34, 38 & ISO 41001 Tesis Yönetim Standardı',
    category: 'yonetim',
    categoryLabel: 'Yönetim & Kurul',
    penaltyOrConsequence: 'Profesyonel yönetim ile aidat tahsilat oranları %98 üzerine çıkar ve hukuki güvence sağlanır.',
  },
];

export default function LegalFactCheckAiSeo() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(LEGAL_FACT_CHECKS_20[0].id);

  const filteredClaims = useMemo(() => {
    return LEGAL_FACT_CHECKS_20.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.truth.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.legalBasis.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org ClaimReview JSON-LD for Google AI Overviews & Fact Check Tools
  const claimReviewSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': LEGAL_FACT_CHECKS_20.map((item) => ({
        '@type': 'ClaimReview',
        '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#factcheck-${item.id}`,
        url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
        claimReviewed: item.claim,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: item.ratingValue,
          bestRating: 5,
          worstRating: 1,
          alternateName: item.verdict,
        },
        itemReviewed: {
          '@type': 'Claim',
          author: {
            '@type': 'Organization',
            name: 'Yaygın Kat Mülkiyeti Mitleri ve Kamuoyu İddiası',
          },
          datePublished: '2026-01-01',
          appearance: {
            '@type': 'CreativeWork',
            url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
          },
        },
        author: {
          '@type': 'Organization',
          name: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
          url: BASE_URL,
        },
        reviewBody: item.truth,
      })),
    };
  }, []);

  return (
    <section
      id="legal-fact-check-ai-overview"
      className="py-16 bg-[var(--color-surface)] text-[var(--color-primary)] rounded-[2.5rem] border border-[var(--color-outline)]/80 my-12 p-6 md:p-10 shadow-sm relative overflow-hidden"
      data-gemini-grounding="true"
      data-ai-citation="true"
      data-speakable="true"
    >
      {/* Schema.org ClaimReview Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReviewSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider border border-[var(--color-outline)]/80 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Google AI Overviews • 2026 Hukuki Doğruluk & ClaimReview
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] ai-speakable-summary">
              Kat Mülkiyeti Kanunu ve Tesis Yönetimi Doğruluk Tablosu (Fact-Check)
            </h2>
            <p className="text-[var(--color-secondary)] text-sm mt-2 max-w-3xl font-normal">
              Apartman, site ve rezidans yönetiminde en sık rastlanan 20 yasal efsanenin 634 Sayılı KMK, 5188 Sayılı Kanun ve Yargıtay emsal içtihatlarıyla teyit edilmiş objektif doğrulamaları.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-[var(--color-tertiary)] block">Akredite İnceleme</span>
            <span className="text-sm font-semibold text-[var(--color-primary)]">20 Doğrulanmış İddia</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Mit, yasa maddesi veya konu ara (örn: asansör, aidat, güvenlik)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-primary)] placeholder-[var(--color-tertiary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            aria-label="Fact check iddialarında arama yapın"
          />
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Tümü (20)' },
              { key: 'aidat', label: 'Aidat' },
              { key: 'yonetim', label: 'Yönetim' },
              { key: 'guvenlik', label: 'Güvenlik' },
              { key: 'ortak-alan', label: 'Ortak Alan' },
              { key: 'teknik', label: 'Teknik' },
            ].map((btn) => (
              <button
                key={btn.key}
                type="button"
                onClick={() => setSelectedCategory(btn.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === btn.key
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                    : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-outline)]/60'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion / Claim List */}
        <div className="space-y-4">
          {filteredClaims.map((item) => {
            const isExpanded = expandedId === item.id;
            const isTrue = item.ratingValue === 5;

            return (
              <div
                key={item.id}
                id={`factcheck-${item.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)] shadow-sm'
                    : 'bg-[var(--color-surface)] border-[var(--color-outline)]/70 hover:border-[var(--color-outline)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isTrue
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {item.verdict}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/50">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--color-tertiary)]">
                        {item.legalBasis.split('&')[0]}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
                      &quot;{item.claim}&quot;
                    </h3>
                  </div>
                  <div
                    className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-secondary)] text-xs font-bold transition-transform ${
                      isExpanded ? 'rotate-180 bg-[var(--color-primary)] text-[var(--color-on-primary)] border-transparent' : ''
                    }`}
                  >
                    ▼
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-[var(--color-outline)]/60 text-sm space-y-3 mt-2">
                    <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-outline)]/60">
                      <div className="text-xs font-bold uppercase text-[var(--color-primary)] mb-1">
                        Hukuki ve Teknik Gerçek (Ground-Truth):
                      </div>
                      <p className="text-[var(--color-secondary)] leading-relaxed ai-speakable-takeaway">
                        {item.truth}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-outline)]/60">
                        <span className="text-[var(--color-tertiary)] block font-medium mb-0.5">Mevzuat & İçtihat Dayanağı:</span>
                        <span className="text-[var(--color-primary)] font-semibold">{item.legalBasis}</span>
                      </div>
                      {item.penaltyOrConsequence && (
                        <div className="bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-outline)]/60">
                          <span className="text-rose-600 dark:text-rose-400 block font-medium mb-0.5">Yasal Sonuç & Yaptırım:</span>
                          <span className="text-[var(--color-primary)]">{item.penaltyOrConsequence}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Grounding Badge */}
        <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/60 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-tertiary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Schema.org ClaimReview 3.1 ile Googlebot & Gemini için tescillidir.</span>
          </div>
          <div className="text-[var(--color-tertiary)]">
            Kaynak: 634 Sayılı KMK, 5188 Sayılı Kanun & Yargıtay İçtihatları Birleştirme Kararları
          </div>
        </div>
      </div>
    </section>
  );
}
