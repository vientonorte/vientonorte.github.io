# /ops · Canvas operativo Viento Norte

**Live:** https://vientonorte.io/ops/ · https://vientonorte.github.io/ops/  
**Privacidad:** `noindex` en HTML + `robots.txt` Disallow `/ops/` — **no es auth**; no subir secretos al JSON.

## Usabilidad

- **Hoy** — solo ítems abiertos de AHORA (máx. 3).
- **Canvas** — Eisenhower; hechos ocultos por defecto.
- **Roadmap** — P0–P3 secundario.
- **Devices** — tablero multi-device (`sync_board`). [SYNC-BOARD.md](./SYNC-BOARD.md).
- **Finanzas $** — canónico [finanzas.vientonorte.io](https://finanzas.vientonorte.io/) · mirror [finanzas/](./finanzas/).
- **Guía** — loops sprint / packages / multi-device.
- **Cerrar AHORA** — [AHORA-CLOSE-CHECKLIST.md](./AHORA-CLOSE-CHECKLIST.md) · [HUMAN-ACTIONS.md](./HUMAN-ACTIONS.md).
- **QA pre-prod** — [PIPELINE-QA-PREPROD.md](./PIPELINE-QA-PREPROD.md) · `npm run preprod` · workflow `/preprod-qa`.
- **Catálogo skills** — [skills/](./skills/) · `/vn-agent` · `/check-work` · `/check-safety` · `/org-hygiene` · `/preprod-qa`.
- **APIs dominio** — [PLAN-APIS-VIENTONORTE.md](./PLAN-APIS-VIENTONORTE.md) (`contact.` · `ops-sync.` · `api.`).
- **Auditoría coding practices (SSOT)** — [AUDIT-CODING-PRACTICES-2026-08-08.md](./AUDIT-CODING-PRACTICES-2026-08-08.md) · composite C−/D+ · 5 agentes.

### Siguientes sprints (VN)

| Orden | Foco | Doc |
|-------|------|-----|
| **AHORA** | Test path FO (VN 1.5h) + captura M1 5.5h | [AHORA-CLOSE-CHECKLIST.md](./AHORA-CLOSE-CHECKLIST.md) |
| **Plan** | Deploy $ · core pins · onboard envs | [SPRINT-CORE-ONBOARDING.md](./SPRINT-CORE-ONBOARDING.md) |

## State (buenas prácticas)

| Regla | |
|-------|--|
| **Source of truth** | `canvas-state.json` **hosted** (GitHub Pages) |
| **localStorage** | Solo **draft** hasta Sync o «Recargar hosted» |
| **Fetch** | `cache: no-store` + query bust `?v=timestamp` |
| **AHORA** | Máx. 3 abiertos |
| **Plan** | Máx. ~7 activos; resto en later |
| **objective** | string **o** objeto `{ today, tokens, mtd_usd }` (UI formatea) |
| **HUMANO** | Solo Rö cierra; agente no |
| **Sync CORS** | Orígenes: `vientonorte.io` + `vientonorte.github.io` |

Más → **Recargar hosted (SoT)** · **Limpiar draft local**

Sync: Worker `vientonorte-ops-sync` + token `ops_sync_token` (solo browser; no en git).

## CLI

`canvas-sprint start` · `vn-daily` · `vn-m5 status`

## Hoy · board humano

| Board | Link |
|-------|------|
| **Cerrar AHORA** | [AHORA-CLOSE-CHECKLIST.md](./AHORA-CLOSE-CHECKLIST.md) |
| **Acciones 1 clic** | [HUMAN-ACTIONS.md](./HUMAN-ACTIONS.md) |
| **HUs MVP** | [HU-2026-08-06-MVP.md](./HU-2026-08-06-MVP.md) |
| **Tareas humanas** | [HUMAN-TASKS.md](./HUMAN-TASKS.md) |
| **Ledger SoT** | [finanzas.vientonorte.io/ledger.json](https://finanzas.vientonorte.io/ledger.json) |

**Horas:** Método Ro 18 ago · M1 5.5 · VN 1.5 · Post 0.75 · Algonova 4º · **DS day = Test**

## Finanzas $ (canónico)

| | |
|--|--|
| **UI live** | https://finanzas.vientonorte.io/ |
| **Ledger** | https://finanzas.vientonorte.io/ledger.json |
| **Mirror ops** | [finanzas/](./finanzas/) |
