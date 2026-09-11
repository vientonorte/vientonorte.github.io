---
tags: [scrum, devops, finanzas, ssot]
updated: 2026-08-06
status: live
---

# Finanzas $ · DevOps + Scrum (anti-confusión)

## 1. Una sola verdad (Definition of Ready)

| Rol | URL / path | ¿Decidir $? |
|-----|------------|-------------|
| **PRODUCCIÓN (SoT)** | https://finanzas.vientonorte.io/ | **SÍ** — único canónico |
| Smoke ledger | https://finanzas.vientonorte.io/ledger.json | SÍ |
| Health | https://finanzas.vientonorte.io/__ssot | SÍ (worker v21+) |
| **Staging / fallback** | https://vientonorte.github.io/ops/finanzas/ | Solo si live 502 |
| **DEV preview** | `MICRO 1/07-pagos(1)/dashboard/index-ssot-live.html` | **NO** — solo UI hack |
| jsDelivr / pins | — | **PROHIBIDO** |
| Apex `vientonorte.io/ops/finanzas/` | — | **DEPRECADO** |

**Regla de oro:** si local ≠ live, **live miente o no está deployado**. No inventar un tercer número.

## 2. Pipeline (Definition of Done · un commit)

```text
Realm (claims)
  → ledger.json (PC / script)
  → git push ops/finanzas/ledger.json + index.html   [obligatorio]
  → Worker v21 proxy lee git main                    [1× wrangler si cambió worker]
  → smoke: curl __ssot  today/mtd == ledger
  → UI: Reset local si cambió KEY
```

| Paso | Owner | Bloquea $ |
|------|-------|-----------|
| Actualizar ledger | Trainer / Grok cierre | Sí |
| `git push` main | Grok / Ro | Sí |
| `wrangler deploy` | **Solo si cambió `workers/`** | Sí (1ª vez v21) |
| Mirar local HTML | — | **No cuenta como deploy** |

### Tras Worker v21-git-proxy

- **Cada push a `ops/finanzas/*` actualiza live sin re-wrangler.**
- Wrangler solo si tocás `workers/vientonorte-finanzas/src`.

## 3. Scrum · board

### Sprint goal (P0 · esta semana)

> **Un dominio, un número, cero copias “casi iguales”.**

| ID | Historia | DoD | Status |
|----|----------|-----|--------|
| F1 | Worker proxy git (no assets stale) | header `worker-v21-git-proxy` · `__ssot` = git | **code ready · falta wrangler 1×** |
| F2 | UI “Faltan a meta” día/sem/mes | visible en SoT | done en git |
| F3 | Prohibir 3 fuentes en docs/skills | solo finanzas. + staging | done docs |
| F4 | Smoke 1 comando post-cierre | `scripts/Smoke-FinanzasSsot.ps1` PASS | done script |
| F5 | Cierre Micro1 no diga “abrí local” | skill micro1-cierre | done |

### No hacer (anti-pattern)

- Abrir **3 pestañas** (local + pages + live) y promediar
- “Está bien en local” = deploy
- Subir ledger solo a iCloud sin `git push`
- Usar jsDelivr pin de commit viejo
- Embeber SSOT en Worker assets como verdad

## 4. Roles

| Rol | Responsabilidad |
|-----|-----------------|
| **PO (Ro)** | Meta $ / ops t/h / qué es “meta propuesta” |
| **Dev (Grok/GWin)** | Ledger + UI + worker code + push |
| **Ops (Ro 1×)** | `wrangler login` + deploy cuando cambia worker |
| **QA** | Smoke `__ssot` + UI Reset · MTD = Realm |

## 5. Ceremonias mínimas

| Evento | Cuándo | Artefacto |
|--------|--------|-----------|
| **Daily $** | TB15 | UI SoT + Realm |
| **Cierre día** | EOD | `/micro1-cierre` · mail con `## Retro deploy` |
| **Sprint review $** | Dom TB45 | MTD vs meta mes · faltan t |

## 6. Retro deploy (mail obligatorio)

```text
## Retro deploy
- Canonical: https://finanzas.vientonorte.io/
- Worker: worker-v21-git-proxy (o NO si aún v20)
- Git SHA: …
- Smoke __ssot: today=X mtd=Y
- Bloqueo: wrangler? none
- P0 mañana: …
```

## 7. Comando humano (desbloqueo live)

```bat
cd %USERPROFILE%\iCloudDrive\Documents\GitHub\vientonorte.github.io\workers\vientonorte-finanzas
npx wrangler login
deploy-finanzas.cmd
```

Luego: hard refresh + **Reset local** en el browser.

— Scrum Finanzas · 2026-08-06
