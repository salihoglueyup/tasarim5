'use client';

import React, { useState } from 'react';
import { 
  Video, 
  Radio, 
  ShieldCheck, 
  QrCode, 
  Scan, 
  CheckCircle2, 
  Zap, 
  Info,
  ChevronRight,
  Cpu,
  Layers
} from 'lucide-react';

interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  badge: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  trainingTopics: string[];
  fieldApplications: string[];
  complianceLaw: string;
}

const EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: 'body-cam',
    name: 'Vücut Kamerası & Canlı Yayın Terminali',
    category: 'Saha Denetim & Dijital Kanıt',
    icon: Video,
    badge: '4K Kayıt & Canlı 4G/5G',
    tagline: 'Olay anında tarafsız sesli ve görüntülü kayıt, merkezi operasyon merkeziyle anlık eşzamanlama.',
    description: 'Özel güvenlik personelinin temas noktalarındaki tüm sözlü ve fiziksel etkileşimleri KVKK standartlarına uygun olarak şifreli kaydeden, acil butonuna basıldığında komuta merkezine canlı video ve GPS aktaran akıllı donanım.',
    specs: [
      { label: 'Kayıt Kalitesi', value: '4K Ultra HD / 60 FPS' },
      { label: 'Veri Güvenliği', value: 'AES-256 Donanımsal Şifreleme' },
      { label: 'Gece Görüşü', value: '15m Tam Karanlık IR Gece Görüşü' },
      { label: 'Pil Ömrü', value: '14 Saat Sürekli Vardiya Kaydı' },
    ],
    trainingTopics: [
      'KVKK Uyarınca Kayıt Başlatma & Vatandaş Bilgilendirme Prosedürü',
      'Merkezi Operasyon Odasına Canlı Yayın Bağlantısı Açma',
      'Delil Bütünlüğü Koruma ve Tutanak Eşleme Protokolü'
    ],
    fieldApplications: [
      'Site & Rezidans Giriş Kontrol Tartışmaları',
      'AVM Devriye ve Şüpheli Paket Tahkikatı',
      'Gece Dış Çevre ve Çit Devriyeleri'
    ],
    complianceLaw: '5188 Sayılı Kanun Madde 7/g ve KVKK m. 5/2-f (Meşru Menfaat)'
  },
  {
    id: 'patrol-tour',
    name: 'RFID / NFC Otonom Devriye Tur Sistemi',
    category: 'Devriye Yönetimi & İzlenebilirlik',
    icon: QrCode,
    badge: 'Gerçek Zamanlı GPS & NFC',
    tagline: 'Saha devriyelerinin saniyesi saniyesine harita üzerinde doğrulanması ve raporlanması.',
    description: 'Fiziksel devriye rotaları boyunca yerleştirilen RFID/NFC noktalarının temassız okunarak vardiya amirine ve site yönetimine anlık geofencing kontrolü sunan, rotadan sapma ve gecikmelerde alarm üreten sistem.',
    specs: [
      { label: 'Okuma Türü', value: 'NFC 13.56MHz + RFID 125kHz' },
      { label: 'Gövde Dayanımı', value: 'IP68 Su & Toz Geçirmez, Düşme Korumalı' },
      { label: 'Haberleşme', value: '4G LTE + Wi-Fi Otomatik Geçiş' },
      { label: 'Alarm Modu', value: 'Gecikme & Rota İhlali Anlık Bildirim' },
    ],
    trainingTopics: [
      'Devriye Rota Zamanlaması ve Nokta Okutma Disiplini',
      'Acil Durum Olay Kodu Tanımlama (Yangın, Sızıntı, Şüpheli Araç)',
      'Vardiya Devir-Teslim Dijital İmzası'
    ],
    fieldApplications: [
      'Toplu Konut Yangın Merdiveni ve Çatı Katı Kontrolleri',
      'Fabrika & Antrepo Gece Çevre Hattı Devriyesi',
      'Otopark ve Şaft Boşluğu Periyodik Denetimi'
    ],
    complianceLaw: 'Özel Güvenlik Hizmetleri Yönetmeliği Madde 13 (Görev Alanı Güvenliği)'
  },
  {
    id: 'pts-barrier',
    name: 'Yapay Zeka Plaka Tanıma (PTS) & Bariyer Ağı',
    category: 'Tesis Giriş & Otopark Otomasyonu',
    icon: Scan,
    badge: '%99.4 Okuma Başarısı',
    tagline: 'Milimetrik hızla araç tanıma, misafir davet kodları ve yasaklı araç kara liste kalkanı.',
    description: 'Derin öğrenme modelleriyle kirli, eğik veya karanlıkta kalan plakaları 0.3 saniyede çözen, bariyer otomasyonu ile entegre ve Polisin Asayiş / Çalıntı Araç veri tabanı entegrasyonuna hazır altyapı.',
    specs: [
      { label: 'Okuma Hızı', value: '< 300 Milisaniye' },
      { label: 'Çözünürlük', value: '5 MP LPR Lens & Polarize Filtre' },
      { label: 'Entegrasyon', value: 'Wiegand, OSDP, TCP/IP, HGS Hibrit' },
      { label: 'Kara Liste Uyarısı', value: 'Sesli & Görsel Nizamiye Alarmı' },
    ],
    trainingTopics: [
      'Kara Liste Uyarısı Karşısında Nizamiye Giriş Kapatma Prosedürü',
      'Misafir QR Kod Doğrulama ve Geçici Otopark İzin Tanımlama',
      'Kamera Açısı & Lens Temizliği Günlük Operatör Bakımı'
    ],
    fieldApplications: [
      'Site Sakinleri Otomatik Hızlı Geçiş Hattı',
      'Kurye ve Kargo Araçları Süreli Giriş Denetimi',
      'İcra / Mahkeme Kararlı Araçların Giriş Engellemesi'
    ],
    complianceLaw: 'Karayolları Trafik ve Otopark Yönetmeliği & 5188 m.7'
  },
  {
    id: 'dmr-radio',
    name: 'DMR Sayısal Telsiz & Acil Durum Ağı',
    category: 'Taktik İletişim & Güvenlik Koordinasyonu',
    icon: Radio,
    badge: 'Kriptolu Sayısal Ağ & Man-Down',
    tagline: 'Hücresel şebekeler çökse bile tesis içinde 7/24 kesintisiz, parazitsiz ve şifreli sesli haberleşme.',
    description: 'Deprem, sabotaj veya hücresel şebeke kesintilerinde bağımsız röle üzerinden çalışan, personelin bayılma veya hareketsizliğini (Man-Down) algılayarak otomatik acil çağrı açan sayısal telsiz standardı.',
    specs: [
      { label: 'Modülasyon', value: 'DMR Tier II Sayısal Standart' },
      { label: 'Kriptolama', value: 'ARC4 / AES-256 Sayısal Şifreleme' },
      { label: 'Güvenlik Özelliği', value: 'Man-Down (Hareketsizlik) & Lone-Worker' },
      { label: 'Kanal Kapasitesi', value: '1024 Kanal / 64 Bölge (Zone)' },
    ],
    trainingTopics: [
      'Telsiz Muhabere Disiplini, Kod Tabloları ve Fonetik Alfabe',
      'Acil Durum Kanal Tahsisi ve Panik Çağrısı Yönetimi',
      'Röle ve Simplex Frekanslar Arasında Geçiş Senaryoları'
    ],
    fieldApplications: [
      'Yangın veya Tahliye Sırasında Kat Koordinasyonu',
      'VIP Karşılama ve Güzergah Emniyeti',
      'Tesis İçi Asayiş Olaylarında Destek Ekip Çağrısı'
    ],
    complianceLaw: 'BTK Telsiz Kanunu & Tesis Afet Koordinasyon Talimatı'
  },
  {
    id: 'metal-detector',
    name: 'Çok Bölgeli Kapı & El Tipi Metal Detektörleri',
    category: 'Giriş Güvenliği & Tarama Teknolojileri',
    icon: ShieldCheck,
    badge: 'NIJ-0601.02 Uluslararası Standart',
    tagline: 'Lobi ve turnike geçişlerinde silah, kesici alet ve izinsiz metal unsurların hatasız tespiti.',
    description: 'Tepeden tırnağa 33 farklı geçiş bölgesini bağımsız tarayarak gizlenmiş metal nesnenin tam koordinatını LED göstergelerle belirten, kalp pili taşıyanlar için biyo-uyumlu frekans teknolojisi.',
    specs: [
      { label: 'Algılama Bölgesi', value: '33 Bağımsız Dikey Bölge (Pinpoint)' },
      { label: 'Hassasiyet Kademesi', value: '0 - 300 Ayarlanabilir Seviye' },
      { label: 'Geçiş Hızı', value: 'Dakikada 60 Kişiye Kadar Hızlı Akış' },
      { label: 'Standart', value: 'NIJ 0601.02 / CE / RoHS Sertifikalı' },
    ],
    trainingTopics: [
      'Gövde ve Çanta Arama Standartları ve İnsan Hakları Sınırı',
      'El Tipi Detektörle Vücut Tarama Sıralaması (Baş, Gövde, Bacaklar)',
      'Metal Eşya Yanlış Alarm Eleme Kalibrasyonu'
    ],
    fieldApplications: [
      'Site Genel Kurulları ve Toplantı Giriş Kontrolleri',
      'Yönetim Binası ve Konsolosluk Komşu Tesis Girişleri',
      'Etkinlik, Açık Hava Konser ve Spor Organizasyonları'
    ],
    complianceLaw: '5188 Sayılı Kanun Madde 7/a (Detektörle Kontrol ve Tarama Yetkisi)'
  }
];

