---
title: Auditoría profunda · prácticas de codificación VN
date: 2026-08-08
type: audit
ssot: true
tags:
  - audit
  - coding-practices
  - viento-norte
  - fo
  - security
  - devops
  - ssot
status: closed-synthesis
method: 5-agent-parallel-explore
composite_grade: "C− / D+"
scope:
  - mi-portafolio
  - workers
  - vientonorte.github.io/ops
  - table-ro
  - CI/deploy
ssot_paths:
  ops_live: "https://vientonorte.io/ops/AUDIT-CODING-PRACTICES-2026-08-08.md"
  ops_raw: "https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/AUDIT-CODING-PRACTICES-2026-08-08.md"
  hub_repo: "vientonorte.github.io/ops/AUDIT-CODING-PRACTICES-2026-08-08.md"
  obsidian_ro: "Viento Norte/Resources/AUDIT-CODING-PRACTICES-2026-08-08.md"
  session_log: "Viento Norte/Sessions/2026-08-08.md"
p0_ids:
  - P0-1
  - P0-2
  - P0-3
  - P0-4
  - P0-5
  - P0-6
agent_ids:
  architecture: "019fe28c-92c5-70e3-962b-71b6256d0820"
  security: "019fe28c-92c5-70e3-962b-71c650024476"
  tests_qa: "019fe28c-92c5-70e3-962b-71d323761eb2"
  ts_react: "019fe28c-92c5-70e3-962b-71e3a6017e05"
  devops: "019fe28c-92c5-70e3-962b-71fb361bf932"
---

# Auditoría profunda · prácticas de codificación VN

**Fecha:** 2026-08-08  
**Método:** 5 agentes explore en paralelo (read-only) + síntesis  
**Scope:** `mi-portafolio` FO · workers · ops hub · table-ro · CI/deploy  
**Composite:** **C− / D+**

## SSOT · rutas canónicas

| Destino | Path |
|---------|------|
| **Ops live (público)** | https://vientonorte.io/ops/AUDIT-CODING-PRACTICES-2026-08-08.md |
| **GitHub raw** | https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/AUDIT-CODING-PRACTICES-2026-08-08.md |
| **Repo hub** | `vientonorte.github.io/ops/AUDIT-CODING-PRACTICES-2026-08-08.md` |
| **Obsidian Ro** | `Viento Norte/Resources/AUDIT-CODING-PRACTICES-2026-08-08.md` |
| **Session log** | `Viento Norte/Sessions/2026-08-08.md` § Auditoría coding practices |

> **Regla:** editar primero el archivo en **hub ops** (este), luego espejar a Obsidian. No divergir tablas P0.

---

## Notas por eje (5 agentes)

| # | Eje | Grade | One-liner |
|---|-----|-------|-----------|
| 1 | **Arquitectura / modularidad** | **D** | Packages y atomic design documentados; FO es Figma-Make + shadcn local sin consumir `@vientonorte/*` |
| 2 | **Seguridad / auth / secrets** | **D** | CORS y secrets model decentes; WebAuthn admin es teatro; AI proxy = CORS only; ops público |
| 3 | **Tests / QA gates** | **C+** | Buen andamiaje y límite humano; aserciones blandas y “CI-equivalent” oversold |
| 4 | **TS / React quality** | **B−** | Contact/nav/lazy sólidos; `strict: false`, god pages, i18n dual |
| 5 | **DevOps / multi-repo** | **C** | Deploy post-CI bueno; race FO clobber ops; dual Pages publishers |

### **Composite (roll-up): C− / D+**

Prácticas **locales** (scripts, CORS consciente, contact form, ROUTES) superan la **arquitectura de sistema** (SoT multi-escritor, auth admin, packages reales).

---

## P0 — arreglar antes de confiar en admin / ship sensible

| ID | Sev | Hallazgo | Evidencia | Fix |
|----|-----|----------|-----------|-----|
| P0-1 | **S0** | WebAuthn admin **no verifica** crypto; session mintable | `worker/src/admin/passkey.js` | `@simplewebauthn/server` o deshabilitar passkey login |
| P0-2 | **S0** | FO deploy clona hub T1/T2 y **puede pisar `ops/` más nuevo** | `deploy.yml` bundle ops + publish | No reescribir `ops/**` desde dist viejo; re-fetch ops en T2 o rsync path-scoped |
| P0-3 | **S0** | `@vientonorte/*` en package.json **sin imports** en `src/` | grep + `vn-tokens.css` “GENERADO” | Integrar de verdad **o** quitar deps + docs honestos |
| P0-4 | **S1** | table-ro AI proxy: keys solo detrás de CORS | `table-ro/worker/src/index.js` | Secret header / CF Access + rate limit |
| P0-5 | **S1** | Dual/triple publisher Pages (FO + hub deploy-pages + gh-pages orphan) | 3 workflows | Un solo owner de `vientonorte.io` |
| P0-6 | **S1** | Image registry FO TS ≠ worker JS | `image-registry.ts` vs `.js` | Generar en CI; fail on drift |

---

## P1 — calidad de producto y gates honestos

| ID | Tema | Acción |
|----|------|--------|
| P1-1 | Contact multi-canal | Worker-only en prod; Forms/FormSubmit flag o fuera |
| P1-2 | preprod “CI-equivalent” | Default incluir routes; o renombrar a L1; alinear docs |
| P1-3 | CI | Añadir `lint`; Lighthouse en CI o dejar de reclamarlo |
| P1-4 | qa-routes | Marcadores por ruta; no blanquear 404 assets |
| P1-5 | Root `strict: true` | Un tsconfig; reducir exclude |
| P1-6 | i18n | Matar ternarios `es ? …` en páginas grandes |
| P1-7 | Ops público | CF Access o aceptar intel pública; escape total innerHTML |
| P1-8 | Ops token | No long-lived localStorage; o Access delante de Sync |

