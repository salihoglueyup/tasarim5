import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi',
    short_name: 'Alo Yönetim',
    description: 'Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a192f',
    theme_color: '#0a192f',
    // Not: favicon.ico manifest'ten çıkarıldı — raster .ico + sizes:'any' Chrome'da
    // "Resource size is not correct" uyarısı veriyordu. PWA ikonları PNG olarak ayrı sunuluyor.
    icons: [
      {
        src: '/favicon/favicon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/favicon/favicon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    shortcuts: [
      {
        name: 'Aidat Hesapla',
        short_name: 'Hesapla',
        description: 'Aidat ve yönetim gideri hesaplama',
        url: '/tr/hesaplayici',
        icons: [{ src: '/favicon/favicon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Hizmetlerimiz',
        short_name: 'Hizmetler',
        description: 'Tesis ve Mülk Yönetimi Hizmetleri',
        url: '/tr/hizmetler',
        icons: [{ src: '/favicon/favicon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Teklif Al',
        short_name: 'Teklif Al',
        description: 'Ücretsiz hizmet teklifi alın',
        url: '/tr/teklif-al',
        icons: [{ src: '/favicon/favicon-192.png', sizes: '192x192' }],
      }
    ],
  }
}

