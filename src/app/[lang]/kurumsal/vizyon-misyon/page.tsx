import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import VizyonMisyonClient from './VizyonMisyonClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const title = 'Vizyon ve Misyonumuz — Şeffaf Tesis Yönetimi | Alo Yönetim';
  const description =
    '45.000+ bağımsız bölüm, %100 açık kasa şeffaflığı, dokunulmaz kıdem tazminatı bloke fonu ve yapay zeka destekli akıllı tesis otomasyonu ile 2026 kurumsal yönetim vizyonumuz.';

  return buildMetadata({
    title,
    description,
    path: '/kurumsal/vizyon-misyon',
    lang,
    targetKeyword: 'alo yönetim vizyon ve misyon',
    ogImageType: 'default',
    keywords: [
      'alo yönetim vizyon',
      'alo yönetim misyon',
      'site yönetimi vizyonu',
      'şeffaf apartman yönetimi',
      'akıllı tesis yönetimi',
      'site açık kasa sistemi',
      'dokunulmaz kıdem tazminatı fonu',
      '634 kmk yönetim felsefesi',
    ],
  });
}

export default async function VizyonMisyonPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: t.nav_corporate || 'Kurumsal', url: '/kurumsal' },
    { name: t.vision_title || 'Vizyon & Misyon', url: '/kurumsal/vizyon-misyon' },
  ]);

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: 'Vizyon ve Misyonumuz — Şeffaf Tesis Yönetimi | Alo Yönetim',
    description:
      '45.000+ bağımsız bölüm, %100 açık kasa şeffaflığı, dokunulmaz kıdem tazminatı bloke fonu ve yapay zeka destekli akıllı tesis otomasyonu ile 2026 kurumsal yönetim vizyonumuz.',
    path: '/kurumsal/vizyon-misyon',
    speakableSelectors: ['h1', 'h2', 'p'],
  });

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: 'Alo Yönetim Mülk & Entegre Tesis Yönetimi',
    url: 'https://aloyonetim.com',
    logo: 'https://aloyonetim.com/logo.png',
    description:
      'Türkiye genelinde 45.000+ bağımsız bölümü 634 sayılı KMK ve ISO standartlarında şeffaf, güvenilir ve yapay zeka destekli yöneten tesis yönetimi şirketi.',
    knowsAbout: [
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      '5188 Sayılı Özel Güvenlik Hizmetleri Kanunu',
      'Açık Kasa Şeffaf Bütçe ve Aidat Yönetimi',
      'Entegre Tesis ve Rezidans İşletmeciliği',
      'Yapay Zeka Destekli IoT Kestirimci Bakım',
    ],
    sameAs: [
      'https://www.guvenlikkursu.com/',
      'https://www.linkedin.com/company/aloyonetim',
    ],
  };

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, organizationLd]} />
      <VizyonMisyonClient lang={lang} />
    </>
  );
}
