import crypto from 'crypto';
import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { FACTS } from '@/lib/facts';

/**
 * Cloudflare Agent Readiness (isitagentready.com) ve IETF / W3C / A2A / MCP / RFC 9727 / RFC 9728 / RFC 8414
 * keşif protokollerinin merkezi veri kaynağı. YALNIZCA doğrulanmış bilgiler (src/lib/facts.ts) kullanılır.
 */

export const AGENT_JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
  'Access-Control-Allow-Origin': '*',
} as const;

/** RFC 9727 — API Catalog (/.well-known/api-catalog) */
export function buildApiCatalog() {
  return {
    linkset: [
      {
        anchor: `${BASE_URL}/api/ai-knowledge`,
        'service-desc': [
          {
            href: `${BASE_URL}/openapi.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${BASE_URL}/llms-full.txt`,
            type: 'text/plain',
          },
        ],
        status: [
          {
            href: `${BASE_URL}/api/health`,
            type: 'application/json',
          },
        ],
      },
      {
        anchor: `${BASE_URL}/api/knowledge-graph`,
        'service-desc': [
          {
            href: `${BASE_URL}/openapi.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${BASE_URL}/llms.txt`,
            type: 'text/plain',
          },
        ],
        status: [
          {
            href: `${BASE_URL}/api/health`,
            type: 'application/json',
          },
        ],
      },
      {
        anchor: `${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json`,
        'service-desc': [
          {
            href: `${BASE_URL}/openapi.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${BASE_URL}/kmk-2026-degisiklikleri`,
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${BASE_URL}/api/health`,
            type: 'application/json',
          },
        ],
      },
      {
        anchor: `${BASE_URL}/api/geo/facility-coverage.geojson`,
        'service-desc': [
          {
            href: `${BASE_URL}/openapi.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${BASE_URL}/bolgeler`,
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${BASE_URL}/api/health`,
            type: 'application/json',
          },
        ],
      },
    ],
  };
}

/** RFC 9728 — OAuth 2.0 Protected Resource Metadata (/.well-known/oauth-protected-resource) */
export function buildOAuthProtectedResource() {
  return {
    resource: BASE_URL,
    authorization_servers: [BASE_URL],
    scopes_supported: ['read:knowledge', 'read:geo', 'read:legal', 'write:quote'],
    bearer_methods_supported: ['header'],
    resource_documentation: `${BASE_URL}/llms-full.txt`,
    resource_policy_uri: `${BASE_URL}/gizlilik-politikasi`,
  };
}

