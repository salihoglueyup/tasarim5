import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

export default function CerezPolitikasi({ params }: { params: { lang: string } }) {
  const isEn = params.lang === 'en';

  return (
    <>
      <PageHeader 
        title={isEn ? "Cookie Policy" : "Çerez Politikası"} 
        description={isEn ? "Detailed information about our cookie usage and tracking policies." : "Sitemizde kullanılan çerezler ve izleme teknolojileri hakkında bilgilendirme metni."} 
      />

      <article className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] p-12 md:p-20 rounded-[3rem] border border-[var(--color-outline)]/50 prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)]">
          {isEn ? (
            <>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">1. What are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">2. How Do We Use Cookies?</h2>
              <p>
                We use cookies to enhance your experience on our website, including:
              </p>
              <ul>
                <li>Keeping you signed in.</li>
                <li>Understanding how you use our website.</li>
                <li>Improving our services based on your behavior.</li>
              </ul>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">3. Types of Cookies We Use</h2>
              <p>
                <strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features. <br/>
                <strong>Performance Cookies:</strong> These cookies collect information about how you use our websites. <br/>
                <strong>Targeting Cookies:</strong> These cookies are used to deliver advertisements more relevant to you and your interests.
              </p>

              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">4. Managing Cookies</h2>
              <p>
                You can manage or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">1. Çerez Nedir?</h2>
              <p>
                Çerezler, web sitemizi ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitelerinin çalışmasını veya daha verimli çalışmasını sağlamak ve site sahiplerine bilgi sağlamak amacıyla yaygın olarak kullanılmaktadır.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">2. Çerezleri Nasıl Kullanıyoruz?</h2>
              <p>
                Çerezleri, web sitemizdeki deneyiminizi geliştirmek için aşağıdaki amaçlarla kullanıyoruz:
              </p>
              <ul>
                <li>Oturumunuzu açık tutmak.</li>
                <li>Web sitemizi nasıl kullandığınızı anlamak.</li>
                <li>Davranışlarınıza göre hizmetlerimizi iyileştirmek.</li>
              </ul>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">3. Kullandığımız Çerez Türleri</h2>
              <p>
                <strong>Zorunlu Çerezler:</strong> Bu çerezler, web sitesinde gezinmeniz ve özelliklerini kullanmanız için gereklidir.<br/>
                <strong>Performans Çerezleri:</strong> Bu çerezler, web sitelerimizi nasıl kullandığınız hakkında bilgi toplar.<br/>
                <strong>Hedefleme Çerezleri:</strong> Bu çerezler, size ve ilgi alanlarınıza daha uygun reklamlar sunmak için kullanılır.
              </p>

              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">4. Çerezleri Yönetme</h2>
              <p>
                Çerezleri dilediğiniz gibi yönetebilir veya silebilirsiniz. Bilgisayarınızda halihazırda bulunan tüm çerezleri silebilir ve çoğu tarayıcıyı çerezlerin yerleştirilmesini önleyecek şekilde ayarlayabilirsiniz. Ancak bunu yaparsanız, bir siteyi her ziyaret ettiğinizde bazı tercihleri manuel olarak ayarlamanız gerekebilir ve bazı hizmetler ve işlevler çalışmayabilir.
              </p>
            </>
          )}
        </div>
      </article>
    </>
  );
}
