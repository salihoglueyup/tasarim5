export interface BotVerificationResult {
  isBot: boolean;
  botName?: string;
  isVerifiedSearchEngine: boolean;
  allowFastLane: boolean;
  recommendedCacheControl: string;
  reason: string;
}

const SEARCH_BOT_PATTERNS: Array<{ name: string; pattern: RegExp; trustedDomains: string[] }> = [
  {
    name: 'Googlebot',
    pattern: /googlebot|google-inspectiontool|adsbot-google|mediapartners-google/i,
    trustedDomains: ['googlebot.com', 'google.com'],
  },
  {
    name: 'Bingbot',
    pattern: /bingbot|bingpreview|msnbot/i,
    trustedDomains: ['search.msn.com'],
  },
  {
    name: 'YandexBot',
    pattern: /yandexbot|yandexaccessibilitybot|yandexmobilebot/i,
    trustedDomains: ['yandex.ru', 'yandex.net', 'yandex.com'],
  },
  {
    name: 'Applebot',
    pattern: /applebot/i,
    trustedDomains: ['applebot.apple.com'],
  },
  {
    name: 'DuckDuckBot',
    pattern: /duckduckbot/i,
    trustedDomains: ['duckduckgo.com'],
  },
];

/**
 * Gelen User-Agent ve IP/Hostname bilgilerini denetleyerek arama motoru botunu doğrular.
 */
export function verifySearchBot(
  userAgent: string = '',
  hostname?: string
): BotVerificationResult {
  if (!userAgent) {
    return {
      isBot: false,
      isVerifiedSearchEngine: false,
      allowFastLane: false,
      recommendedCacheControl: 'public, max-age=3600',
      reason: 'No user-agent provided',
    };
  }

  for (const bot of SEARCH_BOT_PATTERNS) {
    if (bot.pattern.test(userAgent)) {
      // Hostname sağlandıysa doğrula (örn. reverse DNS)
      let isVerified = true;
      if (hostname) {
        isVerified = bot.trustedDomains.some((domain) => hostname.endsWith(domain));
      }

      if (isVerified) {
        return {
          isBot: true,
          botName: bot.name,
          isVerifiedSearchEngine: true,
          allowFastLane: true,
          recommendedCacheControl: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
          reason: `Verified ${bot.name} - Fast Lane Enabled`,
        };
      } else {
        return {
          isBot: true,
          botName: bot.name,
          isVerifiedSearchEngine: false,
          allowFastLane: false,
          recommendedCacheControl: 'no-store, no-cache',
          reason: `Spoofed / Unverified ${bot.name} signature detected`,
        };
      }
    }
  }

  return {
    isBot: false,
    isVerifiedSearchEngine: false,
    allowFastLane: false,
    recommendedCacheControl: 'public, max-age=3600',
    reason: 'Standard Client or Generic Crawler',
  };
}
