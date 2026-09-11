# Deploy y ownership — Viento Norte

**Canon apex:** `https://vientonorte.io/`  
**Repos:** 2026-08-09 · post PR mi-portafolio #142 + deploy SPA

---

## Mapa de ownership (SSOT)

| Capa | Dueño | Evidencia |
|------|--------|-----------|
| DNS (A → GitHub Pages) | GitHub Pages / apex → user site | dig A `vientonorte.io` → `185.199.x.x` |
| Custom domain + TLS cert | **este repo** `vientonorte/vientonorte.github.io` | Pages: `cname: vientonorte.io`, cert apex+www |
| Source Pages | rama **`gh-pages`** (legacy) | `build_type: legacy` · path `/` |
| Contenido SPA (home brand) | **`vientonorte/mi-portafolio`** | Workflow Deploy publica `dist/` en **root de este hub** |
| Ops / ledger / canvas | **este repo** (`ops/`) | SPA deploy **re-bundla** `ops/` desde hub en cada release |
| Path secundario Pages | `mi-portafolio` | `html_url` ≈ `…/mi-portafolio/` · `cname: null` |

```text
mi-portafolio (main)
  → CI green
  → Deploy to GitHub Pages (workflow_run)
      · vite build (base /)
      · bundle ops/ desde hub
      · git push SPA → vientonorte.github.io main
  → hub: Deploy gh-pages branch (rsync → gh-pages)
  → pages-build-deployment
  → https://vientonorte.io/
```

**No confundir:** el apex **no** es un dashboard estático aislado. Es la SPA de marca; el hub es el **contenedor Pages/CNAME** + SSOT de ops.

---

## Qué acción usar

| Objetivo | Repo / acción |
|----------|----------------|
| Ship SPA / marketing / SEO | Merge a `main` en **mi-portafolio** (CI → deploy → reescribe hub root) |
| Ship solo ops / ledger / finanzas HTML | Push a **hub** `main` (→ `gh-pages` → Pages) |
| Redeploy SPA sin código nuevo | `gh workflow run deploy.yml -R vientonorte/mi-portafolio --ref main` |
| Contact API | Worker `contact.vientonorte.io` (`mi-portafolio/worker`, `wrangler.contact.toml`) |
| Ops canvas sync | Worker `ops-sync.vientonorte.io` |
| Finanzas proxy | Worker `vientonorte-finanzas` (workers.dev; sin custom domain obligatorio) |

### Workers (cuenta CF · subdomain `vientonorte`)

| Worker | URL canónica |
|--------|----------------|
| `mi-portafolio-contact` | `https://contact.vientonorte.io` |
| `vientonorte-ops-sync` | `https://ops-sync.vientonorte.io` |
| `vientonorte-finanzas` | `https://vientonorte-finanzas.vientonorte.workers.dev` |
| `table-ro-ai-proxy` | `https://table-ro-ai-proxy.vientonorte.workers.dev` |

---

## Workflows de este repo (hub)

| Workflow | Rol | Notas |
|----------|-----|--------|
| **Deploy gh-pages branch** | Path real de publicación | rsync main → rama `gh-pages` |
| **pages-build-deployment** | Build GitHub Pages (legacy) | Source = `gh-pages` |
| **Validate Graph Schema** | JSON / pipeline / tests / lint / a11y / links | No bloquea Pages; ver sección fallos |
| `deploy-pages.yml.disabled` | Desactivado | Path `actions/deploy-pages` incompatible con source=branch |

### CNAME

- Archivo `CNAME` en root = `vientonorte.io`
- **No borrar** sin plan de migración (ver abajo). Si se quita, el apex deja de apuntar a este user site.

---

## Validación post-deploy

```sh
# Apex SPA
curl -sI https://vientonorte.io/ | grep -iE 'HTTP/|last-modified'
curl -sL https://vientonorte.io/ | grep -oE 'assets/index-[^"]+\.js' | head -1

# Ops embebido
curl -sI https://vientonorte.io/ops/finanzas/ | head -1

# Contact (GET 403 esperado; OPTIONS 204)
curl -sI -X OPTIONS https://contact.vientonorte.io/api/contact \
  -H 'Origin: https://vientonorte.io' -H 'Access-Control-Request-Method: POST' | head -1

# Ops-sync
curl -s https://ops-sync.vientonorte.io/ | head -c 200
```

