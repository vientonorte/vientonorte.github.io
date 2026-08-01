# Tareas humanas · QA manual destacado

**Dueño:** Rö · **Actualizado:** 2026-08-01  
**Fuente:** `canvas-state.json` → AHORA + bloque `human_tasks`  
**Ops:** https://vientonorte.io/ops/ → pestaña **Hoy**

> **Regla:** el agente (GMac) puede medir proxy (headless / curl).  
> **No cierra** ítems marcados `HUMANO` / `qa_manual`.  
> Solo Rö marca done tras checklist en **browser real**.

---

## 0 · Destacado ahora

| Prioridad | Ítem | Estado |
|-----------|------|--------|
| **P0 HUMANO** | **QA manual prod post-#135** | **todo** · abierto en AHORA |
| HUMANO | Firmas I15 + W11 en PIPELINE-QA | todo · multi-device |

**No confundir:** proxy GMac headless 2026-08-01 = señal, **no** DoD.

---

## Canon FO (empresa)

| Superficie | URL |
|------------|-----|
| Home = embudo | https://vientonorte.io/ |
| SEM = oferta tour | https://vientonorte.io/#/consultoria |
| Legacy embudo | https://vientonorte.io/#/consultoria/embudo → home |

**Shipped código:** [PR #135](https://github.com/vientonorte/mi-portafolio/pull/135) merge · CI + Deploy Pages verde (2026-07-28).

---

## 1 · HUMANO · QA manual prod (post-Pages #135)

**Antes:** hard refresh (o unregister SW si ves UI stale).

| # | Criterio | ☐ humano |
|---|----------|----------|
| H1 | `/` = embudo (hero pymes + packs + kickoff) | |
| H2 | Sin breadcrumb «Inicio › Inicio» | |
| H3 | Header primary = **Proceso · Contacto** (Negocios en Más) | |
| H4 | Dock / CTA **Empezar** → `#consultoria-onboarding` | |
| H5 | Calendar free a11y abre **&lt;30 s** | |
| S1 | `/#/consultoria` = tour SEM fullscreen **sin dock** | |
| S2 | SEM «Empezar» → home `/` | |
| L1 | `/#/consultoria/embudo` se ve como embudo home | |

**Links**

- https://vientonorte.io/
- https://vientonorte.io/#/consultoria
- https://vientonorte.io/#/consultoria/embudo
- Tablero: https://vientonorte.io/ops/ (ítem AHORA con badge **HUMANO**)

**Cuando pases:** marca el checkbox en /ops Hoy **o** pide a GMac archivar `now-human-prod-smoke` con nota “Rö smoke manual PASS”.

---

## 2 · HUMANO · Firmas multi-device

Same artifact: vault Ro `00-sistema/PIPELINE-QA.md` · UI Devices en /ops.

```text
- I15 · 2026-08-01 · pass · Ro visible · PIPELINE-QA + CIERRE leídos
- W11 · 2026-08-01 · pass · espejo = Ro · MICRO 1 handoff OK
```

GMac ya **pass**. No inventar firmas de devices no abiertos.

---

## Archivado (ventana pasada)

- Jue 30 ventana ship · Vie 31 retro → en `done_archive` del canvas (window_elapsed).

## Parking (no humano urgente)

- Publish tokens 0.2.1 + pin multi-repo (core)
- Wire `@vientonorte/a11y` package
- GTM live

— GMac · 2026-08-01 · QA manual dejado abierto · humano destacado
