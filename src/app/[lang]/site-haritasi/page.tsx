"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SiteHaritasi() {
  const sitemapData = [
    {
      title: "Ana Sayfalar",
      links: [
        { name: "Anasayfa", path: "/" },
        { name: "Tüm Hizmetler", path: "/hizmetler" },
        { name: "İletişim", path: "/iletisim" },
        { name: "Sıkça Sorulan Sorular", path: "/sss" },
        { name: "Blog", path: "/blog" },
      ]
    },
    {
      title: "Hizmetlerimiz",
      links: [
        { name: "Güvenlik Yönetimi", path: "/hizmetler/guvenlik-yonetimi" },
        { name: "Tesis Yönetimi", path: "/hizmetler/tesis-yonetimi" },
        { name: "Temizlik ve Hijyen", path: "/hizmetler/temizlik-ve-hijyen" },
        { name: "Teknik Bakım", path: "/hizmetler/teknik-bakim" },
        { name: "Peyzaj ve Bahçe Bakımı", path: "/hizmetler/peyzaj-ve-bahce-bakimi" },
        { name: "Havuz Bakımı ve Hijyen", path: "/hizmetler/havuz-bakimi-ve-hijyen" },
        { name: "Haşere ve Dezenfeksiyon", path: "/hizmetler/hasere-ve-dezenfeksiyon" },
        { name: "Hukuk ve İcra Danışmanlığı", path: "/hizmetler/hukuk-ve-icra-danismanligi" },
      ]
    },
    {
      title: "Kurumsal",
      links: [
        { name: "Hakkımızda", path: "/hakkimizda" },
        { name: "Vizyon ve Misyon", path: "/kurumsal/vizyon-misyon" },
        { name: "Kalite Politikamız", path: "/kurumsal/kalite-politikamiz" },
        { name: "Sürdürülebilirlik", path: "/kurumsal/surdurulebilirlik" },
        { name: "Referanslar", path: "/referanslar" },
        { name: "Başarı Hikayeleri", path: "/basari-hikayeleri" },
      ]
    },
    {
      title: "Özel Çözümler & Akademiler",
      links: [
        { name: "Sektörel Çözümler", path: "/sektorel-cozumler" },
        { name: "İstihdam Köprüsü", path: "/istihdam-koprusu" },
        { name: "Güvenlik Akademisi", path: "/guvenlik-akademisi" },
        { name: "Aidat Hesaplayıcı", path: "/hesaplayici" },
        { name: "Teklif Al", path: "/teklif-al" },
      ]
    },
    {
      title: "Yasal & Sözleşmeler",
      links: [
        { name: "Gizlilik Politikası", path: "/gizlilik-politikasi" },
        { name: "Çerez Politikası", path: "/cerez-politikasi" },
        { name: "Kullanım Koşulları", path: "/kullanim-kosullari" },
      ]
    }
  ];

  return (
    <>
      <PageHeader 
        title="Site Haritası" 
        description="Alo Yönetim bünyesindeki tüm sayfalara ve hizmetlere tek bir noktadan hızlıca erişin." 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sitemapData.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-xl font-bold text-[var(--color-primary)] border-b border-slate-200 dark:border-white/10 pb-3">
                {category.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      href={link.path} 
                      className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] dark:hover:text-white hover:underline underline-offset-4 decoration-blue-500 transition-all flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
