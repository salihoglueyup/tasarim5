import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, digitalDocumentSchema } from '@/lib/schemas';
import { CERTIFICATES, getCertificate } from '@/data/certificates';
import PreFooterCta from '@/components/sections/PreFooterCta';

export const revalidate = 2592000; // 30 gün

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    CERTIFICATES.map((c) => ({ lang, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const cert = getCertificate(slug);
  if (!cert) return buildMetadata({ title: 'Bulunamadı', description: '', path: '/kurumsal/sertifikalar', lang, noindex: true });

  let title = `${cert.name} (No: ${cert.certificateNumber}) — ${cert.subtitle} | Alo Yönetim`;
  let description = `${cert.description} Akreditasyon ve denetim: ${cert.issuer} (${cert.accreditation}). Belge No: ${cert.certificateNumber}.`;

  if (lang === 'en') {
    title = `${cert.name} (No: ${cert.certificateNumber}) — ${cert.subtitle} | Alo Management`;
    description = `Official corporate accreditation: ${cert.description} Audited and certified by ${cert.issuer} (${cert.accreditation}). Certificate No: ${cert.certificateNumber}.`;
  } else if (lang === 'ru') {
    title = `${cert.name} (No: ${cert.certificateNumber}) — ${cert.subtitle} | Сертификат Alo Yonetim`;
    description = `Официальная корпоративная аккредитация: ${cert.description} Аудит и сертификация: ${cert.issuer} (${cert.accreditation}). Номер сертификата: ${cert.certificateNumber}.`;
  } else if (lang === 'ar') {
    title = `${cert.name} (No: ${cert.certificateNumber}) — ${cert.subtitle} | شهادة Alo Management`;
    description = `شهادة الاعتماد المؤسسي: ${cert.description} الجهة المانحة: ${cert.issuer} (${cert.accreditation}). رقم الشهادة: ${cert.certificateNumber}.`;
  }

  return buildMetadata({
    title,
    description,
    path: `/kurumsal/sertifikalar/${cert.slug}`,
    lang,
    keywords: cert.keywords,
  });
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const cert = getCertificate(slug);
  if (!cert) notFound();

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Kalite Belgelerimiz', url: '/kurumsal/kalite-belgelerimiz' },
    { name: cert.name, url: `/kurumsal/sertifikalar/${cert.slug}` },
  ]);

  const pageLd = webPageSchema({
    name: `${cert.name} — ${cert.subtitle}`,
    description: cert.description,
    path: `/kurumsal/sertifikalar/${cert.slug}`,
    speakableSelectors: ['h1', '.cert-description'],
  });

  const docLd = digitalDocumentSchema({
    name: `${cert.name} — Sertifika No: ${cert.certificateNumber}`,
    description: `${cert.description} Belgelendiren: ${cert.issuer} (${cert.accreditation}).`,
    url: cert.pdf,
    datePublished: cert.datePublished,
    issuerName: cert.issuer,
    issuerUrl: cert.issuerUrl,
    about: cert.about,
  });

  const others = CERTIFICATES.filter((c) => c.slug !== cert.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, docLd]} />

      <PageHeader title={cert.name} description={cert.subtitle} />

      {/* ── Ana İçerik ── */}
      <section className="py-16 md:py-24 bg-slate-50/60 dark:bg-[#09090f]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">

            {/* ─────────────────────────────────────────── Ana İçerik ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-10">

              {/* Akreditasyon rozeti + başlık + açıklama */}
              <div className="flex items-start gap-5">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-xl shrink-0`}>
                  <span className="material-symbols-outlined text-white text-4xl" aria-hidden="true">{cert.icon}</span>
                </div>
                <div className="pt-1">
                  <p className={`text-xs font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${cert.color} mb-1`}>
                    {cert.accreditation}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] leading-tight">{cert.subtitle}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {cert.departments.map((dep) => (
                      <span
                        key={dep}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/70 dark:border-slate-700/60"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Uzun Açıklama */}
              <p className="cert-description text-base md:text-lg text-[var(--color-secondary)] font-light leading-relaxed">
                {cert.longDescription}
              </p>

              {/* ──────────────────────────────── Somut Faydalar ──────────────────────────────── */}
              <div>
                <h3 className="text-base font-bold text-[var(--color-primary)] mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">star</span>
                  </span>
                  Bu Sertifikanın Size Sağladığı Faydalar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cert.faydalar.map((f) => (
                    <div
                      key={f.title}
                      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 flex gap-4 shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center shrink-0 shadow`}>
                        <span className="material-symbols-outlined text-white text-xl" aria-hidden="true">{f.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--color-primary)] mb-1">{f.title}</p>
                        <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ──────────────────────────────── Resmi Belge Künyesi ──────────────────────────────── */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[var(--color-outline)]/40 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400" aria-hidden="true">verified</span>
                    <h3 className="text-base font-bold text-[var(--color-primary)]">Resmi Belge Künyesi &amp; Tescil Bilgileri</h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full">
                    AKTİF &amp; GEÇERLİ
                  </span>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Standart / Belge Adı', value: cert.name },
                    { label: 'Sertifika Numarası', value: cert.certificateNumber, mono: true },
                    { label: 'Güvenlik Mührü / Seri', value: cert.sealNumber, mono: true },
                    { label: 'Sertifika Kodu', value: cert.certificateCode, mono: true },
                    { label: 'Yayın Tarihi', value: '04 Ağustos 2026' },
                    { label: 'Geçerlilik Tarihi', value: '04 Ağustos 2027 (1 Yıl)' },
                    { label: 'Belgelendiren Kuruluş', value: cert.issuer },
                    { label: 'Akreditasyon', value: cert.accreditation },
                    { label: 'Belgelendirilen Şirket', value: cert.holderName },
                    { label: 'Kayıtlı Adres', value: cert.holderAddress },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 rounded-2xl p-4">
                      <dt className="text-[11px] font-bold text-[var(--color-tertiary)] uppercase tracking-wider mb-1">{item.label}</dt>
                      <dd className={`text-sm font-semibold text-[var(--color-primary)] ${item.mono ? 'font-mono' : ''}`}>{item.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Resmi Faaliyet Kapsamı */}
                <div className="space-y-3">
                  <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-[var(--color-primary)] uppercase tracking-wider block">
                      Resmi Belge Kapsamı — Türkçe (Scope TR):
                    </span>
                    <p className="text-[var(--color-secondary)] italic leading-relaxed">
                      &ldquo;{cert.officialScopeTr}&rdquo;
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-[var(--color-primary)] uppercase tracking-wider block">
                      Official Document Scope — English (Scope EN):
                    </span>
                    <p className="text-[var(--color-secondary)] italic leading-relaxed">
                      &ldquo;{cert.officialScopeEn}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Doğrulama Portalı */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[var(--color-secondary)]">
                    Belgenin geçerlilik durumu belgelendirme kuruluşunun resmi adresinden teyit edilebilir.
                  </div>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs hover:opacity-90 transition-opacity shadow-sm shrink-0"
                  >
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
                    <span>BELCERT Belge Doğrulama</span>
                  </a>
                </div>
              </div>

              {/* ──────────────────────────────── Yıllık Denetim Süreci ──────────────────────────────── */}
              <div>
                <h3 className="text-base font-bold text-[var(--color-primary)] mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">timeline</span>
                  </span>
                  BELCERT / ILAS Yıllık Denetim ve Yenileme Süreci
                </h3>
                <div className="relative">
                  {/* Dikey çizgi */}
                  <div className="absolute left-5 top-5 bottom-5 w-px bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-4 pl-14">
                    {cert.denetimSureci.map((step) => (
                      <div key={step.step} className="relative">
                        {/* Adım numarası */}
                        <div className={`absolute -left-14 w-10 h-10 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}>
                          {step.step}
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
                          <p className="text-sm font-bold text-[var(--color-primary)] mb-1">{step.title}</p>
                          <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────── İlgili Mevzuat ──────────────────────────────── */}
              <div>
                <h3 className="text-base font-bold text-[var(--color-primary)] mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">gavel</span>
                  </span>
                  İlgili Kanun ve Mevzuat
                </h3>
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                  {cert.mevzuat.map((m, i) => (
                    <div
                      key={m.law}
                      className={`flex gap-4 p-4 ${i < cert.mevzuat.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                    >
                      <div className={`w-2 rounded-full bg-gradient-to-b ${cert.color} shrink-0 self-stretch`} />
                      <div>
                        <p className="text-sm font-bold text-[var(--color-primary)] mb-0.5">{m.law}</p>
                        <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* İlgili sayfa linki */}
              {cert.relatedPath && (
                <Link
                  href={cert.relatedPath}
                  className={`inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r ${cert.color} text-white font-bold rounded-xl text-sm shadow hover:opacity-90 transition-opacity w-fit`}
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                  {cert.relatedLabel ?? 'İlgili hizmetimizi inceleyin'}
                </Link>
              )}
            </div>

            {/* ═══════════════════════════════════════════ SAĞ SÜTUN (STICKY) ═══════════════════════════════════════════ */}
            <div className="flex flex-col gap-4 sticky top-24">

              {/* PDF Önizleme */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md">
                <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3.5 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-slate-600 dark:text-slate-400" aria-hidden="true">picture_as_pdf</span>
                    <span className="text-xs font-semibold text-[var(--color-secondary)]">Sertifika Önizlemesi</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                    No: {cert.certificateNumber}
                  </span>
                </div>
                <iframe
                  src={`${cert.pdf}#view=FitH`}
                  className="w-full h-[480px]"
                  title={`${cert.name} sertifikası`}
                  loading="lazy"
                />
              </div>

              {/* İndir Butonu */}
              <a
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label={`${cert.name} sertifikasını PDF formatında indir`}
                className={`flex items-center justify-center gap-3 bg-gradient-to-r ${cert.color} text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:opacity-90 transition-opacity`}
              >
                <span className="material-symbols-outlined text-xl" aria-hidden="true">download</span>
                <span>Resmi Sertifikayı İndir</span>
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium ml-1">PDF · 1.8 MB</span>
              </a>

              {/* BELCERT Doğrulama */}
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[var(--color-primary)] font-semibold py-3 px-6 rounded-2xl hover:shadow-md transition-shadow text-sm"
              >
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base" aria-hidden="true">verified</span>
                BELCERT'ten Online Doğrula
              </a>

              {/* Tüm Belgeler */}
              <Link
                href="/kurumsal/kalite-belgelerimiz"
                className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-[var(--color-primary)] font-semibold py-3 px-6 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
                Tüm Kalite Belgelerimiz
              </Link>

              {/* Akreditasyon Bilgi Kutusu */}
              <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg" aria-hidden="true">security</span>
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">Akreditasyon Güvencesi</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  Bu belge <strong className="text-[var(--color-primary)]">{cert.issuer}</strong> tarafından{' '}
                  <strong className="text-[var(--color-primary)]">ILAS (International Laboratory Accreditation Service)</strong> akreditasyonu kapsamında düzenlenmiştir.
                </p>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-500 pt-1">
                  Akreditasyon Kodu: ILAS-MS-0089
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diğer Sertifikalar */}
      <section className="py-16 bg-white dark:bg-[#0a0a0f] px-[var(--spacing-gutter)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <h2 className="text-xl font-extrabold text-[var(--color-primary)] mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-tertiary)]" aria-hidden="true">workspace_premium</span>
            Diğer Kalite Belgelerimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/kurumsal/sertifikalar/${c.slug}`}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-all hover:-translate-y-0.5 group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 shadow`}>
                  <span className="material-symbols-outlined text-white text-xl" aria-hidden="true">{c.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--color-tertiary)]">{c.name}</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)] group-hover:underline leading-snug">{c.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </>
  );
}
