# Ops · Dashboard financiero

**Live:** https://vientonorte.io/ops/finanzas/  
**Tablero:** https://vientonorte.io/ops/ → quick link **Finanzas $**  
**Espejo local (iCloud):** `Documents/MICRO 1/07-pagos/dashboard/`

## Qué es

Intención vs realidad del mes (Micro1 Trainer + meta **1.6M CLP**).

| Capa | Fuente |
|------|--------|
| UI | este `index.html` (static, GitHub Pages) |
| Seed / backup | `ledger.json` en esta carpeta |
| Realidad en vivo | `localStorage` del browser (Export/Import JSON) |
| Canon docs | `Documents/MICRO 1/00-canon/CALENDAR-FINANZAS.md` |

## Uso

1. Abrir live o local.
2. Cargar seed si localStorage vacío.
3. Pegar footer `### DAY` del LOG o cargar Hubstaff h + tasks.
4. Export JSON → sobrescribir `ledger.json` aquí **y** en MICRO 1 (rsync mental).

## Privacidad

Datos de pace/meta son operativos personales. Hosted en `/ops/` (misma superficie que el canvas). No poner secrets (tokens, PAT). Calendar IDs en ledger son metadata de control, no OAuth.

## Relacionado

- [ops README](../README.md)
- [packages / core](../packages-status.md)
- MICRO 1: `07-pagos/README.md`

— GMac · 2026-08-02 · available en tablero ops

<!-- ssot-deploy 2026-08-06T16:52Z split=80_micro1_10_vn_10_post mtd=13 -->
