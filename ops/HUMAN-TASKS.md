# Tareas humanas · post PR #135

**Dueño:** Rö · **Actualizado:** 2026-07-28  
**Fuente:** `canvas-state.json` → AHORA + bloque `human_tasks`  
**Ops:** https://vientonorte.io/ops/

## Canon FO (empresa)

| Superficie | URL |
|------------|-----|
| Home = embudo | https://vientonorte.io/ |
| SEM = oferta tour | https://vientonorte.io/#/consultoria |
| Legacy embudo | https://vientonorte.io/#/consultoria/embudo → `/` |

**Shipped:** [PR #135](https://github.com/vientonorte/mi-portafolio/pull/135) merge `c31685d` · CI verde.

---

## 1 · Ahora — micro-smoke prod (post-Pages)

Esperar **Deploy to GitHub Pages** verde en main, luego **hard refresh** (o unregister SW).

| # | Criterio | ☐ |
|---|----------|---|
| H1 | `/` = embudo (hero pymes + packs + kickoff) | |
| H2 | Sin breadcrumb «Inicio › Inicio» | |
| H3 | Header primary = **Proceso · Contacto** (Negocios en Más) | |
| H4 | Dock **Empezar** → onboarding / kickoff | |
| H5 | Calendar free a11y abre **&lt;30 s** | |
| S1 | `/#/consultoria` = tour SEM fullscreen **sin dock** | |
| S2 | SEM «Empezar» → home `/` | |
| L1 | `/#/consultoria/embudo` redirige a `/` | |

**Links**

- https://vientonorte.io/
- https://vientonorte.io/#/consultoria
- https://vientonorte.io/#/consultoria/embudo

---

## 2 · Jue 30 — ventana ship

| | |
|--|--|
| **Cuándo** | 10:30–12:30 CLT |
| **Qué** | Si Pages ya deployó: smoke cuenta; si no, re-check AM |
| **Radar** | 13–17 FO **paused** — no solapar |
| **No** | GA / GTM live / SEM spend |

---

## 3 · Vie 31 — retro

| | |
|--|--|
| **Cuándo** | ≤14:00 |
| **Qué** | Retro escrita + seed **DS-2026-08-03** |
| **Decide** | Analytics propia mínima · lab OB-RIA admin (B) sí/no |
| **Parking** | GA full · rename git `mi-portafolio` · terraza CI |

---

## Parking (no humano urgente)

- Publish tokens 0.2.1 + pin multi-repo (core)
- Wire `@vientonorte/a11y` package
- GTM live
