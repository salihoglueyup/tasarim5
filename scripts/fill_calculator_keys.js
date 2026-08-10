const fs = require('fs');
const path = require('path');

const newTranslations = {
  // Cleaning
  "calc_clean_title": "Temizlik Maliyeti Hesapla",
  "calc_clean_desc": "Tesisinizin m²'sine uygun optimum temizlik personeli ve malzeme bütçenizi anında belirleyin.",
  "calc_clean_area": "Tesis Alanı (m²)",
  "calc_clean_optimum": "Optimum Personel Sayısı",
  "calc_est_budget": "Tahmini Aylık Bütçe",
  "calc_disclaimer_cleaning": "* KDV hariç ortalama aylık maliyettir. Temizlik makine amortismanları ve sarf malzemeler dahildir.",
  
  // Facility
  "calc_fac_title": "Tesis Yönetim Bütçesi Hesapla",
  "calc_fac_desc": "Sitenizin daire sayısına göre işletme bütçesi ve ölçek ekonomisiyle sağlanacak tasarrufu hesaplayın.",
  "calc_fac_flats": "Bağımsız Bölüm (Daire) Sayısı",
  "calc_fac_avg_dues": "Ortalama Aidat Tahmini",
  "calc_fac_net_savings": "Sağlanan Ölçek Tasarrufu",
  "calc_disclaimer_facility": "* Tesisin yaşına ve donatılarına göre (havuz, spor salonu) değişiklik gösterebilir.",
  
  // Dues
  "calc_dues_title": "Aidat Tahsilat Tasarrufu Hesapla",
  "calc_dues_desc": "Profesyonel aidat takibi ile gecikme faizlerinden ve tahsilat kayıplarından ne kadar tasarruf edeceğinizi görün.",
  "calc_dues_units": "Daire Sayısı",
  "calc_dues_yearly_savings": "Yıllık Tahmini Tahsilat Kurtarımı",
  "calc_disclaimer_dues": "* Sistem üzerinden kredi kartı ile tahsilat ve sms hatırlatmaları sonucu elde edilen ortalama başarı oranıdır.",
  
  // Landscape
  "calc_land_title": "Peyzaj & Bahçe Bakım Bütçesi",
  "calc_land_desc": "Yeşil alan m²'sine göre sulama, gübreleme, biçme ve bahçıvan maliyetlerinizi analiz edin.",
  "calc_land_area": "Yeşil Alan Büyüklüğü (m²)",
  "calc_land_engineer": "Ziraat Mühendisi Denetimi",
  "calc_included_standard": "Standart Pakete Dahil",
  "calc_disclaimer_landscape": "* Sezonluk bitki değişimi ve büyük ağaç budama işlemleri ek maliyetlendirme gerektirebilir.",
  
  // Legal
  "calc_legal_title": "İcra & Hukuk Danışmanlık Oranı",
  "calc_legal_desc": "Gecikmiş aidat borçlarınız için başlatılacak hukuki süreçlerin tahsilat başarı oranını hesaplayın.",
  "calc_legal_debt": "Gecikmiş Toplam Alacak (₺)",
  "calc_legal_cost": "Site Yönetimi Avukat Masrafı",
  "calc_legal_zero_cost": "0 ₺ (Borçluya Yansıtılır)",
  "calc_legal_recovery": "30 Gün İçinde Tahmini Tahsilat",
  "calc_legal_included": "Otomatik Dosya Takibi Dahil",
  
  // Maintenance
  "calc_maint_title": "Teknik Bakım Bütçesi Hesapla",
  "calc_maint_desc": "Asansör, jeneratör ve kazan dairesi periyodik bakım maliyetlerinizi tesis özelliklerine göre hesaplayın.",
  "calc_maint_elevators": "Asansör Sayısı",
  "calc_maint_area": "Tesis Kapalı Alanı (m²)",
  "calc_disclaimer_maintenance": "* Parça değişimleri ve ağır revizyon işlemleri hesaplamaya dahil değildir.",
  
  // Pest
  "calc_pest_title": "Haşere İlaçlama Maliyeti",
  "calc_pest_desc": "Site blok sayısı ve açık alan büyüklüğüne göre Sağlık Bakanlığı onaylı ilaçlama maliyetinizi hesaplayın.",
  "calc_pest_blocks": "Blok Sayısı",
  "calc_pest_products": "Kullanılacak İlaç Miktarı",
  "calc_pest_eco": "Çevre Dostu Biyosidal İlaç",
  "calc_disclaimer_pest": "* Ortak alan, otopark ve sığınak ilaçlamasını kapsar. Daire içi işlemler için randevu alınmalıdır.",
  
  // Pool
  "calc_pool_title": "Havuz Bakım Bütçesi Hesapla",
  "calc_pool_desc": "Tesisinizin havuz hacmine göre ortalama aylık kimyasal ve operatör maliyetini anında görün.",
  "calc_pool_volume": "Havuz Hacmi (m³)",
  "calc_pool_analysis": "Su Analizi",
  "calc_pool_lab_included": "Bağımsız Laboratuvar Raporu Dahil",
  "calc_disclaimer_pool": "* KDV hariç ortalama maliyettir. Kesin fiyat ücretsiz su analizi sonrası belirlenir.",
  
  // Security
  "calc_sec_title": "Güvenlik Bütçesi Hesapla",
  "calc_sec_desc": "Tesisinizin ihtiyaç duyduğu güvenlik altyapısı için ortalama aylık personel ve teknoloji maliyetini anında görün.",
  "calc_sec_personnel": "Güvenlik Personeli Sayısı",
  "calc_sec_cameras": "Kamera Sayısı (Tahmini)",
  "calc_disclaimer_standard": "* KDV hariç ortalama maliyettir. Kesin fiyat keşif sonrası belirlenir."
};

const commonPath = path.join(__dirname, '../src/i18n/locales/tr/common.json');
const trData = require(commonPath);

let keysAdded = 0;
for (const [key, val] of Object.entries(newTranslations)) {
  if (!trData[key]) {
    trData[key] = val;
    keysAdded++;
  }
}

fs.writeFileSync(commonPath, JSON.stringify(trData, null, 2));
console.log(`Successfully added ${keysAdded} translation keys to tr/common.json!`);