---

## QA mínimo (ops / data en hub)

Antes de push **solo-ops** (no SPA):

```sh
git status --short --branch
python3 -c "import json; json.load(open('data/projects.json')); json.load(open('data/graph/nodes.json')); json.load(open('data/graph/edges.json')); print('JSON OK')"
python pipeline/validate_flow.py --edges data/graph/edges.json
pip install -r requirements-dev.txt && pytest tests/ -v
```

Ledger SSOT (gate opcional de negocio):

```sh
python3 -c "import json; m=json.load(open('ops/finanzas/ledger.json'))['meta']; print(m.get('split_policy'), m.get('summary_mtd_tasks'), m.get('summary_mtd_usd')); assert m.get('split_policy')=='40m1_5vn_3post'"
```

---

## Validate Graph Schema — causas habituales (post-SPA)

El root `index.html` es **shell SPA** (publicado desde mi-portafolio). Los jobs del hub pensados para HTML estático fallan si no se adaptan:

| Job | Síntoma típico | Mitigación |
|-----|----------------|------------|
| Python Tests | Assert URL `vientonorte.github.io/aruma/` | Canon = `vientonorte.io/…` |
| Frontend ESLint | indent/quotes en script redirect SPA | Skip lint si shell SPA (`#root`) |
| Lychee | root-relative `/assets/…` sin root-dir | `--root-dir .` |
| pa11y | crash htmlcs en shell React | Auditar `ops/finanzas/index.html` (estático) |
| JSON Schema / Pipeline SCA | OK | — |

**Importante:** el rojo en Validate Graph Schema **no** detiene Deploy gh-pages ni Pages. Aun así se corrige para no ensuciar el panel de Actions.

A11y de la SPA vive en **mi-portafolio** (CI: pa11y / Playwright / Lighthouse), no en este workflow.

---

## Migración CNAME → solo mi-portafolio (NO default)

**Estado hoy:** no migrado. El modelo hub-as-Pages-owner + SPA-publish-into-hub es el canónico.

Migrar solo si se quiere:

1. Pages source = workflow de `mi-portafolio` (artifact deploy-pages)
2. Hub solo en `https://vientonorte.github.io` **sin** custom domain
3. Dejar de reescribir hub root desde el deploy SPA

### Plan paso a paso (requiere confirmación explícita: «sí migra CNAME»)

1. **Freeze:** no merges SPA ni pushes hub concurrentes.
2. **Backup:** exportar settings Pages hub + mi-portafolio; copiar `CNAME` y lista de DNS.
3. **mi-portafolio Pages:** Settings → Pages → Source = GitHub Actions; añadir custom domain `vientonorte.io` + `www`; esperar DNS check + cert.
4. **Quitar CNAME del hub:** borrar `CNAME`, push; en Settings Pages del hub quitar custom domain (evitar dos repos con el mismo dominio).
5. **Ajustar deploy.yml de mi-portafolio:** dejar de pushear SPA al hub; opcionalmente publicar solo artifact + `deploy-pages`; decidir si `ops/` se sirve por subpath/worker o se deja en hub en `*.github.io/ops`.
6. **DNS:** verificar A/CNAME siguen a Pages; no tocar si ya apuntan a GitHub.
7. **Smoke:** apex 200 + asset hash nuevo; GSC; Ads final URL; `contact.vientonorte.io` CORS; `/ops/` si aplica.
8. **Rollback:** reponer `CNAME` en hub, reasignar custom domain al hub, quitar domain de mi-portafolio, redeploy hub `gh-pages`.

**Riesgos:** downtime cert (minutos–horas), GSC/Ads, rotura del step “Publish brand site to hub”, ops no embebido si no se rediseña.

---

## Política enlaces y privados

- No enlaces públicos a 404.
- Privados: estado textual + badge `PRIVADO`.
- Canon de producto: `docs/URL-CANON-VIENTONORTE.md` en mi-portafolio.

## Registro de cambios

Cada release material: entrada en `CHANGELOG.md` (fecha, tipo, alcance).
