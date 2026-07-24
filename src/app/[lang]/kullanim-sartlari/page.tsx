import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

export default function KullanimSartlari({ params }: { params: { lang: string } }) {
  const isEn = params.lang === 'en';

  return (
    <>
      <PageHeader 
        title={isEn ? "Terms of Use" : "Kullanım Şartları"} 
        description={isEn ? "Please read these terms carefully before using our website and services." : "Web sitemizi ve hizmetlerimizi kullanmadan önce lütfen bu şartları dikkatlice okuyunuz."} 
      />

      <article className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] p-12 md:p-20 rounded-[3rem] border border-[var(--color-outline)]/50 prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)]">
          {isEn ? (
            <>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">2. Use of Service</h2>
              <p>
                Our services are provided on an "as is" and "as available" basis. We reserve the right to modify or discontinue any part of our service without notice at any time.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">3. User Responsibilities</h2>
              <p>
                You agree not to use the site for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the site in any way that could damage the site, the services, or the general business of Alo Yönetim.
              </p>

              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">4. Limitation of Liability</h2>
              <p>
                In no event shall Alo Yönetim, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">1. Şartların Kabulü</h2>
              <p>
                Bu web sitesine erişerek ve kullanarak, bu sözleşmenin şart ve hükümlerini kabul etmiş ve bunlara bağlı kalmayı onaylamış olursunuz.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">2. Hizmetin Kullanımı</h2>
              <p>
                Hizmetlerimiz "olduğu gibi" ve "mevcut olduğu şekilde" sunulmaktadır. Hizmetimizin herhangi bir bölümünü herhangi bir zamanda bildirimde bulunmaksızın değiştirme veya durdurma hakkımızı saklı tutarız.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">3. Kullanıcı Sorumlulukları</h2>
              <p>
                Siteyi herhangi bir yasa dışı amaç için veya bu madde kapsamında yasaklanan herhangi bir amaç için kullanmamayı kabul edersiniz. Siteyi, siteye, hizmetlere veya Alo Yönetim'in genel işine zarar verebilecek herhangi bir şekilde kullanmamayı kabul edersiniz.
              </p>

              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">4. Sorumluluğun Sınırlandırılması</h2>
              <p>
                Alo Yönetim, yöneticileri, çalışanları, ortakları, temsilcileri, tedarikçileri veya bağlı kuruluşları, kar, veri, kullanım, şerefiye veya diğer maddi olmayan kayıplar dahil ancak bunlarla sınırlı olmamak üzere dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai hasarlardan hiçbir durumda sorumlu tutulamaz.
              </p>
            </>
          )}
        </div>
      </article>
    </>
  );
}
