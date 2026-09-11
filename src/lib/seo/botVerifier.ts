export interface BotVerificationResult {
  isBot: boolean;
  botName?: string;
  isVerifiedSearchEngine: boolean;
  isAiBot?: boolean;
  allowFastLane: boolean;
  recommendedCacheControl: string;
  reason: string;
}

const SEARCH_BOT_PATTERNS: Array<{ name: string; pattern: RegExp; trustedDomains: string[]; isAi?: boolean }> = [
  // 1. Geleneksel Arama Motorları
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
    pattern: /applebot(?!\-extended)/i,
    trustedDomains: ['applebot.apple.com'],
  },
  {
    name: 'DuckDuckBot',
    pattern: /duckduckbot/i,
    trustedDomains: ['duckduckgo.com'],
  },
  // 2. Yeni Nesil AI ve LLM Arama Botları (GEO - Generative Engine Optimization)
  {
    name: 'GPTBot',
    pattern: /gptbot/i,
    trustedDomains: ['openai.com'],
    isAi: true,
  },
  {
    name: 'OAI-SearchBot',
    pattern: /oai-searchbot/i,
    trustedDomains: ['openai.com'],
    isAi: true,
  },
  {
    name: 'ChatGPT-User',
    pattern: /chatgpt-user/i,
    trustedDomains: ['openai.com'],
    isAi: true,
  },
  {
    name: 'ClaudeBot',
    pattern: /claudebot|claude-web|anthropic-ai/i,
    trustedDomains: ['anthropic.com'],
    isAi: true,
  },
  {
    name: 'PerplexityBot',
    pattern: /perplexitybot|perplexity-user/i,
    trustedDomains: ['perplexity.ai'],
    isAi: true,
  },
  {
    name: 'Applebot-Extended',
    pattern: /applebot-extended/i,
    trustedDomains: ['apple.com', 'applebot.apple.com'],
    isAi: true,
  },
  {
    name: 'DeepSeekBot',
    pattern: /deepseekbot/i,
    trustedDomains: ['deepseek.com'],
    isAi: true,
  },
  {
    name: 'Google-Extended',
    pattern: /google-extended/i,
    trustedDomains: ['google.com', 'googlebot.com'],
    isAi: true,
  },
  {
    name: 'cohere-ai',
    pattern: /cohere-ai/i,
    trustedDomains: ['cohere.ai', 'cohere.com'],
    isAi: true,
  },
  {
    name: 'Amazonbot',
    pattern: /amazonbot/i,
    trustedDomains: ['amazon.com'],
    isAi: true,
  },
  {
    name: 'Meta-ExternalAgent',
    pattern: /meta-externalagent/i,
    trustedDomains: ['facebook.com', 'meta.com'],
    isAi: true,
  },
  {
    name: 'Bytespider',
    pattern: /bytespider/i,
    trustedDomains: ['bytedance.com'],
    isAi: true,
  },
  {
    name: 'PetalBot',
    pattern: /petalbot/i,
    trustedDomains: ['aspiegel.com', 'petalsearch.com'],
    isAi: false,
  },
];

/**
 * Gelen User-Agent ve IP/Hostname bilgilerini denetleyerek arama motoru ve AI botlarını doğrular.
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
          isAiBot: !!bot.isAi,
          allowFastLane: true,
          recommendedCacheControl: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
          reason: bot.isAi
            ? `Verified AI Search Bot ${bot.name} - LLM Fast Lane Enabled`
            : `Verified ${bot.name} - Fast Lane Enabled`,
        };
      } else {
        return {
          isBot: true,
          botName: bot.name,
          isVerifiedSearchEngine: false,
          isAiBot: !!bot.isAi,
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

