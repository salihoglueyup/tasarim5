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
  }
}

