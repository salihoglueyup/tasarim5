"use client";

import PageHeader from '@/components/layout/PageHeader';

export default function KVKK() {
  return (
    <>
      <PageHeader 
        title="KVKK ve Aydınlatma Metni" 
        description="Kişisel verilerinizin güvenliği ve gizliliği bizim için en yüksek önceliktir." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] p-12 md:p-20 rounded-[3rem] border border-[var(--color-outline)]/50 prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)]">
          
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">1. Veri Sorumlusunun Kimliği</h2>
          <p>
            Alo Yönetim Hizmetleri A.Ş. olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz işbu aydınlatma metninde açıklandığı çerçevede, kaydedilecek, saklanacak, güncellenecek, mevzuatın izin verdiği durumlarda 3. kişilere açıklanabilecek / devredilebilecek, sınıflandırılabilecek ve KVKK’da sayılan şekillerde işlenebilecektir.
          </p>

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">2. Kişisel Verilerin İşlenme Amacı</h2>
          <p>
            Toplanan kişisel verileriniz, şirketimiz tarafından sunulan hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, site yönetimi aidat takibi, hukuki süreçlerin yürütülmesi ve bina güvenliğinin (CCTV kayıtları, plaka tanıma) sağlanması amaçlarıyla işlenmektedir.
          </p>

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">3. İşlenen Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
          <p>
            Kişisel verileriniz, kanuni yükümlülüklerimizi yerine getirmek amacıyla yetkili kamu kurum ve kuruluşlarına, hukuki uyuşmazlıkların giderilmesi amacıyla şirket avukatlarımıza ve aidat tahsilat süreçleri için anlaşmalı bankalara aktarılabilmektedir.
          </p>

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">4. İletişim ve Haklarınız</h2>
          <p>
            KVKK 11. Madde kapsamındaki haklarınızı kullanmak için <strong>kvkk@aloyonetim.com</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.
          </p>

        </div>
      </section>
    </>
  );
}
