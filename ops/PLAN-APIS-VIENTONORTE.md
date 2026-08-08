# Plan · APIs en dominio Viento Norte

**Objetivo:** que todas las APIs operativas y de producto respondan bajo **vientonorte.io** (o subdominios controlados), con CORS correcto, auth explícita y health checks.  
**Fecha:** 2026-08-08 · **Dueño:** Rö + Grok · **Estado:** diseño (no deploy de rutas nuevas aún)

---

## 1. Situación actual (medido)

| Superficie | Host live | Estado |
|------------|-----------|--------|
| FO SPA | `vientonorte.io` (Pages) | OK 200 |
| Ops canvas | `vientonorte.io/ops/` | OK · noindex |
| Finanzas $ | `finanzas.vientonorte.io` | OK Worker proxy git |
| Ops Sync | `vientonorte-ops-sync.vientonorte.workers.dev` | OK POST · CORS `.io` + github.io |
| Contact / admin FO | `mi-portafolio-contact.vientonorte.workers.dev` | **workers.dev** · FO usa este URL |
| table-ro AI proxy | `table-ro-ai-proxy…workers.dev` (probable) | CORS solo github.io hoy |
| `api.vientonorte.io` | — | **sin DNS** |
| `ops-sync.vientonorte.io` | — | **sin DNS** |
| `vientonorte.io/api/*` | Pages | **404** (estático, no Worker) |

**Problema central:** la marca vive en `vientonorte.io`, pero las APIs viven en `*.workers.dev` → cookies/WebAuthn, CORS, trust y branding rotos a medio plazo.

FO hardcode (hoy):

```ts
// src/lib/site-contact.ts
VITE_CONTACT_API_URL ?? 'https://mi-portafolio-contact.vientonorte.workers.dev/api/contact'
```

---

## 2. Arquitectura objetivo

```
                    ┌─────────────────────────────────────┐
                    │         vientonorte.io (Pages)        │
                    │  FO · ops HTML · table-ro · static    │
                    └─────────────────────────────────────┘

  api.vientonorte.io  ──CF routes──► Workers (mismo account)
  │
  ├── /v1/contact/*          → mi-portafolio-contact
  ├── /v1/ops-sync           → vientonorte-ops-sync
  ├── /v1/images/*           → mi-portafolio-contact (R2)
  ├── /v1/admin/*            → passkey / github OAuth
  └── /v1/ai/*               → table-ro-ai-proxy

  finanzas.vientonorte.io    → vientonorte-finanzas (ya OK; no mover v1)

  Health: GET api.vientonorte.io/v1/health → { services: {…} }
```

**Principios**

1. **Un subdominio API** (`api.`) — no mezclar API con Pages en el mismo hostname (Pages gana rutas y rompe Workers).  
2. **Versión `/v1`** — permitir breaking changes sin matar FO viejo.  
3. **CORS allowlist** — solo `vientonorte.io`, `www.`, `github.io`, localhost.  
4. **Auth por superficie** — contact público rate-limited; ops-sync token; admin passkey; AI keys en Worker secrets.  
5. **Health + X-VN-Service** headers en cada Worker.  
6. **No secrets en Pages JSON**.

---

## 3. Mapa de servicios → rutas

| Servicio | Worker name | Ruta canónica | Auth |
|----------|-------------|---------------|------|
| Contact form | `mi-portafolio-contact` | `POST api…/v1/contact` | origin + honeypot/rate |
| Images manifest | same | `GET api…/v1/images/manifest` | public |
| Images admin | same | `api…/v1/admin/images/*` | session/passkey |
| Passkeys | same | `api…/v1/admin/passkey/*` | WebAuthn `rpId=vientonorte.io` |
| Ops sync | `vientonorte-ops-sync` | `POST api…/v1/ops-sync` | `X-Ops-Token` |
| Finanzas | `vientonorte-finanzas` | `finanzas.vientonorte.io/*` | public read |
| table-ro AI | `table-ro-ai-proxy` | `POST api…/v1/ai/*` | origin + optional key |

Aliases de compat (3–6 meses):

- `*.workers.dev` sigue vivo  
- FO lee `VITE_API_BASE=https://api.vientonorte.io`  

---

## 4. Fases de implementación

### Fase 0 · Inventario y contratos (0.5 d) ✅ parcialmente

- [x] Listar workers + hosts  
- [x] Medir DNS (api / ops-sync vacíos)  
- [ ] OpenAPI o tabla de paths por Worker (este doc §3)  
- [ ] Decidir: ¿gateway único o routes CF por path?  
  - **Recomendado:** **CF custom routes por Worker** (menos hop, menos SPOF)  
  - Alternativa: un Worker gateway reverse-proxy (más control de `/v1/health` unificado)

### Fase 1 · DNS + rutas Cloudflare (P0 · 0.5–1 d)

1. Cloudflare zone `vientonorte.io` (o registrar/transfer si DNS está en otro sitio).  
2. Crear subdominio:  
   - `api` → Worker routes (proxied).  
3. Por cada Worker, en `wrangler.toml` o dashboard:

```toml
routes = [
  { pattern = "api.vientonorte.io/v1/contact*", zone_name = "vientonorte.io" },
  # o routes más específicas según path real del worker
]
```

**Nota:** Workers en paths compartidos requieren o bien **un** worker en `api.vientonorte.io/*` (gateway) o paths no solapados. Si contact y ops-sync son workers distintos, opciones:

