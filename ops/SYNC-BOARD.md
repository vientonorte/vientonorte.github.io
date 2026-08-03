# OPS · Tablero sync multi-device

**Live UI:** [vientonorte.io/ops/](https://vientonorte.io/ops/) → pestaña **Devices**  
**State SoT:** `canvas-state.json` **hosted** (GitHub Pages) — no el draft de un solo browser  
**Same artifact firmas:** vault Ro `00-sistema/PIPELINE-QA.md`

---

## Roadmap % · por qué un device ve 70 y otro 66 (2026-08-03)

| Fuente | Roadmap % (medido) | Dónde |
|--------|-------------------|--------|
| **Hosted SoT** | **66%** (18.5/28 ítems P0–P3) | `vientonorte.io/ops/canvas-state.json` · main |
| **Draft local** | a menudo **70%** u otro | `localStorage.vientonorte-canvas-state` **por browser/device** |

**Causa:** cada device (M5 Safari, I15, W11 Chrome) guarda un **draft** si tocaste el canvas. El draft **no se propaga** por iCloud. Hosted solo cambia con **Sync** (token) o commit a `vientonorte.github.io`.

**No hay dos roadmaps en el repo** — hay SoT + basura local.

### Ritual unificar M5 + I15 + W11 (2 min / device)

En **cada** device, misma URL `https://vientonorte.io/ops/`:

```
1. Hard refresh (o borrar SW de ops si está cacheado)
2. Más → Limpiar draft local
3. Más → Recargar hosted (SoT)
4. Pestaña Roadmap → debe decir **66%** (o el % del status bar “Roadmap N%”)
5. Pestaña Hoy → mismos 3–4 AHORA P0
```

Si tras eso un device sigue distinto: no es sync multi-device fallido — es **otro origen** (file://, mirror viejo, o no es vientonorte.io).

### Cuándo Sync (Worker)

Solo desde el device que tiene el draft **bueno** y quieres **publicar** al vault/hosted:

- Token `OPS_SYNC_TOKEN` en ese browser  
- Sync → commit canvas-state  
- Luego **todos** los demás: Limpiar draft + Recargar hosted  

**Nunca** Sync desde un device con draft basura (subiría el 70% fantasma).

---

## Estado global (2026-08-03)

| Campo | Valor |
|-------|--------|
| Roadmap SoT | **66%** hosted |
| Global firmas | **pending** I15/W11/GWin/I11 (GMac+M5 pass) |
| AHORA P0 | post-deploy SEO #139 · smoke FO · firmas · gate SEM |
| Ro ↔ espejo | rsync / iCloud vault (docs) ≠ ops canvas draft |

---

## Devices

| Nick | Firma PIPELINE-QA | Ops canvas |
|------|-------------------|------------|
| GMac / M5 | pass | SoT hosted tras ritual |
| I15 | pending firma | **mismo ritual** Limpiar+Recargar |
| W11 / GWin | pending firma | **mismo ritual** |
| I11 | pending firma | **mismo ritual** |

## One-liners firma

```text
- I15 · 2026-08-03 · pass · Ro + ops hosted 66% · PIPELINE-QA
- W11 · 2026-08-03 · pass · espejo + ops hosted 66% · MICRO1
- GWin · 2026-08-03 · pass · online · ops SoT
- I11 · 2026-08-03 · pass · Ro + calendars · ops SoT
```

## Links

- Ops: https://vientonorte.io/ops/
- README state rules: [README.md](./README.md)
- PIPELINE-QA: vault `00-sistema/PIPELINE-QA.md`

— GMac · 2026-08-03 · desync 70 vs 66 = draft local
