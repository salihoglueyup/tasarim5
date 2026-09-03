import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { buildHttpLinkHeader, buildXRobotsTag } from './lib/seo/edgeHeaderInjector';
import { analyzeCrawlBudget } from './lib/seo/crawlBudgetDefender';
import { detectAndLogAiCrawler } from './lib/seo/aiBotTelemetry';
import { buildFacilityEdgeHeaders, generateFacilityContentHash } from './lib/seo/facilityEdgeOptimizer';
import { recordBotCrawlEvent } from './lib/seo/facilityBotAuditLog';

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
    'facility-management/residence-management': 'hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    'facility-management/plaza-management': 'hizmetler/tesis-yonetimi/plaza-yonetimi',
    'facility-management/commercial-management': 'hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
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
    'corporate/about-us': 'kurumsal/hakkimizda',
    'corporate/quality-certificates': 'kurumsal/kalite-belgelerimiz',
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
    'uslugi/bezopasnost': 'hizmetler/guvenlik-yonetimi',
    'uslugi/klining': 'hizmetler/temizlik-ve-hijyen',
    'uslugi/tehnicheskoe-obsluzhivanie': 'hizmetler/teknik-bakim',
    'uslugi/yuridicheskie-uslugi': 'hizmetler/hukuk-ve-icra-danismanligi',
    'upravlenie-obektami/rezidentsii': 'hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    'upravlenie-obektami/biznes-tsentry': 'hizmetler/tesis-yonetimi/plaza-yonetimi',
    'kontakty': 'iletisim',
    'o-nas': 'hakkimizda',
    'regioni': 'bolgeler',
    'blog': 'blog',
    'kalkulyator': 'hesaplayici',
    'korporativniy': 'kurumsal',
    'korporativniy/o-nas': 'kurumsal/hakkimizda',
    'korporativniy/sertifikaty': 'kurumsal/kalite-belgelerimiz',
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
    'khadamat/al-amn': 'hizmetler/guvenlik-yonetimi',
    'khadamat/al-tandhif': 'hizmetler/temizlik-ve-hijyen',
    'khadamat/al-siyana': 'hizmetler/teknik-bakim',
    'khadamat/al-istisharat-al-qanuniya': 'hizmetler/hukuk-ve-icra-danismanligi',
    'idarat-al-marafiq/mujamaat-sakaniya': 'hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    'idarat-al-marafiq/marakiz-tijariya': 'hizmetler/tesis-yonetimi/plaza-yonetimi',
    'itisal': 'iletisim',
    'man-nahnu': 'hakkimizda',
    'manatiq': 'bolgeler',
    'mudawana': 'blog',
    'alat-hasiba': 'hesaplayici',
    'sharika': 'kurumsal',
    'sharika/man-nahnu': 'kurumsal/hakkimizda',
    'sharika/shahadat-aljawda': 'kurumsal/kalite-belgelerimiz',
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

  // 1.5. URL NORMALIZATION (SEO Faz 5, Faz 19 & Faz 171: Lowercase, Hyphen & Trailing Slash Stripping)
  let normalizedPath = pathname.toLowerCase().replace(/_/g, '-');
  if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  if (pathname !== normalizedPath) {
    const url = request.nextUrl.clone();
    url.pathname = normalizedPath;
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

  // Faz 159 & Faz 160: NEXT_LOCALE çerezi varsa hatırla, yoksa Accept-Language ile yönlendir (Botlar hariç)
  const isCrawler = /Googlebot|bingbot|YandexBot|DuckDuckBot|Baiduspider|GPTBot|PerplexityBot|Claude-Web|Applebot|Google-Extended|CCBot|Amazonbot|DeepSeek|SEOptimer|Lighthouse|HeadlessChrome|bot|crawl|spider/i.test(userAgent);

  if (pathname === '/') {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && cookieLocale !== defaultLocale && locales.includes(cookieLocale)) {
      return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url));
    }

    // Arama motorları ve denetim botları yönlendirilmez; doğrudan canonical '/' içeriğini alır (Faz 161).
    if (!cookieLocale && !isCrawler) {
      const detectedLocale = getLocale(request);
      if (detectedLocale !== defaultLocale) {
        return NextResponse.redirect(new URL(`/${detectedLocale}`, request.url));
      }
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
    if (request.cookies.get('NEXT_LOCALE')?.value !== currentLocale) {
      response.cookies.set('NEXT_LOCALE', currentLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }

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
    const isAiBot = /GPTBot|PerplexityBot|Claude-Web|Applebot|Google-Extended|CCBot|Amazonbot|DeepSeek/i.test(userAgent);
    const isSearchBot = /Googlebot|bingbot|YandexBot|DuckDuckBot|Baiduspider/i.test(userAgent);
    const isFacilityRoute = pathname.includes('/tesis-yonetimi');

    // 4.1 Tesis Yönetimi 304 Not Modified & ETag Kalkanı
    if (isFacilityRoute && request.method === 'GET') {
      const currentEtag = generateFacilityContentHash();
      const ifNoneMatch = request.headers.get('if-none-match');

      if (ifNoneMatch && (ifNoneMatch === currentEtag || ifNoneMatch.includes(currentEtag))) {
        if (isAiBot || isSearchBot) {
          const botName = isAiBot ? 'AICrawler' : 'Googlebot';
          const botType = isAiBot ? 'AICrawler' : 'SearchEngine';
          recordBotCrawlEvent(botName, botType, pathname, 304, request.headers.get('x-forwarded-for') || 'edge-ip', userAgent);
        }
        return new NextResponse(null, {
          status: 304,
          headers: {
            'ETag': currentEtag,
            'Cache-Control': 'public, max-age=7200, s-maxage=86400, stale-while-revalidate=604800',
            'X-Facility-Cache-Hit': 'Edge-304-Revalidated',
          },
        });
      }

      if (isAiBot || isSearchBot) {
        const botName = isAiBot ? 'AICrawler' : 'Googlebot';
        const botType = isAiBot ? 'AICrawler' : 'SearchEngine';
        recordBotCrawlEvent(botName, botType, pathname, 200, request.headers.get('x-forwarded-for') || 'edge-ip', userAgent);
      }

      // Tesis rotalarına özel Edge Header enjeksiyonu
      const facilityHeaders = buildFacilityEdgeHeaders(pathname, currentLocale || defaultLocale, isAiBot);
      Object.entries(facilityHeaders).forEach(([key, val]) => {
        if (val) response.headers.set(key, val);
      });
    }

    // Tarama Bütçesi Denetimi (?utm_*, ?fbclid=* vb.)
    const crawlBudget = analyzeCrawlBudget(request.nextUrl.searchParams);

    if (crawlBudget.shouldNoindex) {
      response.headers.set('X-Robots-Tag', 'noindex, follow');
      response.headers.set('X-Crawl-Defender', 'Protected-From-Parameter-Bloat');
    } else if (!isFacilityRoute) {
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
      `<https://aloyonetim.com.tr/api/tesis-yonetimi/feed.xml>; rel="alternate"; type="application/rss+xml"`,
      `<https://aloyonetim.com.tr/api/tesis-yonetimi/entity-graph.jsonld>; rel="describedby"; type="application/ld+json"`,
      `<https://aloyonetim.com.tr/api/tesis-yonetimi/authority-corpus.json>; rel="help"; type="application/json"`,
      `<https://aloyonetim.com.tr/api/tesis-yonetimi/voice-knowledge.json>; rel="describedby"; type="application/json"`,
      `<https://aloyonetim.com.tr/api/ai/facility-agent-context.json>; rel="describedby"; type="application/json"`
    ];
    response.headers.set('Link', `${httpLinkHeader}, ${extraLinks.join(', ')}`);

    // AI Arama Motoru Tespiti & Bilgi Yönlendirmesi
    if (isAiBot) {
      response.headers.set('X-AI-Knowledge-Protocol', 'https://aloyonetim.com.tr/llms.txt');
      response.headers.set('X-AI-Knowledge-Corpus', 'https://aloyonetim.com.tr/llms-full.txt');
      response.headers.set('X-AI-Authority-Corpus', 'https://aloyonetim.com.tr/api/tesis-yonetimi/authority-corpus.json');
      response.headers.set('X-AI-Voice-Knowledge', 'https://aloyonetim.com.tr/api/tesis-yonetimi/voice-knowledge.json');
      response.headers.set('X-AI-Knowledge-Endpoint', 'https://aloyonetim.com.tr/api/ai/facility-agent-context.json');
      response.headers.set('X-AI-Legal-Precedents', 'https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json');
      response.headers.set('X-AI-RFP-Generator', 'https://aloyonetim.com.tr/api/tesis-yonetimi/rfp-generator');
      response.headers.set('X-AI-Entity-Graph', 'https://aloyonetim.com.tr/api/tesis-yonetimi/entity-graph.jsonld');
    }
  }

  // Faz 191: HTTP yanıtlarında X-Powered-By başlığını kesin olarak gizle
  response.headers.delete('x-powered-by');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|video|fonts).*)',
  ],
};
