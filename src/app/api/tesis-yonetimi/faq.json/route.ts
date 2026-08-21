import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 86400;

const FAQS = [
  // --- Genel & Kapsam ---
  {
    group: 'genel',
    question: 'Profesyonel tesis yönetimi neleri kapsar?',
    answer:
      'Tesis yönetimi; 5188 sayılı kanuna uygun fiziki güvenlik, ortak alan temizliği, asansör ve jeneratör teknik bakımı, aidat takibi, KMK hukuki danışmanlığı, peyzaj ve havuz bakımını tek çatı altında entegre olarak kapsar.',
  },
  {
    group: 'genel',
    question: 'Tesis yönetimi hangi bina tiplerine hizmet verir?',
    answer:
      'Apartman, site, rezidans, lüks konut, ticari plaza, ofis binası, AVM, toplu konut, sanayi tesisi ve fabrika gibi tüm çok katlı veya karma kullanımlı yapılara profesyonel tesis yönetimi hizmeti sunulmaktadır.',
  },
  {
    group: 'genel',
    question: 'Entegre tesis yönetimi ile tek tek hizmet almak arasındaki fark nedir?',
    answer:
      'Entegre tesis yönetiminde güvenlik, temizlik, teknik bakım ve aidat takibi tek sözleşme ve tek operatör çatısı altında yürütülür. Bu model, hizmetler arası koordinasyon boşluklarını ortadan kaldırır, maliyet optimizasyonu sağlar ve hesap verebilirliği artırır.',
  },
  {
    group: 'genel',
    question: 'Tesis yönetimi için yasal zorunluluk var mı?',
    answer:
      '634 Sayılı Kat Mülkiyeti Kanunu\'na göre 8 ve üzeri bağımsız bölümlü yapılarda yönetici atanması zorunludur. Özel güvenlik hizmetleri ise 5188 Sayılı Kanun kapsamında lisanslı şirketler tarafından verilmelidir.',
  },
  // --- Maliyet & Tasarruf ---
  {
    group: 'maliyet',
    question: 'Tesis yönetimi şirketiyle çalışmak aidatları düşürür mü?',
    answer:
      'Evet. Toplu satın alma gücü, önleyici teknik bakım ve enerji tasarrufu uygulamaları sayesinde Alo Yönetim ile çalışan tesislerde işletme giderlerinde %20 ile %30 arasında somut maliyet tasarrufu sağlanır.',
  },
  {
    group: 'maliyet',
    question: 'Tesis yönetimi hizmetinin aylık maliyeti nedir?',
    answer:
      'Maliyet; bina tipi, daire sayısı, hizmet kapsamı ve ilçeye göre değişir. Rezidanslarda daire başına aylık ₺850-1.600, toplu konutlarda ₺550-1.100 arasında değişmektedir. Kesin fiyat için ücretsiz keşif talep ediniz.',
  },
  {
    group: 'maliyet',
    question: '%20-30 tasarruf nasıl sağlanır?',
    answer:
      'Tasarruf; toplu tedarik avantajı (malzeme, bakım, sigorta), kompanzasyon panosu ile reaktif güç cezası sıfırlama, önleyici bakım ile büyük arıza masraflarını önleme ve kapıcı kıdem tazminatı yükünün üstlenilmesiyle oluşur.',
  },
  {
    group: 'maliyet',
    question: 'Tesis yönetimi hizmet bedeli nasıl hesaplanır?',
    answer:
      'Hizmet bedeli; bina büyüklüğü (m²), bağımsız bölüm sayısı, güvenlik personeli ihtiyacı, havuz/peyzaj gibi özel hizmet talepleri ve ilçe bazlı operasyon maliyetleri dikkate alınarak hesaplanır. Şeffaf kalem kalem fiyatlandırma uygulanır.',
  },
  {
    group: 'maliyet',
    question: 'Aidatları geciktiren sakinler için ek maliyet oluşur mu?',
    answer:
      'KMK m.20 uyarınca geciken aidatlara yasal faiz işletilir; bu faiz gelir kat malikleri kuruluna aktarılır. Alo Yönetim otomatik SMS tahsilat ve hukuki icra desteği ile tahsilat oranını %98\'e taşır.',
  },
  {
    group: 'maliyet',
    question: 'Tesis yönetim şirketi için KDV durumu nedir?',
    answer:
      'Tesis yönetimi hizmet bedeli %20 KDV\'ye tabidir. Ancak bazı saf işçilik hizmetleri (güvenlik, temizlik personeli temini) indirimli KDV oranından yararlanabilir; vergi danışmanınızla doğrulayınız.',
  },
  // --- Süreç & Devir ---
  {
    group: 'surec',
    question: 'Yönetim devir süreci ne kadar sürer?',
    answer:
      'Devir teslim süreci ortalama 48 saat içinde tamamlanır. Mevcut hizmetlerde hiçbir kesinti yaşanmadan, tüm sistemler ve personel entegrasyonu pürüzsüzce gerçekleştirilir.',
  },
  {
    group: 'surec',
    question: 'Profesyonel yönetime geçiş için kat malikleri kurulu kararı gerekli mi?',
    answer:
      'Evet. KMK m.34 uyarınca yönetici veya yönetim şirketi, kat malikleri kurulu tarafından oy çokluğuyla belirlenir. Olağan toplantı beklenmeden olağanüstü kurul da toplanabilir.',
  },
  {
    group: 'surec',
    question: 'Mevcut yöneticiden Alo Yönetim\'e geçiş nasıl yapılır?',
    answer:
      'Kat malikleri kurulunda yönetim değişikliği kararı alındıktan sonra noter onaylı devir teslim protokolü imzalanır. Eski yöneticiden kasa, banka hesapları, demirbaş listesi ve belgeler teslim alınır.',
  },
  {
    group: 'surec',
    question: 'Devir sırasında site sakinleri hizmet kesintisi yaşar mı?',
    answer:
      'Hayır. Alo Yönetim\'in devir protokolü, mevcut güvenlik, temizlik ve teknik bakım personelinin sürekliliğini güvence altına alır. Sakinler herhangi bir hizmet kesintisi yaşamadan geçiş tamamlanır.',
  },
  {
    group: 'surec',
    question: 'Tesis keşfi ve teklif alma süreci nasıl işler?',
    answer:
      'Talep formunu doldurmanız ya da 0216 550 48 48\'i aramanız üzerine uzman ekibimiz 24 saat içinde tesisi yerinde inceler, mevcut durumu raporlar ve şeffaf kalem kalem teklifi sunar. Keşif tamamen ücretsizdir.',
  },
  // --- Hukuki & KMK ---
  {
    group: 'hukuki',
    question: 'KMK Madde 37 işletme projesi nedir?',
    answer:
      'İşletme projesi; yöneticinin her yıl hazırladığı, 12 aylık tahmini gelir-gider ve her kat malikine düşen avans tutarını gösteren belgedir. Tebliğden 7 gün içinde itiraz edilmezse kesinleşir ve icra takibine dayanak olur.',
  },
  {
    group: 'hukuki',
    question: 'Site yöneticisinin hukuki sorumlulukları nelerdir?',
    answer:
      'KMK kapsamında yönetici; işletme projesi hazırlamak, aidatları toplamak, ortak giderleri ödemek, sigorta yaptırmak, bakım-onarım yaptırmak ve hesap vermekle yükümlüdür. Alo Yönetim tüm bu sorumlulukları üstlenir.',
  },
  {
    group: 'hukuki',
    question: 'Aidat ödemeyenlere karşı nasıl yasal işlem başlatılır?',
    answer:
      'Kesinleşmiş işletme projesi İİK m.68/1 kapsamında resmi belge sayılır; mahkeme kararı beklenmeksizin icra takibi başlatılabilir. Alo Yönetim anlaşmalı hukuk bürosu aracılığıyla bu süreci yönetir.',
  },
  {
    group: 'hukuki',
    question: 'Kat malikleri kurulu toplantısı düzenleme yükümlülüğü nedir?',
    answer:
      'KMK m.29\'a göre olağan genel kurul her yıl en geç Ocak ayında yapılır. Yönetici, toplantıyı en az 15 gün önce taahhütlü mektup ya da kapı ilanıyla duyurur.',
  },
  {
    group: 'hukuki',
    question: '5188 Sayılı Kanun kapsamında özel güvenlik zorunlu mu?',
    answer:
      'Kanun güvenlik personeli çalıştırmayı zorunlu kılmasa da 200+ dairelik sitelerde sigorta şartları ve mahkeme içtihatları açısından lisanslı güvenlik avantaj sağlar. Alo Yönetim tüm güvenlik personelini 5188 belgeli olarak çalıştırır.',
  },
  // --- Teknik ---
  {
    group: 'teknik',
    question: 'Asansör yeşil etiket zorunluluğu nedir?',
    answer:
      'Asansör Yönetmeliği (2014/33/AB) kapsamında her asansörün yılda en az bir kez periyodik kontrolü ve yeşil etiket onayı zorunludur. Alo Yönetim yetkili A tipi muayene kuruluşlarıyla bu süreci takip eder.',
  },
  {
    group: 'teknik',
    question: 'Jeneratörün periyodik bakım sıklığı nedir?',
    answer:
      'Jeneratörler ayda bir kez 30 dakika yük testi, yılda bir kez kapsamlı bakım (yağ, filtre, akü, yakıt sistemi) gerektirir. Alo Yönetim bu bakımları planlı olarak gerçekleştirir ve raporlar.',
  },
  {
    group: 'teknik',
    question: 'Kompanzasyon sistemi neden önemlidir?',
    answer:
      'Reaktif güç tüketimi elektrik dağıtım şirketlerince ceza tarife olarak faturalanır. Kompanzasyon panosu bu cezaları sıfırlar; çoğu büyük sitede aylık ₺3.000-10.000 tasarruf sağlar.',
  },
  {
    group: 'teknik',
    question: 'Yangın sistemi bakımı kim tarafından yapılmalıdır?',
    answer:
      'Yangın söndürme sistemleri Türk Standartları ve NFPA standartlarına uygun yetkili servisler tarafından yılda bir kez bakıma tabi tutulmalıdır. Alo Yönetim bu bakımları planlı olarak sözleşme kapsamında yaptırır.',
  },
  {
    group: 'teknik',
    question: 'Hidrofor sistemi ne sıklıkla bakım gerektirir?',
    answer:
      'Hidrofor pompaları 3 ayda bir çalışma testi, yılda bir kapsamlı bakım (conta, vana, basınç ayarı) gerektirir. Düzgün bakım yapılmayan hidrofor sistemi su baskını riskine yol açabilir.',
  },
  // --- Sektörel ---
  {
    group: 'sektoral',
    question: 'Rezidans tesis yönetimi nasıl farklılaşır?',
    answer:
      'Rezidanslarda concierge hizmetleri, valet park, lobi yönetimi ve VIP güvenlik protokolleri ön plana çıkar. Sakin memnuniyeti ve mülk değeri koruma, rezidans yönetiminin temel KPI\'larıdır.',
  },
  {
    group: 'sektoral',
    question: 'Plaza tesis yönetiminde en kritik hizmetler hangileridir?',
    answer:
      'HVAC merkezi klimaların bakımı, enerji optimizasyonu, kiracı geçiş protokolleri ve 7/24 teknik destek plazalarda kritik öneme sahiptir. Alo Yönetim bu hizmetler için özel plaza operasyon ekipleri kullanır.',
  },
  {
    group: 'sektoral',
    question: 'Toplu konut yönetiminde aidat nasıl optimize edilir?',
    answer:
      'Toplu satın alma, hizmet konsolidasyonu ve enerji tasarrufu projeleri aracılığıyla büyük sitelerde daire başına aidatı %25-35 düşürmek mümkündür. Sosyal tesis işletmesinin gelire katkısı da aidatı azaltır.',
  },
  {
    group: 'sektoral',
    question: 'Sanayi tesislerinde tesis yönetimi nasıl uygulanır?',
    answer:
      'Sanayi tesislerinde ISO 45001 iş güvenliği denetimleri, endüstriyel zemin bakımı, yangın ve hidrofor sistemleri ile perimetre güvenliği öne çıkar. Üretim sürekliliği kritik olduğundan reaktif müdahale süreleri önceliklidir.',
  },
  {
    group: 'sektoral',
    question: 'Havuz yönetimi için yasal gereklilikler nelerdir?',
    answer:
      'Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği\'ne göre; pH 7.2-7.6, klor 0.5-3 ppm aralığında tutulmalı ve kayıtları düzenli tutulmalıdır. Alo Yönetim günlük ölçüm ve aylık su analiz raporunu sunar.',
  },
  // --- Bölgesel ---
  {
    group: 'bolgesel',
    question: 'İstanbul\'un hangi ilçelerine tesis yönetimi hizmeti veriliyor?',
    answer:
      'Alo Yönetim, İstanbul\'un tüm ilçelerinde (Anadolu ve Avrupa Yakası) hizmet vermektedir. Kadıköy, Ataşehir, Üsküdar, Beşiktaş, Şişli, Bakırköy, Maltepe, Kartal, Ümraniye ve diğer tüm ilçeler kapsam dahilindedir.',
  },
  {
    group: 'bolgesel',
    question: 'Anadolu Yakası tesis yönetimi fiyatları Avrupa Yakası\'ndan farklı mı?',
    answer:
      'Ulaşım maliyetleri ve piyasa koşulları nedeniyle ilçeler arası küçük fark oluşabilir. Ancak Alo Yönetim\'in İstanbul genelindeki operasyon ağı bu farkı minimize eder. Kesin bilgi için ilçe bazlı teklif talep ediniz.',
  },
  {
    group: 'bolgesel',
    question: 'İstanbul dışında hizmet veriyor musunuz?',
    answer:
      'Şu an için operasyonlarımız İstanbul\'un 39 ilçesine odaklanmaktadır. İstanbul dışı talepler için öncelikle iletişim formunu doldurmanızı ve fizibilite görüşmesi yapmanızı öneririz.',
  },
  // --- Kalite & Sertifika ---
  {
    group: 'kalite',
    question: 'Alo Yönetim\'in sahip olduğu sertifikalar nelerdir?',
    answer:
      'ISO 9001 Kalite Yönetim Sistemi, ISO 14001 Çevre Yönetim Sistemi, ISO 45001 İş Sağlığı ve Güvenliği, ISO 22301 İş Sürekliliği, 5188 Özel Güvenlik Faaliyet Belgesi ve TSE HYB Temizlik Yeterlilik Belgesi başlıca sertifikalarımızdır.',
  },
  {
    group: 'kalite',
    question: 'Hizmet kalitesi nasıl denetlenir?',
    answer:
      'Her tesis için aylık denetim raporu, anlık arıza takip sistemi ve 6 aylık kat malikleri bilgilendirme toplantısı standart olarak uygulanır. Sakinler dijital portal üzerinden talep açabilir ve süreci takip edebilir.',
  },
  {
    group: 'kalite',
    question: 'Acil durumlarda müdahale süresi ne kadar?',
    answer:
      'SLA kapsamında kritik arızalar (su baskını, asansör sıkışması, güvenlik ihlali) için maksimum 45 dakika müdahale süresi taahhüt edilir. 7/24 acil hattımız kesintisiz hizmet vermektedir.',
  },
  {
    group: 'kalite',
    question: 'Alo Yönetim kaç yıldır faaliyette?',
    answer:
      '2009 yılında kurulan Alo Yönetim ve Organizasyon A.Ş., 15+ yıllık deneyim ve 400+ aktif proje portföyüyle İstanbul\'un köklü tesis yönetim firmalarından biridir.',
  },
];

export async function GET() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#faq`,
    name: 'Tesis Yönetimi Sıkça Sorulan Sorular',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const response = {
    meta: {
      title: 'Tesis Yönetimi SSS — Alo Yönetim',
      description: `${FAQS.length} soru-cevap: maliyet, süreç, hukuki, teknik ve sektörel tesis yönetimi sorularına kapsamlı yanıtlar.`,
      totalQuestions: FAQS.length,
      groups: ['genel', 'maliyet', 'surec', 'hukuki', 'teknik', 'sektoral', 'bolgesel', 'kalite'],
      lastUpdated: new Date().toISOString().split('T')[0],
      sourceUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    },
    jsonLd,
    faqs: FAQS,
  };

  return Response.json(response, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
