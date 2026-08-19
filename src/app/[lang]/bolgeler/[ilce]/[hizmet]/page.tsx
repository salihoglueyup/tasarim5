import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { QuoteCtaButton, TldrBlock } from '@/components';
import {
  DistrictSecurityAuditTableSeo,
  InteractiveSecurityRiskRadarSeo,
  SecurityTrustBadgeGridSeo,
  SecurityLegalTemplateGeneratorSeo,
  DistrictTechnicalAuditTableSeo,
  InteractiveTechnicalAuditRadarSeo,
  CleaningScheduleGeneratorSeo,
  DistrictCleaningAuditTableSeo,
} from '@/components/seo';
import { buildMetadata } from '@/lib/seo';
import {
  generateBreadcrumbs,
  webPageSchema,
  localServiceSchema,
  localBusinessAreaSchema,
  faqPageSchema,
  districtSecurityServiceSchema,
  districtTechnicalServiceSchema,
  districtCleaningServiceSchema,
  ORG_PHONE,
} from '@/lib/schemas';

import { DISTRICTS, getDistrict } from '@/data/districts';
import { SERVICES, getService } from '@/data/services';
import { LOCALES } from '@/lib/seo';

// ISR (Faz 120): 96 kombinasyon sayfası günlük yeniden doğrulanır.
export const revalidate = 86400;
export const dynamicParams = true;

// Hizmet × ilçe matrisini her locale için ön-üret (Faz 105).
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    DISTRICTS.flatMap((d) =>
      SERVICES.map((s) => ({ lang, ilce: d.slug, hizmet: s.slug })),
    ),
  );
}

/** Hizmete özgü 3. SSS sorusu — tüm sayfalarda aynı olmayacak şekilde farklılaştırıldı. */
const SERVICE_SPECIFIC_Q3: Record<string, { q: string; a: string }> = {
  'aidat-takibi': {
    q: 'Aidat ödenmezse yasal süreç nasıl işler?',
    a: 'Ödenmeyen aidatlar için önce yazılı ihtarname gönderilir; ardından 634 sayılı KMK m.20 kapsamında icra takibi başlatılır. Dijital sistemimiz gecikmeleri anlık olarak tespit eder ve süreci otomatik olarak yönetir.',
  },
  'guvenlik-yonetimi': {
    q: 'Güvenlik personeli 5188 sayılı Kanun\'a uygun mu?',
    a: 'Evet. Tüm personelimiz 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun kapsamında lisanslı ve periyodik eğitimden geçmiş uzman güvenlik görevlilerinden oluşur.',
  },
  'tesis-yonetimi': {
    q: 'Yıllık işletme projesi ne zaman ve nasıl hazırlanır?',
    a: 'İşletme projesi, her yıl Ocak ayında KMK m.37 uyarınca kat malikleri kuruluna sunulmak üzere hazırlanır. Gelir-gider tahmini, demirbaş planı ve acil fon ayırımı şeffaf biçimde raporlanır.',
  },
  'temizlik-ve-hijyen': {
    q: 'Temizlik hangi sıklıkla yapılır, programa nasıl ulaşırım?',
    a: 'Temizlik takvimi sitenizin büyüklüğüne ve sözleşme kapsamına göre günlük, haftalık veya 2 haftada bir olarak planlanır. Uygulama üzerinden temizlik raporuna ve fotoğraflı doğrulamaya anlık erişebilirsiniz.',
  },
  'teknik-bakim': {
    q: 'Periyodik bakım raporları nasıl takip edilir?',
    a: 'Her bakım ziyareti sonrası dijital rapor site yönetimine iletilir; asansör, jeneratör ve ortak sistem kayıtları arşivlenir. Anlaşmazlık ya da sigorta durumunda hukuki geçerli belge niteliği taşır.',
  },
  'peyzaj-ve-bahce-bakimi': {
    q: 'Mevsimsel bakım programı nasıl planlanıyor?',
    a: 'İlkbahar çiçeklendirmesi, yaz sulama ve çim bakımı, sonbahar budama ve kışa hazırlık olarak 4 mevsim ayrı programa alınır. Sitenizin peyzaj karakterine göre özelleştirilmiş yıllık takvim sunulur.',
  },
  'havuz-bakimi-ve-hijyen': {
    q: 'Havuz suyu kalitesi nasıl kontrol ediliyor?',
    a: 'pH, klor, alkalinite ve bulanıklık değerleri günlük ölçülür; sonuçlar dijital havuz günlüğüne kaydedilir. Sağlık Bakanlığı standartlarına aykırı değer tespit edilirse havuz hemen devre dışı bırakılır.',
  },
  'hasere-ve-dezenfeksiyon': {
    q: 'İlaçlama sonrası sakinlerin dikkat etmesi gerekenler neler?',
    a: 'Uygulama sonrası havalandırma süresi (genellikle 2-4 saat) geçene kadar ilaçlanan alanlara girilmemesi önerilir. Kullanılan tüm ürünler Sağlık Bakanlığı onaylı ve çocuk/evcil hayvan güvenliği test edilmiş preparatlardır.',
  },
  'hukuk-ve-icra-danismanligi': {
    q: 'Aidat icrası ne zaman başlatılır, süreç kaç hafta sürer?',
    a: 'İhtarnameye rağmen ödeme yapılmayan durumlarda icra takibi 5-7 iş günü içinde başlatılır. Hukuk büromuz dosyayı alırken tüm belgeleri hazır tutar; çoğu dava 4-8 hafta içinde sonuçlanır.',
  },
};

