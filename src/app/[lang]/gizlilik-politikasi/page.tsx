import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

export default function GizlilikPolitikasi({ params }: { params: { lang: string } }) {
  const isEn = params.lang === 'en';

  return (
    <>
      <PageHeader 
        title={isEn ? "Privacy Policy" : "Gizlilik Politikası"} 
        description={isEn ? "Detailed information on how we collect, use, and protect your data." : "Verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz hakkında detaylı bilgi."} 
      />

      <article className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] p-12 md:p-20 rounded-[3rem] border border-[var(--color-outline)]/50 prose prose-lg dark:prose-invert max-w-none text-[var(--color-secondary)]">
          {isEn ? (
            <>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">2. How We Use Information</h2>
              <p>
                We may use the information we collect about you to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services.</li>
                <li>Perform internal operations, including troubleshooting and data analysis.</li>
                <li>Send you communications we think will be of interest to you.</li>
              </ul>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">3. Information Sharing</h2>
              <p>
                We do not share personal information with companies, organizations, and individuals outside of Alo Yönetim unless one of the following circumstances applies:
                <br/> - With your consent.
                <br/> - For legal reasons.
              </p>

              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">4. Data Security</h2>
              <p>
                We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We use encryption to keep your data private while in transit.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">1. Topladığımız Bilgiler</h2>
              <p>
                Hesap oluşturduğunuzda veya değiştirdiğinizde, hizmet talep ettiğinizde, müşteri desteği ile iletişime geçtiğinizde veya bizimle başka bir şekilde iletişim kurduğunuzda doğrudan bize sağladığınız bilgileri toplarız.
              </p>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">2. Bilgileri Nasıl Kullanıyoruz</h2>
              <p>
                Hakkınızda topladığımız bilgileri aşağıdaki amaçlar için kullanabiliriz:
              </p>
              <ul>
                <li>Hizmetlerimizi sağlamak, sürdürmek ve iyileştirmek.</li>
                <li>Sorun giderme ve veri analizi de dahil olmak üzere iç operasyonları gerçekleştirmek.</li>
                <li>İlginizi çekeceğini düşündüğümüz iletişimleri size göndermek.</li>
              </ul>
              
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">3. Bilgi Paylaşımı</h2>
              <p>
                Aşağıdaki durumlardan biri geçerli olmadığı sürece kişisel bilgileri Alo Yönetim dışındaki şirketler, kuruluşlar ve kişilerle paylaşmayız:
                <br/> - Sizin izninizle.
                <br/> - Yasal nedenlerle.
              </p>

              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-12">4. Veri Güvenliği</h2>
              <p>
                Kullanıcılarımızı, tuttuğumuz bilgilere yetkisiz erişime veya bunların yetkisiz şekilde değiştirilmesine, ifşa edilmesine veya yok edilmesine karşı korumak için çok çalışıyoruz. Verilerinizi aktarım halindeyken gizli tutmak için şifreleme kullanıyoruz.
              </p>
            </>
          )}
        </div>
      </article>
    </>
  );
}
