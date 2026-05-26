# Handoff Operativo — vientonorte.github.io

Fecha: 2026-05-26
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

### 2026-05-26 (sesión actual)
- QA exhaustivo: 17 issues corregidos (2 HIGH / 6 MEDIUM / 9 LOW).
- Fetch con timeout (AbortController 5s) y catch con log de error.
- Rate limiting en botón passkey (`btn.disabled` durante auth).
- Docstrings PEP 257 en funciones públicas de `validate_flow.py`.
- SCA: `sca_score`/`friction_type` removidos de edges no validados (valores computados por pipeline, no almacenados).
- GitHub Actions: acciones pinadas a versiones específicas.
- Schemas de nodos: archivos renombrados de guión a guión_bajo para consistencia con datos.
- README: eliminada fila duplicada `contra-archivo` (proyecto ya representado como Contra-Archivo live).
- `.gitignore`: `__pycache__` y bytecode Python excluidos.

## Checklist de continuidad

1. Editar dashboard en `index.html` y/o metadatos en `data/projects.json`.
2. Validar enlaces HTTP 200 para destinos públicos antes de publicar.
3. No exponer rutas de repos privados como enlaces públicos clickeables.
4. Registrar cambios en `CHANGELOG.md`.
5. Confirmar estado git limpio al cierre (`git status --short`).
6. Para cambios en `data/graph/` o `pipeline/`: verificar que CI pase en GitHub Actions.

## Riesgos abiertos

- Conteo de KPIs (`stats` en `data/projects.json`) es manual; puede desalinearse si se agregan/remueven tarjetas sin actualizar `meta.stats`.
- `data/schema/projects.schema.json` creado como esquema formal para validar `projects.json` en CI (pendiente de integrar al workflow de GitHub Actions).
- Schemas de nodos extendidos en `data/schema/nodes/` no están referenciados por el workflow CI actual — son documentación; considerar integrarlos si se agrega validación por tipo.