/** Hizmet×ilçe özel SSS — Q3 her hizmet için benzersiz. */
function serviceDistrictFaqs(serviceName: string, districtName: string, benefit: string, serviceSlug: string) {
  const q3 = SERVICE_SPECIFIC_Q3[serviceSlug] ?? {
    q: `${districtName}'de sözleşme süreci nasıl işliyor?`,
    a: `${districtName}'de ücretsiz keşif randevusu alırsınız; uzman ekibimiz sitenizi yerinde inceleyerek 48 saat içinde şeffaf ve kalem kalem hazırlanmış bir teklif sunar. Teklif onayı sonrası hemen süreci başlatırız.`,
  };
  return [
    {
      question: `${districtName}'de ${serviceName.toLowerCase()} ne kadar tutar?`,
      answer: `${districtName}'de ${serviceName.toLowerCase()} maliyeti; sitenizin büyüklüğü, ihtiyaç kapsamı ve hizmet sıklığına göre belirlenir. Ücretsiz keşif sonrası kalem kalem, gizli gider içermeyen net bir teklif sunarız.`,
    },
    {
      question: `${districtName}'de ${serviceName.toLowerCase()} hizmetiniz neleri kapsıyor?`,
      answer: `${districtName} genelinde sunduğumuz ${serviceName.toLowerCase()} hizmeti; ${benefit.toLowerCase()} başta olmak üzere sitenizin tüm ihtiyaçlarını profesyonel ekip ve düzenli raporlamayla karşılar.`,
    },
    { question: q3.q, answer: q3.a },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; hizmet: string }>;
}): Promise<Metadata> {
  const { lang, ilce, hizmet } = await params;
  const district = getDistrict(ilce);
  const service = getService(hizmet);
  if (!district || !service) {
    return buildMetadata({
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız sayfa bulunamadı.',
      path: `/bolgeler/${ilce}/${hizmet}`,
      lang,
      noindex: true,
    });
  }
  const neighborhoods = district.neighborhoods.slice(0, 2).join(', ');

  const isSecurity = service.slug === 'guvenlik-yonetimi';
  const isTechnical = service.slug === 'teknik-bakim';
  const isCleaning = service.slug === 'temizlik-ve-hijyen';

  let metaTitle = `${service.name} ${district.name} — Profesyonel Tesis Yönetimi`;
  let metaDesc = `${district.name}'de ${service.name.toLowerCase()}: ${service.summary} ${neighborhoods} başta olmak üzere tüm mahallelerde ücretsiz keşif, 48 saat içinde şeffaf teklif.`;
  let serviceKeywords: string[] = [];

  if (isSecurity) {
    metaTitle = `${district.name} Özel Güvenlik Şirketi & Site Güvenliği — Alo Yönetim`;
    metaDesc = `${district.name}'de 5188 sayılı kanun kapsamında Valilik izinli özel güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri. ${neighborhoods} mahallelerinde ücretsiz keşif.`;
    serviceKeywords = [
      `${district.name} özel güvenlik şirketi`,
      `${district.name} site güvenliği`,
      `${district.name} güvenlik firmaları`,
      `${district.name} apartman güvenliği`,
      `${district.name} 5188 özel güvenlik`,
      `${district.name} güvenlik personeli`,
      `${district.name} site güvenlik şirketleri`,
      `${district.name} kameralı güvenlik`,
    ];
  } else if (isTechnical) {
    metaTitle = `${district.name} Bina & Site Teknik Bakım, Asansör & Jeneratör — Alo Yönetim`;
    metaDesc = `${district.name}'de asansör yeşil etiket muayenesi, jeneratör ATS yük testleri ve kompanzasyon panosu reaktif ceza önleme çözümleri. ${neighborhoods} mahallelerinde ücretsiz keşif.`;
    serviceKeywords = [
      `${district.name} site teknik bakım`,
      `${district.name} asansör bakım firmaları`,
      `${district.name} jeneratör periyodik bakım`,
      `${district.name} kompanzasyon takibi`,
      `${district.name} bina teknik servisi`,
      `${district.name} hidrofor arıza servisi`,
    ];
  } else if (isCleaning) {
    metaTitle = `${district.name} Site & Apartman Temizliği, Dış Cephe Cam Silimi — Alo Yönetim`;
    metaDesc = `${district.name}'de TSE HYB standartlarında ortak alan temizliği, dağcı iple erişim dış cephe cam silimi ve Sağlık Bakanlığı onaylı biyosidal ilaçlama. Ücretsiz keşif.`;
    serviceKeywords = [
      `${district.name} site temizlik şirketi`,
      `${district.name} apartman temizliği`,
      `${district.name} dış cephe cam silimi`,
      `${district.name} dağcı cam temizliği`,
      `${district.name} site böcek ilaçlama`,
      `${district.name} otopark zemin yıkama`,
    ];
  }

  return buildMetadata({
    title: metaTitle,
    description: metaDesc,
    path: `/bolgeler/${ilce}/${hizmet}`,
    lang,
    ogImageType: 'local',
    keywords: [
      ...serviceKeywords,
      ...service.keywords.map((k) => `${k} ${district.name}`),
      `${district.name} ${service.name.toLowerCase()}`,
      `${district.name} tesis yönetimi`,
    ],
  });
}

