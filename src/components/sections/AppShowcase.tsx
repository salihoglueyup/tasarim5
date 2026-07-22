"use client";

import { motion } from 'framer-motion';

const appFeatures = [
  {
    icon: "credit_card",
    title: "Kredi Kartı ile Taksitli Aidat Ödeme",
    desc: "Banka sırası beklemeden 3D Secure güvencesiyle tek tıkla aidatınızı ödeyin."
  },
  {
    icon: "receipt_long",
    title: "Şeffaf Canlı Gelir/Gider Bilanço",
    desc: "Sitenin topladığı her kuruşun ve yapılan her harcamanın faturasını anında görün."
  },
  {
    icon: "event_seat",
    title: "Tesis & Sosyal Alan Rezervasyonu",
    desc: "Tenis kortu, açık havuz veya toplantı salonu rezervasyonlarınızı cebinizden yönetin."
  },
  {
    icon: "engineering",
    title: "Fotoğraflı Anlık Arıza Bildirimi",
    desc: "Patlayan ampulü veya asansör arızasını fotoğraflayıp bildirin, teknik ekibin gelişini canlı izleyin."
  },
  {
    icon: "how_to_vote",
    title: "Dijital Karar & Anket Oylaması",
    desc: "Genel kurul kararlarına veya renk seçim anketlerine oturduğunuz yerden katılın."
  },
  {
    icon: "sensor_door",
    title: "Mobil Otomatik Kapı & Bariyer Açma",
    desc: "Site ana kapısını veya plaka tanımayı akıllı telefonunuz üzerinden kontrol edin."
  }
];

export default function AppShowcase() {
  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="bg-gradient-to-br from-[#0c1e34] via-[#122742] to-[#071322] text-white rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 flex flex-col gap-8">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full w-fit">
            Tüm Site Cebinizde
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Alo Yönetim Sakin & Yönetici Portalı
          </h2>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            Karmaşık belgelere, kayıp dekontlara ve ulaşılamayan yöneticilere son. İos ve Android uygulamamızla siteniz tamamen dijitalleşiyor.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/10">
              <span className="material-symbols-outlined text-2xl text-blue-400">phone_iphone</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400">İndir</span>
                <span className="text-sm font-bold">App Store</span>
              </div>
            </div>

            <div className="bg-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/10">
              <span className="material-symbols-outlined text-2xl text-emerald-400">android</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400">İndir</span>
                <span className="text-sm font-bold">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {appFeatures.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-3 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <span className="material-symbols-outlined">{f.icon}</span>
              </div>
              <h3 className="font-bold text-base text-white">{f.title}</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
