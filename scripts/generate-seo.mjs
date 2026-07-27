import fs from 'fs';
import path from 'path';

const services = [
  { dir: 'guvenlik-yonetimi', title: 'Profesyonel Güvenlik Yönetimi', desc: 'Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.' },
  { dir: 'hasere-ve-dezenfeksiyon', title: 'Haşere İlaçlama ve Dezenfeksiyon', desc: 'Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.' },
  { dir: 'havuz-bakimi-ve-hijyen', title: 'Havuz Bakımı ve Hijyen', desc: 'Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.' },
  { dir: 'hukuk-ve-icra-danismanligi', title: 'Hukuk ve İcra Danışmanlığı', desc: 'Aidat borçlarının hukuki yollarla tahsili, sözleşme hazırlıkları ve genel kurul yasal süreç yönetimleri.' },
  { dir: 'peyzaj-ve-bahce-bakimi', title: 'Peyzaj ve Bahçe Bakımı', desc: 'Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.' },
  { dir: 'teknik-bakim', title: 'Teknik Bakım ve Onarım', desc: 'Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.' },
  { dir: 'temizlik-ve-hijyen', title: 'Temizlik ve Hijyen Yönetimi', desc: 'Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.' },
  { dir: 'tesis-yonetimi', title: 'Profesyonel Tesis Yönetimi', desc: 'Avm, plaza, site ve rezidanslar için aidat toplama, bütçe planlama ve tam kapsamlı idari yönetim.' }
];

services.forEach(s => {
  const dirPath = path.join(process.cwd(), 'src/app/hizmetler', s.dir);
  const layoutPath = path.join(dirPath, 'layout.tsx');
  
  const content = `import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${s.title}",
  description: "${s.desc}",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;

  if (fs.existsSync(dirPath)) {
    fs.writeFileSync(layoutPath, content, 'utf8');
    console.log(`Created layout.tsx for ${s.dir}`);
  }
});
