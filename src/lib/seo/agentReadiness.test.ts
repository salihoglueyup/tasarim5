import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
import robots from '@/app/robots';
import { middleware } from '@/middleware';
import { GET as getApiCatalog } from '@/app/.well-known/api-catalog/route';
import { GET as getOAuthProtectedResource } from '@/app/.well-known/oauth-protected-resource/route';
import { GET as getOAuthAuthorizationServer } from '@/app/.well-known/oauth-authorization-server/route';
import { GET as getOpenIdConfiguration } from '@/app/.well-known/openid-configuration/route';
import { GET as getAuthMd } from '@/app/auth.md/route';
import { GET as getA2aAgentCard } from '@/app/.well-known/agent-card.json/route';
import { GET as getMcpServerCard } from '@/app/.well-known/mcp/server-card.json/route';
import { GET as getAgentSkillsIndex } from '@/app/.well-known/agent-skills/index.json/route';
import { GET as getAgentSkillMd } from '@/app/.well-known/agent-skills/alo-yonetim-knowledge/SKILL.md/route';
import { GET as getArdCatalog } from '@/app/.well-known/ai-catalog.json/route';
import { GET as getPoppyManifest } from '@/app/.well-known/poppy.json/route';
import { GET as getWebBotAuthJwks } from '@/app/.well-known/http-message-signatures-directory/route';
import { GET as getAcpDiscovery } from '@/app/.well-known/acp.json/route';
import { GET as getUcpDiscovery } from '@/app/.well-known/ucp/route';
import { GET as getX402Gateway } from '@/app/api/v1/route';
import { GET as getUniversalMarkdown } from '@/app/api/markdown/route';
import { generateOpenApiSpec } from '@/lib/seo/indexing/openApiSpec';
import { buildLlmsText, buildLlmsFullText } from '@/lib/seo/llmsContent';
import { verifiedKnowledge } from '@/lib/seo/verifiedKnowledge';
import { buildDistrictFacilityGraphSchema } from '@/lib/seo/facility/facilityCompleteGraphBuilder';
import { blogPostingSchema, localBusinessAreaSchema, localServiceSchema } from '@/lib/schemas';
import { POSTS } from '@/data/posts';

