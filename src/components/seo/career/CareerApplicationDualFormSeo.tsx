"use client";

import React, { useState, useEffect } from 'react';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';

const ISTANBUL_DISTRICTS = [
  'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler',
  'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü',
  'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt',
  'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
  'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
  'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla',
  'Ümraniye', 'Üsküdar', 'Zeytinburnu'
];

interface CareerApplicationDualFormSeoProps {
  selectedRole?: string;
}

export default function CareerApplicationDualFormSeo({
  selectedRole,
}: CareerApplicationDualFormSeoProps) {
  const [activeTab, setActiveTab] = useState<'candidate' | 'manager'>('candidate');
  const [submittedCandidate, setSubmittedCandidate] = useState(false);
  const [submittedManager, setSubmittedManager] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { status, errorKey, submit, reset } = useLeadSubmit();
  const isSubmitting = status === 'loading';

  // Candidate Form Fields
  const [cName, setCName] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cDistrict, setCDistrict] = useState('Kadıköy');
  const [cPosition, setCPosition] = useState(selectedRole || '5188 Kimlikli Özel Güvenlik');
  const [cIdCardStatus, setCIdCardStatus] = useState('Silahsız Kimliğim Var');
  const [cExperience, setCExperience] = useState('');
  const [cKvkk, setCKvkk] = useState(true);

  // Manager Form Fields
  const [mFacilityName, setMFacilityName] = useState('');
  const [mName, setMName] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mDistrict, setMDistrict] = useState('Kadıköy');
  const [mServiceType, setMServiceType] = useState('5188 Lisanslı Özel Güvenlik');
  const [mHeadcount, setMHeadcount] = useState('3-5 Kişi');
  const [mNotes, setMNotes] = useState('');
  const [mKvkk, setMKvkk] = useState(true);

  useEffect(() => {
    if (selectedRole) {
      setCPosition(selectedRole);
      setActiveTab('candidate');
    }
  }, [selectedRole]);

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const ok = await submit({
      name: cName,
      phone: cPhone,
      email: cEmail || undefined,
      type: 'contact',
      subject: `İstihdam Köprüsü Aday Başvurusu: ${cPosition}`,
      message: cExperience || `Pozisyon: ${cPosition}, Kimlik: ${cIdCardStatus}, İlçe: ${cDistrict}`,
      meta: {
        kaynak: 'istihdam_koprusu_aday_formu',
        form_type: 'candidate_application',
        district: cDistrict,
        role: cPosition,
        idCardStatus: cIdCardStatus,
        experience: cExperience,
      },
    });

    if (ok) {
      setSubmittedCandidate(true);
    } else {
      setErrorMessage(errorKey || 'Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  const handleManagerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const ok = await submit({
      name: mName,
      phone: mPhone,
      type: 'quote',
      subject: `İstihdam Köprüsü Personel Talebi: ${mFacilityName}`,
      message: mNotes || `Tesis: ${mFacilityName}, İlçe: ${mDistrict}, Branş: ${mServiceType}, Kadro: ${mHeadcount}`,
      meta: {
        kaynak: 'istihdam_koprusu_yonetici_formu',
        form_type: 'staff_request',
        facilityName: mFacilityName,
        district: mDistrict,
        services: mServiceType,
        headcount: mHeadcount,
        notes: mNotes,
      },
    });

    if (ok) {
      setSubmittedManager(true);
    } else {
      setErrorMessage(errorKey || 'Talep gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  return (
    <section id="basvuru-formu" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              how_to_reg
            </span>
            <span>Hızlı İletişim & Başvuru Portalı</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Aday mısınız, Yoksa Tesisinize Personel mi Arıyorsunuz?
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Aşağıdaki sekmeden ihtiyacınıza uygun formu seçin; uzman İK veya Saha Operasyon ekibimiz en geç 24 saat içinde sizinle iletişime geçsin.
          </p>

          {/* Form Tabs Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 mt-8 shadow-xs">
            <button
              onClick={() => setActiveTab('candidate')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'candidate'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              <span className="material-symbols-outlined text-base">person_search</span>
              <span>İş Arayanım (Kariyer Başvurusu)</span>
            </button>
            <button
              onClick={() => setActiveTab('manager')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'manager'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              <span className="material-symbols-outlined text-base">business_center</span>
              <span>Yöneticiyim (Personel Talebi)</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm">
          {/* TAB 1: CANDIDATE FORM */}
          {activeTab === 'candidate' && (
            <div>
              {submittedCandidate ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
                    Kariyer Başvurunuz Başarıyla Alındı!
                  </h3>
                  <p className="text-sm text-[var(--color-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
                    Sayın <strong>{cName}</strong>, <strong>{cPosition}</strong> pozisyonu için başvurunuz İK veri tabanımıza kaydedildi.
                    En geç 24 saat içinde SMS veya telefon ile ön görüşme daveti iletilecektir.
                  </p>
                  <div className="p-4 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs text-[var(--color-secondary)] max-w-sm mx-auto mb-6">
                    Referans No: <strong>ALO-IK-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <button
                    onClick={() => {
                      setSubmittedCandidate(false);
                      setCName('');
                      setCPhone('');
                    }}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                  >
                    Yeni Bir Başvuru Doldur
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCandidateSubmit} className="space-y-6">
                  <div className="border-b border-[var(--color-outline)]/60 pb-4 mb-6">
                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                      Aday Bilgileri & Başvuru Detayı
                    </h3>
                    <p className="text-xs text-[var(--color-secondary)]">
                      Lütfen iletişim ve kimlik bilgilerinizi eksiksiz doldurun.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">error</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Adınız ve Soyadınız *
                      </label>
                      <input
                        type="text"
                        id="c-name"
                        name="fullName"
                        autoComplete="name"
                        required
                        value={cName}
                        onChange={(e) => setCName(e.target.value)}
                        placeholder="Örn: Mehmet Yılmaz"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="c-phone" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        id="c-phone"
                        name="phone"
                        autoComplete="tel"
                        required
                        value={cPhone}
                        onChange={(e) => setCPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-email" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        E-Posta Adresiniz (Opsiyonel)
                      </label>
                      <input
                        type="email"
                        id="c-email"
                        name="email"
                        autoComplete="email"
                        value={cEmail}
                        onChange={(e) => setCEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="c-district" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        İkamet Ettiğiniz İlçe (İstanbul) *
                      </label>
                      <select
                        id="c-district"
                        name="district"
                        value={cDistrict}
                        onChange={(e) => setCDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        {ISTANBUL_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-position" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Başvurulan Pozisyon *
                      </label>
                      <select
                        id="c-position"
                        name="position"
                        value={cPosition}
                        onChange={(e) => setCPosition(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        <option value="5188 Kimlikli Özel Güvenlik">5188 Özel Güvenlik Görevlisi</option>
                        <option value="Güvenlik Vardiya Amiri / Şefi">Güvenlik Vardiya Amiri / Şefi</option>
                        <option value="Elektromekanik Tesis Bakım Teknisyeni">Elektromekanik Bakım Teknisyeni</option>
                        <option value="Kat ve Ortak Alan Hijyen Görevlisi">Temizlik & Hijyen Görevlisi</option>
                        <option value="Lobi Resepsiyon & Misafir Karşılama Uzmanı">Lobi / Danışma / Concierge</option>
                        <option value="Havuz Operatörü & Mekanik Teknisyen">Havuz Operatörü & Tesisatçı</option>
                        <option value="Genel Başvuru">Genel Başvuru (Havuz)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="c-id-card-status" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        5188 ÖGG Kimlik Kartı Durumu *
                      </label>
                      <select
                        id="c-id-card-status"
                        name="idCardStatus"
                        value={cIdCardStatus}
                        onChange={(e) => setCIdCardStatus(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        <option value="Silahlı Kimliğim Var (Geçerli)">Silahlı Kimliğim Var (Geçerli)</option>
                        <option value="Silahsız Kimliğim Var (Geçerli)">Silahsız Kimliğim Var (Geçerli)</option>
                        <option value="Yenileme Eğitimi Aşamasındayım">Yenileme Eğitimi Aşamasındayım</option>
                        <option value="Kimliğim Yok / Kurs Almak İstiyorum">Kimliğim Yok / Kurs Almak İstiyorum</option>
                        <option value="Güvenlik Değil / İlgisiz">Güvenlik Dışı Branş (Temizlik / Teknik)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-experience" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                      Kısa Deneyiminiz & Notunuz (Opsiyonel)
                    </label>
                    <textarea
                      id="c-experience"
                      name="experience"
                      rows={3}
                      value={cExperience}
                      onChange={(e) => setCExperience(e.target.value)}
                      placeholder="Daha önce çalıştığınız projeler, tecrübe süreniz veya belirtmek istediğiniz hususlar..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="c-kvkk"
                      name="kvkk"
                      required
                      checked={cKvkk}
                      onChange={(e) => setCKvkk(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                    />
                    <label htmlFor="c-kvkk" className="text-xs text-[var(--color-secondary)] leading-relaxed">
                      Kişisel verilerimin 6698 sayılı KVKK kapsamında işe alım ve istihdam değerlendirmesi amacıyla işlenmesini ve tarafımla iletişime geçilmesini kabul ediyorum.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Başvuru İletiliyor...</span>
                      </span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">send</span>
                        <span>Kariyer Başvurumu İlet</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: MANAGER / PROPERTY FORM */}
          {activeTab === 'manager' && (
            <div>
              {submittedManager ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
                    Personel Talebiniz Alındı!
                  </h3>
                  <p className="text-sm text-[var(--color-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
                    Sayın <strong>{mName}</strong>, <strong>{mFacilityName}</strong> tesisi için personel ihtiyacınız kurumsal operasyon birimimize iletildi.
                    Uzman bölge müdürümüz 24 saat içinde fizibilite ve resmi teklif ile tarafınıza ulaşacaktır.
                  </p>
                  <div className="p-4 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs text-[var(--color-secondary)] max-w-sm mx-auto mb-6">
                    Talep No: <strong>ALO-TALEP-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <button
                    onClick={() => {
                      setSubmittedManager(false);
                      setMFacilityName('');
                      setMName('');
                      setMPhone('');
                    }}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                  >
                    Yeni Bir Personel Talebi İlet
                  </button>
                </div>
              ) : (
                <form onSubmit={handleManagerSubmit} className="space-y-6">
                  <div className="border-b border-[var(--color-outline)]/60 pb-4 mb-6">
                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                      Tesis / Site Bilgileri ve İhtiyaç Kapsamı
                    </h3>
                    <p className="text-xs text-[var(--color-secondary)]">
                      Sıfır kıdem tazminatı riskiyle tesisinizi güvenceye alacak kurumsal teklifi hazırlayalım.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">error</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="m-facility-name" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Site / Tesis / Plaza Adı *
                      </label>
                      <input
                        type="text"
                        id="m-facility-name"
                        name="facilityName"
                        autoComplete="organization"
                        required
                        value={mFacilityName}
                        onChange={(e) => setMFacilityName(e.target.value)}
                        placeholder="Örn: Göksu Rezidans / Ataşehir"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="m-district" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Tesisin Bulunduğu İlçe *
                      </label>
                      <select
                        id="m-district"
                        name="district"
                        value={mDistrict}
                        onChange={(e) => setMDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        {ISTANBUL_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="m-name" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Yetkili Adı Soyadı & Unvanı *
                      </label>
                      <input
                        type="text"
                        id="m-name"
                        name="fullName"
                        autoComplete="name"
                        required
                        value={mName}
                        onChange={(e) => setMName(e.target.value)}
                        placeholder="Örn: Ahmet Bey (Yönetim Kurulu Bşk.)"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="m-phone" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        İletişim Telefon Numarası *
                      </label>
                      <input
                        type="tel"
                        id="m-phone"
                        name="phone"
                        autoComplete="tel"
                        required
                        value={mPhone}
                        onChange={(e) => setMPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="m-service-type" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Talep Edilen Hizmet Branşı *
                      </label>
                      <select
                        id="m-service-type"
                        name="serviceType"
                        value={mServiceType}
                        onChange={(e) => setMServiceType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        <option value="5188 Lisanslı Özel Güvenlik">5188 Lisanslı Özel Güvenlik</option>
                        <option value="Endüstriyel Temizlik & Hijyen">Endüstriyel Temizlik & Hijyen</option>
                        <option value="Elektromekanik Teknik Bakım">Elektromekanik Teknik Bakım</option>
                        <option value="Lobi Resepsiyon & Concierge">Lobi Resepsiyon & Concierge</option>
                        <option value="Entegre Çoklu Kadro (Güvenlik + Temizlik + Teknik)">
                          Entegre Çoklu Kadro (Tüm Hizmetler)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="m-headcount" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        Tahmini Personel İhtiyacı *
                      </label>
                      <select
                        id="m-headcount"
                        name="headcount"
                        value={mHeadcount}
                        onChange={(e) => setMHeadcount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        <option value="1-2 Kişi">1 - 2 Kişi</option>
                        <option value="3-5 Kişi">3 - 5 Kişi</option>
                        <option value="6-10 Kişi">6 - 10 Kişi</option>
                        <option value="10+ Kişi (Geniş Proje)">10+ Kişi (Geniş Proje)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="m-notes" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                      Özel Talepleriniz & Vardiya İhtiyacı (Opsiyonel)
                    </label>
                    <textarea
                      id="m-notes"
                      name="notes"
                      rows={3}
                      value={mNotes}
                      onChange={(e) => setMNotes(e.target.value)}
                      placeholder="Mevcut personellerin devri, silahlı güvenlik ihtiyacı, vardiya düzeni veya özel şartlarınız..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="m-kvkk"
                      name="kvkk"
                      required
                      checked={mKvkk}
                      onChange={(e) => setMKvkk(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                    />
                    <label htmlFor="m-kvkk" className="text-xs text-[var(--color-secondary)] leading-relaxed">
                      Tesisimiz adına personel fizibilite ve kurumsal teklif hazırlanması amacıyla iletişim kurulmasını onaylıyorum.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-on-primary)] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Teklif Hazırlanıyor...</span>
                      </span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">request_quote</span>
                        <span>Personel Teklifi ve Keşif Talep Et</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
