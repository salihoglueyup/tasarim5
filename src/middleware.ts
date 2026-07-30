import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. STATİK DOSYA VE API KONTROLÜ
  // Statik dosyaları, api isteklerini, next.js sistem dosyalarını pas geç
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    // Next app metadata route'ları (noktasız oldukları için locale rewrite'a takılıp
    // /tr/icon'a yönlenip 404 veriyorlardı) — olduğu gibi sun.
    pathname === '/icon' ||
    pathname === '/apple-icon' ||
    pathname.includes('.') // Dosya uzantısı varsa (resim, favicon vb.)
  ) {
    return NextResponse.next();
  }

  // 2. AUTHENTICATION (Yönetim Paneli)
  // We need to support multi-language routing, so we check if the path contains /admin
  const isProtectedRoute = protectedRoutes.some((route) => pathname.includes(route) && !pathname.includes('/admin/login'));
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  if (isProtectedRoute || isPublicRoute) {
    const cookie = request.cookies.get('admin_session')?.value;
    const session = cookie ? await decrypt(cookie) : null;

    if (isProtectedRoute && !session?.userId) {
      // Redirect to login, preserving the language prefix if it exists
      const langPrefix = pathname.split('/')[1] || defaultLocale;
      const loginUrl = new URL(`/${langPrefix}/admin/login`, request.nextUrl);
      return NextResponse.redirect(loginUrl);
    }

    if (isPublicRoute && session?.userId) {
      // If already logged in, redirect to dashboard
      const langPrefix = pathname.split('/')[1] || defaultLocale;
      const dashboardUrl = new URL(`/${langPrefix}/admin/dashboard`, request.nextUrl);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // 3. LOCALE (DİL) YÖNLENDİRMESİ
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
