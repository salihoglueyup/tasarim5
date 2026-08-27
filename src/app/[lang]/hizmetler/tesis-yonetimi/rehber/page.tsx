import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { buildFacilitySubSectorGraphSchema } from '@/lib/seo/facilityCompleteGraphBuilder';
import TesisYonetimiRehberClient from './TesisYonetimiRehberClient';

export const revalidate = 86400;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Tesis Yönetim Şirketi Nasıl Seçilir? Kapsamlı Rehber 2026 | Alo Yönetim',
    description:
      'Profesyonel tesis yönetim şirketi seçerken nelere dikkat etmeli? Sözleşme maddeleri, sorulacak sorular, maliyet analizi ve değerlendirme kriterleri. 2026 güncel rehber.',
    path: '/hizmetler/tesis-yonetimi/rehber',
    lang,
    ogImageType: 'service',
    keywords: [
      'tesis yönetim şirketi nasıl seçilir',
      'tesis yönetimi rehberi',
      'site yönetim şirketi seçme kriterleri',
      'profesyonel tesis yönetimi nedir',
      'tesis yönetim sözleşmesi',
      'tesis yönetimi fiyat karşılaştırma',
      'tesis yönetim şirketi değerlendirme',
      'en iyi tesis yönetim firması',
      'tesis yönetimi 2026',
      'istanbul tesis yönetim şirketi seçimi',
    ],
  });
}

export default async function TesisYonetimiRehberPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const faqs = [
    {
      question: 'Tesis yönetim şirketi seçerken en önemli kriter nedir?',
      answer:
        'ISO sertifikaları, 5188 güvenlik lisansı ve TSE belgelerinin güncelliği en kritik kriterdir. Referans sitelerden doğrudan geri bildirim almak ve şeffaf sözleşme şartları da vazgeçilmez unsurlardandır.',
    },
    {
      question: 'Tesis yönetim sözleşmesinde mutlaka olması gereken maddeler nelerdir?',
      answer:
        'Hizmet kapsamı, SLA süreleri (örn. 45 dakika acil müdahale), aylık raporlama yükümlülüğü, fesih süresi (90 gün), gizlilik, sorumluluk sınırları ve ceza maddeleri mutlaka yer almalıdır.',
    },
    {
      question: 'Teklif alırken nelere dikkat etmeliyim?',
      answer:
        'Sadece toplam fiyata değil, fiyata neyin dahil olduğuna (personel, malzeme, KDV) bakın. Gizli ücretler, ekstra hizmet ücretleri ve sözleşme dışı maliyet kalemlerini netleştirin.',
    },
    {
      question: 'Mevcut yöneticimizi değiştirmek için ne yapmalıyız?',
      answer:
        'Olağan veya olağanüstü kat malikleri kurulu toplanır; oy çokluğuyla mevcut yönetici görevden alınır ve yeni firma atanır. Tüm süreç noterle tescil edilir.',
    },
    {
      question: 'Tesis yönetim şirketini ne sıklıkla denetlemeliyim?',
      answer:
        'En az ayda bir kez aylık rapor ve hesap özeti talep edin. 6 ayda bir fiili denetim yapın. Yıllık olağan toplantıda bütçe ve hizmet performansını değerlendirin.',
    },
  ];

  const subSectorGraphLd = buildFacilitySubSectorGraphSchema({
    subSectorSlug: 'rehber',
    name: 'Tesis Yönetimi Seçim ve Geçiş Rehberi',
    description:
      'Profesyonel tesis yönetim şirketi seçerken dikkat edilmesi gereken ISO sertifikaları, 5188 lisansı, sözleşme maddeleri ve değerlendirme kriterleri rehberi.',
    priceRange: '₺₺',
    lang,
    faqs,
    sameAsWikidata: 'https://www.wikidata.org/wiki/Q1391515',
  });

  return (
    <>
      <JsonLd data={subSectorGraphLd} />
      <TesisYonetimiRehberClient />
    </>
  );
}
