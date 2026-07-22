"use client";

import PageHeader from '@/components/layout/PageHeader';

export default function IstihdamKoprusu() {
  return (
    <>
      <PageHeader 
        title="İstihdam Köprüsü Modelimiz" 
        description="Nitelikli insan kaynağı yetiştirme, sürekli eğitim ve yasal güvence ile sürdürülebilir istihdam yaklaşımımız." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-16 rounded-[3rem] shadow-sm flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">İnsan Odaklı Operasyon Anlayışı</h2>
          <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">
            Alo Yönetim olarak, tesis yönetimindeki en önemli unsurun "insan" olduğuna inanıyoruz. Güvenlik görevlilerimizden temizlik ve teknik personelimize kadar tüm çalışanlarımızın özlük hakları, SGK güvenceleri ve düzenli maaş ödemeleri kurumsal garantimiz altındadır.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-blue-600 mb-1">1.200+</div>
              <div className="text-xs text-gray-500 font-medium">Aktif Saha Personeli</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-emerald-600 mb-1">%100</div>
              <div className="text-xs text-gray-500 font-medium">SGK ve Özlük Garantisi</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-purple-600 mb-1">Düzenli</div>
              <div className="text-xs text-gray-500 font-medium">İSG & Hizmet Eğitimi</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
