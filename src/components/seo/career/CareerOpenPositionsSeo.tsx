"use client";

import React, { useState } from 'react';
import JobPostingSeo from '@/components/seo/schema/JobPostingSeo';

export interface JobOpening {
  id: string;
  title: string;
  category: 'guvenlik' | 'temizlik' | 'teknik' | 'concierge';
  categoryLabel: string;
  district: string;
  projectType: string;
  salaryText: string;
  salaryValue: number;
  workSchedule: string;
  requirements: string[];
  perks: string[];
  urgency: 'Acil' | 'Yeni' | 'Sürekli İhtiyaç';
  datePosted: string;
  validThrough: string;
}

const JOBS_DATA: JobOpening[] = [
  {
    id: 'job-sec-kadikoy',
    title: '5188 Kimlikli Özel Güvenlik Görevlisi',
    category: 'guvenlik',
    categoryLabel: 'Özel Güvenlik',
    district: 'Kadıköy',
    projectType: 'Prestij Rezidans Projesi',
    salaryText: '36.500 ₺ Net + Yol + Yemek',
    salaryValue: 36500,
    workSchedule: '2 Gündüz 2 Gece 2 İzin (12 Saat Vardiya)',
    requirements: [
      'T.C. İçişleri Bakanlığı geçerli 5188 Silahlı veya Silahsız Kimlik Kartı',
      'En az 1.75 cm boy ve diksiyonu düzgün',
      'Askerlik görevini tamamlamış veya en az 2 yıl tecilli',
      'Adli sicil kaydı ve sağlık raporu engeli bulunmayan',
    ],
    perks: ['Yol Ücreti', 'Ticket Yemek Kartı', 'Kurumsal Üniforma', 'Özel İSG Sigortası'],
    urgency: 'Acil',
    datePosted: '2026-09-15',
    validThrough: '2026-12-31',
  },
  {
    id: 'job-sec-maslak',
    title: 'Güvenlik Vardiya Amiri / Şefi',
    category: 'guvenlik',
    categoryLabel: 'Özel Güvenlik',
    district: 'Sarıyer / Maslak',
    projectType: 'A+ Kurumsal Plaza',
    salaryText: '44.500 ₺ Net + Yol + Yemek + Özel Sağlık',
    salaryValue: 44500,
    workSchedule: '12/36 Vardiya Sistemi',
    requirements: [
      '5188 Silahlı Kimlik Kartı sahibi',
      'Plaza veya AVM projelerinde en az 2 yıl amirlik deneyimi',
      'CCTV, X-Ray ve Acil Durum Tahliye sistemlerine hakim',
      'Ekip yönetimi ve kriz idaresi yetkinliği',
    ],
    perks: ['Özel Sağlık Sigortası', 'Performans Primi', 'Yol + Yemek', 'Eğitim Desteği'],
    urgency: 'Yeni',
    datePosted: '2026-09-18',
    validThrough: '2026-12-31',
  },
  {
    id: 'job-tech-umraniye',
    title: 'Elektromekanik Tesis Bakım Teknisyeni',
    category: 'teknik',
    categoryLabel: 'Teknik Bakım',
    district: 'Ümraniye',
    projectType: 'Finans Merkezi Yakını Toplu Konut',
    salaryText: '42.000 ₺ Net + Yol + Yemek + Mesai',
    salaryValue: 42000,
    workSchedule: '08:30 - 18:00 (Haftada 6 Gün)',
    requirements: [
      'EML veya MYO Elektrik / Mekanik / İklimlendirme mezunu',
      'Dizel jeneratör, hidrofor, trafo ve kompanzasyon panosu bilgisi',
      'Asansör kurtarma veya kazan işletmeciliği belgesi tercih sebebi',
      'B sınıfı sürücü belgesine sahip aktif araç kullanabilen',
    ],
    perks: ['Resmi Fazla Mesai', 'Ticket Kartı', 'Yıllık İSG Donanımı', 'Araç Desteği'],
    urgency: 'Acil',
    datePosted: '2026-09-20',
    validThrough: '2026-12-31',
  },
  {
    id: 'job-clean-basaksehir',
    title: 'Kat ve Ortak Alan Hijyen Görevlisi',
    category: 'temizlik',
    categoryLabel: 'Temizlik & Hijyen',
    district: 'Başakşehir',
    projectType: '1.200 Daireli Karma Yaşam Sitesi',
    salaryText: '31.500 ₺ Net + Yol + Yemek + Servis',
    salaryValue: 31500,
    workSchedule: '08:00 - 17:00 (Pazar Tatil)',
    requirements: [
      'Toplu konut veya rezidans temizliğinde en az 1 yıl deneyim',
      'Temizlik kimyasalları dozajlama kurallarını bilen',
      'Fiziki efor sarf etmeye engel sağlık problemi olmayan',
      'Güler yüzlü, iletişim becerisi kuvvetli ve titiz',
    ],
    perks: ['Bölge Servis İmkânı', 'Sıcak Yemek / Ticket', 'Yıllık Kıdem Provizyonu'],
    urgency: 'Sürekli İhtiyaç',
    datePosted: '2026-09-10',
    validThrough: '2026-12-31',
  },
  {
    id: 'job-con-sisli',
    title: 'Lobi Resepsiyon & Misafir Karşılama Uzmanı',
    category: 'concierge',
    categoryLabel: 'Lobi & Concierge',
    district: 'Şişli / Beşiktaş',
    projectType: 'Lüks Rezidans Kulesi',
    salaryText: '38.000 ₺ Net + Yol + Yemek + Prim',
    salaryValue: 38000,
    workSchedule: 'Vardiyalı Sistem (Haftada 1 Gün İzin)',
    requirements: [
      'Önlisans veya Lisans mezunu',
      'En az B1 seviyesinde İngilizce konuşabilen',
      'Diksiyonu düzgün, temsil yeteneği yüksek',
      'Yönetim yazılımı ve kargo dolap takip sistemlerini kullanabilen',
    ],
    perks: ['Yabancı Dil Primi', 'Özel Üniforma', 'Yol + Yemek', 'Kariyer Fırsatı'],
    urgency: 'Yeni',
    datePosted: '2026-09-21',
    validThrough: '2026-12-31',
  },
  {
    id: 'job-tech-beylikduzu',
    title: 'Havuz Operatörü & Mekanik Tesisatçı',
    category: 'teknik',
    categoryLabel: 'Teknik Bakım',
    district: 'Beylikdüzü',
    projectType: 'Açık & Kapalı Havuzlu Site Projesi',
    salaryText: '37.500 ₺ Net + Yol + Yemek',
    salaryValue: 37500,
    workSchedule: '08:30 - 17:30 (Haftada 6 Gün)',
    requirements: [
      'Sağlık Bakanlığı onaylı Havuz Suyu Operatörlüğü sertifikası',
      'Filtrasyon pompaları, ters yıkama ve kimyasal klor dozaj tecrübesi',
      'Genel sıhhi tesisat arızalarına müdahale edebilen',
    ],
    perks: ['Mesleki Tazminat', 'Yol + Yemek', 'İSG KKD Donanımı'],
    urgency: 'Sürekli İhtiyaç',
    datePosted: '2026-09-12',
    validThrough: '2026-12-31',
  },
];

