import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['tr', 'en', 'ru', 'ar'];
const defaultLocale = 'tr';

const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

// Translated Slugs Mapping (English, Russian, Arabic) -> Turkish App Router folders
const translatedSlugs: Record<string, Record<string, string>> = {
  en: {
    'services': 'hizmetler',
    'contact': 'iletisim',
    'about': 'hakkimizda',
    'regions': 'bolgeler',
    'blog': 'blog',
    'calculator': 'hesaplayici',
    'corporate': 'kurumsal',
    'references': 'referanslar',
    'faq': 'sss',
    'dictionary': 'sozluk',
    'get-quote': 'teklif-al',
    'success-stories': 'basari-hikayeleri',
    'security-academy': 'guvenlik-akademisi',
    'sectoral-solutions': 'sektorel-cozumler',
    'sustainability': 'surdurulebilirlik',
  },
  ru: {
    'uslugi': 'hizmetler',
    'kontakty': 'iletisim',
    'o-nas': 'hakkimizda',
    'regioni': 'bolgeler',
    'blog': 'blog',
    'kalkulyator': 'hesaplayici',
    'korporativniy': 'kurumsal',
    'otzyvy': 'referanslar',
    'faq': 'sss',
    'slovar': 'sozluk',
    'poluchit-czenu': 'teklif-al',
    'istorii-uspekha': 'basari-hikayeleri',
    'akademiya-bezopasnosti': 'guvenlik-akademisi',
    'otraslevye-resheniya': 'sektorel-cozumler',
    'ustoychivost': 'surdurulebilirlik',
  },
  ar: {
    'khadamat': 'hizmetler',
    'itisal': 'iletisim',
    'man-nahnu': 'hakkimizda',
    'manatiq': 'bolgeler',
    'mudawana': 'blog',
    'alat-hasiba': 'hesaplayici',
    'sharika': 'kurumsal',
    'marajie': 'referanslar',
    'asilat-mutakarira': 'sss',
    'qamus': 'sozluk',
    'ahsul-ala-ard': 'teklif-al',
    'qisas-najah': 'basari-hikayeleri',
    'akadimiyat-al-amn': 'guvenlik-akademisi',
    'hulul-qitaeia': 'sektorel-cozumler',
    'aistidama': 'surdurulebilirlik',
  }
};

function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. STATİK DOSYA VE API KONTROLÜ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/icon' ||
    pathname === '/apple-icon' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. AUTHENTICATION (Yönetim Paneli)
  const isProtectedRoute = protectedRoutes.some((route) => pathname.includes(route) && !pathname.includes('/admin/login'));
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  if (isProtectedRoute || isPublicRoute) {
    const cookie = request.cookies.get('admin_session')?.value;
    const session = cookie ? await decrypt(cookie) : null;

    if (isProtectedRoute && (!session?.userId || session?.role !== 'ADMIN')) {
      const langPrefix = locales.find(l => pathname.startsWith(`/${l}/`)) || defaultLocale;
      const loginUrl = new URL(`/${langPrefix}/admin/login`, request.nextUrl);
      return NextResponse.redirect(loginUrl);
    }

    if (isPublicRoute && session?.userId) {
      const langPrefix = locales.find(l => pathname.startsWith(`/${l}/`)) || defaultLocale;
      const dashboardUrl = new URL(`/${langPrefix}/admin/dashboard`, request.nextUrl);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // 3. LOCALE (DİL) YÖNLENDİRMESİ & SLUG ÇEVİRİLERİ
  
  // URL'nin başında herhangi bir locale var mı?
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Ziyaretçi ana sayfaya geldiyse ve locale yoksa auto-detect yap
  if (pathname === '/' && !request.cookies.has('NEXT_LOCALE')) {
    const detectedLocale = getLocale(request);
    if (detectedLocale !== defaultLocale) {
      const redirectUrl = new URL(`/${detectedLocale}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathnameIsMissingLocale) {
    // Eğer locale yoksa, varsayılan dile (tr) rewrite yapıyoruz (SEO açısından URL değişmez)
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.rewrite(newUrl);
  }

  // Locale var. /tr prefix'i kullanılıyorsa ana sayfaya at (Canonical için)
  if (pathname.startsWith('/tr/') || pathname === '/tr') {
    const newPathname = pathname.replace(/^\/tr/, '') || '/';
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // URL Çevirilerini Rewrite Etme (Örn: /en/services -> /en/hizmetler)
  const currentLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (currentLocale && currentLocale !== defaultLocale) {
    const segments = pathname.split('/').filter(Boolean); // ["en", "services"]
    if (segments.length > 1) {
      const originalSlug = segments[1];
      const translated = translatedSlugs[currentLocale]?.[originalSlug];
      
      if (translated) {
        // Yolu Türkçe (gerçek) klasör yapısına rewrite et (url'de İngilizce kalır)
        segments[1] = translated;
        const rewrittenPath = `/${segments.join('/')}`;
        return NextResponse.rewrite(new URL(rewrittenPath, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|video|fonts|.*\\..*).*)',
  ],
};
