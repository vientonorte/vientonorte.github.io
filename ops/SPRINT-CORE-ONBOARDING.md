# Sprints siguientes · Core bien → Onboarding + ambientes

**Tablero:** https://vientonorte.io/ops/  
**Finanzas $:** https://vientonorte.io/ops/finanzas/  
**Core monorepo:** https://github.com/vientonorte/vientonorte-core  
**Packages:** https://github.com/vientonorte?tab=packages · [packages-status.md](./packages-status.md)  
**Canon packages:** https://github.com/vientonorte/vientonorte-core/blob/main/docs/PACKAGES-CORE.md  

Actualizado: **2026-08-02** · Decider: Rö

---

## Orden de sprints

| # | Nombre | Objetivo | Repo foco | Estado |
|---|--------|----------|-----------|--------|
| 0 | DS path oferta / analytics (activo o en ventana) | Superficies FO medibles | mi-portafolio | `active_sprint` canvas |
| **1 · Siguiente** | **Usar vientonorte-core bien** | Design system versionado, sin copiar tokens; pin real multi-repo | **vientonorte-core** + consumidores | **next** |
| **2 · Después** | **Onboarding + ambientes pub/priv** | Entrada clara al producto; env público vs privado | FO + core + hub | **next+1** |

---

## Sprint 1 · Usar vientonorte-core bien

### Por qué

Hoy hay packages publicados (`@vientonorte/tokens|ui|a11y|security|cli|analytics`) y FO/table-ro ya consumen, pero el **uso “bien”** =:

1. Publish reproducible (PAT `write:packages` + Actions verde).
2. Pins alineados (no drift 0.2.0 vs 0.2.1 fantasma).
3. **Una** fuente de tokens/UI — no CSS paralelo en FO.
4. Storybook / docs de consumo legibles para el siguiente onboarding.
5. CI de cada app con `NODE_AUTH_TOKEN` + registry GitHub Packages.

### DoD (Definition of Done)

| # | Criterio | Evidencia |
|---|----------|-----------|
| C1 | `pnpm` monorepo core build+test verde local | log M5 |
| C2 | Workflow **Publish** corre sin error o doc de bloqueo real | Actions run URL |
| C3 | mi-portafolio + table-ro pins = latest documentado en packages-status | package.json + status md |
| C4 | FO no redefine `--vn-*` fuera de tokens package (audit grep) | PR o nota audit |
| C5 | `vientonorte init` (cli) genera app que resuelve packages | smoke 1 app scaffold |
| C6 | packages-status.md actualizado en /ops | commit ops |

### Fuera de alcance (este sprint)

- Onboarding de usuario final (eso es sprint 2).
- Ambientes privados productivos (sprint 2).
- Redesign visual full Figma → código (solo consumir lo ya en tokens/ui).

### Checklist trabajo

```text
[ ] Leer docs/PACKAGES-CORE.md + publish-packages.md
[ ] Auditar pins en mi-portafolio, table-ro, uxtools, aruma, dashfin
[ ] Cerrar plan-brand-core / plan-publish-core del canvas
[ ] Actualizar packages-status.md
[ ] Smoke: app FO local con @vientonorte/ui Button + tokens
```

### Links

- Figma DS: https://dot-wool-76997229.figma.site  
- Canvas items: `plan-brand-core-021`, `plan-publish-core`  
- Storybook monorepo: `vientonorte-core/apps/storybook`

---

## Sprint 2 · Onboarding + ambientes públicos y privados

### Por qué

Con core bien cableado, el siguiente valor de producto es:

1. **Onboarding** — lead / pyme / consultoría entra sin fricción (path ya empezado en FO; formalizar con core UI + a11y).
2. **Ambiente público** — lo que ve el mundo (vientonorte.io, demos, oferta, free a11y).
3. **Ambiente privado** — lo que solo Rö / cliente / lab ve (ops, admin lab OB-RIA park, archivo, packages privados, dashboards sensibles).

### Mapa de ambientes (borrador)

| Ambiente | Superficie | Auth | Core |
|----------|------------|------|------|
| **Público** | vientonorte.io FO, demos, embudo, free a11y calendar | ninguna / form | tokens+ui+a11y |
| **Semi** | table-ro brand, Storybook hosted (si se publica) | opcional | ui+tokens |
| **Privado** | /ops (operativo), lab admin, MICRO1 tools, dashfin | humano / no index | security + ops |
| **Registry** | GitHub Packages `@vientonorte/*` | PAT / GITHUB_TOKEN | publish |

### DoD (alto nivel)

| # | Criterio |
|---|----------|
| O1 | Flujo onboarding consultoría: 1 path documentado + medible (evento o checklist QA) |
| O2 | Matriz público vs privado en ops (esta tabla viva, sin ambigüedad de URL) |
| O3 | Privado no se indexa (robots / no-link / auth plan) |
| O4 | Onboarding usa componentes `@vientonorte/ui` + a11y (skip link, focus) |
| O5 | Finanzas $ permanece en /ops (privado operativo), no en embudo público |

### Dependencia

**Sprint 2 empieza cuando C1–C6 del Sprint 1 están done o parked con dueño.**

---

## Canvas · items propuestos (state)

Ids en `canvas-state.json` (plan):

- `plan-sprint-core-well` — Usar vientonorte-core bien (DoD C1–C6)
- `plan-sprint-onboarding-envs` — Onboarding + ambientes pub/priv (DoD O1–O5)
- Link finanzas: `https://vientonorte.io/ops/finanzas/`

---

## Relación con Finanzas $

El dashboard **no** es el producto FO. Vive en **ops** (operación Rö):

- Live: `/ops/finanzas/`
- Espejo: `Documents/MICRO 1/07-pagos/dashboard/`
- Meta mes: **1.6M CLP** · Trainer pace documentado en ledger

Onboarding/ambientes del Sprint 2 **no** mueven finanzas al embudo público.

---

— GMac · 2026-08-02 · seed siguiente sprint VN
