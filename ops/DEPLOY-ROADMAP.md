# Deploy $ · roadmap P0–P2 (post retro 2026-08-06)

**Canonical live:** https://finanzas.vientonorte.io/  
**Deprecado:** `vientonorte.io/ops/finanzas/` (GH Pages stale hasta orange-cloud)  
**Mail de cierre:** siempre bloque `## Retro deploy` → skill `/cierre-sesion-vn`

## P0 — esta semana

| # | Ítem | DoD | Status |
|---|------|-----|--------|
| 1 | **Repo permanente Worker** (no `/tmp`) + script 1 comando `deploy-finanzas` | `workers/vientonorte-finanzas/` en git + `wrangler deploy` verde | todo |
| 2 | **Orange-cloud apex** *o* deprecación forever (quitar apex de Calendar/docs) | Apex smoke = canónico **o** cero links a apex en Calendar/ops | parcial (docs casi) |
| 3 | **Pipeline datos:** Realm paste → script → ledger → wrangler | Sin editar HTML a mano | todo |
| 4 | **Guardrail UI:** `sum(tasks_ok) ≠ realm_review_ready_n` → banner rojo | No render “feliz” con drift | todo |
| 5 | **Smoke post-deploy** curl assert MTD/split/header | CI o script local 1 cmd | todo |

## P1 — siguiente sprint

| # | Ítem | Status |
|---|------|--------|
| 6 | Monitor 6h: apex vs finanzas vs ledger | todo |
| 7 | Calendar: separar **plan @5.6** vs **ops @4** en eventos | todo |
| 8 | CI: push ledger → deploy worker | todo |
| 9 | App canónica solo same-origin (sin jsd/raw multi-source) | todo |

## P2 — deuda

| # | Ítem | Status |
|---|------|--------|
| 10 | Sessions: anotar números viejos “superseded by Realm RR” | todo |
| 11 | No force-orphan `gh-pages` sitio mínimo otra vez | policy |
| 12 | `ops/README`: canonical $ = finanzas.vientonorte.io | todo |

## Links

- UI: https://finanzas.vientonorte.io/
- Ledger: https://finanzas.vientonorte.io/ledger.json
- Retro plantilla mail: skill `cierre-sesion-vn/RETRO-DEPLOY-MAIL.md`