export default async function ServiceDistrictPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; hizmet: string }>;
}) {
  const { ilce, hizmet } = await params;
  const district = getDistrict(ilce);
  const service = getService(hizmet);
  if (!district || !service) notFound();

  const path = `/bolgeler/${district.slug}/${service.slug}`;
  const faqs = serviceDistrictFaqs(service.name, district.name, service.benefits[0], service.slug);
  const isSecurity = service.slug === 'guvenlik-yonetimi';
  const isTechnical = service.slug === 'teknik-bakim';
  const isCleaning = service.slug === 'temizlik-ve-hijyen';

  let pageHeaderTitle = `${service.name} — ${district.name}`;
  let pageHeaderDesc = `${district.name} ve mahallelerinde profesyonel ${service.name.toLowerCase()} hizmeti.`;

  if (isSecurity) {
    pageHeaderTitle = `${district.name} Özel Güvenlik Şirketi & Site Güvenliği`;
    pageHeaderDesc = `${district.name} ve tüm mahallelerinde 5188 sayılı kanun standartlarında lisanslı özel güvenlik personeli ve 7/24 kamera izleme hizmeti.`;
  } else if (isTechnical) {
    pageHeaderTitle = `${district.name} Bina & Site Teknik Bakım Onarım`;
    pageHeaderDesc = `${district.name} genelinde asansör, jeneratör, kompanzasyon ve yangın tesisatı periyodik bakım ve mühendislik hizmeti.`;
  } else if (isCleaning) {
    pageHeaderTitle = `${district.name} Site & Apartman Temizlik Hizmetleri`;
    pageHeaderDesc = `${district.name} siteleri için TSE HYB standartlarında blok kat temizliği, dağcı cam silimi ve biyosidal ilaçlama.`;
  }

  const breadcrumbName = isSecurity
    ? `${district.name} Özel Güvenlik`
    : isTechnical
    ? `${district.name} Teknik Bakım`
    : isCleaning
    ? `${district.name} Site Temizliği`
    : service.shortName;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
    { name: district.name, url: `/bolgeler/${district.slug}` },
    { name: breadcrumbName, url: path },
  ]);

  const serviceLd = localServiceSchema({
    serviceType: isSecurity
      ? 'Özel Güvenlik ve Site Emniyeti'
      : isTechnical
      ? 'Teknik Bakım ve Mühendislik'
      : isCleaning
      ? 'Site ve Endüstriyel Temizlik'
      : service.name,
    areaName: district.name,
    path,
    description: service.summary,
  });
  const businessLd = localBusinessAreaSchema({
    areaName: district.name,
    geo: district.geo,
    url: path,
  });
  const faqLd = faqPageSchema(faqs);
  const pageLd = webPageSchema({
    name: pageHeaderTitle,
    description: service.summary,
    path,
    speakableSelectors: ['h1', '.tldr'],
  });

  const securityServiceLd = isSecurity
    ? districtSecurityServiceSchema({
        districtName: district.name,
        path,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
      })
    : null;

  const technicalServiceLd = isTechnical
    ? districtTechnicalServiceSchema({
        districtName: district.name,
        path,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
      })
    : null;

  const cleaningServiceLd = isCleaning
    ? districtCleaningServiceSchema({
        districtName: district.name,
        path,
        geo: district.geo,
        neighborhoods: district.neighborhoods,
      })
    : null;

  const jsonLdData = [
    pageLd,
    breadcrumbLd,
    serviceLd,
    businessLd,
    faqLd,
    ...(securityServiceLd ? [securityServiceLd] : []),
    ...(technicalServiceLd ? [technicalServiceLd] : []),
    ...(cleaningServiceLd ? [cleaningServiceLd] : []),
  ];

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={jsonLdData} />
      <PageHeader
        title={pageHeaderTitle}
        description={pageHeaderDesc}
      />

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-14">
        {/* TL;DR (AI/snippet için) */}
        <TldrBlock>
          {isSecurity ? (
            `${district.name}'de 5188 sayılı Kanun kapsamında site ve tesis güvenliği için Alo Yönetim; Valilik izinli lisanslı güvenlik personeli, PTS plaka tanıma, 4K gece görüşlü CCTV ve 7/24 devriye masası ile hizmet verir. ${district.name}'de ${district.managedProjects}+ projede 0 güvenlik açığı sağlanmıştır. 48 saat içinde ücretsiz güvenlik keşif raporu için: 0216 550 48 48.`
          ) : isTechnical ? (
            `${district.name}'de bina ve site teknik işletmesi için Alo Yönetim; Sanayi Bakanlığı yetkili asansör bakımı, jeneratör yük testleri, reaktif ceza önleyici kompanzasyon takibi ve hidrofor kontrolü sunar. Sıfır arıza, yüzde 100 yasal muayene garantisi: 0216 550 48 48.`
          ) : isCleaning ? (
            `${district.name}'de profesyonel site ve bina temizliği için Alo Yönetim; TSE HYB 12849 belgeli kat koridoru paspaslama, asansör dezenfeksiyonu, IRATA sertifikalı dağcı cam silimi ve Sağlık Bakanlığı onaylı biyosidal ilaçlama uygular: 0216 550 48 48.`
          ) : (
            `${district.name}'de ${service.name.toLowerCase()} için Alo Yönetim; ${service.benefits[0].toLowerCase()} başta olmak üzere profesyonel ekiple hizmet verir. Ücretsiz keşif sonrası 48 saat içinde şeffaf, gizli gider içermeyen teklif sunulur. İletişim: 0216 550 48 48.`
          )}
        </TldrBlock>

        {/* Giriş — hizmet + ilçe bağlamı (özgün) */}
        <div className="flex flex-col gap-5 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            {district.name}&apos;de {isSecurity ? '5188 Sayılı Kanun Kapsamında Özel Güvenlik' : isTechnical ? 'TMMOB Uyumlu Profesyonel Teknik Bakım' : isCleaning ? 'TSE HYB Onaylı Site Temizliği' : service.name}
          </h2>
          <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
            {isSecurity
              ? `${district.name} genelindeki sitelerde, rezidanslarda ve iş merkezlerinde 5188 sayılı Kanun şartlarına tam uyumlu, T.C. İçişleri Bakanlığı ve İstanbul Valiliği lisanslı özel güvenlik operasyonları yürütüyoruz.`
              : isTechnical
              ? `${district.name} sitelerinin kritik mekanik ve elektrik altyapısını; asansör aylık periyodik bakımı, jeneratör ATS kontrolleri ve kompanzasyon cezası engelleme protokolleriyle güvenceye alıyoruz.`
              : isCleaning
              ? `${district.name} apartman ve sitelerinde günlük kat koridoru hijyeninden, endüstriyel dağcı cam silimine ve Sağlık Bakanlığı onaylı biyosidal haşere ilaçlamasına kadar uçtan uca hijyen sağlıyoruz.`
              : service.summary}
          </p>
          <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
            {district.intro} Bu nedenle {district.name}&apos;de {service.name.toLowerCase()} hizmetimizi,
            özellikle <strong>{district.localNeeds[0].toLowerCase()}</strong> ihtiyacını gözeterek
            planlıyoruz. {district.neighborhoods.slice(0, 3).join(', ')} başta olmak üzere ilçenin
            tüm mahallelerinde yerinde hizmet veriyoruz.
          </p>
        </div>

        {/* Güvenlik Hizmeti için Özel Rozetler & Denetim Matrisi */}
        {isSecurity && (
          <div className="flex flex-col gap-12">
            <SecurityTrustBadgeGridSeo />
            <DistrictSecurityAuditTableSeo
              districtName={district.name}
              districtSlug={district.slug}
              population={district.population}
              neighborhoods={district.neighborhoods}
              localNeeds={district.localNeeds}
            />
            <InteractiveSecurityRiskRadarSeo />
            <SecurityLegalTemplateGeneratorSeo />
          </div>
        )}

        {/* Teknik Bakım Hizmeti için Özel Denetim Matrisi & Radar */}
        {isTechnical && (
          <div className="flex flex-col gap-12">
            <DistrictTechnicalAuditTableSeo
              districtName={district.name}
              districtSlug={district.slug}
              population={district.population}
              neighborhoods={district.neighborhoods}
              localNeeds={district.localNeeds}
            />
            <InteractiveTechnicalAuditRadarSeo districtName={district.name} />
          </div>
        )}

        {/* Temizlik ve Hijyen Hizmeti için Çizelge Oluşturucu & Denetim Matrisi */}
        {isCleaning && (
          <div className="flex flex-col gap-12">
            <DistrictCleaningAuditTableSeo
              districtName={district.name}
              districtSlug={district.slug}
              population={district.population}
              neighborhoods={district.neighborhoods}
              localNeeds={district.localNeeds}
            />
            <CleaningScheduleGeneratorSeo districtName={district.name} />
          </div>
        )}

        {/* Faydalar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {service.benefits.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-5"
            >
              <span className="material-symbols-outlined text-slate-600 shrink-0">check_circle</span>
              <span className="text-sm text-[var(--color-secondary)] font-medium">{b}</span>
            </div>
          ))}
        </div>

        {/* Yerel SSS */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
            {district.name} {service.shortName} — Sıkça Sorulan Sorular
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <div
                key={f.question}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6"
              >

                <h3 className="font-bold text-[var(--color-primary)] mb-2">{f.question}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[3rem] p-10 md:p-14 flex flex-col items-center text-center gap-6 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            {district.name}&apos;de {service.shortName.toLowerCase()} için teklif alın
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <QuoteCtaButton className="bg-white text-slate-950 font-bold py-3.5 px-8 rounded-xl hover:bg-slate-100 transition-colors shadow-lg">
              Ücretsiz Teklif Al
            </QuoteCtaButton>
            <a
              href={`tel:${ORG_PHONE}`}
              className="border border-white/30 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors"
            >
              Hemen Ara: 0216 550 48 48
            </a>
          </div>
        </div>

        {/* İç linkler: pillar + diğer hizmetler + ilçe */}
        <div className="flex flex-col gap-5">
          <p className="text-sm text-[var(--color-secondary)]">
            Ayrıntılı bilgi:{' '}
            <Link href={service.pillar} className="text-slate-900 dark:text-white font-semibold hover:underline">
              {service.name} hizmetimiz
            </Link>{' '}
            ·{' '}
            <Link href={`/bolgeler/${district.slug}`} className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} tüm hizmetler
            </Link>
          </p>
          <div className="flex flex-wrap gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/bolgeler/${district.slug}/${s.slug}`}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-primary)] hover:border-slate-900 dark:hover:border-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                {s.shortName} — {district.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
