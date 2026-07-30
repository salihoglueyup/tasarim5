const Database = require('better-sqlite3');
const db = new Database('./dev.db');

console.log('Updating Lalezar Konakları with advanced fields...');

const content = `<h2>Lalezar Konakları'nda Yeni Bir Yaşam</h2><p>Lalezar Konakları, İstanbul'un gözbebeği Kadıköy'de yer alan ve 240 seçkin ailenin yaşadığı devasa bir yaşam kompleksidir. Biz Alo Yönetim olarak, bu projenin yönetimini devraldığımız günden beri aidat tahsilat oranlarını %98 seviyesine çıkardık ve ortak alanların kalitesini zirveye taşıdık.</p><p>Özellikle peyzaj ve 7/24 özel güvenlik alanında yaptığımız reformlarla sitenin değerini %40 oranında artırdık.</p>`;

const services = "7/24 Güvenlik, Profesyonel Temizlik, Havuz Bakımı, Teknik Servis, Aidat Takibi, Hukuksal Danışmanlık";

const stats = JSON.stringify([
  { label: "Aidat Tahsilatı", value: "%98" },
  { label: "Tasarruf Edilen Enerji", value: "%30" },
  { label: "Çözülen Arıza", value: "1.250+" },
  { label: "Personel Sayısı", value: "34" }
]);

const gallery = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop, https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop, https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop";

const testimonialText = "Alo Yönetim'e geçtikten sonra sitemizdeki tüm kronik sorunlar çözüldü. Aidat krizleri bitti, komşuluk ilişkilerimiz bile düzeldi. Gerçekten profesyonel bir ekiple çalışmanın rahatlığını yaşıyoruz.";
const testimonialAuthor = "Ahmet Yılmaz, Yönetim Kurulu Başkanı";

const coordinates = "40.9901, 29.0253";

const stmt = db.prepare(`
  UPDATE Reference 
  SET 
    content = ?, 
    services = ?, 
    stats = ?, 
    gallery = ?, 
    testimonialText = ?, 
    testimonialAuthor = ?, 
    coordinates = ?
  WHERE slug = ?
`);

const result = stmt.run(content, services, stats, gallery, testimonialText, testimonialAuthor, coordinates, 'lalezar-konaklari');

console.log('Update result:', result);

db.close();
