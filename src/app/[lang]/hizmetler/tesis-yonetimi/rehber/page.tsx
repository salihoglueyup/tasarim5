import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, faqPageSchema, howToSchema } from '@/lib/schemas';
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
  void lang;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Hizmetler', url: '/hizmetler' },
    { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
    { name: 'Tesis Yönetimi Rehberi', url: '/hizmetler/tesis-yonetimi/rehber' },
  ]);

  const howToLd = howToSchema({
    name: 'Tesis Yönetim Şirketi Nasıl Seçilir?',
    description:
      'Profesyonel tesis yönetim şirketi seçerken izlenmesi gereken adım adım rehber.',
    steps: [
      {
        name: '1. İhtiyaç Analizi Yapın',
        text: 'Binanızın büyüklüğünü, mevcut hizmet kapsamını ve bütçenizi belirleyin. Hangi hizmetlere ihtiyaç duyduğunuzu (güvenlik, temizlik, teknik bakım, aidat) listeleyin.',
      },
      {
        name: '2. Referans ve Belge Kontrolü Yapın',
        text: 'Firmanın ISO sertifikaları, 5188 özel güvenlik lisansı, TSE belgeleri ve vergi levhasını isteyin. En az 3 referans siteyi ziyaret edin veya sakinlerle görüşün.',
      },
      {
        name: '3. Teklifleri Karşılaştırın',
        text: 'En az 3 firmadan kalem kalem ayrıntılı teklif alın. Sadece toplam fiyatı değil, neyin dahil neyin hariç olduğunu, SLA sürelerini ve ceza maddelerini karşılaştırın.',
      },
      {
        name: '4. Sözleşmeyi Hukuki Olarak İnceletin',
        text: 'Sözleşme süresini, fesih koşullarını, hizmet seviyesi taahhütlerini (SLA), denetim ve raporlama yükümlülüklerini ve sorumluluk sınırlarını bir avukata inceletin.',
      },
      {
        name: '5. Kat Malikleri Kurulu Onayını Alın',
        text: 'KMK m.34 uyarınca yönetim şirketi seçimi için kat malikleri kurulu kararı gereklidir. Toplantıyı yasal süreçlere uygun düzenleyin ve kararı noter onaylı tutanakla belgeleyin.',
      },
      {
        name: '6. Devir Sürecini Yönetin',
        text: 'Eski yöneticiden hesaplar, belgeler ve demirbaş listesini teslim alın. Yeni firma ile devir teslim protokolü imzalayın ve tüm site sakinlerini bilgilendirin.',
      },
    ],
  });

  const faqLd = faqPageSchema([
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
  ]);

  const pageLd = webPageSchema({
    name: 'Tesis Yönetim Şirketi Nasıl Seçilir? Kapsamlı Rehber 2026',
    description:
      'Profesyonel tesis yönetim şirketi seçerken dikkat edilmesi gerekenler, sözleşme maddeleri ve değerlendirme kriterleri.',
    path: '/hizmetler/tesis-yonetimi/rehber',
    speakableSelectors: ['h1', 'h2', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, howToLd, faqLd, pageLd]} />
      <TesisYonetimiRehberClient />
    </>
  );
}
