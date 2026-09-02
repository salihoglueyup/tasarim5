export interface DistrictBasic {
  slug: string;
  name: string;
  side: 'Anadolu' | 'Avrupa';
  managedProjects: number;
}

export const DISTRICT_NAMES: DistrictBasic[] = [
  { slug: 'kadikoy', name: 'Kadıköy', side: 'Anadolu', managedProjects: 48 },
  { slug: 'atasehir', name: 'Ataşehir', side: 'Anadolu', managedProjects: 41 },
  { slug: 'uskudar', name: 'Üsküdar', side: 'Anadolu', managedProjects: 33 },
  { slug: 'umraniye', name: 'Ümraniye', side: 'Anadolu', managedProjects: 35 },
  { slug: 'maltepe', name: 'Maltepe', side: 'Anadolu', managedProjects: 29 },
  { slug: 'kartal', name: 'Kartal', side: 'Anadolu', managedProjects: 26 },
  { slug: 'pendik', name: 'Pendik', side: 'Anadolu', managedProjects: 38 },
  { slug: 'cekmekoy', name: 'Çekmeköy', side: 'Anadolu', managedProjects: 32 },
  { slug: 'sancaktepe', name: 'Sancaktepe', side: 'Anadolu', managedProjects: 25 },
  { slug: 'beykoz', name: 'Beykoz', side: 'Anadolu', managedProjects: 34 },
  { slug: 'tuzla', name: 'Tuzla', side: 'Anadolu', managedProjects: 27 },
  { slug: 'sultanbeyli', name: 'Sultanbeyli', side: 'Anadolu', managedProjects: 18 },
  { slug: 'sile', name: 'Şile', side: 'Anadolu', managedProjects: 16 },
  { slug: 'adalar', name: 'Adalar', side: 'Anadolu', managedProjects: 14 },
  { slug: 'besiktas', name: 'Beşiktaş', side: 'Avrupa', managedProjects: 36 },
  { slug: 'sisli', name: 'Şişli', side: 'Avrupa', managedProjects: 31 },
  { slug: 'sariyer', name: 'Sarıyer', side: 'Avrupa', managedProjects: 39 },
  { slug: 'bakirkoy', name: 'Bakırköy', side: 'Avrupa', managedProjects: 30 },
  { slug: 'beylikduzu', name: 'Beylikdüzü', side: 'Avrupa', managedProjects: 35 },
  { slug: 'basaksehir', name: 'Başakşehir', side: 'Avrupa', managedProjects: 37 },
  { slug: 'kucukcekmece', name: 'Küçükçekmece', side: 'Avrupa', managedProjects: 36 },
  { slug: 'kagithane', name: 'Kâğıthane', side: 'Avrupa', managedProjects: 28 },
  { slug: 'eyupsultan', name: 'Eyüpsultan', side: 'Avrupa', managedProjects: 33 },
  { slug: 'esenyurt', name: 'Esenyurt', side: 'Avrupa', managedProjects: 40 },
  { slug: 'buyukcekmece', name: 'Büyükçekmece', side: 'Avrupa', managedProjects: 26 },
  { slug: 'avcilar', name: 'Avcılar', side: 'Avrupa', managedProjects: 24 },
  { slug: 'bagcilar', name: 'Bağcılar', side: 'Avrupa', managedProjects: 28 },
  { slug: 'bahcelievler', name: 'Bahçelievler', side: 'Avrupa', managedProjects: 25 },
  { slug: 'zeytinburnu', name: 'Zeytinburnu', side: 'Avrupa', managedProjects: 27 },
  { slug: 'beyoglu', name: 'Beyoğlu', side: 'Avrupa', managedProjects: 22 },
  { slug: 'fatih', name: 'Fatih', side: 'Avrupa', managedProjects: 20 },
  { slug: 'gaziosmanpasa', name: 'Gaziosmanpaşa', side: 'Avrupa', managedProjects: 23 },
  { slug: 'sultangazi', name: 'Sultangazi', side: 'Avrupa', managedProjects: 19 },
  { slug: 'esenler', name: 'Esenler', side: 'Avrupa', managedProjects: 21 },
  { slug: 'arnavutkoy', name: 'Arnavutköy', side: 'Avrupa', managedProjects: 24 },
  { slug: 'bayrampasa', name: 'Bayrampaşa', side: 'Avrupa', managedProjects: 20 },
  { slug: 'gungoren', name: 'Güngören', side: 'Avrupa', managedProjects: 17 },
  { slug: 'silivri', name: 'Silivri', side: 'Avrupa', managedProjects: 22 },
  { slug: 'catalca', name: 'Çatalca', side: 'Avrupa', managedProjects: 15 },
];
