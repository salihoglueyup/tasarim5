"use client";

import React, { useState } from 'react';

export interface CoursePackage {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  badgeColor: string;
  duration: string;
  ageReq: string;
  eduReq: string;
  shooting: string;
  desc: string;
  scope: string[];
  careerOpportunity: string;
  documents: string[];
}

const COURSES: CoursePackage[] = [
  {
    id: 'silahsiz-temel',
    title: 'Silahsız Özel Güvenlik Temel Eğitimi',
    shortTitle: 'Silahsız Temel',
    badge: 'En Çok Tercih Edilen',
    badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    duration: '100 Ders Saati (Yaklaşık 2 Hafta)',
    ageReq: '18 Yaşını Doldurmuş Olmak',
    eduReq: 'En az Ortaokul (8 Yıl) Mezunu',
    shooting: 'Poligon Atışı Yok',
    desc: 'Özel güvenlik sektörüne sıfırdan adım atmak isteyen adaylar için temel mevzuat, ilk yardım, yangın tahliyesi, devriye ve CCTV eğitimini içeren resmi program.',
    scope: [
      'Temel Güvenlik Hukuku ve Kişi Hakları (20 Saat)',
      'Güvenlik Tedbirleri ve Devriye Prosedürleri (20 Saat)',
      'Yangın Güvenliği ve Doğal Afetlerde Tahliye (8 Saat)',
      'Etkili İletişim, Öfke ve Kriz Yönetimi (12 Saat)',
      'Temel İlk Yardım Bilgisi ve Uygulaması (10 Saat)',
      'CCTV Kamera, Turnike ve X-Ray Operatörlüğü (10 Saat)',
      'Uyuşturucu Madde Bilgisi ve Kalabalık Yönetimi (20 Saat)',
    ],
    careerOpportunity: 'Rezidanslar, siteler, AVM’ler, plazalar, hastaneler, konserler ve şantiyelerde silahsız güvenlik görevlisi kadroları.',
    documents: [
      'T.C. Kimlik Kartı Fotokopisi',
      'Diploma veya Öğrenci Belgesi (E-Devlet)',
      'Adli Sicil Kaydı (E-Devlet - Resmi Kuruma)',
      'Devlet Hastanesinden "Silahsız Özel Güvenlik Olur" Sağlık Heyet Raporu',
      '4 Adet Biyometrik Fotoğraf',
    ],
  },
  {
    id: 'silahli-temel',
    title: 'Silahlı Özel Güvenlik Temel Eğitimi',
    shortTitle: 'Silahlı Temel',
    badge: 'A+ Prestij & Yüksek Ücret',
    badgeColor: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
    duration: '120 Ders Saati (100s Temel + 20s Silah)',
    ageReq: '21 Yaşını Doldurmuş Olmak',
    eduReq: 'En az Lise veya Dengi Okul Mezunu',
    shooting: '25 Fişek Gerçek Poligon Atış Pratiği',
    desc: 'Bankalar, para ve altın taşıma, konsolosluklar, havalimanları ve VIP kişi koruma projelerinde silah taşıma ve görev yapma yetkisi kazandıran en kapsamlı eğitim.',
    scope: [
      '100 Saat Temel Güvenlik Bilgisi ve Mevzuatı',
      'Silah Bilgisi, Mekaniği, Nişan Hattı ve Bakımı (15 Saat)',
      'Atış Emniyeti ve Poligon Uygulama Kuralları',
      'Gerçek Tabanca ile 25 Fişek Resmi Poligon Atışı (5 Saat)',
      'Yakın Koruma (VIP) ve Önemli Tesis Güvenlik Taktikleri',
      'Şüpheli Paket, Bomba İhbarı ve Acil Durum Protokolü',
    ],
    careerOpportunity: 'Banka şubeleri ve zırhlı para nakil araçları, konsolosluklar, lüks rezidans VIP girişleri, holding merkezleri ve A+ plazalar.',
    documents: [
      'T.C. Kimlik Kartı Fotokopisi',
      'En az Lise Diploması (E-Devlet Mezuniyet Belgesi)',
      'Adli Sicil Belgesi (Silahlı ibareli)',
      'Devlet Hastanesinden "Silahlı Özel Güvenlik Olur" Heyet Raporu (5 Branş)',
      '4 Adet Biyometrik Fotoğraf',
    ],
  },
  {
    id: 'silahsiz-yenileme',
    title: 'Silahsız Özel Güvenlik Yenileme Eğitimi',
    shortTitle: 'Silahsız Yenileme',
    badge: 'Sınavsız / Barajsız Kimlik Uzatma',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    duration: '50 Ders Saati (Yaklaşık 1 Hafta)',
    ageReq: 'Mevcut Silahsız Kimlik Kartı Sahibi',
    eduReq: 'Geçerli Silahsız ÖGG Kartı Olanlar',
    shooting: 'Atış Eğitimi Yok',
    desc: '5 yıllık görev süresi dolan özel güvenlik görevlilerinin kimlik kartı geçerlilik süresini 5 yıl daha uzatması için zorunlu olan tazeleme programı.',
    scope: [
      '50 Saatlik Mevzuat ve Operasyonel Tazeleme Dersi',
      'Değişen Yargıtay Kararları ve 5188 Sayılı Kanun Güncellemeleri',
      'Yeni Nesil CCTV, Plaka Tanıma ve Turnike Entegrasyonları',
      'Önemli Not: EGM sınavında puan barajı yoktur; derse katılım zorunludur.',
    ],
    careerOpportunity: 'Mevcut işinize kesintisiz devam edebilmeniz ve SGK haklarınızın korunması için yasal zorunluluktur.',
    documents: [
      'Mevcut Özel Güvenlik Kimlik Kartı Fotokopisi',
      'T.C. Kimlik Kartı Fotokopisi',
      'İkametgah Belgesi (E-Devlet)',
      '2 Adet Biyometrik Fotoğraf',
    ],
  },
  {
    id: 'silahli-yenileme',
    title: 'Silahlı Özel Güvenlik Yenileme Eğitimi',
    shortTitle: 'Silahlı Yenileme',
    badge: '5 Yıl Uzatma + Poligon Atışı',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    duration: '60 Ders Saati (50s Teorik + 10s Silah)',
    ageReq: 'Mevcut Silahlı Kimlik Kartı Sahibi',
    eduReq: 'Geçerli Silahlı ÖGG Kartı Olanlar',
    shooting: '25 Fişek Poligon Atışı',
    desc: 'Silahlı özel güvenlik görevlilerinin 5 yılda bir kimlik ve silah taşıma ruhsatlarını yenilemelerini sağlayan, poligon atışlı resmi yenileme programı.',
    scope: [
      '50 Saat Güvenlik Mevzuatı ve Hizmet Standartları',
      '10 Saat Silah Bilgisi, Bakımı ve Emniyet Kuralları',
      'Kapalı Poligonda 25 Fişek Zorunlu Atış Eğitimi',
      'Sınav barajı aranmaz; ders ve atışa katılım süreci tamamlar.',
    ],
    careerOpportunity: 'Silahlı pozisyonlarda çalışan personelin çalışma izinlerinin ve silah taşıma yetkilerinin 5 yıl süreyle yenilenmesi.',
    documents: [
      'Mevcut Silahlı Özel Güvenlik Kimlik Kartı',
      'T.C. Kimlik Kartı Fotokopisi',
      'İkametgah Belgesi (E-Devlet)',
      '2 Adet Biyometrik Fotoğraf',
    ],
  },
  {
    id: 'silahsizdan-silahliya-fark',
    title: 'Silahsızdan Silahlıya Geçiş (Fark Eğitimi)',
    shortTitle: 'Silahsızdan Silahlıya Fark',
    badge: 'Kariyer & Maaş Yükseltme',
    badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
    duration: '20 Ders Saati (Yaklaşık 3 Gün)',
    ageReq: '21 Yaşını Doldurmuş Olmak',
    eduReq: 'En az Lise Mezunu + Geçerli Silahsız Kimlik',
    shooting: '25 Fişek Poligon Atış Pratiği',
    desc: 'Mevcut silahsız kimliğe sahip görevlilerin 100 saatlik temel eğitime sıfırdan girmeden, sadece 20 saatlik silah farkı alarak silahlı kimliğe geçişini sağlayan avantajlı program.',
    scope: [
      '15 Saat Silah Bilgisi, Balistik ve Atış Teorisi',
      '5 Saat Poligonda 25 Mermi Uygulamalı Hedef Atışı',
      'EGM Sınavında Yalnızca 25 Silah Sorusu ve 5 Atıştan Sorumlu Olunur',
      'Kısa Sürede Silahlı Statüye Yükselme Avantajı',
    ],
    careerOpportunity: 'Silahsız çalışırken banka, para nakil veya konsolosluk gibi yüksek maaşlı silahlı kadrolara terfi etme fırsatı.',
    documents: [
      'Mevcut Silahsız Özel Güvenlik Kimlik Kartı',
      'En az Lise Diploması (E-Devlet)',
      'Devlet Hastanesinden "Silahlı Özel Güvenlik Olur" Sağlık Raporu',
      '4 Adet Biyometrik Fotoğraf',
    ],
  },
];

