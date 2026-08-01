# OPS · Tablero sync multi-device

**Live UI:** [vientonorte.io/ops/](https://vientonorte.io/ops/) → pestaña **Devices**  
**State:** `canvas-state.json` → clave `sync_board`  
**Same artifact firmas:** vault Ro `00-sistema/PIPELINE-QA.md`

> Este markdown es espejo legible. La fuente operativa del tablero es `sync_board` en el canvas.

---

## Estado global (2026-08-01 · GMac)

| Campo | Valor |
|-------|--------|
| Global | **pending_documented** |
| Notas Ro ↔ espejo W11 (en M5) | **OK** · 165 md · post-rsync empty diff |
| Firmas I15 / W11 / humano | **pending** |
| Último rsync Ro → espejo | 2026-08-01 12:17 -04 |

---

## Stores

| Store | Path | Devices | Status |
|-------|------|---------|--------|
| **Ro** (canónico Apple) | iCloud Obsidian → `Ro` | M5 · M1 · I15 · I11 | ok |
| **Espejo W11** | `Documents/Obsidian Vault` | W11 · GWin | ok (mirror en Mac) |
| **MICRO 1** | `Documents/MICRO 1` | M5 · W11 · GWin | ok |

---

## Devices

| Nick | Abre | Content | Firma | Medido |
|------|------|---------|-------|--------|
| **GMac** | Ro + ops repo | ok | **pass** | PIPELINE-QA 2026-08-01 |
| **M5** | Ro | ok | pending | rsync + hashes |
| **I15** | Ro (no stub) | signal_only | pending | workspace-mobile 07:50 |
| **W11** | `Documents\Obsidian Vault` + MICRO 1 | mirror_ready_mac | pending | espejo listo; falta check PC |
| **GWin** | = W11 | no_dato | pending | sin sesión PC |
| **I11** | Ro | no_dato | pending | — |
| **M1** | Ro | no_dato | pending | — |

---

## One-liners de firma

```text
- I15 · 2026-08-01 · pass · Ro visible · PIPELINE-QA + CIERRE leídos
- W11 · 2026-08-01 · pass · espejo = Ro · MICRO 1 handoff OK
- GWin · 2026-08-01 · pass · online · setup W11 OK · nick OK
```

---

## Loop (resumen)

1. Notas → editar en **Ro** (Apple) o espejo W11.  
2. Tras editar Ro en M5 → **rsync** a `Documents/Obsidian Vault`.  
3. Código → `Documents/GitHub/<repo>` → `git push` → otro device `git pull --ff-only`.  
4. Firmar en **PIPELINE-QA** (same artifact).  
5. Actualizar `sync_board` en `/ops` cuando cambie el estado medido.

## rsync (GMac)

```bash
RO="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Ro"
ES="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Documents/Obsidian Vault"
rsync -a --delete --exclude '.DS_Store' "$RO/" "$ES/"
```

---

## Relacionado

- [ops README](./README.md)
- [packages-status](./packages-status.md)
- Loop multi-device en pestaña Guía
- Obsidian: `00-sistema/DATA-HEALTH.md` · `00-sistema/PIPELINE-QA.md`

— GMac · 2026-08-01
