# Changelog — vientonorte.github.io

Registro operativo del dashboard unificado y su mantenimiento cross-repo.

Formato:
- Fecha: YYYY-MM-DD
- Tipo: `feat`, `fix`, `docs`, `ops`, `test`
- Alcance: qué cambió y por qué

---

## 2026-06-12

### ops — QA de pendientes
- `ops(qa)`: PR #62 (docs QA 2026-06-11) marcado ready for review y mergeado
  (squash) — único pendiente abierto del repo, sin riesgo (solo
  `CHANGELOG.md`/`HANDOFF.md`).

### Verificación
- `pytest tests/` — 22/22 passed
- `ruff check .` / `ruff format --check .` — limpio
- `mypy --ignore-missing-imports pipeline/` — sin issues
- `npm install` + `npm run lint` (ESLint + HTMLHint) — sin errores
- `ajv validate` — `nodes.json`, `edges.json`, `projects.json` válidos contra sus schemas (draft7)
- Sin issues ni PRs abiertos al cierre de esta iteración

---

## 2026-06-11

### ops — QA de pendientes (CI Actions)
- `ops(deps)`: mergeados los 3 PRs dependabot pendientes de `github-actions`
  (bumps menores, sin breaking changes, CI verde en los tres):
  - #59 `actions/checkout` 4.2.2 → 4.3.1
  - #60 `actions/setup-python` 5.4.0 → 5.6.0
  - #61 `actions/setup-node` 4.2.0 → 4.4.0

### Verificación
- `pytest tests/` — 22/22 passed
- `ruff check .` / `ruff format --check .` — limpio
- `mypy --ignore-missing-imports pipeline/` — sin issues
- `npm install` + `npm run lint` (ESLint 8.57.1 + HTMLHint) — sin errores
- `ajv validate` — `nodes.json`, `edges.json`, `projects.json` válidos contra sus schemas
- Sin issues ni PRs abiertos pendientes al cierre de esta iteración

---

## 2026-06-10

### ops — Consolidación de QA pendiente
- `ops(qa)`: PRs draft #52, #53 y #56 consolidados en una sola rama — los tres
  abordaban en buena medida el mismo conjunto de hallazgos (lint, package-lock,
  shell injection en CI) con distintos grados de cobertura. Se incorpora el
  contenido de #56 (el más completo: fixes ESLint `curly`/`quotes` en
  `index.html`, `ruff format` en `pipeline/validate_flow.py` y
  `tests/test_validate_flow.py`, `tests/conftest.py`, `package-lock.json`,
  `.secrets.baseline`, docs de `detect-secrets` en `CONTRIBUTING.md`) y se
  agregan los 2 fixes que solo estaban en #53.

### fix — CRÍTICO (de #53)
- `fix(ci)`: `cleanup_branches.yml` — corregida inyección de shell (CWE-78):
  `${{ github.event.pull_request.head.ref }}` se movió a `env:` antes de
  usarse en `run:`, evitando ejecución de comandos arbitrarios si el nombre
  de rama contiene caracteres especiales.

### fix — MEDIO (de #53)
- `fix(deps)`: `dependabot.yml` — agregada regla `ignore` de major bumps al
  ecosistema `github-actions` (ya existía para `npm`/`pip`); evita PRs de
  saltos de versión mayor que requieren revisión manual (causa de #44-46, #55).

### fix — NUEVO hallazgo
- `fix(mypy)`: `pyproject.toml` — `[tool.mypy] python_version` actualizado de
  `"3.9"` a `"3.10"`. mypy 2.x (ya resuelto por `mypy>=1.8.0` en instalaciones
  nuevas) rechaza `python_version < "3.10"` y emitía una advertencia de
  configuración en cada corrida.

### ops — Dependencias dev
- `ops(deps)`: `requirements-dev.txt` — mínimos actualizados a
  `pytest>=9.0.3`, `pytest-cov>=7.1.0`, `ruff>=0.15.16`, `mypy>=2.1.0`
  (igual a lo propuesto por los PRs dependabot #48, #49, #50, #54 — verificado
  con las versiones ya instaladas; cierra esos PRs como redundantes).

### Verificación
- `pytest tests/` — 22/22 passed
- `ruff check .` / `ruff format --check .` — limpio
- `mypy --ignore-missing-imports pipeline/` — sin issues ni advertencias
- `npm run lint` (ESLint + HTMLHint) — sin errores
- `ajv validate` — `nodes.json`, `edges.json`, `projects.json` válidos contra sus schemas

### Recomendación de cierre
- Cerrar #52 (subconjunto de #53), #53 y #56 (superset, contenido incorporado
  aquí) y #48/#49/#50/#54 (dependabot, ya reflejados en `requirements-dev.txt`).

