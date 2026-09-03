import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { QuoteCtaButton, TldrBlock, DynamicFAQ } from '@/components';
import {
  DistrictLocalHighlightsSeo,
  EmergencyServiceBadgeSeo,
  NeighborhoodDirectorySeo,
  SocialProofTickerSeo,
  DistrictNeighborhoodDuesTableSeo,
  DistrictSecuritySpotlightSeo,
  ServiceAuthorityHubSeo,
} from '@/components/seo';

import { buildMetadata, LOCALES } from '@/lib/seo';
import {
  generateBreadcrumbs,
  webPageSchema,
  localBusinessAreaSchema,
  faqPageSchema,
  ORG_PHONE,
} from '@/lib/schemas';
import { DISTRICTS, getDistrict, type NeighborhoodInfo } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { getNeighborDistrictLinks, getCrossSideDistrictLinks } from '@/lib/seo/districtCrossLinker';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';

// ISR: yüzlerce yerel sayfa için günlük yeniden doğrulama (Faz 120/126).
export const revalidate = 86400;
export const dynamicParams = true;

// Tüm ilçeleri her locale için ön-üret (Faz 104).
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    DISTRICTS.map((d) => ({ lang, ilce: d.slug })),
  );
}

/** İlçeye özel SSS üretir (Faz 115 — schema-content uyumlu). */
function districtFaqs(name: string, needs: string[]) {
  return [
    {
      question: `${name}'de site yönetimi ücretleri nasıl belirlenir?`,
      answer: `${name}'de yönetim ücreti; daire sayısı, sunulan hizmetler (güvenlik, temizlik, teknik bakım) ve ortak alan büyüklüğüne göre belirlenir. Şeffaf işletme projesi ile her kalem net olarak paylaşılır ve gizli gider bulunmaz.`,
    },
    {
      question: `${name}'de hangi tesis yönetimi hizmetlerini sunuyorsunuz?`,
      answer: `${name} genelinde güvenlik yönetimi, profesyonel temizlik, teknik bakım, peyzaj, havuz bakımı, haşere kontrolü ve hukuk & icra danışmanlığı dahil tüm tesis yönetimi hizmetlerini tek çatı altında sunuyoruz.`,
    },
    {
      question: `${name}'de yönetim değişikliği süreci nasıl işler?`,
      answer: `Öncelikle ${name}'deki sitenizde ücretsiz keşif yaparız; ardından mevcut yönetim planı ve demirbaş devrini tutanakla alır, 48 saat içinde şeffaf teklifimizi sunarız. En yoğun ihtiyacınız ${needs[0]?.toLowerCase() || 'güvenlik ve aidat yönetimi'} ise sürecin merkezine bunu koyarız.`,
    },
    {
      question: `${name}'de sitelerde ve toplu konutlarda karşılaşılan en kritik operasyonel zorluklar nelerdir?`,
      answer: `${name} bölgesindeki toplu yapılarda en sık karşılaşılan dinamikler: ${needs.slice(0, 3).join(', ')}. Alo Yönetim, ${name}'deki yerel saha ekipleri ve 7/24 acil mobil müdahale filosuyla bu yerel dinamiklere özel operasyon planları uygulamaktadır.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ilce: string }>;
}): Promise<Metadata> {
  const { lang, ilce } = await params;
  const district = getDistrict(ilce);
  if (!district) {
    return buildMetadata({
      title: 'Bölge Bulunamadı',
      description: 'Aradığınız bölge bulunamadı.',
      path: `/bolgeler/${ilce}`,
      lang,
      noindex: true,
    });
  }

  const serpMeta = getFacilitySerpMeta(lang, district.slug);

  return buildMetadata({
    title: serpMeta.title,
    description: serpMeta.description,
    path: `/bolgeler/${ilce}`,
    lang,
    targetKeyword: serpMeta.targetKeyword,
    ogImageType: 'local',
    keywords: serpMeta.keywords,
  });
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string }>;
}) {
  const { lang, ilce } = await params;
  const district = getDistrict(ilce);
  if (!district) notFound();

  const path = `/bolgeler/${district.slug}`;
  const faqs = districtFaqs(district.name, district.localNeeds);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
    { name: district.name, url: path },
  ]);

  const businessLd = localBusinessAreaSchema({
    areaName: district.name,
    geo: district.geo,
    description: district.intro,
    url: path,
  });

  const faqLd = faqPageSchema(faqs);
  const pageLd = webPageSchema({
    name: `${district.name} Tesis ve Site Yönetimi`,
    description: district.intro,
    path,
    speakableSelectors: ['h1', '.tldr'],
  });

  const neighborLinks = getNeighborDistrictLinks(district.slug, lang);
  const crossSideLinks = getCrossSideDistrictLinks(district.slug, lang);

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${district.geo.lng - 0.03}%2C${district.geo.lat - 0.02}%2C${district.geo.lng + 0.03}%2C${district.geo.lat + 0.02}&marker=${district.geo.lat}%2C${district.geo.lng}`;

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, businessLd, faqLd]} />
      <PageHeader
        title={`${district.name} Site ve Tesis Yönetimi`}
        description={`${district.name} genelinde site, apartman ve rezidanslar için %30 aidat tasarruflu, 5188 lisanslı profesyonel yönetim hizmetleri.`}
      />

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-12">
        {/* TL;DR (AI/snippet için) */}
        <TldrBlock>
          {district.name}&apos;de site, apartman ve tesis yönetimi için Alo Yönetim; güvenlik, temizlik, teknik bakım, peyzaj ve aidat yönetimi dahil tüm hizmetleri tek çatı altında sunar. {district.name}&apos;de {district.managedProjects}+ proje yönetilmektedir. Ücretsiz keşif ve teklif için: 0216 550 48 48.
        </TldrBlock>

        {/* Canlı 7/24 Acil Müdahale Rozeti & Canlı Aktivite Şeridi */}
        <div className="flex flex-col gap-4">
          <EmergencyServiceBadgeSeo serviceTitle={`${district.name} 7/24 Acil Müdahale ve Operasyon Merkezi`} />
          <SocialProofTickerSeo />
        </div>

        {/* Giriş + yerel kanıt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 flex flex-col gap-5">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
              {district.name}&apos;de Profesyonel Site ve Tesis Yönetimi
            </h2>
            <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
              {district.intro}
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {district.localNeeds.map((need) => (
                <li key={need} className="flex items-start gap-3 text-sm text-[var(--color-secondary)]">
                  <span className="material-symbols-outlined text-slate-600 text-lg shrink-0" aria-hidden="true">check_circle</span>
                  {need}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[2.5rem] p-8 flex flex-col gap-4 shadow-xl">
            <div className="text-4xl font-black text-slate-400">{district.managedProjects}+</div>
            <div className="font-semibold">{district.name}&apos;de yönetilen proje</div>
            <p className="text-xs text-gray-300 font-light border-t border-white/10 pt-4">
              {district.side} Yakası · ~{Math.round(district.population / 1000)} bin nüfus ·{' '}
              {district.neighborhoods.length} öne çıkan mahalle
            </p>
            <QuoteCtaButton className="mt-2 bg-white text-slate-950 font-bold py-3 px-5 rounded-xl text-center hover:bg-slate-100 transition-colors shadow text-sm">
              {district.name} İçin Teklif Al
            </QuoteCtaButton>
          </div>
        </div>

        {/* İlçe Yerel Otorite Kartı */}
        <DistrictLocalHighlightsSeo
          districtName={district.name}
          side={district.side as 'Anadolu' | 'Avrupa'}
          population={district.population}
          managedProjects={district.managedProjects}
          neighborhoods={district.neighborhoods}
          localNeeds={district.localNeeds}
        />

        {/* 5188 Özel Güvenlik Masası Vitrini */}
        <DistrictSecuritySpotlightSeo
          districtName={district.name}
          districtSlug={district.slug}
          managedProjects={district.managedProjects}
        />

        {/* Hizmetler → hizmet×ilçe sayfaları */}

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
            {district.name}&apos;de Sunduğumuz Hizmetler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/bolgeler/${district.slug}/${s.slug}`}
                className="group bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-7 flex flex-col gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <span className="material-symbols-outlined text-3xl text-slate-900 dark:text-white" aria-hidden="true">{s.icon}</span>
                <h3 className="text-lg font-bold text-[var(--color-primary)]">
                  {s.shortName} — {district.name}
                </h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed line-clamp-2">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Mahalle Bazlı Aidat & Tesis Yönetimi Tablosu */}
        <DistrictNeighborhoodDuesTableSeo
          districtName={district.name}
          districtSlug={district.slug}
          neighborhoods={district.neighborhoods}
        />

        {/* Hiper-Yerel Mahalleler SILO Bağlantı Motoru */}
        <NeighborhoodDirectorySeo
          districtName={district.name}
          districtSlug={district.slug}
          neighborhoods={district.neighborhoods}
        />

        {/* Mahalle Detay Sayfaları (Faz 8C — neighborhoodData varsa) */}
        {district.neighborhoodData && district.neighborhoodData.length > 0 && (
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--color-primary)]">
                {district.name} Mahallelerinde Tesis Yönetimi
              </h2>
              <Link
                href={`/bolgeler/${district.slug}/mahalleler`}
                className="text-sm text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
              >
                Tümünü gör <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {district.neighborhoodData.map((n: NeighborhoodInfo) => (
                <Link
                  key={n.slug}
                  href={`/bolgeler/${district.slug}/mahalleler/${n.slug}`}
                  className="group flex flex-col gap-1.5 p-4 border border-[var(--color-outline)]/40 rounded-xl hover:border-brand-500/50 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-base" aria-hidden="true">location_on</span>
                    <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {n.name}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-secondary)] line-clamp-2 pl-6">{n.characteristics.join(' · ')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Harita (lazy) */}
        <div className="rounded-[2.5rem] overflow-hidden border border-[var(--color-outline)]/60">
          <iframe
            title={`${district.name} konum haritası`}
            src={mapSrc}
            loading="lazy"
            className="w-full h-80 border-0"
          />
        </div>

        {/* Yerel SSS */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-12">
          <DynamicFAQ faqs={faqs} title={`${district.name} — Sıkça Sorulan Sorular`} />
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
        <ServiceAuthorityHubSeo
          serviceName={`${district.name} Tesis ve Site Yönetimi`}
          serviceCategory="Yerel Tesis Yönetimi"
          lawReferences={[
            {
              title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK)",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
              badge: "KMK 634",
              description: `${district.name} genelindeki konut siteleri, rezidanslar ve apartmanlarda ortak alan yönetimi, işletme projeleri ve genel kurul hukuku.`
            },
            {
              title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun",
              sourceName: "T.C. İçişleri Bakanlığı & EGM",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
              badge: "5188 Sayılı Kanun",
              description: `${district.name} İlçe Emniyet Müdürlüğü ve İstanbul Valiliği koordinasyonunda 7/24 lisanslı fiziki güvenlik ve PTS denetimleri.`
            },
            {
              title: "ISO 41001:2018 Tesis Yönetim Sistemi Standartları",
              sourceName: "Türk Standardları Enstitüsü (TSE)",
              url: "https://www.tse.org.tr",
              badge: "ISO 41001",
              description: `${district.name} bölgesindeki sitelerin operasyonel gider optimizasyonu, enerji verimliliği ve periyodik teknik bakım kalitesi.`
            }
          ]}
          glossaryTerms={[
            {
              slug: "toplu-yapi-yonetimi",
              term: `${district.name} Toplu Yapı Yönetimi`,
              summary: `${district.name} ilçesindeki çok bloklu ve parselli karma konut projelerinde ortak alanların profesyonel yönetimidir.`
            },
            {
              slug: "aidat",
              term: "Aidat Borcu ve Tahsilat Düzeni",
              summary: `${district.name} sitelerinde aidatların KMK m.20 arsa payı esasına göre paylaştırılması ve dijital tahsilatıdır.`
            },
            {
              slug: "5188-sayili-kanun",
              term: "5188 Sayılı Özel Güvenlik Mevzuatı",
              summary: "Nizamiye kontrolü, devriye ve plaka tanıma sistemlerinin valilik izinleri ve yetki çerçevesidir."
            },
            {
              slug: "isletme-projesi",
              term: "Yıllık Site İşletme Projesi",
              summary: "Sitenin 1 yıllık tahmini gider bütçesi ve her bağımsız bölümün aylık ödeme planını içeren belgedir."
            }
          ]}
        />

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[3rem] p-10 md:p-14 flex flex-col items-center text-center gap-6 shadow-2xl">
          <h2 className="text-3xl font-extrabold">{district.name} için ücretsiz teklif alın</h2>
          <p className="text-gray-300 font-light max-w-xl">
            {district.name}&apos;deki sitenizde ücretsiz keşif yapalım, 48 saat içinde şeffaf teklifinizi
            sunalım.
          </p>
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

        {/* Faz 145: Çapraz Anlamsal Komşu İlçe Bağlantı Ağı */}
        {neighborLinks.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 text-center sm:text-left">
              {district.name} Çevresinde Hizmet Verdiğimiz Komşu İlçeler
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {neighborLinks.map((neighbor) => (
                <Link
                  key={neighbor.slug}
                  href={neighbor.href}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all shadow-xs"
                >
                  <span>{neighbor.name}</span>
                  <span className="material-symbols-outlined text-[14px] text-blue-500" aria-hidden="true">arrow_forward</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Faz 115: Anadolu ve Avrupa Yakası Çapraz PageRank Dengeleyici Ağ */}
        {crossSideLinks.length > 0 && (
          <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-slate-900/30 border border-blue-200/50 dark:border-blue-500/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 text-center sm:text-left">
              İstanbul Genelinde Hizmet Ağımız ({district.side === 'Anadolu' ? 'Avrupa' : 'Anadolu'} Yakası Merkezleri)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {crossSideLinks.map((cross) => (
                <Link
                  key={cross.slug}
                  href={cross.href}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-blue-200/40 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all shadow-xs"
                >
                  <span>{cross.name}</span>
                  <span className="material-symbols-outlined text-[14px] text-blue-500" aria-hidden="true">explore</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog & pillar iç linkler */}
        <div className="text-center flex flex-col gap-4 border-t border-[var(--color-outline)]/40 pt-8">
          <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
            {district.name} Hizmet Çözümleri & Mevzuat:{' '}
            <Link href="/hizmetler/tesis-yonetimi" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} Tesis Yönetimi
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/guvenlik-yonetimi" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} 5188 Güvenlik Hizmetleri
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/temizlik-ve-hijyen" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} Temizlik & Hijyen
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/teknik-bakim" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} Teknik Bakım & Onarım
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/tesis-yonetimi/plaza-yonetimi" className="text-slate-900 dark:text-white font-semibold hover:underline">
              Plaza & İş Merkezi Yönetimi
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" className="text-slate-900 dark:text-white font-semibold hover:underline">
              Rezidans & Site Yönetimi
            </Link>{' '}
            ·{' '}
            <Link href="/hesaplayici" className="text-slate-900 dark:text-white font-semibold hover:underline">
              Aidat ve Bütçe Hesaplayıcı
            </Link>{' '}
            ·{' '}
            <Link href="/sozluk" className="text-slate-900 dark:text-white font-semibold hover:underline">
              KMK 634 Terimler Sözlüğü
            </Link>{' '}
            ·{' '}
            <Link href="/bolgeler" className="text-slate-900 dark:text-white font-semibold hover:underline">
              İstanbul 39 İlçe Tesis Yönetimi
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
