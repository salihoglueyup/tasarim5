/**
 * Blog AI Taslak Üretici — SEO Master Plan V4 Bölüm G (Faz 151-172)
 *
 * Kullanım:
 *   npx tsx scripts/generate-blog-draft.ts --type service --slug guvenlik-yonetimi
 *   npx tsx scripts/generate-blog-draft.ts --type local  --district kadikoy --service guvenlik-yonetimi
 *   npx tsx scripts/generate-blog-draft.ts --type topic  --title "Aidat İcra Takibi Nedir?"
 *   npx tsx scripts/generate-blog-draft.ts --list
 *
 * Çıktı: src/data/drafts/<slug>.ts — POSTS dizisine kopyala-yapıştır formatı.
 */

import * as fs from 'fs';
import * as path from 'path';
import { SERVICES, getService } from '../src/data/services';
import { DISTRICTS, getDistrict } from '../src/data/districts';

// --------------------------------------------------------------------------
// Slug yardımcısı
// --------------------------------------------------------------------------
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/İ/g, 'i').replace(/Ç/g, 'c').replace(/Ğ/g, 'g')
    .replace(/Ö/g, 'o').replace(/Ş/g, 's').replace(/Ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function today(): string {
  return new Date().toISOString().split('T')[0] + 'T08:00:00+03:00';
}

// --------------------------------------------------------------------------
// Taslak tipleri
// --------------------------------------------------------------------------

function servicePostDraft(serviceSlug: string) {
  const s = getService(serviceSlug);
  if (!s) throw new Error(`Hizmet bulunamadı: ${serviceSlug}`);

  const slug = `${toSlug(s.name)}-hizmeti-rehberi-${new Date().getFullYear()}`;
  const title = `${s.name}: Kapsamlı Rehber (${new Date().getFullYear()})`;
  const tldr = `${s.name}, profesyonel tesis yönetiminin temel bileşenidir. Bu rehberde hizmet kapsamı, ne zaman gerekli olduğu ve doğru yönetim firması seçimi ele alınmaktadır.`;

  return {
    slug,
    title,
    description: `${s.summary} Bu rehberde ${s.name.toLowerCase()} hizmetinin kapsamını, faydalarını ve profesyonel seçim kriterlerini bulacaksınız.`,
    category: serviceSlug.includes('guvenlik') ? 'guvenlik' : serviceSlug.includes('teknik') ? 'teknik' : 'yonetim',
    tags: [...s.keywords, s.name.toLowerCase(), 'tesis yönetimi'],
    author: 'alo-yonetim-editor',
    datePublished: today(),
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    pillar: s.pillar,
    tldr,
    content: [
      { type: 'h2', text: `${s.name} Nedir?` },
      { type: 'p', text: `${s.summary} Profesyonel tesis yönetiminde ${s.name.toLowerCase()}, site sakinlerinin günlük yaşam kalitesini doğrudan etkileyen kritik bir hizmet alanıdır.` },
      { type: 'h2', text: `${s.name} Hizmetinin Kapsamı` },
      { type: 'ul', items: s.benefits },
      { type: 'h2', text: `Neden Profesyonel ${s.name}?` },
      { type: 'p', text: `Bireysel çözümler yerine profesyonel yönetim firmasıyla çalışmanın avantajları; deneyim, ekipman ve 7/24 destek gibi faktörleri kapsar. Site yönetim şirketi seçerken ${s.name.toLowerCase()} konusundaki uzmanlığı mutlaka değerlendirin.` },
      { type: 'h2', text: 'Doğru Firma Nasıl Seçilir?' },
      { type: 'ol', items: [
        'Referans ve proje deneyimini inceleyin',
        'Sözleşme kapsamını detaylı okuyun',
        'Acil müdahale sürelerini sorun',
        'Raporlama ve şeffaflık mekanizmalarını değerlendirin',
        'Yerelde ekip varlığını kontrol edin',
      ]},
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: `${s.name} hizmeti ne kadar tutar?` },
      { type: 'p', text: `Maliyet; sitenin büyüklüğü, hizmet sıklığı ve kapsama göre değişir. Ücretsiz keşif sonrası şeffaf ve kalem kalem teklif alabilirsiniz.` },
      { type: 'h3', text: `${s.name} hizmetini kim sağlamalı?` },
      { type: 'p', text: `Deneyimli, sigortalı ve referanslı profesyonel bir tesis yönetim firması tercih edilmelidir. Alo Yönetim olarak ${s.name.toLowerCase()} konusunda İstanbul genelinde hizmet veriyoruz.` },
      { type: 'cta', text: `${s.name} hakkında ücretsiz keşif ve teklif almak için bize ulaşın.`, href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  };
}

function localPostDraft(districtSlug: string, serviceSlug: string) {
  const d = getDistrict(districtSlug);
  const s = getService(serviceSlug);
  if (!d) throw new Error(`İlçe bulunamadı: ${districtSlug}`);
  if (!s) throw new Error(`Hizmet bulunamadı: ${serviceSlug}`);

  const slug = `${districtSlug}-${serviceSlug}-${new Date().getFullYear()}`;
  const title = `${d.name}'de ${s.name}: Yerel Rehber`;
  const tldr = `${d.name}'de profesyonel ${s.name.toLowerCase()} için bilmeniz gerekenler. Yerel ihtiyaçlar, doğru firma seçimi ve ${d.name}'e özel hizmet kapsamı.`;

  return {
    slug,
    title,
    description: `${d.name}'de ${s.name.toLowerCase()} hizmeti nasıl alınır? Yerel ihtiyaçlar, bölgeye özgü koşullar ve profesyonel tesis yönetimi seçim rehberi.`,
    category: serviceSlug.includes('guvenlik') ? 'guvenlik' : serviceSlug.includes('teknik') ? 'teknik' : 'yonetim',
    tags: [...s.keywords.map(k => `${k} ${d.name}`), d.name.toLowerCase(), s.name.toLowerCase()],
    author: 'alo-yonetim-editor',
    datePublished: today(),
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    pillar: s.pillar,
    tldr,
    content: [
      { type: 'h2', text: `${d.name}'de ${s.name} İhtiyacı` },
      { type: 'p', text: d.intro },
      { type: 'h2', text: `${d.name}'nin Yerel Koşulları` },
      { type: 'ul', items: d.localNeeds },
      { type: 'h2', text: `${d.name}'de ${s.name} Kapsamı` },
      { type: 'ul', items: s.benefits },
      { type: 'h2', text: `${d.name}'deki Öne Çıkan Mahalleler` },
      { type: 'p', text: `Hizmet verdiğimiz başlıca mahalleler: ${d.neighborhoods.join(', ')}. Bu mahallelerdeki ${d.managedProjects}+ projemizde edindiğimiz yerel deneyimle en iyi hizmeti sunuyoruz.` },
      { type: 'h2', text: 'Sıkça Sorulan Sorular' },
      { type: 'h3', text: `${d.name}'de ${s.name} ücretleri nasıl belirlenir?` },
      { type: 'p', text: `${d.name}'de ${s.name.toLowerCase()} maliyeti; proje büyüklüğü, hizmet kapsamı ve sıklığına göre değişir. Ücretsiz keşif sonrası net teklif sunulur.` },
      { type: 'h3', text: `${d.name}'de hangi bölgelere hizmet veriyorsunuz?` },
      { type: 'p', text: `${d.neighborhoods.join(', ')} mahalleleri başta olmak üzere tüm ${d.name}'de hizmet veriyoruz.` },
      { type: 'cta', text: `${d.name}'de ${s.name.toLowerCase()} teklifi almak için hemen ulaşın.`, href: `/bolgeler/${d.slug}/${s.slug}`, label: 'Yerel Teklif Al' },
    ],
  };
}

function topicPostDraft(title: string) {
  const slug = `${toSlug(title)}-${new Date().getFullYear()}`;
  return {
    slug,
    title,
    description: `${title} hakkında kapsamlı rehber. Tesis ve site yönetimi alanında uzman görüşleri ve pratik bilgiler.`,
    category: 'yonetim',
    tags: ['site yönetimi', 'tesis yönetimi', toSlug(title)],
    author: 'alo-yonetim-editor',
    datePublished: today(),
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    pillar: '/hizmetler/tesis-yonetimi',
    tldr: `${title} konusunu ele alan bu rehber, site ve tesis yöneticilerine pratik bilgiler sunmaktadır.`,
    content: [
      { type: 'h2', text: 'Giriş' },
      { type: 'p', text: `[BURAYA GİRİŞ METNİ YAZIN — konuya genel bakış, okuyucu neden okumalı]` },
      { type: 'h2', text: 'Ana Başlık 1' },
      { type: 'p', text: '[BURAYA DETAY EKLEYIN]' },
      { type: 'h2', text: 'Ana Başlık 2' },
      { type: 'p', text: '[BURAYA DETAY EKLEYIN]' },
      { type: 'h2', text: 'Sonuç ve Öneriler' },
      { type: 'p', text: '[ÖZET VE SONRAKI ADIM]' },
      { type: 'cta', text: 'Profesyonel destek için bize ulaşın.', href: '/teklif-al', label: 'Ücretsiz Teklif Al' },
    ],
  };
}

// --------------------------------------------------------------------------
// Suggestion listesi
// --------------------------------------------------------------------------
function printSuggestions() {
  console.log('\n📋 ÖNERİLEN BLOG KONULARI\n');
  console.log('— Hizmet odaklı (--type service):');
  SERVICES.forEach(s => {
    console.log(`  npx tsx scripts/generate-blog-draft.ts --type service --slug ${s.slug}`);
  });
  console.log('\n— Yerel odaklı (--type local) — Öncelikli kombinasyonlar:');
  const priority1 = DISTRICTS.filter(d => d.priority === 1);
  priority1.forEach(d => {
    SERVICES.slice(0, 3).forEach(s => {
      console.log(`  npx tsx scripts/generate-blog-draft.ts --type local --district ${d.slug} --service ${s.slug}`);
    });
  });
  console.log('\n— Konu odaklı (--type topic):');
  [
    'Aidat Geç Ödemesi Durumunda Ne Yapılır?',
    'Site Yönetim Şirketi Nasıl Seçilir?',
    'Kat Mülkiyeti Kanunu Nedir?',
    'İşletme Projesi Nedir ve Nasıl Hazırlanır?',
    'Site Güvenliği İçin 5188 Kanunu Kapsamı',
  ].forEach(t => {
    console.log(`  npx tsx scripts/generate-blog-draft.ts --type topic --title "${t}"`);
  });
}

// --------------------------------------------------------------------------
// CLI
// --------------------------------------------------------------------------
function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      args[argv[i].slice(2)] = argv[i + 1] ?? 'true';
      i++;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs();

  if ('list' in args) {
    printSuggestions();
    return;
  }

  const type = args.type;
  let draft: Record<string, unknown>;

  if (type === 'service') {
    if (!args.slug) throw new Error('--slug gerekli (örn: guvenlik-yonetimi)');
    draft = servicePostDraft(args.slug);
  } else if (type === 'local') {
    if (!args.district || !args.service) throw new Error('--district ve --service gerekli');
    draft = localPostDraft(args.district, args.service);
  } else if (type === 'topic') {
    if (!args.title) throw new Error('--title gerekli');
    draft = topicPostDraft(args.title);
  } else {
    console.error('Geçersiz --type. Kullanım: service | local | topic');
    console.error('Öneri listesi için: npx tsx scripts/generate-blog-draft.ts --list');
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), 'src', 'data', 'drafts');
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `${draft.slug}.ts`);
  const output = `// Blog taslağı — ${new Date().toLocaleDateString('tr-TR')}
// Kontrol et, düzenle ve src/data/posts.ts içindeki POSTS dizisine ekle.

import type { Post } from '../posts';

export const draft: Post = ${JSON.stringify(draft, null, 2)};
`;

  fs.writeFileSync(outPath, output, 'utf8');

  console.log(`\n✅ Taslak oluşturuldu: ${outPath}`);
  console.log(`\n📌 Sonraki adımlar:`);
  console.log(`  1. ${outPath} dosyasını aç ve içeriği gözden geçir`);
  console.log(`  2. [BURAYA DETAY EKLEYIN] bloklarını doldur (varsa)`);
  console.log(`  3. src/data/posts.ts içindeki POSTS dizisine draft içeriğini ekle`);
  console.log(`  4. npx tsx prisma/seed.ts çalıştır (DB'ye yaz)`);
  console.log(`\n💡 İlgili pillar sayfası: ${draft.pillar}`);
}

main().catch(err => {
  console.error('Hata:', err.message);
  process.exit(1);
});