---

## 2026-06-01

### feat — HIGH
- `feat(testing)`: Tests unitarios completos para `validate_flow.py` con pytest — 100% cobertura de funciones críticas (validate_flow, compute_node_energy, load_json, CLI).
- `feat(ops)`: Workflow de limpieza automática de ramas mergeadas (`cleanup_branches.yml`) — ejecuta post-PR merge, manual, y semanalmente.
- `feat(ci)`: Validación de schemas de nodos tipo-específicos agregada a CI — cierra gap identificado en HANDOFF.md.
- `feat(ci)`: Jobs de linting Python (ruff) y JavaScript (ESLint) en CI — calidad de código automatizada.
- `feat(ci)`: Job de tests Python con cobertura — reporte de coverage subido como artefacto.

### feat — MEDIUM
- `feat(dev)`: Pre-commit hooks configurados (`.pre-commit-config.yaml`) — ruff, mypy, JSON validation, detect-secrets.
- `feat(dev)`: Dependabot configurado para GitHub Actions, npm, y pip — actualizaciones semanales automatizadas.

### docs — HIGH
- `docs(contributing)`: `CONTRIBUTING.md` creado — estándares de código, testing, flujo Git, convenciones de commit.
- `docs(security)`: `SECURITY.md` creado — política de reporte, scope, mitigaciones implementadas, modelo de amenazas.
- `docs(adr)`: ADR-001 Zero Dependencias — documenta decisión arquitectónica de vanilla JS sin frameworks.
- `docs(adr)`: ADR-002 WebAuthn localStorage — documenta decisión de seguridad con mitigaciones XSS.

### docs — MEDIUM
- `docs(templates)`: Templates de issue (bug_report, feature_request) y PR creados en `.github/`.
- `docs(readme)`: README actualizado con badges de CI, secciones de desarrollo, testing, y links a nueva documentación.

### ops
- `ops(config)`: `pyproject.toml` creado — configuración de ruff, pytest, mypy, coverage.
- `ops(config)`: `.eslintrc.json` creado — configuración de ESLint para JavaScript/HTML.
- `ops(config)`: `package.json` creado — scripts de linting, dev dependencies (eslint, htmlhint).
- `ops(config)`: `requirements-dev.txt` creado — pytest, ruff, mypy para desarrollo Python.
- `ops(ci)`: Triggers de CI extendidos a `tests/**`, `*.html`, `*.json` — validación completa.

### fix
- `fix(i18n)`: `footerMonth` actualizado a "Junio 2026" / "June 2026" en TRANSLATIONS y HTML estático.

### ops
- `ops(docs)`: HANDOFF.md — fecha actualizada a 2026-06-01; historial completo de PRs #37–#41; riesgos y checklist al día.
- `ops(docs)`: CHANGELOG.md — entrada 2026-06-01 con fixes y estado post-merge.

---

## 2026-05-28

### fix — HIGH
- `fix(fetch)`: `AbortController` con timeout de 5s en `fetch('./data/projects.json')` — evita carga infinita ante servidor sin respuesta.
- `fix(pipeline)`: `load_json()` protegido con `try/except json.JSONDecodeError` — error legible en CI en lugar de traceback de Python.

### fix — MEDIUM
- `fix(fetch)`: `catch (err)` + `console.error('[vn] fetch projects.json:', err)` — depuración explícita de errores de red/timeout/JSON.
- `fix(passkey)`: `btn.disabled = true` + bloque `finally` en passkey click handler — previene múltiples diálogos WebAuthn por clicks rápidos.
- `fix(data)`: removidos `sca_score`/`friction_type` de los 6 edges con `sca_validated: false` — `validate_flow.py` recalcula desde cero; almacenarlos pre-computados era semánticamente incorrecto.
- `fix(ci)`: acciones GitHub pinadas a versiones exactas (`checkout@v4.2.2`, `setup-node@v4.2.0`, `setup-python@v5.4.0`, `upload-artifact@v4.6.2`) — CI reproducible sin regresiones silenciosas.

### fix — LOW
- `fix(i18n)`: `document.documentElement.lang = lang` redundante eliminado de `updateUILanguage()` — ya lo establece `setCurrentLang()` y el bootstrap.
- `fix(pipeline)`: truncación condicional corregida — `desc[:77]+'...' if len(desc) > 80 else desc` (antes siempre truncaba).
- `fix(readme)`: fila `contra-archivo` eliminada de la tabla — ID inexistente en `data/projects.json`, duplicaba la entrada `Contra-Archivo` (live).

