"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export type AppScreen = 'aidat' | 'ariza' | 'oylama' | 'guvenlik';

export default function MobileAppLiveSimulatorSeo() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('aidat');
  const [paidStatus, setPaidStatus] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState<string | null>(null);
  const [guestAdded, setGuestAdded] = useState(false);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Alo Yönetim Sakin & Yönetici Mobil Paneli',
    operatingSystem: 'iOS, Android',
    applicationCategory: 'BusinessApplication',
    description: 'Site sakinleri ve yöneticiler için 7/24 online aidat ödeme, arıza bildirimi ve oylama mobil uygulaması.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '450'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY'
    }
  };

  return (
    <div className="my-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-white/10 relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm">smartphone</span>
          <span>İnteraktif Sakin & Yönetici Deneyimi</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-white">
          Alo Yönetim Mobil Uygulama Simülatörü
        </h3>
        <p className="text-sm text-slate-300 font-light mt-2">
          Sitenizde ve rezidansınızda sakinlerin ve yöneticilerin kullanacağı dijital yönetim panelini canlı test edin.
        </p>
      </div>

      {/* Grid: Navigation Features & Interactive Phone Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Side: Navigation Tabs */}
        <div className="lg:col-span-6 space-y-4">
          <button
            onClick={() => setActiveScreen('aidat')}
            className={`w-full p-5 rounded-3xl border text-left transition-all flex items-start gap-4 ${
              activeScreen === 'aidat'
                ? 'bg-blue-600/30 border-blue-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">credit_card</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">1. Tek Tıkla Aidat & Masraf Ödeme</h4>
              <p className="text-xs text-slate-300 font-light">
                Kredi kartı veya banka kartıyla anında 3D Secure ödeme ve resmi dijital makbuz üretimi.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveScreen('ariza')}
            className={`w-full p-5 rounded-3xl border text-left transition-all flex items-start gap-4 ${
              activeScreen === 'ariza'
                ? 'bg-amber-600/30 border-amber-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">home_repair_service</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">2. Fotoğraflı Arıza & Teknik Takip</h4>
              <p className="text-xs text-slate-300 font-light">
                Ortak alandaki arızayı fotoğraflayıp iletin; teknik ekip çözdüğünde bildirim alın.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveScreen('oylama')}
            className={`w-full p-5 rounded-3xl border text-left transition-all flex items-start gap-4 ${
              activeScreen === 'oylama'
                ? 'bg-emerald-600/30 border-emerald-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">how_to_vote</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">3. Dijital Genel Kurul & Karar Oylama</h4>
              <p className="text-xs text-slate-300 font-light">
                Site kararlarına arsa payınız oranında evinizden online katılın, anketleri oylayın.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveScreen('guvenlik')}
            className={`w-full p-5 rounded-3xl border text-left transition-all flex items-start gap-4 ${
              activeScreen === 'guvenlik'
                ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">local_police</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">4. Ziyaretçi & Plaka Tanıma (PTS)</h4>
              <p className="text-xs text-slate-300 font-light">
                Misafirinizin plakasını önceden kaydedin; nizamiyeden beklemeden hızlı geçiş yapsın.
              </p>
            </div>
          </button>
        </div>

        {/* Right Side: Interactive Smartphone Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-[320px] sm:w-[350px] bg-black rounded-[3.5rem] p-4 border-[6px] border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative">
            
            {/* Dynamic Island / Notch */}
            <div className="w-28 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-end px-2">
              <span className="w-2.5 h-2.5 bg-blue-500/40 rounded-full" />
            </div>

            {/* Screen View */}
            <div className="bg-slate-900 rounded-[2.5rem] p-5 h-[490px] flex flex-col justify-between text-slate-200 text-xs overflow-hidden border border-white/10 relative">
              
              {/* App Status Bar */}
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <strong className="text-white text-xs">Güneş Sitesi D:14</strong>
                </div>
                <span className="text-[10px] text-slate-400">Alo Yönetim Mobil</span>
              </div>

              {/* Dynamic Screen Content */}
              <div className="my-auto space-y-4">
                
                {/* 1. Aidat Ekranı */}
                {activeScreen === 'aidat' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-4 text-center space-y-1">
                      <span className="text-[11px] text-slate-400">Şubat 2026 Aidat Borcu</span>
                      <div className="text-3xl font-black text-white">
                        {paidStatus ? '0.00 ₺' : '1.850 ₺'}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                        paidStatus ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {paidStatus ? '✓ Ödendi (Dekont #8492)' : 'Son Ödeme: 28 Şubat'}
                      </span>
                    </div>

                    {!paidStatus ? (
                      <button
                        onClick={() => setPaidStatus(true)}
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
                      >
                        💳 Kart ile Şimdi Öde (1.850 ₺)
                      </button>
                    ) : (
                      <button
                        onClick={() => setPaidStatus(false)}
                        className="w-full py-2.5 bg-white/10 text-slate-300 font-medium rounded-xl text-center"
                      >
                        Simülasyonu Sıfırla
                      </button>
                    )}
                  </div>
                )}

                {/* 2. Arıza Bildirim Ekranı */}
                {activeScreen === 'ariza' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-amber-500/15 border border-amber-500/30 rounded-2xl p-3.5 space-y-2">
                      <span className="font-bold text-white block">A Blok Asansör Arızası</span>
                      <p className="text-[11px] text-slate-300 font-light">
                        2. Kat kabin kapısında sürtünme sesi mevcut.
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-amber-400">
                        <span className="material-symbols-outlined text-xs">schedule</span>
                        <span>Durum: {ticketSent ? 'Teknik Ekip Yönlendirildi' : 'Kayıt Açıldı'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setTicketSent(!ticketSent)}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-transform active:scale-95"
                    >
                      {ticketSent ? 'Yeni Arıza Talebi Aç' : '🔧 Teknik Ekibi Göreve Çağır'}
                    </button>
                  </div>
                )}

                {/* 3. Oylama Ekranı */}
                {activeScreen === 'oylama' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                      <span className="font-bold text-white block">Çatı GES Güneş Enerjisi Oylaması</span>
                      <p className="text-[11px] text-slate-300 font-light">
                        Ortak elektrik faturasını %60 düşürecek GES projesi onayınıza sunuldu.
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={() => setVoteSubmitted('kabul')}
                          className={`py-2 rounded-xl font-bold transition-all ${
                            voteSubmitted === 'kabul'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white/10 text-slate-200'
                          }`}
                        >
                          ✓ Kabul (%88)
                        </button>
                        <button
                          onClick={() => setVoteSubmitted('red')}
                          className={`py-2 rounded-xl font-bold transition-all ${
                            voteSubmitted === 'red'
                              ? 'bg-rose-500 text-white'
                              : 'bg-white/10 text-slate-200'
                          }`}
                        >
                          ✕ Red (%12)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Güvenlik & Plaka Ekranı */}
                {activeScreen === 'guvenlik' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-purple-500/15 border border-purple-500/30 rounded-2xl p-4 space-y-2">
                      <span className="font-bold text-white block">Ziyaretçi Plaka Tanımlama</span>
                      <input
                        type="text"
                        placeholder="Örn: 34 ABC 789"
                        defaultValue="34 BKL 1923"
                        className="w-full bg-black/40 border border-white/20 rounded-xl py-2 px-3 text-xs text-white font-mono text-center"
                      />
                      <span className="text-[10px] text-slate-400 block text-center">
                        Nizamiye PTS kamerası plakayı otomatik okuyacaktır.
                      </span>
                    </div>

                    <button
                      onClick={() => setGuestAdded(!guestAdded)}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
                    >
                      {guestAdded ? 'Plaka Güvenliğe İletildi ✓' : '🛡️ Plakayı Güvenliğe Bildir'}
                    </button>
                  </div>
                )}

              </div>

              {/* Bottom App Navigation */}
              <div className="grid grid-cols-4 gap-1 pt-2 border-t border-white/10 text-center">
                <button
                  onClick={() => setActiveScreen('aidat')}
                  className={`flex flex-col items-center gap-1 ${activeScreen === 'aidat' ? 'text-blue-400' : 'text-slate-500'}`}
                >
                  <span className="material-symbols-outlined text-base">receipt_long</span>
                  <span className="text-[9px]">Aidat</span>
                </button>

                <button
                  onClick={() => setActiveScreen('ariza')}
                  className={`flex flex-col items-center gap-1 ${activeScreen === 'ariza' ? 'text-amber-400' : 'text-slate-500'}`}
                >
                  <span className="material-symbols-outlined text-base">build</span>
                  <span className="text-[9px]">Arıza</span>
                </button>

                <button
                  onClick={() => setActiveScreen('oylama')}
                  className={`flex flex-col items-center gap-1 ${activeScreen === 'oylama' ? 'text-emerald-400' : 'text-slate-500'}`}
                >
                  <span className="material-symbols-outlined text-base">how_to_vote</span>
                  <span className="text-[9px]">Oylama</span>
                </button>

                <button
                  onClick={() => setActiveScreen('guvenlik')}
                  className={`flex flex-col items-center gap-1 ${activeScreen === 'guvenlik' ? 'text-purple-400' : 'text-slate-500'}`}
                >
                  <span className="material-symbols-outlined text-base">shield</span>
                  <span className="text-[9px]">Güvenlik</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
