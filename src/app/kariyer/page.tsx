"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

export default function Kariyer() {
  return (
    <>
      <PageHeader 
        title="Kariyer" 
        description="Bizimle birlikte sektöre yön vermek ve büyüyen ekibimizin bir parçası olmak ister misiniz?" 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="flex flex-col gap-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight">
              Geleceği Birlikte İnşa Edelim.
            </h2>
            <div className="text-xl text-[var(--color-secondary)] font-light leading-relaxed space-y-6">
              <p>
                Alo Yönetim olarak, en büyük yatırımımızın insan kaynağı olduğuna inanıyoruz. Çalışanlarımızın mesleki gelişimini destekliyor, modern ve adil bir çalışma ortamı sunuyoruz.
              </p>
              <p>
                Hızla büyüyen operasyonlarımızda, hem merkez ofis kadromuzda hem de yönettiğimiz prestijli projelerde değerlendirilmek üzere her zaman yetenekli çalışma arkadaşları arıyoruz.
              </p>
            </div>
            <Link 
              href="/kariyer/acik-pozisyonlar" 
              className="inline-flex self-start items-center gap-3 bg-[var(--color-primary)] text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform mt-4"
            >
              Açık Pozisyonları İncele
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="w-full aspect-[4/3] rounded-[3rem] overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

        </div>
      </section>
    </>
  );
}
