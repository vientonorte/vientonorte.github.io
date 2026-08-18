# QA · Skills + Automatizaciones + GitHub · 2026-08-06

> **Superseded 2026-08-18:** horas = Método Ro Calendar (M1 5.5 · VN 1.5 · Post 0.75 · Algonova 4º). El 80/10/10 de este QA es **histórico**.

**Status:** audit data-driven · calidad en baja por **drift multi-vault + Pages stuck**  
**Autor:** Grok QA pass

---

## Confirmar OPS (dato vivo)

| Superficie | Estado | Evidencia |
|------------|--------|-----------|
| `https://vientonorte.io/ops/` | ✅ HTTP 200 | curl |
| `https://vientonorte.io/ops/finanzas/` | ✅ HTTP 200 | curl |
| `https://vientonorte.io/aruma/` | ✅ HTTP 200 | curl |
| Ledger **raw GitHub** | ✅ `80_micro1_10_vn_10_post` · MTD **13** · hoy **10** | raw.githubusercontent.com |
| Ledger **live CDN** | ❌ **STALE** `80_micro1_20_vn` · $4.62 (04 ago) | Pages `status=errored` / runs **queued** 10m+ |
| Commits ledger | `f5a17ed` + `2e15ad2` en `main` | gh |
| Pages build | 🔴 legacy **errored** · actions **queued/cancelled** | gh api |
| CodeQL Push on main | 🔴 failure / queued | gh run list |

**SoT dinero mientras CDN falla:** raw GH + `MICRO 1/07-pagos/dashboard/ledger.json` (iCloud).

---

## P0 · Pérdida de calidad (root causes)

### 1. Dual Obsidian vault (CRÍTICO)

| Path | Rol | Session 2026-08-06 |
|------|-----|-------------------|
| `iCloud~md~obsidian/Documents/Ro/Viento Norte` | Default scripts (`OBS_VN` → `~/Documents/Obsidian Vault` symlink) | ❌ faltaba (sync aplicado en este QA) |
| `com~apple~CloudDocs/Documents/Obsidian Vault/Viento Norte` | Escritura ad-hoc Grok/iCloud Drive | ✅ tenía el cierre |

**Efecto:** cierres, KPI, night-worker y skills leen **Ro**; agentes a veces escriben **CloudDocs** → “perdemos calidad” / notas fantasma.

**Regla SSOT:**  
`OBS_VN` canónico = vault **Ro** (`~/Documents/Obsidian Vault/Viento Norte` vía symlink).  
CloudDocs vault = espejo o deprecar.

### 2. GitHub Pages ops no despliega

- `pages-build-deployment` se **cancela** o queda **queued** >10 min  
- Legacy Page build **errored** (duration 0 — race/cola)  
- Live finanzas no recibe `f5a17ed`  

**Acción humana/ops:** en repo Settings → Pages, re-save source `main` / o cancelar cola en Actions UI; no depender de CDN para ledger hasta verde.

### 3. Skills desalineadas / duplicadas

| Hallazgo | Severidad |
|----------|-----------|
| `ux-writing-vn`: email `contacto@vientonorte.cl` (sin MX) vs canon `.io` | P1 |
| Skills **no** documentan split **80/10/10** (m5/cierre ok data-driven, pero sin ancla finanzas) | P2 |
| Cloudflare skills triplicadas: `.agents` ∩ `.claude` (11) | P2 ruido |
| VN skills solo en `.grok/skills` (no en GitHub org como catálogo versionado) | P2 |
| Catálogo GH `Vientonorte/20-sistema/skills-catalogo.md` 404 raw sin auth / path private | P2 |
| 13 skills con marcadores TODO/FIXME (bundled + SURA) | P3 |

### 4. Automatizaciones locales (`~/bin`)

| Bin | Estado |
|-----|--------|
| `vn-m5`, `vn-cierre-*`, `vn-session-*`, `m1-ledger-sync` | ✅ ejecutable |
| Sprint scripts `~/Developer/scripts/vientonorte-sprint/{01..07}` | ✅ existen |
| `vn-night-worker.sh` | ⚠️ LOG hardcode **2026-07-26** (stale date) |
| `OBS_VN` default | ⚠️ apunta Ro; escritura CloudDocs diverge |
| `m1-ledger-sync.py` | ⚠️ **no reescribe** intention/split; si corres sync sin claims LOG → no pisa 80/10/10 meta custom OK; claims sin ID en LOG no suman las 10 tasks |

### 5. CI por repo (GitHub)

| Repo | CI | Deploy | Nota |
|------|----|--------|------|
| mi-portafolio | ✅ success (03 ago) | ✅ Pages | OK |
| aruma | ✅ success (04 ago) | ✅ Next Pages | booking vacío |
| vientonorte.github.io | 🔴 Pages stuck | 🔴 | **bloquea ops live $** |
| table-ro / core | workflows active | — | no re-audited hoy |

---

## Matriz skills VN (Grok)

| Skill | QA |
|-------|-----|
| m5-vn · cierre-* · kpi-vn · micro1-pipeline | OK estructura; path Obsidian Ro |
| docs-vn · seo-vn · google-ads-vn · lead-a11y | OK |
| design-sprint-vn | OK |
| ux-writing-vn | **FIX** email → `.io` |
| check-work · check-safety | OK |

**No hay SKILL.md de ĀRŪḾA ni de finanzas 80/10/10** → hueco de calidad en roadmap.

---

## Checklist ĀRŪḾA (dejar para humano)

Ver `ops/ARUMA-CHECKLIST.md` (mismo repo).

---

## Plan remediación (orden)

1. **P0** Unificar vault: solo escribir Sessions en **Ro**; espejar CloudDocs o dejar de usarlo  
2. **P0** Desbloquear Pages `vientonorte.github.io` hasta live ledger = raw  
3. **P1** Fix skills email `.io` + ancla 80/10/10 en m5/cierre/kpi  
4. **P1** `vn-night-worker` → LOG del día (`$TODAY`) no fecha fija julio  
5. **P2** Publicar catálogo skills en GH (Vientonorte o mi-portafolio/docs)  
6. **P2** Dedup Cloudflare skills (una fuente)  
7. **P2** Skill o sección finanzas en m5-vn  

---

## DoD de este QA

- [x] Inventario skills/bins/workflows  
- [x] Root cause dual-vault documentada  
- [x] Ops confirmado (tabla)  
- [x] Checklist ĀRŪḾA escrito  
- [x] Session 06 espejada a Ro  
- [x] Fix ux-writing email  
- [ ] Pages live = raw (pendiente GitHub Actions)

— 2026-08-06
