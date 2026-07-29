const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding partners...');
  const partnerLogos = [
    "Acıbadem", "Rönesans", "Ağaoğlu", "Sur Yapı", "Sinpaş", "DAP Yapı", "Ege Yapı", "Tahincioğlu"
  ];

  for (let i = 0; i < partnerLogos.length; i++) {
    await prisma.partner.create({
      data: {
        name: partnerLogos[i],
        order: i
      }
    });
  }

  console.log('Seeding references...');
  const projects = [
    {
      title: "Lalezar Konakları",
      slug: "lalezar-konaklari",
      category: "Konut",
      units: `240 Daire`,
      location: "Kadıköy, İstanbul",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
      order: 1
    },
    {
      title: "Sapphire Residence",
      slug: "sapphire-residence",
      category: "Rezidans",
      units: `180 Daire`,
      location: "Ataşehir, İstanbul",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
      order: 2
    },
    {
      title: "Horizon Plaza & Loft",
      slug: "horizon-plaza-loft",
      category: "Ticari",
      units: `210 Ofis + 40 Mağaza`,
      location: "Şişli, İstanbul",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
      order: 3
    },
    {
      title: "Marina Towers",
      slug: "marina-towers",
      category: "Rezidans",
      units: `320 Daire`,
      location: "Kartal, İstanbul",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
      order: 4
    },
    {
      title: "Koru Park Evleri",
      slug: "koru-park-evleri",
      category: "Konut",
      units: `95 Daire`,
      location: "Ümraniye, İstanbul",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
      order: 5
    },
    {
      title: "Vadi Panorama Projesi",
      slug: "vadi-panorama-projesi",
      category: "Konut",
      units: `410 Daire`,
      location: "Sarıyer, İstanbul",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop",
      order: 6
    }
  ];

  for (const proj of projects) {
    await prisma.reference.create({
      data: proj
    });
  }

  console.log('Seeding done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
