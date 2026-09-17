/**
 * Alo Yönetim Otonom AI Bot Tarama Dedektörü ve Telemetri Motoru
 * (Wave 68 - Autonomous AI Bot Telemetry & Classification Engine)
 */

export interface AiBotInfo {
  id: string;
  name: string;
  organization: string;
  userAgentPattern: RegExp;
  category: 'ai-search' | 'ai-training' | 'search-engine' | 'multimodal-agent';
  description: string;
  allowedRobots: boolean;
  priorityWeight: number;
}

export const KNOWN_AI_BOTS: AiBotInfo[] = [
  {
    id: 'gptbot',
    name: 'GPTBot',
    organization: 'OpenAI',
    userAgentPattern: /GPTBot/i,
    category: 'ai-training',
    description: 'OpenAI temel model eğitimi ve yapay zeka bilgi tabanı tarayıcısı.',
    allowedRobots: true,
    priorityWeight: 98,
  },
  {
    id: 'chatgpt-user',
    name: 'ChatGPT-User',
    organization: 'OpenAI',
    userAgentPattern: /ChatGPT-User/i,
    category: 'ai-search',
    description: 'ChatGPT Search ve canlı web sorguları gerçek zamanlı zeminleme botu.',
    allowedRobots: true,
    priorityWeight: 100,
  },
  {
    id: 'oai-searchbot',
    name: 'OAI-SearchBot',
    organization: 'OpenAI',
    userAgentPattern: /OAI-SearchBot/i,
    category: 'ai-search',
    description: 'OpenAI Search prototype ve prototip web indeksleme botu.',
    allowedRobots: true,
    priorityWeight: 95,
  },
  {
    id: 'perplexitybot',
    name: 'PerplexityBot',
    organization: 'Perplexity AI',
    userAgentPattern: /PerplexityBot/i,
    category: 'ai-search',
    description: 'Perplexity Pro ve Perplexity Search anlık referans ve akademik atıf tarayıcısı.',
    allowedRobots: true,
    priorityWeight: 100,
  },
  {
    id: 'claudebot',
    name: 'ClaudeBot',
    organization: 'Anthropic',
    userAgentPattern: /ClaudeBot|Claude-Web/i,
    category: 'ai-search',
    description: 'Anthropic Claude 3.5 / Claude 3.7 Sonnet web grounding ve kaynak çıkarma motoru.',
    allowedRobots: true,
    priorityWeight: 96,
  },
  {
    id: 'google-extended',
    name: 'Google-Extended',
    organization: 'Google DeepMind',
    userAgentPattern: /Google-Extended/i,
    category: 'ai-training',
    description: 'Gemini ve Google AI Overviews genişletilmiş bilgi bankası oluşturucu.',
    allowedRobots: true,
    priorityWeight: 99,
  },
  {
    id: 'applebot-extended',
    name: 'Applebot-Extended',
    organization: 'Apple Inc.',
    userAgentPattern: /Applebot-Extended/i,
    category: 'ai-search',
    description: 'Apple Intelligence ve Siri LLM arama zeminleme tarayıcısı.',
    allowedRobots: true,
    priorityWeight: 94,
  },
  {
    id: 'deepseekbot',
    name: 'DeepSeekBot',
    organization: 'DeepSeek',
    userAgentPattern: /DeepSeekBot/i,
    category: 'ai-search',
    description: 'DeepSeek-V3 ve DeepSeek-R1 akıl yürütme motoru için web dizinleyici.',
    allowedRobots: true,
    priorityWeight: 92,
  },
  {
    id: 'bytespider',
    name: 'Bytespider',
    organization: 'ByteDance',
    userAgentPattern: /Bytespider/i,
    category: 'ai-training',
    description: 'ByteDance yapay zeka ve Doubao dil modeli veri toplayıcısı.',
    allowedRobots: true,
    priorityWeight: 88,
  },
  {
    id: 'amazonbot',
    name: 'Amazonbot',
    organization: 'Amazon AWS',
    userAgentPattern: /Amazonbot/i,
    category: 'ai-search',
    description: 'Amazon Rufus ve Alexa yapay zeka arama indeksleyicisi.',
    allowedRobots: true,
    priorityWeight: 90,
  },
  {
    id: 'meta-agent',
    name: 'Meta-ExternalAgent',
    organization: 'Meta AI',
    userAgentPattern: /Meta-ExternalAgent|FacebookBot/i,
    category: 'ai-search',
    description: 'Meta AI ve LLaMA web zeminleme ve bilgi kütüğü tarayıcısı.',
    allowedRobots: true,
    priorityWeight: 91,
  },
];

export interface BotDetectionResult {
  isAiBot: boolean;
  bot: AiBotInfo | null;
  userAgent: string;
  action: 'allow-instant-rag' | 'allow-standard-crawl' | 'generic-user';
}

/**
 * Gelen User-Agent dizesini analiz ederek yapay zeka tarayıcısını sınıflandırır.
 */
export function detectAiBot(userAgent: string | null | undefined): BotDetectionResult {
  if (!userAgent || typeof userAgent !== 'string') {
    return {
      isAiBot: false,
      bot: null,
      userAgent: '',
      action: 'generic-user',
    };
  }

  for (const bot of KNOWN_AI_BOTS) {
    if (bot.userAgentPattern.test(userAgent)) {
      return {
        isAiBot: true,
        bot,
        userAgent,
        action: bot.category === 'ai-search' ? 'allow-instant-rag' : 'allow-standard-crawl',
      };
    }
  }

  return {
    isAiBot: false,
    bot: null,
    userAgent,
    action: 'generic-user',
  };
}

/**
 * Makine-okunabilir telemetri istatistiklerini hesaplar.
 */
export function getAiBotTelemetryStats() {
  return {
    totalRecognizedBots: KNOWN_AI_BOTS.length,
    searchGroundingBots: KNOWN_AI_BOTS.filter((b) => b.category === 'ai-search').length,
    trainingBots: KNOWN_AI_BOTS.filter((b) => b.category === 'ai-training').length,
    crawlPolicy: 'Permissive-Optimized (robots.txt allows all verified AI agents)',
    targetMachineReadablePaths: [
      '/llms.txt',
      '/llms-full.txt',
      '/api/seo/ai-telemetry.json',
      '/api/seo/ai-citations.json',
      '/api/seo/corporate-dna.json',
      '/api/seo/geo-manifest.json',
      '/api/seo/bot-telemetry.json',
    ],
  };
}