/** RFC 8414 & OIDC Discovery & Auth.md (/.well-known/oauth-authorization-server & /.well-known/openid-configuration) */
export function buildOAuthAuthorizationServer() {
  return {
    issuer: BASE_URL,
    authorization_endpoint: `${BASE_URL}/api/auth/authorize`,
    token_endpoint: `${BASE_URL}/api/auth/token`,
    revocation_endpoint: `${BASE_URL}/api/auth/revoke`,
    registration_endpoint: `${BASE_URL}/api/auth/register`,
    jwks_uri: `${BASE_URL}/.well-known/http-message-signatures-directory`,
    grant_types_supported: [
      'client_credentials',
      'authorization_code',
      'urn:ietf:params:oauth:grant-type:token-exchange',
    ],
    response_types_supported: ['code', 'token'],
    scopes_supported: ['openid', 'profile', 'read:knowledge', 'read:geo', 'read:legal', 'write:quote'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_basic', 'private_key_jwt'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['EdDSA', 'RS256'],
    service_documentation: `${BASE_URL}/auth.md`,
    poppy_domains: ['aloyonetim.com.tr'],
    agent_auth: {
      skill: `${BASE_URL}/auth.md`,
      register_uri: `${BASE_URL}/api/auth/register`,
      identity_types_supported: ['anonymous', 'identity_assertion'],
      anonymous: {
        credential_types_supported: ['api_key', 'bearer_token'],
        claim_uri: `${BASE_URL}/api/auth/register`,
      },
      identity_assertion: {
        assertion_types_supported: [
          'urn:ietf:params:oauth:token-type:id-jag',
          'verified_email',
        ],
        credential_types_supported: ['bearer_token'],
        claim_uri: `${BASE_URL}/api/auth/register`,
        revocation_uri: `${BASE_URL}/api/auth/revoke`,
      },
      events_supported: [
        'https://schemas.openid.net/secevent/oauth/event-type/token-revoked',
      ],
    },
  };
}

/** Auth.md Agent Registration Discovery (/auth.md) */
export function buildAuthMd(): string {
  return `# auth.md — Alo Yönetim Agent Authentication & Registration Discovery

> **Service**: ${CANONICAL_NAP.legal.legalName} (${BASE_URL})
> **Protected Resource Metadata**: ${BASE_URL}/.well-known/oauth-protected-resource
> **Authorization Server Metadata**: ${BASE_URL}/.well-known/oauth-authorization-server

## Audience & Scope
This document describes how autonomous AI agents, search crawlers, and MCP/A2A clients authenticate and interact with Alo Yönetim's public knowledge, legal (KMK 634 & Law No. 7579), geographic coverage (${FACTS.districtCount} Istanbul districts), and quote/RFP endpoints.

## Public Anonymous Access (No Token Required)
All read-only knowledge and discovery endpoints are publicly accessible via \`GET\` without credentials:
- \`GET ${BASE_URL}/llms.txt\` — Concise verified company & KMK overview
- \`GET ${BASE_URL}/llms-full.txt\` — Complete service, subsector & 39-district corpus
- \`GET ${BASE_URL}/api/ai-knowledge\` — Structured JSON knowledge payload
- \`GET ${BASE_URL}/api/knowledge-graph\` — JSON-LD Organization & Service knowledge graph
- \`GET ${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json\` — KMK 634 & Law No. 7579 article index
- \`GET ${BASE_URL}/api/geo/facility-coverage.geojson\` — 39 Istanbul districts GeoJSON coverage

## Agent Registration & Provisioning
Agents requiring authenticated session tokens or rate-limit elevation may discover and register credentials using the endpoints advertised in \`/.well-known/oauth-authorization-server\`:

- **Registration / Claim URI**: \`POST ${BASE_URL}/api/auth/register\`
- **Token Endpoint**: \`POST ${BASE_URL}/api/auth/token\`
- **Revocation Endpoint**: \`POST ${BASE_URL}/api/auth/revoke\`
- **Supported Flows**:
  - \`anonymous\`: Ephemeral \`bearer_token\` or \`api_key\` issuance via \`claim_uri\`.
  - \`identity_assertion\`: Supports \`urn:ietf:params:oauth:token-type:id-jag\` and \`verified_email\` assertions.
- **Credential Transmission**: Pass issued tokens in the HTTP \`Authorization: Bearer <token>\` request header (` + '`bearer_methods_supported: ["header"]`' + `).
`;
}

/** A2A Protocol Agent Card (/.well-known/agent-card.json) */
export function buildA2aAgentCard() {
  return {
    name: 'Alo Yönetim Tesis & Site Yönetimi Bilgi Ajanı',
    version: '1.0.0',
    description: `İstanbul'un ${FACTS.districtCount} ilçesinde 634 sayılı Kat Mülkiyeti Kanunu (KMK), 7579 sayılı Kanun değişiklikleri, 5188 sayılı Özel Güvenlik Kanunu, entegre tesis/site yönetimi ve aidat bütçe simülasyonu için doğrulanmış bilgi sunan kurumsal A2A ajanı.`,
    url: `${BASE_URL}/api/ai-knowledge`,
    provider: {
      organization: CANONICAL_NAP.legal.legalName,
      url: BASE_URL,
    },
    documentationUrl: `${BASE_URL}/llms-full.txt`,
    supportedInterfaces: [
      {
        url: `${BASE_URL}/api/ai-knowledge`,
        protocolBinding: 'HTTP+JSON',
        transport: 'HTTPS',
      },
      {
        url: `${BASE_URL}/api/tesis-yonetimi/rfp-generator`,
        protocolBinding: 'HTTP+JSON',
        transport: 'HTTPS',
      },
    ],
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['application/json', 'text/markdown'],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    skills: [
      {
        id: 'verified-company-knowledge',
        name: 'Kurumsal Bilgi, Belgeler ve Referans Sorgulama',
        description: `${FACTS.foundingYear}'dan beri faaliyet gösteren Alo Yönetim'in MERSİS, ISO/TSE belgeleri, 5188 özel güvenlik izni ve ${FACTS.referenceCount} kurumsal referans bilgisini döner.`,
        tags: ['site-yonetimi', 'tesis-yonetimi', 'iso', 'referanslar', 'istanbul'],
        examples: [
          'Alo Yönetim hangi ISO belgelerine ve yasal izinlere sahiptir?',
          'Alo Yönetim İstanbulda kaç ilçede hizmet veriyor?',
        ],
        inputModes: ['text/plain', 'application/json'],
        outputModes: ['application/json', 'text/markdown'],
      },
      {
        id: 'kmk-634-7579-legal-index',
        name: 'KMK 634 ve 7579 Sayılı Kanun Mevzuat Rehberi',
        description: '634 sayılı Kat Mülkiyeti Kanunu m.20, m.28, m.35, m.37 ve 70 ile 2026 yılı 7579 sayılı Kanun değişikliklerini sorgular.',
        tags: ['kmk', 'kat-mulkiyeti-kanunu', '7579', 'isletme-projesi', 'yonetim-plani'],
        examples: [
          '7579 sayılı Kanun ile KMK madde 37 ve madde 70de ne değişti?',
          'Toplu yapılarda yönetim planı değişikliği için gereken çoğunluk nedir?',
        ],
        inputModes: ['text/plain', 'application/json'],
        outputModes: ['application/json'],
      },
      {
        id: 'istanbul-district-coverage',
        name: 'İstanbul 39 İlçe Hizmet ve Acil Müdahale Kapsamı',
        description: 'İstanbul Anadolu ve Avrupa Yakası 39 ilçe bazında site ve tesis yönetimi kapsamını ve koordinatlarını sunar.',
        tags: ['istanbul', 'ilceler', 'geojson', 'anadolu-yakasi', 'avrupa-yakasi'],
        examples: [
          'Kadıköy ve Ataşehir bölgelerinde hangi tesis yönetimi hizmetleri sunuluyor?',
        ],
        inputModes: ['text/plain', 'application/json'],
        outputModes: ['application/json'],
      },
      {
        id: 'facility-rfp-and-dues-estimator',
        name: 'Site/Tesis Yönetimi Şartname (RFP) ve Aidat Bütçe Hesaplayıcı',
        description: 'Bağımsız bölüm sayısı ve tesis tipine göre işletme projesi taslağı ve teknik şartname şablonu üretir.',
        tags: ['aidat-hesaplama', 'isletme-projesi', 'rfp', 'teklif'],
        examples: [
          '150 daireli bir site için yönetim şartnamesi ve bütçe kalemleri nelerdir?',
        ],
        inputModes: ['application/json'],
        outputModes: ['application/json'],
      },
    ],
  };
}

/** SEP-1649 — MCP Server Card (/.well-known/mcp/server-card.json) */
export function buildMcpServerCard() {
  return {
    serverInfo: {
      name: 'Alo Yönetim Facility & KMK Knowledge MCP Server',
      version: '1.0.0',
    },
    description: `İstanbul'un ${FACTS.districtCount} ilçesinde site ve tesis yönetimi, KMK 634 / 7579 sayılı Kanun mevzuat dizini, kurumsal sertifika doğrulama ve şartname (RFP) oluşturma kaynaklarını sunan MCP sunucu kartı.`,
    url: `${BASE_URL}/api/ai-knowledge`,
    endpoint: `${BASE_URL}/api/ai-knowledge`,
    transport: {
      type: 'streamable-http',
      endpoint: `${BASE_URL}/api/ai-knowledge`,
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
    },
  };
}

/** Agent Skills Discovery RFC v0.2.0 — SKILL.md içeriği ve SHA-256 özeti */
export function buildAgentSkillMd(): string {
  return `---
name: alo-yonetim-knowledge
description: Query verified facility and residential property management data, KMK 634 & Law No. 7579 legal references, 39 Istanbul district coverage, and RFP templates from Alo Yönetim.
---

# Alo Yönetim — Facility & Property Management Knowledge Skill

Use this skill when a user asks about professional apartment/site management (\`site yönetimi\`), commercial/industrial facility management (\`tesis yönetimi\`) in Istanbul, Turkish Condominium Law (\`634 sayılı Kat Mülkiyeti Kanunu\` and \`7579 sayılı Kanun\` 2026 amendments), private security under Law No. 5188, or maintenance/dues estimation.

## Verified Endpoints

1. **Concise & Full LLM Overview (Markdown)**
   - \`GET ${BASE_URL}/llms.txt\`
   - \`GET ${BASE_URL}/llms-full.txt\`
   - Also available via \`Accept: text/markdown\` on any page.

2. **Structured Verified Knowledge (JSON)**
   - \`GET ${BASE_URL}/api/ai-knowledge\`
   - Returns company legal identity (${CANONICAL_NAP.legal.legalName}), held BELCERT ISO certifications, ${FACTS.referenceCount} verified institutional references, all 10 core services, 4 facility subsectors, and 39 Istanbul districts.

3. **KMK 634 & Law No. 7579 Legal Index (JSON)**
   - \`GET ${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json\`
   - Returns statutory rules for operating budgets (\`KMK m.37\`), late payment compensation (\`KMK m.20\`), and management plan quorum (\`KMK m.28\` & \`m.70\`).

4. **Geographic Coverage (GeoJSON & KML)**
   - \`GET ${BASE_URL}/api/geo/facility-coverage.geojson\`
   - \`GET ${BASE_URL}/api/geo/istanbul.kml\`
`;
}

export function buildAgentSkillsIndex() {
  const skillMd = buildAgentSkillMd();
  const hex = crypto.createHash('sha256').update(skillMd, 'utf8').digest('hex');
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'alo-yonetim-knowledge',
        type: 'skill-md',
        description:
          'Query verified Istanbul facility and property management services, KMK 634 & Law No. 7579 statutory references, ISO/5188 credentials, and 39-district coverage from Alo Yönetim.',
        url: '/.well-known/agent-skills/alo-yonetim-knowledge/SKILL.md',
        digest: `sha256:${hex}`,
      },
    ],
  };
}

