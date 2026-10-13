import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { CATEGORIES, POSTS } from '../src/data/posts';
import type { Post } from '../src/data/posts';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedPost(post: Post) {
  const category = await prisma.category.findUnique({ where: { slug: post.category } });
  const author = await prisma.author.findUnique({ where: { slug: post.author } });

  if (!category || !author) {
    console.warn(`SKIP ${post.slug}: category="${post.category}" or author="${post.author}" bulunamadı`);
    return;
  }

  await prisma.post.upsert({
    where: { slug: post.slug },
    update: {
      title: post.title,
      description: post.description,
      categoryId: category.id,
      authorId: author.id,
      tags: JSON.stringify(post.tags),
      image: post.image,
      pillar: post.pillar,
      tldr: post.tldr,
      content: JSON.stringify(post.content),
      published: true,
      datePublished: new Date(post.datePublished),
      dateModified: post.dateModified ? new Date(post.dateModified) : new Date(post.datePublished),
    },
    create: {
      slug: post.slug,
      title: post.title,
      description: post.description,
      categoryId: category.id,
      authorId: author.id,
      tags: JSON.stringify(post.tags),
      image: post.image,
      pillar: post.pillar,
      tldr: post.tldr,
      content: JSON.stringify(post.content),
      published: true,
      datePublished: new Date(post.datePublished),
      dateModified: post.dateModified ? new Date(post.dateModified) : new Date(post.datePublished),
    },
  });
}

