"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';

const offices = [
  {
    city: "İstanbul Genel Müdürlük",
    address: "Örnek Mah. İstiklal Cad. No:123 Şişli / İstanbul",
    phone: "0850 000 00 00",
    email: "istanbul@aloyonetim.com"
  },
  {
    city: "Kadıköy Bölge Müdürlüğü",
    address: "Bağdat Cad. No:45 Kadıköy / İstanbul",
    phone: "0216 000 00 00",
    email: "kadikoy@aloyonetim.com"
  },
  {
    city: "Ataşehir Operasyon Merkezi",
    address: "Barbaros Mah. Şerifali Cad. Ataşehir / İstanbul",
    phone: "0216 111 00 00",
    email: "atasehir@aloyonetim.com"
  }
];

export default function Iletisim() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <>
      <PageHeader 
        title="İletişim" 
        description="Sorularınız, teklif talepleriniz veya canlı destek için bize 7/24 ulaşın." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-8 md:p-14 rounded-[3rem] border border-[var(--color-outline)]/60 shadow-sm flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">Bize Mesaj Gönderin</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light">
              Formu doldurun, müşteri temsilcilerimiz en geç 15 dakika içinde size geri dönüş yapsın.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/50 p-8 rounded-2xl text-center flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
                <div className="font-bold text-lg text-emerald-900 dark:text-emerald-300">Mesajınız Başarıyla Alındı!</div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400">Temsilcimiz en kısa sürede sizinle iletişime geçecektir.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Adınız Soyadınız</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ahmet Yılmaz"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Telefon Numaranız</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0555 000 00 00"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">E-posta Adresiniz</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmet@example.com"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Mesajınız / Talebiniz</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Sitenizin durumu ve merak ettiğiniz konular..."
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--color-primary)] focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transition-opacity mt-2"
                >
                  Mesajı Gönder
                </button>
              </form>
            )}
          </div>

          {/* Contact Direct Info */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-[#122338] to-[#081524] text-white p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full">
                7/24 Çağrı Merkezi
              </span>
              <h3 className="text-3xl font-bold mt-4">Doğrudan İletişim</h3>
            </div>

            <div className="flex flex-col gap-6 border-y border-white/15 py-6">
              <a href="tel:08500000000" className="flex items-center gap-4 text-gray-200 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl text-blue-400">call</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Müşteri Hizmetleri</div>
                  <div className="text-xl font-bold">0850 000 00 00</div>
                </div>
              </a>

              <a href="https://wa.me/905550000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-200 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">chat</span>
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold">WhatsApp Canlı Destek</div>
                  <div className="text-lg font-bold">Hemen Mesaj Başlatın</div>
                </div>
              </a>
            </div>

            <div className="text-xs text-gray-300 font-light leading-relaxed">
              Genel müdürlüğümüz hafta içi 08:30 - 18:30 saatleri arasında açıktır. Nöbetçi çağrı merkezimiz ise 7/24 hizmet vermektedir.
            </div>
          </div>

        </div>

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((o, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)]">{o.city}</h3>
              <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">{o.address}</p>
              <div className="pt-2 text-xs font-bold text-blue-600">{o.phone}</div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
