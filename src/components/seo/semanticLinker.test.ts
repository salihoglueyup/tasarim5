import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SemanticLinker from './SemanticLinker';

describe('SemanticLinker Doğal Dil ve İç Link Güvencesi (Tekrarsız Linkleme)', () => {
  it('Ana sayfa tanıtım metninde anahtar kelimeleri İKİYE KATLAMAZ (dup-link bug önleme)', () => {
    const text =
      'İstanbul site yönetimi alanında uzmanlaşmış olan Alo Yönetim, profesyonel apartman yönetimi ve entegre tesis yönetim firması olarak 15 yılı aşkın süredir sektörde güvenin adresidir.';

    const html = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 4 }));

    // Kesinlikle 'site yönetimisite yönetimi' veya 'apartman yönetimiapartman yönetimi' gibi tekrarlar olmamalı
    expect(html).not.toContain('site yönetimisite yönetimi');
    expect(html).not.toContain('apartman yönetimiapartman yönetimi');
    expect(html).not.toContain('entegre tesisapartman yönetimi');
    expect(html).not.toContain('tesis yönetimitesis yönetimi');

    // Linklerin temiz ve orijinal kelimeleri kapsadığını doğrula
    expect(html).toContain('href="/hizmetler/tesis-yonetimi"');
    expect(html).toContain('site yönetimi</a>');

    // Metnin akışının korunduğunu doğrula
    expect(html).toContain('alanında uzmanlaşmış olan Alo Yönetim');
    expect(html).toContain('15 yılı aşkın süredir sektörde güvenin adresidir.');
  });

  it('Aynı hedef URL için birden fazla link oluşturmaz (1 URL = 1 Link kuralı)', () => {
    const text =
      'Alo Yönetim hem profesyonel site yönetimi hem de apartman yönetimi ve entegre tesis yönetimi alanlarında liderdir.';

    const html = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 4 }));

    // /hizmetler/tesis-yonetimi URL'si yalnızca 1 kez linklenmeli
    const occurrences = (html.match(/href="\/hizmetler\/tesis-yonetimi"/g) || []).length;
    expect(occurrences).toBe(1);
  });

  it('Farklı hizmet kelimelerini kendi ilgili sayfalarına bağlar (Türkçe özel karakterler dahil)', () => {
    const text =
      'Tesislerimizde 5188 lisanslı özel güvenlik, temizlik ve hijyen ve düzenli asansör bakımı gibi teknik bakım çözümleri sağlıyoruz.';

    const html = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 4 }));

    expect(html).toContain('href="/hizmetler/guvenlik-yonetimi"');
    expect(html).toContain('href="/hizmetler/temizlik-ve-hijyen"');
    expect(html).toContain('href="/hizmetler/teknik-bakim"');
  });

  it('Boş veya geçersiz metin verildiğinde çökmez ve güvenle döner', () => {
    const htmlEmpty = renderToStaticMarkup(React.createElement(SemanticLinker, { text: '' }));
    expect(htmlEmpty).toBe('<span></span>');
  });

  it('İstanbul 39 ilçesinden örnek ilçeleri doğru bölge sayfalarına bağlar', () => {
    const text =
      'Pendik, Tuzla, Beykoz ve Fatih bölgelerindeki tesisler ile Kağıthane ve Esenyurt sitelerinde yönetim hizmeti veriyoruz.';

    const html = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 6 }));

    expect(html).toContain('href="/bolgeler/pendik"');
    expect(html).toContain('href="/bolgeler/tuzla"');
    expect(html).toContain('href="/bolgeler/beykoz"');
    expect(html).toContain('href="/bolgeler/fatih"');
    expect(html).toContain('href="/bolgeler/kagithane"');
    expect(html).toContain('href="/bolgeler/esenyurt"');
  });

  it('Yeni sözlük terimlerini doğru sözlük slug rotalarına bağlar', () => {
    const text =
      'Sitede kat malikleri kurulu toplantısında yeni yönetim planı oylanmış ve enerji kimlik belgesi için bütçe onaylanmıştır.';

    const html = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 4 }));

    expect(html).toContain('href="/sozluk/kat-malikleri-kurulu"');
    expect(html).toContain('href="/sozluk/yonetim-plani"');
    expect(html).toContain('href="/sozluk/enerji-kimlik-belgesi-ekb"');
  });

  it('Sektörel çözümler ve kurumsal bağlantıları başarıyla bağlar', () => {
    const text =
      'Kurumumuz sektörel çözümler sunarken detaylar için hakkımızda sayfasını inceleyebilir veya iletişim kanallarımızdan bize ulaşabilirsiniz.';

    const html = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 3 }));

    expect(html).toContain('href="/sektorel-cozumler"');
    expect(html).toContain('href="/hakkimizda"');
    expect(html).toContain('href="/iletisim"');
  });

  it('maxLinks sınırına kesinlikle uyar (daha fazla eşleşme olsa bile sınırı aşmaz)', () => {
    const text =
      'Kadıköy, Beşiktaş, Şişli, Üsküdar, Maltepe, Kartal ve Pendik genelinde profesyonel tesis yönetimi hizmeti.';

    const htmlLimit2 = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 2 }));
    const linksCount2 = (htmlLimit2.match(/<a /g) || []).length;
    expect(linksCount2).toBe(2);

    const htmlLimit3 = renderToStaticMarkup(React.createElement(SemanticLinker, { text, maxLinks: 3 }));
    const linksCount3 = (htmlLimit3.match(/<a /g) || []).length;
    expect(linksCount3).toBe(3);
  });
});
