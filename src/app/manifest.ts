import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi',
    short_name: 'Alo Yönetim',
    description: 'İstanbul genelinde profesyonel mülk ve tesis yönetimi, 5188 güvenlik, temizlik ve teknik bakım hizmetleri.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    lang: 'tr',
    dir: 'ltr',
    categories: ['business', 'productivity', 'utilities'],
    background_color: '#0a192f',
    theme_color: '#0a192f',
    icons: [
      {
        src: '/favicon/favicon-48.png',
        type: 'image/png',
        sizes: '48x48',
        purpose: 'any',
      },
      {
        src: '/favicon/favicon-192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/favicon/favicon-512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Aidat Hesapla',
        short_name: 'Hesapla',
        description: 'Aidat ve yönetim gideri hesaplama',
        url: '/hesaplayici',
        icons: [{ src: '/favicon/favicon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Hizmetlerimiz',
        short_name: 'Hizmetler',
        description: 'Tesis ve Mülk Yönetimi Hizmetleri',
        url: '/hizmetler',
        icons: [{ src: '/favicon/favicon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Teklif Al',
        short_name: 'Teklif Al',
        description: 'Ücretsiz hizmet teklifi alın',
        url: '/teklif-al',
        icons: [{ src: '/favicon/favicon-192.png', sizes: '192x192' }],
      }
    ],
  }
}

