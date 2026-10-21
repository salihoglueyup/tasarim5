import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { resolveLegacyDistrictSlug, resolveLegacyTermSlug, RETIRED_TERM_REDIRECTS } from '@/lib/legacySlugs';
import { localePath } from '@/lib/i18n/localePath';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/schema/JsonLd';
import PageHeader from '@/components/layout/page/PageHeader';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import TermAiOverviewCard from '@/components/seo/ai-overviews/TermAiOverviewCard';
import { TERMS, termToSlug, slugToTerm, TERM_SLUG_ALIASES } from '@/data/dictionary';
import { TERM_DETAILS } from '@/data/dictionaryDetails';
import { ENGLISH_TERMS } from '@/data/dictionaryEn';
import { getDictionary } from '@/lib/i18n';
import { getTranslatedTerm, TRANSLATED_TERM_SLUGS } from '@/data/dictionaryTranslated';
import TranslatedTermView from './TranslatedTermView';
import { getCanonicalTermSlug, isNonCanonicalTermSlug } from '@/lib/seo/glossaryCanonical';
import { getKmkStatuteForTerm, extractKmkArticleNo } from '@/lib/seo/kmkStatuteForTerm';
import { KMK_LEGISLATION_ARTICLES } from '@/data/kmkLegislationArticlesData';
import { GLOSSARY_TEMPLATES } from '@/data/glossaryTemplates';

/** KMK madde numarası → kanonik sözlük terimi slug'ı (KMK ana sayfasındaki madde rehberi için). */
const KMK_ARTICLE_TERM_SLUGS = new Map<number, string>();
for (const t of TERMS) {
  const no = extractKmkArticleNo(t.term);
  const slug = termToSlug(t.term);
  if (no !== null && !isNonCanonicalTermSlug(slug) && !t.term.startsWith('Geçici') && !KMK_ARTICLE_TERM_SLUGS.has(no)) {
    KMK_ARTICLE_TERM_SLUGS.set(no, slug);
  }
}
// "kmk-20", "kmk-37", "kmk-45" gibi kısa adların hedefleri birincil madde sayfasıdır.
for (const no of Array.from(KMK_ARTICLE_TERM_SLUGS.keys())) {
  const aliasTarget = TERM_SLUG_ALIASES[`kmk-${no}`];
  if (aliasTarget) KMK_ARTICLE_TERM_SLUGS.set(no, aliasTarget);
}