---

## P2 — higiene de código

- Archivar `V2/`, `frontend/`, `backend/`, orphans (`Buscador`, `ExportarCSV`)
- Un Skeleton / SectionDivider / metric card family
- Matar alias Vite versionados `@radix…@1.1.2`
- Unificar analytics (`VNTracker` vs `lib/analytics`)
- `STATIC_IMAGE_BASE` sin `/mi-portafolio`
- Borrar `ops/*(1).*` duplicates
- Worker contact: rate limit + OAuth callback sin Origin
- Shared `@vientonorte/contracts` paths/types

---

## Fortalezas (no tirar)

1. **Límite humano documentado** — agente no cierra Test path; AHORA-CLOSE  
2. **Deploy FO fail-closed** — `workflow_run` + SHA pin post-CI  
3. **Domain-root gates** — ban `/mi-portafolio/assets` en deploy + qa:production  
4. **Contact form craft** — consent, honeypot, draft session, multi-fallback (exceso de canales es el problema)  
5. **CORS ops-sync** — allowlist exacta (regresión aprendida)  
6. **Lazy + ErrorBoundary + chunk retry**  
7. **Finanzas worker git-proxy + `__ssot`** — SoT honesto post-CDN pain  
8. **Nav/routes tests** — `nav-config`, `routes`, Playwright matrix amplia  
9. **CLI `vn-qa` / preprod-gate / canvas-sprint** — cultura local-first  

---

## Scores dimensionales

| Dimensión | Grade |
|-----------|-------|
| Boundaries & packages | D |
| Security auth | D (admin S0) |
| Testing honesty | C+ |
| TS/React craft | B− |
| Release multi-repo | C |
| Docs honesty | D+ |
| Human QA protocol | **B+** |

---

## Roadmap 3 sprints (prácticas)

### Sprint A — Safety (1–2 d)
1. Disable or rewrite WebAuthn verify  
2. FO deploy: never clobber ops (path-scoped publish)  
3. AI proxy auth + rate limit  
4. Kill dual gh-pages orphan workflow  

### Sprint B — Honesty (2–3 d)
1. Packages real or remove  
2. Image registry SSOT codegen  
3. preprod/CI/docs alignment + lint in CI  
4. Contact channel collapse  

### Sprint C — Craft (ongoing)
1. `strict: true`  
2. Split ProjectDetail / PocProductOnboarding  
3. i18n one path  
4. Contracts package FO↔worker  

---

## Fuentes (agentes)

| Agent | ID (resume) |
|-------|-------------|
| Architecture | `019fe28c-92c5-70e3-962b-71b6256d0820` |
| Security | `019fe28c-92c5-70e3-962b-71c650024476` |
| Tests/QA | `019fe28c-92c5-70e3-962b-71d323761eb2` |
| TS/React | `019fe28c-92c5-70e3-962b-71e3a6017e05` |
| DevOps | `019fe28c-92c5-70e3-962b-71fb361bf932` |

---

## Lectura ejecutiva

El stack **sabe** buenas prácticas (gates, allowlists, noindex, human residual, lazy load) y las **implementa a medias** en los puntos de alto privilegio (admin passkey, multi-writer hub, packages).  

**No es código junior.** Es un FO de producto con **deuda de sistema** y **overclaim de arquitectura/CI**.  

Prioridad absoluta: **P0-1 (passkey)** y **P0-2 (ops clobber)** antes de más features FO.

---

## Bloque mail (copiar)

**Asunto:** VN · SSOT auditoría coding practices 2026-08-08 · composite C−/D+ · 6 P0

```
Rö — auditoría SSOT lista (correo + Obsidian + Sessions).

SSOT live:
https://vientonorte.io/ops/AUDIT-CODING-PRACTICES-2026-08-08.md

Obsidian:
Viento Norte/Resources/AUDIT-CODING-PRACTICES-2026-08-08.md
Session log:
Viento Norte/Sessions/2026-08-08.md

Composite: C− / D+  (5 agentes)

P0 (orden):
1. Passkey admin sin verify crypto (S0) → off o simplewebauthn
2. Deploy FO puede clobber ops/ (S0)
3. @vientonorte/* declarado no usado (S0)
4. AI proxy table-ro solo CORS (S1)
5. Dual/triple Pages publisher (S1)
6. Image registry FO≠worker (S1)

Sprint A Safety: passkey · no-clobber ops · AI auth · un Pages
Antes de SEM gasto serio: Test path humano + (ideal) GTM; auditoría no bloquea embudo soft-launch.

— Grok · 2026-08-08
```

---

## Bloque Session log (plantilla)

```markdown
### Auditoría coding practices · 5 agentes
- **SSOT:** [[AUDIT-CODING-PRACTICES-2026-08-08]] · https://vientonorte.io/ops/AUDIT-CODING-PRACTICES-2026-08-08.md
- **Composite:** C− / D+
- **P0:** passkey admin · ops clobber deploy · packages theater · AI CORS · dual Pages · image registry
- **Next:** Sprint A Safety (antes de confiar admin / ship sensible)
- **SEM lunes:** embudo usable; medición GTM no en shell; residual humano H4/H5
```

*Síntesis 2026-08-08 · 5 agentes Grok explore · SSOT multi-destino*
