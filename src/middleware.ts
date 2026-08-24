import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { buildHttpLinkHeader, buildXRobotsTag } from './lib/seo/edgeHeaderInjector';
import { analyzeCrawlBudget } from './lib/seo/crawlBudgetDefender';
import { detectAndLogAiCrawler } from './lib/seo/aiBotTelemetry';

const locales = ['tr', 'en', 'ru', 'ar'];
const defaultLocale = 'tr';

const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

// Translated Slugs Mapping (English, Russian, Arabic) -> Turkish App Router folders
const translatedSlugs: Record<string, Record<string, string>> = {
  en: {
    'services': 'hizmetler',
    'facility-management': 'hizmetler/tesis-yonetimi',
    'services/facility-management': 'hizmetler/tesis-yonetimi',
    'security-management': 'hizmetler/guvenlik-yonetimi',
    'services/security-management': 'hizmetler/guvenlik-yonetimi',
    'cleaning-and-hygiene': 'hizmetler/temizlik-ve-hijyen',
    'services/cleaning-and-hygiene': 'hizmetler/temizlik-ve-hijyen',
    'technical-maintenance': 'hizmetler/teknik-bakim',
    'services/technical-maintenance': 'hizmetler/teknik-bakim',
    'legal-and-execution-consultancy': 'hizmetler/hukuk-ve-icra-danismanligi',
    'services/legal-and-execution-consultancy': 'hizmetler/hukuk-ve-icra-danismanligi',
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
    'sitemap': 'site-haritasi',
    'privacy-policy': 'gizlilik-politikasi',
    'terms-of-use': 'kullanim-sartlari',
    'cookie-policy': 'cerez-politikasi',
    'kvkk': 'kvkk-ve-aydinlatma-metni',
    'career': 'istihdam-koprusu',
  },
  ru: {
    'uslugi': 'hizmetler',
    'upravlenie-obektami': 'hizmetler/tesis-yonetimi',
    'uslugi/upravlenie-obektami': 'hizmetler/tesis-yonetimi',
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
    'karta-sayta': 'site-haritasi',
    'politika-konfidentsialnosti': 'gizlilik-politikasi',
    'usloviya-ispolzovaniya': 'kullanim-sartlari',
    'politika-cookie': 'cerez-politikasi',
    'kvkk': 'kvkk-ve-aydinlatma-metni',
    'karera': 'istihdam-koprusu',
  },
  ar: {
    'khadamat': 'hizmetler',
    'idarat-al-marafiq': 'hizmetler/tesis-yonetimi',
    'khadamat/idarat-al-marafiq': 'hizmetler/tesis-yonetimi',
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
    'kharitat-almawqie': 'site-haritasi',
    'siyasat-alkhususia': 'gizlilik-politikasi',
    'shurut-alistikhdam': 'kullanim-sartlari',
    'siyasat-malafat-taarif': 'cerez-politikasi',
    'kvkk': 'kvkk-ve-aydinlatma-metni',
    'tawzif': 'istihdam-koprusu',
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
  const userAgent = request.headers.get('user-agent') || '';
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  // 0. SECURITY & VULNERABILITY SHIELD (Faz 218: Bot Exploit & Dotfile Probing Kalkanı)
  const lowerPath = pathname.toLowerCase();
  const isSecurityBlocked =
    lowerPath.startsWith('/@fs') ||
    lowerPath.startsWith('/.env') ||
    lowerPath.startsWith('/.aws') ||
    lowerPath.startsWith('/.claude') ||
    lowerPath.startsWith('/.git') ||
    lowerPath.startsWith('/.bash') ||
    lowerPath.startsWith('/.config') ||
    lowerPath.includes('/.env') ||
    lowerPath.includes('/.aws') ||
    lowerPath.includes('/.claude') ||
    lowerPath.endsWith('.php') ||
    lowerPath.endsWith('.sql') ||
    lowerPath.endsWith('.bak') ||
    lowerPath.endsWith('.ini') ||
    lowerPath.endsWith('.conf') ||
    lowerPath.endsWith('.log') ||
    lowerPath.endsWith('.yml') ||
    lowerPath.endsWith('.yaml');

  if (isSecurityBlocked) {
    return new NextResponse('Forbidden', { status: 403, headers: { 'Content-Type': 'text/plain' } });
  }

  // 0.5. AI BOT & LLM TELEMETRY LOGGING (GPTBot, ClaudeBot, Perplexity, DeepSeek)
  detectAndLogAiCrawler(userAgent, pathname, clientIp, 200);

  // 1. MEŞRU STATİK DOSYA VE API KONTROLÜ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/icon' ||
    pathname === '/apple-icon' ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.pdf') ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.txt') ||
    pathname.endsWith('.webmanifest') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }

  // 1.5. URL NORMALIZATION (SEO Faz 5: Lowercase enforcement)
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
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
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.rewrite(newUrl);
  }

  // Locale var. /tr prefix'i kullanılıyorsa ana sayfaya at (Canonical için 301 kalıcı yönlendirme)
  if (pathname.startsWith('/tr/') || pathname === '/tr') {
    const newPathname = pathname.replace(/^\/tr/, '') || '/';
    return NextResponse.redirect(new URL(newPathname, request.url), 301);
  }

  let response = NextResponse.next();

  // URL Çevirilerini Rewrite Etme (Örn: /en/services/facility-management -> /en/hizmetler/tesis-yonetimi)
  const currentLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (currentLocale && currentLocale !== defaultLocale) {
    const segments = pathname.split('/').filter(Boolean); // ["en", "services", "facility-management"]
    if (segments.length > 1) {
      const fullSubPath = segments.slice(1).join('/');
      const originalSlug = segments[1];
      
      if (translatedSlugs[currentLocale]?.[fullSubPath]) {
        const translatedPath = translatedSlugs[currentLocale][fullSubPath];
        const rewrittenPath = `/${currentLocale}/${translatedPath}`;
        response = NextResponse.rewrite(new URL(rewrittenPath, request.url));
      } else if (translatedSlugs[currentLocale]?.[originalSlug]) {
        segments[1] = translatedSlugs[currentLocale][originalSlug];
        const rewrittenPath = `/${segments.join('/')}`;
        response = NextResponse.rewrite(new URL(rewrittenPath, request.url));
      }
    }
  }

  // 4. ENTERPRISE SEO & BOT RESPONSE HEADERS (RFC 8288 Edge Web Linking & Crawl Budget Defender)
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    // Tarama Bütçesi Denetimi (?utm_*, ?fbclid=* vb.)
    const crawlBudget = analyzeCrawlBudget(request.nextUrl.searchParams);

    if (crawlBudget.shouldNoindex) {
      response.headers.set('X-Robots-Tag', 'noindex, follow');
      response.headers.set('X-Crawl-Defender', 'Protected-From-Parameter-Bloat');
    } else {
      response.headers.set(
        'X-Robots-Tag',
        buildXRobotsTag({ maxImagePreview: 'large', maxSnippet: -1, maxVideoPreview: -1 })
      );
    }

    response.headers.set(
      'X-Topical-Authority',
      'Alo Yonetim - Profesyonel Tesis Yonetimi (ISO 41001 & KMK 634)'
    );
    response.headers.set(
      'X-Dataset-Reference',
      'https://aloyonetim.com.tr/api/geo/facility-coverage.geojson'
    );

    // RFC 8288 standardında Link Header Enjeksiyonu
    const httpLinkHeader = buildHttpLinkHeader(pathname, currentLocale || defaultLocale);
    const extraLinks = [
      `<https://aloyonetim.com.tr/sitemap.xml>; rel="sitemap"`,
      `<https://aloyonetim.com.tr/feed/tesis-yonetimi.xml>; rel="alternate"; type="application/rss+xml"`,
      `<https://aloyonetim.com.tr/api/ai/facility-agent-context.json>; rel="describedby"; type="application/json"`
    ];
    response.headers.set('Link', `${httpLinkHeader}, ${extraLinks.join(', ')}`);

    // AI Arama Motoru Tespiti & Bilgi Yönlendirmesi
    if (/GPTBot|PerplexityBot|Claude-Web|Applebot|Google-Extended|CCBot|Amazonbot|DeepSeek/i.test(userAgent)) {
      response.headers.set('X-AI-Knowledge-Protocol', 'https://aloyonetim.com.tr/llms.txt');
      response.headers.set('X-AI-Knowledge-Endpoint', 'https://aloyonetim.com.tr/api/ai/facility-agent-context.json');
      response.headers.set('X-AI-Legal-Precedents', 'https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json');
      response.headers.set('X-AI-RFP-Generator', 'https://aloyonetim.com.tr/api/tesis-yonetimi/rfp-generator');
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|video|fonts).*)',
  ],
};