describe('Cloudflare Agent Readiness & AI Discovery Suite', () => {
  it('robots.ts Content-Signal ve Agentmap direktiflerini ve .well-known izinlerini içerir', () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    for (const rule of rules) {
      const other = (rule as Record<string, unknown>).other as Record<string, string>;
      expect(other).toBeDefined();
      expect(other['Content-Signal']).toBe('ai-train=yes, search=yes, ai-input=yes');
      expect(other.Agentmap).toBe('https://aloyonetim.com.tr/.well-known/ai-catalog.json');
      expect(rule.allow).toContain('/.well-known/');
      expect(rule.allow).toContain('/auth.md');
    }
  });

  it('middleware /.well-known/* ve /auth.md yollarını dil yönlendirmesine sokmaz ve Accept: text/markdown müzakeresini destekler', async () => {
    for (const path of [
      '/.well-known/api-catalog',
      '/.well-known/oauth-protected-resource',
      '/.well-known/http-message-signatures-directory',
      '/auth.md',
    ]) {
      const req = new NextRequest(`https://aloyonetim.com.tr${path}`);
      const res = await middleware(req);
      expect(res.headers.get('x-middleware-rewrite'), path).toBeNull();
    }

    const mdReq = new NextRequest('https://aloyonetim.com.tr/', {
      headers: { accept: 'text/markdown, text/html;q=0.8' },
    });
    const mdRes = await middleware(mdReq);
    expect(mdRes.headers.get('x-middleware-rewrite')).toBe(
      'https://aloyonetim.com.tr/api/markdown?path=%2F',
    );
  });

  it('/api/markdown text/markdown ve x-markdown-tokens başlığı döner', async () => {
    const req = new NextRequest('https://aloyonetim.com.tr/api/markdown?path=%2F');
    const res = await getUniversalMarkdown(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/markdown');
    expect(Number(res.headers.get('x-markdown-tokens'))).toBeGreaterThan(50);
    const text = await res.text();
    expect(text).toContain('# Alo Yönetim');
  });

  it('RFC 9727 /.well-known/api-catalog application/linkset+json ve geçerli linkset döner', async () => {
    const res = await getApiCatalog();
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('application/linkset+json');
    const data = await res.json();
    expect(Array.isArray(data.linkset)).toBe(true);
    expect(data.linkset.length).toBeGreaterThan(0);
    expect(data.linkset[0]).toHaveProperty('anchor');
    expect(data.linkset[0]).toHaveProperty('service-desc');
    expect(data.linkset[0]).toHaveProperty('service-doc');
    expect(data.linkset[0]).toHaveProperty('status');
  });

  it('OAuth PRM, OAuth AS, OIDC ve /auth.md birbirleriyle tutarlı issuer ve agent_auth bilgisi döner', async () => {
    const prmRes = await getOAuthProtectedResource();
    const asRes = await getOAuthAuthorizationServer();
    const oidcRes = await getOpenIdConfiguration();
    const authMdRes = await getAuthMd();

    expect(prmRes.status).toBe(200);
    expect(asRes.status).toBe(200);
    expect(oidcRes.status).toBe(200);
    expect(authMdRes.status).toBe(200);
    expect(authMdRes.headers.get('content-type')).toContain('text/markdown');

    const prm = await prmRes.json();
    const asMeta = await asRes.json();
    const authMd = await authMdRes.text();

    expect(prm.resource).toBe('https://aloyonetim.com.tr');
    expect(prm.authorization_servers).toContain(asMeta.issuer);
    expect(prm.bearer_methods_supported).toContain('header');
    expect(asMeta.agent_auth.skill).toBe('https://aloyonetim.com.tr/auth.md');
    expect(authMd).toMatch(/^#\s+auth\.md/m);
  });

  it('A2A Agent Card, MCP Server Card, ARD ai-catalog, Poppy ve WebBotAuth JWKS geçerli şema döner', async () => {
    const a2a = await (await getA2aAgentCard()).json();
    expect(a2a.name).toBeTruthy();
    expect(a2a.version).toBe('1.0.0');
    expect(a2a.supportedInterfaces.length).toBeGreaterThan(0);
    expect(a2a.skills.length).toBeGreaterThan(0);

    const mcp = await (await getMcpServerCard()).json();
    expect(mcp.serverInfo.name).toBeTruthy();
    expect(mcp.serverInfo.version).toBe('1.0.0');
    expect(mcp.capabilities.tools).toBe(true);

    const ard = await (await getArdCatalog()).json();
    expect(ard.specVersion).toBe('1.0');
    expect(ard.host.identifier).toBe('did:web:aloyonetim.com.tr');
    for (const entry of ard.entries) {
      expect(entry.identifier).toMatch(/^urn:air:aloyonetim\.com\.tr:/);
      expect(Boolean(entry.url) !== Boolean(entry.data)).toBe(true);
      expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2);
    }

    const poppy = await (await getPoppyManifest()).json();
    expect(poppy.protocol_version).toBe('0.1');
    expect(poppy.organization.domain).toBe('aloyonetim.com.tr');

    const jwksRes = await getWebBotAuthJwks();
    expect(jwksRes.status).toBe(200);
    const jwks = await jwksRes.json();
    expect(jwks.keys.length).toBeGreaterThan(0);
    expect(jwks.keys[0].kty).toBe('OKP');
  });

  it('Agent Skills Discovery v0.2.0 index.json içindeki sha256 özeti SKILL.md ile birebir eşleşir', async () => {
    const idxRes = await getAgentSkillsIndex();
    const skillRes = await getAgentSkillMd();
    expect(idxRes.status).toBe(200);
    expect(skillRes.status).toBe(200);

    const idx = await idxRes.json();
    const skillText = await skillRes.text();
    const expectedDigest = `sha256:${crypto.createHash('sha256').update(skillText, 'utf8').digest('hex')}`;

    expect(idx.$schema).toBe('https://schemas.agentskills.io/discovery/0.2.0/schema.json');
    expect(idx.skills[0].digest).toBe(expectedDigest);
  });

  it('Agentic Commerce protokolleri (ACP, AP2, MPP, UCP ve x402) B2B şartname ve keşif için eksiksiz şema döner', async () => {
    // 1. AP2 extension in A2A Agent Card
    const a2a = await (await getA2aAgentCard()).json();
    const ap2Ext = a2a.capabilities.extensions?.find(
      (ext: { uri: string }) => ext.uri === 'https://github.com/google-agentic-commerce/AP2/tree/v0.1.0',
    );
    expect(ap2Ext).toBeDefined();
    expect(ap2Ext.required).toBe(true);
    expect(ap2Ext.params.roles).toContain('merchant');

    // 2. ACP Discovery (/.well-known/acp.json)
    const acpRes = await getAcpDiscovery();
    expect(acpRes.status).toBe(200);
    const acp = await acpRes.json();
    expect(acp.protocol.name).toBe('acp');
    expect(acp.protocol.version).toBeTruthy();
    expect(acp.api_base_url).toMatch(/^https:\/\/aloyonetim\.com\.tr/);
    expect(acp.transports.length).toBeGreaterThan(0);
    expect(acp.capabilities.services.length).toBeGreaterThan(0);

    // 3. MPP Payment Discovery (/openapi.json)
    const openApi = generateOpenApiSpec();
    expect(openApi['x-service-info'].categories).toContain('facility-management');
    const rfpGetPayment = openApi.paths['/api/tesis-yonetimi/rfp-generator'].get['x-payment-info'];
    expect(rfpGetPayment.intent).toBe('charge');
    expect(rfpGetPayment.method).toBe('card');
    expect(rfpGetPayment.amount).toBe('0.00');
    expect(rfpGetPayment.currency).toBe('TRY');

    // 4. Universal Commerce Protocol (/.well-known/ucp)
    const ucpRes = await getUcpDiscovery();
    expect(ucpRes.status).toBe(200);
    const ucp = await ucpRes.json();
    expect(ucp.protocol_version).toBe('2026-08-25');
    expect(ucp.ucp.version).toBe('2026-08-25');
    expect(Object.keys(ucp.services).length).toBeGreaterThan(0);
    expect(Object.keys(ucp.capabilities).length).toBeGreaterThan(0);
    expect(ucp.endpoints.openapi).toBe('https://aloyonetim.com.tr/openapi.json');

    // 5. x402 Payment Protocol (/api/v1)
    const x402Res = await getX402Gateway();
    expect(x402Res.status).toBe(402);
    expect(x402Res.headers.get('payment-required')).toBeTruthy();
    const x402Body = await x402Res.json();
    expect(x402Body.x402Version).toBe(1);
    expect(Array.isArray(x402Body.accepts)).toBe(true);
    expect(x402Body.accepts[0].scheme).toBe('exact');
  });

  it('Rota-duyarlı /api/markdown ilçe, hizmet, sözlük, KMK 2026 ve referans rotaları için sayfaya özgü Markdown ve Content-Signal döner', async () => {
    const cases = [
      { path: '/bolgeler/kadikoy', expectedText: 'Kadıköy Site ve Tesis Yönetimi' },
      { path: '/bolgeler/atasehir/site-yonetimi', expectedText: 'Ataşehir Profesyonel Site ve Apartman Yönetimi' },
      { path: '/hizmetler/guvenlik-yonetimi', expectedText: 'Güvenlik Yönetimi' },
      { path: '/sozluk/isletme-projesi', expectedText: 'Kat Mülkiyeti ve Tesis Yönetimi Sözlüğü' },
      { path: '/kmk-2026-degisiklikleri', expectedText: '7579 Sayılı Kanun' },
      { path: '/referanslar', expectedText: 'Kurumsal Referanslar' },
      { path: '/kurumsal/kalite-belgelerimiz', expectedText: 'Kalite Belgeleri ve Yasal Yetki İzinleri' },
    ];

    for (const c of cases) {
      const req = new NextRequest(
        `https://aloyonetim.com.tr/api/markdown?path=${encodeURIComponent(c.path)}`,
      );
      const res = await getUniversalMarkdown(req);
      expect(res.status, c.path).toBe(200);
      expect(res.headers.get('content-signal'), c.path).toBe('ai-train=yes, search=yes, ai-input=yes');
      const md = await res.text();
      expect(md, c.path).toContain(c.expectedText);
      expect(md, c.path).not.toMatch(/garanti|kanıtlanmış|7\/24|24\/7/i);
    }
  });

  it('RFC 9727 api-catalog içindeki tüm uç noktalar /openapi.json paths altında tanımlıdır ve llms.txt + verifiedKnowledge ile birbirine bağlıdır', async () => {
    const catalog = await (await getApiCatalog()).json();
    const openApi = generateOpenApiSpec();
    const openApiPaths = Object.keys(openApi.paths);

    for (const item of catalog.linkset) {
      const pathname = new URL(item.anchor).pathname;
      expect(openApiPaths, `Missing ${pathname} in /openapi.json`).toContain(pathname);
    }

    const llms = buildLlmsText();
    const llmsFull = buildLlmsFullText();
    const vk = verifiedKnowledge();

    expect(llms).toContain('/.well-known/ai-catalog.json');
    expect(llms).toContain('/.well-known/agent-card.json');
    expect(llmsFull).toContain('/.well-known/acp.json');
    expect(llmsFull).toContain('/.well-known/ucp');
    expect(vk.agentDiscovery.openApi).toBe('https://aloyonetim.com.tr/openapi.json');
    expect(vk.agentDiscovery.acpDiscovery).toBe('https://aloyonetim.com.tr/.well-known/acp.json');
    expect(vk.agentDiscovery.ucpDiscovery).toBe('https://aloyonetim.com.tr/.well-known/ucp');
  });

  it('İlçe × Hizmet şema grafiği (tesis-yonetimi ve site-yonetimi), Blog/Rehber Markdown ve çok dilli (en/ru/ar) GEO keşfi eksiksiz çalışır', async () => {
    // 1. District × Service graph for both tesis-yonetimi and site-yonetimi
    const kadikoySiteGraph = buildDistrictFacilityGraphSchema({
      districtSlug: 'kadikoy',
      districtName: 'Kadıköy',
      serviceSlug: 'site-yonetimi',
      geo: { lat: 40.9922, lng: 29.0287 },
    }) as { '@graph': Array<Record<string, unknown>> };
    const siteServiceNode = kadikoySiteGraph['@graph'].find((n) => n['@type'] === 'Service');
    const siteWebPageNode = kadikoySiteGraph['@graph'].find((n) => n['@type'] === 'WebPage') as Record<string, any>;
    expect(siteServiceNode?.['@id']).toBe('https://aloyonetim.com.tr/bolgeler/kadikoy/site-yonetimi#service');
    expect((siteServiceNode?.isPartOf as Record<string, string>)?.['@id']).toBe(
      'https://aloyonetim.com.tr/hizmetler/site-yonetimi#service',
    );
    expect(siteWebPageNode?.speakable?.cssSelector).toContain('#district-service-instant-answer-text');

    const lbNode = localBusinessAreaSchema({
      areaName: 'Kadıköy',
      geo: { lat: 40.9922, lng: 29.0287 },
      url: '/bolgeler/kadikoy',
    });
    const lsNode = localServiceSchema({
      serviceType: 'Özel Güvenlik',
      areaName: 'Kadıköy',
      path: '/bolgeler/kadikoy/guvenlik-yonetimi',
    });
    expect(lbNode['@id']).toBe('https://aloyonetim.com.tr/bolgeler/kadikoy#localbusiness');
    expect(lsNode['@id']).toBe('https://aloyonetim.com.tr/bolgeler/kadikoy/guvenlik-yonetimi#service');

    // 2. Blog, Rehber ve Hesaplayıcı Markdown
    const sampleSlug = POSTS[0].slug;
    const blogMdRes = await getUniversalMarkdown(
      new NextRequest(`https://aloyonetim.com.tr/api/markdown?path=${encodeURIComponent(`/blog/${sampleSlug}`)}`),
    );
    expect(blogMdRes.status).toBe(200);
    const blogMd = await blogMdRes.text();
    expect(blogMd).toContain(`https://aloyonetim.com.tr/blog/${sampleSlug}`);
    expect(blogMd).toContain(POSTS[0].title);

    const rehberMdRes = await getUniversalMarkdown(
      new NextRequest('https://aloyonetim.com.tr/api/markdown?path=%2Fhizmetler%2Ftesis-yonetimi%2Frehber'),
    );
    expect(await rehberMdRes.text()).toContain('Seçim Rehberi');

    const calcMdRes = await getUniversalMarkdown(
      new NextRequest('https://aloyonetim.com.tr/api/markdown?path=%2Fhesaplayici'),
    );
    expect(await calcMdRes.text()).toContain('KMK Madde 20');

    // 3. Multilingual (en/ru/ar) Markdown & blogPostingSchema inLanguage
    const enMdRes = await getUniversalMarkdown(
      new NextRequest('https://aloyonetim.com.tr/api/markdown?path=%2Fen%2Fhizmetler%2Ftesis-yonetimi'),
    );
    expect(enMdRes.headers.get('content-language')).toBe('en-US');
    expect(await enMdRes.text()).toContain('Istanbul Facility & Residential Property Management');

    const mwEnReq = new NextRequest('https://aloyonetim.com.tr/en/services/facility-management', {
      headers: { accept: 'text/markdown' },
    });
    const mwEnRes = await middleware(mwEnReq);
    expect(mwEnRes.headers.get('x-middleware-rewrite')).toBe(
      'https://aloyonetim.com.tr/api/markdown?path=%2Fen%2Fhizmetler%2Ftesis-yonetimi',
    );

    const enArticleLd = blogPostingSchema({
      headline: 'Test Article',
      description: 'Test Description',
      path: '/en/blog/test-article',
      lang: 'en',
      datePublished: '2026-05-22',
    });
    expect(enArticleLd['@id']).toBe('https://aloyonetim.com.tr/en/blog/test-article#article');
    expect(enArticleLd.inLanguage).toBe('en-US');

    // 4. Mahalle (/bolgeler/[ilce]/mahalleler/[mahalle]) ve İlçe×Hizmet (/bolgeler/[ilce]/guvenlik-yonetimi) Markdown
    const mahalleMdRes = await getUniversalMarkdown(
      new NextRequest('https://aloyonetim.com.tr/api/markdown?path=%2Fbolgeler%2Fkadikoy%2Fmahalleler%2Ffenerbahce'),
    );
    expect(mahalleMdRes.status).toBe(200);
    const mahalleMd = await mahalleMdRes.text();
    expect(mahalleMd).toContain('Fenerbahçe, Kadıköy Site ve Tesis Yönetimi');
    expect(mahalleMd).toContain('https://aloyonetim.com.tr/bolgeler/kadikoy/mahalleler/fenerbahce');
    expect(mahalleMd).toContain('30 dakika');

    const distSvcMdRes = await getUniversalMarkdown(
      new NextRequest('https://aloyonetim.com.tr/api/markdown?path=%2Fbolgeler%2Fkadikoy%2Fguvenlik-yonetimi'),
    );
    expect(distSvcMdRes.status).toBe(200);
    expect(await distSvcMdRes.text()).toContain('Kadıköy Güvenlik Yönetimi');

    // 5. Kurumsal ve İçerik Hub Rotaları İçin Özel Markdown Görünümleri (Seçenek 1)
    const hubPathsToCheck: Array<{ path: string; expectedText: string }> = [
      { path: '/sektorel-cozumler', expectedText: 'Sektörel Tesis ve Gayrimenkul Yönetimi Çözümleri' },
      { path: '/surdurulebilirlik', expectedText: 'Sürdürülebilir Tesis Yönetimi, Yeşil Bina ve Enerji Optimizasyonu' },
      { path: '/surdurulebilirlik/ges-projeleri', expectedText: 'Ortak Alan Çatı GES (Güneş Enerjisi) ve Enerji Verimliliği Projeleri' },
      { path: '/sss', expectedText: 'Sıkça Sorulan Sorular (KMK 634, 7579 Sayılı Kanun & 5188 Özel Güvenlik Rehberi)' },
      { path: '/sozluk', expectedText: 'Site ve Tesis Yönetimi Terimler Sözlüğü (KMK 634 & 5188 SK)' },
      { path: '/bolgeler', expectedText: 'İstanbul 39 İlçe Site ve Tesis Yönetimi Hizmet Ağı' },
      { path: '/blog', expectedText: 'Blog & KMK 634 / Tesis Yönetimi Bilgi Merkezi' },
      { path: '/hizmetler', expectedText: 'Profesyonel Bina, Site ve Entegre Tesis Yönetim Hizmetleri' },
      { path: '/iletisim', expectedText: 'İletişim, Genel Merkez ve Acil Teknik Destek Hattı' },
      { path: '/hakkimizda', expectedText: 'Kurumsal Kimlik, Vizyon ve Kalite Politikası' },
      { path: '/teklif-al', expectedText: 'Ücretsiz Saha Keşfi, Teklif ve Profesyonel Yönetime Geçiş Rehberi' },
      { path: '/app', expectedText: 'Alo Yönetim & Apsiyon Dijital Sakin ve Yönetici Mobil Portalı' },
      { path: '/istihdam-koprusu', expectedText: 'Alo Yönetim İstihdam Köprüsü & Tesis Yönetimi Kariyer Merkezi' },
      { path: '/guvenlik-akademisi', expectedText: 'Alo Yönetim 5188 Sayılı Kanun Özel Güvenlik Akademisi ve Saha Eğitimleri' },
      { path: '/kurumsal/sertifikalar/iso-45001', expectedText: 'ISO 45001:2018 (İş Sağlığı ve Güvenliği) — Alo Yönetim' },
    ];

    for (const item of hubPathsToCheck) {
      const res = await getUniversalMarkdown(
        new NextRequest(`https://aloyonetim.com.tr/api/markdown?path=${encodeURIComponent(item.path)}`),
      );
      expect(res.status).toBe(200);
      const md = await res.text();
      expect(md).toContain(item.expectedText);
    }
  });
});