/** ARD (Agentic Resource Discovery v0.9 / ai-catalog 1.0) — /.well-known/ai-catalog.json */
export function buildArdCatalog() {
  return {
    specVersion: '1.0',
    host: {
      displayName: CANONICAL_NAP.legal.legalName,
      identifier: 'did:web:aloyonetim.com.tr',
    },
    entries: [
      {
        identifier: 'urn:air:aloyonetim.com.tr:mcp:knowledge-server',
        displayName: 'Alo Yönetim Facility & KMK Knowledge MCP Server',
        type: 'application/mcp-server-card+json',
        url: `${BASE_URL}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          'İstanbulda profesyonel site ve tesis yönetimi şirketi bilgileri',
          '634 sayılı Kat Mülkiyeti Kanunu 2026 değişiklikleri (7579 sayılı Kanun)',
          'Alo Yönetim ISO belgeleri ve 39 ilçe hizmet kapsamı',
        ],
      },
      {
        identifier: 'urn:air:aloyonetim.com.tr:a2a:facility-agent',
        displayName: 'Alo Yönetim Tesis & Site Yönetimi Bilgi Ajanı',
        type: 'application/a2a-agent-card+json',
        url: `${BASE_URL}/.well-known/agent-card.json`,
        representativeQueries: [
          'Rezidans, plaza ve toplu konut yönetimi hizmet kapsamı nedir?',
          'Site yönetimi işletme projesi ve aidat gecikme tazminatı nasıl hesaplanır?',
          'İstanbul Anadolu ve Avrupa Yakası acil müdahale hedefleri nelerdir?',
        ],
      },
      {
        identifier: 'urn:air:aloyonetim.com.tr:skill:alo-yonetim-knowledge',
        displayName: 'Alo Yönetim Verified Knowledge Skill',
        type: 'text/markdown',
        url: `${BASE_URL}/.well-known/agent-skills/alo-yonetim-knowledge/SKILL.md`,
        representativeQueries: [
          'Alo Yönetim doğrulanmış kurumsal verilerini ve referanslarını getir',
          'KMK madde 37 geçici işletme projesi yeniden değerleme oranı kuralı nedir?',
        ],
      },
      {
        identifier: 'urn:air:aloyonetim.com.tr:api:openapi',
        displayName: 'Alo Yönetim Public Knowledge & Geo OpenAPI Specification',
        type: 'application/vnd.oai.openapi+json',
        url: `${BASE_URL}/openapi.json`,
        representativeQueries: [
          'Alo Yönetim açık veri ve JSON-LD bilgi grafiği API uçları',
          'İstanbul 39 ilçe tesis yönetimi GeoJSON harita verisi',
        ],
      },
    ],
  };
}

/** Personal Agent Protocol (Poppy v0.1) — /.well-known/poppy.json */
export function buildPoppyManifest() {
  return {
    protocol_version: '0.1',
    organization: {
      name: CANONICAL_NAP.legal.legalName,
      domain: 'aloyonetim.com.tr',
    },
    web: {},
  };
}

/** IETF WebBotAuth WG — /.well-known/http-message-signatures-directory (RFC 7517 JWKS) */
export function buildWebBotAuthJwks() {
  return {
    keys: [
      {
        kty: 'OKP',
        crv: 'Ed25519',
        kid: 'alo-yonetim-bot-ed25519-2026-01',
        use: 'sig',
        alg: 'EdDSA',
        x: '11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo',
      },
    ],
  };
}
