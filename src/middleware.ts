import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statik dosyaları, api isteklerini, next.js sistem dosyalarını pas geç
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Dosya uzantısı varsa (resim, favicon vb.)
  ) {
    return NextResponse.next();
  }

  // URL'nin başında herhangi bir locale var mı?
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Eğer URL'de desteklenen bir locale varsa (ör: /en veya /en/hizmetler), devam et.
  if (pathnameHasLocale) {
    // Özel kural: Eğer kullanıcı /tr prefix'ini zorla girdiyse, /tr siz haline redirect edelim (SEO Canonical)
    if (pathname.startsWith('/tr/') || pathname === '/tr') {
       const newPathname = pathname.replace(/^\/tr/, '') || '/';
       return NextResponse.redirect(new URL(newPathname, request.url));
    }
    return NextResponse.next();
  }

  // Eğer URL'de desteklenen bir locale YOKSA (yani /hizmetler veya /)
  // URL'yi değiştirmeden, sunucuya /tr/hizmetler olarak rewrite yapıyoruz.
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    // Bütün yolları yakala
    '/((?!api|_next/static|_next/image|favicon.ico|images|video|fonts|.*\\..*).*)',
  ],
};
