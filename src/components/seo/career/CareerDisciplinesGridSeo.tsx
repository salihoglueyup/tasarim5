"use client";

import React, { useState } from 'react';

interface Discipline {
  id: string;
  title: string;
  badge: string;
  icon: string;
  tagline: string;
  duties: string[];
  certifications: string[];
  technologies: string[];
  capacity: string;
}

export default function CareerDisciplinesGridSeo({
  onSelectCategory,
}: {
  onSelectCategory?: (category: string) => void;
}) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('guvenlik');

  const disciplines: Discipline[] = [
    {
      id: 'guvenlik',
      title: '5188 Sayılı Lisanslı Özel Güvenlik',
      badge: '5188 Kanun Uyumlu',
      icon: 'shield',
      tagline: 'Silahlı ve silahsız, adli sicil tahkikatı tamamlanmış, üniformalı ve kurumsal güvenlik kadroları.',
      duties: [
        'X-Ray çanta tarama ve kapı dedektörü kontrolü',
        'CCTV kamera merkezi 7/24 izleme ve kayıt tutma',
        'Ziyaretçi ve kurye kimlik teyidi ve kayıt prosedürü',
        'NFC / RFID devriye tur kalemi ile nokta bazlı devriye kontrolü',
        'Acil durum, tahliye ve yangın ilk müdahale protokolü',
      ],
      certifications: [
        'T.C. İçişleri Bakanlığı 5188 Özel Güvenlik Kimlik Kartı',
        'Özel Güvenlik Yenileme Eğitimi Sertifikası',
        'Temel İlk Yardım ve Yangın Söndürme Belgesi',
      ],
      technologies: [
        'Akıllı Plaka Tanıma (PTS)',
        'Yüz Tanıma ve Hızlı Turnike Geçişi',
        'Mobil Devriye Takip Yazılımı',
      ],
      capacity: '650+ Aktif Görevli',
    },
    {
      id: 'temizlik',
      title: 'Endüstriyel Temizlik & Ortak Alan Hijyeni',
      badge: 'Biyosidal & Hijyen',
      icon: 'cleaning_services',
      tagline: 'Rezidans, plaza ve toplu konutlarda kimyasal dozajlamalı, renk kodlu hijyen standardı.',
      duties: [
        'Blok girişleri, kat holleri ve yangın merdivenleri rutin temizliği',
        'Mermer ve granit zemin kristalize cila uygulamaları',
        'Dış cephe cam silimi ve sepetli platform operasyonu',
        'Çöp şaftı dezenfeksiyonu ve geri dönüşüm atık ayrıştırması',
        'Kapalı otopark zemin otomatı ile endüstriyel yıkama',
      ],
      certifications: [
        'Hijyen Eğitimi Sertifikası (MEB Onaylı)',
        'Yüksekte Çalışma İSG Belgesi',
        'Kimyasal Madde Kullanımı ve Dozajlama Eğitimi',
      ],
      technologies: [
        'Binicili ve İtmeli Zemin Yıkama Otomatları',
        'Renk Kodlu Mikrofiber Bölgeleme Sistemi',
        'ULV Soğuk Sisleme Dezenfeksiyon Cihazları',
      ],
      capacity: '380+ Hijyen Personeli',
    },
    {
      id: 'teknik',
      title: 'Elektromekanik Teknik Bakım Teknisyenleri',
      badge: 'Mesleki Yeterlilik (MYK)',
      icon: 'engineering',
      tagline: 'Kritik altyapı, enerji sürekliliği ve arıza müdahalesi için sertifikalı uzman teknisyen kadrosu.',
      duties: [
        'Dizel jeneratör haftalık testleri ve otomatik transfer panosu denetimi',
        'Hidrofor, sirkülasyon pompaları ve su deposu basınç takibi',
        'Asansör yetkili servis refakati ve acil kabin kurtarma operasyonu',
        'Kazan dairesi, brülör ve merkezi ısıtma sezon bakımları',
        'VRF iklimlendirme sistemleri filtre temizliği ve gaz kontrolleri',
      ],
      certifications: [
        'MYK Elektrik / Tesisat Bakım Onarım Belgesi',
        'Asansör Acil Kurtarma Yetki Belgesi',
        'Kazan Dairesi İşletmeciliği Sertifikası',
        'EKAT (Yüksek Gerilim Tesislerinde Çalışma) Belgesi',
      ],
      technologies: [
        'Bina Otomasyon Sistemi (BMS / SCADA)',
        'Termal Kamera ile Elektrik Pano Taraması',
        'Titreşim ve Akustik Rulman Analiz Cihazı',
      ],
      capacity: '140+ Sertifikalı Teknisyen',
    },
    {
      id: 'concierge',
      title: 'Lobi, Resepsiyon & VIP Concierge',
      badge: '5 Yıldızlı Ağırlama',
      icon: 'support_agent',
      tagline: 'Rezidans ve kurumsal plazalarda prestijli karşılama, kargo yönetimi ve sakin ilişkileri koordinatörlüğü.',
      duties: [
        'Misafir karşılama, yönlendirme ve VIP protokol ağırlaması',
        'Kargo, kurye ve emanet paketlerin akıllı dolap zimmet kaydı',
        'Sakin taleplerinin yönetim yazılımına girişi ve iş emri takibi',
        'Telefon santral yönetimi ve kurumsal mesaj yönlendirmesi',
        'Vale, araç karşılama ve otopark yönlendirme organizasyonu',
      ],
      certifications: [
        'İletişim ve Diksiyon Eğitimi Sertifikası',
        'B1/B2 Seviyesi İngilizce Dil Belgesi',
        'Tesis Yönetim Yazılımı Operatörlüğü Eğitimi',
      ],
      technologies: [
        'Akıllı Kargo Dolap Otomasyonu',
        'Bulut Santral ve IP İnterkom Entegrasyonu',
        'Dijital Sakin İletişim Portalı',
      ],
      capacity: '80+ Resepsiyon Uzmanı',
    },
  ];

  const activeDiscipline = disciplines.find((d) => d.id === selectedDiscipline) || disciplines[0];

  return (
    <section id="hizmet-branslari" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              category
            </span>
            <span>4 Temel İstihdam Kolu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Saha Operasyonlarında Uzmanlaşmış Meslek Branşları
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Her tesisin ihtiyacına uygun, görev tanımı net, kanuni sertifikaları tam ve modern ekipmanlarla
            donatılmış 4 farklı profesyonel disiplin.
          </p>

          {/* Quick Discipline Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 mt-8">
            {disciplines.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDiscipline(d.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedDiscipline === d.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] shadow-sm'
                    : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/80 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40'
                }`}
              >
                <span className="material-symbols-outlined text-base sm:text-lg shrink-0" aria-hidden="true">
                  {d.icon}
                </span>
                <span className="truncate">{d.title.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Discipline Deep-Dive Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-[var(--color-outline)]/60">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  {activeDiscipline.icon}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[var(--color-surface-variant)] text-[var(--color-primary)] border border-[var(--color-outline)]/60">
                    {activeDiscipline.badge}
                  </span>
                  <span className="text-xs text-[var(--color-secondary)] font-medium">
                    {activeDiscipline.capacity}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
                  {activeDiscipline.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#acik-pozisyonlar"
                onClick={() => onSelectCategory && onSelectCategory(activeDiscipline.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <span>İlgili İlanları Gör</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a
                href="#basvuru-formu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)] hover:bg-[var(--color-surface)] text-[var(--color-primary)] text-xs sm:text-sm font-semibold transition-all"
              >
                <span>Personel İste</span>
              </a>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--color-secondary)] mb-8 leading-relaxed max-w-4xl">
            {activeDiscipline.tagline}
          </p>

          {/* 3 Detail Columns: Duties, Certifications, Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Duties */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-bold text-sm">
                <span className="material-symbols-outlined text-base">task_alt</span>
                <span>Standart Görev Tanımları</span>
              </div>
              <ul className="space-y-2.5">
                {activeDiscipline.duties.map((duty, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-secondary)]">
                    <span className="text-[var(--color-primary)] font-bold mt-0.5">•</span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-bold text-sm">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Zorunlu Sertifika & Belgeler</span>
              </div>
              <ul className="space-y-2.5">
                {activeDiscipline.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-secondary)]">
                    <span className="material-symbols-outlined text-xs text-[var(--color-primary)] mt-0.5">
                      check_circle
                    </span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-bold text-sm">
                <span className="material-symbols-outlined text-base">devices</span>
                <span>Donanım & Saha Teknolojisi</span>
              </div>
              <ul className="space-y-2.5">
                {activeDiscipline.technologies.map((tech, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-secondary)]">
                    <span className="material-symbols-outlined text-xs text-[var(--color-primary)] mt-0.5">
                      memory
                    </span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
