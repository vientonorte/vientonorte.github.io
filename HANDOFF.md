# Handoff Operativo — vientonorte.github.io

Fecha: 2026-06-10
Rama: main
Estado al cierre: QA de pendientes — consolidación de PRs draft #52/#53/#56, fix mypy/python_version, dependencias dev al día

## Objetivo del repositorio

Dashboard unificado de proyectos de Vientonorte para visibilidad pública de estado y enlaces.

## Historial de iteraciones

| Fecha       | Rama / PR            | Descripción                                                                 |
|-------------|----------------------|-----------------------------------------------------------------------------|
| 2026-04-06  | main                 | Fix inicial SURA 404, HANDOFF.md, DEPLOY.md, CHANGELOG.md                  |
| 2026-04-16  | varios PRs           | A11y, KPIs, SVG sprite, articles semánticos                                 |
| 2026-04-22  | PR #7, #8            | h2, skip-link clip-path, focus-visible, dark theme                          |
| 2026-04-25  | PR consolidado       | Dots aria-hidden, canonical, theme-color, favicon SVG                       |
| 2026-05-03  | PR consolidado       | A11y reduced-motion, ul/li semánticos, OG completo                          |
| 2026-05-04  | PR #25, #26, #27     | data/projects.json, passkey WebAuthn, skeleton, grafo fricción, schemas     |
| 2026-05-10  | PR #35               | i18n ES/EN, esc() helper, XSS footer DOM API, console.error                 |
| 2026-05-27  | PR #36               | esc() helper, innerHTML XSS defense, subtitle meta.name                     |
| 2026-05-27  | PR #37 (draft)       | QA: fetch timeout, passkey rate-limit, SCA data, CI pins, schema renames    |
| 2026-05-27  | PR #38 (draft)       | QA exhaustivo (superset de #37) — 17 issues, 3H/6M/8L                      |
| 2026-05-28  | claude/hopeful-cerf-t8GTs | QA buenas prácticas — 18 issues, 2H/5M/11L (ver CHANGELOG)            |
| 2026-06-01  | PRs #37–#41 mergeados | 5 PRs QA mergeados a main — fetch timeout, passkey, CI pins, schemas, docs |
| 2026-06-01  | copilot/audita-*     | Auditoría completa + implementación de mejoras (testing, linting, docs)     |
| 2026-06-10  | claude/hopeful-cerf-6tfqo4 | QA de pendientes: consolida #52/#53/#56 (shell injection CWE-78, package-lock, secrets baseline, lint), fix mypy python_version, deps dev al día |

## Qué se cerró en esta iteración (2026-06-01 — Auditoría)

### 🔴 Alta Prioridad (COMPLETADO)
- ✅ Tests unitarios para validate_flow.py (pytest) — 100% cobertura
- ✅ Validación de schemas de nodos tipo-específicos en CI
- ✅ Linter Python (ruff) configurado + job en CI
- ✅ Linter JavaScript (ESLint) configurado + job en CI
- ✅ Workflow de limpieza de ramas automática

### 🟡 Media Prioridad (COMPLETADO)
- ✅ Pre-commit hooks configurados (.pre-commit-config.yaml)
- ✅ CONTRIBUTING.md creado con estándares de código y flujo
- ✅ ADRs creados (Zero Dependencias, WebAuthn localStorage)
- ✅ Dependabot configurado para Actions/npm/pip

### 🟢 Baja Prioridad (COMPLETADO)
- ✅ Templates de issue/PR creados
- ✅ SECURITY.md con política de reporte

### 📝 Documentación (COMPLETADO)
- ✅ README actualizado con badges de CI y secciones de desarrollo
- ✅ Decisiones de seguridad documentadas en ADR-002
- ✅ CHANGELOG actualizado con entrada completa 2026-06-01
- ✅ HANDOFF actualizado

## Nuevas Capacidades

### Testing
- `pytest tests/` ejecuta suite completa de tests Python
- `pytest --cov=pipeline tests/` genera reporte de cobertura
- CI ejecuta tests automáticamente en cada push/PR

### Linting
- Python: `ruff check .` y `ruff format .`
- JavaScript: `npm run lint:js`
- HTML: `npm run lint:html`
- Pre-commit hooks automatizan checks locales

### CI/CD
- 4 jobs en GitHub Actions:
  1. JSON Schema validation (nodes, edges, projects)
  2. Pipeline SCA validation
  3. Python tests + linting + coverage
  4. Frontend linting (ESLint + HTMLHint)
- Dependabot actualiza dependencias semanalmente
- Cleanup de ramas mergeadas automático

## Riesgos abiertos

- **Contraste `--text-muted`** (~4.8:1): cumple WCAG AA; ajuste a AAA queda para sprint de diseño.
- **`continue-on-error: true` en SCA check**: intencional — el pipeline no bloquea el merge pero deja evidencia en artefactos.
- **credentialId en localStorage**: intencional y documentado en ADR-002 — credentialId es público por spec WebAuthn.
- **Ramas `claude/hopeful-cerf-*` y `copilot/*` stale**: ~39 ramas, la mayoría ya mergeadas; cleanup automático ejecuta domingos o vía `workflow_dispatch`.
- **PRs dependabot de major bumps pendientes** (#44 setup-node v4→v6, #45 upload-artifact v4→v7, #46 setup-python v5→v6, #55 checkout v4→v6): requieren revisión manual de breaking changes antes de mergear; la nueva regla `ignore` en `dependabot.yml` evita que se generen más PRs de este tipo a futuro pero no afecta los ya abiertos.

## Checklist de continuidad

1. ✅ Auditoría de buenas prácticas completada.
2. ✅ Tests, linting, y CI configurados.
3. ✅ Documentación técnica creada (CONTRIBUTING, SECURITY, ADRs).
4. ✅ PRs draft #52/#53/#56 consolidados (ver CHANGELOG 2026-06-10).
5. ⚠️ Ejecutar `pytest tests/` antes de cada release.
6. ⚠️ Cerrar manualmente #52, #53, #56 y dependabot #48/#49/#50/#54 (superados por esta rama).
7. ⚠️ Revisar PRs dependabot de major bumps (#44, #45, #46, #55) antes de mergear.
8. ⚠️ Cleanup de ramas stale ejecuta domingos (automático).

## Próximo paso recomendado

### Inmediato
- Ejecutar `npm install` y `pip install -r requirements-dev.txt` en local
- Instalar pre-commit hooks: `pre-commit install`
- Validar que CI esté verde tras merge
- Cerrar PRs draft superados (#52, #53, #56) y dependabot redundantes (#48-50, #54)

### Corto plazo
- Agregar tests de accesibilidad automatizados (axe-core, pa11y)
- Agregar validación de links rotos en CI (lychee-action)
- Agregar Lighthouse CI para monitoreo de performance
- Revisar y mergear PRs dependabot de major bumps de Actions (#44, #45, #46, #55)

### Mediano plazo
- Evaluar extracción de JavaScript a archivo separado (index.html tiene ~960 líneas)
- Migrar stats de projects.json a cálculo automático (eliminar drift manual)

