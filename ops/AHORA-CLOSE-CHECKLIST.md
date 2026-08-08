# Cerrar AHORA · checklist ejecutable

**Dueño:** Rö (humano) · **Agente no cierra** estos P0  
**Canvas:** [vientonorte.io/ops/](https://vientonorte.io/ops/) · **1 clic:** [HUMAN-ACTIONS.md](./HUMAN-ACTIONS.md)  
**HUs:** [HU-2026-08-06-MVP.md](./HU-2026-08-06-MVP.md)  
**Actualizado:** 2026-08-08

> Objetivo del día (tokens **80 M1 · 10 VN · 10 Post**):  
> cerrar **gap VN** (Test path) y **no matar cash M1** (captura). SEM **$0** hasta Test pass.

---

## Orden de trabajo (recomendado)

| Bloque | Tiempo | Por qué primero |
|--------|--------|-----------------|
| **1 · HU-VN** Test path | 25–40 min | Cierra DS day=Test · desbloquea SEM later |
| **2 · HU-M1** captura | resto del día | 80% tokens · cierra gap $ |
| Post / multi-device | solo si sobra | later · no diluye AHORA |

---

## 1 · `now-hu-vn-test-path` — HU-VN-01/02 Test path FO

**Cierra:** Design Sprint Test del path oferta · **sin SEM spend**.

### Smoke FO (HU-VN-01)

| ☐ | ID | Criterio | URL | pass/fail |
|---|----|----------|-----|-----------|
| ☐ | H2 | Sin breadcrumb «Inicio › Inicio» | https://vientonorte.io/ | |
| ☐ | H4 | Dock **Empezar** → onboarding in-page (no salta a SEM) | https://vientonorte.io/ | |
| ☐ | H5 | CTA free a11y Calendar abre **&lt;30 s** | https://vientonorte.io/ | |
| ☐ | S2 | SEM «Empezar» coherente | https://vientonorte.io/#/consultoria | |
| ☐ | Fav | Favicon / tab branding VN visible | Safari + Chrome | |

### SEO (HU-VN-02)

| ☐ | ID | Criterio | Cómo |
|---|----|----------|------|
| ☐ | HU-01 | Title orgánico **no** es solo “Rodrigo Gaete · UX Lead” (marca VN) | view-source home |
| ☐ | HU-02 | Canonical SEM = path consultoría | view-source `#/consultoria` |
| ☐ | Map | Sitemap lastmod razonable | https://vientonorte.io/sitemap.xml |

### Gate

| ☐ | Criterio |
|---|----------|
| ☐ | **SEM $0** — no Ads spend hasta Test pass (Decider) |
| ☐ | 1 línea en Session del día con tabla pass/fail |
| ☐ | En /ops: marcar **done** el ítem `now-hu-vn-test-path` (solo Rö) |

**DoD:** todas las filas smoke rellenadas · SEO OK o issue documentado · Session stamp · canvas done.

**Links:** [HUMAN-ACTIONS A1–A8](./HUMAN-ACTIONS.md) · [HU MVP](./HU-2026-08-06-MVP.md)

---

## 2 · `now-hu-m1-capture-gap` — HU-M1-01 captura 80%

**Cierra:** gap cash vía horas M1 (no features FO).

| ☐ | ID | Acción | Link / path | DoD |
|---|----|--------|-------------|-----|
| ☐ | B1 | Ver cola Review Ready | https://realm.micro1.ai/ | cola visible |
| ☐ | B2 | Olas captura (**máx 3 claims**) | Realm | F7 → 6 files → Submit |
| ☐ | B3 | LOG + `m1-ledger-sync` | local | MTD / IDs suben |
| ☐ | B4 | Finanzas tras submit | https://finanzas.vientonorte.io/ | ledger ↻ |
| ☐ | B5 | Timebox HOST (si toca) | Calendar MICRO 1 | plan L–J |

**Review Ready (referencia):** `9568 · 9567 · 9566 · 8719 · 8718 · 8717 · 8716 · 8715 · 8714`  
**Regla:** no re-subir RR ya listos.

**DoD parcial del día:** ≥1 ola válida + LOG + ledger;  
**DoD cierre ítem:** capturas del día hechas o gap documentado en Session · canvas **done** (Rö).

**Links:** [HUMAN-ACTIONS B1–B5](./HUMAN-ACTIONS.md) · finanzas.vientonorte.io

---

## Tras cerrar ambos

1. /ops → checkbox done en AHORA (o Sync si editaste canvas).  
2. Session: 2 líneas (VN Test + M1 capturas/MTD).  
3. Opcional: Devices firmas (later) — no bloquea AHORA.  
4. Sprint: si Test pass → `canvas-sprint` / Decide SEM; si fail → issue + no Ads.

---

## No hacer hoy (parking)

- SEM spend / GTM full  
- Publicar packages core (plan, no AHORA)  
- Inventar firmas multi-device  
- Features fuera del storyboard DS  

---

*Generado 2026-08-08 · ops A+B+C (CORS · prune · close checklist).*