### feat — LOW
- `feat(schema)`: `data/schema/projects.schema.json` — nuevo esquema Draft-07 formal para `data/projects.json`.
- `feat(ci)`: trigger de CI extendido de `data/graph/**` a `data/**`; step agregado para validar `projects.json` contra `projects.schema.json`.

### ops — LOW
- `ops(schema)`: 4 archivos de schema de nodos renombrados de guión a guión_bajo (`captura_regulatoria`, `puerta_giratoria`, `vacio_institucional`, `zona_gris`) — consistencia con el campo `type` en `nodes.json`; `$id` actualizado en cada schema.
- `ops(schema)`: `$comment` Draft-07 agregado a campos SCA en `edge.schema.json` — documenta semántica INPUT/OUTPUT del pipeline.
- `ops(docs)`: `pipeline/validate_flow.py` — docstrings PEP 257 en `load_json()`, `print_report()`, `build_parser()`, `main()`.
- `ops(docs)`: README.md — sección `## Estructura` actualizada con árbol completo del repositorio.
- `ops(docs)`: DEPLOY.md — comandos QA actualizan URLs desde `data/projects.json` en lugar de `index.html`; pasos 4 y 5 para validación JSON y pipeline SCA.
- `ops(git)`: `.gitignore` — `__pycache__/`, `*.pyc`, `*.pyo` agregados.
- `ops(docs)`: HANDOFF.md — fecha y estado actualizados a 2026-05-28; historial de iteraciones completo.

---

## 2026-05-10

### feat
- `feat(i18n)`: soporte bilingüe completo ES/EN — switch de idioma persistente en header con botón 🌐, idioma almacenado en `localStorage`.
- `feat(i18n)`: estructura de datos bilingüe en `data/projects.json` — todos los campos de texto (descripciones, títulos, labels, stats) soportan objetos `{ es: "...", en: "..." }`.
- `feat(i18n)`: traducción de UI completa — 16 strings de interfaz traducidas (passkey, toast, skip-link, footer, aria-labels) con función `t()` centralizada.
- `feat(i18n)`: meta tags multilingües — `og:locale:alternate`, título y descripción bilingües, keywords SEO actualizados.
- `feat(recruiter)`: enlaces de contacto en header — LinkedIn y GitHub visibles para reclutadores con iconos SVG y hover states.
- `feat(recruiter)`: sección "Para reclutadores" en README — stack, formación, enlaces directos, proyectos en producción.
- `feat(content)`: proyecto `aruma` agregado — SPA Next.js + Tailwind con A11y WCAG 2.1 AA y Security by Design (badge: `repo`, sin deploy).
- `feat(content)`: actualización de contador de stats — "sin deploy" de 2 → 3 proyectos (refleja suma correcta con `aruma`).

### fix
- `fix(link)`: enlace roto de `uxtools` corregido — `https://github.com/vientonorte/UXFLOW` (404) → `https://github.com/vientonorte/uxtools`.

### docs
- `docs(readme)`: README expandido con features (bilingüe, passkey, a11y, responsive), estructura de datos bilingüe, guía para reclutadores y QA de switch de idiomas.
- `docs(readme)`: tabla de proyectos actualizada — incluye `uxtools` y `aruma`, estados correctos (deprecated para Poemario Beta).

---

## 2026-05-04

### feat
- `feat(dynamic)`: contenido del dashboard extraído a `data/projects.json` — cards, stats y links se renderizan desde JavaScript; elimina drift entre HTML y datos.
- `feat(passkey)`: botón "Desbloquear" en header — WebAuthn (Passkey) para autenticar acceso a repos privados. Estados: sin registrar / registrado / autenticado (sesión).
- `feat(recruiter-view)`: vista pública por defecto oculta links que requieren autenticación (`requiresAuth: true`), mostrando "Acceso restringido" — vista limpia para reclutadores.
- `feat(skeleton)`: placeholders animados (shimmer) mientras carga `projects.json`.
- `feat(data)`: arquitectura de datos para grafo de fricción institucional —
  capa 1 (`data/raw/`), capa 2 (`data/graph/`), capa 3 (visualización existente).
- `feat(schema)`: JSON Schema Draft-07 para 8 tipos de nodo:
  `agente`, `flujo`, `territorio`, `friccion`, `puerta_giratoria`,
  `captura_regulatoria`, `zona_gris`, `vacio_institucional`.