async function main() {
  console.log('🚀 [Alo Yönetim] Master Database Seeding Başlatılıyor...\n');

  // 1. Admin Kullanıcı
  console.log('1. Admin kullanıcı senkronize ediliyor...');
  // Şifre ortamdan gelir; yoksa tek seferlik rastgele şifre üretilip yalnızca operatör konsoluna yazılır.
  // Var olan admin kullanıcısının şifresine dokunulmaz (upsert update: {}).
  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@aloyonetim.com.tr' } });
  const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || randomBytes(18).toString('base64url');
  if (!existingAdmin && !process.env.INITIAL_ADMIN_PASSWORD) {
    console.log(`   🔑 Admin oluşturuldu: admin@aloyonetim.com.tr / ${initialPassword}  (ilk girişte değiştirin)`);
  }
  const adminPassword = await bcrypt.hash(initialPassword, 10);
  await prisma.user.upsert({
    where: { email: 'admin@aloyonetim.com.tr' },
    update: {},
    create: {
      email: 'admin@aloyonetim.com.tr',
      name: 'Alo Yönetim Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // 2. Blog Kategorileri
  console.log('2. Blog kategorileri senkronize ediliyor...');
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      },
    });
  }

  // 3. Blog Yazarları
  console.log('3. Blog yazarları senkronize ediliyor...');
  const draftsDir = path.join(process.cwd(), 'src/data/drafts');
  const draftFiles = fs.existsSync(draftsDir)
    ? fs.readdirSync(draftsDir).filter((f) => f.endsWith('.ts')).sort()
    : [];

  const allDrafts: Post[] = [];
  for (const file of draftFiles) {
    try {
      const mod = (await import(pathToFileURL(path.join(draftsDir, file)).href)) as { draft?: Post };
      if (mod.draft?.slug && typeof mod.draft.author === 'string') {
        allDrafts.push(mod.draft);
      }
    } catch {
      // Atla
    }
  }

  const allAuthorSlugs = Array.from(
    new Set([...POSTS.map((p) => p.author), ...allDrafts.map((p) => p.author)])
  );

  for (const authorSlug of allAuthorSlugs) {
    const name = authorSlug
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
    await prisma.author.upsert({
      where: { slug: authorSlug },
      update: {
        name,
        bio: `${name} - Alo Yönetim İçerik Yazarı & Tesis Uzmanı`,
      },
      create: {
        slug: authorSlug,
        name,
        bio: `${name} - Alo Yönetim İçerik Yazarı & Tesis Uzmanı`,
      },
    });
  }

  // 4. Blog Yazıları
  console.log(`4. Blog yazıları seed ediliyor (${POSTS.length} yazı)...`);
  for (const post of POSTS) {
    await seedPost(post);
    process.stdout.write('.');
  }

  // Draft dosyalarını seed et
  const existingSlugs = new Set(
    (await prisma.post.findMany({ select: { slug: true } })).map((p) => p.slug)
  );

  for (const draft of allDrafts) {
    if (existingSlugs.has(draft.slug)) {
      continue;
    }
    await seedPost(draft);
    existingSlugs.add(draft.slug);
    process.stdout.write('.');
  }
  console.log('\n   ✓ Blog yazıları tamamlandı.');

  // Referanslar ve iş ortakları artık tohumlanmaz: gerçek referans listesi src/data/realReferences.ts dosyasındadır.

  // 7. Sektörel Çözümler
  console.log('\n7. Sektörel Çözüm modelleri seed ediliyor...');
  const SECTORAL_DATA = [
    {
      slug: 'rezidans',
      title: 'Lüks Rezidans & Karma Yaşam Projeleri',
      description:
        'Konsiyerj, vale, resepsiyon, SPA/fitness işletimi, misafir karşılama protokolleri ve üst düzey sakin konforu.',
      icon: 'apartment',
      kpiTag: 'Şeffaf Yönetim',
      features: JSON.stringify([
        'Resepsiyon & Konsiyerj Hizmeti',
        'Akıllı Mobil Rezervasyon & Aidat Portalı',
        'Merkezi İklimlendirme (HVAC) & BMS Denetimi',
        'VIP Misafir ve Otopark Vale Koordinasyonu',
      ]),
      order: 1,
    },
    {
      slug: 'avm',
      title: 'AVM & Ticari Gayrimenkul Yönetimi',
      description:
        'Ortak alan iklimlendirme, yürüyen merdiven periyodik bakımı, atık ayrıştırma ve entegre güvenlik.',
      icon: 'storefront',
      kpiTag: 'Enerji Verimliliği',
      features: JSON.stringify([
        'Yoğun Ziyaretçi Akış ve Devriye Yönetimi',
        'BMS Yangın Algılama & Duman Tahliye Testleri',
        'Kiracı Ortak Gider Paylaşım ve Bütçeleme',
        'Gece Vardiyası Endüstriyel Zemin Temizliği',
      ]),
      order: 2,
    },
    {
      slug: 'sanayi',
      title: 'Sanayi Sitesi & Lojistik Tesis Yönetimi',
      description:
        '6331 İSG denetimleri, ağır vasıta PTS giriş-çıkış kontrolü, trafo/yüksek gerilim ve jeneratör bakımları.',
      icon: 'factory',
      kpiTag: '%100 İSG Mevzuat Uyumu',
      features: JSON.stringify([
        'Ağır Tonajlı Araç PTS ve Nizamiye Kontrolü',
        'Trafo & Yüksek Gerilim İşletme Sorumluluğu',
        'Yangın Hidrant Hatları & Basınç Testleri',
        'Endüstriyel Tehlikeli Atık Yönetim Protokolü',
      ]),
      order: 3,
    },
    {
      slug: 'toplukonut',
      title: 'Toplu Konut & Site Yönetimi',
      description:
        'KMK m.20 şeffaf aidat ve işletme projesi, ilamsız icra takibi, periyodik yeşil etiket asansör bakımı, geniş peyzaj/otomatik sulama.',
      icon: 'location_city',
      kpiTag: 'Şeffaf Bilanço',
      features: JSON.stringify([
        'KMK 634 Uyumlu Şeffaf Online Aidat Tahsilatı',
        'Yeşil Etiketli Asansör Muayene Takibi',
        'Otomatik Sulama & Periyodik Peyzaj Bakımı',
        'Çevre Güvenlik Kamerası & Bariyer Sistemi',
      ]),
      order: 4,
    },
    {
      slug: 'guvenlik-rezidans-plaza',
      title: '5188 Özel Güvenlik & Plaza Emniyet Çözümleri',
      description:
        '5188 sayılı kanuna uygun sertifikalı özel güvenlik, AI plaka tanıma (PTS), kartlı turnike ve kesintisiz devriye kalkanı.',
      icon: 'security',
      kpiTag: '%100 Sıfır Zafiyet & Valilik İzin Güvencesi',
      features: JSON.stringify([
        '5188 Lisanslı ve Sabıka Kaydı Temiz Özel Güvenlik Personeli',
        'Yapay Zeka Destekli Otomatik Plaka Tanıma (PTS) & Turnike Kontrolü',
        'Kör Noktasız 4K Gece Görüşlü IP CCTV Ağı & 30 Günlük Şifreli Kayıt',
        'GPS & RFID Zaman Damgalı Saatlik Devriye ve Mobil Amir Teftişi',
      ]),
      order: 5,
    },
  ];

  for (const item of SECTORAL_DATA) {
    await prisma.sectoralSolution.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        description: item.description,
        icon: item.icon,
        kpiTag: item.kpiTag,
        features: item.features,
        order: item.order,
        published: true,
      },
      create: {
        slug: item.slug,
        title: item.title,
        description: item.description,
        icon: item.icon,
        kpiTag: item.kpiTag,
        features: item.features,
        order: item.order,
        published: true,
      },
    });
    process.stdout.write('.');
  }
  console.log('\n   ✓ Sektörel çözümler tamamlandı.');

  console.log('\n🎉 [Alo Yönetim] Master Database Seeding Başarıyla Tamamlandı!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