| Opción | Pros | Contras |
|--------|------|---------|
| **A. Subdominios** `contact.`, `ops-sync.`, `ai.` | simple | más hosts |
| **B. Gateway Worker** `api.` → fetch interno | un host | un deploy extra |
| **C. Un monorepo API Worker** | limpio | refactor grande |

**Decisión propuesta VN:** **A corto plazo (P0)** subdominios + finanzas ya hecho; **P1** consolidar en `api.` con gateway.

P0 hostnames:

| Host | Worker |
|------|--------|
| `contact.vientonorte.io` | mi-portafolio-contact |
| `ops-sync.vientonorte.io` | vientonorte-ops-sync |
| `finanzas.vientonorte.io` | vientonorte-finanzas (hecho) |
| `ai.vientonorte.io` | table-ro-ai-proxy |

### Fase 2 · CORS + WebAuthn (P0 · 0.5 d)

- Contact: `ALLOWED_ORIGIN` ya incluye `.io` — verificar preflight desde FO.  
- Ops-sync: ya allow `vientonorte.io` (fix 2026-08-08).  
- table-ro: **hoy solo github.io** → añadir `https://vientonorte.io`.  
- Passkeys: `WEBAUTHN_RP_ID = "vientonorte.io"` ya; **rpId debe matchear host de la página** (ok) y el endpoint debe ser same-site o related origin. Preferir `contact.vientonorte.io` bajo mismo eTLD+1.

### Fase 3 · FO + ops clientes (P0 · 0.5 d)

```bash
# .env.production
VITE_CONTACT_API_URL=https://contact.vientonorte.io/api/contact
VITE_API_BASE=https://contact.vientonorte.io
```

- `site-contact.ts` / `admin-config.ts` → default a host canónico, no workers.dev.  
- Ops Sync UI: `OPS_SYNC_URL` default → `https://ops-sync.vientonorte.io`.  
- table-ro: base URL AI proxy → `https://ai.vientonorte.io`.

### Fase 4 · Observabilidad + health (P1)

- `GET /health` en cada Worker: `{ ok, service, version, ts }`.  
- Dashboard ops “Devices-like” para APIs: panel **API status** (curl desde CI cron).  
- CI job `api-smoke` post-deploy: OPTIONS + GET health + POST contact honeypot dry-run.

### Fase 5 · Gateway `api.vientonorte.io` (P2)

- Worker `vientonorte-api-gateway` con routes internas.  
- Deprecar subdominios en docs; mantener redirect 308.

### Fase 6 · Hardening (P2)

- Rate limit (CF WAF / Worker).  
- Turnstile en contact.  
- Audit logs KV.  
- CF Access en ops-sync (opcional, además del token).

---

## 5. DoD “APIs funcionan en Viento Norte”

| # | Criterio | Cómo |
|---|----------|------|
| D1 | Contact POST desde FO prod 200/202 | Network tab FO |
| D2 | Preflight CORS `Origin: https://vientonorte.io` | curl OPTIONS |
| D3 | Ops Sync desde `/ops` en `.io` | botón Sync |
| D4 | Finanzas ledger == git SSOT | smoke finanzas |
| D5 | Ningún client FO apunta a workers.dev en main | grep CI |
| D6 | DNS api/contact/ops-sync documentados | dig + este doc |
| D7 | Health endpoints verdes en CI | workflow |
| D8 | Passkey register/login en `vientonorte.io` | humano admin |

---

## 6. Orden de trabajo recomendado (sprint)

| Día | Trabajo | Gate |
|-----|---------|------|
| **1** | DNS CF zone + routes `contact.` + `ops-sync.` | dig + OPTIONS CORS |
| **1** | table-ro ALLOWED_ORIGIN + `.io` | OPTIONS |
| **2** | FO env + defaults canónicos · PR preprod | `npm run preprod` + qa:production |
| **2** | Ops Sync URL default canónico | Sync manual Rö |
| **3** | Health endpoints + CI api-smoke | Actions green |
| **Later** | Gateway `api.` + deprecación workers.dev en UI | D5 |

---

## 7. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| DNS no en Cloudflare | Route solo si zone en CF; si no, CNAME a workers.dev (naranja) |
| WebAuthn rpId mismatch | No cambiar `WEBAUTHN_RP_ID` sin migrar credenciales |
| Deploy FO sin env | Defaults en código a hosts canónicos |
| Ops sync CORS regresión | Test OPTIONS en CI por origin |
| Gateway SPOF | Fase 2 primero con subdominios |

---

## 8. Relación con QA pre-prod

Ver [PIPELINE-QA-PREPROD.md](./PIPELINE-QA-PREPROD.md).

```
preprod gate (FO)
  → CI
  → Deploy FO
  → api-smoke (nuevo)
  → humano Test path + contact form 1 envío test
```

---

## 9. Links vivos

- Ops: https://vientonorte.io/ops/  
- Finanzas: https://finanzas.vientonorte.io/  
- Ops Sync (temp): https://vientonorte-ops-sync.vientonorte.workers.dev/  
- Contact (temp): https://mi-portafolio-contact.vientonorte.workers.dev/  
- Checklist humano: [AHORA-CLOSE-CHECKLIST.md](./AHORA-CLOSE-CHECKLIST.md)  
- Preprod: [PIPELINE-QA-PREPROD.md](./PIPELINE-QA-PREPROD.md)  

---

*Diseño 2026-08-08 · implementar Fase 1–3 en próximo bloque técnico (no bloquea Test path humano FO).*