- `feat(schema)`: `data/schema/node.schema.json` — esquema base con campos
  obligatorios: `id`, `type`, `friction_score`, `evidence_refs`, `updated_at`, `energy`.
- `feat(schema)`: `data/schema/edge.schema.json` — aristas con `source`, `target`,
  `weight`, `flow_type`, `currency`, `timestamp`, `sca_score`, `friction_type`.
- `feat(data)`: `data/graph/nodes.json` — 8 nodos de ejemplo/plantilla (uno por tipo).
- `feat(data)`: `data/graph/edges.json` — 7 aristas de ejemplo con validación SCA.
- `feat(pipeline)`: `pipeline/validate_flow.py` — función `validate_flow()` con
  lógica SCA analógica (3 factores: KNOW/HAVE/BE); CLI con `--edges`, `--edge-id`,
  `--output`, `--fail-on-high`; función `compute_node_energy()`.
- `feat(ci)`: `.github/workflows/validate_schema.yml` — GitHub Actions que valida
  `nodes.json` y `edges.json` contra schemas Draft-07 (ajv-cli@5) y ejecuta
  el pipeline SCA en cada push/PR que modifique `data/` o `pipeline/`.
  Sube reporte SCA como artefacto con retención de 90 días.

---

## 2026-05-03

### fix
- `fix(a11y)`: `.card--deprecated { opacity: 0.6 }` reemplazado por `.card--deprecated .card__desc, .card--deprecated .card__tags` — links de la card deprecada recuperan contraste completo (WCAG 1.4.3).
- `fix(a11y)`: `.card:focus-within` agregado junto a `.card:hover` — borde visible al navegar por teclado dentro de cualquier card (WCAG 2.4.7).
- `fix(a11y)`: `aria-disabled="true"` en `span.link-disabled` de SURA Investments — tecnologías asistivas anuncian correctamente el estado deshabilitado.
- `fix(a11y)`: `@media (prefers-reduced-motion: reduce)` — deshabilita transiciones para usuarios que lo solicitan (WCAG 2.3.3 / preferencia del sistema).
- `fix(semántica)`: `.stats` convertido de `div/div` a `ul/li` con `role="list"` — lista semántica correcta; `role="list"` preserva semántica en Safari VoiceOver con `list-style: none`.
- `fix(semántica)`: `.card__tags` convertido de `div/span` a `ul/li` con `role="list"` en las 9 cards.
- `fix(css)`: `list-style: none` en `.stats` y `.card__tags` — elimina bullets por defecto del navegador.
- `fix(seo)`: `og:site_name`, `og:locale`, `og:image:alt`, `twitter:image:alt` y `meta robots` agregados — grafo OpenGraph completo y crawlability explícita.
- `fix(footer)`: fecha actualizada a "Mayo 2026".

### ops
- QA transversal de pendientes: consolida y supersede PR #16 (draft abierto desde 2026-05-02). Todos los cambios aplicados en branch de trabajo activo.
- Deuda técnica LOW pendiente: ramas huérfanas `claude/hopeful-cerf-SsdOA`, `gcTUF`, `mjXuD`, `oApzO`, `oQXdL`, `bSKiS`, `EIgKA`, `XpCbJ`, `hCGLU` — candidatas a eliminación manual.

---

## 2026-04-25

### fix
- `fix(a11y)`: dots de estado en header — `aria-label` redundante reemplazado por `aria-hidden="true"` en los 5 indicadores. El texto visible del `.stat` ya provee el nombre accesible; los screen readers ya no anuncian el color dos veces.
- `fix(a11y)`: `a:focus-visible` — regla global con `outline: 2px solid var(--accent)` y `outline-offset: 2px`. Cubre `.card__title a`, `.card__links a` y `footer a`. Cumple WCAG 2.4.7 (Focus Visible) con indicador coherente al design system; no afecta interacción por mouse/touch.
- `fix(meta)`: `<meta name="author" content="Rodrigo Gaete Gaona">` agregado al `<head>`.
- `fix(meta)`: favicon SVG inline agregado — ícono "vn" sobre fondo `#0d1117` con accent `#58a6ff`; visible en pestañas del navegador y marcadores.

### ops
- QA de PRs pendientes: PR #7 y PR #8 consolidados en esta sesión. PR #9 (refactorización arquitectural Copilot) permanece en revisión — ver análisis en descripción del PR.
- Ramas huérfanas identificadas sin commits adelante de `main`: `claude/hopeful-cerf-SsdOA`, `gcTUF`, `mjXuD`, `oApzO`, `oQXdL` — candidatas a eliminación.

