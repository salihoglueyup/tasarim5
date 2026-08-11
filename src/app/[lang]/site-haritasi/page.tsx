import PageHeader from '@/components/layout/PageHeader';
import SitemapClient from './SitemapClient';
import { DISTRICTS } from '@/data/districts';
import { TERMS } from '@/data/dictionary';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import { siteNavigationSchema } from '@/lib/schemas';

export default async function SiteHaritasi() {
  let blogCategories: { slug: string; name: string }[] = [];
  let blogPosts: { slug: string; title: string }[] = [];
  let referenceProjects: { slug: string; title: string }[] = [];
  
  try {
    const [categoriesResult, postsResult, referencesResult] = await Promise.all([
      prisma.category.findMany({ select: { slug: true, name: true } }),
      prisma.post.findMany({ where: { published: true }, select: { slug: true, title: true } }),
      prisma.reference.findMany({ where: { published: true }, select: { slug: true, title: true } })
    ]);
    blogCategories = categoriesResult;
    blogPosts = postsResult;
    referenceProjects = referencesResult;
  } catch (error) {
    console.error("Failed to fetch sitemap dynamic data:", error);
  }

  // Construct Base Sitemap Data
  const sitemapData = [
    {
      title: "Ana Sayfalar",
      links: [
        { name: "Anasayfa", path: "/" },
        { name: "Tüm Hizmetler", path: "/hizmetler" },
        { name: "İletişim", path: "/iletisim" },
        { name: "Sıkça Sorulan Sorular", path: "/sss" },
        { name: "Blog", path: "/blog" },
        { name: "Site Yönetimi Sözlüğü", path: "/sozluk" },
        { name: "Hizmet Bölgeleri", path: "/bolgeler" },
      ]
    },
    {
      title: "Hizmetlerimiz",
      links: [
        { name: "Güvenlik Yönetimi", path: "/hizmetler/guvenlik-yonetimi" },
        { name: "Tesis Yönetimi", path: "/hizmetler/tesis-yonetimi" },
        { name: "Temizlik ve Hijyen", path: "/hizmetler/temizlik-ve-hijyen" },
        { name: "Teknik Bakım", path: "/hizmetler/teknik-bakim" },
        { name: "Peyzaj ve Bahçe Bakımı", path: "/hizmetler/peyzaj-ve-bahce-bakimi" },
        { name: "Havuz Bakımı ve Hijyen", path: "/hizmetler/havuz-bakimi-ve-hijyen" },
        { name: "Haşere ve Dezenfeksiyon", path: "/hizmetler/hasere-ve-dezenfeksiyon" },
        { name: "Hukuk ve İcra Danışmanlığı", path: "/hizmetler/hukuk-ve-icra-danismanligi" },
      ]
    },
    {
      title: "Kurumsal",
      links: [
        { name: "Hakkımızda", path: "/hakkimizda" },
        { name: "Vizyon ve Misyon", path: "/kurumsal/vizyon-misyon" },
        { name: "Kalite Politikamız", path: "/kurumsal/kalite-politikamiz" },
        { name: "Sürdürülebilirlik", path: "/kurumsal/surdurulebilirlik" },
        { name: "Referanslar", path: "/referanslar" },
        { name: "Başarı Hikayeleri", path: "/basari-hikayeleri" },
      ]
    },
    {
      title: "Özel Çözümler & Akademiler",
      links: [
        { name: "Sektörel Çözümler", path: "/sektorel-cozumler" },
        { name: "İstihdam Köprüsü", path: "/istihdam-koprusu" },
        { name: "Güvenlik Akademisi", path: "/guvenlik-akademisi" },
        { name: "Aidat Hesaplayıcı", path: "/hesaplayici" },
        { name: "Teklif Al", path: "/teklif-al" },
      ]
    },
    {
      title: "Yasal & Sözleşmeler",
      links: [
        { name: "Gizlilik Politikası", path: "/gizlilik-politikasi" },
        { name: "Çerez Politikası", path: "/cerez-politikasi" },
        { name: "Kullanım Koşulları", path: "/kullanim-sartlari" },
      ]
    },
    {
      title: "Sözlük Terimleri",
      links: TERMS.map(t => ({
        name: t.term,
        path: `/sozluk#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      }))
    }
  ];

  if (blogCategories.length > 0) {
    sitemapData.push({
      title: "Blog Kategorileri",
      links: blogCategories.map(c => ({
        name: c.name,
        path: `/blog/kategori/${c.slug}`
      }))
    });
  }

  if (blogPosts.length > 0) {
    sitemapData.push({
      title: "Blog Yazıları",
      links: blogPosts.map(p => ({
        name: p.title,
        path: `/blog/${p.slug}`
      }))
    });
  }

  if (referenceProjects.length > 0) {
    sitemapData.push({
      title: "Referans Projelerimiz",
      links: referenceProjects.map(r => ({
        name: r.title,
        path: `/referanslar/${r.slug}`
      }))
    });
  }

  // Bölgeler en altta çok yer kaplayacağı için sonda eklenebilir
  sitemapData.push({
    title: "Hizmet Bölgelerimiz (İlçeler)",
    links: DISTRICTS.map((d) => ({
      name: `${d.name} Tesis Yönetimi`,
      path: `/bolgeler/${d.slug}`,
    })),
  });

  const highlights = [
    { name: "Aidat Hesaplayıcı", path: "/hesaplayici" },
    { name: "Tesis Yönetimi", path: "/hizmetler/tesis-yonetimi" },
    { name: "Güvenlik Akademisi", path: "/guvenlik-akademisi" },
    { name: "Site Yönetimi Sözlüğü", path: "/sozluk" },
  ];

  // Extract all links for JSON-LD schema
  const allLinks = sitemapData.flatMap(cat => cat.links);
  const jsonLdData = siteNavigationSchema(allLinks.map(l => ({ name: l.name, url: l.path })));

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      <PageHeader 
        title="Site Haritası" 
        description="Alo Yönetim bünyesindeki tüm sayfalara, hizmetlere, bölgelere ve bilgi kaynaklarına tek bir noktadan hızlıca erişin." 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <SitemapClient data={sitemapData} highlights={highlights} />
      </section>
    </>
  );
}