export default function SecurityEquipmentShowcase() {
  const [selectedId, setSelectedId] = useState<string>('body-cam');

  const currentItem = EQUIPMENT_DATA.find((item) => item.id === selectedId) || EQUIPMENT_DATA[0];
  const IconComponent = currentItem.icon;

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-amber-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-semibold mb-4">
            <Cpu className="w-4 h-4 text-amber-500" />
            <span>Modern Güvenlik Donanımları & Saha Teknolojileri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Akademide Teoriyle Kalmaz, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">En Son Teknolojiyi</span> Birebir Kullanırsınız
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Alo Güvenlik Eğitim Kurumları müfredatında sadece kanun maddeleri değil, prestijli rezidans ve iş merkezlerinde görev yaparken kullanacağınız fiziki ve dijital donanımların uygulamalı laboratuvar eğitimleri yer alır.
          </p>
        </div>

        {/* Device Selection Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {EQUIPMENT_DATA.map((item) => {
            const ItemIcon = item.icon;
            const isSelected = item.id === selectedId;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                type="button"
                className={`flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 border text-left ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/40 shadow-lg shadow-amber-500/10 text-slate-900 dark:text-white -translate-y-1'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <ItemIcon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-xs sm:text-sm line-clamp-1">
                  {item.name.split('&')[0].trim()}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {item.category.split('&')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Equipment Detailed Panel */}
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Device Identity, Badges, Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Layers className="w-3.5 h-3.5" />
                  {currentItem.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Zap className="w-3.5 h-3.5" />
                  {currentItem.badge}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {currentItem.name}
                  </h3>
                </div>
                <p className="mt-3 text-base text-amber-700 dark:text-amber-300 font-medium leading-relaxed">
                  {currentItem.tagline}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentItem.description}
                </p>
              </div>

              {/* Hardware Specifications Grid */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-500" />
                  Donanım Teknik Parametreleri
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {currentItem.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {spec.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Reference Callout */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 dark:text-blue-200">
                  <span className="font-bold">Yasal Dayanak & Denetim: </span>
                  {currentItem.complianceLaw}
                </div>
              </div>
            </div>

            {/* Right Column: Training Curriculum & Field Practice */}
            <div className="lg:col-span-6 space-y-6">
              {/* Academy Lab Training */}
              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Akademi Pratik Eğitim Modülleri
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                  Kursiyerlerimiz simülasyon salonunda bu cihazları doğrudan ellerine alarak senaryo bazlı testlerden geçer:
                </p>
                <ul className="space-y-2.5">
                  {currentItem.trainingTopics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Field Application Scenarios */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  Mezuniyet Sonrası Sahada Karşılaşacağınız Noktalar
                </h4>
                <div className="space-y-2">
                  {currentItem.fieldApplications.map((app, index) => (
                    <div
                      key={index}
                      className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alo Güvenlik Brand & Job Guarantee Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700/60 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Alo Güvenlik Ayrıcalığı</div>
                    <div className="text-sm font-bold mt-0.5">Sertifikalı Personel Öncelikli İstihdam</div>
                    <div className="text-xs text-slate-300 mt-1">Eğitimi tamamlayan başarılı kursiyerler Alo Yönetim bünyesindeki 85+ tesiste doğrudan görevlendirilir.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
