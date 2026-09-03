"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';
import { waLink } from '@/lib/cro';
import { motion, AnimatePresence } from 'framer-motion';
import { DISTRICT_NAMES } from '@/data/districtsMetadata';

export default function TeklifAlClient() {
  const { t, language } = useLanguage();
  const { submit, status, errorKey } = useLeadSubmit();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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

  const toggleService = (srv: string) => {
    setServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

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
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>48 Saatte Şeffaf Teklif & Ücretsiz Keşif</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mb-3">
          Siteniz İçin Profesyonel Yönetim Teklifi Alın
        </h2>
        <p className="text-sm text-[var(--color-secondary)] mb-8 font-normal leading-relaxed">
          Aşağıdaki formu doldurun, uzman tesis yöneticimiz 24 saat içinde binanızı yerinde incelesin ve KMK 634 standartlarında şeffaf bütçe raporunuzu hazırlasın.
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
              Teklif Talebiniz Başarıyla Alındı!
            </h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md">
              Uzman bölge koordinatörümüz <strong>{phone}</strong> numaranız üzerinden sizinle iletişime geçerek ücretsiz keşif randevusu oluşturacaktır.
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
                  Adınız & Soyadınız *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Ahmet Yılmaz"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Telefon Numaranız *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  İlçe (İstanbul)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Tesis Türü
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Site / Apartman" className="dark:bg-slate-900">Konut Sitesi / Apartman</option>
                  <option value="Rezidans & Kule" className="dark:bg-slate-900">Lüks Rezidans / Kule</option>
                  <option value="Plaza & İş Merkezi" className="dark:bg-slate-900">Plaza & İş Merkezi</option>
                  <option value="Toplu Konut & TOKİ" className="dark:bg-slate-900">Toplu Konut (500+ Daire)</option>
                  <option value="Sanayi & Fabrika" className="dark:bg-slate-900">Sanayi & Lojistik Tesis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Daire / Birim Sayısı
                </label>
                <select
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="10-30 Daire" className="dark:bg-slate-900">10 - 30 Bağımsız Bölüm</option>
                  <option value="31-75 Daire" className="dark:bg-slate-900">31 - 75 Bağımsız Bölüm</option>
                  <option value="76-150 Daire" className="dark:bg-slate-900">76 - 150 Bağımsız Bölüm</option>
                  <option value="151-300 Daire" className="dark:bg-slate-900">151 - 300 Bağımsız Bölüm</option>
                  <option value="300+ Daire" className="dark:bg-slate-900">300+ Mega Site</option>
                </select>
              </div>
            </div>

            {/* İstenen Hizmetler Çipleri */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                İhtiyaç Duyduğunuz Hizmetler
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
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-400'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {status === 'loading' ? 'Teklif Talebi İletiliyor...' : 'Ücretsiz Keşif & Teklif Raporu İste →'}
            </button>
          </form>
        )}
      </div>

      {/* Sağ Kolon: Fiyatlandırma Rehberi & 7/24 Çağrı (5 Kolon) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Fiyatlandırma Rehberi Kartı */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white p-8 sm:p-10 rounded-[3rem] border border-slate-700 shadow-xl flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold tracking-wider uppercase w-fit">
            <span className="material-symbols-outlined text-sm text-emerald-400" aria-hidden="true">payments</span>
            <span>Şeffaf Fiyatlandırma</span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            Site Yönetimi Fiyatları Nasıl Belirlenir?
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Alo Yönetim, gizli hiçbir ek maliyet içermeyen <strong>net kalem bütçeleme</strong> ilkesiyle çalışır. Yönetim maliyeti şu 4 temel kritere göre belirlenir:
          </p>

          <ul className="text-xs text-slate-300 space-y-2.5 pt-2 border-t border-white/10">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span><strong>Bağımsız Bölüm Sayısı:</strong> Projedeki daire ve dükkan adedine göre daire başı yönetim katsayısı optimize edilir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span><strong>Güvenlik & Temizlik Vardiyası:</strong> 5188 lisanslı güvenlik personeli ve temizlik görevlisi kadro ihtiyacı.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">3.</span>
              <span><strong>Teknik Ekipman Kapasitesi:</strong> Asansör adedi, jeneratör, hidrofor, yangın santrali ve havuz sistemi.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">4.</span>
              <span><strong>%20 - %30 Net Tasarruf Güvencesi:</strong> Toplu alım gücümüzle ortak alan elektrik ve bakım maliyetlerini düşürürüz.</span>
            </li>
          </ul>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Sözleşme Süresi: 1 Yıl</span>
            <span className="text-emerald-400 font-bold">48 Saatte Bütçe Teslimi</span>
          </div>
        </div>

        {/* 7/24 Santral & WhatsApp Hızlı İletişim */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Nöbetçi Tesis Santrali</span>
            </div>
            <span className="text-[11px] text-slate-500">7/24 Kesintisiz</span>
          </div>

          <a
            href={`tel:${CANONICAL_NAP.contact.phoneE164}`}
            className="text-lg font-black text-slate-900 dark:text-white hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-blue-600" aria-hidden="true">call</span>
            <span>{CANONICAL_NAP.contact.phoneDisplay}</span>
          </a>

          <a
            href={waLink('Merhaba, sitemiz için profesyonel tesis ve site yönetimi teklifi almak istiyoruz.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">chat</span>
            <span>WhatsApp ile Anında Teklif İsteyin</span>
          </a>
        </div>

      </div>

    </div>
  );
}
