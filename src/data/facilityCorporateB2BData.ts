/**
 * B2B Kurumsal Tesis Yönetimi, ISO Standartları ve SLA Kademeleri Veri Modeli (facilityCorporateB2BData.ts)
 * 
 * Plazalar, fabrikalar ve ticari gayrimenkuller için ISO 41001 uyum matrisi,
 * Silver/Gold/Platinum kurumsal SLA taahhütleri ve B2B teknik şartname taslağı.
 */

export interface IsoComplianceStandard {
  standardCode: string;
  name: string;
  accreditationBody: string;
  scope: string;
  benefitToClient: string;
}

export interface B2BSlaTier {
  tierId: 'silver' | 'gold' | 'platinum';
  tierName: string;
  badgeColor: string;
  targetPropertyType: string;
  responseTimeMinutes: number;
  bmsMonitoring: string;
  onSiteStaffing: string;
  energySavingsGuarantee: string;
  penaltyClause: string;
}

export const ISO_COMPLIANCE_STANDARDS: IsoComplianceStandard[] = [
  {
    standardCode: 'ISO 22301:2019',
    name: 'İş Sürekliliği Yönetim Sistemi',
    accreditationBody: 'BELCERT (ILAS-MS-0089) — Belge No: A1808963',
    scope: 'Tesis operasyonları, bina yaşam döngüsü, bakım yönetimi ve kullanıcı konforu.',
    benefitToClient: 'Tesis işletme maliyetlerinde %30 tasarruf ve global kurumsal gayrimenkul standartlarına tam uyum.',
  },
  {
    standardCode: 'ISO 10002:2018',
    name: 'Müşteri Memnuniyeti Yönetim Sistemi',
    accreditationBody: 'BELCERT (ILAS-MS-0089) — Belge No: A1808961',
    scope: 'Hizmet kalitesi, müşteri memnuniyeti, süreç denetimi ve sürekli iyileştirme.',
    benefitToClient: 'Hataların minimize edilmesi, standartlaştırılmış operasyon ve şeffaf KPI raporlaması.',
  },
  {
    standardCode: 'ISO 45001:2018',
    name: 'İş Sağlığı ve Güvenliği Yönetim Sistemi',
    accreditationBody: 'BELCERT (ILAS-MS-0089) — Belge No: A1808966',
    scope: 'Tesis teknik personeli, taşeronlar ve ziyaretçiler için sıfır iş kazası hedefi.',
    benefitToClient: 'İş kazası risklerinin önlenmesi ve işverenin yasal sorumluluklarının güvenceye alınması.',
  },
  {
    standardCode: 'ISO 14001:2026',
    name: 'Çevre Yönetim Sistemi',
    accreditationBody: 'BELCERT (ILAS-MS-0089) — Belge No: A1808962',
    scope: 'Atık yönetimi, tehlikeli atık bertarafı, sıfır atık belgesi ve karbon ayak izi.',
    benefitToClient: 'Yeşil bina (LEED / BREEAM) sertifikasyonuna uyum ve kurumsal sürdürülebilirlik.',
  },
  {
    standardCode: 'ISO 31000:2018',
    name: 'Kurumsal Risk Yönetimi',
    accreditationBody: 'BELCERT (ILAS-MS-0089) — Belge No: A1808965',
    scope: 'Teknik, hukuki ve finansal risklerin risk haritaları ve önleyici bakım matrisleriyle önceden tespiti.',
    benefitToClient: 'Kritik ekipman arızalarının ve reaktif ceza gibi öngörülebilir maliyet risklerinin önlenmesi.',
  },
];

