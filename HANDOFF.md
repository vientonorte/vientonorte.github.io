# Handoff Operativo — vientonorte.github.io

Fecha: 2026-05-31
Rama: main
Estado al cierre: limpio y sincronizado con origin/main

## Objetivo del repositorio

Dashboard unificado de proyectos de Vientonorte para visibilidad pública de estado y enlaces, con soporte bilingüe ES/EN, autenticación passkey y pipeline SCA analógico.

## Historial de iteraciones relevantes

| Fecha      | PR  | Alcance |
|------------|-----|---------|
| 2026-04-06 | —   | QA inicial; SURA 404 → link-disabled |
| 2026-04-16 | —   | Stat "deprecado" para Poemario Beta |
| 2026-05-26 | #21 | CI: fix flags ajv-cli@5, XSS hrefs, rel, type=button, SCA data |
| 2026-05-26 | #22 | Fix CI schema bug |
| 2026-05-27 | #23 | A11y: aria-label, skip-link, focus-visible |
| 2026-05-27 | #24 | i18n: data-i18n attributes, bilingüe completo |
| 2026-05-27 | #25–27 | QA: badge PRIVATE, shadowing, target=_blank, footer rel, schema, pipeline |
| 2026-05-28 | #35 | QA: XSS footer DOM API, console.error, sca_score/friction_type |
| 2026-05-28 | #36 | QA: esc() helper, innerHTML XSS, subtitle meta.name |
| 2026-05-31 | —   | QA: fetch timeout, passkey rate-limit, load_json error, CI pins, projects schema, schema renames, docs |

## Qué se cerró en esta iteración (2026-05-31)

- **HIGH**: `AbortController` 5s timeout en fetch de projects.json — evita carga infinita
- **HIGH**: `catch (err)` + `console.error` en fetch — errores ya no se swallean silenciosamente
- **HIGH**: `load_json()` protegido con `try/except json.JSONDecodeError` — CI muestra error legible
- **MEDIUM**: `btn.disabled = true` + `finally` en passkey — previene múltiples diálogos WebAuthn
- **MEDIUM**: `sca_score`/`friction_type` eliminados de 6 edges `sca_validated: false` — pipeline recalcula; no almacenar outputs pre-computados
- **MEDIUM**: GitHub Actions pinados a versiones exactas (no floating `@v4`/`@v5`)
- **LOW**: Redundante `document.documentElement.lang` en `updateUILanguage()` eliminado
- **LOW**: Truncación condicional corregida en `validate_flow.py`
- **LOW**: Docstrings PEP 257 en 4 funciones de `validate_flow.py`
- **LOW**: `data/schema/projects.schema.json` creado; CI valida `data/projects.json`
- **LOW**: CI trigger extendido de `data/schema/**`+`data/graph/**` → `data/**`
- **LOW**: 4 schemas de nodo renombrados a guión_bajo (`captura_regulatoria`, etc.) con `$id` actualizado
- **LOW**: `$comment` Draft-07 en campos SCA de `edge.schema.json`
- **LOW**: `contra-archivo` (ID inexistente) eliminado de tabla README
- **LOW**: `README.md` sección Estructura actualizada con árbol completo
- **LOW**: `.gitignore` con `__pycache__/`, `*.pyc`, `*.pyo`
- **LOW**: `DEPLOY.md` — comandos QA extraen URLs desde `data/projects.json`

## Checklist de continuidad

1. Fuente de verdad de proyectos: `data/projects.json` (no `index.html`)
2. Validar links HTTP con comandos de `DEPLOY.md` antes de push
3. No exponer rutas de repos privados como enlaces públicos clickeables
4. Registrar cambios en `CHANGELOG.md`
5. Confirmar estado git limpio al cierre

## Riesgos abiertos (aceptables)

- **Contraste `--text-muted`** (~4.8:1): cumple WCAG AA, ajuste a AAA queda para sprint de diseño
- **`continue-on-error: true` en SCA check**: intencional — el pipeline no bloquea el merge; activar `false` cuando los datos de producción tengan edges validados
- **Credential ID en localStorage**: intencional — persistencia cross-session requerida para WebAuthn; sessionStorage rompería el estado "registrado"
- **Schemas de nodo en CI**: `nodes-collection.schema.json` valida solo el schema base; los schemas extendidos por tipo (`data/schema/nodes/`) no se validan en CI aún

## Próximo paso recomendado

- Extender CI para validar nodes.json contra los schemas de tipo específico
- Activar `--fail-on-high` sin `continue-on-error` cuando los edges tengan datos reales validados
