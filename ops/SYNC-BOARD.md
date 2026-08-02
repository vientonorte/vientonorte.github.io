# OPS · Tablero sync multi-device

**Live UI:** [vientonorte.io/ops/](https://vientonorte.io/ops/) → pestaña **Devices**  
**State:** `canvas-state.json` → clave `sync_board`  
**Same artifact firmas:** vault Ro `00-sistema/PIPELINE-QA.md`

> Este markdown es espejo legible. La fuente operativa del tablero es `sync_board` en el canvas.

### Buenas prácticas (ops)

1. **Hosted SoT** — al abrir /ops, gana `canvas-state.json` de Pages (no el draft viejo del browser).  
2. **Draft local** — solo tras editar en Canvas; Sync publica; «Recargar hosted» descarta.  
3. **Data-driven** — content/firma por device solo con medición (rsync, mtime, check humano).  
4. **Same artifact** — firmas en `PIPELINE-QA`, no copiar tablas divergentes.  
5. **AHORA** — máx 3; archivar ventanas de fecha vencidas.

---

## Estado global (2026-08-02 · GMac)

| Campo | Valor |
|-------|--------|
| Global | **pending_documented** |
| Notas Ro ↔ espejo W11 (en M5) | **OK** · **180 md** · post-rsync empty diff |
| Firmas I15 / W11 / I11 / GWin / M1 | **pending** |
| GMac firma sistema | **pass** (2026-08-02) |
| Último rsync Ro → espejo | **2026-08-02 01:30 -0400** |

---

## Stores

| Store | Path | Devices | Status |
|-------|------|---------|--------|
| **Ro** (canónico Apple) | iCloud Obsidian → `Ro` | M5 · M1 · I15 · I11 | ok · 180 md |
| **Espejo W11** | `Documents/Obsidian Vault` | W11 · GWin | ok (mirror en Mac) · 180 md |
| **MICRO 1** | `Documents/MICRO 1` | M5 · W11 · GWin | ok · TB + FINANZAS canon |

---

## Devices

| Nick | Abre | Content | Firma | Medido |
|------|------|---------|-------|--------|
| **M5** | Ro (humano + GMac) | ok | pending | rsync 2026-08-02 01:30 · 180 md empty |
| **GMac** | Ro + ops/table-ro + MICRO 1 | ok | **pass** | pre-cierre TB/FINANZAS/Trello/ops · 01:30 |
| **I15** | Ro (no stub) | signal_only | pending | falta check humano iPhone hoy |
| **W11** | `Documents\Obsidian Vault` + MICRO 1 | mirror_ready_mac | pending | espejo Mac OK; falta pull Windows |
| **GWin** | = W11 | no_dato | pending | falta sesión en PC |
| **I11** | Ro | no_dato | pending | Calendar API OK vía GMac; falta Obsidian check iPad |
| **M1** | Ro | no_dato | pending | sin check hoy |

---

## One-liners de firma (pegar en PIPELINE-QA)

```text
- I15 · 2026-08-02 · pass · Ro visible · PIPELINE-QA + Sessions 08-02 leídos
- W11 · 2026-08-02 · pass · espejo = Ro 180 md · MICRO 1 TB/FINANZAS OK
- GWin · 2026-08-02 · pass · online · setup W11 OK · nick OK
- I11 · 2026-08-02 · pass · Ro + Personal/MICRO1/FINANZAS ON
```

---

## ACCIONES

1. **I15** — abrir Ro → firmar PIPELINE-QA  
2. **W11/GWin** — iCloud pull espejo + MICRO 1 → firmar  
3. **I11** — Obsidian Ro + 3 calendars ON → firmar  
4. **GMac** — tras editar Ro: rsync (último 01:30)  
5. **Trello** — table-ro Admin Sync (Key/Token) si querés API completa  

### rsync (GMac)

```bash
RO="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Ro"
ES="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Documents/Obsidian Vault"
rsync -a --delete --exclude '.DS_Store' "$RO/" "$ES/"
```

---

## Relacionado

- [ops README](./README.md)
- Loop multi-device en pestaña Guía
- Obsidian: `00-sistema/DATA-HEALTH.md` · `00-sistema/PIPELINE-QA.md`
- Sessions: `Viento Norte/Sessions/2026-08-02.md`

— GMac · 2026-08-02 01:30 -0400 · rsync 180 md · empty diff
