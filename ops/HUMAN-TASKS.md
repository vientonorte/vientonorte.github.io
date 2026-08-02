# Tareas humanas · post #135/#136 + multi-device

**Dueño:** Rö · **Actualizado:** 2026-08-02 (GMac agent)  
**Fuente:** `canvas-state.json` → AHORA + `human_tasks`  
**Ops:** https://vientonorte.io/ops/ · **table-ro:** https://vientonorte.io/table-ro/?view=ops

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
| Firmas multi-device | **pending** |
| Trello Key/Token Admin | **pending** |



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