interface CareerOpenPositionsSeoProps {
  onSelectJob?: (jobTitle: string) => void;
  selectedCategoryProp?: string;
}

export default function CareerOpenPositionsSeo({
  onSelectJob,
  selectedCategoryProp,
}: CareerOpenPositionsSeoProps) {
  const [filter, setFilter] = useState<string>(selectedCategoryProp || 'all');

  const categories = [
    { id: 'all', label: 'Tüm Pozisyonlar' },
    { id: 'guvenlik', label: '5188 Özel Güvenlik' },
    { id: 'temizlik', label: 'Temizlik & Hijyen' },
    { id: 'teknik', label: 'Teknik Bakım' },
    { id: 'concierge', label: 'Lobi & Concierge' },
  ];

  const filteredJobs =
    filter === 'all' ? JOBS_DATA : JOBS_DATA.filter((j) => j.category === filter);

  const handleApplyClick = (jobTitle: string) => {
    if (onSelectJob) {
      onSelectJob(jobTitle);
    }
    const formElement = document.getElementById('basvuru-formu');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const nameInput = document.getElementById('c-name') as HTMLInputElement | null;
        if (nameInput) {
          nameInput.focus({ preventScroll: true });
        }
      }, 500);
    }
  };

  return (
    <section id="acik-pozisyonlar" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      {/* Schema.org JobPosting Structured Data for Google Jobs SEO */}
      {JOBS_DATA.map((job) => (
        <JobPostingSeo
          key={job.id}
          title={job.title}
          description={`${job.projectType} kapsamında ${job.requirements.join(', ')}. Sunulan haklar: ${job.salaryText}, ${job.perks.join(', ')}.`}
          datePosted={job.datePosted}
          validThrough={job.validThrough}
          jobLocation={{
            addressLocality: job.district,
            addressRegion: 'İstanbul',
            addressCountry: 'TR',
          }}
          baseSalary={{
            currency: 'TRY',
            value: job.salaryValue,
            unitText: 'MONTH',
          }}
        />
      ))}

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                work_outline
              </span>
              <span>Google Jobs Uyumlu • Güncel İlanlar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
              İstanbul Genelinde Aktif Açık Pozisyonlar
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
              Maaşı gününde yatan, SGK primi gerçek hak edişten bildirilen ve kıdem tazminatı bloke fonla güvenceye alınan
              prestijli projelerimizde yerinizi alın.
            </p>
          </div>

          <div className="text-xs text-[var(--color-secondary)] font-medium flex items-center gap-2 bg-[var(--color-surface-variant)]/60 px-4 py-2 rounded-xl border border-[var(--color-outline)]/60 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Toplam {JOBS_DATA.length} Aktif İlan Yayında</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === c.id
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                  : 'bg-[var(--color-surface-variant)]/50 text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 hover:border-[var(--color-primary)]/40 rounded-3xl p-6 shadow-xs transition-all duration-200 flex flex-col justify-between group hover:shadow-sm"
            >
              <div>
                {/* Card Top: Urgency & District */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                      job.urgency === 'Acil'
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20'
                        : job.urgency === 'Yeni'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                        : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border-[var(--color-outline)]/60'
                    }`}
                  >
                    {job.urgency}
                  </span>

                  <span className="text-xs font-medium text-[var(--color-secondary)] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {job.district}
                  </span>
                </div>

                {/* Job Title & Project Type */}
                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1 group-hover:text-slate-900 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-[var(--color-secondary)] font-medium mb-4">
                  {job.projectType}
                </p>

                {/* Salary Badge */}
                <div className="p-3 rounded-xl bg-[var(--color-surface-variant)]/50 border border-[var(--color-outline)]/60 mb-4">
                  <div className="text-[11px] text-[var(--color-secondary)] font-medium mb-0.5">
                    Net Hak Ediş & Yan Haklar
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-[var(--color-primary)]">
                    {job.salaryText}
                  </div>
                  <div className="text-[11px] text-[var(--color-secondary)] mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    {job.workSchedule}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <div className="text-xs font-bold text-[var(--color-primary)] mb-2">
                    Aranan Temel Nitelikler:
                  </div>
                  <ul className="space-y-1.5">
                    {job.requirements.slice(0, 3).map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--color-secondary)]">
                        <span className="text-[var(--color-primary)] font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perks Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {job.perks.map((p, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/40"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => handleApplyClick(job.title)}
                className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Bu Pozisyona Başvur</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer Guarantee notice */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--color-surface-variant)]/30 border border-[var(--color-outline)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl text-[var(--color-primary)]">
              verified
            </span>
            <span>
              Tüm açık pozisyonlarımızda 4857 Sayılı İş Kanunu hükümleri geçerlidir. Asgari ücret değil, pozisyona göre belirlenen kurumsal net maaş banka aracılığıyla ödenir.
            </span>
          </div>
          <a
            href="#basvuru-formu"
            className="font-bold text-[var(--color-primary)] hover:underline shrink-0"
          >
            Genel Başvuru Yap →
          </a>
        </div>
      </div>
    </section>
  );
}
