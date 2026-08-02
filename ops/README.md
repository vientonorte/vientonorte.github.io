# /ops · Canvas operativo Viento Norte

**Live:** https://vientonorte.io/ops/ · https://vientonorte.github.io/ops/

## Usabilidad (2026-07-28 · Devices 2026-08-01 · Finanzas 2026-08-02)

- **Hoy** — solo ítems abiertos de AHORA (baja carga cognitiva).
- **Canvas** — Eisenhower completo; hechos ocultos por defecto.
- **Roadmap** — P0–P3 secundario.
- **Devices** — **tablero sync multi-device** (I15 · M5 · W11 · firmas). State: `sync_board`. Markdown: [SYNC-BOARD.md](./SYNC-BOARD.md).
- **Finanzas $** — dashboard intención vs realidad (meta **1.6M CLP** / Trainer). Live: [finanzas/](./finanzas/) · botón top bar.
- **Guía** — loops y rutas (no en la cara al abrir).
- **Más** — export/import/release/print.

### Siguientes sprints (VN)

| Orden | Foco | Doc |
|-------|------|-----|
| **Siguiente** | Usar **vientonorte-core** bien (packages pin, publish, FO consume) | [SPRINT-CORE-ONBOARDING.md](./SPRINT-CORE-ONBOARDING.md) |
| **Después** | Onboarding + ambientes **públicos / privados** VN | mismo doc · fase 2 |

## State (buenas prácticas)

| Regla | |
|-------|--|
| **Source of truth** | `canvas-state.json` **hosted** (GitHub Pages) |
| **localStorage** | Solo **draft** hasta Sync o «Recargar hosted» |
| **Fetch** | `cache: no-store` + query bust `?v=timestamp` |
| **AHORA** | Máx. 3 abiertos; ventanas de fecha pasadas → archive |
| **Devices** | Tablero multi-device (`sync_board`); firmas en PIPELINE-QA |
| **HUMANO** | Ítems `HUMANO` / `qa_manual` en AHORA: solo Rö cierra; agente no | 
| **No inventar** | pass/fail de device sin medición en tablero |

Más → **Recargar hosted (SoT)** · **Limpiar draft local**

Sync escribe vault vía Worker + token `ops_sync_token` (solo en el browser; no en git).

## CLI

`canvas-sprint start` · `vn-daily` · `vn-m5 status`
