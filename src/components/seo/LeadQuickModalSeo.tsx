"use client";

import React, { useState, useEffect } from 'react';
import JsonLd from './JsonLd';

export interface QuickQuotePayload {
  service?: string;
  district?: string;
  units?: string;
}

export default function LeadQuickModalSeo() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [service, setService] = useState('Entegre Tesis & Site Yönetimi');
  const [units, setUnits] = useState('50 - 150 Daire');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [startTime, setStartTime] = useState(0);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Listen for custom trigger events across all pages
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent<QuickQuotePayload>) => {
      if (e.detail) {
        if (e.detail.service) setService(e.detail.service);
        if (e.detail.district) setDistrict(e.detail.district);
        if (e.detail.units) setUnits(e.detail.units);
      }
      setStartTime(Date.now());
      setStatus('idle');
      setIsOpen(true);
    };

    window.addEventListener('open-quick-quote' as any, handleOpenModal);
    return () => window.removeEventListener('open-quick-quote' as any, handleOpenModal);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      setStatus('error');
      setErrorMessage('Lütfen adınızı ve telefon numaranızı girin.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const elapsedMs = Date.now() - startTime;
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          district: district || 'İstanbul Geneli',
          service,
          units,
          notes: notes || `Hızlı Teklif Formu üzerinden gönderildi.`,
          company: honeypot, // Honeypot spam trap
          elapsedMs
        })
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.errorKey || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Sunucuya bağlanılamadı. Lütfen telefon ile ulaşın: 0216 550 48 48');
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Alo Yönetim 48 Saatte Şeffaf Hizmet Teklifi',
    description: 'Site, apartman ve rezidanslar için anında ücretsiz keşif ve teklif başvuru formu.',
    mainEntity: {
      '@type': 'FinancialService',
      name: 'Alo Yönetim Tesis Teklifi',
      telephone: '+90-216-550-4848'
    }
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 text-white rounded-[2.5rem] border border-white/20 shadow-2xl p-6 sm:p-10 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>

                <h3 className="text-2xl font-black text-white">Teklif Talebiniz Alındı!</h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  Uzman ekibimiz <strong>{fullName}</strong> adına talebinizi inceleyerek <strong>48 saat içinde</strong> şeffaf işletme projesi ve fiyat teklifinizi sunacaktır.
                </p>

                <div className="pt-4 flex flex-col gap-2.5">
                  <a
                    href="https://wa.me/905325504848?text=Merhaba,%20site%20yonetimi%20icin%20hizli%20teklif%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    <span>WhatsApp ile Hızlı Bağlan</span>
                  </a>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 text-xs text-slate-400 hover:text-white transition-colors font-medium"
                  >
                    Pencereyi Kapat
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-bold uppercase tracking-wider">
                      48 Saatte Şeffaf Teklif
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">Ücretsiz Keşif & Fiyat Teklifi</h3>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    Sitenizin ihtiyaçlarını girin, tasarruflu işletme projenizi hazırlayalım.
                  </p>
                </div>

                {/* Honeypot hidden input */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Ad Soyad */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Adınız Soyadınız <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ahmet Yılmaz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-400 transition-colors placeholder:text-slate-500"
                  />
                </div>

                {/* Telefon & İlçe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Telefon Numarası <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0532 000 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-400 transition-colors placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      İlçe / Bölge
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Kadıköy / Moda"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-400 transition-colors placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Hizmet & Daire Sayısı */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Hizmet Türü
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-800 border border-white/15 rounded-2xl py-3 px-4 text-xs text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="Entegre Tesis & Site Yönetimi">Entegre Tesis & Site Yönetimi</option>
                      <option value="7/24 Özel Güvenlik Hizmeti">7/24 Özel Güvenlik Hizmeti</option>
                      <option value="Profesyonel Temizlik & Hijyen">Profesyonel Temizlik & Hijyen</option>
                      <option value="Aidat Takibi & Hukuk Danışmanlığı">Aidat Takibi & Hukuk</option>
                      <option value="Teknik Bakım & Asansör">Teknik Bakım & Asansör</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Bağımsız Bölüm (Daire)
                    </label>
                    <select
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="w-full bg-slate-800 border border-white/15 rounded-2xl py-3 px-4 text-xs text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="10 - 30 Daire (Butik Apartman)">10 - 30 Daire (Butik Apartman)</option>
                      <option value="31 - 80 Daire (Orta Ölçekli Site)">31 - 80 Daire (Orta Ölçekli Site)</option>
                      <option value="81 - 200 Daire (Geniş Site / Rezidans)">81 - 200 Daire (Geniş Site)</option>
                      <option value="200+ Daire (Karma Tesis / Toplu Konut)">200+ Daire (Karma Tesis)</option>
                    </select>
                  </div>
                </div>

                {/* Error Box */}
                {status === 'error' && (
                  <div className="p-3 bg-rose-500/20 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                      <span>Teklif Hazırlanıyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Ücretsiz Teklif Talebini Gönder</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
