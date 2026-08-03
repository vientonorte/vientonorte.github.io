# Tareas humanas · post #135/#136 + multi-device

**Dueño:** Rö · **Actualizado:** 2026-08-03 (GMac agent) · **P0 humano**  
**Fuente:** `canvas-state.json` → AHORA + `human_tasks`  
**Ops:** https://vientonorte.io/ops/ · **table-ro:** https://vientonorte.io/table-ro/?view=ops  
**SEO ship:** [PR #139](https://github.com/vientonorte/mi-portafolio/pull/139) HU-01…03 (auto-merge CI)

## Canon FO (empresa)

| Superficie | URL |
|------------|-----|
| Home = embudo | https://vientonorte.io/ |
| SEM = oferta tour | https://vientonorte.io/#/consultoria |
| Legacy embudo | https://vientonorte.io/#/consultoria/embudo → `/` |
| Legacy path | https://vientonorte.io/mi-portafolio/ → root (redirect script) |

**Shipped:** [PR #135](https://github.com/vientonorte/mi-portafolio/pull/135) · [PR #136](https://github.com/vientonorte/mi-portafolio/pull/136) MERGED `7b197fd`

## Status tarde 2026-08-02 (ops sync)

| Item | Estado |
|------|--------|
| Smoke #135 + PR #136 | **done** |
| Selfradar → Calendar | **done** (AFC lun · Reforzar 4 ago · Selfradar desc) |
| Echo Dot ↔ Google Calendar | **sync** |
| Empleo SURA cerrado (Obsidian) | **done** |
| Mail Selfradar → Camila | **enviado** (humano) |
| **P0** Firmas multi-device | **pending** · GMac+M5 pass · **I15/W11/GWin/I11** firmar hoy en PIPELINE-QA |
| **P0** Smoke FO H2/H4/H5/S2 | **abierto** · post-deploy #139 · 1× browser hard refresh |
| **P0** Post-deploy + Test path | **gate** · view-source JSON-LD · canonical SEM · **SEM $0** hasta Test embudo |
| Trello Key/Token Admin | pending (no P0 hoy) |
| Pre-Decide DS Map | **B** firmado 03 ago |

---


## P0/P1 · Manual 2026-08-03 (GSC hecho · residual)

| Prioridad | Tarea | Notas |
|-----------|--------|------|
| **Hecho** | GSC verify + sitemap + inspección `/` | HTML file live |
| **P0** | Smoke residual · **favicon** · **H5 free visible** | H2/H4 PASS |
| **P0** | Firmas multi-device I15/W11/GWin/I11 | PIPELINE-QA §6 |
| **P0** | Gate SEM **$0** hasta Test path DS | no spend |
| **P1** | GSC field: cobertura sitemap · CWV · usabilidad móvil | cuando haya datos |

Ops live: https://vientonorte.io/ops/ → **Hoy** · Limpiar draft + Recargar hosted

SSOT: Obsidian `Resources/SEM/2026-08-03 GSC Pruebas y Enlaces.md`

## P0 · 2026-08-03 · QA manual + HUs (checklist mail)

### HUs SEO/SEM (código en PR #139)

| HU | Superficie | DoD humano post-deploy |
|----|------------|------------------------|
| HU-01 | `https://vientonorte.io/` | Title VN · JSON-LD en view-source · no “Rodrigo Gaete · UX Lead” |
| HU-02 | `https://vientonorte.io/#/consultoria` | Canonical = `#/consultoria` · title “Elige tu alcance” |
| HU-03 | sitemap/robots | live sitemap lastmod reciente |
| HU-04 | gate Decider | **no SEM spend** hasta Test path |

### Smoke FO (H2 · H4 · H5 · S2)

| # | Check | URL | pass/fail |
|---|--------|-----|-----------|
| H2 | Sin «Inicio › Inicio» | https://vientonorte.io/ | |
| H4 | Empezar → onboarding (misma página, no SEM) | home | |
| H5 | Calendar free a11y &lt;30 s | free link | |
| S2 | SEM Empezar en oferta | https://vientonorte.io/#/consultoria | |

### Firmas multi-device (same artifact)

Vault Ro `00-sistema/PIPELINE-QA.md` §6 · ops Devices.

```text
- I15 · 2026-08-03 · pass · …
- W11 · 2026-08-03 · pass · …
- GWin · 2026-08-03 · pass · …
- I11 · 2026-08-03 · pass · …
```

GMac + M5 ya pass. No inventar firmas sin abrir device.



---

## 1 · Smoke prod post-#135 (agent 2026-08-02)

| # | Criterio | Result |
|---|----------|--------|
| H1 | `/` embudo signal (bundle + home) | **PASS** agent |
| H2 | Sin «Inicio › Inicio» (chrome FO) | *confirmar 1 click humano* |
| H3 | Header **Proceso · Contacto** en bundle | **PASS** agent |
| H4 | Dock Empezar / onboarding path | **PASS** signal (`onboarding`) · *UI click humano* |
| H5 | Calendar free a11y &lt;30 s | *humano* |
| S1 | `/#/consultoria` SEM en bundle | **PASS** agent |
| S2 | SEM Empezar → home | *humano* |
| L1 | `consultoria/embudo` legacy en bundle | **PASS** agent |
| R1 | `/mi-portafolio/` redirect script live | **PASS** agent (post-#136 deploy) |
| R2 | SW `vn-site-v2` | **PASS** |

**Estado smoke agent:** PASS core · 2–3 checks UI quedan para Rö en browser (H2/H4/H5/S2).

---

## 2 · Multi-device firmas (humano — no inventar)

Same artifact: vault Ro `00-sistema/PIPELINE-QA.md` · ops Devices.

| Nick | Estado GMac | Acción |
|------|-------------|--------|
| GMac | **pass** 2026-08-02 | — |
| I15 | pending | Abrir Ro → pegar one-liner |
| W11 | pending | Pull iCloud espejo → firmar |
| GWin | pending | Sesión en PC W11 → firmar |
| I11 | pending | Ro + calendars ON → firmar |

```text
- I15 · 2026-08-02 · pass · Ro visible · PIPELINE-QA + Sessions 08-02 leídos
- W11 · 2026-08-02 · pass · espejo = Ro 181 md · MICRO 1 HOST/FINANZAS OK
- GWin · 2026-08-02 · pass · online · setup W11 OK · nick OK
- I11 · 2026-08-02 · pass · Ro + Personal/MICRO1/FINANZAS ON
```

**Pre-firma Mac (hecho 2026-08-02):** rsync Ro → Espejo · **181 md** · dry-run empty.

---

## 3 · table-ro Trello

| Capa | Estado |
|------|--------|
| **A · ICS** | **PASS** HTTP 200 feed board Espacio Seguro |
| **B · API Key/Token** | **Bloqueado** — no hay secrets en env/GMac; hay que pegar en Admin browser |
| **C · Bridge GCal** | Depende de B + OAuth |

**Pasos Rö (5 min):**

1. https://trello.com/power-ups/admin → API Key + Token (lectura)  
2. https://vientonorte.io/table-ro/ → ⚙️ Admin → pegar Key/Token → Guardar  
3. Status **Key ✓ · Token ✓** → **Sync Trello**  
4. Filtro 💚 Camila · cards con due + RO/Rö  

Doc: `table-ro/docs/TRELLO-GOOGLE.md`

---

## 4 · Día laboral (Calendar)

SoT: `Documents/MICRO 1/00-canon/CALENDAR-HOST-MICRO1.md`  
Títulos sin prefijo TB (limpieza 2026-08-02).

---

## Parking

- Publish tokens core 0.2.1  
- GTM live / SEM spend — no sin Decide post-Test DS  
- Firmas device + Trello B
