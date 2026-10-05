"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { waLink } from '@/lib/cro';
import { motion, AnimatePresence } from 'framer-motion';
import { DISTRICT_NAMES } from '@/data/districtsMetadata';
import { formatTrPhone, isValidTrPhone, isValidEmail } from '@/lib/forms/validation';

import Icon from '@/components/ui/branding/Icon';
export default function TeklifAlClient() {
  const { t, language } = useLanguage();
  const { submit, status, errorKey } = useLeadSubmit();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState({ phone: false, email: false });
  const [district, setDistrict] = useState('Kadikoy');
  const [propertyType, setPropertyType] = useState('Site / Apartman');
  const [units, setUnits] = useState('50-100 Daire');
  const [services, setServices] = useState<string[]>([
    'Entegre Tesis Yönetimi',
    '5188 Özel Güvenlik',
    'Temizlik & Hijyen',
    'Aidat & İcra Takibi'
  ]);
  const [honeypot, setHoneypot] = useState('');
  // Form değerleri (admin e-postasına giden) Türkçe kalır; yalnızca görünen etiketler çevrilir.
  const SERVICE_LABELS: Record<string, string> = {
    'Entegre Tesis Yönetimi': t('tc_s1'),
    '5188 Özel Güvenlik': t('tc_s2'),
    'Temizlik & Hijyen': t('tc_s3'),
    'Teknik Bakım & Asansör': t('tc_s4'),
    'Aidat & İcra Takibi': t('tc_s5'),
    'Peyzaj & Havuz Bakımı': t('tc_s6'),
  };

  const toggleService = (srv: string) => {
    setServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ phone: true, email: true });
    if (!name || !isValidTrPhone(phone) || (email.trim() !== '' && !isValidEmail(email))) return;

    await submit({
      type: 'quote',
      name,
      phone,
      email: email || undefined,
      subject: `Site Yönetimi Teklifi — ${district} / ${propertyType} (${units})`,
      message: `İlçe: ${district}, Tesis Türü: ${propertyType}, Daire Sayısı: ${units}, İstenen Hizmetler: ${services.join(', ')}`,
      meta: {
        district,
        propertyType,
        units,
        services: services.join(', '),
        kaynak: 'teklif-al-embedded-form',
        dil: language
      }
    }, honeypot);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* Sol Kolon: Gömülü Canlı Teklif & Keşif Formu (7 Kolon) */}
      <div className="lg:col-span-7 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{t('tc_badge')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mb-3">
          {t('tc_title')}
        </h2>
        <p className="text-sm text-[var(--color-secondary)] mb-8 font-normal leading-relaxed">
          {t('tc_desc')}
        </p>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">
              {t('tc_ok_title')}
            </h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md">
              {t('tc_ok_desc').split('{phone}')[0]}
              <strong>{phone}</strong>
              {t('tc_ok_desc').split('{phone}')[1]}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <input 
              type="text" 
              name="website_hp" 
              value={honeypot} 
              onChange={(e) => setHoneypot(e.target.value)} 
              className="hidden" 
              tabIndex={-1} 
              autoComplete="off" 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('tc_lbl_name')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('tc_ph_name')}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('tc_lbl_phone')}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(formatTrPhone(e.target.value))}
                  onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                  placeholder="+90 5XX XXX XX XX"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
                {touched.phone && phone !== '' && !isValidTrPhone(phone) && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1.5">
                    {t('quote_step_1_phone_hint')}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('quote_step_1_email')} <span className="normal-case font-medium text-slate-400">({t('tc_optional')})</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  placeholder={t('tc_ph_email')}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
                {touched.email && email !== '' && !isValidEmail(email) && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1.5">
                    {t('quote_step_1_email_hint')}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('tc_lbl_district')}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  {DISTRICT_NAMES.map((d) => (
                    <option key={d.slug} value={d.name} className="dark:bg-slate-900">
                      {d.name} ({d.side})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('tc_lbl_type')}
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="Site / Apartman" className="dark:bg-slate-900">{t('tc_type_site')}</option>
                  <option value="Rezidans & Kule" className="dark:bg-slate-900">{t('tc_type_res')}</option>
                  <option value={t('tc_type_plaza')} className="dark:bg-slate-900">{t('tc_type_plaza')}</option>
                  <option value="Toplu Konut & TOKİ" className="dark:bg-slate-900">{t('tc_type_mass')}</option>
                  <option value="Sanayi & Fabrika" className="dark:bg-slate-900">{t('tc_type_industrial')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('tc_lbl_units')}
                </label>
                <select
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="10-30 Daire" className="dark:bg-slate-900">{t('tc_u1')}</option>
                  <option value="31-75 Daire" className="dark:bg-slate-900">{t('tc_u2')}</option>
                  <option value="76-150 Daire" className="dark:bg-slate-900">{t('tc_u3')}</option>
                  <option value="151-300 Daire" className="dark:bg-slate-900">{t('tc_u4')}</option>
                  <option value="300+ Daire" className="dark:bg-slate-900">{t('tc_u5')}</option>
                </select>
              </div>
            </div>

            {/* İstenen Hizmetler Çipleri */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                {t('tc_lbl_services')}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Entegre Tesis Yönetimi',
                  '5188 Özel Güvenlik',
                  'Temizlik & Hijyen',
                  'Teknik Bakım & Asansör',
                  'Aidat & İcra Takibi',
                  'Peyzaj & Havuz Bakımı'
                ].map((srv) => {
                  const active = services.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all border ${
                        active
                          ? 'bg-slate-600 text-white border-slate-600 shadow-sm'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-400'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {SERVICE_LABELS[srv] ?? srv}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-2xl bg-slate-600 hover:bg-slate-700 text-white font-extrabold text-base transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {status === 'loading' ? t('tc_sending') : t('tc_submit')}
            </button>

            {/* Faz 211: CRO & E-E-A-T Güven Mühürleri (SSL, 5188 Lisansı, KVKK Açık Rıza, 48 Saat Rapor) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center">
              <div className="flex items-center justify-center gap-1">
                <Icon name="lock" className="text-sm text-emerald-500" />
                <span>256-Bit SSL</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Icon name="shield" className="text-sm text-slate-500" />
                <span>{t('tc_seal_licensed')}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Icon name="gavel" className="text-sm text-slate-500" />
                <span>{t('tc_seal_kvkk')}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Icon name="schedule" className="text-sm text-slate-500" />
                <span>{t('tc_seal_report')}</span>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Sağ Kolon: Fiyatlandırma Rehberi & 7/24 Çağrı (5 Kolon) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Fiyatlandırma Rehberi Kartı */}
        <div className="bg-[var(--color-surface)] text-[var(--color-primary)] p-8 sm:p-10 rounded-[2.5rem] border border-[var(--color-outline)]/60 shadow-sm flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[var(--color-surface-variant)] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-bold tracking-wider uppercase w-fit">
            <Icon name="payments" className="text-sm text-emerald-500" />
            <span>{t('tc_pricing_badge')}</span>
          </div>

          <h3 className="text-xl font-extrabold text-[var(--color-primary)]">
            {t('tc_pricing_title')}
          </h3>

          <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed font-light">
            {t('tc_pricing_intro')}
          </p>

          <ul className="text-xs text-[var(--color-secondary)] space-y-2.5 pt-2 border-t border-[var(--color-outline)]/40">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">1.</span>
              <span><strong>{t('tc_c1')}:</strong> {t('tc_c1d')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">2.</span>
              <span><strong>{t('tc_c2')}:</strong> {t('tc_c2d')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">3.</span>
              <span><strong>{t('tc_c3')}:</strong> {t('tc_c3d')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">4.</span>
              <span><strong>{t('tc_c4')}:</strong> {t('tc_c4d')}</span>
            </li>
          </ul>

          <div className="pt-3 border-t border-[var(--color-outline)]/40 flex items-center justify-between text-xs text-[var(--color-secondary)]">
            <span>{t('tc_term')}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t('tc_budget48')}</span>
          </div>
        </div>

        {/* 7/24 Santral & WhatsApp Hızlı İletişim */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('tc_switch')}</span>
            </div>
            <span className="text-[11px] text-slate-500">{t('tc_always_on')}</span>
          </div>

          <a
            href={`tel:${CANONICAL_NAP.contact.phoneE164}`}
            className="text-lg font-black text-slate-900 dark:text-white hover:text-slate-600 transition-colors flex items-center gap-2"
          >
            <Icon name="call" className="text-slate-600" />
            <span>{CANONICAL_NAP.contact.phoneDisplay}</span>
          </a>

          <a
            href={waLink(t('tc_wa_msg'))}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Icon name="chat" className="text-base" />
            <span>{t('tc_wa_btn')}</span>
          </a>
        </div>

      </div>

    </div>
  );
}
