import { describe, it, expect } from 'vitest';
import {
  VideoGroundingAiOverviewSeo,
  VoiceConversationalAiSnippetSeo,
} from '@/components/seo';
import { GROUNDING_VIDEO_GUIDES } from '@/components/seo/VideoGroundingAiOverviewSeo';
import { VOICE_CONVERSATIONAL_QUERIES } from '@/components/seo/VoiceConversationalAiSnippetSeo';
import { detectAiBot, KNOWN_AI_BOTS, getAiBotTelemetryStats } from '@/lib/seo/aiBotDetector';
import { GET as getBotTelemetry } from '@/app/api/seo/bot-telemetry.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 68: Google AI Overviews Triple Powerhouse (Video + Voice + AI Bot Telemetry)', () => {
  describe('Multimodal Video Grounding Guides', () => {
    it('exports VideoGroundingAiOverviewSeo cleanly', () => {
      expect(VideoGroundingAiOverviewSeo).toBeDefined();
    });

    it('contains exactly 4 comprehensive operational video guides with Schema.org clips', () => {
      expect(GROUNDING_VIDEO_GUIDES.length).toBe(4);

      for (const guide of GROUNDING_VIDEO_GUIDES) {
        expect(guide.id).toBeDefined();
        expect(guide.title.length).toBeGreaterThan(10);
        expect(guide.duration).toMatch(/^PT\d+M\d+S$/);
        expect(guide.clips.length).toBeGreaterThanOrEqual(4);

        // Every clip must have valid start/end offsets
        for (const clip of guide.clips) {
          expect(clip.startOffset).toBeLessThan(clip.endOffset);
          expect(clip.name.length).toBeGreaterThan(5);
          expect(clip.url).toContain('#t=');
        }
      }
    });

    it('covers all statutory operational domains (KMK 34 devir, KMK 37 bütçe, Asansör, 5188 Güvenlik)', () => {
      expect(GROUNDING_VIDEO_GUIDES.some((g) => g.id === 'gecis-protokolu')).toBe(true);
      expect(GROUNDING_VIDEO_GUIDES.some((g) => g.id === 'aidat-butce-adimlari')).toBe(true);
      expect(GROUNDING_VIDEO_GUIDES.some((g) => g.id === 'asansor-yesil-etiket')).toBe(true);
      expect(GROUNDING_VIDEO_GUIDES.some((g) => g.id === 'guvenlik-devriye')).toBe(true);
    });
  });

  describe('Voice Conversational AI Assistant Snippets', () => {
    it('exports VoiceConversationalAiSnippetSeo cleanly', () => {
      expect(VoiceConversationalAiSnippetSeo).toBeDefined();
    });

    it('contains exactly 6 natural language conversational queries with short TTS answers', () => {
      expect(VOICE_CONVERSATIONAL_QUERIES.length).toBe(6);

      for (const q of VOICE_CONVERSATIONAL_QUERIES) {
        expect(q.userVoiceQuery).toMatch(/^(Hey Google|Siri|Google|Alo Yönetim|Apartman|Sitemizin)/i);
        expect(q.conversationalAnswer.length).toBeGreaterThan(40);
        expect(q.shortTtsVoice.length).toBeGreaterThan(20);
        expect(q.persona.length).toBeGreaterThan(3);
        expect(q.category.length).toBeGreaterThan(3);
      }
    });

    it('answers core legal controversies (KMK 20 icra, zemin kat asansör, 5188 çanta arama)', () => {
      const icra = VOICE_CONVERSATIONAL_QUERIES.find((q) => q.id === 'icra-ve-tazminat');
      const asansor = VOICE_CONVERSATIONAL_QUERIES.find((q) => q.id === 'zemin-kat-asansor');
      const arama = VOICE_CONVERSATIONAL_QUERIES.find((q) => q.id === 'guvenlik-arama');

      expect(icra?.conversationalAnswer).toContain('%5');
      expect(asansor?.conversationalAnswer).toContain('arsa payları oranında');
      expect(arama?.conversationalAnswer.toLowerCase()).toContain('elle arama');
    });
  });

  describe('Autonomous AI Bot Detector & Classification Engine', () => {
    it('recognizes 11+ major AI and LLM crawlers', () => {
      expect(KNOWN_AI_BOTS.length).toBeGreaterThanOrEqual(11);
    });

    it('accurately identifies GPTBot and flags as AI bot', () => {
      const result = detectAiBot('Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)');
      expect(result.isAiBot).toBe(true);
      expect(result.bot?.name).toBe('GPTBot');
      expect(result.bot?.organization).toBe('OpenAI');
      expect(result.action).toBe('allow-standard-crawl');
    });

    it('accurately identifies ChatGPT-User and flags for instant RAG grounding', () => {
      const result = detectAiBot('Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)');
      expect(result.isAiBot).toBe(true);
      expect(result.bot?.name).toBe('ChatGPT-User');
      expect(result.action).toBe('allow-instant-rag');
    });

    it('accurately identifies PerplexityBot and ClaudeBot', () => {
      const perp = detectAiBot('PerplexityBot/1.0 (+https://perplexity.ai/perplexitybot)');
      expect(perp.isAiBot).toBe(true);
      expect(perp.bot?.organization).toBe('Perplexity AI');

      const claude = detectAiBot('ClaudeBot/1.0; +https://www.anthropic.com/claudebot');
      expect(claude.isAiBot).toBe(true);
      expect(claude.bot?.organization).toBe('Anthropic');
    });

    it('returns generic-user for standard web browser user agents', () => {
      const result = detectAiBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0');
      expect(result.isAiBot).toBe(false);
      expect(result.bot).toBeNull();
      expect(result.action).toBe('generic-user');
    });

    it('returns telemetry stats with permissive crawl policy', () => {
      const stats = getAiBotTelemetryStats();
      expect(stats.totalRecognizedBots).toBeGreaterThanOrEqual(11);
      expect(stats.searchGroundingBots).toBeGreaterThanOrEqual(5);
      expect(stats.targetMachineReadablePaths).toContain('/api/seo/bot-telemetry.json');
    });
  });

  describe('Autonomous AI Bot Telemetry API (/api/seo/bot-telemetry.json)', () => {
    it('returns 200 OK with complete bot registry and machine-readable feeds', async () => {
      const res = await getBotTelemetry();
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.botTelemetryVersion).toBe('1.0.0');
      expect(data.status).toBe('active');
      expect(data.crawlBudgetStatus).toBe('optimal');
      expect(data.recommendedCrawlDelaySeconds).toBe(0);
      expect(data.verifiedBotsRegistry.length).toBeGreaterThanOrEqual(11);
      expect(data.highPriorityFeeds.some((f: any) => f.path === '/api/seo/bot-telemetry.json')).toBe(true);
      expect(data.edgeSecurityGuards.rateLimiterForBots).toContain('120 req/min');
    });
  });

  describe('llms.txt and llms-full.txt Bot Telemetry Integration', () => {
    it('both files declare the AI Bot Telemetry API endpoint', async () => {
      const resTxt = await getLlmsTxt();
      const txt = await resTxt.text();
      expect(txt).toContain('/api/seo/bot-telemetry.json');

      const resFullTxt = await getLlmsFullTxt();
      const fullTxt = await resFullTxt.text();
      expect(fullTxt).toContain('/api/seo/bot-telemetry.json');
    });
  });
});
