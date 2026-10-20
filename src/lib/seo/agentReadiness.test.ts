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
});
