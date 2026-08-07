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

## Doc SSOT

Obsidian: `Viento Norte/Resources/DASHBOARD-Finanzas-tablas-ROI-proyecciones.md`

## Split live (2026-08-06 noche · unificado)

| | |
|--|--|
| Split sem | **40 h M1 · 5 h VN · 3 h Post** |
| ops t/h | **4.0** intent · techo **5.6** |
| L–J M1 | **7.5 h** → ~30 t · ~$46.20 |
| Vie M1 | **5.0 h** → ~20 t · ~$30.80 |
| SSOT día 06 | **7 t · $10.78** · MTD **15 · $23.10** |
| Session stamps | **solo calendar Personal** |
| Live | https://finanzas.vientonorte.io/ |

Ledger seed: `ledger.json` (= `ledger-ssot.json`).  
iCloud mirror: `Documents/MICRO 1/07-pagos/dashboard/`.
