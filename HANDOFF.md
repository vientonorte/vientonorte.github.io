# Handoff Operativo — vientonorte.github.io

Fecha: 2026-05-27
Rama: main
Estado al cierre: limpio y sincronizado con origin/main

## Objetivo del repositorio

Dashboard unificado de proyectos de Vientonorte para visibilidad pública de estado y enlaces.

## Historial de iteraciones relevantes

### 2026-04-06 (inicial)
- QA de enlaces públicos del dashboard.
- Debug de enlace roto asociado a proyecto privado SURA (404 en GitHub público).
- Ajuste UI/UX para representar acceso privado sin generar error de navegación.

### 2026-04-16 – 2026-05-10 (acumulado)
- Soporte bilingüe ES/EN completo (switch persistente, meta tags multilingües).
- Autenticación con Passkey (WebAuthn) para acceso a repos privados.
- Contenido del dashboard extraído a `data/projects.json`; skeleton de carga.
- Grafo de fricción institucional: schemas Draft-07, pipeline SCA, CI con ajv-cli.
- QA transversal: a11y WCAG AA, XSS defense (`esc()`), SEO OpenGraph, responsive.

### 2026-05-27 (sesión actual)
- QA exhaustivo: 17 issues corregidos (3 HIGH / 6 MEDIUM / 8 LOW).
- Fetch con timeout AbortController (5 s) y catch con log de error.
- Rate limiting en botón passkey (`btn.disabled` durante auth con `finally`).
- `load_json()` protegido con `try/except JSONDecodeError` — sin traceback en CI.
- Truncación de descripciones corregida (`:80...` → condicional correcto).
- Docstrings PEP 257 en funciones públicas de `validate_flow.py`.
- `sca_score`/`friction_type` removidos de edges no validados (valores computados por pipeline).
- GitHub Actions pinadas a versiones específicas (`checkout@v4.2.2`, `setup-node@v4.2.0`, `setup-python@v5.4.0`, `upload-artifact@v4.6.2`).
- CI extendido: trigger ahora cubre `data/**` (incluye `projects.json`) y agrega step de validación de `projects.json` contra `projects.schema.json`.
- `data/schema/projects.schema.json` creado con esquema Draft-07 formal (incluye `requiresAuth` en links).
- Schemas de nodos renombrados de guión a guión_bajo para consistencia con campo `type`.
- README: fila duplicada `contra-archivo` eliminada; sección `## Estructura` actualizada; referencias a docs convertidas a markdown links.
- DEPLOY.md: checklist QA actualizado — comandos extraen URLs desde `data/projects.json`.
- `.gitignore`: `__pycache__/`, `*.pyc`, `*.pyo` excluidos.

## Checklist de continuidad

1. Editar dashboard en `data/projects.json` (metadatos) o `index.html` (estructura/UI).
2. Validar JSON antes de push: `python3 -c "import json; json.load(open('data/projects.json'))"`.
3. No exponer rutas de repos privados como enlaces públicos clickeables.
4. Registrar cambios en `CHANGELOG.md`.
5. Confirmar estado git limpio al cierre (`git status --short`).
6. Para cambios en `data/graph/` o `pipeline/`: verificar que CI pase en GitHub Actions.

## Riesgos abiertos

- Conteo de KPIs (`stats` en `data/projects.json`) es manual; puede desalinearse si se agregan/remueven tarjetas sin actualizar `meta.stats`.
- `data/schema/projects.schema.json` integrado al CI — cualquier incompatibilidad en `projects.json` bloqueará el workflow.
- Schemas de nodos extendidos en `data/schema/nodes/` no están referenciados por el workflow CI actual — son documentación técnica; considerar integrarlos si se agrega validación por tipo.
- `continue-on-error: true` en el step SCA del CI es intencional: el pipeline no bloquea el merge pero deja evidencia en artefactos. Considerar `false` cuando los datos de producción tengan edges validados.
