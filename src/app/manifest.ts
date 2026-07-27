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
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: '/apple-icon',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
  }
}