---

## 2026-04-23

### feat
- Actualización de tarjeta `mi-portafolio` en `index.html` para reflejar foco en Design Sprint y Design Thinking.
- Se incorpora referencia explícita a líneas `Evolve` y `Syncronzy` en descripción y tags de la tarjeta.
- Se mantiene estructura de enlaces y estado `LIVE` sin alterar KPIs globales del header.

---

## 2026-04-22

### fix
- `fix(a11y)`: jerarquía de headings — `div.card__title` convertido a `h2.card__title` en las 9 cards. Lectores de pantalla y SEO navegan correctamente `h1 > h2`.
- `fix(a11y)`: skip-link migrado de `top: -100%` a `clip-path: inset(100%)` — método preferido WCAG; se revela con `clip-path: inset(0)` al recibir foco.
- `fix(a11y)`: SURA Investments span — eliminado `role="link"` y `tabindex="0"` de elemento no interactivo; reemplazado por `aria-label` descriptivo. Usuarios de teclado ya no tabulan a un elemento que no responde a Enter/Space.
- `fix(css)`: sprite SVG migrado de `style="display:none"` a clase CSS `.svg-sprite` — elimina inline style inconsistente.
- `fix(css)`: `--accent-hover` (#79c0ff) aplicado en hovers de `.card__title a`, `.card__links a` y `footer a`; variable que estaba definida pero sin uso.
- `fix(css)`: `transition: color 0.15s` en `.card__links a` y `footer a` — hover suave en lugar de cambio abrupto.
- `feat(css)`: breakpoint tablet `@media (max-width: 768px)` — grid ajusta a `minmax(280px, 1fr)` antes del colapso a columna única en 600px.
- `feat(css)`: `line-height: 1.3` en `.card__title` — mejora lectura en títulos multi-línea.
- `feat(seo)`: `<link rel="canonical">` y `<meta name="theme-color">` agregados al `<head>`.

---

## 2026-04-16

### fix
- QA y buenas prácticas: corrección de accesibilidad en `.link-disabled` (SURA) — se agrega `role="link"` y `aria-disabled="true"`.
- Se agrega stat "deprecado" en el header para reflejar la tarjeta Poemario Beta en KPIs; se elimina drift documentado en HANDOFF.md.
- Se diferencia visualmente `dot--sprint` (azul/accent) de `dot--live` (verde) — eliminada ambigüedad semántica en stat "sprint activo".
- Se consolidan iconos SVG en sprite `<defs>` (symbol `icon-site` e `icon-github`) — eliminada repetición de 16 paths inline.
- Cards convertidas de `<div>` a `<article>` — elemento semántico correcto para contenido autocontenido.
- Variable CSS `--accent-alpha` extraída del valor hardcodeado en `.tag`.

---

## 2026-04-15

### fix
- `fix(a11y)`: skip link operativo; `aria-label` en dots de estado del header. (34c20c3)
- `fix(meta)`: og:image y twitter card para preview social. (0e5c53c)

---

## 2026-04-09

### refactor
- Deprecar Poemario Beta (badge DEPRECATED, opacidad 0.6); remover cards redundantes; actualizar tarjeta mi-portafolio con stack correcto (React 19, Tailwind v4, Vite 6). (4ae9465)

---

## 2026-04-06

### fix
- Se corrige representación de proyecto privado `SURA Investments` en `index.html`: se elimina enlace público que devolvía 404 y se reemplaza por estado visual `Acceso restringido`.

### ops
- QA de enlaces externos del dashboard ejecutada con `curl`; todos los destinos públicos responden 200.
- Se agregan `HANDOFF.md` y `DEPLOY.md` para estandarizar continuidad, debugging y publicación.

### docs
- Se crea este `CHANGELOG.md` para mantener trazabilidad continua del repositorio general de Vientonorte.
- Se documenta en `README.md` la política de mantenimiento del log para futuras sesiones.

### ops
- Snapshot de estado del ecosistema al cierre:
  - `antropologia-corrupcion`: mejoras recientes en UX móvil del grafo, auditabilidad del score y export CSV; documentación + handoff publicados en su repo.
  - `vientonorte.github.io`: pendiente de siguientes iteraciones visuales del dashboard unificado.

---

## Convención de actualización

Al cerrar cualquier cambio en el dashboard general:
1. Agregar una entrada breve aquí (fecha + tipo + alcance).
2. Referenciar commit hash si aplica.
3. Mantener foco en cambios observables para operación (no solo detalle técnico).
