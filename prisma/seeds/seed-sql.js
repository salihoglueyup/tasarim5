const Database = require('better-sqlite3');
const { randomUUID } = require('crypto');

const db = new Database('./dev.db');

console.log('Seeding partners via SQL...');
const partnerLogos = [
  "Acıbadem", "Rönesans", "Ağaoğlu", "Sur Yapı", "Sinpaş", "DAP Yapı", "Ege Yapı", "Tahincioğlu"
];

const insertPartner = db.prepare('INSERT INTO Partner (id, name, logo, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)');

for (let i = 0; i < partnerLogos.length; i++) {
  const id = randomUUID();
  const date = new Date().getTime(); // Unix timestamp ms for JS date, but Prisma stores datetime. In SQLite, datetime can be stored as milliseconds (13 digits) if mapped that way, but let's use string.
  // Prisma usually stores as unix timestamp or ISO string in better-sqlite3 depending on config. Let's use Date.now() / 1000 since better-sqlite3 typically uses unix timestamps or strings.
  // Actually, typical Prisma SQLite date format is milliseconds since epoch in some versions or ISO string. Let's use ISO string.
  // Wait, let's just use unix timestamp ms
  const now = new Date().getTime();
  insertPartner.run(id, partnerLogos[i], null, i, now, now);
}

console.log('Seeding references via SQL...');
const projects = [
  {
    title: "Lalezar Konakları",
    slug: "lalezar-konaklari",
    category: "Konut",
    units: "240 Daire",
    location: "Kadıköy, İstanbul",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    order: 1
  },
  {
    title: "Sapphire Residence",
    slug: "sapphire-residence",
    category: "Rezidans",
    units: "180 Daire",
    location: "Ataşehir, İstanbul",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    order: 2
  },
  {
    title: "Horizon Plaza & Loft",
    slug: "horizon-plaza-loft",
    category: "Ticari",
    units: "210 Ofis + 40 Mağaza",
    location: "Şişli, İstanbul",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    order: 3
  },
  {
    title: "Marina Towers",
    slug: "marina-towers",
    category: "Rezidans",
    units: "320 Daire",
    location: "Kartal, İstanbul",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    order: 4
  },
  {
    title: "Koru Park Evleri",
    slug: "koru-park-evleri",
    category: "Konut",
    units: "95 Daire",
    location: "Ümraniye, İstanbul",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    order: 5
  },
  {
    title: "Vadi Panorama Projesi",
    slug: "vadi-panorama-projesi",
    category: "Konut",
    units: "410 Daire",
    location: "Sarıyer, İstanbul",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop",
    order: 6
  }
];

const insertRef = db.prepare('INSERT INTO Reference (id, title, slug, category, location, units, image, published, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

for (const proj of projects) {
  const id = randomUUID();
  const now = new Date().getTime();
  insertRef.run(id, proj.title, proj.slug, proj.category, proj.location, proj.units, proj.image, 1, proj.order, now, now);
}

console.log('Done!');
db.close();