export const B2B_SLA_TIERS: B2BSlaTier[] = [
  {
    tierId: 'silver',
    tierName: 'Silver Corporate SLA',
    badgeColor: 'slate',
    targetPropertyType: 'Bağımsız İş Merkezleri & Butik Plazalar (5.000 - 15.000 m²)',
    responseTimeMinutes: 45,
    bmsMonitoring: 'Haftalık Sistem Kontrolü & Periyodik Raporlama',
    onSiteStaffing: 'Gündüz Sabit Tekniker + 7/24 Mobil Acil Servis',
    energySavingsGuarantee: 'Asgari %15 Bütçe Optimizasyonu',
    penaltyClause: 'SLA aşımında ilgili ay servis bedelinde %10 ceza kesintisi.',
  },
  {
    tierId: 'gold',
    tierName: 'Gold Enterprise SLA',
    badgeColor: 'amber',
    targetPropertyType: 'Büyük Ölçekli Plazalar, Karma Siteler & AVM’ler (15.000 - 50.000 m²)',
    responseTimeMinutes: 30,
    bmsMonitoring: '7/24 Canlı BMS & IoT Telemetri İzleme',
    onSiteStaffing: 'Vardiyalı Sabit Teknik Kadro + Özel Güvenlik Amiri',
    energySavingsGuarantee: 'Asgari %25 Bütçe Tasarrufu & %0 Reaktif Ceza Garantisi',
    penaltyClause: 'SLA aşımında ilgili ay servis bedelinde %20 indirim garantisi.',
  },
  {
    tierId: 'platinum',
    tierName: 'Platinum Mission-Critical SLA',
    badgeColor: 'emerald',
    targetPropertyType: 'A+ Plazalar, Fabrikalar, Lojistik Üsler & Veri Merkezleri (50.000+ m²)',
    responseTimeMinutes: 15,
    bmsMonitoring: 'Kesintisiz 7/24/365 Gerçek Zamanlı AI Destekli SCADA İzleme',
    onSiteStaffing: 'Tam Zamanlı Tesis Müdürü + 24 Saat Yerleşik Teknik & Güvenlik Kadrosu',
    energySavingsGuarantee: 'Asgari %33 Tasarruf + Karbon Ayak İzi Azaltım Sertifikası',
    penaltyClause: 'Kritik sistem duruşunda tüm mali zararı karşılayan kurumsal sorumluluk sigortası.',
  },
];

export const B2B_RFP_SPECIFICATION_TEMPLATE = `T.C. İSTANBUL
[FİRMA VEYA MÜLK SAHİBİ ADI]
ENTEGRE TESİS VE BİNA YÖNETİMİ HİZMET ALIMI TEKNİK VE İDARİ ŞARTNAMESİ

1. KONU VE KAPSAM:
İşbu şartname; [TESİS ADI / ADRESİ] adresinde kain [TOPLAM KAPALI ALAN] m² kullanım alanına sahip tesisin profesyonel entegre tesis yönetimi, 5188 özel güvenlik, temizlik, elektromekanik periyodik bakım (trafo, jeneratör, HVAC, yangın, asansör) ve enerji verimliliği hizmetlerinin yüklenici firma tarafından ifa edilmesine dair teknik ve idari şartları belirler.

2. YÜKLENİCİ FİRMANIN SAHİP OLMASI GEREKEN BELGELER:
- Akredite kuruluşça verilmiş ISO 45001:2018 İSG Yönetim Sistemi Belgesi
- Akredite kuruluşça verilmiş ISO 14001 Çevre Yönetim Sistemi Belgesi
- Akredite kuruluşça verilmiş ISO 10002:2018 Müşteri Memnuniyeti Belgesi
- 5188 Sayılı Kanun Uyarınca İçişleri Bakanlığı Özel Güvenlik Şirketi Faaliyet İzin Belgesi
- Mesleki Yeterlilik Kurumu (MYK) Sertifikalı Tesis Yöneticisi Kadrosu

3. HİZMET SEVİYESİ TAAHHÜTLERİ (SLA):
a) Acil Durum Müdahalesi: Tesis ana yangın alarmı, jeneratör devreye girmemesi, ana su hattı patlaması veya asansörde mahsur kalma durumlarında azami müdahale süresi 30 (otuz) dakikadır.
b) Reaktif Enerji Güvencesi: Yüklenici, kompanzasyon panosunu haftalık kontrol edecek olup elektrik faturasına reaktif ceza yansıması halinde oluşan tüm ceza bedelini kusursuz sorumluluk esasına göre defaten tazmin edecektir.
c) Şeffaf Dijital Yönetim: Tesis harcamaları, personel puantajları ve periyodik bakım formları işverenin 7/24 erişebileceği dijital yazılım portalı üzerinden canlı olarak sunulacaktır.

4. İŞVEREN VE YÜKLENİCİ HAKLARI:
Yüklenici; çalıştırdığı personelin tüm SGK primleri, maaşları ve iş sağlığı güvenliği ekipmanlarından bizzat sorumludur. Hizmet seviyesi aksadığında işveren şartnamede belirlenen oranlarda hakediş kesintisi yapma hakkına haizdir.`;