import Icon from '@/components/ui/branding/Icon';
export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  const termSlugs = TERMS.map((t) => termToSlug(t.term));
  return [
    ...termSlugs.map((terim) => ({ lang: 'tr', terim })),
    ...(['en', 'ru', 'ar'] as const).flatMap((lang) =>
      TRANSLATED_TERM_SLUGS.map((terim) => ({ lang, terim }))
    ),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; terim: string }>;
}): Promise<Metadata> {
  const { lang, terim } = await params;
  const resolvedTerim = RETIRED_TERM_REDIRECTS[terim] ?? resolveLegacyTermSlug(terim) ?? terim;
  const translated = getTranslatedTerm(resolvedTerim, lang);
  if (translated) {
    const tdict = await getDictionary(lang);
    return buildMetadata({
      title: tdict.sozx_term_title.replace('{term}', translated.term),
      description: translated.definition.length > 158 ? `${translated.definition.slice(0, 155)}...` : translated.definition,
      path: `/sozluk/${resolvedTerim}`,
      lang,
      keywords: [translated.term],
    });
  }
  const term = slugToTerm(resolvedTerim);
  if (!term) {
    return buildMetadata({ title: 'Terim Bulunamadı', description: '', path: '/sozluk', lang, noindex: true });
  }
  const cleanDef = term.definition.replace(/\s+/g, ' ').trim();
  
  // Wave 56 & Faz 223: Yüksek CTR (Poz 5-12 Tıklama Maksimizasyonu) Şablonları
  let title = `${term.term} Ne Demek? Nedir — Kısa Açıklama | Alo Yönetim`;
  let description = `${term.term} ne demek ve ne anlama gelir? ${cleanDef.slice(0, 110)}... Kat mülkiyeti ve profesyonel site yönetimi rehberi.`;

  const termLower = term.term.toLowerCase();
  // Faz 23: GSC'de 2-5. sırada olup tıklanmayan sorgular için doğrudan cevap veren başlıklar.
  if (term.term === 'İşletme Projesi') {
    title = 'İşletme Projesi Nedir? Site İşletme Projesi Örneği ve Aidat Hesabı | Alo Yönetim';
    description = 'İşletme projesi nedir, nasıl hazırlanır? Kopyalanabilir site işletme projesi örneği, KMK m.20 eşit/arsa payı gider ayrımı, aylık aidat formülü ve 7579 sayılı Kanun kurul onayı.';
  } else if (termLower.includes('vektör') || termLower.includes('biyosidal')) {
    title = 'Vektör İlaçlama Nedir? Biyosidal İlaçlama Ne Demek, Nasıl Yapılır? | Alo Yönetim';
    description = 'Vektör ilaçlama nedir? Sivrisinek, hamamböceği ve kemirgen gibi hastalık taşıyıcılara karşı Sağlık Bakanlığı ruhsatlı biyosidal ürünlerle yapılan uygulama; tarım ilacından farkı ve bekleme süreleri.';
  } else if (termLower.includes('nizamiye')) {
    title = 'Nizamiye Takip Sistemi Nedir? Site Giriş-Çıkış ve Ziyaretçi Kaydı | Alo Yönetim';
    description = 'Nizamiye takip sistemi nedir? Sitelerde ziyaretçi, kurye ve araç giriş-çıkışlarının kaydı, sakin onayı, plaka tanıma ve KVKK uyumlu kayıt saklama kuralları.';
  } else if (termLower.includes('etiket')) {
    title = 'Asansör Yeşil Etiket Nedir? Mavi, Sarı ve Kırmızı Etiket Anlamları | Alo Yönetim';
    description = 'Asansör yeşil etiket nedir? Yıllık periyodik kontrolde verilen yeşil, mavi, sarı ve kırmızı etiketlerin anlamı, kusur giderme süreci, maliyeti etkileyen unsurlar ve yönetimin sorumluluğu.';
  } else if (termLower.includes('(sla)') || termLower.includes('hizmet seviyesi')) {
    title = 'SLA Nedir, SLA Süresi Ne Demek? Hizmet Seviyesi Taahhüdü | Alo Yönetim';
    description = 'SLA nedir? Hizmet seviyesi taahhüdünde yanıt ve çözüm süresi (SLA süresi), ölçüm yöntemi ve site/tesis yönetimi sözleşmelerinde acil arıza müdahale hedefleri.';
  } else if (termLower.includes('pay ölçer')) {
    title = 'Merkezi Pay Ölçer Ne Demek? Isı Pay Ölçer Nasıl Çalışır? | Alo Yönetim';
    description = 'Merkezi pay ölçer ne demek? Merkezi ısıtmalı binalarda radyatör ısı pay ölçerlerin çalışma mantığı ve doğalgaz faturasının daireler arasında tüketime göre paylaşımı.';
  } else if (termLower.includes('12850')) {
    // claims-guard-ignore: sözlük tanımı: standart bilgilendirmesi, belge sahipliği iddiası yok
    title = 'TS 12850 Nedir? TSE HYB 12850 Klima ve Havalandırma Servis Belgesi | Alo Yönetim';
    // claims-guard-ignore: sözlük tanımı: standart bilgilendirmesi, belge sahipliği iddiası yok
    description = 'TSE 12850 nedir? Havalandırma ve klima sistemleri yetkili servisleri için Hizmet Yeterlilik Belgesi (HYB) şartları ve sitelerde bakım firmasından neden istenmesi gerektiği.';
  } else if (termLower.includes('hazirun')) {
    title = 'Hazirun Cetveli Nedir, Nasıl Hazırlanır? Örnek Şablon | Alo Yönetim';
    description = 'Hazirun cetveli nedir, genel kurulda nasıl düzenlenir? Kopyalanabilir hazirun cetveli örneği, KMK m.29-31 katılım ve vekalet kontrolü, sayı ve arsa payı hesabı.';
  } else if (termLower.includes('ögg') || termLower.includes('ogg') || termLower.includes('özel güvenlik görevlisi') || termLower.includes('özel güvenlik kimlik')) {
    title = 'ÖGG Kartı Nedir, Nasıl Alınır? — 5188 Özel Güvenlik Kimlik Kartı Rehberi | Alo Yönetim';
    description = 'Özel kimlik kartı (ÖGG kartı) nedir, kimlere verilir? 5188 sayılı Kanun silahlı/silahsız güvenlik kimlik kartı alma şartları, geçici kimlik ve yenileme rehberi.';
  } else if (termLower.includes('özel güvenlik izni') || termLower.includes('ögi')) {
    title = 'ÖGİ Ne Demek? Özel Güvenlik İzni Nedir, Nasıl Alınır? (5188 S.K.) | Alo Yönetim';
    description = 'ÖGİ (Özel Güvenlik İzni) ne demek ve nereden alınır? 5188 sayılı Kanun kapsamında site, rezidans ve tesisler için Valilik özel güvenlik komisyonu izin rehberi.';
  } else if (termLower.includes('kmk 37') || (termLower.includes('kmk') && termLower.includes('37'))) {
    title = 'KMK 37 Nedir? İşletme Projesi ve Kurul Onayı | Alo Yönetim';
    description = '634 sayılı KMK Madde 37 işletme projesi nedir? 1 yıllık tahmini site bütçesi, kat malikleri kurulunda onay, geçici proje ve 7579 sayılı Kanun değişikliği.';
  } else if (termLower.includes('kmk 45') || (termLower.includes('kmk') && termLower.includes('45'))) {
    title = 'KMK 45 Nedir? Oybirliği Gerektiren Önemli Kararlar | Alo Yönetim';
    description = '634 sayılı KMK Madde 45 önemli işler nedir? Kat mülkiyetinde ortak yerlerin kiralanması, devri ve oybirliği şartı aranan kararlar.';
  } else if (termLower.includes('madde 20') || (termLower.includes('kmk') && termLower.includes('20'))) {
    title = 'KMK Madde 20: Kanun Metni, Aidat Paylaşımı ve %5 Gecikme Tazminatı | Alo Yönetim';
    description = 'Kat Mülkiyeti Kanunu 20. madde tam metni ve açıklaması: kapıcı/bekçi gideri eşit, diğer giderler arsa payına göre; geciken aidata aylık %5 gecikme tazminatı ve icra.';
  } else if (termLower.includes('toplu yapı') || termLower.includes('m.66')) {
    title = 'KMK 66-70 Toplu Yapı Yönetimi Nedir? Temsilciler Kurulu & 2/3 Nisap | Alo Yönetim';
    description = '634 sayılı KMK Madde 66-70 toplu yapı yönetimi nedir? Blok ve temsilciler kurulu oluşumu (m.69) ile 7579 sayılı Kanun 2/3 yönetim planı değişikliği rehberi.';
  } else if (termLower.includes('enerji kimlik') || termLower.includes('ekb')) {
    title = 'Enerji Kimlik Belgesi (EKB) Nedir? Zorunluluk ve EKB Uzmanı Rehberi | Alo Yönetim';
    description = 'Enerji Kimlik Belgesi (EKB) nedir, nasıl alınır? Binalarda enerji performans sınıfı, EKB uzmanı yetkisi ve site yönetiminde enerji verimliliği.';
  } else if (termLower.includes('kompanzasyon') || termLower.includes('reaktif')) {
    title = 'Reaktif Enerji ve Kompanzasyon Cezası Nedir? Elektrik Pano Bakımı | Alo Yönetim';
    description = 'Reaktif nedir, kompanzasyon cezası neden gelir? Site ve plazalarda reaktif güç sınırı, kompanzasyon panosu periyodik bakımı ve elektrik tasarrufu.';
  } else if (termLower.includes('kat mülkiyeti kanunu') || term.term.includes('KMK')) {
    if (termLower.includes('madde')) {
      title = `${term.term} Nedir, Ne Anlama Gelir? — KMK Açıklaması | Alo Yönetim`;
      description = `${term.term} nedir ve ne anlama gelir? ${cleanDef.slice(0, 115)}... Kat Mülkiyeti Kanunu madde rehberi.`;
    } else {
      title = `KMK Nedir, Ne Demek? 634 Sayılı Kat Mülkiyeti Kanunu (2026 Rehberi) | Alo Yönetim`;
      description = `KMK nedir, açılımı ne demek? 634 sayılı Kat Mülkiyeti Kanunu (KMK) maddeleri, 2026 (7579 S.K.) değişiklikleri, aidat paylaşımı (m.20) ve işletme projesi (m.37).`;
    }
  }

  if (lang === 'en') {
    const enTerm = ENGLISH_TERMS.find(
      (e) => e.turkishEquivalent.toLowerCase().includes(term.term.toLowerCase()) || term.term.toLowerCase().includes(e.turkishEquivalent.toLowerCase())
    );
    title = enTerm 
      ? `${enTerm.term} (What is ${term.term}?) | Alo Management Dictionary`
      : `What is ${term.term}? — Property & Facility Management Dictionary | Alo Management`;
    description = enTerm 
      ? enTerm.definition 
      : `${term.term} in Turkish Condominium Law (KMK 634): ${cleanDef.slice(0, 120)}... Explore property and facility management legal terms.`;
  } else if (lang === 'ru') {
    title = `Что такое ${term.term}? — Словарь по Управлению Недвижимостью | Alo Yonetim`;
    description = `Юридическое определение ${term.term} в законодательстве Турции (KMK 634): ${cleanDef.slice(0, 120)}... Справочник по управлению объектами.`;
  } else if (lang === 'ar') {
    title = `ما هو ${term.term}؟ — قاموس إدارة المرافق والعقارات | Alo Management`;
    description = `التعريف القانوني لمصطلح ${term.term} بموجب قانون الملكية المشتركة التركي KMK 634: ${cleanDef.slice(0, 120)}... دليل إدارة المرافق.`;
  }

  return buildMetadata({
    title,
    description,
    // Takma ad ve yinelenen terim URL'leri birincil terime kanonikleştirilir (Faz 23).
    path: `/sozluk/${getCanonicalTermSlug(termToSlug(term.term))}`,
    lang,
    targetKeyword: `${term.term.toLowerCase()} nedir`,
    keywords: [term.term, `${term.term} nedir`, `${term.term} kmk`, 'tesis yönetimi sözlük', 'kat mülkiyeti kanunu terimleri'],
  });
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ lang: string; terim: string }>;
}) {
  const { lang, terim } = await params;
  const dict = await getDictionary(lang);
  const t = (key: string) => dict[key] ?? key;
  if (getTranslatedTerm(terim, lang)) {
    return <TranslatedTermView slug={terim} lang={lang as 'en' | 'ru' | 'ar'} dict={dict as Record<string, string>} />;
  }
  const term = slugToTerm(terim);
  if (!term) {
    const fixed = RETIRED_TERM_REDIRECTS[terim] ?? resolveLegacyTermSlug(terim);
    if (fixed) permanentRedirect(localePath(`/sozluk/${fixed}`, lang));
    notFound();
  }
  // Takma ad URL'leri (ör. /sozluk/kmk-20) aynı içeriği ikinci bir adreste yayınlamasın: birincil slug'a yönlendir.
  const primarySlug = termToSlug(term.term);
  if (primarySlug !== terim) permanentRedirect(localePath(`/sozluk/${primarySlug}`, lang));
  const statute = getKmkStatuteForTerm(term.term);
  const template = GLOSSARY_TEMPLATES[primarySlug];

  const termIndex = TERMS.findIndex((t) => termToSlug(t.term) === terim);
  const prevTerm = termIndex > 0 ? TERMS[termIndex - 1] : null;
  const nextTerm = termIndex < TERMS.length - 1 ? TERMS[termIndex + 1] : null;

  const breadcrumbs = [
    { name: t('breadcrumb_home') || 'Anasayfa', url: '/' },
    { name: 'Sözlük', url: '/sozluk' },
    { name: term.term, url: `/sozluk/${terim}` },
  ];

  const termLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/sozluk/${terim}#term`,
    name: term.term,
    description: term.definition,
    url: `${BASE_URL}/sozluk/${terim}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': `${BASE_URL}/sozluk#glossary`,
      name: 'Site ve Tesis Yönetimi Sözlüğü — Alo Yönetim',
      url: `${BASE_URL}/sozluk`,
    },
    ...(term.link
      ? {
          subjectOf: {
            '@type': 'WebPage',
            name: term.link.label,
            url: `${BASE_URL}${term.link.href}`,
          },
        }
      : {}),
  };

  const pageLd = webPageSchema({
    name: `${term.term} Nedir?`,
    description: term.definition.slice(0, 200),
    path: `/sozluk/${terim}`,
    speakableSelectors: ['#term-instant-answer-text', '.term-definition', 'h1'],
  });

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);
  const detail = TERM_DETAILS[terim];
  const extraFaqs = detail?.faq?.length
    ? detail.faq.map(([question, answer]) => ({ question, answer }))
    : [];

  const relatedTerms = TERMS.filter(
    (rt) => rt.term !== term.term && (
      rt.definition.toLowerCase().includes(term.term.toLowerCase().split(' ')[0]) ||
      (term.link && rt.link?.href === term.link.href)
    )
  ).slice(0, 4);

  return (
    <>
      <JsonLd data={statute ? [termLd, pageLd, breadcrumbLd, statute.legislationLd] : [termLd, pageLd, breadcrumbLd]} />
      <PageHeader 
        title={`${term.term} Nedir?`}
        description={term.definition.slice(0, 160)}
        breadcrumbs={breadcrumbs}
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-4xl mx-auto flex flex-col gap-12">
        {/* Definition Card */}
        <div className="term-definition bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="menu_book" className="text-slate-500 text-2xl" />
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-tertiary)]">Resmi Tanım</span>
          </div>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] leading-relaxed">
            {term.definition}
          </p>
          {term.link && (
            <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/40">
              <Link
                href={term.link.href}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:opacity-95 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-md"
              >
                <Icon name="arrow_forward" className="text-base" />
                {term.link.label}
              </Link>
            </div>
          )}
        </div>

        {/* KMK madde metni + sade anlatım (Faz 23: "KMK 37 formatı" — kanun metni arayan sorgular için) */}
        {statute && (
          <section
            id="kmk-kanun-metni"
            aria-labelledby="kmk-kanun-metni-baslik"
            className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] shadow-sm flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="kmk-kanun-metni-baslik" className="text-xl font-bold text-[var(--color-primary)]">
                Kat Mülkiyeti Kanunu {statute.articleNo}. Madde (KMK m.{statute.articleNo}): {statute.title}
              </h2>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-tertiary)]">
                634 S.K. m.{statute.articleNo}
              </span>
            </div>
            {statute.statuteText && (
              <figure className="flex flex-col gap-2">
                <figcaption className="text-xs font-bold uppercase tracking-wider text-[var(--color-tertiary)]">Kanun metni (ilgili fıkralar)</figcaption>
                <blockquote className="border-l-4 border-slate-400 pl-4 text-base text-[var(--color-secondary)] leading-relaxed italic">
                  {statute.statuteText}
                </blockquote>
              </figure>
            )}
            <div>
              <h3 className="font-bold text-base text-[var(--color-primary)]">Sade anlatımla KMK m.{statute.articleNo} ne diyor?</h3>
              <p className="text-base text-[var(--color-secondary)] leading-relaxed mt-1">{statute.plainSummary}</p>
            </div>
            {statute.practicalNote && (
              <div>
                <h3 className="font-bold text-base text-[var(--color-primary)]">Uygulamada dikkat edilecek nokta</h3>
                <p className="text-base text-[var(--color-secondary)] leading-relaxed mt-1">{statute.practicalNote}</p>
              </div>
            )}
            <p className="text-xs text-[var(--color-tertiary)]">
              Güncel ve tam metin için resmi kaynak:{' '}
              <a href={statute.officialUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                Mevzuat Bilgi Sistemi — 634 Sayılı Kat Mülkiyeti Kanunu
              </a>
              . Bu bölüm genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.
            </p>
          </section>
        )}

        {/* Faz 23: Kopyalanabilir şablonlar ("hazirun cetveli örneği", "işletme projesi örneği") */}
        {template && (
          <section
            id="sablon"
            aria-labelledby="sablon-baslik"
            className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] shadow-sm flex flex-col gap-5"
          >
            <h2 id="sablon-baslik" className="text-xl font-bold text-[var(--color-primary)]">{template.heading}</h2>
            <p className="text-base text-[var(--color-secondary)] leading-relaxed">{template.intro}</p>
            {template.table && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <caption className="text-left text-xs font-bold uppercase tracking-wider text-[var(--color-tertiary)] mb-2">{template.table.caption}</caption>
                  <thead>
                    <tr>
                      {template.table.columns.map((c) => (
                        <th key={c} scope="col" className="text-left font-semibold text-[var(--color-primary)] border-b border-[var(--color-outline)]/60 px-3 py-2">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {template.table.sampleRows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="border-b border-[var(--color-outline)]/30 px-3 py-2 text-[var(--color-secondary)]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <figure className="flex flex-col gap-2">
              <figcaption className="text-xs font-bold uppercase tracking-wider text-[var(--color-tertiary)]">Kopyalanabilir metin şablonu</figcaption>
              <pre className="whitespace-pre-wrap text-sm bg-[var(--color-background)] border border-[var(--color-outline)]/60 rounded-2xl p-4 text-[var(--color-secondary)] font-mono">{template.textTemplate}</pre>
            </figure>
            <div>
              <h3 className="font-bold text-base text-[var(--color-primary)] mb-2">Adım adım hazırlama</h3>
              <ol className="list-decimal pl-6 flex flex-col gap-2 text-base text-[var(--color-secondary)] leading-relaxed">
                {template.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <p className="text-xs text-[var(--color-tertiary)]">
              {template.note}{' '}
              {primarySlug === 'isletme-projesi' && (
                <Link href="/hesaplayici" className="underline font-semibold">Aidat Hesaplayıcı</Link>
              )}
            </p>
          </section>
        )}

        {/* KMK ana terim sayfası: madde madde hızlı rehber ("kmk", "kmk 34", "kmk 35" gibi sorgular için) */}
        {primarySlug === 'kat-mulkiyeti-kanunu-kmk' && (
          <section aria-labelledby="kmk-maddeler-baslik" className="flex flex-col gap-4">
            <h2 id="kmk-maddeler-baslik" className="text-xl font-bold text-[var(--color-primary)]">
              KMK Maddeleri: Site ve Apartman Yönetiminde En Çok Sorulan {KMK_LEGISLATION_ARTICLES.length} Madde
            </h2>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
              KMK açılımı &quot;Kat Mülkiyeti Kanunu&quot;dur (634 sayılı Kanun). Aşağıda yönetim, aidat ve genel kurul süreçlerinde en sık başvurulan maddelerin kısa açıklamaları yer alır.
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KMK_LEGISLATION_ARTICLES.map((a) => {
                const slug = KMK_ARTICLE_TERM_SLUGS.get(a.articleNo);
                const inner = (
                  <>
                    <span className="font-bold text-sm text-[var(--color-primary)]">KMK Madde {a.articleNo}: {a.articleTitle}</span>
                    <span className="text-xs text-[var(--color-secondary)] line-clamp-3">{a.plainLanguageSummary}</span>
                  </>
                );
                return (
                  <li key={a.articleNo}>
                    {slug ? (
                      <Link href={`/sozluk/${slug}`} className="flex flex-col gap-1.5 p-4 h-full bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-slate-500/50 transition-colors">
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex flex-col gap-1.5 p-4 h-full bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {/* Ayrıntılı açıklama, dikkat edilecekler ve SSS */}
        {detail && (
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">{term.term} hakkında ayrıntılı bilgi</h2>
              <div className="flex flex-col gap-4 text-base text-[var(--color-secondary)] leading-relaxed">
                {detail.explain.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
            {detail.tips && detail.tips.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">Dikkat edilecekler</h2>
                <ul className="list-disc pl-6 flex flex-col gap-2 text-base text-[var(--color-secondary)] leading-relaxed">
                  {detail.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </section>
            )}
            {detail.faq && detail.faq.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">Sık sorulan sorular</h2>
                <div className="flex flex-col gap-4">
                  {detail.faq.map(([q, a]) => (
                    <div key={q}>
                      <h3 className="font-bold text-base text-[var(--color-primary)]">{q}</h3>
                      <p className="text-base text-[var(--color-secondary)] leading-relaxed mt-1">{a}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--color-tertiary)] mt-4">Bu bilgiler genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.</p>
              </section>
            )}
          </div>
        )}

        {/* Google AI Overviews & DefinedTerm Grounding Card */}
        <TermAiOverviewCard
          term={term.term}
          definition={term.definition}
          extraFaqs={extraFaqs}
        />

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">İlgili Terimler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTerms.map((rt) => (
                <Link
                  key={rt.term}
                  href={`/sozluk/${termToSlug(rt.term)}`}
                  className="flex flex-col gap-1.5 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-slate-500/50 transition-colors group"
                >
                  <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">{rt.term}</span>
                  <p className="text-xs text-[var(--color-secondary)] line-clamp-2">{rt.definition}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next Navigation */}
        <div className="flex gap-4 pt-4 border-t border-[var(--color-outline)]/40">
          {prevTerm ? (
            <Link
              href={`/sozluk/${termToSlug(prevTerm.term)}`}
              className="flex-1 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-slate-500/40 transition-colors flex flex-col gap-1 group"
            >
              <span className="text-xs text-[var(--color-tertiary)] flex items-center gap-1">
                <Icon name="arrow_back" className="text-sm" /> Önceki
              </span>
              <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-slate-600 line-clamp-1">{prevTerm.term}</span>
            </Link>
          ) : <div className="flex-1" />}
          {nextTerm ? (
            <Link
              href={`/sozluk/${termToSlug(nextTerm.term)}`}
              className="flex-1 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-slate-500/40 transition-colors flex flex-col items-end gap-1 group"
            >
              <span className="text-xs text-[var(--color-tertiary)] flex items-center gap-1">
                Sonraki <Icon name="arrow_forward" className="text-sm" />
              </span>
              <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-slate-600 line-clamp-1">{nextTerm.term}</span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Back to Glossary */}
        <div className="text-center">
          <Link
            href="/sozluk"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-tertiary)] hover:text-slate-600 dark:hover:text-slate-400 transition-colors font-medium"
          >
            <Icon name="menu_book" className="text-base" />
            Tüm sözlüğe dön
          </Link>
        </div>
      </div>
    </>
  );
}