interface AcademyCoursePackagesSeoProps {
  onSelectCourse?: (courseTitle: string) => void;
}

export default function AcademyCoursePackagesSeo({ onSelectCourse }: AcademyCoursePackagesSeoProps) {
  const [selectedId, setSelectedId] = useState<string>('silahli-temel');

  const currentCourse = COURSES.find((c) => c.id === selectedId) || COURSES[0];

  return (
    <section id="kurs-paketleri" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              menu_book
            </span>
            <span>Resmi 5188 Eğitim Programları</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            İhtiyacınıza Uygun 5 Temel Kurs Paketi
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Sektöre ilk kez başlayacaklar, kimlik süresini uzatacaklar veya silahsızdan silahlıya geçmek isteyenler için
            T.C. İçişleri Bakanlığı EGM onaylı ders ve atış müfredatı.
          </p>

          {/* Quick Course Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {COURSES.map((course) => {
              const isSelected = course.id === selectedId;
              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedId(course.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                      : 'bg-[var(--color-surface-variant)]/60 text-[var(--color-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-outline)]/60'
                  }`}
                >
                  <span>{course.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Course Deep-Dive Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm">
          {/* Card Top: Title, Badge, and Quick Meta */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-[var(--color-outline)]/60">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentCourse.badgeColor}`}>
                  {currentCourse.badge}
                </span>
                <span className="text-xs text-[var(--color-secondary)] font-medium">
                  {currentCourse.duration}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
                {currentCourse.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectCourse && onSelectCourse(currentCourse.title)}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">edit_document</span>
                <span>Bu Kursa Ön Kayıt Yap</span>
              </button>

              <a
                href="https://www.guvenlikkursu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)] hover:bg-[var(--color-surface)] text-[var(--color-primary)] text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
              >
                <span>guvenlikkursu.com'da Gör</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>

          {/* Course Overview Description */}
          <p className="text-sm sm:text-base text-[var(--color-secondary)] mb-8 leading-relaxed max-w-4xl">
            {currentCourse.desc}
          </p>

          {/* Key Eligibility & Spec Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 flex items-start gap-3">
              <span className="material-symbols-outlined text-xl text-[var(--color-primary)] mt-0.5">
                cake
              </span>
              <div>
                <div className="text-xs text-[var(--color-secondary)] font-medium">Yaş Şartı</div>
                <div className="text-sm font-bold text-[var(--color-primary)]">{currentCourse.ageReq}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 flex items-start gap-3">
              <span className="material-symbols-outlined text-xl text-[var(--color-primary)] mt-0.5">
                school
              </span>
              <div>
                <div className="text-xs text-[var(--color-secondary)] font-medium">Öğrenim Şartı</div>
                <div className="text-sm font-bold text-[var(--color-primary)]">{currentCourse.eduReq}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 flex items-start gap-3">
              <span className="material-symbols-outlined text-xl text-[var(--color-primary)] mt-0.5">
                target
              </span>
              <div>
                <div className="text-xs text-[var(--color-secondary)] font-medium">Atış Pratiği</div>
                <div className="text-sm font-bold text-[var(--color-primary)]">{currentCourse.shooting}</div>
              </div>
            </div>
          </div>

          {/* 3 Detail Columns: Müfredat Kapsamı, İstenen Evraklar, Kariyer & İstihdam */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Scope / Curriculum */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface-variant)]/30 border border-[var(--color-outline)]/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
                  <span>Müfredat Kapsamı</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[var(--color-secondary)]">
                  {currentCourse.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-outline)]/40 text-[11px] text-[var(--color-secondary)] font-medium">
                EGM onaylı eğitmen kadrosu tarafından verilir.
              </div>
            </div>

            {/* Documents */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface-variant)]/30 border border-[var(--color-outline)]/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">folder_shared</span>
                  <span>Kayıt İçin Gerekli Evraklar</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[var(--color-secondary)]">
                  {currentCourse.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                        check
                      </span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-outline)]/40 text-[11px] text-[var(--color-secondary)] font-medium">
                Evraklarınızı WhatsApp veya e-posta ile iletebilirsiniz.
              </div>
            </div>

            {/* Job Placement Bridge */}
            <div className="p-6 rounded-2xl bg-[var(--color-primary)] text-[var(--color-on-primary)] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-3 text-red-300 font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">work</span>
                  <span>Alo Yönetim İstihdam Garantisi</span>
                </div>
                <h4 className="text-base font-bold text-white mb-3">
                  Eğitimden Göreve Doğrudan Geçiş
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {currentCourse.careerOpportunity}
                </p>
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white">
                  <strong>İstihdam Avantajı:</strong> Kursumuzu başarıyla tamamlayan adayların özgeçmişi doğrudan 
                  <strong> Alo Yönetim İK Havuzu</strong>na aktarılır ve ikamet ettikleri ilçedeki en yakın projede görevlendirilir.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <a
                  href="/istihdam-koprusu"
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-white hover:text-red-300 transition-colors"
                >
                  <span>Açık Güvenlik Pozisyonlarını İncele</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
