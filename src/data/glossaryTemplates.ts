/**
 * Sözlük sayfalarında gösterilen metin şablonları (Faz 23).
 * GSC: "hazirun cetveli" (~115 gösterim, poz. 10-34), "site işletme projesi / işletme projesi örneği" (poz. 30+).
 * Şablonlar indirilebilir dosya değil, sayfada kopyalanabilir metin olarak sunulur; hukuki danışmanlık yerine geçmez.
 */

export interface GlossaryTemplate {
  /** Bölüm başlığı (H2). */
  heading: string;
  intro: string;
  /** Tablo şablonu (varsa). */
  table?: { caption: string; columns: string[]; sampleRows: string[][] };
  /** Kopyalanabilir düz metin şablonu. */
  textTemplate: string;
  /** Hazırlama adımları. */
  steps: string[];
  note: string;
}

export const GLOSSARY_TEMPLATES: Readonly<Record<string, GlossaryTemplate>> = {
  'hazirun-cetveli': {
    heading: 'Hazirun Cetveli Örneği (Şablon) ve Nasıl Hazırlanır?',
    intro:
      'Hazirun cetveli, kat malikleri kurulu toplantısına katılanların listesidir. Aşağıdaki şablonu sitenizin bağımsız bölüm listesine göre doldurabilirsiniz; vekaleten katılımlarda vekaletname cetvele eklenir.',
    table: {
      caption: 'Hazirun cetveli tablo şablonu',
      columns: ['Sıra', 'Blok / Bağımsız Bölüm No', 'Kat Maliki Adı Soyadı', 'Arsa Payı', 'Katılım (Asaleten / Vekaleten)', 'Vekil Adı Soyadı', 'İmza'],
      sampleRows: [
        ['1', 'A Blok / 1', '', '…/…', 'Asaleten', '—', ''],
        ['2', 'A Blok / 2', '', '…/…', 'Vekaleten', '', ''],
        ['3', 'A Blok / 3', '', '…/…', '', '', ''],
      ],
    },
    textTemplate: [
      '[SİTE / APARTMAN ADI] KAT MALİKLERİ KURULU',
      '[OLAĞAN / OLAĞANÜSTÜ] TOPLANTISI HAZİRUN CETVELİ',
      '',
      'Toplantı tarihi ve saati : ../../20.. – ..:..',
      'Toplantı yeri            : ..........................................',
      'Toplantı türü            : Birinci toplantı / İkinci toplantı',
      '',
      'Toplam bağımsız bölüm sayısı : ....   Toplam arsa payı : ..../....',
      'Katılan kat maliki sayısı     : ....   Katılanların arsa payı : ..../....',
      '(Asaleten: ....  Vekaleten: ....)',
      '',
      'Toplantı yeter sayısı sağlanmıştır / sağlanamamıştır.',
      '',
      'Divan Başkanı              Yazman                 Yazman',
      '(Ad Soyad – İmza)          (Ad Soyad – İmza)      (Ad Soyad – İmza)',
    ].join('\n'),
    steps: [
      'Tapu kayıtlarına göre güncel bağımsız bölüm ve kat maliki listesini, arsa paylarıyla birlikte çıkarın.',
      'Toplantı öncesinde listeyi blok ve daire sırasına göre tabloya aktarın; vekalet sütununu boş bırakın.',
      'Girişte her katılımcının kimliğini kontrol edip imzasını alın; vekillerden vekaletnameyi teslim alıp cetvele ekleyin.',
      'Katılan sayısı ve arsa payını toplayarak toplantı yeter sayısının KMK m.30 ve yönetim planına göre sağlanıp sağlanmadığını yazın.',
      'Cetveli divan başkanı ve yazmanlara imzalatın; karar defterine ve toplantı tutanağına ekleyerek arşivleyin.',
    ],
    note: 'Toplantı ve karar yeter sayıları, vekalet sınırları ve çağrı usulü KMK m.29-31 ile yönetim planınıza göre değerlendirilmelidir. Bu şablon genel bilgilendirme amaçlıdır.',
  },
  'isletme-projesi': {
    heading: 'Site İşletme Projesi Örneği (Şablon) ve Aidat Hesabı',
    intro:
      'İşletme projesi, sitenin bir yıllık tahmini gelir ve giderlerini ve her bağımsız bölüme düşen aylık avansı (aidatı) gösterir. Aşağıdaki şablon, KMK m.20 paylaşım esaslarına göre giderleri iki gruba ayırır.',
    table: {
      caption: 'Yıllık işletme projesi gider kalemleri şablonu',
      columns: ['Gider Kalemi', 'Paylaşım Esası (KMK m.20)', 'Yıllık Tahmini Tutar (TL)'],
      sampleRows: [
        ['Kapıcı / bekçi / bahçıvan / kaloriferci personel giderleri', 'Eşit paylaşım', '…'],
        ['Ortak alan elektrik ve su', 'Arsa payı oranında', '…'],
        ['Asansör periyodik bakım ve yıllık muayene', 'Arsa payı oranında', '…'],
        ['Temizlik, peyzaj ve havuz bakımı', 'Arsa payı oranında', '…'],
        ['Bina sigortası (ortak alan / DASK dışı poliçeler)', 'Arsa payı oranında', '…'],
        ['Yönetici / yönetim şirketi ücreti', 'Arsa payı oranında', '…'],
        ['Küçük onarım ve demirbaş', 'Arsa payı oranında', '…'],
        ['Toplam yıllık gider', '—', '…'],
      ],
    },
    textTemplate: [
      '[SİTE ADI] 20.. YILI İŞLETME PROJESİ',
      '',
      'Dönem                       : 01.01.20.. – 31.12.20..',
      'Bağımsız bölüm sayısı       : ....',
      'Toplam arsa payı            : ..../....',
      '',
      'A) Eşit paylaşılan giderler (yıllık)       : .......... TL',
      'B) Arsa payına göre paylaşılan giderler (yıllık) : .......... TL',
      '',
      'Bir bağımsız bölümün aylık avansı =',
      '  (A ÷ bağımsız bölüm sayısı ÷ 12)',
      '+ (B × bağımsız bölümün arsa payı ÷ toplam arsa payı ÷ 12)',
      '',
      'Ek: Bağımsız bölüm bazında aylık avans tablosu',
      'Hazırlayan: Yönetici / Yönetim Şirketi (Ad Soyad – İmza)',
    ].join('\n'),
    steps: [
      'Geçmiş yılın gerçekleşen gider kalemlerini fatura ve banka hareketleriyle çıkarın.',
      'Gelecek yıl için sözleşme zamları ve planlı bakımları ekleyerek kalem bazında tahmin yapın.',
      'Kalemleri KMK m.20 esasına göre eşit ve arsa payına göre paylaşılanlar olarak ikiye ayırın.',
      'Her bağımsız bölümün aylık avansını yukarıdaki formülle hesaplayıp ek tabloya yazın.',
      'Projeyi kat malikleri kurulunun onayına sunun; onaylı proje yoksa geçici proje hazırlanır ve en geç 3 ay içinde kurula onaylatılır (7579 sayılı Kanun).',
    ],
    note: 'Yönetim planınızda farklı bir paylaşım esası varsa o hüküm uygulanır. Hesaplamayı hızlandırmak için Aidat Hesaplayıcı aracını kullanabilirsiniz. Bu şablon genel bilgilendirme amaçlıdır.',
  },
};
