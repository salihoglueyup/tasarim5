"use client";

import React, { useState, useEffect } from 'react';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { useLanguage } from '@/context/LanguageContext';

import Icon from '@/components/ui/branding/Icon';
const POSITIONS = [
  { value: '5188 Kimlikli Özel Güvenlik', key: 'ist_f_pos_1' },
  { value: 'Güvenlik Vardiya Amiri / Şefi', key: 'ist_f_pos_2' },
  { value: 'Elektromekanik Tesis Bakım Teknisyeni', key: 'ist_f_pos_3' },
  { value: 'Kat ve Ortak Alan Hijyen Görevlisi', key: 'ist_f_pos_4' },
  { value: 'Lobi Resepsiyon & Misafir Karşılama Uzmanı', key: 'ist_f_pos_5' },
  { value: 'Havuz Operatörü & Mekanik Teknisyen', key: 'ist_f_pos_6' },
  { value: 'Genel Başvuru', key: 'ist_f_pos_7' },
];
const ID_STATUSES = [
  { value: 'Silahlı Kimliğim Var (Geçerli)', key: 'ist_f_id_1' },
  { value: 'Silahsız Kimliğim Var (Geçerli)', key: 'ist_f_id_2' },
  { value: 'Yenileme Eğitimi Aşamasındayım', key: 'ist_f_id_3' },
  { value: 'Kimliğim Yok / Kurs Almak İstiyorum', key: 'ist_f_id_4' },
  { value: 'Güvenlik Değil / İlgisiz', key: 'ist_f_id_5' },
];
const SERVICES = [
  { value: '5188 Lisanslı Özel Güvenlik', key: 'ist_f_svc_1' },
  { value: 'Endüstriyel Temizlik & Hijyen', key: 'ist_f_svc_2' },
  { value: 'Elektromekanik Teknik Bakım', key: 'ist_f_svc_3' },
  { value: 'Lobi Resepsiyon & Concierge', key: 'ist_f_svc_4' },
  { value: 'Entegre Çoklu Kadro (Güvenlik + Temizlik + Teknik)', key: 'ist_f_svc_5' },
];
const HEADCOUNTS = [
  { value: '1-2 Kişi', key: 'ist_f_hc_1' },
  { value: '3-5 Kişi', key: 'ist_f_hc_2' },
  { value: '6-10 Kişi', key: 'ist_f_hc_3' },
  { value: '10+ Kişi (Geniş Proje)', key: 'ist_f_hc_4' },
];
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

  const { status, submit, reset } = useLeadSubmit();
  const { t } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
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
      setErrorMessage(tk('ist_f_c_err'));
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
      setErrorMessage(tk('ist_f_m_err'));
    }
  };

  return (
    <section id="basvuru-formu" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Icon name="how_to_reg" className="text-sm" />
            <span>{tk('ist_f_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            {tk('ist_form_title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            {tk('ist_form_desc')}
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
              <Icon name="person_search" className="text-base" />
              <span>{tk('ist_f_tab_c')}</span>
            </button>
            <button
              onClick={() => setActiveTab('manager')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'manager'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              <Icon name="business_center" className="text-base" />
              <span>{tk('ist_f_tab_m')}</span>
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
                    <Icon name="check_circle" className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
                    {tk('ist_f_c_ok_title')}
                  </h3>
                  <p className="text-sm text-[var(--color-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
                    {tk('ist_f_dear')} <strong>{cName}</strong>, <strong>{POSITIONS.find((p) => p.value === cPosition) ? tk(POSITIONS.find((p) => p.value === cPosition)!.key) : cPosition}</strong> {tk('ist_f_c_ok_rest')}
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedCandidate(false);
                      setCName('');
                      setCPhone('');
                    }}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                  >
                    {tk('ist_f_c_new')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCandidateSubmit} className="space-y-6">
                  <div className="border-b border-[var(--color-outline)]/60 pb-4 mb-6">
                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                      {tk('ist_f_c_head')}
                    </h3>
                    <p className="text-xs text-[var(--color-secondary)]">
                      {tk('ist_f_c_sub')}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                      <Icon name="error" className="text-base" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        {tk('ist_f_name')}
                      </label>
                      <input
                        type="text"
                        id="c-name"
                        name="fullName"
                        autoComplete="name"
                        required
                        value={cName}
                        onChange={(e) => setCName(e.target.value)}
                        placeholder={tk('ist_f_name_ph')}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="c-phone" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        {tk('ist_f_phone')}
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
                        {tk('ist_f_email')}
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
                        {tk('ist_f_district_c')}
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
                        {tk('ist_f_position')}
                      </label>
                      <select
                        id="c-position"
                        name="position"
                        value={cPosition}
                        onChange={(e) => setCPosition(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        {POSITIONS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {tk(p.key)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="c-id-card-status" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        {tk('ist_f_idcard')}
                      </label>
                      <select
                        id="c-id-card-status"
                        name="idCardStatus"
                        value={cIdCardStatus}
                        onChange={(e) => setCIdCardStatus(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        {ID_STATUSES.map((p) => (
                          <option key={p.value} value={p.value}>
                            {tk(p.key)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-experience" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                      {tk('ist_f_exp')}
                    </label>
                    <textarea
                      id="c-experience"
                      name="experience"
                      rows={3}
                      value={cExperience}
                      onChange={(e) => setCExperience(e.target.value)}
                      placeholder={tk('ist_f_exp_ph')}
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
                      {tk('ist_f_kvkk_c')}
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
                        <span>{tk('ist_f_c_sending')}</span>
                      </span>
                    ) : (
                      <>
                        <Icon name="send" className="text-lg" />
                        <span>{tk('ist_f_c_submit')}</span>
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
                    <Icon name="check_circle" className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
                    {tk('ist_f_m_ok_title')}
                  </h3>
                  <p className="text-sm text-[var(--color-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
                    {tk('ist_f_dear')} <strong>{mName}</strong>, <strong>{mFacilityName}</strong> {tk('ist_f_m_ok_rest')}
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedManager(false);
                      setMFacilityName('');
                      setMName('');
                      setMPhone('');
                    }}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                  >
                    {tk('ist_f_m_new')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleManagerSubmit} className="space-y-6">
                  <div className="border-b border-[var(--color-outline)]/60 pb-4 mb-6">
                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                      {tk('ist_f_m_head')}
                    </h3>
                    <p className="text-xs text-[var(--color-secondary)]">
                      {tk('ist_f_m_sub')}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                      <Icon name="error" className="text-base" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="m-facility-name" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        {tk('ist_f_facility')}
                      </label>
                      <input
                        type="text"
                        id="m-facility-name"
                        name="facilityName"
                        autoComplete="organization"
                        required
                        value={mFacilityName}
                        onChange={(e) => setMFacilityName(e.target.value)}
                        placeholder={tk('ist_f_facility_ph')}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="m-district" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        {tk('ist_f_district_m')}
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
                        {tk('ist_f_contact')}
                      </label>
                      <input
                        type="text"
                        id="m-name"
                        name="fullName"
                        autoComplete="name"
                        required
                        value={mName}
                        onChange={(e) => setMName(e.target.value)}
                        placeholder={tk('ist_f_contact_ph')}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="m-phone" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        {tk('ist_f_contact_phone')}
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
                        {tk('ist_f_service')}
                      </label>
                      <select
                        id="m-service-type"
                        name="serviceType"
                        value={mServiceType}
                        onChange={(e) => setMServiceType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        {SERVICES.map((p) => (
                          <option key={p.value} value={p.value}>
                            {tk(p.key)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="m-headcount" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                        {tk('ist_f_headcount')}
                      </label>
                      <select
                        id="m-headcount"
                        name="headcount"
                        value={mHeadcount}
                        onChange={(e) => setMHeadcount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        {HEADCOUNTS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {tk(p.key)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="m-notes" className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
                      {tk('ist_f_notes')}
                    </label>
                    <textarea
                      id="m-notes"
                      name="notes"
                      rows={3}
                      value={mNotes}
                      onChange={(e) => setMNotes(e.target.value)}
                      placeholder={tk('ist_f_notes_ph')}
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
                      {tk('ist_f_kvkk_m')}
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
                        <span>{tk('ist_f_m_sending')}</span>
                      </span>
                    ) : (
                      <>
                        <Icon name="request_quote" className="text-lg" />
                        <span>{tk('ist_f_m_submit')}</span>
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
